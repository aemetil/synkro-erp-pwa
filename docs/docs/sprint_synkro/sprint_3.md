Oui, très important : **tout doit vivre sur une branche séparée de `main`**.

Pour Synkro, je recommande une branche longue de beta :

```bash
git checkout main
git pull origin main
git checkout -b beta/v2-rebuild
git push -u origin beta/v2-rebuild
```

Ensuite, chaque sprint part de cette branche, pas de `main` :

```bash
git checkout beta/v2-rebuild
git pull origin beta/v2-rebuild
git checkout -b v2/sprint-3-feedback
```

Puis merge vers :

```txt
beta/v2-rebuild
```

Pas vers `main`.

`main` reste production. `beta/v2-rebuild` devient l’environnement v2 testable avec beta testers.

---

# Pour Codex / Claude Code comme co-dev

Oui, ça peut énormément aider. Codex est officiellement un agent de codage qui peut écrire, réviser et livrer du code, disponible via app, CLI, extension IDE ou web selon le plan, avec connexion GitHub pour Codex web. ([OpenAI Help Center][1])

Mais pour obtenir **exactement le résultat imaginé**, il ne faut pas juste lui dire “redesign Synkro”. Il faut lui donner un cadre strict.

Je recommande d’ajouter dans le repo :

```txt
AGENTS.md
```

ou :

```txt
CLAUDE.md
```

avec :

```txt
- ne jamais travailler sur main
- toujours partir de beta/v2-rebuild
- respecter docs/SYNKRO_*.md
- ne pas modifier la DB sans migration documentée
- ne pas casser les flows clients actifs
- ne pas renommer les pages principales sans justification
- utiliser les composants v2
- tester npm run lint && npm run build
- produire des petites PR
```

Et pour du “pixel perfect”, il faudra idéalement ensuite ajouter :

```txt
design tokens finalisés
screenshots référence
composants v2 codés
checklist mobile
règles de spacing
règles de typography
règles de layout
```

Le plus important : **donner à l’agent une tâche précise par sprint**, jamais “fais toute la v2”.

---

# Sprint 3 — Human errors & feedback states

Objectif : rendre l’app plus fiable sans toucher aux données.

Ce sprint est parfait pour un produit actif parce qu’il améliore la confiance sans modifier les modèles Prisma ni les flows métier.

Branche :

```bash
git checkout beta/v2-rebuild
git pull origin beta/v2-rebuild
git checkout -b v2/sprint-3-feedback
```

---

# 1. Créer `lib/errors.ts`

```ts
export function getFriendlyErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return mapKnownError(error);
  }

  if (error instanceof Error) {
    return mapKnownError(error.message);
  }

  return "Une erreur est survenue. Vous pouvez réessayer dans quelques instants.";
}

export function mapKnownError(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("credentialssignin") ||
    normalized.includes("credentials") ||
    normalized.includes("invalid credentials")
  ) {
    return "Email ou mot de passe incorrect.";
  }

  if (normalized.includes("configuration")) {
    return "Impossible de se connecter pour le moment. Réessayez dans quelques instants.";
  }

  if (
    normalized.includes("network") ||
    normalized.includes("fetch failed") ||
    normalized.includes("connection")
  ) {
    return "Connexion instable. Vérifiez votre connexion puis réessayez.";
  }

  if (normalized.includes("unauthorized") || normalized.includes("forbidden")) {
    return "Vous n’avez pas l’autorisation d’effectuer cette action.";
  }

  if (normalized.includes("not found")) {
    return "L’élément demandé est introuvable.";
  }

  if (normalized.includes("prisma")) {
    return "Impossible d’enregistrer pour le moment. Aucune modification n’a été appliquée.";
  }

  if (
    normalized.includes("server components render") ||
    normalized.includes("digest")
  ) {
    return "Impossible de charger cette page. Vous pouvez réessayer dans quelques instants.";
  }

  return message.length > 0 && message.length < 140
    ? message
    : "Une erreur est survenue. Vous pouvez réessayer dans quelques instants.";
}

export function getActionErrorMessage(action?: string): string {
  switch (action) {
    case "create-sale":
      return "Impossible d’enregistrer la vente pour le moment.";
    case "update-sale":
      return "Impossible de modifier la vente pour le moment.";
    case "create-expense":
      return "Impossible d’enregistrer la dépense pour le moment.";
    case "update-expense":
      return "Impossible de modifier la dépense pour le moment.";
    case "create-product":
      return "Impossible d’enregistrer le produit pour le moment.";
    case "update-product":
      return "Impossible de modifier le produit pour le moment.";
    case "delete":
      return "Impossible de supprimer pour le moment.";
    default:
      return "Impossible d’enregistrer pour le moment.";
  }
}
```

