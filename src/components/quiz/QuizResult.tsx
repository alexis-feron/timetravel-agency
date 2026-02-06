"use client";

import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface QuizResultProps {
  scores: { titanic: number; jurassic: number; pirate: number };
  onReset: () => void;
}

const fallbackRecommendations: Record<string, string> = {
  titanic:
    "Votre goût pour l'élégance et le raffinement fait du Titanic la destination parfaite pour vous. Embarquez pour une traversée inoubliable au cœur de la Belle Époque maritime !",
  jurassic:
    "Votre soif d'aventure et votre passion pour la nature font d'Isla Nublar votre destination idéale. Préparez-vous à vivre face à face avec les créatures les plus extraordinaires de l'histoire !",
  pirate:
    "Votre amour de la liberté et de l'exploration fait de la Mer des Caraïbes votre terrain de jeu parfait. Hissez les voiles vers l'aventure la plus palpitante de votre vie !",
};

export function QuizResult({ scores, onReset }: QuizResultProps) {
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const winnerId = (Object.entries(scores) as [string, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0] as "titanic" | "jurassic" | "pirate";

  const destination = destinations.find((d) => d.id === winnerId)!;

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        const res = await fetch("/api/quiz/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destinationId: winnerId, scores }),
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setRecommendation(data.recommendation);
      } catch {
        setRecommendation(fallbackRecommendations[winnerId]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendation();
  }, [winnerId, scores]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="space-y-6"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={destination.images.wide}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-xs text-gold">Votre destination idéale</p>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {destination.name}
          </h3>
          <p className="text-sm text-muted-foreground">{destination.tagline}</p>
        </div>
      </div>

      <div className="min-h-20">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Génération de votre recommandation personnalisée...
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {recommendation}
          </motion.p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="flex-1">
          <a href="#destinations">En savoir plus</a>
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1">
          Refaire le quiz
        </Button>
      </div>
    </motion.div>
  );
}
