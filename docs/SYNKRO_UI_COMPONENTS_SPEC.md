# Synkro UI Components Spec v2

> Direction : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : définir les composants UI fondamentaux pour construire Synkro v2 de manière cohérente, mobile-first et maintenable.

---

## 1. Objectif du document

Ce document décrit les composants UI recommandés pour Synkro v2.

Il sert à éviter :

- les styles dupliqués ;
- les couleurs hardcodées ;
- les pages incohérentes ;
- les actions principales cachées ;
- les tables inutilisables sur mobile ;
- les messages d’erreur techniques ;
- les écrans trop “admin dashboard”.

L’objectif est de créer une base de composants claire, sobre et adaptée au vrai usage terrain.

---

## 2. Structure recommandée

Structure de fichiers proposée :

```txt
components/
  layout/
    app-shell.tsx
    desktop-sidebar.tsx
    mobile-shell.tsx
    mobile-bottom-nav.tsx
    page-header.tsx
    page-container.tsx

  system/
    amount.tsx
    metric-card.tsx
    status-badge.tsx
    data-list.tsx
    empty-state.tsx
    loading-state.tsx
    offline-banner.tsx
    permission-gate.tsx

  forms/
    form-section.tsx
    form-actions.tsx
    field-error.tsx

  feedback/
    confirm-dialog.tsx
    success-state.tsx
    error-state.tsx

  mobile/
    mobile-action-bar.tsx
    mobile-page-title.tsx
    mobile-list-item.tsx
```

---

## 3. Composants prioritaires

Ordre recommandé d’implémentation :

```txt
1. PageHeader
2. PageContainer
3. Amount
4. StatusBadge
5. MetricCard
6. EmptyState
7. LoadingState
8. FormSection
9. FormActions
10. DataList
11. MobileActionBar
12. ConfirmDialog
13. OfflineBanner
14. PermissionGate
15. AppShell / MobileShell
```

Pourquoi cet ordre ?

Parce qu’il permet d’améliorer rapidement les pages existantes sans tout réécrire dès le départ.

---

# 4. PageContainer

## 4.1 Rôle

`PageContainer` définit la largeur, les marges et l’espace global d’une page.

Il évite que chaque page gère ses propres paddings.

## 4.2 Usage

À utiliser sur toutes les pages dashboard.

## 4.3 Props recommandées

```ts
type PageContainerProps = {
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
  className?: string;
};
```

## 4.4 Comportement

| Size      | Usage                               |
| --------- | ----------------------------------- |
| `default` | pages standards                     |
| `wide`    | tables, rapports, stock             |
| `narrow`  | formulaires, paramètres, onboarding |

## 4.5 Exemple

```tsx
<PageContainer>
  <PageHeader title="Ventes" />
  <SalesTable />
</PageContainer>
```

## 4.6 Style recommandé

```tsx
const sizes = {
  narrow: "mx-auto w-full max-w-3xl",
  default: "mx-auto w-full max-w-6xl",
  wide: "mx-auto w-full max-w-7xl",
};
```

```tsx
<div className={cn("px-4 py-5 sm:px-6 lg:px-8", sizes[size], className)}>
  {children}
</div>
```

---

# 5. PageHeader

## 5.1 Rôle

`PageHeader` standardise l’introduction de chaque page.

Il doit répondre rapidement à trois questions :

1. Où suis-je ?
2. À quoi sert cette page ?
3. Quelle est l’action principale ?

## 5.2 Props recommandées

```ts
type PageHeaderProps = {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryActions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  eyebrow?: string;
  className?: string;
};
```

## 5.3 Règles UX

- Une seule action principale.
- Description courte.
- Pas plus de deux actions secondaires visibles.
- Sur mobile, l’action principale peut être déplacée vers `MobileActionBar`.
- Ne pas mettre de gros bloc bleu décoratif.

## 5.4 Exemple

```tsx
<PageHeader
  title="Ventes"
  description="Gérez vos ventes, paiements et reçus."
  primaryAction={{
    label: "Nouvelle vente",
    href: "/sales/new",
    icon: <Plus className="h-4 w-4" />,
  }}
/>
```

