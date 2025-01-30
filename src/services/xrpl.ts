import type { AccountNFToken } from "xrpl";
import { Client, convertHexToString } from "xrpl";
import type { NFT } from "../types/nft";
import { getIpfsJson } from "./ipfs";

export class XRPLService {
  private client: Client | null = null;
  private static instance: XRPLService;
  private currentNetwork: string | null = null;

  private constructor() {}

  static getInstance(): XRPLService {
    if (!XRPLService.instance) {
      XRPLService.instance = new XRPLService();
    }
    return XRPLService.instance;
  }

  async connect(endpoint: string, _networkType?: string): Promise<void> {
    try {
      // Don't reconnect if already connected to the same network
      if (this.currentNetwork === endpoint && this.client?.isConnected()) {
        return;
      }

      // Disconnect from existing connection if any
      if (this.client?.isConnected()) {
        await this.client.disconnect();
      }

      this.client = new Client(endpoint);
      await this.client.connect();
      this.currentNetwork = endpoint;

      console.log(
        "Connected to XRPL",
        this.client.isConnected(),
        this.client.url
      );
    } catch (error) {
      console.error("Failed to connect to XRPL:", error);
      this.currentNetwork = null;
      throw error;
    }
  }
  async disconnect(): Promise<void> {
    if (this.client?.isConnected()) {
      await this.client.disconnect();
    }
  }

  async getNFTs(
    address: string,
    marker?: unknown
  ): Promise<{
    nfts: NFT[];
    nextMarker?: unknown;
  }> {
    if (!this.client?.isConnected()) {
      throw new Error("Not connected to XRPL");
    }

    try {
      const { nfts: currNfts, nextMarker } = await this.fetchNFTs(
        address,
        marker
      );
      const nftsWithURI = currNfts.filter((nft) => nft.URI);

      const nftsWithMetadata = await Promise.all(
        nftsWithURI.map(async (nft) => {
          try {
            const uri = convertHexToString(nft.URI ?? "");
            const metaData = await getIpfsJson(uri.replace("ipfs://", ""));

            if (metaData.image) {
              metaData.image = metaData.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
            }

            return {
              ...nft,
              ipfsUri: uri,
              metadata: metaData,
            };
          } catch (error) {
            console.error("Failed to fetch NFT metadata:", error);
            return null;
          }
        })
      );

      return {
        nfts: nftsWithMetadata.filter((nft): nft is NFT => nft !== null),
        nextMarker,
      };
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
      throw error;
    }
  }

  private async fetchNFTs(
    address: string,
    marker?: unknown
  ): Promise<{
    nfts: AccountNFToken[];
    nextMarker?: unknown;
  }> {
    if (!this.client) throw new Error("XRPL client not initialized");

    const response = await this.client.request({
      command: "account_nfts",
      account: address,
      limit: Number(import.meta.env.VITE_NFT_PAGINATION_LIMIT) || 8,
      marker,
    });

    return {
      nfts: response.result.account_nfts,
      nextMarker: response.result.marker,
    };
  }

  isConnected(): boolean {
    return this.client?.isConnected() ?? false;
  }
}
