import { useState } from "react";

const styles = {
  container: {
    position: "relative" as const,
    width: "100%",
    paddingTop: "75%", // 4:3 aspect ratio
    backgroundColor: "var(--xaman-border-color)",
    overflow: "hidden",
  },
  image: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "opacity 0.3s",
  },
  placeholder: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "var(--xaman-border-color)",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

interface ImageLoaderProps {
  src: string;
  alt: string;
}

export default function ImageLoader({ src, alt }: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.placeholder} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {!isLoaded && <div style={styles.placeholder} />}
      <img
        src={src}
        alt={alt}
        style={{
          ...styles.image,
          opacity: isLoaded ? 1 : 0,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
