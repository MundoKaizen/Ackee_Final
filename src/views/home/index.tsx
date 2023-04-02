// Next, React
import React, { FC, useEffect, useState } from 'react';

// Utils
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

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

  const [organisms, setOrganisms] = React.useState([{
    size: 10,
    address: new PublicKey("6iQjVp7faMJWgtDnJBXqr4LMyTJNxqmxhiPE5sDfhbqB"),
    creatorAddress: new PublicKey("6iQjVp7faMJggtDnJBXqr4LMyTJNxqmxhiPE5sDfhbqB"),
    birthday: "02/02/2020",
    coords: {x: 45, y: 55}
  }] as _Organism[]);

  React.useEffect(() => {
    // todo retrieve organism list data from main program's main pda for storing all created organisms
  }, [])

  // const { getUserSOLBalance } = useUserSOLBalanceStore()

  // useEffect(() => {
  //   if (wallet.publicKey) {
  //     console.log(wallet.publicKey.toBase58())
  //     getUserSOLBalance(wallet.publicKey, connection)
  //   }
  // }, [wallet.publicKey, connection, getUserSOLBalance])

  const handleEvolve = (organism: _Organism) => {
    // todo retieve the most recent block and read every single tx in it
    // todo quantify each behaviour (number of txs, transfers, creations)
    // todo hash this into xy coord changes and size changes
    // todo update the organism's PDA data accordingly, then stub the change in UI
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

        <div className='absolute bottom-1 right-1'>
          <PrettyButton
            text="Create life"
            onClick={createLife}
          />
        </div>
    </div>
  );
};
