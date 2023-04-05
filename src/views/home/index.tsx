// Next, React
import React, { FC, useEffect, useState } from 'react';

// Web3
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utils, Program } from "@project-serum/anchor";

// Components
import PrettyButton from 'components/PrettyButton';

//Constants
import { Organism as _Organism } from "../../models/types";

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import Organism from 'components/Organism';


export const HomeView: React.FC = ({ }) => {

  const wallet = useWallet();
  const { connection } = useConnection();
  // const program = anchor.workspace.Solanapdas as Program<Solanapdas>;
  // const programProvider = program.provider as anchor.AnchorProvider;

  const [organisms, setOrganisms] = React.useState([] as _Organism[]);

  React.useEffect(() => {
    (async () => {
      // const creatorAccount = await program.account.creator.fetch(wallet.publicKey);
      // console.log("Creator: ", creatorAccount);
    
      // (creatorAccount?.numOrganisms ?? []).forEach(async num => {
      //   const [org] = findProgramAddressSync([
      //     utils.bytes.utf8.encode("organism"),
      //     utils.bytes.utf8.encode(creatorAccount.numOrganisms.toString()),
      //     programProvider.wallet.publicKey.toBuffer()
      //   ], program.programId) 
  
      //   const organismAccount: _Organism = await program.account.organism.fetch(org);
      //   setOrganisms(prev => [...prev, organismAccount]);
      // })
    })();
  }, [])

  const handleEvolve = (organism: _Organism) => {
    // todo retieve the most recent block and read every single tx in it
    // todo quantify each behaviour (number of txs, transfers, creations)
    // todo hash this into xy coord changes and size changes
    // todo update the organism's PDA data accordingly, then stub the change in UI
  }

  const createCreator = () => {
    
  }

  const createLife = () => {
    // todo init a PDA from a program (also need to do) that is in charge of creating all life
    // then place it somewhere on the board. The initial x/y coords will be derived from the current block number
  }

  return (

    <div className="h-full relative">
        {organisms.map((organism: _Organism, i: number) => {
          return (
            <div key={i} className={`absolute`} >
              <Organism handleEvolve={handleEvolve} organism={organism} />
            </div>
          )
          
        })}

        
        <div className='absolute bottom-1 right-1 flex-row'>
          <PrettyButton
            text="Create life"
            onClick={createLife}
          />
          <PrettyButton
            text="Create Creator"
            onClick={createCreator}
          />
        </div>
    </div>
  );
};
