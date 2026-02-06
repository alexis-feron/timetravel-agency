"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { destinations, type Destination } from "@/data/destinations";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DestinationDialogProps {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type View = "details" | "reservation" | "confirmed";

interface FormData {
  destinationId: string;
  fullName: string;
  email: string;
  travelers: number;
  departureDate: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  travelers?: string;
  departureDate?: string;
}

const emptyForm = (destId: string): FormData => ({
  destinationId: destId,
  fullName: "",
  email: "",
  travelers: 1,
  departureDate: "",
});

function computeReturnDate(departure: string, days: number): string {
  if (!departure) return "";
  const date = new Date(departure);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function formatDateFR(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function DestinationDialog({
  destination,
  open,
  onOpenChange,
}: DestinationDialogProps) {
  const [view, setView] = useState<View>("details");
  const [form, setForm] = useState<FormData>(
    emptyForm(destination?.id ?? destinations[0].id),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!destination) return null;

  const selectedDest =
    destinations.find((d) => d.id === form.destinationId) ?? destination;

  const returnDate = computeReturnDate(
    form.departureDate,
    selectedDest.durationDays,
  );

  function handleClose(value: boolean) {
    if (!value) {
      setView("details");
      setForm(emptyForm(destination!.id));
      setErrors({});
      setApiError(null);
    }
    onOpenChange(value);
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Le nom est requis";
    if (!form.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Email invalide";
    }
    if (form.travelers < 1 || form.travelers > 10)
      errs.travelers = "Entre 1 et 10 voyageurs";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!form.departureDate) {
      errs.departureDate = "La date de départ est requise";
    } else if (new Date(form.departureDate) <= today) {
      errs.departureDate = "La date doit être dans le futur";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationId: form.destinationId,
          fullName: form.fullName,
          email: form.email,
          travelers: form.travelers,
          departureDate: form.departureDate,
          returnDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setView("confirmed");
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Erreur lors de la réservation",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Confirmed view
  if (view === "confirmed") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="size-16 text-green-500" />
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                Réservation confirmée !
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Votre voyage vers{" "}
                <span className="font-semibold text-gold">
                  {selectedDest.name}
                </span>{" "}
                a bien été enregistré. Un email de confirmation a été envoyé à{" "}
                <span className="font-semibold text-foreground">
                  {form.email}
                </span>
                .
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleClose(false)} className="mt-2">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Reservation form view
  if (view === "reservation") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setView("details");
                  setErrors({});
                  setApiError(null);
                }}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-5" />
              </button>
              <DialogTitle className="font-serif text-2xl">
                Réserver votre voyage
              </DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              Remplissez le formulaire pour planifier votre voyage temporel.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Destination selection */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Destination
              </label>
              <select
                value={form.destinationId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, destinationId: e.target.value }))
                }
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {destinations.map((d) => (
                  <option
                    key={d.id}
                    value={d.id}
                    className="bg-card text-foreground"
                  >
                    {d.name} — {d.epoch} ({d.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Full name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Nom complet
              </label>
              <Input
                placeholder="Jean Dupont"
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="jean@exemple.fr"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Travelers */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                <Users className="mb-0.5 inline size-4 text-gold" /> Nombre de
                voyageurs
              </label>
              <Input
                type="number"
                min={1}
                max={10}
                value={form.travelers}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    travelers: parseInt(e.target.value) || 1,
                  }))
                }
                aria-invalid={!!errors.travelers}
              />
              {errors.travelers && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3" />
                  {errors.travelers}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  <CalendarDays className="mb-0.5 inline size-4 text-gold" />{" "}
                  Départ
                </label>
                <Input
                  type="date"
                  value={form.departureDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, departureDate: e.target.value }))
                  }
                  aria-invalid={!!errors.departureDate}
                />
                {errors.departureDate && (
                  <p className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.departureDate}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Retour
                </label>
                <Input
                  type="text"
                  value={returnDate ? formatDateFR(returnDate) : "—"}
                  disabled
                  className="disabled:opacity-70"
                />
                <p className="text-xs text-muted-foreground">
                  Calculé automatiquement ({selectedDest.duration})
                </p>
              </div>
            </div>

            {/* Price summary */}
            <div className="rounded-md border border-border bg-card/50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {selectedDest.name} — {selectedDest.duration}
                </span>
                <span className="font-bold text-gold">
                  {selectedDest.price}
                </span>
              </div>
              {form.travelers > 1 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  x {form.travelers} voyageurs
                </p>
              )}
            </div>

            {apiError && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {apiError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Réservation en cours...
                </>
              ) : (
                "Confirmer la réservation"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // Details view (default)
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={destination.images.wide}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
        </div>

        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {destination.name}
          </DialogTitle>
          <DialogDescription className="text-gold">
            {destination.tagline} — {destination.epoch}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {destination.longDescription}
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-4 text-gold" />
              {destination.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4 text-gold" />
              {destination.epoch}
            </span>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              Points forts
            </h4>
            <ul className="space-y-1">
              {destination.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Star className="mt-0.5 size-3 shrink-0 text-gold" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">À partir de</p>
              <p className="text-2xl font-bold text-gold">
                {destination.price}
              </p>
            </div>
            <Button
              onClick={() => {
                setForm(emptyForm(destination.id));
                setView("reservation");
              }}
            >
              Réserver ce voyage
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
