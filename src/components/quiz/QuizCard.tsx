"use client";

import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/quiz";

interface QuizCardProps {
  step: number;
  onAnswer: (scores: { titanic: number; jurassic: number; pirate: number }) => void;
}

export function QuizCard({ step, onAnswer }: QuizCardProps) {
  const question = quizQuestions[step];
  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="space-y-6"
      >
        {/* Progress */}
        <div className="flex items-center gap-2">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-gold" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Question {step + 1} sur {quizQuestions.length}
        </p>

        <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <motion.button
              key={option.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              onClick={() => onAnswer(option.scores)}
              className="w-full rounded-lg border border-border bg-card/50 p-4 text-left text-sm text-foreground transition-colors hover:border-gold/50 hover:bg-accent"
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