## 5.5 Style recommandé

```txt
title: text-2xl sm:text-3xl font-semibold tracking-tight
description: text-sm sm:text-base text-muted-foreground
container: flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between
```

---

# 6. Amount

## 6.1 Rôle

`Amount` centralise l’affichage des montants.

Il doit éviter :

- formats incohérents ;
- décimales inutiles ;
- devise mal affichée ;
- couleurs hardcodées ;
- bugs d’hydratation liés à la devise.

## 6.2 Props recommandées

```ts
type AmountProps = {
  value: number;
  currency?: "HTG" | "USD" | "EUR" | "DOP" | "MXN";
  tone?: "default" | "positive" | "negative" | "muted";
  size?: "sm" | "md" | "lg" | "xl";
  showSign?: boolean;
  className?: string;
};
```

## 6.3 Règles UX

- Les montants neutres restent en texte principal.
- Les montants positifs utilisent `success`.
- Les montants négatifs utilisent `destructive`.
- Ne pas afficher de décimales si le montant est entier.
- Toujours garder la devise visible ou implicite selon le contexte.

## 6.4 Exemple

```tsx
<Amount value={15217} currency="HTG" size="xl" />
<Amount value={1200} tone="positive" showSign />
<Amount value={350} tone="negative" showSign />
```

## 6.5 Style recommandé

```tsx
const sizes = {
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-xl font-semibold tracking-tight",
  xl: "text-3xl font-semibold tracking-tight",
};
```

---

# 7. StatusBadge

## 7.1 Rôle

`StatusBadge` standardise les statuts dans toute l’application.

## 7.2 Statuts à couvrir

### Paiements

```txt
PAID
PARTIAL
UNPAID
OVERDUE
CANCELLED
```

### Stock

```txt
IN_STOCK
LOW_STOCK
OUT_OF_STOCK
```

### Rendez-vous / santé

```txt
SCHEDULED
CONFIRMED
IN_PROGRESS
COMPLETED
CANCELLED
NO_SHOW
```

### Abonnement

```txt
FREE
TRIAL
ACTIVE
PAST_DUE
EXPIRED
```

## 7.3 Props recommandées

```ts
type StatusBadgeProps = {
  status: string;
  type?: "payment" | "stock" | "appointment" | "subscription" | "generic";
  size?: "sm" | "md";
  className?: string;
};
```

## 7.4 Règles UX

- Badge discret.
- Pas de couleurs saturées.
- Couleur uniquement si elle porte un sens.
- Texte compréhensible en français.

## 7.5 Mapping recommandé

```ts
const paymentStatusMap = {
  PAID: {
    label: "Payé",
    className: "border-green-200 bg-green-50 text-green-800",
  },
  PARTIAL: {
    label: "Partiel",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  UNPAID: {
    label: "Impayé",
    className: "border-red-200 bg-red-50 text-red-800",
  },
  OVERDUE: {
    label: "En retard",
    className: "border-red-200 bg-red-50 text-red-800",
  },
  CANCELLED: {
    label: "Annulé",
    className: "border-border bg-muted text-muted-foreground",
  },
};
```

---

# 8. MetricCard

## 8.1 Rôle

`MetricCard` affiche une statistique importante sans bruit visuel.

## 8.2 Props recommandées

```ts
type MetricCardProps = {
  label: string;
  value: React.ReactNode;
  description?: string;
  trend?: {
    label: string;
    direction?: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  tone?: "default" | "positive" | "negative" | "warning";
  className?: string;
};
```

## 8.3 Règles UX

- Ne pas rendre l’icône obligatoire.
- Ne pas colorer toute la carte.
- Ne pas afficher plus de trois informations.
- Le montant ou la valeur principale doit dominer.
- La couleur sert uniquement au sens métier.

## 8.4 Exemple

```tsx
<MetricCard
  label="Ventes ce mois"
  value={<Amount value={15217} currency="HTG" size="lg" />}
  description="44 ventes enregistrées"
/>
```

