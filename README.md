# TimeTravel Agency - Webapp Interactive

Webapp immersive pour une agence de voyage temporel fictive. Explorez 3 destinations extraordinaires, interagissez avec un agent IA conversationnel, et réservez votre voyage à travers le temps.

---

## 🚀 Version déployee du site web

https://timetravel-agency.alexis-feron.com/

---

## 🛠️ Stack Technique

| Catégorie           | Technologies                                    |
| ------------------- | ----------------------------------------------- |
| **Framework**       | Next.js 16 (App Router) + React 19 + TypeScript |
| **Styling**         | Tailwind CSS 4 + shadcn/ui (New York)           |
| **Animations**      | Framer Motion                                   |
| **IA / Chatbot**    | Mistral AI API (mistral-small-latest)           |
| **Base de données** | Supabase (PostgreSQL)                           |
| **Emails**          | Resend                                          |
| **Icons**           | Lucide React                                    |
| **Fonts**           | Geist (sans/mono) + Playfair Display (serif)    |

---

## ✨ Features

### Landing Page

- Hero section plein écran avec vidéo de fond (autoplay)
- Titre animé mot par mot (Framer Motion)
- Double CTA : destinations et quiz
- Indicateur de scroll animé

### Galerie des Destinations Temporelles

3 destinations avec cards interactives, modale de détails, et système de réservation :

| Destination          | Epoque              | Durée   | Prix       |
| -------------------- | ------------------- | ------- | ---------- |
| **Le Titanic**       | 14 Avril 1912       | 3 jours | 12 500 EUR |
| **Isla Nublar**      | 1993 / Crétacé -65M | 5 jours | 18 900 EUR |
| **Mer des Caraibes** | 1715                | 7 jours | 15 200 EUR |

Chaque destination dispose de :

- 3 formats d'images (1:1, 16:9, 9:16)
- Video de fond
- Description longue + highlights
- Palette de couleurs unique

### Quiz de Personnalisation

- 4 questions interactives avec barre de progression
- Systeme de scoring (3 axes : Titanic / Jurassic / Pirate)
- Recommandation de destination basee sur les reponses
- Texte de recommandation genere par IA (Mistral) personnalise selon les scores
- Fallback statique en cas d'erreur API

### Agent Conversationnel IA

- Widget flottant (bulle en bas a droite)
- Fenetre de chat responsive (plein ecran mobile, 380x500 desktop)
- Historique de conversation complet envoye a chaque requete
- Personnalite configuree : guide temporel professionnel et chaleureux
- Connaissance des 3 destinations (prix, durees, details)
- Repond toujours en francais
- Formatage markdown (gras) dans les messages

### Systeme de Reservation

- Formulaire complet dans une modale multi-etapes :
  1. Details de la destination
  2. Formulaire (nom, email, voyageurs, dates)
  3. Confirmation
- Validation client (email, dates futures, range voyageurs 1-10)
- Calcul automatique de la date de retour selon la duree de la destination
- Persistance en base Supabase
- Email de confirmation HTML envoye via Resend

### Responsive Design

- Mobile-first avec breakpoints Tailwind (sm, md, lg)
- Menu hamburger (Sheet) sur mobile
- Chat plein ecran sur mobile
- Grille adaptive : 1 > 2 > 3 colonnes

### Animations

- Scroll-triggered (AnimatedSection) via Framer Motion
- Transitions d'entree/sortie sur les composants
- Hover effects (scale, border) sur les cards
- Transitions fluides entre les etapes du quiz (AnimatePresence)
- Bulle de chat avec animation pulse infinie

### Theme

- Mode sombre avec accents dores (OKLCH color system)
- Texte gradient dore sur les titres
- Design coherent sur tous les composants

---

## 📐 Architecture du Projet

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # POST - Chat IA (Mistral)
│   │   ├── quiz/recommend/route.ts # POST - Recommandation IA
│   │   └── reservations/route.ts   # POST/GET - Reservations
│   ├── globals.css                 # Theme & variables CSS
│   ├── layout.tsx                  # Layout + metadata SEO
│   └── page.tsx                    # Page principale (SPA)
├── components/
│   ├── chat/
│   │   ├── ChatBubble.tsx          # Widget flottant
│   │   ├── ChatMessage.tsx         # Message individuel
│   │   └── ChatWindow.tsx          # Fenetre de conversation
│   ├── destinations/
│   │   ├── DestinationCard.tsx     # Card avec hover effects
│   │   └── DestinationDialog.tsx   # Modale details + reservation
│   ├── layout/
│   │   ├── Header.tsx              # Navigation sticky
│   │   └── Footer.tsx              # Pied de page
│   ├── quiz/
│   │   ├── QuizCard.tsx            # Question + options
│   │   └── QuizResult.tsx          # Resultat + recommandation IA
│   ├── sections/
│   │   ├── HeroSection.tsx         # Hero video + titre anime
│   │   ├── DestinationsSection.tsx # Grille de destinations
│   │   ├── QuizSection.tsx         # Conteneur du quiz
│   │   └── ChatSection.tsx         # Section info chatbot
│   └── ui/                         # Composants shadcn/ui
├── data/
│   ├── destinations.ts             # Donnees des 3 destinations
│   └── quiz.ts                     # Questions et scoring
└── lib/
    ├── mistral.ts                  # Client API Mistral
    ├── supabase.ts                 # Client Supabase
    └── utils.ts                    # cn() utility
