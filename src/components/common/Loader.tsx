export default function Loader() {
  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    loader: {
      width: "48px",
      height: "48px",
      border: "4px solid #f3f3f3",
      borderRadius: "50%",
      borderTop: "4px solid var(--xaman-primary-color, #000)",
      animation: "spin 1s linear infinite",
    },
  };

  return (
    <>
      <div style={styles.loaderContainer}>
        <div style={styles.loader} />
      </div>
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>
    </>
  );
}