---

# 9. EmptyState

## 9.1 Rôle

`EmptyState` transforme une absence de données en prochaine action claire.

## 9.2 Props recommandées

```ts
type EmptyStateProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  icon?: React.ReactNode;
  className?: string;
};
```

## 9.3 Règles UX

- Ne jamais se limiter à “Aucune donnée”.
- Expliquer ce qui manque.
- Dire pourquoi l’action est utile.
- Proposer une action quand possible.

## 9.4 Exemple

```tsx
<EmptyState
  title="Aucune vente pour le moment"
  description="Ajoutez votre première vente pour commencer à suivre votre activité."
  action={{
    label: "Nouvelle vente",
    href: "/sales/new",
  }}
/>
```

---

# 10. LoadingState

## 10.1 Rôle

`LoadingState` évite les écrans blancs et rassure l’utilisateur.

## 10.2 Props recommandées

```ts
type LoadingStateProps = {
  title?: string;
  description?: string;
  variant?: "page" | "section" | "card" | "list";
  skeleton?: boolean;
  className?: string;
};
```

## 10.3 Messages recommandés

```txt
Chargement de votre espace…
Vos données arrivent…
Connexion lente détectée. Merci de patienter.
Synchronisation en cours…
```

## 10.4 Exemple

```tsx
<LoadingState
  title="Chargement de votre espace…"
  description="Vos données arrivent."
  variant="page"
  skeleton
/>
```

---

# 11. OfflineBanner

## 11.1 Rôle

`OfflineBanner` informe l’utilisateur d’une perte de connexion.

## 11.2 Props recommandées

```ts
type OfflineBannerProps = {
  isOnline?: boolean;
  syncing?: boolean;
};
```

## 11.3 Messages

Hors ligne :

```txt
Vous êtes hors ligne. Certaines données peuvent ne pas être à jour.
```

Connexion retrouvée :

```txt
Connexion retrouvée. Synchronisation en cours…
```

## 11.4 Règles UX

- Doit être visible mais non agressif.
- Ne doit pas bloquer l’usage si possible.
- Doit utiliser un ton calme.

---

# 12. FormSection

## 12.1 Rôle

`FormSection` divise les formulaires longs en blocs compréhensibles.

## 12.2 Props recommandées

```ts
type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};
```

## 12.3 Exemple

```tsx
<FormSection
  title="Client"
  description="Sélectionnez ou ajoutez le client associé à cette vente."
>
  <ClientSelect />
</FormSection>
```

## 12.4 Règles UX

- Une section = un sujet.
- Description courte.
- Pas trop de champs visibles à la fois.
- Sur mobile, chaque section doit respirer.

---

# 13. FormActions

## 13.1 Rôle

`FormActions` standardise les actions de fin de formulaire.

## 13.2 Props recommandées

```ts
type FormActionsProps = {
  submitLabel: string;
  cancelLabel?: string;
  cancelHref?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  stickyOnMobile?: boolean;
};
```

## 13.3 Règles UX

- Le bouton principal doit rester accessible sur mobile.
- Toujours afficher un état loading pendant soumission.
- Ne jamais laisser un clic sans feedback.

## 13.4 Exemple

```tsx
<FormActions
  submitLabel="Enregistrer la vente"
  cancelLabel="Annuler"
  cancelHref="/sales"
  isSubmitting={isPending}
  stickyOnMobile
/>
```

---

# 14. FieldError

## 14.1 Rôle

`FieldError` affiche les erreurs de formulaire de manière humaine.

## 14.2 Props recommandées

```ts
type FieldErrorProps = {
  message?: string;
};
```

## 14.3 Règles

Mauvais :

```txt
Required
Invalid type
```

Bon :

```txt
Ce champ est obligatoire.
Le montant doit être supérieur à 0.
```

---

# 15. DataList

## 15.1 Rôle

`DataList` remplace les tableaux sur mobile et peut aussi servir à afficher des activités récentes.

## 15.2 Props recommandées

```ts
type DataListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
};
```

## 15.3 DataListItem props recommandées

