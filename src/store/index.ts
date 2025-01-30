import { NETWORK_TYPES, NETWORKS } from "@/utils/networks";
import { create } from "zustand";
import type { IpfsGateway } from "../types/ipfs";
import type { NetworkType } from "../types/network";
import type { NFT } from "../types/nft";

interface AppState {
  // Network State
  networkType: NetworkType;
  network: string;
  customNetwork: string;
  setNetworkType: (type: NetworkType) => void;
  setNetwork: (network: string) => void;
  setCustomNetwork: (network: string) => void;

  // IPFS State
  ipfsGateway: IpfsGateway;
  setIpfsGateway: (gateway: IpfsGateway) => void;

  // NFT State
  nfts: NFT[];
  currentNfts: NFT[];
  marker: unknown;
  isLoading: boolean;
  setNfts: (nfts: NFT[]) => void;
  addNfts: (nfts: NFT[]) => void;
  setCurrentNfts: (nfts: NFT[]) => void;
  setMarker: (marker: unknown) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearNfts: () => void;
}

const DEFAULT_IPFS_GATEWAY: IpfsGateway = {
  name: "Cloudflare IPFS",
  domain: "https://ipfs.io/ipfs/",
  obfuscateTime: null,
};

export const useAppStore = create<AppState>((set) => ({
  // Network Initial State
  networkType: NETWORK_TYPES[0].value,
  network: NETWORKS[NETWORK_TYPES[0].value][0].value,
  customNetwork: "",
  setNetworkType: (type) => set({ networkType: type }),
  setNetwork: (network) => set({ network }),
  setCustomNetwork: (network) => set({ customNetwork: network }),

  // IPFS Initial State
  ipfsGateway: DEFAULT_IPFS_GATEWAY,
  setIpfsGateway: (gateway) => set({ ipfsGateway: gateway }),

  // NFT Initial State
  nfts: [],
  currentNfts: [],
  marker: null,
  isLoading: false,
  setNfts: (nfts) => set({ nfts, currentNfts: nfts.slice(0, 8) }),
  addNfts: (newNfts) =>
    set((state) => ({
      nfts: [...state.nfts, ...newNfts],
      currentNfts: [...state.currentNfts, ...newNfts],
    })),
  setCurrentNfts: (nfts) => set({ currentNfts: nfts }),
  setMarker: (marker) => set({ marker }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearNfts: () => set({ nfts: [], currentNfts: [], marker: null }),
}));
