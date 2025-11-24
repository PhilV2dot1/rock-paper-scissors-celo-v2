"use client";

import { useState, useEffect, ReactNode, createContext, useContext } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { initializeFarcaster } from "@/lib/farcaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Create context for Farcaster state
interface FarcasterContextType {
  isInFarcaster: boolean;
  isSDKReady: boolean;
}

const FarcasterContext = createContext<FarcasterContextType>({
  isInFarcaster: false,
  isSDKReady: false,
});

export const useFarcaster = () => useContext(FarcasterContext);

export function Providers({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isInFarcaster, setIsInFarcaster] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      // Check if in Farcaster context
      const inFC =
        typeof window !== "undefined" &&
        ((window as any).fc !== undefined ||
          (window as any).farcaster !== undefined ||
          document.referrer.includes("warpcast.com"));

      setIsInFarcaster(inFC);

      if (inFC) {
        try {
          const success = await initializeFarcaster();
          if (!success) {
            console.warn("Farcaster SDK initialization returned false");
            setInitError("SDK initialization failed");
          }
        } catch (error) {
          console.error("SDK initialization error:", error);
          setInitError(error instanceof Error ? error.message : "Unknown error");
        }
      }

      // Always set as loaded to allow app to function
      setIsSDKLoaded(true);
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-celo-yellow/30">
        <div className="text-center">
          <div className="text-gray-900 text-xl font-semibold mb-2">Loading...</div>
          <div className="text-sm text-gray-600">Initializing application</div>
        </div>
      </div>
    );
  }

  return (
    <FarcasterContext.Provider value={{ isInFarcaster, isSDKReady: !initError }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {initError && isInFarcaster && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs text-yellow-700">
              ⚠️ Farcaster SDK: {initError}
            </div>
          )}
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </FarcasterContext.Provider>
  );
}
