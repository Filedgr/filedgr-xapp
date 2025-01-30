import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Xumm } from "xumm";
import Loader from "./components/common/Loader";
import Layout from "./components/Layout";
import { XummProvider } from "./context/XummContext";
import AppRoutes from "./Routes";
import { XRPLService } from "./services/xrpl";
import { useAppStore } from "./store";
import { determineNetworkType } from "./utils/networkHelpers";
import { NETWORKS } from "./utils/networks";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [xumm, setXumm] = useState<Xumm | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const {
    setNetworkType,
    setNetwork: setStoreNetwork,
    clearNfts,
  } = useAppStore();

  const refreshNFTs = async (
    _accountAddress: string,
    networkEndpoint: string
  ) => {
    try {
      // Clear existing NFTs first
      clearNfts();

      // Connect to the new network
      const xrplService = XRPLService.getInstance();
      await xrplService.connect(networkEndpoint);
    } catch (error) {
      console.error("Failed to refresh NFTs:", error);
    }
  };

  useEffect(() => {
    const initializeXumm = async () => {
      try {
        const xummInstance = new Xumm(import.meta.env.VITE_XUMM_API_KEY);

        if (xummInstance.runtime?.xapp) {
          await xummInstance.xapp?.ready();
          const [accountResponse, networkResponse] = await Promise.all([
            xummInstance.user?.account,
            xummInstance.user?.networkEndpoint,
          ]);

          // Set the account
          setAccount(accountResponse || null);

          // Set the network and determine network type
          setNetwork(networkResponse || null);

          if (networkResponse && accountResponse) {
            const networkType = determineNetworkType(networkResponse);
            setNetworkType(networkType);

            // Find the matching network in our configuration
            const availableNetworks = NETWORKS[networkType];
            const matchingNetwork = availableNetworks.find(
              (n) => n.value.toLowerCase() === networkResponse.toLowerCase()
            );

            // Get the network endpoint to use
            const networkEndpoint = matchingNetwork
              ? matchingNetwork.value
              : availableNetworks[0].value;

            // Set the network in the store
            setStoreNetwork(networkEndpoint);

            // Refresh NFTs with the new network
            await refreshNFTs(accountResponse, networkEndpoint);
          }
        }

        setXumm(xummInstance);
      } catch (error) {
        console.error("Failed to initialize Xumm:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeXumm();
  }, [setNetworkType, setStoreNetwork, clearNfts]);

  useEffect(() => {
    if (account && network) {
      refreshNFTs(account, network);
      console.log("Account and network are available");
    } else {
      console.log("Account or network is not available");
    }
  }, [network, account]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <XummProvider xumm={xumm} account={account} network={network}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </XummProvider>
  );
}

export default App;
