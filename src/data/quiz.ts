export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    scores: { titanic: number; jurassic: number; pirate: number };
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      {
        label: "Élégance et raffinement",
        scores: { titanic: 3, jurassic: 0, pirate: 1 },
      },
      {
        label: "Aventure et nature",
        scores: { titanic: 0, jurassic: 3, pirate: 1 },
      },
      {
        label: "Exploration et mystère",
        scores: { titanic: 1, jurassic: 1, pirate: 3 },
      },
    ],
  },
  {
    id: 2,
    question: "Votre période historique préférée ?",
    options: [
      {
        label: "La Belle Époque (XIXe-XXe siècle)",
        scores: { titanic: 3, jurassic: 1, pirate: 0 },
      },
      {
        label: "La Préhistoire et les origines",
        scores: { titanic: 0, jurassic: 3, pirate: 1 },
      },
      {
        label: "L'âge d'or de la piraterie",
        scores: { titanic: 1, jurassic: 0, pirate: 3 },
      },
    ],
  },
  {
    id: 3,
    question: "Vous préférez :",
    options: [
      {
        label: "Le luxe et l'effervescence",
        scores: { titanic: 3, jurassic: 0, pirate: 1 },
      },
      {
        label: "La nature sauvage et brute",
        scores: { titanic: 0, jurassic: 3, pirate: 1 },
      },
      {
        label: "La mer et la liberté",
        scores: { titanic: 1, jurassic: 0, pirate: 3 },
      },
    ],
  },
  {
    id: 4,
    question: "Votre activité idéale en voyage :",
    options: [
      {
        label: "Dîner gastronomique et soirée dansante",
        scores: { titanic: 3, jurassic: 0, pirate: 1 },
      },
      {
        label: "Observer une faune extraordinaire",
        scores: { titanic: 0, jurassic: 3, pirate: 0 },
      },
      {
        label: "Chasse au trésor et exploration",
        scores: { titanic: 0, jurassic: 1, pirate: 3 },
      },
    ],
  },
];
