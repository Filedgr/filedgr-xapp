export type NetworkType = "MAINNET" | "TESTNET" | "DEVNET" | "CUSTOM";

export interface Network {
  label: string;
  value: string;
}

export interface NetworkState {
  type: NetworkType;
  endpoint: string;
  custom?: string;
}
