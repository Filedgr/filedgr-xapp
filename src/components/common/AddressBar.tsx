import { useEffect, useState } from "react";
import { useXumm } from "../../context/XummContext";
import { useAppStore } from "../../store";

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  input: {
    width: "100%",
    maxWidth: "24rem",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--xaman-border-color)",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    color: "var(--xaman-text-color)",
  },
};

export default function AddressBar() {
  const { isXApp, account } = useXumm();
  const clearNfts = useAppStore((state) => state.clearNfts);
  const [address, setAddress] = useState(account || "");

  useEffect(() => {
    if (account) {
      setAddress(account);
    }
  }, [account]);

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    clearNfts();
  };

  if (!isXApp) {
    return null;
  }

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={address}
        onChange={(e) => handleAddressChange(e.target.value)}
        placeholder="Enter XRPL address"
        style={styles.input}
        aria-label="XRPL address"
      />
    </div>
  );
}
