import { PublicKey } from "@solana/web3.js"

export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

export type Organism = {
    size: number,
    x: number,
    y: number,
    address: PublicKey | string,
    creatorAddress: PublicKey | string,
    birthday: string,
    index: number
}
