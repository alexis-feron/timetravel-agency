# Contributing to TimeTravel Agency

Merci de votre interet pour contribuer a TimeTravel Agency ! Ce guide vous aidera a demarrer.

## Comment contribuer

### Signaler un bug

1. Verifiez que le bug n'a pas deja ete signale dans les [Issues](https://github.com/alexis-feron/timetravel-agency/issues)
2. Creez une nouvelle issue en utilisant le template **Bug Report**
3. Decrivez le probleme de maniere claire avec les etapes pour le reproduire

### Proposer une fonctionnalite

1. Ouvrez une issue en utilisant le template **Feature Request**
2. Decrivez la fonctionnalite et son cas d'usage
3. Attendez la validation avant de commencer le developpement

### Soumettre du code

1. **Fork** le repository
2. Creez une branche depuis `main` :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Faites vos modifications en respectant les conventions ci-dessous
4. Testez vos changements localement :
   ```bash
   npm run build
   npm run lint
   ```
5. Committez avec un message clair :
   ```bash
   git commit -m "🐛 Fix ..."
   ```
6. Poussez votre branche et ouvrez une **Pull Request**

## Conventions

### Commits

Nous utilisons les [gitmoji](https://gitmoji.dev/) accompagné d'une description courte en anglais.

### Code

- TypeScript strict
- Formatage avec Prettier (config du projet)
- Linting avec ESLint (config du projet)
- Composants React fonctionnels avec hooks
- Nommage PascalCase pour les composants, camelCase pour les fonctions et variables

### Structure des fichiers

- Composants dans `src/components/` organises par domaine
- Pages et API routes dans `src/app/`
- Donnees statiques dans `src/data/`
- Utilitaires dans `src/lib/`

## Setup local

```bash
git clone https://github.com/alexis-feron/timetravel-agency.git
cd timetravel-agency
npm install
cp .env.exemple .env.local
# Remplir .env.local avec vos cles API
npm run dev
```

## Code de conduite

En contribuant, vous acceptez de respecter notre [Code de Conduite](CODE_OF_CONDUCT.md).

## Questions

Pour toute question, ouvrez une [Discussion](https://github.com/alexis-feron/timetravel-agency/discussions) ou une issue.
