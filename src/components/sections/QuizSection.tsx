"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizResult } from "@/components/quiz/QuizResult";
import { quizQuestions } from "@/data/quiz";

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ titanic: 0, jurassic: 0, pirate: 0 });
  const [finished, setFinished] = useState(false);

  function handleAnswer(optionScores: {
    titanic: number;
    jurassic: number;
    pirate: number;
  }) {
    const newScores = {
      titanic: scores.titanic + optionScores.titanic,
      jurassic: scores.jurassic + optionScores.jurassic,
      pirate: scores.pirate + optionScores.pirate,
    };
    setScores(newScores);

    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function handleReset() {
    setStep(0);
    setScores({ titanic: 0, jurassic: 0, pirate: 0 });
    setFinished(false);
  }

  return (
    <section id="quiz" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-gradient-gold font-serif text-3xl font-bold sm:text-4xl">
            Trouvez Votre Voyage Idéal
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Répondez à 4 questions pour découvrir la destination faite pour
            vous.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
            {finished ? (
              <QuizResult scores={scores} onReset={handleReset} />
            ) : (
              <QuizCard step={step} onAnswer={handleAnswer} />
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