```

---

## 📐 Maquette & Navigation

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
│  Logo          Destinations Quiz Contact│
├─────────────────────────────────────────┤
│                                         │
│  HERO SECTION                           │
│  ┌─────────────────────────────────┐    │
│  │     Video Background            │    │
│  │                                 │    │
│  │  "Voyagez a Travers le Temps"   │    │
│  │                                 │    │
│  │  [Destinations]  [Quiz]         │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  DESTINATIONS                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │ Titanic │ │  Isla   │ │ Pirates │    │
│  │  1912   │ │ Nublar  │ │  1715   │    │
│  │         │ │  -65M   │ │         │    │
│  │12 500 E │ │18 900 E │ │15 200 E │    │
│  └─────────┘ └─────────┘ └─────────┘    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  QUIZ PERSONNALISE                      │
│  ┌─────────────────────────────────┐    │
│  │  Question X / 4                 │    │
│  │  ─── ─── ─── ───  (progress)    │    │
│  │                                 │    │
│  │  [Option A]                     │    │
│  │  [Option B]                     │    │
│  │  [Option C]                     │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  SECTION CHATBOT                        │
│  "Parlez a Notre Agent Temporel"        │
│  [Ouvrir le chat]                       │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  Logo  │  Destinations  │  Contact      │
└─────────────────────────────────────────┘
                                    ┌─────┐
                              Chat  │ 💬  │
                              Bubble└─────┘
```

### Modale Destination (3 etapes)

```
┌──────────────────────────────┐
│  1. DETAILS                  │
│  ┌────────────────────────┐  │
│  │  Image 16:9            │  │
│  └────────────────────────┘  │
│  Nom + Tagline + Epoque      │
│  Description longue          │
│  Highlights (liste)          │
│  Prix                        │
│  [Reserver ce voyage]        │
└──────────────────────────────┘
┌──────────────────────────────┐
│  2. FORMULAIRE               │
│  Destination (select)        │
│  Nom complet                 │
│  Email                       │
│  Nb voyageurs (1-10)         │
│  Date depart                 │
│  Date retour (auto)          │
│  [Confirmer]                 │
└──────────────────────────────┘
┌──────────────────────────────┐
│  3. CONFIRMATION             │
│  ✓ Reservation confirmee !   │
│  Resume + email envoye       │
│  [Fermer]                    │
└──────────────────────────────┘
```

---

## 🤖 IA Utilisees

| Usage                       | Outil                                                              | Details                                           |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- |
| **Chatbot conversationnel** | Mistral AI (mistral-small-latest)                                  | Agent temporel, temperature 0.7, max 500 tokens   |
| **Recommandations quiz**    | Mistral AI (mistral-small-latest)                                  | Generation de texte personnalise selon les scores |
| **Assistance au code**      | Claude Code (Claude Opus 4.6 à partir du fichier sujet.md)         | Developpement, debug, documentation               |
| **Visuels destinations**    | IA generative (NanoBanana pour les images / Kling pour les vidéos) | 3 images et 1 videos par destination              |

### Prompts IA notables

**Chatbot** : Personnalite de guide temporel professionnel, chaleureux, passionne d'histoire. Connait les 3 destinations avec prix et durees. Repond en francais, 2-4 phrases max.

**Quiz** : Recoit les scores des 3 axes + la destination gagnante, genere une explication personnalisee de 3-4 phrases.

---

## 🚀 Installation

### Prerequis

- Node.js 18+
- npm

### Setup

```bash
# Cloner le repo
git clone https://github.com/alexis-feron/timetravel-agency.git
cd timetravel-agency

# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.exemple .env.local
```

Remplir `.env.local` avec vos cles :

```env
MISTRAL_API_KEY="votre-cle-mistral"
RESEND_API_KEY="votre-cle-resend"
SUPABASE_URL="votre-url-supabase"
SUPABASE_ANON_KEY="votre-cle-supabase"
```

### Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
npm start
```

---

## 🗄️ Base de Donnees

Table Supabase `reservations` :

| Colonne          | Type      | Description                              |
| ---------------- | --------- | ---------------------------------------- |
| id               | UUID      | Cle primaire                             |
| destination_id   | text      | ID destination (titanic/jurassic/pirate) |
| destination_name | text      | Nom affiche                              |
| full_name        | text      | Nom du voyageur                          |
| email            | text      | Email du voyageur                        |
| travelers        | integer   | Nombre de voyageurs (1-10)               |
| departure_date   | date      | Date de depart                           |
| return_date      | date      | Date de retour (calculee)                |
| created_at       | timestamp | Date de creation                         |

---

## 📦 API Endpoints

| Methode | Route                 | Description                             |
| ------- | --------------------- | --------------------------------------- |
| POST    | `/api/chat`           | Envoie un message au chatbot Mistral    |
| POST    | `/api/quiz/recommend` | Genere une recommandation personnalisee |
| POST    | `/api/reservations`   | Cree une reservation + email            |
| GET     | `/api/reservations`   | Liste toutes les reservations           |

---

## 🎨 Design System

- **Theme** : Mode sombre exclusif, accents dores
- **Couleurs** : OKLCH color space (background bleu tres sombre, or primaire)
- **Typographie** : Geist (corps) + Playfair Display (titres serif)
- **Composants UI** : shadcn/ui (preset New York)
- **Animations** : Framer Motion (scroll-triggered, hover, transitions)
- **Icons** : Lucide React

---

## 📄 Credits

- **Framework** : [Next.js](https://nextjs.org/)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **IA Chatbot** : [Mistral AI](https://mistral.ai/)
- **Base de donnees** : [Supabase](https://supabase.com/)
- **Emails** : [Resend](https://resend.com/)
- **Deploiement** : [Vercel](https://vercel.com/)
