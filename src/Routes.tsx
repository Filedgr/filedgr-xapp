import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NFTDetail from "./pages/NFTDetail";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nft/:NFTokenID" element={<NFTDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}
