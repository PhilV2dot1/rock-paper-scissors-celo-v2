"use client";

import { useState, useEffect, ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { initializeFarcaster } from "@/lib/farcaster";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await initializeFarcaster();
        setIsSDKLoaded(true);
      } catch (error) {
        console.error("SDK initialization error:", error);
        // Continue anyway for testing outside Farcaster
        setIsSDKLoaded(true);
      }
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-celo-yellow/30">
        <div className="text-gray-900 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
