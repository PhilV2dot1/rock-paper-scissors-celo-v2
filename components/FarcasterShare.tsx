"use client";

import { motion } from "framer-motion";
import { shareGameResult, type GameStats } from "@/lib/farcaster";
import type { GameResult } from "@/hooks/useGame";
import { useState } from "react";

interface FarcasterShareProps {
  result: GameResult;
  stats: GameStats;
}

export function FarcasterShare({ result, stats }: FarcasterShareProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const appUrl = window.location.origin;
      await shareGameResult(result, stats, appUrl);
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-400"
    >
      {isSharing ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sharing...
        </span>
      ) : (
        <span>📣 Share on Farcaster</span>
      )}
    </motion.button>
  );
}
