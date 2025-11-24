import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { injected, metaMask } from "wagmi/connectors";

// Check if running in Farcaster context (client-side only)
const isFarcasterContext = () => {
  if (typeof window === "undefined") return false;
  return (
    (window as any).fc !== undefined ||
    (window as any).farcaster !== undefined ||
    document.referrer.includes("warpcast.com")
  );
};

// Custom RPC endpoints for better reliability
const celoRpcUrl = "https://forno.celo.org";
const alfajoresRpcUrl = "https://alfajores-forno.celo-testnet.org";

// Get app URL for metadata
const getAppUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_URL || "https://rock-paper-scissors-celo-v2.vercel.app";
};

export const config = createConfig({
  chains: [celo, celoAlfajores],
  connectors: [
    // Farcaster Mini App connector
    farcasterMiniApp(),
    // MetaMask connector
    metaMask({
      dappMetadata: {
        name: "Rock Paper Scissors on Celo",
        url: getAppUrl(),
      },
    }),
    // Generic injected wallet connector as fallback
    injected({
      target: () => ({
        id: "injected",
        name: "Browser Wallet",
        provider: typeof window !== "undefined" ? window.ethereum : undefined,
      }),
    }),
  ],
  transports: {
    [celo.id]: http(celoRpcUrl, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10_000,
    }),
    [celoAlfajores.id]: http(alfajoresRpcUrl, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10_000,
    }),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// Export utility function for checking Farcaster context
export { isFarcasterContext };
