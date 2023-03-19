import React from 'react';
import { AnchorProvider, BN, Program, utils } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import idl from "../../programs/idls/program2.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';

const idl_string = JSON.stringify(idl);
const idl_obj = JSON.parse(idl_string);

export const Bank = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

    const [banks, setBanks] = React.useState([])

    const getProvider = React.useMemo(() => {
        const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        return provider;
    }, [wallet, connection])

    const createBank = async () => {
        try{
            const anchorProvider = getProvider;
            const program = new Program(idl_obj, idl.metadata.address, anchorProvider);

            // TODO lol youre using the calculator dummy. Get ackee 4 from your desktop

            // This is able to be derived before its created / assigned wtvr you wanna call it 
            const [bank] = findProgramAddressSync([
                utils.bytes.utf8.encode("ADDTHECORRECTSTRINGHERE"),
                wallet.publicKey.toBuffer()
            ], program.programId) // TODO change the program id when you redeploy too

            await program.rpc.create("The Bank bank", {
                accounts: {
                    bank, 
                    user: wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                }
            })

            console.log("Bank created: ", bank.toBase58())
        } catch (e) {
            console.log("Error while creating bank")
        }
    }

    const getBanks = async () => {
        try{
            const anchorProvider = getProvider;
            const program = new Program(idl_obj, idl.metadata.address, anchorProvider);

            // Get all accounts associated with the program
            const programAccounts = await connection.getProgramAccounts(program.programId);

            // Get all the data in each account
            Promise.all(programAccounts.map(async bank => {
                const accountData = await program.account.bank.fetch(bank.pubkey)
                return {
                    ...accountData,
                    pubkey: bank.pubkey
                }
            }))
                // Observe the data (pubkey has been attached to the return object for visual convenience)
                .then(res => {
                    console.log("All bank account data i think?", res);
                    setBanks(res)
                })
        } catch (e) {
            console.log("Error getting banks")
        }
    }

    const depositToBank = async (pubkey: PublicKey) => {
        try{
            const anchorProvider = getProvider;
            const program = new Program(idl_obj, idl.metadata.address, anchorProvider);

            await program.rpc.deposit(new BN(0.1 * LAMPORTS_PER_SOL), {
                accounts: {
                    bank: pubkey, 
                    user: wallet.publicKey,
                    systemProgram: SystemProgram.programId
                }
            })

            console.log("Deposited 0.1 SOL to ", pubkey.toBase58());
        } catch(e) {
            console.log("Error depositing to bank")
        }
    }


    return (
        <div>

        </div>
    )
}