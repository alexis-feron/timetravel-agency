"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/data/destinations";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export function DestinationCard({
  destination,
  onSelect,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-border/50 bg-card/80 py-0 backdrop-blur-sm transition-colors hover:border-gold/50"
        onClick={() => onSelect(destination)}
      >
        <div className="relative aspect-square overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={destination.images.square}
              alt={destination.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
              {destination.epoch}
            </span>
          </div>
        </div>

        <CardContent className="space-y-3 p-5">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {destination.name}
          </h3>
          <p className="text-sm text-gold">{destination.tagline}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {destination.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {destination.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {destination.epoch}
              </span>
            </div>
            <span className="text-sm font-semibold text-gold">
              {destination.price}
            </span>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            Découvrir
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
