import { ReactNode } from "react";
import AddressBar from "./common/AddressBar";
import Header from "./common/Header";

interface LayoutProps {
  children: ReactNode;
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "var(--xaman-background-color, #ffffff)",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={styles.appContainer}>
      <Header />
      <AddressBar />
      <main style={styles.mainContent}>{children}</main>
    </div>
  );
}
