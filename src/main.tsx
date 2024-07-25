import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FuelProvider } from "@fuels/react";
import { Provider } from "fuels";
import {
  BakoSafeConnector,
  BurnerWalletConnector,
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
  WalletConnectConnector,
} from "@fuels/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NODE_URL } from "./lib";
import { ActiveWalletProvider } from "./hooks/useActiveWallet";

const queryClient = new QueryClient();

const Root = () => {
  const providerToUse = useMemo(() => Provider.create(NODE_URL), [NODE_URL]);
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <FuelProvider
          fuelConfig={{
            connectors: [
              new FuelWalletConnector(),
              new BurnerWalletConnector({
                fuelProvider: providerToUse,
              }),
              new WalletConnectConnector({
                fuelProvider: providerToUse,
              }),
              new BakoSafeConnector(),
              new FueletWalletConnector(),
              new FuelWalletDevelopmentConnector(),
            ],
          }}
        >
          <ActiveWalletProvider>
            <App />
          </ActiveWalletProvider>
        </FuelProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
