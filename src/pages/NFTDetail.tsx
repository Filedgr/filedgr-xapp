import { CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { useXumm } from "../context/XummContext";
import { useAppStore } from "../store";

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  imageContainer: {
    flex: "1",
    maxWidth: "500px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "0.5rem",
    border: "1px solid var(--xaman-border-color)",
  },
  details: {
    flex: "1",
    padding: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--xaman-text-color)",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "var(--xaman-text-color)",
  },
  attributes: {
    marginTop: "2rem",
  },
  attributeTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--xaman-text-color)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  row: {
    borderBottom: "1px solid var(--xaman-border-color)",
  },
  labelCell: {
    padding: "0.75rem",
    fontSize: "0.875rem",
    color: "var(--xaman-text-color)",
    width: "130px",
    minWidth: "130px",
    verticalAlign: "top",
  },
  valueCell: {
    padding: "0.75rem",
    fontSize: "0.875rem",
    color: "var(--xaman-text-color)",
    position: "relative",
  },
  valueCellContent: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    display: "block",
    width: "100%",
    WebkitOverflowScrolling: "touch" as const,
    "--mask-image": "linear-gradient(to right, black 95%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, black 95%, transparent 100%)",
    maskImage: "linear-gradient(to right, black 95%, transparent 100%)",
  } as CSSProperties,
  link: {
    cursor: "pointer",
    color: "var(--xaman-primary-color)",
    textDecoration: "underline",
  },
};

const mediaQuery = window.matchMedia("(min-width: 768px)");
if (mediaQuery.matches) {
  styles.content = {
    ...styles.content,
    flexDirection: "row",
  };
}

export default function NFTDetail() {
  const { NFTokenID } = useParams();
  const { xumm, isXApp } = useXumm();
  const nfts = useAppStore((state) => state.nfts);

  const nft = nfts.find((n) => n.NFTokenID === NFTokenID);

  if (!nft) {
    return (
      <div style={styles.container}>
        <p>NFT not found</p>
      </div>
    );
  }

  const handleLinkClick = (link: string) => {
    if (isXApp && xumm) {
      xumm.xapp?.openBrowser({ url: link });
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const renderAttributeValue = (value: string) => {
    if (value.startsWith("http")) {
      return (
        <div style={styles.valueCellContent}>
          <span
            style={styles.link}
            onClick={() => handleLinkClick(value)}
            role="link"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLinkClick(value);
              }
            }}
          >
            {value}
          </span>
        </div>
      );
    }
    return <div style={styles.valueCellContent}>{value}</div>;
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img
            src={nft.metadata.image}
            alt={nft.metadata.name}
            style={styles.image}
          />
        </div>

        <div style={styles.details}>
          <h1 style={styles.title}>{nft.metadata.name}</h1>
          <p style={styles.description}>{nft.metadata.description}</p>

          <div style={styles.attributes}>
            <h2 style={styles.attributeTitle}>Collection Info</h2>
            <table style={styles.table}>
              <tbody>
                <tr style={styles.row}>
                  <td style={styles.labelCell}>Collection Name:</td>
                  <td style={styles.valueCell}>
                    <div style={styles.valueCellContent}>
                      {nft.metadata.collection.name}
                    </div>
                  </td>
                </tr>
                <tr style={styles.row}>
                  <td style={styles.labelCell}>Collection Family:</td>
                  <td style={styles.valueCell}>
                    <div style={styles.valueCellContent}>
                      {nft.metadata.collection.family}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={styles.attributes}>
            <h2 style={styles.attributeTitle}>Attributes</h2>
            <table style={styles.table}>
              <tbody>
                {nft.metadata.attributes.map((attr, index) => (
                  <tr key={index} style={styles.row}>
                    <td style={styles.labelCell}>{attr.trait_type}:</td>
                    <td style={styles.valueCell}>
                      {renderAttributeValue(attr.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
