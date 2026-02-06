import { NextRequest, NextResponse } from "next/server";
import { chatWithMistral } from "@/lib/mistral";

export async function POST(request: NextRequest) {
  try {
    const { destinationId, scores } = await request.json();

    const destinationNames: Record<string, string> = {
      titanic: "Le Titanic (1912)",
      jurassic: "Isla Nublar / Jurassic Park",
      pirate: "Mer des Caraïbes (1715)",
    };

    const name = destinationNames[destinationId] || destinationId;

    const prompt = `Un client vient de faire notre quiz de recommandation de voyage temporel.
Ses résultats indiquent une préférence pour la destination "${name}".
Scores : Titanic=${scores.titanic}, Jurassic=${scores.jurassic}, Pirates=${scores.pirate}.

Génère une recommandation personnalisée et enthousiaste (3-4 phrases) expliquant pourquoi cette destination est parfaite pour ce client. Base-toi sur les scores pour personnaliser le message.`;

    const recommendation = await chatWithMistral([
      { role: "user", content: prompt },
    ]);

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error("Quiz recommendation error:", error);
    return NextResponse.json(
      { error: "Impossible de générer la recommandation." },
      { status: 500 }
    );
  }
}
