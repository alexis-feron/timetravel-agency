# TimeTravel Agency — Webapp Interactive

## Mission

Développer une webapp moderne et interactive qui met en scène l'agence et ses 3 destinations :

- **Le Titanic, 14 Avril 1912 (Matin)** – _Titanic_
  - **Vibe :** La "Belle Époque" sur mer, grand escalier, salle à manger de première classe, l'océan à perte de vue (avant l'iceberg !)
  - **Potentiel IA :** Majestueux et tragiquement beau.

- **Isla Nublar, 1993 / Crétacé -65M années** - Derniers jours des dinosaures – _Jurassic Park_
  - **Vibe :** Jungle tropicale luxuriante, énormes portes en bois, 4x4 colorés sous la pluie, fougères géantes et T-Rex au loin
  - **Potentiel IA :** Mélange de technologie rétro (années 90) et de nature sauvage préhistorique. Le vert et le jaune dominent.

- **Mer des Caraïbes, 1715** – _Pirates des Caraïbes_
  - **Vibe :** Eaux turquoises, vieux gréements, drapeaux noirs, grottes au trésor, îles tropicales
  - **Potentiel IA :** Aventure solaire et mystérieuse.

avec des fonctionnalités alimentées par l'IA.

---

## Brief de l'Agence

TimeTravel Agency a maintenant besoin d'une présence web interactive qui permettra à ses clients de :

- Découvrir les destinations temporelles avec une interface immersive
- Interagir avec un agent conversationnel qui guide et conseille
- Personnaliser leur voyage selon leurs préférences
- Réserver et planifier leur voyage temporel

---

## PHASE 1 : Architecture & Planning

### 1.1 — Définition des features

**Consigne :**
Définissez les fonctionnalités clés de votre webapp.

**Features essentielles :**

1. **Page d'accueil**
   - Hero section avec vidéo / animation de fond
   - Présentation de l'agence
   - CTA vers les destinations

2. **Galerie des destinations**
   - Cards interactives pour les 3 époques
   - Visuels générés pendant votre premier projet TimeTravel Agency
   - Informations détaillées par destination

3. **Agent conversationnel**
   - Chatbot IA intégré
   - Conseils personnalisés sur les destinations
   - FAQ automatisée

4. **Formulaire de réservation**
   - Sélection destination + dates
   - Validation automatisée

### 1.2 — Maquette rapide

**Consigne :**
Créez une maquette simple de votre webapp.

**Maquettage :**

- Template mental dans le README
- Schéma digital : Navigation recommandée : `Header → Hero → Destinations → Chat → Footer`

**Mission :**

- Définissez la structure de navigation
- Identifiez les sections clés
- Pensez responsive (mobile-first)

---

## PHASE 2 : Génération de code avec Vibe Coding

### 2.1 — « Setup & Génération Initiale »

**Consigne :**
Créez la base de votre webapp avec Claude Code.

**Mission :**

- Choisissez votre outil
- Générez la structure de base
- Testez le rendu et la navigation
- Itérez avec 2–3 prompts pour améliorer le design

### 2.2 — « Intégration des Assets du premier projet »

**Consigne :**
Intégrez vos visuels de votre premier projet TimeTravel Agency dans la webapp. Les assets sont déjà dans le depot.

**Options d'hébergement des images choisi :**

- GitHub — Directement dans le repo

**Mission :**

- Uploadez vos 3 images « hero » des destinations
- Intégrez-les dans les cards de destinations
- Ajoutez vos vidéos en background si possible (ou en gallery)
- Optimisez le chargement (lazy loading)

### 2.3 — Ajout d'Animations

**Consigne :**
Rendez l'interface vivante avec des animations subtiles.

**Librairies :**

- **Framer Motion** — React, très populaire
- **Tailwind CSS animations** — Intégré, simple

**Prompt pour les animations :**

> Ajoute des animations subtiles et élégantes :
>
> - Fade-in progressif des sections au scroll
> - Animation du titre en hero (apparition progressive)
> - Hover effects sur les cards de destinations
> - Transition douce entre les pages
>
> Utilise Framer Motion.
> Style : animations fluides, durée 0.6–0.8s, easing natural

**Mission :**

