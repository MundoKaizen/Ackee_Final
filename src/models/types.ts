import { PublicKey } from "@solana/web3.js"

export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

export type Organism = {
    size: number,
    coords: { x: number, y: number },
    address: PublicKey,
    creatorAddress: PublicKey,
    birthday: string
}
