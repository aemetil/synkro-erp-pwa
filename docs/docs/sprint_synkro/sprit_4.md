Parfait. **Sprint 4 — Page structure migration**.

Objectif : commencer à appliquer les composants v2 aux pages existantes, sans redesign complet et sans casser les flows clients.

Ce sprint doit rester prudent : on ne change pas la logique métier, on ne touche pas à Prisma, on ne modifie pas les server actions. On améliore surtout la structure visuelle des pages.

Branche recommandée :

```bash
git checkout beta/v2-rebuild
git pull origin beta/v2-rebuild
git checkout -b v2/sprint-4-page-structure
```

---

# Sprint 4 — règle importante

Pour chaque page migrée, on applique seulement :

```txt
PageContainer
PageHeader
action principale visible en haut
description claire
espacement plus cohérent
```

On ne refait pas encore :

```txt
tables
mobile shell
paiements partiels
nouveaux graphiques
nouveaux formulaires
```

Ça viendra après.

---

# 1. Pages à migrer en priorité

Dans cet ordre :

```txt
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/sales/page.tsx
app/(dashboard)/finance/page.tsx
app/(dashboard)/commerce/page.tsx
app/(dashboard)/clients/page.tsx
app/(dashboard)/reports/page.tsx
app/(dashboard)/settings/page.tsx
```

Si une page est complexe, ne force pas tout dans une seule PR. Tu peux faire :

```txt
PR 4A — dashboard + sales
PR 4B — finance + commerce
PR 4C — clients + reports + settings
```

Pour un produit actif, je préfère **petites PR**.

---

# 2. Pattern standard à appliquer

En haut de chaque page :

```tsx
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
```

Puis structure :

```tsx
export default async function Page() {
  return (
    <PageContainer>
      <PageHeader
        title="Titre"
        description="Description courte."
        primaryAction={{
          label: "Action principale",
          href: "/route",
        }}
      />

      {/* contenu existant inchangé */}
    </PageContainer>
  );
}
```

Si la page a déjà un wrapper du style :

```tsx
<div className="space-y-6">
```

Tu peux garder :

```tsx
<PageContainer>
  <div className="space-y-6">
    <PageHeader ... />
    {/* contenu */}
  </div>
</PageContainer>
```

Mais idéalement, `PageHeader` doit être le premier bloc visible.

---

# 3. Dashboard

## Objectif

Rendre l’entrée du produit plus calme, sans encore refaire complètement le dashboard.

## Header recommandé

```tsx
<PageHeader
  title="Tableau de bord"
  description="Suivez l’activité de votre entreprise en un coup d’œil."
  primaryAction={{
    label: "Nouvelle vente",
    href: "/sales/new",
  }}
/>
```

## Structure cible minimale

```tsx
<PageContainer>
  <PageHeader ... />

  <div className="space-y-6">
    {/* stats existantes */}
    {/* ventes récentes */}
    {/* dépenses récentes */}
  </div>
</PageContainer>
```

## Attention

Ne déplace pas encore toute la logique des stats.
Ne change pas les calculs.
Ne change pas les queries.

---

# 4. Ventes

## Header recommandé

```tsx
<PageHeader
  title="Ventes"
  description="Gérez vos ventes, paiements et reçus."
  primaryAction={{
    label: "Nouvelle vente",
    href: "/sales/new",
  }}
/>
```

## Si tu as déjà un bouton “Nouvelle vente” dans le contenu

Supprime le doublon uniquement si tu es sûr qu’il ne sert pas à autre chose.

Sinon, garde-le temporairement, mais évite deux boutons identiques visibles dans le même viewport.

## Structure

```tsx
<PageContainer size="wide">
  <PageHeader ... />

  <div className="space-y-6">
    {/* stats ventes existantes */}
    {/* table ventes existante */}
  </div>
</PageContainer>
```

`size="wide"` est utile si la page contient une table.

---

# 5. Finance

