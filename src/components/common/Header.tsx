import { Link, useLocation } from "react-router-dom";
import { useXumm } from "../../context/XummContext";
import { BackIcon, SettingsIcon, SupportIcon } from "./icons";

const styles = {
  nav: {
    backgroundColor: "var(--xaman-background-color)",
    borderBottom: "1px solid var(--xaman-border-color)",
    padding: "1rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  backButton: {
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--xaman-border-color)",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--xaman-text-color)",
  },
  actionsContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  iconButton: {
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--xaman-border-color)",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
};

export default function Header() {
  const { isXApp } = useXumm();
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          {location.pathname !== "/" && (
            <Link to="/">
              <div style={styles.backButton} aria-label="Go back">
                <BackIcon />
              </div>
            </Link>
          )}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={styles.title}>Filedgr</span>
          </Link>
        </div>

        <div style={styles.actionsContainer}>
          {isXApp && (
            <Link to="/settings">
              <button style={styles.iconButton} aria-label="Settings">
                <SettingsIcon />
              </button>
            </Link>
          )}
          <Link to="/support">
            <button style={styles.iconButton} aria-label="Support">
              <SupportIcon />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
