"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PlayResult } from "@/hooks/useGame";

interface GameStatusProps {
  result: PlayResult | null;
  message: string;
}

const CHOICES_EMOJI = ["🪨", "📄", "✂️"];

export function GameStatus({ result, message }: GameStatusProps) {
  if (!result && !message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="space-y-3"
      >
        {result && (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 border-2 border-gray-700 shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="text-center">
                <div className="text-5xl mb-1">
                  {CHOICES_EMOJI[result.playerChoice]}
                </div>
                <div className="text-xs font-semibold text-gray-600">You</div>
              </div>
              <div className="text-2xl font-bold text-gray-400">vs</div>
              <div className="text-center">
                <div className="text-5xl mb-1">
                  {CHOICES_EMOJI[result.computerChoice]}
                </div>
                <div className="text-xs font-semibold text-gray-600">CPU</div>
              </div>
            </div>
            <div
              className={`text-center text-lg font-bold py-2 px-4 rounded-xl ${
                result.result === "win"
                  ? "bg-green-100 text-green-800"
                  : result.result === "lose"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {message}
            </div>
          </div>
        )}

        {!result && message && (
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white text-center py-3 px-4 rounded-xl font-semibold border-2 border-celo-yellow">
            {message}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
