"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { DestinationDialog } from "@/components/destinations/DestinationDialog";
import { destinations, type Destination } from "@/data/destinations";

export function DestinationsSection() {
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-gradient-gold font-serif text-3xl font-bold sm:text-4xl">
            Nos Destinations Temporelles
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Trois époques, trois aventures uniques. Choisissez votre destination
            et laissez-nous vous transporter.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <AnimatedSection key={dest.id} delay={i * 0.2}>
              <DestinationCard destination={dest} onSelect={setSelected} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      <DestinationDialog
        destination={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </section>
  );
}