- Ajoutez des animations au scroll
- Créez des micro-interactions sur les boutons
- Testez la fluidité (pas trop d'animations !)

---

## PHASE 3 : Intelligence Artificielle & Agents

### 3.1 : « Agent Conversationnel »

**Consigne :**
Intégrez un chatbot IA qui guide les visiteurs

**Solutions de chatbot :**

- **API directe :**
  - Mistral AI API - Gratuit pour débuter, modèles open source

**Prompt pour intégration chatbot :**

> Intègre un widget de chatbot en bas à droite de la page avec :
>
> - Icône flottante (bulle de dialogue)
> - Fenêtre de chat qui s'ouvre au clic
> - Design cohérent avec le site (thème sombre, accents dorés)
> - Placeholder : "Posez-moi vos questions sur les voyages temporels..."
>
> Le chatbot doit pouvoir répondre à :
>
> - Questions sur les destinations
> - Informations sur les prix (inventer des prix cohérents)
> - Conseils pour choisir une époque
> - FAQ agence de voyage

**System prompt du chatbot (utilisé dans `src/lib/mistral.ts`) :**

> Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
> Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
>
> **Ton ton :**
>
> - Professionnel mais chaleureux
> - Passionné d'histoire
> - Toujours enthousiaste sans être trop familier
> - Expertise en voyage temporel (fictif mais crédible)
>
> **Tu connais parfaitement nos 3 destinations :**
>
> 1. Le Titanic, 14 Avril 1912 (Matin) — Belle Époque sur mer, grand escalier, salle à manger de première classe, l'océan à perte de vue. Prix : 12 500 €, durée : 3 jours.
> 2. Isla Nublar, 1993 / Crétacé -65M années — Jurassic Park. Jungle tropicale luxuriante, 4x4, T-Rex, laboratoire de génétique. Prix : 18 900 €, durée : 5 jours.
> 3. Mer des Caraïbes, 1715 — Pirates des Caraïbes. Eaux turquoises, galion authentique, grottes au trésor, îles tropicales. Prix : 15 200 €, durée : 7 jours.
>
> Tu réponds toujours en français. Tu peux inventer des détails crédibles sur les voyages (activités, conseils pratiques, anecdotes historiques).
> Si on te pose des questions hors-sujet, ramène poliment la conversation aux voyages temporels.
> Garde tes réponses concises (2-4 phrases maximum sauf si on te demande plus de détails).

**Mission :**

- Configurez la personnalité de l'agent
- Intégrez le widget dans la webapp
- Testez avec 5-6 questions types

### 3.2 : « Automatisation & Personnalisation »

**Consigne :**
Ajoutez une fonctionnalité d'automatisation intelligente

**Automatisations à implémenter : Recommandation personnalisée :**

- Quiz de 3-4 questions sur les préférences
- Algorithme simple qui recommande une destination
- Utilisation d'IA pour générer la recommandation

**Quiz implémenté (dans `src/data/quiz.ts`) :**

> Quiz interactif de 4 questions avec système de scoring par destination (titanic/jurassic/pirate) :
>
> 1. "Quel type d'expérience recherchez-vous ?"
>    - Élégance et raffinement → Titanic
>    - Aventure et nature → Jurassic
>    - Exploration et mystère → Pirates
> 2. "Votre période historique préférée ?"
>    - La Belle Époque (XIXe-XXe siècle) → Titanic
>    - La Préhistoire et les origines → Jurassic
>    - L'âge d'or de la piraterie → Pirates
> 3. "Vous préférez :"
>    - Le luxe et l'effervescence → Titanic
>    - La nature sauvage et brute → Jurassic
>    - La mer et la liberté → Pirates
> 4. "Votre activité idéale en voyage :"
>    - Dîner gastronomique et soirée dansante → Titanic
>    - Observer une faune extraordinaire → Jurassic
>    - Chasse au trésor et exploration → Pirates

**Prompt de recommandation IA (dans `src/app/api/quiz/recommend/route.ts`) :**

> Un client vient de faire notre quiz de recommandation de voyage temporel.
> Ses résultats indiquent une préférence pour la destination "{name}".
> Scores : Titanic={score}, Jurassic={score}, Pirates={score}.
>
> Génère une recommandation personnalisée et enthousiaste (3-4 phrases) expliquant pourquoi cette destination est parfaite pour ce client. Base-toi sur les scores pour personnaliser le message.

**Mission :**

- Implémentez les fonctionnalités d'automatisation / personnalisation
- Testez avec plusieurs scénarios
- Assurez-vous que les résultats sont cohérents

---

## PHASE 4 : Open Source & Déploiement

### 4.1 : « Documentation & Code »

**Consigne :**
Documentez votre projet pour respecter les bonnes pratiques open source

**À documenter :**

**README.md :**

- Titre du projet + description
- Technologies utilisées
- Features implémentées
- Outils IA utilisés (transparence)
- Instructions d'installation (si applicable)
- Crédits (APIs, modèles IA, assets)

**Exemple structure README :**

```markdown
# TimeTravel Agency - Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée avec IA générative.

## 🛠️ Stack Technique

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Framer Motion
- Mistral AI API (mistral-small-latest)
- Supabase (base de données)
- Resend (emails de confirmation)
- Hébergement : Vercel

## ✨ Features

- Landing page interactive avec vidéo hero
- Galerie de 3 destinations temporelles (Titanic, Jurassic, Pirates)
- Chatbot IA conversationnel (Mistral AI)
- Quiz de recommandation personnalisé avec IA
- Système de réservation avec confirmation email
- Animations scroll et micro-interactions (Framer Motion)

## 🤖 IA Utilisées

- Code : Claude Code avec Opus 4.6
- Chatbot : Mistral Small via API
- Visuels : NanoBanana + Kling

### 4.2 : « Déploiement »

**Consigne :**
Rendez votre webapp accessible en ligne

**🚀 Plateformes de déploiement :**

- Vercel

**Mission :**

- Déployez votre webapp
- Testez l'URL publique sur mobile et desktop
- Vérifiez que toutes les features fonctionnent en production

---

## 🎬 LIVRABLE

- URL de la webapp déployée (lien public fonctionnel)
- Repository GitHub
- README.md avec documentation technique
```
