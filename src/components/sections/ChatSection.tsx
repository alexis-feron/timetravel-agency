"use client";

import { MessageCircle } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

export function ChatSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection className="text-center">
          <h2 className="text-gradient-gold font-serif text-3xl font-bold sm:text-4xl">
            Parlez à Notre Agent Temporel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Des questions sur nos destinations ? Notre assistant IA est là pour
            vous guider. Cliquez sur la bulle en bas à droite pour commencer la
            conversation.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="text-base"
              onClick={() => {
                // Trigger the floating chat bubble
                const event = new CustomEvent("open-chat");
                window.dispatchEvent(event);
              }}
            >
              <MessageCircle className="mr-2 size-5" />
              Discutez avec notre agent
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
