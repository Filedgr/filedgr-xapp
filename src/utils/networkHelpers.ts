export function determineNetworkType(
  endpoint: string | null
): "MAINNET" | "TESTNET" | "DEVNET" {
  if (!endpoint) return "MAINNET";

  const normalizedEndpoint = endpoint.toLowerCase();

  if (normalizedEndpoint.includes("testnet")) {
    return "TESTNET";
  } else if (normalizedEndpoint.includes("devnet")) {
    return "DEVNET";
  } else {
    return "MAINNET";
  }
}
