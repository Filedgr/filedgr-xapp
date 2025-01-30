import { useEffect } from "react";
import NFTGrid from "../components/nft/NFTGrid";
import { useXumm } from "../context/XummContext";
import { XRPLService } from "../services/xrpl";
import { useAppStore } from "../store";
import { NETWORKS } from "../utils/networks";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
  },
  noWallet: {
    textAlign: "center" as const,
    padding: "2rem",
    color: "var(--xaman-text-color)",
  },
};

export default function Home() {
  const { account } = useXumm();
  const { networkType, network, customNetwork } = useAppStore();

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        const xrplService = XRPLService.getInstance();
        const endpoint =
          networkType === "CUSTOM"
            ? customNetwork
            : network || NETWORKS[networkType]?.[0]?.value;

        if (endpoint) {
          await xrplService.connect(endpoint, networkType);
        }
      } catch (error) {
        console.error("Failed to connect to XRPL:", error);
      }
    };

    initializeConnection();
  }, [networkType, network, customNetwork]);

  if (!account) {
    return (
      <div style={styles.noWallet}>
        <h2>No wallet connected</h2>
        <p>Please connect your wallet to view NFTs</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <NFTGrid />
    </div>
  );
}
