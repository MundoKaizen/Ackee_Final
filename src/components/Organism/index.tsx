import PrettyButton from "components/PrettyButton";
import { Organism as _Organism } from "models/types";
import React from "react";
import { formatAddress } from "utils/string-manipulation";
import { useWallet } from "@solana/wallet-adapter-react";

type Props = {
    organism: _Organism,
    handleEvolve: (organism: _Organism) => void
}

export const Organism: React.FC<Props> = ({ organism, handleEvolve } : Props) => {

    const wallet = useWallet();

    const [selected, toggleSelected] = React.useState(false);


    return (
        <div className="relative cursor-pointer" onClick={() => toggleSelected(!selected)}>
            <div className={
                    `justify-center items-center border border-white h-[${organism.size}px] w-[${organism.size}px] 
                    rounded-[5px] p-2`
                }
            >
                <p>{organism.address.toBase58().substring(0, 1)}</p>
                {selected && <div className="absolute bottom-0 right-0 border-b-2 border-b-white w-full origin-right rotate-[225deg]" />} 
                {selected && 
                    <div className={`border-white border absolute h-[150px] w-[150px] bottom-[-150px] right-[-150px] p-2 rounded bg-[#1e0b3a]`}>
                        <div className="mb-2 flex flex-row">
                            <p className="text-white font-medium mr-1 text-xs">Address: </p>
                            <p className="text-white text-xs">{formatAddress(organism.address.toBase58())}</p>
                        </div>
                        <div className="mb-2 flex flex-row">
                            <p className="text-white font-medium mr-1 text-xs">Owner: </p>
                            <p className="text-white text-xs">{formatAddress(organism.creatorAddress.toBase58())}</p>
                        </div>
                        <div className="mb-2 flex flex-row">
                            <p className="text-white font-medium mr-1 text-xs">Size: </p>
                            <p className="text-white text-xs">{organism.size}</p>
                        </div>
                        <div className="mb-2 flex flex-row">
                            <p className="text-white font-medium mr-1 text-xs">Birthdate: </p>
                            <p className="text-white text-xs">{organism.birthday}</p>
                        </div>

                        <div className="flex flex-row">
                            <div className="relative group items-center">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500
                                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                    <button
                                        className="group rounded px-2 w-30 animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                                        onClick={() => handleEvolve(organism)}
                                        disabled={wallet?.publicKey?.toBase58() !== organism.creatorAddress.toBase58()}
                                    >
                                        Evolve
                                    </button>
                            </div>
                        </div>
                    </div>
                } 
            </div>
        </div>
    )
}

export default Organism;