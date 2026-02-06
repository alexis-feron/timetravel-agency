import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { destinations } from "@/data/destinations";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destinationId, fullName, email, travelers, departureDate, returnDate } = body;

    // Validation
    if (!destinationId || !fullName || !email || !departureDate || !returnDate) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const destination = destinations.find((d) => d.id === destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination invalide" },
        { status: 400 }
      );
    }

    // Save reservation to Supabase
    const { data: reservation, error: dbError } = await getSupabase()
      .from("reservations")
      .insert({
        destination_id: destinationId,
        destination_name: destination.name,
        full_name: fullName,
        email,
        travelers: Number(travelers),
        departure_date: departureDate,
        return_date: returnDate,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Erreur Supabase:", dbError);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement" },
        { status: 500 }
      );
    }

    // Send confirmation email via Resend
    try {
      await getResend().emails.send({
        from: "TimeTravel Agency <onboarding@resend.dev>",
        to: email,
        subject: `Confirmation de réservation — ${destination.name}`,
        html: `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ede9d5; padding: 40px; border-radius: 12px;">
            <h1 style="color: #d4a853; text-align: center; font-size: 28px; margin-bottom: 8px;">
              TimeTravel Agency
            </h1>
            <p style="text-align: center; color: #a89a7a; margin-bottom: 32px;">Votre voyage temporel est confirmé</p>

            <div style="background: #22223a; border: 1px solid #d4a85333; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #d4a853; margin-top: 0;">${destination.name}</h2>
              <p style="color: #a89a7a; font-style: italic;">${destination.tagline} — ${destination.epoch}</p>

              <table style="width: 100%; margin-top: 16px; color: #ede9d5;">
                <tr>
                  <td style="padding: 8px 0; color: #a89a7a;">Voyageur</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a89a7a;">Nombre de voyageurs</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${travelers}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a89a7a;">Date de départ</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${new Date(departureDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a89a7a;">Date de retour</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${new Date(returnDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</td>
                </tr>
                <tr style="border-top: 1px solid #d4a85333;">
                  <td style="padding: 12px 0 0; color: #a89a7a;">Prix</td>
                  <td style="padding: 12px 0 0; text-align: right; font-weight: bold; font-size: 20px; color: #d4a853;">${destination.price}</td>
                </tr>
              </table>
            </div>

            <p style="text-align: center; color: #a89a7a; font-size: 14px;">
              Référence : <strong style="color: #ede9d5;">${reservation.id.toString().slice(0, 8).toUpperCase()}</strong>
            </p>
            <p style="text-align: center; color: #a89a7a; font-size: 13px; margin-top: 24px;">
              TimeTravel Agency — Voyagez à travers le temps
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Erreur envoi email:", emailError);
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error("Erreur réservation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la réservation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { data, error } = await getSupabase()
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reservations: data });
}
