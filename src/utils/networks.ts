import { Network } from "@/types/network";

export const NETWORKS: Record<string, Network[]> = {
  MAINNET: [
    { label: "wss://xrpl.link", value: "wss://xrpl.link" },
    { label: "wss://s2.ripple.com", value: "wss://s2.ripple.com" },
  ],
  TESTNET: [
    {
      label: "wss://s.altnet.rippletest.net:51233",
      value: "wss://s.altnet.rippletest.net:51233",
    },
    {
      label: "wss://testnet.xrpl-labs.com",
      value: "wss://testnet.xrpl-labs.com",
    },
  ],
  DEVNET: [
    {
      label: "wss://s.devnet.rippletest.net:51233",
      value: "wss://s.devnet.rippletest.net:51233",
    },
  ],
};
export const NETWORK_TYPES = [
  { label: "Main", value: "MAINNET" },
  { label: "Test", value: "TESTNET" },
  { label: "Dev", value: "DEVNET" },
  { label: "Custom", value: "CUSTOM" },
] as const;
