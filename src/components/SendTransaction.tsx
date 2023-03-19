import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram} from '@solana/web3.js';
import { FC, useCallback } from 'react';

export const SendTransaction: FC = () => {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = async () => {
        

    };

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <button
                        className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                        onClick={onClick} disabled={!publicKey}
                    >

                    </button>
             </div>
        </div>
    );
};
