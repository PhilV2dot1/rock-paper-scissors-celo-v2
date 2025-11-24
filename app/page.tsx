"use client";

import { useGame } from "@/hooks/useGame";
import { GameBoard } from "@/components/GameBoard";
import { GameStatus } from "@/components/GameStatus";
import { PlayerStats } from "@/components/PlayerStats";
import { ModeToggle } from "@/components/ModeToggle";
import { WalletConnect } from "@/components/WalletConnect";
import { FarcasterShare } from "@/components/FarcasterShare";
import { motion } from "framer-motion";

export default function Home() {
  const {
    mode,
    status,
    stats,
    lastResult,
    message,
    play,
    resetStats,
    switchMode,
  } = useGame();

  const isProcessing = status === "processing";
  const isFinished = status === "finished";

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-celo-yellow/30 p-4 sm:p-8"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      <div className="max-w-md mx-auto space-y-4 sm:space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-xl border-2 border-gray-700 text-center space-y-2"
          style={{
            boxShadow: "0 0 0 6px #FCFF52, 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-5xl mb-2" role="img" aria-label="Game controller">
            🎮
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Rock Paper Scissors
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-semibold">
            Play on Celo Blockchain
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex justify-center">
          <ModeToggle mode={mode} onModeChange={switchMode} />
        </div>

        {/* Wallet Connect (On-Chain Mode) */}
        {mode === "onchain" && <WalletConnect />}

        {/* Game Status */}
        <GameStatus result={lastResult} message={message} />

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-gray-700"
          style={{
            boxShadow: "0 0 0 6px #FCFF52, 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <GameBoard onChoice={play} disabled={isProcessing} />
        </motion.div>

        {/* Share Button (Finished State) */}
        {isFinished && lastResult && (
          <FarcasterShare result={lastResult.result} stats={stats} />
        )}

        {/* Player Stats */}
        <PlayerStats stats={stats} onReset={resetStats} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-gray-500 pt-2"
        >
          <p>
            Built on{" "}
            <span className="font-semibold text-gray-700">Celo</span> •
            Powered by{" "}
            <span className="font-semibold text-gray-700">Farcaster</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
