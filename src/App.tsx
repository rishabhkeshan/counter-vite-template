import {
  useConnectUI,
  useDisconnect,
} from "@fuels/react";
import { bn } from "fuels";
import { Button } from "./components/Button";
import toast, { Toaster } from "react-hot-toast";
import { useActiveWallet } from "./hooks/useActiveWallet";
import { useBrowserWallet } from "./hooks/useBrowserWallet";
import { WalletDisplay } from "./components/WalletDisplay";
import { CURRENT_ENVIRONMENT, NODE_URL, TESTNET_FAUCET_LINK } from "./lib";
import { useFaucet } from "./hooks/useFaucet";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Counter";
import PredicateExample from "./pages/Predicate";
import ScriptExample from "./pages/Script";
import Faucet from "./pages/Faucet";

// const CONTRACT_ID =
//   "0x74fb4df9671c2e0db969570fa4fec292d338a945e65e633419d5c01fc609b72e";

export default function App() {
  const { faucetWallet } = useFaucet();
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const {
    wallet: browserWallet,
    isConnected: isBrowserWalletConnected,
    network: browserWalletNetwork,
  } = useBrowserWallet();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const topUpWallet = async () => {
    if (!wallet) {
      return console.error("Unable to topup wallet because wallet is not set.");
    }

    if (CURRENT_ENVIRONMENT === "local") {
      if (!faucetWallet) {
        return toast.error("Faucet wallet not found.");
      }

      const tx = await faucetWallet?.transfer(
        wallet.address,
        bn.parseUnits("5")
      );
      await tx?.waitForResult();

      toast.success("Wallet topped up!");

      return await refreshWalletBalance?.();
    }

    if (CURRENT_ENVIRONMENT === "testnet") {
      return window.open(
        `${TESTNET_FAUCET_LINK}?address=${wallet.address.toAddress()}`,
        "_blank"
      );
    }
  };

  const showTopUpButton = walletBalance?.lt(bn.parseUnits("5"));

  const showAddNetworkButton =
    browserWallet &&
    browserWalletNetwork &&
    browserWalletNetwork?.url !== NODE_URL;

  const tryToAddNetwork = () => {
    return alert(
      `Please add the network ${NODE_URL} to your Fuel wallet, or swtich to it if you have it already, and refresh the page.`
    );
  };


  return (
    <Router>
      <Toaster />
      <div className="flex flex-col bg-black text-white">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link className="text-fuel-green hover:underline" to="/">
            Home
          </Link>

          <Link
            className="text-fuel-green hover:underline"
            to={`/faucet`}
          >
            Faucet
          </Link>

          {isBrowserWalletConnected && (
            <Button onClick={disconnect}>Disconnect Wallet</Button>
          )}
          {!isBrowserWalletConnected && (
            <Button onClick={connect}>Connect Wallet</Button>
          )}

          {showAddNetworkButton && (
            <Button onClick={tryToAddNetwork} className="bg-red-500">
              Wrong Network
            </Button>
          )}

          <div className="ml-auto">
            <WalletDisplay />
          </div>

          {showTopUpButton && (
            <Button onClick={() => topUpWallet()}>Top-up Wallet</Button>
          )}
        </nav>
        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predicate" element={<PredicateExample />} />
            <Route path="/script" element={<ScriptExample />} />
            <Route path="/faucet" element={<Faucet />} />
          </Routes>{" "}
        </div>
      </div>
    </Router>
  );
}