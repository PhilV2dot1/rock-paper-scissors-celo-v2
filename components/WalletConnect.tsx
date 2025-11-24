"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { motion } from "framer-motion";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-celo-yellow/30 to-gray-100 border-2 border-celo-yellow rounded-xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm font-semibold text-gray-800">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-semibold"
        >
          Disconnect
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-celo-yellow rounded-xl p-4">
      <p className="text-sm mb-3 text-center text-white font-semibold">
        Connect your wallet to play on-chain
      </p>
      <div className="flex flex-col gap-2">
        {connectors.map((connector) => (
          <motion.button
            key={connector.uid}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-celo-yellow to-yellow-300 hover:from-yellow-300 hover:to-celo-yellow text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <span>🔗</span>
                Connect {connector.name}
              </>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
