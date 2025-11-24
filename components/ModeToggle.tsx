"use client";

import { motion } from "framer-motion";
import type { GameMode } from "@/hooks/useGame";

interface ModeToggleProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 border-2 border-gray-700 shadow-lg inline-flex gap-1">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange("free")}
        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
          mode === "free"
            ? "bg-gradient-to-r from-celo-yellow to-yellow-300 text-gray-900 shadow-md"
            : "bg-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        🆓 Free Play
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onModeChange("onchain")}
        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
          mode === "onchain"
            ? "bg-gradient-to-r from-celo-yellow to-yellow-300 text-gray-900 shadow-md"
            : "bg-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        ⛓️ On-Chain
      </motion.button>
    </div>
  );
}
