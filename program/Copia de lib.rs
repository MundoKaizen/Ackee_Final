use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("Ay7HC7KkZyXawNsZ2PQX9Z4o4Pte8qCTbLJQQXJnm3qv");


#[program]
pub mod solanapdas {
    use super::*;

    // todo blockhash shouldn't be passed in here, and should instead be retrieved entirely on chain
    pub fn create_life(ctx: Context<CreateLife>, blockhash: String) -> ProgramResult {
        let creator = &mut ctx.accounts.creator;

        creator.birthdate = blockhash;
        creator.num_organisms = 0;
        
        Ok({})
    }

    pub fn create_organism(ctx: Context<CreateOrganism>, blockhash: String) -> ProgramResult {
        let creator = &mut ctx.accounts.creator;
        creator.num_organisms = creator.num_organisms + 1;

        let organism = &mut ctx.accounts.organism;
        organism.size = 10;
        organism.birthdate = blockhash;
        organism.index = creator.num_organisms;
        organism.x = 50; // todo generate from blockhash
        organism.y = 50; // todo generate from blockhash
        
        Ok({})
    }

    pub fn evolve(ctx: Context<Evolve>, blockhash: String) -> ProgramResult {
        let organism = &mut ctx.accounts.organism;
        organism.x = 75; // todo generate from blockhash
        organism.y = 75; // todo generate from blockhash
        organism.size = 20; // todo generate from blockhash

        Ok({})
    }
}


#[account]
pub struct Organism {
    pub birthdate: String,
    pub size: i128,
    // pub creator: String,
    pub x: u128,
    pub y: u128,
    pub index: i64,
}

#[account]
pub struct Creator{
    pub num_organisms: i64,
    pub birthdate: String,
}

#[derive(Accounts)]
pub struct CreateLife<'info>{

    #[account(init, payer=user, space=5000)]
        pub creator: Account<'info, Creator>,

    #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct CreateOrganism<'info>{

    #[account(mut, signer)]
        pub creator: Account<'info, Creator>,
    
    #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>,

    #[account(init, payer=user, space=5000, seeds=[b"organism", creator.num_organisms.to_string().as_bytes(), creator.key().as_ref()], bump)]
        pub organism: Account<'info, Organism>,
}


#[derive(Accounts)]
pub struct Evolve<'info>{
    
    #[account(mut, signer)]
        pub creator: Account<'info, Creator>,
    #[account(mut)]
        pub organism: Account<'info, Organism>,
}


