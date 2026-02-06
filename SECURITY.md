# Politique de Securite

## Versions supportees

| Version | Supportee |
| ------- | --------- |
| latest  | Oui       |

## Signaler une vulnerabilite

Si vous decouvrez une vulnerabilite de securite dans TimeTravel Agency, merci de la signaler de maniere responsable.

**Ne creez pas d'issue publique pour les vulnerabilites de securite.**

### Comment signaler

1. Envoyez un email a l'adresse du mainteneur du projet via son [profil GitHub](https://github.com/alexis-feron)
2. Vous pouvez aussi utiliser la fonctionnalite [Security Advisories](https://github.com/alexis-feron/timetravel-agency/security/advisories) de GitHub pour signaler la vulnerabilite de maniere privee

### Informations a inclure

- Description de la vulnerabilite
- Etapes pour reproduire le probleme
- Impact potentiel
- Suggestions de correction (si possible)

### Delai de reponse

- **Accuse de reception** : sous 48 heures
- **Evaluation initiale** : sous 7 jours
- **Correction** : selon la severite, dans les meilleurs delais

### Apres le signalement

- La vulnerabilite sera evaluee et priorisee
- Vous serez tenu informe de l'avancement
- Un correctif sera developpe et deploye
- Vous serez credite dans les notes de version (sauf si vous preferez rester anonyme)

## Bonnes pratiques

Ce projet utilise :

- Des variables d'environnement pour les secrets (cles API, credentials)
- HTTPS pour toutes les communications externes
- La validation des entrees utilisateur cote client et serveur
- Supabase Row Level Security pour la base de donnees
