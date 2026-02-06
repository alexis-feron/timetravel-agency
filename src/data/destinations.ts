export interface Destination {
  id: "titanic" | "jurassic" | "pirate";
  name: string;
  tagline: string;
  epoch: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  durationDays: number;
  highlights: string[];
  colors: {
    primary: string;
    accent: string;
    gradient: string;
  };
  images: {
    square: string;
    wide: string;
    portrait: string;
  };
  video: string;
}

export const destinations: Destination[] = [
  {
    id: "titanic",
    name: "Le Titanic",
    tagline: "La Belle Époque sur Mer",
    epoch: "14 Avril 1912",
    description:
      "Revivez le luxe et la splendeur du plus grand paquebot jamais construit. Grand escalier, salle à manger de première classe, l'océan à perte de vue.",
    longDescription:
      "Embarquez pour une traversée inoubliable à bord du RMS Titanic, le matin du 14 avril 1912. Admirez le grand escalier majestueux, savourez un dîner gastronomique en première classe et promenez-vous sur le pont supérieur face à l'immensité de l'Atlantique. Une expérience d'élégance et de raffinement au cœur de la Belle Époque maritime — avant que l'histoire ne bascule.",
    price: "12 500 €",
    duration: "3 jours",
    durationDays: 3,
    highlights: [
      "Dîner gastronomique en première classe",
      "Visite du grand escalier monumental",
      "Promenade sur le pont supérieur",
      "Concert privé de l'orchestre du bord",
    ],
    colors: {
      primary: "from-blue-900 to-slate-800",
      accent: "text-amber-400",
      gradient: "bg-gradient-to-br from-blue-950/80 to-slate-900/80",
    },
    images: {
      square: "/assets/images/titanic1.1.png",
      wide: "/assets/images/titanic16.9.png",
      portrait: "/assets/images/titanic9.16.png",
    },
    video: "/assets/videos/titanic.mp4",
  },
  {
    id: "jurassic",
    name: "Isla Nublar",
    tagline: "L'Ère des Dinosaures",
    epoch: "1993 / Crétacé -65M années",
    description:
      "Jungle tropicale luxuriante, énormes portes en bois, 4x4 colorés sous la pluie, fougères géantes et T-Rex au loin.",
    longDescription:
      "Pénétrez dans le parc le plus extraordinaire jamais créé sur Isla Nublar. Explorez une jungle luxuriante peuplée de créatures préhistoriques, traversez les mythiques portes en bois à bord d'un 4x4 et observez un T-Rex dans son habitat naturel. Entre technologie rétro des années 90 et nature sauvage du Crétacé, vivez une aventure que vous n'oublierez jamais.",
    price: "18 900 €",
    duration: "5 jours",
    durationDays: 5,
    highlights: [
      "Safari en 4x4 à travers le parc",
      "Observation du T-Rex en milieu naturel",
      "Visite du laboratoire de génétique",
      "Exploration de la jungle tropicale",
    ],
    colors: {
      primary: "from-green-900 to-yellow-900",
      accent: "text-yellow-400",
      gradient: "bg-gradient-to-br from-green-950/80 to-yellow-950/80",
    },
    images: {
      square: "/assets/images/jurassic1.1.png",
      wide: "/assets/images/jurassic16.9.png",
      portrait: "/assets/images/jurassic9.16.png",
    },
    video: "/assets/videos/jurassic.mp4",
  },
  {
    id: "pirate",
    name: "Mer des Caraïbes",
    tagline: "L'Âge d'Or de la Piraterie",
    epoch: "1715",
    description:
      "Eaux turquoises, vieux gréements, drapeaux noirs, grottes au trésor et îles tropicales paradisiaques.",
    longDescription:
      "Hissez les voiles vers l'âge d'or de la piraterie ! Naviguez sur des eaux turquoises à bord d'un galion authentique, explorez des grottes secrètes regorgeant de trésors et accostez sur des îles tropicales oubliées du monde. Une aventure solaire et mystérieuse où chaque lever de soleil promet une nouvelle découverte.",
    price: "15 200 €",
    duration: "7 jours",
    durationDays: 7,
    highlights: [
      "Navigation à bord d'un galion authentique",
      "Chasse au trésor sur une île déserte",
      "Exploration de grottes secrètes",
      "Initiation au combat à l'épée",
    ],
    colors: {
      primary: "from-cyan-900 to-amber-900",
      accent: "text-cyan-400",
      gradient: "bg-gradient-to-br from-cyan-950/80 to-amber-950/80",
    },
    images: {
      square: "/assets/images/pirate1.1.png",
      wide: "/assets/images/pirate16.9.png",
      portrait: "/assets/images/pirate9.16.png",
    },
    video: "/assets/videos/pirate.mp4",
  },
];
