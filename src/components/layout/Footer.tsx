import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Footer() {
  return (
    <AnimatedSection>
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-gradient-gold font-serif text-lg font-bold">
                TimeTravel Agency
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Votre portail vers les époques les plus extraordinaires. Voyages
                temporels de luxe depuis ∞.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Destinations</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#destinations"
                    className="hover:text-gold transition-colors"
                  >
                    Le Titanic — 1912
                  </a>
                </li>
                <li>
                  <a
                    href="#destinations"
                    className="hover:text-gold transition-colors"
                  >
                    Isla Nublar — Crétacé
                  </a>
                </li>
                <li>
                  <a
                    href="#destinations"
                    className="hover:text-gold transition-colors"
                  >
                    Mer des Caraïbes — 1715
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Contact</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>contact@timetravel-agency.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>42 Rue du Temps, 75001 Paris</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} TimeTravel Agency -{" "}
              <a
                href="https://alexis-feron.com"
                target="_blank"
                className="hover:text-gold transition-colors"
              >
                Alexis Feron
              </a>
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
