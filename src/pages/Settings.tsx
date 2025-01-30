import IpfsSelect from "../components/settings/IpfsSelect";
import NetworkSelect from "../components/settings/NetworkSelect";

const styles = {
  container: {
    maxWidth: "48rem",
    margin: "0 auto",
    padding: "1.5rem",
  },
  card: {
    backgroundColor: "var(--xaman-background-color)",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "var(--xaman-text-color)",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
};

export default function Settings() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Settings</h1>
        <NetworkSelect />
        <IpfsSelect />
      </div>
    </div>
  );
}