---

# 2. Créer `app/error.tsx`

```tsx
"use client";

import * as React from "react";
import { ErrorState } from "@/components/feedback/error-state";
import { PageContainer } from "@/components/layout/page-container";
import { getFriendlyErrorMessage } from "@/lib/errors";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <PageContainer size="narrow" className="flex min-h-screen items-center">
          <ErrorState
            title="Une erreur est survenue"
            description={getFriendlyErrorMessage(error)}
            action={{
              label: "Réessayer",
              onClick: reset,
            }}
          />
        </PageContainer>
      </body>
    </html>
  );
}
```

---

# 3. Créer `app/not-found.tsx`

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer size="narrow" className="flex min-h-screen items-center">
      <div className="w-full rounded-xl border bg-card px-6 py-10 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Cette page n’existe pas ou n’est plus disponible.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
```

---

# 4. Créer `app/(dashboard)/error.tsx`

```tsx
"use client";

import * as React from "react";
import { ErrorState } from "@/components/feedback/error-state";
import { PageContainer } from "@/components/layout/page-container";
import { getFriendlyErrorMessage } from "@/lib/errors";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer size="narrow">
      <ErrorState
        title="Impossible de charger cette page"
        description={getFriendlyErrorMessage(error)}
        action={{
          label: "Réessayer",
          onClick: reset,
        }}
      />
    </PageContainer>
  );
}
```

---

# 5. Créer `app/(dashboard)/not-found.tsx`

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function DashboardNotFound() {
  return (
    <PageContainer size="narrow">
      <div className="rounded-xl border bg-card px-6 py-10 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Élément introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          L’élément demandé n’existe pas ou n’est plus disponible.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
```

---

# 6. Ajouter un loading global : `app/loading.tsx`

```tsx
import { LoadingState } from "@/components/system/loading-state";
import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer size="narrow" className="flex min-h-screen items-center">
      <LoadingState
        title="Chargement de Synkro…"
        description="Vos données arrivent."
        variant="page"
        skeleton
      />
    </PageContainer>
  );
}
```

---

# 7. Ajouter `app/(dashboard)/loading.tsx`

```tsx
import { LoadingState } from "@/components/system/loading-state";
import { PageContainer } from "@/components/layout/page-container";

export default function DashboardLoading() {
  return (
    <PageContainer>
      <LoadingState
        title="Chargement de votre espace…"
        description="Vos données arrivent."
        variant="page"
        skeleton
      />
    </PageContainer>
  );
}
```

---

# 8. Ajouter un helper de résultat d’action : `lib/action-result.ts`

```ts
export type ActionResult<T = undefined> =
  | {
      success: true;
      data?: T;
      message?: string;
    }
  | {
      success: false;
      error: string;
    };

export function actionSuccess<T>(data?: T, message?: string): ActionResult<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function actionError(error: string): ActionResult {
  return {
    success: false,
    error,
  };
}
```

Ce fichier n’oblige pas encore à migrer toutes les server actions. Il prépare juste la standardisation.

---

# 9. Corriger les erreurs login

