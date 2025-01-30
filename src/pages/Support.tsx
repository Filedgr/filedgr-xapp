import { ReactNode } from "react";

const styles = {
  container: {
    maxWidth: "48rem",
    margin: "0 auto",
    padding: "1.5rem",
  },
  section: {
    backgroundColor: "var(--xaman-background-color)",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--xaman-text-color)",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "0.875rem",
    color: "var(--xaman-text-color)",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  question: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "var(--xaman-text-color)",
    marginBottom: "0.5rem",
  },
};

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div style={styles.section}>
      <h2 style={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

export default function Support() {
  return (
    <div style={styles.container}>
      <Section title="Disclaimer">
        <p style={styles.text}>
          The contents of our websites (including subdomains of our websites)
          and applications through which we make our products/services available
          including, for example our Filedgr NFT viewer application via Xumm and
          Filedgr API (together, the "Platform") is provided for general
          information only. It is not intended to amount to advice on which you
          should rely.
        </p>
        <p style={styles.text}>
          Although we make reasonable efforts to update the information on our
          Platform, we make no representations, warranties or guarantees,
          whether expressed or implied, that the content on our Platform is
          accurate, complete or up to date.
        </p>
        <p style={styles.text}>© {new Date().getFullYear()} Filedgr SARL</p>
      </Section>

      <Section title="FAQ">
        <div>
          <h3 style={styles.question}>
            Why is my NFT's artwork not being displayed?
          </h3>
          <p style={styles.text}>
            This could be due to (i) a slow connection, or (ii) the viewer is
            unable to read the metadata (referencing where the NFT asset is
            stored).
          </p>
          <p style={styles.text}>
            If you can view the NFT details and attributes in the viewer, then
            the error is most likely due to a slow connection where the network
            times out. This error occurs most frequently when using a public
            IPFS link. Please try again by quitting the xApp and reload.
          </p>

          <h3 style={styles.question}>
            What XLS20 artwork metadata does this xApp support?
          </h3>
          <p style={styles.text}>
            For XLS20 NFTs, our xApp is compatible with XLS24d metadata
            standards. If your XLS20 NFT artwork is not displayed, we advise you
            to request support from the Token Issuer and/or service used to
            acquire the NFT.
          </p>

          <h3 style={styles.question}>What features are being added next?</h3>
          <p style={styles.text}>
            The Filedgr Web3 API for developers and business use cases, are next
            on our roadmap. Please suggest any other features you would like to
            see by getting in contact with us. Please follow us via Twitter and
            our website for updates, airdrop news and product releases.
          </p>
        </div>
      </Section>
    </div>
  );
}
