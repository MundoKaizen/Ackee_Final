import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Solanapdas } from "../target/types/solanapdas";
import { expect } from 'chai';
import { Connection } from '@solana/web3.js';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utils } from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

const getRecentBlockhash = async () : Promise<String> => {
  const url = "https://api.devnet.solana.com"; 
  const connection = new Connection(url, 'singleGossip');

  const blockhash = await connection.getRecentBlockhash();
  return blockhash.blockhash;
}


describe("solanapdas", async () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solanapdas as Program<Solanapdas>;
  const programProvider = program.provider as anchor.AnchorProvider;
  
  const keypair = anchor.web3.Keypair.generate();
  
  it("Create a life", async () => {
    const blockhash = await getRecentBlockhash();

    // Need the test to generate its own keypair
    console.log("keypair generated", keypair);
  
    const tx = await program.methods.createLife(blockhash.toString()).accounts({
      creator: keypair.publicKey,
      user: programProvider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([keypair]).rpc();

    console.log("Your transaction signature", tx);

    const creatorAccount = await program.account.creator.fetch(keypair.publicKey);
    console.log("Creator: ", creatorAccount);
    expect(creatorAccount.birthdate).eqls(blockhash);

    const [organism] = findProgramAddressSync([
      utils.bytes.utf8.encode("organism"),
      utils.bytes.utf8.encode((creatorAccount.numOrganisms.toNumber()).toString()),
      keypair.publicKey.toBuffer()
    ], program.programId) 

    const tx2 = await program.methods.createOrganism(blockhash.toString()).accounts({
      creator: keypair.publicKey,
      user: programProvider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
      organism
    }).signers([keypair]).rpc();

    console.log("Found an organism. Might be wrong one: ", organism);

    console.log("Your transaction signature 2", tx2);

    const tx3 = await program.methods.evolve(blockhash.toString()).accounts({
      creator: keypair.publicKey,
      organism,
    }).signers([keypair]).rpc();

    console.log("Your transaction signature 2", tx2);

    const organismAccount = await program.account.organism.fetch(organism);
    console.log("DOes it look like anything", organismAccount.size.toNumber());
    console.log("DOes it look like anything", organismAccount.x.toNumber());
    console.log("DOes it look like anything", organismAccount.y.toNumber());

    expect(organismAccount?.size.toNumber()).eqls(20);

  }); 
});
