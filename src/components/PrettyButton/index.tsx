import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';



export const PrettyButton = ({text, onClick, alwaysOn = false}) => {

    const wallet = useWallet();

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <button
                        className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                        onClick={onClick} disabled={!alwaysOn && !wallet?.publicKey}
                    >
                        {text}
                    </button>
            </div>
        </div>
    )
}

export default PrettyButton;