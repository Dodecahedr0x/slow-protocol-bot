import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./slow.json" assert { type: "json" };

export const CONNECTION = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);
export const SLOW_IDL = idl;
export const KEYPAIR_PATH = "key.json";
export const PROGRAM_ID = new PublicKey(
  "s1owa2k7P2kkLEenZPKuGddWMVpy8Pt2oMVeBdtSHM6"
);
export const SLOW_MINT = new PublicKey(
  "2KE2UNJKB6RGgb78DxJbi2HXSfCs1EocHj4FDMZPr4HA"
);
export const SLOW_STATE = new PublicKey(
  "HobVrQpdkms7h57vcfaTW4Lqmxd5EatY2MYRavtvF1oL"
);
export const SLOW_SOL_TREASURY = new PublicKey(
  "BswAaS7SVs59zXe45dToq1FKmJr4nMHBHBjBEfibM5b9"
);
export const SLOW_MSOL_TREASURY = new PublicKey(
  "7ysRpeKN76QjwC4btS9a6hiyinvgzEVLvWPP97M42jNg"
);