Cherche dans le fichier login actuel l’endroit où l’erreur de NextAuth est affichée.

L’idée : ne jamais afficher directement `CredentialsSignin` ou `Configuration`.

Ajoute ou utilise :

```ts
import { mapKnownError } from "@/lib/errors";
```

Puis remplace l’affichage brut par :

```tsx
{
  error ? (
    <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {mapKnownError(error)}
    </div>
  ) : null;
}
```

Si l’erreur vient de `searchParams.error`, pareil :

```ts
const friendlyError = error ? mapKnownError(error) : null;
```

Puis afficher `friendlyError`.

---

# 10. Créer `docs/AI_CODING_AGENT_GUIDE.md`

Ce fichier est important pour Codex / Claude Code.

````md
# AI Coding Agent Guide — Synkro

## Context

Synkro is an active production product used by real clients.

Do not treat this repository as a greenfield project.

The production branch is:

```txt
main
```
````

The v2 beta branch is:

```txt
beta/v2-rebuild
```

Never commit directly to `main`.

---

## Product direction

Synkro v2 follows:

```txt
Monochrome fonctionnel
Primary accent: #1F3A5F
Mobile-first
Trust-first
Simple, calm, professional UI
```

Read these documents before making product/UI decisions:

```txt
docs/SYNKRO_V2_REBUILD_PLAN.md
docs/SYNKRO_DESIGN_SYSTEM_V2.md
docs/SYNKRO_UI_COMPONENTS_SPEC.md
docs/SYNKRO_MOBILE_PWA_STRATEGY.md
docs/SYNKRO_TRUST_SYSTEM.md
docs/SYNKRO_ACTIVE_PRODUCT_MIGRATION_RULES.md
```

---

## Rules

1. Never work directly on `main`.
2. Start from `beta/v2-rebuild`.
3. Make small PRs.
4. Do not introduce database changes unless explicitly requested.
5. Do not break existing production flows.
6. Keep existing routes and labels unless requested.
7. Use v2 system components when touching UI.
8. Use human error messages, never raw technical errors.
9. Test mobile layouts.
10. Run:

```bash
npm run lint
npm run build
```

before considering work complete.

---

## Existing users

Current users must still be able to:

```txt
log in
create sales
edit sales
create expenses
edit expenses
create products
edit products
adjust stock
view clients
view finance
view reports
change currency
report bugs
log out
```

If a change risks breaking one of these flows, stop and ask.

---

## Design rules

Use:

```txt
background/card/border/primary/muted/destructive/success/warning
```

Do not hardcode random colors.

Avoid:

```txt
flashy gradients
decorative colors
admin-template visual noise
complex mobile tables
hidden primary actions
technical error messages
```

---

## Output expectations

For every task:

1. explain files changed;
2. explain risk level;
3. mention tests run;
4. mention any unresolved concerns.

````

---

# 11. Vérifications

```bash
npm run lint
npm run build
````

Puis tester manuellement :

```txt
/login avec mauvais mot de passe
/dashboard loading
une route inexistante
une route dashboard inexistante
mobile dashboard
```

---

# 12. Commit recommandé

```bash
git add app lib components docs
git commit -m "feat: add human error and loading states"
git push origin v2/sprint-3-feedback
```

Puis merge dans :

```txt
beta/v2-rebuild
```

---

# Important pour la beta branch

Sur Vercel, crée idéalement un environnement séparé lié à :

```txt
beta/v2-rebuild
```

Exemple :

```txt
beta.getsynkro.app
```

Comme ça :

- `main` reste production ;
- `beta/v2-rebuild` est testable par toi et beta testers ;
- les sprints peuvent être validés avant merge final ;
- tu peux laisser la v2 vivre plusieurs semaines sans danger.

Après Sprint 3, la suite logique est **Sprint 4 — Page structure migration**, où on commence à appliquer `PageHeader` / `PageContainer` aux pages existantes, une page à la fois.
