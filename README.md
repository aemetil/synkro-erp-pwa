# Synkro

**Logiciel de gestion clair et fiable pour PME, commerces, pharmacies, cabinets médicaux et indépendants.**

Synkro est une application SaaS multi-tenant conçue pour aider les petites entreprises à mieux suivre leurs ventes, encaissements, dépenses opérationnelles, achats de stock, fournisseurs, clients, stock, paiements, rapports et activités quotidiennes.

> Production : https://getsynkro.app

---

## À propos

Synkro vise à apporter plus de clarté dans la gestion quotidienne des entreprises.

Le produit est pensé pour des utilisateurs qui veulent comprendre rapidement :

- combien ils ont vendu ;
- combien ils ont réellement encaissé ;
- qui doit encore payer ;
- quels produits sont presque terminés ;
- quelles dépenses opérationnelles ont été enregistrées ;
- quels achats de marchandises alimentent le stock ;
- comment évolue leur activité.

Synkro combine plusieurs modules selon le secteur d’activité de l’entreprise, tout en gardant une interface simple, mobile-first et adaptée aux usages terrain.

---

## Modules principaux

### Finance

- Ventes
- Dépenses opérationnelles
- Encaissements
- Créances clients
- Dettes fournisseurs
- Rapports
- Analyses mensuelles
- Suivi des paiements

### Commerce

- Catalogue produits
- Catégories
- Stock
- Achats
- Fournisseurs
- Réception stock
- Alertes stock bas
- Mouvements de stock
- Prix d’achat et prix de vente

### Santé

- Patients
- Consultations
- Rendez-vous
- Dossiers médicaux
- Paiements de consultation

### Plateforme

- Multi-tenant
- Isolation des données par entreprise
- Modules adaptatifs selon le secteur
- Multi-devises
- Authentification sécurisée
- PWA mobile-first

---

## Direction v2

Synkro v2 est en préparation sur une branche dédiée :

```txt
beta/v2-rebuild
```

La refonte v2 suit une philosophie :

```txt
monochrome fonctionnel
```

Objectifs principaux :

- rendre l’application plus claire ;
- améliorer l’expérience mobile ;
- renforcer la confiance ;
- mieux séparer commerce, santé et finance ;
- distinguer les dépenses opérationnelles des achats de stock ;
- adapter le dashboard selon le secteur : Commerce, Santé ou Autre ;
- préparer les paiements partiels, reçus, fournisseurs, documents et dashboards sectoriels.

La branche `main` reste réservée à la production stable.

---

## Stack technique

| Couche               | Technologie              |
| -------------------- | ------------------------ |
| Framework            | Next.js App Router       |
| Langage              | TypeScript               |
| UI                   | Tailwind CSS + shadcn/ui |
| Auth                 | NextAuth                 |
| ORM                  | Prisma                   |
| Base de données dev  | SQLite                   |
| Base de données prod | PostgreSQL / Neon        |
| Hosting              | Vercel                   |
| Email                | Resend                   |
| Monitoring           | Sentry                   |
| Analytics            | PostHog                  |

---

## Démarrage rapide

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Ouvrir :

```txt
http://localhost:3000
```

Compte démo :

```txt
admin@demo.com
demo123
```

---

## Scripts utiles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run lint         # Vérification lint
npm run db:studio    # Prisma Studio
npm run db:seed      # Données de démo
npm run db:push      # Synchroniser le schéma Prisma en dev
```

---

## Branches

```txt
main
```

Branche de production stable.

```txt
beta/v2-rebuild
```

Branche dédiée à la refonte Synkro v2, aux tests beta et à la documentation produit/design.

---

## Documentation v2

La documentation de refonte se trouve dans :

```txt
docs/
```

Documents importants :

```txt
SYNKRO_V2_REBUILD_PLAN.md
SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md
SYNKRO_CURRENT_STATE_AUDIT.md
SYNKRO_SECTOR_DASHBOARD_SPEC.md
SYNKRO_DESIGN_SYSTEM_V2.md
SYNKRO_UI_COMPONENTS_SPEC.md
SYNKRO_MOBILE_PWA_STRATEGY.md
SYNKRO_TRUST_SYSTEM.md
SYNKRO_REPO_MIGRATION_PLAN.md
SYNKRO_V2_IMPLEMENTATION_ROADMAP.md
SYNKRO_ACTIVE_PRODUCT_MIGRATION_RULES.md
AI_CODING_AGENT_GUIDE.md
```

Les agents IA ou co-développeurs doivent lire `AI_CODING_AGENT_GUIDE.md`, `SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md`, `SYNKRO_CURRENT_STATE_AUDIT.md` et `SYNKRO_SECTOR_DASHBOARD_SPEC.md` avant toute modification importante.

---

## Règles de contribution

Synkro est déjà utilisé par de vrais clients.

Avant toute modification :

- ne pas travailler directement sur `main` ;
- créer une branche dédiée ;
- préserver les flows existants ;
- éviter les changements de schéma non planifiés ;
- tester les pages critiques ;
- exécuter `npm run lint` et `npm run build` ;
- vérifier l’expérience mobile.

Flows critiques à préserver :

- connexion ;
- création de vente ;
- modification de vente ;
- création de dépense opérationnelle ;
- modification de produit ;
- stock ;
- clients ;
- finance ;
- rapports ;
- paramètres ;
- signalement de bug.

---

## Licence

MIT

---

Built & designed by [aemetil](https://getappy.io)
