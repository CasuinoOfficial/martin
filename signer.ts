import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Secp256k1Keypair } from '@mysten/sui/keypairs/secp256k1';
import { Transaction } from "@mysten/sui/transactions";
import {
  SuiClient,
  SuiTransactionBlockResponse,
  getFullnodeUrl,
  SuiTransactionBlockResponseOptions,
} from "@mysten/sui/client";
import { SignatureWithBytes } from "@mysten/sui/cryptography";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const COIN_TYPE = {
  SUI: "0x2::sui::SUI",
  BUCK: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
};
export type GasCoin = {
  objectId: string;
  version: string;
  digest: string;
};

export class HouseSigner {
  private suiKeypair: Secp256k1Keypair | Ed25519Keypair;
  // private suiKeypair: Ed25519Keypair;

  public suiClient: SuiClient;

  constructor(inputs: {
    privateKey: string;
    rpcEndpoint?: string;
  }) {
    const { schema, secretKey } = decodeSuiPrivateKey(inputs.privateKey);
    if (schema === 'ED25519') {
      this.suiKeypair = Ed25519Keypair.fromSecretKey(secretKey);
    } else {
      this.suiKeypair = Secp256k1Keypair.fromSecretKey(secretKey);
    };
    this.suiClient = new SuiClient({   url: "https://fullnode-doubleup.com"  });
  }

  getSuiAddress(): string {
    return this.suiKeypair.toSuiAddress();
  }

  async signAndExecuteTransaction(txInput: {
    transaction: Transaction;
    options?: SuiTransactionBlockResponseOptions;
  }): Promise<SuiTransactionBlockResponse> {
    return this.suiClient.signAndExecuteTransaction({
      transaction: txInput.transaction,
      signer: this.suiKeypair,
      options: txInput.options,
    });
  }

  async signTransactionBlock(txInput: {
    transactionBlockBytes: Uint8Array;
  }): Promise<SignatureWithBytes> {
    return this.suiKeypair.signTransaction(txInput.transactionBlockBytes);
  }
}

export const martinSigner = new HouseSigner({
    privateKey: process.env.MARTIN ?? "",
});
console.log(martinSigner.getSuiAddress());