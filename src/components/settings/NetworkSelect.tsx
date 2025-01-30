import { useAppStore } from "@/store";
import { NETWORK_TYPES, NETWORKS } from "@/utils/networks";
import { useEffect, useState } from "react";
import { XRPLService } from "../../services/xrpl";
import { NetworkType } from "../../types/network";

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
  input: {
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

export default function NetworkSelect() {
  const {
    networkType,
    network: selectedNetwork,
    customNetwork,
    setNetworkType,
    setNetwork,
    setCustomNetwork,
  } = useAppStore();

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (networkType !== "CUSTOM") {
      const defaultNetwork = NETWORKS[networkType][0].value;
      setNetwork(defaultNetwork);
      handleNetworkChange(defaultNetwork);
    }
  }, [networkType]);

  const handleNetworkChange = async (endpoint: string) => {
    setIsConnecting(true);
    try {
      const xrplService = XRPLService.getInstance();
      await xrplService.connect(endpoint, networkType);
      setNetwork(endpoint);
    } catch (error) {
      console.error("Failed to connect to network:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCustomNetworkChange = async (input: string) => {
    setCustomNetwork(input);
    if (input.startsWith("wss://")) {
      await handleNetworkChange(input);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="networkType" style={styles.label}>
          Select Node Type:
        </label>
        <select
          id="networkType"
          value={networkType}
          onChange={(e) => setNetworkType(e.target.value as NetworkType)}
          style={styles.select}
          disabled={isConnecting}
        >
          {NETWORK_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {networkType !== "CUSTOM" ? (
        <div>
          <label htmlFor="network" style={styles.label}>
            Select Network:
          </label>
          <select
            id="network"
            value={selectedNetwork}
            onChange={(e) => handleNetworkChange(e.target.value)}
            style={styles.select}
            disabled={isConnecting}
          >
            {NETWORKS[networkType].map((network) => (
              <option key={network.value} value={network.value}>
                {network.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="customNetwork" style={styles.label}>
            Enter Custom Network:
          </label>
          <input
            id="customNetwork"
            type="text"
            value={customNetwork}
            onChange={(e) => handleCustomNetworkChange(e.target.value)}
            placeholder="wss://example.com"
            style={styles.input}
            disabled={isConnecting}
          />
        </div>
      )}

      {isConnecting && <p>Connecting to network...</p>}
    </div>
  );
}
