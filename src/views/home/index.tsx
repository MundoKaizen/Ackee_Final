// Next, React
import React, { FC, useEffect, useState } from 'react';

// Web3
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utils, Program, web3, AnchorProvider } from "@project-serum/anchor";
import programIdl from "../../programs/idls/program.json"

// Components
import Organism from 'components/Organism';
import PrettyButton from 'components/PrettyButton';

//Constants
import { Organism as _Organism } from "../../models/types";


const connection = new web3.Connection("https://api.devnet.solana.com", {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 1000 * 5,
});
const IDL = JSON.parse(JSON.stringify(programIdl))


const getProvider = () => {
  
  const wallet = useWallet();

  return new AnchorProvider(connection, wallet, {
    commitment: 'processed',
    preflightCommitment: 'processed',
  });
}


// TODO be aware that while youre debugging this, you might be conflating the wallet address and the creator address


export const HomeView: React.FC = ({ }) => {
  
  const wallet = useWallet();
  
  const [organisms, setOrganisms] = React.useState([] as _Organism[]);

  const theProgram = new Program(IDL, programIdl.metadata.address, getProvider());

  React.useEffect(() => {
    retrieveAllOrganisms();
  }, [])

  const retrieveAllOrganisms = async () => {
    const creatorAccount = await theProgram.account.creator.fetch(wallet.publicKey);
    console.log("Creator: ", creatorAccount);
  
    (creatorAccount?.numOrganisms ?? []).forEach(async num => {
      const [org] = findProgramAddressSync([
        utils.bytes.utf8.encode("organism"),
        utils.bytes.utf8.encode(creatorAccount.numOrganisms.toString()),
        wallet.publicKey.toBuffer()
      ], theProgram.programId) 

      const organismAccount: _Organism = await theProgram.account.organism.fetch(org);
      setOrganisms(prev => [...prev, organismAccount]);
    })
  }

  const getBlockhash = async (): Promise<String> => {
    const blockhash = await connection.getRecentBlockhash();
    return blockhash.blockhash;
  }

  const getOrganismAccount = async (index: number) => {
    return findProgramAddressSync([
      utils.bytes.utf8.encode("organism"),
      utils.bytes.utf8.encode(index.toString()),
      wallet.publicKey.toBuffer()
    ], theProgram.programId) 
  }

  const handleEvolve = async (organism: _Organism) => {
    const [_organism] = await getOrganismAccount(organism.index);
    const blockhash = await getBlockhash()

    theProgram.methods.createLife(blockhash).accounts({
      creator: wallet.publicKey,
      organism: _organism,
    }).transaction();
  }

  const createLife = async () => {
    const blockhash = await getBlockhash()

    theProgram.methods.createLife(blockhash).accounts({
      creator: wallet.publicKey,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).transaction();
  }

  const createOrganism = async () => {
    const creatorAccount = await theProgram.account.creator.fetch(wallet.publicKey);
    const [_organism] = await getOrganismAccount(creatorAccount.numOrganisms + 1);
    const blockhash = await getBlockhash()

    theProgram.methods.createOrganism(blockhash).accounts({
      creator: wallet.publicKey,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
      organism: _organism
    }).transaction();
  }

  return (

    <div className="h-full relative">
        {organisms.map((organism: _Organism, i: number) => {
          return (
            <div key={i} className={"absolute"} style={{top: organism.y, left: organism.x}}>
              <Organism handleEvolve={handleEvolve} organism={organism} />
            </div>
          )
          
        })}

        
        <div className='absolute bottom-1 right-1 flex-row'>
          <PrettyButton
            text="Create life"
            onClick={createOrganism}
          />
          <PrettyButton
            text="Create creator"
            onClick={createLife}
          />
        </div>
    </div>
  );
};