```ts
type DataListItemProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  metadata?: React.ReactNode;
  amount?: React.ReactNode;
  status?: React.ReactNode;
  href?: string;
  actions?: React.ReactNode;
};
```

## 15.4 Exemple mobile

```tsx
<DataList
  items={sales}
  emptyState={
    <EmptyState
      title="Aucune vente"
      description="Ajoutez votre première vente pour commencer."
      action={{ label: "Nouvelle vente", href: "/sales/new" }}
    />
  }
  renderItem={(sale) => (
    <DataListItem
      title={sale.clientName}
      description={sale.saleNumber}
      metadata={formatDate(sale.createdAt)}
      amount={<Amount value={sale.totalAmount} currency="HTG" />}
      status={<StatusBadge type="payment" status={sale.status} />}
      href={`/sales/${sale.id}`}
    />
  )}
/>
```

---

# 16. MobileActionBar

## 16.1 Rôle

`MobileActionBar` garde l’action principale accessible sur mobile.

## 16.2 Props recommandées

```ts
type MobileActionBarProps = {
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};
```

## 16.3 Règles UX

- Visible uniquement sur mobile.
- Sticky bottom.
- Fond légèrement flouté ou opaque.
- Ne pas couvrir le contenu important.
- Prévoir padding-bottom sur la page.

## 16.4 Exemple

```tsx
<MobileActionBar
  primaryAction={{
    label: "Nouvelle vente",
    href: "/sales/new",
    icon: <Plus className="h-4 w-4" />,
  }}
/>
```

---

# 17. ConfirmDialog

## 17.1 Rôle

`ConfirmDialog` protège les actions sensibles.

## 17.2 Props recommandées

```ts
type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  children: React.ReactNode;
};
```

## 17.3 Règles UX

À utiliser pour :

- suppression ;
- annulation ;
- retrait utilisateur ;
- changement de statut sensible ;
- opérations de stock importantes.

## 17.4 Exemple

```tsx
<ConfirmDialog
  title="Supprimer cette vente ?"
  description="Cette action ne peut pas être annulée. Les montants liés à cette vente seront retirés des rapports."
  confirmLabel="Supprimer"
  variant="destructive"
  onConfirm={handleDelete}
>
  <Button variant="destructive">Supprimer</Button>
</ConfirmDialog>
```

---

# 18. PermissionGate

## 18.1 Rôle

`PermissionGate` prépare la future gestion des rôles.

## 18.2 Props recommandées

```ts
type PermissionGateProps = {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};
```

## 18.3 Exemple

```tsx
<PermissionGate permission="sales:create">
  <Button>Nouvelle vente</Button>
</PermissionGate>
```

## 18.4 Règle

Même si les permissions ne sont pas encore complètes, il faut préparer l’architecture UI pour éviter de tout refaire.

---

# 19. AppShell

## 19.1 Rôle

`AppShell` structure l’application connectée.

## 19.2 Responsabilités

- sidebar desktop ;
- header ;
- zone contenu ;
- provider devise ;
- éventuel offline banner ;
- support permissions ;
- support secteur ;
- support mobile shell.

## 19.3 Règles

- Le shell ne doit pas contenir de logique métier lourde.
- Le shell doit rester stable entre les pages.
- Les pages doivent gérer leur contenu, pas la navigation globale.

---

# 20. DesktopSidebar

## 20.1 Rôle

Remplacer ou faire évoluer la sidebar actuelle.

## 20.2 Objectifs

- plus sobre ;
- moins “admin template” ;
- état actif discret ;
- navigation par secteur ;
- préparation permissions ;
- support bug report ;
- support compte / abonnement.

## 20.3 Style actif recommandé

```txt
background: muted
text: primary
icon: primary
border-left ou indicator subtil
```

Éviter :

```txt
gros bloc bleu saturé
```

---

# 21. MobileShell

## 21.1 Rôle

Créer une vraie expérience mobile au lieu d’une sidebar desktop adaptée.

## 21.2 Responsabilités

