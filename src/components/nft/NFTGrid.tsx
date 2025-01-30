import { CSSProperties } from "react";
import { useXumm } from "../../context/XummContext";
import { useNFTs } from "../../hooks/useNFTs";
import Loader from "../common/Loader";
import NFTCard from "./NFTCard";

const styles: Record<string, CSSProperties> = {
  container: {
    padding: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },
  loadMore: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "var(--xaman-background-color)",
    border: "1px solid var(--xaman-border-color)",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "var(--xaman-text-color)",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center",
  },
  emptyText: {
    fontSize: "1rem",
    color: "var(--xaman-text-color)",
    marginBottom: "1.5rem",
    maxWidth: "400px",
    lineHeight: "1.5",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    alignItems: "center",
  },
  redirectButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "var(--xaman-primary-color, #000)",
    color: "#fff",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "opacity 0.2s",
  },
  retryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "transparent",
    color: "var(--xaman-text-color)",
    border: "2px solid var(--xaman-primary-color, #000)",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 0.2s",
  },
};

const FILEDGR_URL = "https://filedgr.com";

export default function NFTGrid() {
  const { nfts, isLoading, marker, loadMore, refresh } = useNFTs();
  const { xumm, isXApp } = useXumm();

  const handleRedirect = () => {
    if (isXApp && xumm) {
      xumm.xapp?.openBrowser({ url: FILEDGR_URL });
    } else {
      window.open(FILEDGR_URL, "_blank", "noopener,noreferrer");
    }
  };

  if (isLoading && nfts.length === 0) {
    return <Loader />;
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyText}>
          You currently have no NFTs. Start using Filedgr and own an NFT to show
          up here.
        </p>
        <div style={styles.buttonContainer}>
          <button
            onClick={handleRedirect}
            style={styles.redirectButton}
            role="link"
            aria-label="Visit Filedgr"
          >
            Visit Filedgr
          </button>
          <button
            onClick={refresh}
            style={styles.retryButton}
            disabled={isLoading}
            aria-label="Retry loading"
          >
            {isLoading ? "Retrying..." : "Retry Loading"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {nfts.map((nft) => (
          <NFTCard key={nft.NFTokenID} nft={nft} />
        ))}
      </div>

      {marker != undefined && marker !== null && marker !== "" && (
        <div style={styles.loadMore}>
          <button onClick={loadMore} disabled={isLoading} style={styles.button}>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