## Header recommandé

```tsx
<PageHeader
  title="Finance"
  description="Suivez vos ventes, dépenses et encaissements."
  primaryAction={{
    label: "Nouvelle dépense",
    href: "/finance/depenses/new",
  }}
/>
```

Attention : vérifie la vraie route de création dépense dans ton repo.
Si c’est une autre route, garde la route existante.

Exemples possibles :

```txt
/finance/expenses/new
/finance/depenses/new
/expenses/new
```

Ne crée pas une nouvelle route juste pour le header.

---

# 6. Commerce

## Header recommandé

```tsx
<PageHeader
  title="Commerce"
  description="Gérez vos produits, stock et alertes."
  primaryAction={{
    label: "Nouveau produit",
    href: "/commerce/products/new",
  }}
  secondaryActions={[
    {
      label: "Voir les produits",
      href: "/commerce/products",
    },
  ]}
/>
```

## Pourquoi c’est important

Tu as déjà eu des retours que certains boutons importants étaient trop bas dans les pages longues.

Donc ici, priorité :

```txt
Nouveau produit
Voir les produits
Stock
```

doivent être accessibles rapidement.

Si la page Commerce a actuellement des boutons en bas, laisse-les temporairement si nécessaire, mais ajoute l’action principale en haut.

---

# 7. Clients

## Header recommandé

```tsx
<PageHeader
  title="Clients"
  description="Retrouvez vos clients, achats et paiements en attente."
/>
```

Si tu as une route de création client :

```tsx
primaryAction={{
  label: "Nouveau client",
  href: "/clients/new",
}}
```

Mais si les clients sont actuellement extraits automatiquement depuis les ventes, ne force pas une action qui n’existe pas encore.

Dans ce cas, tu peux mettre plutôt :

```tsx
primaryAction={{
  label: "Nouvelle vente",
  href: "/sales/new",
}}
```

Parce que c’est aujourd’hui le moyen réel d’ajouter un client.

---

# 8. Rapports

## Header recommandé

```tsx
<PageHeader
  title="Rapports"
  description="Comprenez l’évolution de votre activité."
  secondaryActions={[
    {
      label: "Exporter",
      href: "#",
      disabled: true,
    },
  ]}
/>
```

Mais attention : si `PageHeader` avec `href="#"` crée une mauvaise UX, ne mets pas le bouton désactivé.

Mieux :

```tsx
<PageHeader
  title="Rapports"
  description="Comprenez l’évolution de votre activité."
/>
```

Les boutons “Exporter” et “Filtre période” peuvent rester dans la page avec leur badge “Bientôt” si c’est déjà comme ça.

---

# 9. Paramètres

## Header recommandé

```tsx
<PageHeader
  title="Paramètres"
  description="Gérez votre entreprise, vos préférences et votre abonnement."
/>
```

`size="wide"` ou `default` selon la page.

Si la page est très longue, on ne la restructure pas encore.
On se contente de donner un header propre.

---

# 10. Si une page a déjà un header custom

Ne supprime pas tout brutalement.

Remplace progressivement :

Avant :

```tsx
<div className="flex items-center justify-between">
  <div>
    <h1>Ventes</h1>
    <p>...</p>
  </div>
  <Button>Nouvelle vente</Button>
</div>
```

Après :

```tsx
<PageHeader
  title="Ventes"
  description="Gérez vos ventes, paiements et reçus."
  primaryAction={{
    label: "Nouvelle vente",
    href: "/sales/new",
  }}
/>
```

Puis garde le contenu en dessous.

---

# 11. Option utile : ajouter icône aux actions

Tu peux ajouter `Plus` de `lucide-react` si déjà utilisé.

```tsx
import { Plus } from "lucide-react";
```

Exemple :

```tsx
primaryAction={{
  label: "Nouvelle vente",
  href: "/sales/new",
  icon: <Plus className="h-4 w-4" />,
}}
```

