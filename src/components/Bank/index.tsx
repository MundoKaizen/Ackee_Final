import React from 'react';
import { AnchorProvider, BN, Program, utils, web3 } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import idl from "../../programs/idls/program2.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import PrettyButton from 'components/PrettyButton';

const idl_string = JSON.stringify(idl);
const idl_obj = JSON.parse(idl_string);


function makeid(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



export const Bank = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

    const [banks, setBanks] = React.useState([])

    React.useEffect(() => {
        getBanks();
    }, [])

    const getProvider = React.useMemo(() => {
        const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        return provider;
    }, [wallet, connection])

    const createBank = async () => {
        try{
            const anchorProvider = getProvider;
            const program = new Program(idl_obj, idl.metadata.address, anchorProvider);

            // This is able to be derived before its created / assigned wtvr you wanna call it 
            const [bank] = findProgramAddressSync([
                utils.bytes.utf8.encode("bankaccount"),
                anchorProvider.wallet.publicKey.toBuffer()
            ], program.programId) 

            const randomString = makeid(10);

            await program.rpc.create(randomString, {
                accounts: {
                    bank, 
                    user: anchorProvider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                }
            });

            console.log("Bank created");
            
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

            await program.rpc.deposit(new BN(1 * LAMPORTS_PER_SOL), {
                accounts: {
                    bank: pubkey, 
                    user: anchorProvider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                }
            })

            console.log("Deposited 0.1 SOL to ", pubkey.toBase58());
        } catch(e) {
            console.log("Error depositing to bank")
        }
    }

    const withdrawFromBank = async (pubkey: PublicKey) => {
        try{
            const anchorProvider = getProvider;
            const program = new Program(idl_obj, idl.metadata.address, anchorProvider);
            await program.rpc.withdraw(new BN(0.5 * LAMPORTS_PER_SOL), {
                accounts: {
                    bank: pubkey,
                    user: anchorProvider.wallet.publicKey // Will only work if user is same as creator of bank
                }
            })


            console.log("Withdrew all to: ", wallet.publicKey.toBase58(), " from: ", pubkey.toBase58());
        } catch(e) {
            console.log("Error withdrawing funds")
        }
    }


    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                {banks.map((bank, i) => {
                    return (
                        <div key={i} style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
                            <p>{bank.name}: {bank.balance.toString()}</p>
                            <div style={{ flexDirection: "row", gap: 10 }}>
                                <PrettyButton text="Deposit 1 SOL" onClick={() => depositToBank(bank.pubkey)} />
                                <PrettyButton text="Withdraw 0.5 SOL" onClick={() => withdrawFromBank(bank.pubkey)} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
                <PrettyButton text="Create Bank" onClick={createBank}/>
                <PrettyButton text="Update Banks" onClick={getBanks}/>
            </div>
        </div>
    )
}