- topbar mobile ;
- bottom navigation ;
- action principale ;
- gestion menu secondaire ;
- padding bottom ;
- offline state ;
- loading state.

## 21.3 Navigation recommandée

Base :

```txt
Accueil
Ventes
Stock
Clients
Menu
```

Le bouton d’action principal peut changer selon la page.

---

# 22. MobileBottomNav

## 22.1 Rôle

Navigation principale mobile.

## 22.2 Items recommandés

Pour Commerce :

```txt
Accueil
Ventes
Stock
Clients
Menu
```

Pour Santé :

```txt
Accueil
Patients
RDV
Finance
Menu
```

Pour Autre :

```txt
Accueil
Ventes
Finance
Clients
Menu
```

## 22.3 Règles

- maximum 5 items ;
- labels visibles ;
- icônes simples ;
- état actif discret ;
- pas de couleur excessive.

---

# 23. ErrorState

## 23.1 Rôle

Afficher une erreur compréhensible.

## 23.2 Props recommandées

```ts
type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
};
```

## 23.3 Exemple

```tsx
<ErrorState
  title="Impossible de charger cette page"
  description="Vérifiez votre connexion puis réessayez."
  action={{ label: "Réessayer", onClick: reload }}
/>
```

---

# 24. SuccessState

## 24.1 Rôle

Confirmer une action importante.

## 24.2 Usage

- vente créée ;
- paiement ajouté ;
- reçu généré ;
- utilisateur invité ;
- produit mis à jour.

## 24.3 Exemple

```txt
Paiement ajouté.
Le solde du client a été mis à jour.
```

---

# 25. Composants par domaine

## 25.1 Sales

Composants recommandés :

```txt
SalesSummary
SalesList
SalesTable
SaleDetailHeader
SalePaymentStatus
SalePaymentTimeline
SaleReceiptActions
NewSaleForm
SaleItemsEditor
```

## 25.2 Payments

Composants recommandés :

```txt
PaymentStatusBadge
PaymentTimeline
AddPaymentDialog
PaymentSummary
RemainingBalance
```

## 25.3 Commerce

Composants recommandés :

```txt
ProductCard
ProductStockStatus
StockMovementList
StockAdjustmentDialog
SupplierReceptionForm
LowStockAlert
```

## 25.4 Clients

Composants recommandés :

```txt
ClientCard
ClientBalance
ClientPurchaseHistory
ClientDebtSummary
ClientWhatsAppAction
```

## 25.5 Reports

Composants recommandés :

```txt
ReportSummary
ReportInsight
PeriodFilter
ExportActions
SimpleChartCard
```

---

# 26. Exemple de priorité d’implémentation concrète

## Sprint UI 1 — Fondation

- `PageContainer`
- `PageHeader`
- `Amount`
- `StatusBadge`
- `MetricCard`
- update `globals.css`

## Sprint UI 2 — Feedback

- `EmptyState`
- `LoadingState`
- `ErrorState`
- `ConfirmDialog`
- toasts standardisés

## Sprint UI 3 — Formulaires

- `FormSection`
- `FormActions`
- `FieldError`
- migration nouvelle vente / nouvelle dépense / nouveau produit

## Sprint UI 4 — Mobile

- `DataList`
- `MobileActionBar`
- `MobileBottomNav`
- `MobileShell`

## Sprint UI 5 — Domain components

- `SalePaymentTimeline`
- `AddPaymentDialog`
- `ProductStockStatus`
- `LowStockAlert`
- `ClientBalance`

---

# 27. Règles d’acceptation

Un composant Synkro v2 est accepté si :

- il utilise les tokens du design system ;
- il ne hardcode pas de couleur décorative ;
- il fonctionne sur mobile ;
- il expose des props simples ;
- il ne mélange pas UI et logique métier lourde ;
- il gère les états vides / loading / erreur si nécessaire ;
- il respecte la philosophie monochrome fonctionnel ;
- il améliore la clarté et la confiance.

---

# 28. Règle finale

> Un composant Synkro ne doit pas être spectaculaire.  
> Il doit être évident, fiable et agréable à utiliser tous les jours.
