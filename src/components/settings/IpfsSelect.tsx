import { useState } from "react";
import type { IpfsGateway } from "../../types/ipfs";

const styles = {
  container: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "var(--xaman-text-color)",
  },
  select: {
    width: "100%",
    maxWidth: "24rem",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--xaman-border-color)",
    backgroundColor: "transparent",
    color: "var(--xaman-text-color)",
    fontSize: "0.875rem",
  },
};

const IPFS_GATEWAYS: IpfsGateway[] = [
  {
    name: "Cloudflare IPFS",
    domain: "https://ipfs.io/ipfs/",
    obfuscateTime: null,
  },
  { name: "CF IPFS", domain: "https://ipfs.io/ipfs/", obfuscateTime: null },
  { name: "IPFS", domain: "https://ipfs.io/ipfs/", obfuscateTime: null },
];

export default function IpfsSelect() {
  const [selectedGateway, setSelectedGateway] = useState<IpfsGateway>(
    IPFS_GATEWAYS[0]
  );

  const handleGatewayChange = (gatewayName: string) => {
    const gateway = IPFS_GATEWAYS.find((g) => g.name === gatewayName);
    if (gateway) {
      setSelectedGateway(gateway);
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor="ipfsGateway" style={styles.label}>
        IPFS Gateway:
      </label>
      <select
        id="ipfsGateway"
        value={selectedGateway.name}
        onChange={(e) => handleGatewayChange(e.target.value)}
        style={styles.select}
      >
        {IPFS_GATEWAYS.map((gateway) => (
          <option key={gateway.name} value={gateway.name}>
            {gateway.name}
          </option>
        ))}
      </select>
    </div>
  );
}
