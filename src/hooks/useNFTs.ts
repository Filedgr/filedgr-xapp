import { useEffect } from "react";
import { useXumm } from "../context/XummContext";
import { XRPLService } from "../services/xrpl";
import { useAppStore } from "../store";

export function useNFTs() {
  const { account } = useXumm();
  const {
    nfts,
    currentNfts,
    marker,
    isLoading,
    setNfts,
    addNfts,
    setMarker,
    setIsLoading,
    clearNfts,
  } = useAppStore();

  const loadNFTs = async (useMarker?: unknown) => {
    if (!account || isLoading) return;

    setIsLoading(true);
    try {
      const xrplService = XRPLService.getInstance();
      const { nfts: newNfts, nextMarker } = await xrplService.getNFTs(
        account,
        useMarker
      );

      if (useMarker) {
        addNfts(newNfts);
      } else {
        setNfts(newNfts);
      }
      setMarker(nextMarker);
    } catch (error) {
      console.error("Failed to load NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = async () => {
    clearNfts();
    await loadNFTs();
  };

  useEffect(() => {
    if (account) {
      loadNFTs();
    } else {
      clearNfts();
    }
  }, [account]);

  return {
    nfts,
    currentNfts,
    marker,
    isLoading,
    loadMore: () => loadNFTs(marker),
    refresh,
  };
}
