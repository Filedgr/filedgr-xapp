import { memo } from "react";
import { Link } from "react-router-dom";
import type { NFT } from "../../types/nft";
import ImageLoader from "../common/ImageLoader";

interface NFTCardProps {
  nft: NFT;
}

const styles = {
  card: {
    backgroundColor: "var(--xaman-background-color)",
    borderRadius: "0.5rem",
    border: "1px solid var(--xaman-border-color)",
    overflow: "hidden",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  content: {
    padding: "1rem",
  },
  title: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "var(--xaman-text-color)",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.875rem",
    color: "var(--xaman-text-color)",
    opacity: 0.8,
  },
};

function NFTCard({ nft }: NFTCardProps) {
  return (
    <Link to={`/nft/${nft.NFTokenID}`} style={{ textDecoration: "none" }}>
      <div style={styles.card}>
        <ImageLoader src={nft.metadata.image} alt={nft.metadata.name} />
        <div style={styles.content}>
          <h3 style={styles.title}>{nft.metadata.name}</h3>
          <p style={styles.description}>{nft.metadata.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default memo(NFTCard);
