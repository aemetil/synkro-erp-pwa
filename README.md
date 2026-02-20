# Synkro

**Solution de gestion d'entreprise intelligente pour PME et indépendants.**

Synkro est une application SaaS multi-tenant qui centralise la gestion financière, commerciale et médicale en une seule plateforme moderne et intuitive.

> https://getsynkro.app

---

## Fonctionnalités

- **Finance** - Ventes, dépenses, rapports, analyses mensuelles
- **Commerce** - Catalogue produits, gestion de stock, catégories, alertes
- **Santé** - Patients, consultations, rendez-vous, dossiers médicaux
- **Multi-tenant** - Isolation complète des données par entreprise
- **Modules adaptatifs** - Affichage conditionnel selon le secteur d'activité

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript (strict) |
| UI | Tailwind CSS + shadcn/ui |
| Auth | NextAuth v5 (JWT) |
| ORM | Prisma |
| DB | SQLite (dev) / PostgreSQL (prod) |
| Hosting | Vercel |
| Database | Supabase |

## Démarrage rapide

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Ouvrir http://localhost:3000

**Compte démo** : `admin@demo.com` / `demo123`

## Scripts

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run db:studio    # Prisma Studio (visualiser la DB)
npm run db:seed      # Insérer les données de démo
```

## Licence

MIT

---

Made with ❤️ by [a.emetil](https://qonekt.com) & b.odnis