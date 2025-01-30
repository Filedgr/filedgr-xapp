const IPFS_GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

export async function getIpfsJson(hash: string): Promise<any> {
  const errors: Error[] = [];

  for (const gateway of IPFS_GATEWAYS) {
    try {
      const response = await fetch(gateway + hash, {
        cache: "force-cache",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("image") || contentType?.includes("video")) {
        return contentType.includes("image")
          ? { image: response.url }
          : { video: response.url };
      }

      return await response.json();
    } catch (error) {
      errors.push(error as Error);
      continue;
    }
  }

  throw new Error(
    `Failed to fetch from all IPFS gateways: ${errors.map((e) => e.message).join(", ")}`
  );
}