Mais ne le fais pas si ça complique trop les pages server/client.
Le label seul suffit.

---

# 12. Attention avec les pages server components

`PageHeader` utilise `Button` + `Link`, mais pas de hook client.
Donc il peut rester compatible avec les server components.

Si tu ajoutes `onClick`, là il faut un client component.
Pour Sprint 4, privilégie `href`, pas `onClick`.

---

# 13. Exemple complet — Sales page

Exemple de migration minimale :

```tsx
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default async function SalesPage() {
  // logique existante inchangée
  // const sales = ...

  return (
    <PageContainer size="wide">
      <PageHeader
        title="Ventes"
        description="Gérez vos ventes, paiements et reçus."
        primaryAction={{
          label: "Nouvelle vente",
          href: "/sales/new",
        }}
      />

      <div className="space-y-6">{/* contenu existant */}</div>
    </PageContainer>
  );
}
```

---

# 14. Exemple complet — Commerce page

```tsx
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default async function CommercePage() {
  return (
    <PageContainer size="wide">
      <PageHeader
        title="Commerce"
        description="Gérez vos produits, stock et alertes."
        primaryAction={{
          label: "Nouveau produit",
          href: "/commerce/products/new",
        }}
        secondaryActions={[
          {
            label: "Voir les produits",
            href: "/commerce/products",
          },
        ]}
      />

      <div className="space-y-6">{/* contenu existant */}</div>
    </PageContainer>
  );
}
```

---

# 15. Petit ajustement recommandé à `PageHeader`

Avant de migrer beaucoup de pages, je recommande une petite amélioration pour éviter que des actions secondaires désactivées créent des liens bizarres.

Dans `components/layout/page-header.tsx`, modifie `PageAction` :

```tsx
type PageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
};
```

Et dans `ActionButton`, si `disabled`, ne pas rendre un lien :

```tsx
if (action.href && !action.disabled) {
  return (
    <Button asChild variant={variant}>
      <Link href={action.href}>{content}</Link>
    </Button>
  );
}
```

Puis :

```tsx
return (
  <Button variant={variant} onClick={action.onClick} disabled={action.disabled}>
    {content}
  </Button>
);
```

Version complète de `ActionButton` :

```tsx
function ActionButton({
  action,
  variant = "default",
}: {
  action: PageAction;
  variant?: "default" | "outline" | "secondary" | "ghost";
}) {
  const content = (
    <>
      {action.icon}
      <span>{action.label}</span>
    </>
  );

  if (action.href && !action.disabled) {
    return (
      <Button asChild variant={variant}>
        <Link href={action.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={action.onClick}
      disabled={action.disabled}
    >
      {content}
    </Button>
  );
}
```

---

# 16. Vérifications après migration

Lance :

```bash
npm run lint
npm run build
```

Puis teste manuellement :

```txt
/dashboard
/sales
/finance
/commerce
/clients
/reports
/settings
```

Et surtout :

```txt
Le bouton Nouvelle vente mène au bon écran.
Le bouton Nouvelle dépense mène au bon écran.
Le bouton Nouveau produit mène au bon écran.
Aucune page ne double-wrap bizarrement le contenu.
Aucun header ne disparaît sur mobile.
Aucune action importante n’est moins visible qu’avant.
```

---

# 17. Commit recommandé

```bash
git add app components/layout
git commit -m "refactor: standardize dashboard page structure"
git push origin v2/sprint-4-page-structure
```

Puis merge vers :

```txt
beta/v2-rebuild
```

---

# Critère de réussite Sprint 4

Sprint 4 est réussi si les pages principales donnent déjà une impression plus cohérente, sans que les utilisateurs existants aient perdu leurs repères.

Ce sprint doit faire sentir :

```txt
Synkro est plus structuré.
Synkro est plus calme.
Les actions importantes sont plus visibles.
```

Mais il ne doit pas encore essayer de tout redessiner.
