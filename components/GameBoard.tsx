"use client";

import { motion } from "framer-motion";
import type { Choice } from "@/hooks/useGame";

interface GameBoardProps {
  onChoice: (choice: Choice) => void;
  disabled: boolean;
}

const CHOICES = [
  { emoji: "🪨", name: "Rock", index: 0 as Choice },
  { emoji: "📄", name: "Paper", index: 1 as Choice },
  { emoji: "✂️", name: "Scissors", index: 2 as Choice },
];

export function GameBoard({ onChoice, disabled }: GameBoardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-900">
        Choose Your Move
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {CHOICES.map((choice) => (
          <motion.button
            key={choice.index}
            onClick={() => onChoice(choice.index)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-white/80 backdrop-blur-lg rounded-2xl border-2 border-gray-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: !disabled
                ? "0 0 0 3px #FCFF52, 0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="text-5xl">{choice.emoji}</span>
            <span className="text-sm font-bold text-gray-900">
              {choice.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
