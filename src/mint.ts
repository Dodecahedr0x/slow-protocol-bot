import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import {
  CONNECTION,
  KEYPAIR_PATH,
  PROGRAM_ID,
  SLOW_IDL,
  SLOW_MINT,
  SLOW_MSOL_TREASURY,
  SLOW_SOL_TREASURY,
  SLOW_STATE,
} from "./constants.js";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

import fs from "fs";

// Connecting to the blockchain
const wallet = new Wallet(
  Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(KEYPAIR_PATH).toString()))
  )
);

const provider = new AnchorProvider(CONNECTION, wallet, {});
const program = new Program(SLOW_IDL as any, PROGRAM_ID, provider);

/**
 * Set up the different accounts needed to mint Slow
 */
async function setup() {}

async function mint() {
  const tokenAccount = getAssociatedTokenAddressSync(
    SLOW_MINT,
    wallet.publicKey,
    true
  );

  let instructionsList: TransactionInstruction[] = [];
  instructionsList.push(
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 0 })
  );
  instructionsList.push(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 70e4 })
  );

  const tx = await program.methods
    .mint()
    .accounts({
      signer: wallet.publicKey,
      state: SLOW_STATE,
      treasury: SLOW_SOL_TREASURY,
      msolTreasury: SLOW_MSOL_TREASURY,
      mint: SLOW_MINT,
      tokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
    })
    .preInstructions(instructionsList)
    .transaction();

  const txHash = await CONNECTION.sendTransaction(tx, [wallet.payer]);

  try {
    console.log(`Minted! Tx hash = ${txHash}`);
  } catch (err) {
    console.log("Something went wrong:", err);
  }
}

setup().then(async () => {
  setInterval(mint, 1000);
});
