import { createContext, ReactNode, useContext } from "react";
import { Xumm } from "xumm";

interface XummContextType {
  xumm: Xumm | null;
  isXApp: boolean;
  account: string | null;
  network: string | null;
}

const XummContext = createContext<XummContextType>({
  xumm: null,
  isXApp: false,
  account: null,
  network: null,
});

interface XummProviderProps {
  children: ReactNode;
  xumm: Xumm | null;
  account: string | null;
  network: string | null;
}

export function XummProvider({
  children,
  xumm,
  account,
  network,
}: XummProviderProps) {
  const isXApp = xumm?.runtime?.xapp ?? false;

  return (
    <XummContext.Provider value={{ xumm, isXApp, account, network }}>
      {children}
    </XummContext.Provider>
  );
}

export function useXumm() {
  const context = useContext(XummContext);
  if (context === undefined) {
    throw new Error("useXumm must be used within a XummProvider");
  }
  return context;
}
