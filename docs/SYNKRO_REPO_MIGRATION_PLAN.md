# Synkro Repo Migration Plan v2

> Direction : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : migrer progressivement Synkro du MVP actuel vers une v2 mature, fiable, mobile-first et adaptée au marché haïtien.
> Références métier : `docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md`, `docs/SYNKRO_CURRENT_STATE_AUDIT.md` et `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

## 1. Objectif du plan

Ce document définit l’ordre recommandé pour refondre Synkro v2 sans tout casser.

La stratégie n’est pas :

```txt
tout supprimer et recommencer
```

La stratégie est :

```txt
stabiliser les fondations
créer les composants v2
migrer les écrans critiques
améliorer mobile
ajouter les fonctionnalités trust-first
```

---

## 2. Principe de migration

Synkro v2 doit être construit par couches.

Ordre recommandé :

```txt
1. Design tokens
2. Composants système
3. Feedback / erreurs / loading
4. Shell desktop
5. Shell mobile
6. Pages critiques
7. Paiements partiels
8. PWA loading / offline
9. Onboarding
10. PDF / WhatsApp
11. Multi-utilisateurs / permissions
```

---

## 3. Règle principale

Chaque PR doit améliorer au moins une de ces choses :

- clarté ;
- confiance ;
- mobile ;
- stabilité ;
- cohérence ;
- rapidité d’usage.

Si une PR ne fait qu’ajouter de la complexité sans améliorer l’expérience, elle doit être repensée.

---

## 4. Branch strategy recommandée

Créer une branche principale v2 :

```txt
v2/rebuild-foundation
```

Puis des branches courtes :

```txt
v2/design-tokens
v2/system-components
v2/app-shell
v2/mobile-shell
v2/payment-partials
v2/onboarding
v2/pdf-documents
v2/permissions
```

Chaque branche doit rester mergeable rapidement.

---

## 5. Ordre recommandé des PR

```txt
PR 01 — Design tokens & visual reset
PR 02 — System components foundation
PR 03 — Feedback states & error handling
PR 04 — PageHeader / PageContainer migration
PR 05 — Desktop shell redesign
PR 06 — Mobile shell foundation
PR 07 — Dashboard v2
PR 08 — Sales list/detail v2
PR 09 — Forms v2
PR 10 — Payments partials data model
PR 11 — Payments partials UI
PR 12 — Commerce/stock v2
PR 13 — Clients/debts v2
PR 14 — Finance/reports v2
PR 15 — PWA loading/offline
PR 16 — Onboarding v2
PR 17 — PDF/receipts
PR 18 — WhatsApp sharing
PR 19 — Users/permissions foundation
```

---

# PR 01 — Design tokens & visual reset

## Objectif

Installer la base visuelle Synkro v2.

## Fichiers principaux

```txt
app/globals.css
tailwind.config.ts
components/ui/*
```

## Actions

- remplacer la couleur primaire par `#1F3A5F` ;
- calmer les couleurs de fond ;
- réduire le style bleu shadcn par défaut ;
- standardiser border, background, card, muted ;
- préparer success/warning/destructive ;
- vérifier focus ring ;
- vérifier contraste mobile.

## Tokens recommandés

```css
:root {
  --background: 60 10% 96%;
  --foreground: 0 0% 7%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 7%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 7%;

  --primary: 213 51% 25%;
  --primary-foreground: 0 0% 100%;

  --secondary: 60 6% 93%;
  --secondary-foreground: 0 0% 10%;

  --muted: 60 6% 93%;
  --muted-foreground: 0 0% 42%;

  --accent: 60 6% 93%;
  --accent-foreground: 0 0% 10%;

  --destructive: 4 75% 40%;
  --destructive-foreground: 0 0% 100%;

  --border: 30 7% 90%;
  --input: 30 7% 90%;
  --ring: 213 51% 25%;

  --success: 145 59% 30%;
  --success-foreground: 0 0% 100%;

  --warning: 38 92% 38%;
  --warning-foreground: 0 0% 100%;

  --radius: 0.875rem;
}
```

## Critères d’acceptation

- l’app utilise le nouveau bleu Synkro ;
- l’interface paraît plus calme ;
- les boutons restent lisibles ;
- les inputs restent accessibles ;
- aucun contraste critique n’est cassé.

---

# PR 02 — System components foundation

## Objectif

Créer les composants UI v2 sans migrer toutes les pages d’un coup.

## Nouveaux fichiers recommandés

```txt
components/layout/page-container.tsx
components/layout/page-header.tsx

components/system/amount.tsx
components/system/status-badge.tsx
components/system/metric-card.tsx
components/system/empty-state.tsx
components/system/loading-state.tsx

components/forms/form-section.tsx
components/forms/form-actions.tsx
components/forms/field-error.tsx

components/feedback/confirm-dialog.tsx
components/feedback/error-state.tsx
components/feedback/success-state.tsx
```

## Actions

- créer composants réutilisables ;
- utiliser `cn()` existant ;
- utiliser les tokens Tailwind ;
- éviter couleurs hardcodées sauf statuts métier ;
- documenter rapidement les props.

## Critères d’acceptation

- composants compilent ;
- composants indépendants ;
- aucune page existante cassée ;
- les composants peuvent être utilisés progressivement.

---

# PR 03 — Feedback states & error handling

## Objectif

Améliorer immédiatement la confiance.

## Fichiers probables

```txt
app/error.tsx
app/not-found.tsx
app/(dashboard)/error.tsx
app/(auth)/login/page.tsx
app/(auth)/*
components/feedback/*
lib/errors.ts
```

## Actions

- créer pages d’erreur humaines ;
- mapper les erreurs NextAuth ;
- éviter `CredentialsSignin` visible ;
- créer helper `getFriendlyErrorMessage()`;
- standardiser messages d’erreur server actions ;
- ajouter loading states sur boutons critiques.

## Messages recommandés

```txt
Email ou mot de passe incorrect.
Impossible de charger cette page.
Impossible d’enregistrer pour le moment.
Vérifiez votre connexion puis réessayez.
```

## Critères d’acceptation

- aucune erreur technique brute dans les flows principaux ;
- login affiche message humain ;
- dashboard error boundary existe ;
- bouton de retry existe.

---

# PR 04 — PageHeader / PageContainer migration

## Objectif

Uniformiser les pages principales sans redesign complet.

## Pages prioritaires

```txt
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/sales/page.tsx
app/(dashboard)/finance/page.tsx
app/(dashboard)/commerce/page.tsx
app/(dashboard)/customers/page.tsx
app/(dashboard)/reports/page.tsx
app/(dashboard)/settings/page.tsx
```

Note : le label produit reste “Clients”, mais la route active observée est `app/(dashboard)/customers/page.tsx`. Ne pas renommer `/customers` sans plan de migration.

## Actions

- ajouter `PageContainer` ;
- ajouter `PageHeader` ;
- placer action principale en haut ;
- réduire actions secondaires ;
- supprimer actions importantes enterrées en bas ;
- harmoniser descriptions de page.

## Exemple

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

## Critères d’acceptation

- chaque page a un titre clair ;
- chaque page a une action principale ;
- l’action principale est visible sans scroller ;
- les pages respirent mieux.

---

# PR 05 — Desktop shell redesign

## Objectif

Rendre l’app moins “admin template” et plus Synkro.

## Fichiers probables

```txt
components/layout/dashboard-shell.tsx
components/layout/sidebar.tsx
components/layout/header.tsx
app/(dashboard)/layout.tsx
```

## Actions

- réduire le bleu massif ;
- rendre la sidebar plus silencieuse ;
- améliorer état actif ;
- clarifier modules ;
- garder navigation conditionnelle par secteur ;
- préparer permissions ;
- ajouter zone compte / entreprise plus propre ;
- mieux gérer bug report / version / logout.

## État actif recommandé

```txt
fond muted
texte primary
icône primary
indicator subtil
```

## Critères d’acceptation

- navigation plus calme ;
- active state clair mais discret ;
- meilleure perception de confiance ;
- pas de rupture fonctionnelle.

---

# PR 06 — Mobile shell foundation

## Objectif

Créer une vraie structure mobile.

## Nouveaux fichiers recommandés

```txt
components/mobile/mobile-shell.tsx
components/mobile/mobile-topbar.tsx
components/mobile/mobile-bottom-nav.tsx
components/mobile/mobile-action-bar.tsx
components/mobile/mobile-list-item.tsx
```

## Actions

- détecter layout mobile via CSS responsive ;
- créer bottom nav ;
- créer action bar ;
- respecter safe area ;
- ajouter padding bottom ;
- éviter sidebar desktop en mobile ;
- préparer navigation par secteur.

## Bottom nav Commerce

```txt
Accueil
Ventes
Stock
Clients
Menu
```

## Bottom nav Santé

```txt
Accueil
Patients
RDV
Finance
Menu
```

## Critères d’acceptation

- mobile ne ressemble plus à un desktop compressé ;
- bottom nav visible ;
- action principale accessible ;
- aucun contenu caché par la nav.

---

# PR 07 — Dashboard v2

## Objectif

Transformer le dashboard en page claire, utile, mobile-first et adaptée au secteur.

Référence détaillée : `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

## Fichiers probables

```txt
app/(dashboard)/dashboard/page.tsx
components/dashboard/*
components/system/metric-card.tsx
components/system/data-list.tsx
```

## Actions

Desktop :

- réduire bruit visuel ;
- harmoniser cards ;
- mettre en avant informations importantes ;
- utiliser `MetricCard`.

Mobile :

- action-first ;
- résumé du jour ;
- alertes ;
- activité récente ;
- éviter trop de cartes.

Variantes sectorielles :

```txt
Commerce dashboard
Santé dashboard
Autre dashboard
```

Le dashboard Commerce doit faire remonter stock bas, paiements en attente, Achats et Fournisseurs quand c’est utile. Le dashboard Santé doit prioriser patients, RDV, consultations et paiements de consultation. Le dashboard Autre doit rester plus général.

## Structure mobile recommandée

```txt
Bonjour, [Nom]

[ Nouvelle vente ]

Aujourd’hui
Entrées
Sorties
Solde

À suivre
Clients à payer
Stock bas

Activité récente
```

## Critères d’acceptation

- mobile plus direct ;
- chiffres lisibles ;
- action principale claire ;
- moins de couleurs inutiles.

---

# PR 08 — Sales list/detail v2

## Objectif

Faire des ventes le flow le plus solide de Synkro.

## Fichiers probables

```txt
app/(dashboard)/sales/page.tsx
app/(dashboard)/sales/[id]/page.tsx
app/(dashboard)/sales/new/page.tsx
app/(dashboard)/sales/[id]/edit/page.tsx
components/sales/*
```

## Actions

- liste desktop plus claire ;
- liste mobile en cards ;
- statut paiement standardisé ;
- montants via `Amount` ;
- actions principales visibles ;
- page détail vente plus orientée paiement ;
- préparer paiements partiels.

## Mobile item recommandé

```txt
Client
Date · Méthode
Total
Statut
Solde restant
```

## Critères d’acceptation

- vente retrouvable facilement ;
- statut clair ;
- mobile lisible ;
- actions non enterrées.

---

# PR 09 — Forms v2

## Objectif

Rendre les formulaires plus simples et plus fiables.

## Pages prioritaires

```txt
app/(dashboard)/sales/new/page.tsx
app/(dashboard)/sales/[id]/edit/page.tsx
app/(dashboard)/expenses/new/page.tsx
app/(dashboard)/commerce/products/new/page.tsx
app/(dashboard)/commerce/products/[id]/edit/page.tsx
```

## Actions

- utiliser `FormSection` ;
- utiliser `FormActions` ;
- erreurs inline ;
- bouton sticky sur mobile ;
- loading state ;
- éviter double soumission ;
- vérifier `params` async sur pages dynamiques ;
- éviter boutons qui ne font rien.

## Structure nouvelle vente

```txt
Client
Produits / services
Paiement
Résumé
Notes
Action finale
```

## Critères d’acceptation

- formulaire mobile confortable ;
- bouton submit toujours clair ;
- erreurs humaines ;
- loading pendant sauvegarde.

---

# PR 10 — Payments partials data model

## Objectif

Introduire la base de données pour paiements partiels.

## Fichiers

```txt
prisma/schema.prisma
prisma/migrations/*
lib/payments/*
```

## Actions

- créer `Payment`;
- créer `PaymentStatus`;
- créer `PaymentMethod`;
- ajouter relation à `Sale`;
- ajouter relation à `Consultation`;
- ajouter champs `paymentStatus`;
- préparer migration depuis `isPaid`.

## Attention

Ne pas supprimer immédiatement `isPaid`.

Migration progressive recommandée :

```txt
1. ajouter nouveaux champs
2. backfill
3. adapter code lecture
4. adapter code écriture
5. supprimer ancien champ plus tard
```

## Critères d’acceptation

- migration passe ;
- anciennes données conservées ;
- ventes payées deviennent `PAID`;
- ventes impayées deviennent `UNPAID`.

---

# PR 11 — Payments partials UI

## Objectif

Permettre d’ajouter et voir des paiements partiels.

## Nouveaux composants

```txt
components/payments/payment-summary.tsx
components/payments/payment-timeline.tsx
components/payments/add-payment-dialog.tsx
components/payments/remaining-balance.tsx
components/payments/payment-method-label.tsx
```

## Server actions

```txt
actions/payments/create-payment.ts
actions/payments/void-payment.ts
```

## Actions

- ajouter paiement sur détail vente ;
- ajouter paiement sur consultation ;
- calcul solde ;
- statut automatique ;
- timeline ;
- feedback succès ;
- audit log optionnel ;
- revalidate paths.

## Critères d’acceptation

- paiement partiel créé ;
- solde restant correct ;
- statut passe UNPAID → PARTIAL → PAID ;
- impossible de payer plus que le solde ;
- UI claire sur mobile.

---

# PR 12 — Commerce / stock v2

## Objectif

Renforcer le module commerce autour des produits, stock, achats de marchandises, fournisseurs et approvisionnement.

## Pages

```txt
app/(dashboard)/commerce/page.tsx
app/(dashboard)/commerce/products/page.tsx
app/(dashboard)/commerce/products/new/page.tsx
app/(dashboard)/commerce/products/[id]/edit/page.tsx
app/(dashboard)/commerce/stock/page.tsx
app/(dashboard)/commerce/purchases/page.tsx
app/(dashboard)/commerce/suppliers/page.tsx
```

## Actions

- actions principales en haut ;
- liste produits mobile ;
- statut stock standardisé ;
- historique plus clair ;
- préparer Achats ;
- préparer Fournisseurs ;
- préparer Réception stock fournisseur ;
- bouton ajustement stock visible ;
- empty states utiles.

## À préparer

```txt
SupplierReception
PurchaseReceipt
Supplier
StockPurchase
StockMovement reason
```

## Critères d’acceptation

- modifier produit simple ;
- stock clair ;
- alertes visibles ;
- Achats distincts des Dépenses opérationnelles ;
- Fournisseurs préparés sans complexité comptable ;
- actions non cachées en bas.

---

# PR 13 — Clients / debts v2

## Objectif

Faire de la page clients un outil de suivi financier.

## Pages

```txt
app/(dashboard)/customers/page.tsx
app/(dashboard)/customers/[id]/page.tsx
components/customers/*
```

Note route : garder `/customers` comme route existante tant qu’un plan explicite de migration vers une autre URL n’est pas validé.

## Actions

- mettre en avant solde dû ;
- filtre “avec dette” ;
- historique ventes ;
- paiements liés ;
- actions WhatsApp futures ;
- montants via `Amount`.

## Composants

```txt
ClientBalance
ClientDebtSummary
ClientPurchaseHistory
ClientPaymentHistory
```

## Critères d’acceptation

- on peut voir qui doit de l’argent ;
- client détail clair ;
- mobile lisible ;
- dettes non ambiguës.

---

# PR 14 — Finance / reports v2

## Objectif

Clarifier les chiffres sans transformer Synkro en logiciel comptable complet.

## Pages

```txt
app/(dashboard)/finance/page.tsx
app/(dashboard)/reports/page.tsx
```

## Actions

- distinguer ventes émises et encaissements reçus ;
- afficher créances ouvertes ;
- distinguer dépenses opérationnelles et achats de stock ;
- préparer dettes fournisseurs ;
- afficher bénéfice estimé avec prudence ;
- simplifier graphiques ;
- ajouter phrases explicatives ;
- préparer filtre période ;
- préparer export.

## Concepts importants

```txt
Chiffre d’affaires
Encaissements reçus
Dépenses opérationnelles
Achats de stock
Créances clients
Dettes fournisseurs
Bénéfice estimé
```

## Critères d’acceptation

- les chiffres sont compréhensibles ;
- pas de confusion vente impayée / cash reçu ;
- mobile lisible.

---

# PR 15 — PWA loading / offline

## Objectif

Supprimer l’écran blanc et rassurer au lancement.

## Fichiers probables

```txt
app/loading.tsx
app/(dashboard)/loading.tsx
public/manifest.json ou site.webmanifest
app/layout.tsx
components/system/loading-state.tsx
components/system/offline-banner.tsx
components/pwa/*
```

## Actions

- créer loading global ;
- créer dashboard loading ;
- créer splash sobre ;
- ajouter offline banner ;
- détecter online/offline côté client ;
- message connexion lente ;
- vérifier manifest icons ;
- vérifier theme-color.

## Messages

```txt
Chargement de votre espace…
Vos données arrivent.
Vous êtes hors ligne. Certaines données peuvent ne pas être à jour.
```

## Critères d’acceptation

- plus d’écran blanc inquiétant ;
- état offline visible ;
- loading cohérent ;
- PWA plus native.

---

# PR 16 — Onboarding v2

## Objectif

Créer une première expérience guidée.

## Pages possibles

```txt
app/(onboarding)/onboarding/page.tsx
app/(onboarding)/layout.tsx
components/onboarding/*
```

## Étapes minimum

```txt
Bienvenue
Entreprise
Secteur
Devise
Dashboard avec checklist
```

## Étapes progressives

```txt
Premier produit
Première vente
Premier reçu
Inviter employé
```

## Critères d’acceptation

- nouvel utilisateur sait quoi faire ;
- setup rapide ;
- dashboard non vide émotionnellement ;
- checklist visible mais non agressive.

---

# PR 17 — PDF / receipts

## Objectif

Créer les premiers documents de confiance.

## Documents prioritaires

```txt
Reçu vente
Reçu paiement partiel
Facture
Rapport mensuel simple
```

## Fichiers possibles

```txt
lib/pdf/*
components/documents/*
app/api/documents/*
```

## Actions

- template monochrome ;
- accent `#1F3A5F`;
- numéro unique ;
- montants alignés ;
- solde restant ;
- statut ;
- entreprise ;
- client.

## Critères d’acceptation

- reçu professionnel ;
- reçu partiel affiche solde ;
- document partageable ;
- cohérent avec Synkro v2.

---

# PR 18 — WhatsApp sharing

## Objectif

Intégrer WhatsApp dans les moments utiles.

## Cas prioritaires

```txt
Après paiement
Après reçu
Après facture
Après rendez-vous
```

## Actions

- créer helper `buildWhatsAppUrl`;
- messages courts ;
- ne pas exposer données sensibles santé sans confirmation ;
- bouton visible après génération document.

## Exemple

```txt
Bonjour [Client], voici votre reçu de paiement pour la vente [SALE_NUMBER].
Montant payé : [AMOUNT]
Solde restant : [REMAINING]
Merci.
```

## Critères d’acceptation

- lien WhatsApp fonctionne mobile ;
- message clair ;
- pas de bruit inutile.

---

# PR 19 — Users / permissions foundation

## Objectif

Préparer le multi-utilisateur.

## Modèles possibles

```txt
Membership
Role
Permission
Invitation
AuditLog
```

## Rôles

```txt
OWNER
ADMIN
CASHIER
STOCK_MANAGER
ACCOUNTANT
VIEWER
```

## Actions

- créer modèle membership si nécessaire ;
- préparer permissions ;
- créer `PermissionGate`;
- limiter actions sensibles ;
- préparer invitation utilisateur ;
- commencer audit log.

## Critères d’acceptation

- architecture prête ;
- UI peut masquer actions ;
- propriétaire garde contrôle ;
- employé peut être limité.

---

## 6. Composants à migrer progressivement

### Layout

```txt
DashboardShell → AppShell
Sidebar → DesktopSidebar
Header → Topbar
```

### UI système

```txt
CurrencyAmount → Amount
badges maison → StatusBadge
stat cards → MetricCard
tables mobile → DataList
```

### Forms

```txt
form layouts custom → FormSection + FormActions
native errors → FieldError
```

---

## 7. Standards de code v2

### 7.1 Pas de couleur hardcodée sans raison

Éviter :

```tsx
className = "text-blue-600 bg-blue-50";
```

Préférer :

```tsx
className = "text-primary bg-muted";
```

Pour statuts métier, centraliser dans `StatusBadge`.

---

### 7.2 Pas de formatage montant dispersé

Éviter :

```tsx
{
  amount.toLocaleString();
}
G;
```

Préférer :

```tsx
<Amount value={amount} currency={currency} />
```

---

### 7.3 Pas de messages techniques

Éviter :

```tsx
throw new Error("Prisma error");
```

Préférer côté action :

```ts
return {
  error: "Impossible d’enregistrer pour le moment.",
};
```

---

### 7.4 Server actions

Toutes les server actions sensibles doivent :

```txt
vérifier session
vérifier entreprise
vérifier permission si applicable
valider input
utiliser transaction si nécessaire
retourner erreur humaine
revalidate paths
```

---

## 8. Règles pour pages dynamiques Next.js

Attention aux pages `[id]`.

Avec les versions récentes de Next.js, vérifier correctement la gestion de `params`.

Règle :

```ts
const { id } = await params;
```

Ne jamais utiliser un `id` undefined dans un filtre Prisma.

Mauvais risque :

```ts
findFirst({
  where: {
    id: undefined,
  },
});
```

Cela peut causer l’ouverture d’un mauvais enregistrement.

Règle stricte :

```ts
if (!id) {
  notFound();
}
```

---

## 9. Revalidation standard

Après vente :

```txt
/dashboard
/sales
/finance
/reports
/customers
```

Après paiement :

```txt
/dashboard
/sales
/sales/[id]
/finance
/reports
/customers
/customers/[id]
```

Après produit / stock :

```txt
/dashboard
/commerce
/commerce/products
/commerce/stock
/finance si dépense fournisseur liée
```

Après consultation :

```txt
/dashboard
/sante
/sante/consultations
/sante/patients
/finance
/reports
```

---

## 10. Tests manuels prioritaires

Avant chaque merge important :

### Auth

```txt
login incorrect
login correct
session expirée
logout
```

### Vente

```txt
créer vente
modifier vente
supprimer / annuler vente
vente mobile
vente avec produit
vente sans produit
```

### Produit

```txt
créer produit
modifier produit
modifier stock
produit [id]/edit correct
stock bas
rupture
```

### Paiements

```txt
impayé
partiel
payé
paiement supérieur solde
double clic
reçu
```

### Mobile

```txt
lancement PWA
navigation bottom
nouvelle vente
formulaire long
connexion lente
offline
```

---

## 11. Priorités business

### À faire tôt

- paiements partiels ;
- reçus ;
- mobile shell ;
- PWA loading ;
- action principale visible ;
- erreurs humaines ;
- clients avec dettes.

### À ne pas faire trop tôt

- IA ;
- dashboard personnalisable ;
- graphiques trop avancés ;
- mode sombre ;
- intégrations complexes ;
- trop de paramètres.

---

## 12. Risques

### 12.1 Trop redesign sans améliorer usage

Risque :

```txt
faire joli mais ne pas améliorer la vente, paiement, stock, mobile
```

Réponse :

```txt
prioriser flows critiques
```

### 12.2 Trop de features v2 en même temps

Risque :

```txt
paiements + permissions + PDF + onboarding + mobile tout ensemble
```

Réponse :

```txt
PR courtes et migration progressive
```

### 12.3 Casser les données financières

Risque :

```txt
mauvaise migration isPaid
mauvais calcul solde
double paiement
```

Réponse :

```txt
transactions
tests
migration en étapes
conservation temporaire isPaid
```

### 12.4 Mobile trop lourd

Risque :

```txt
graphiques lourds
trop de JS
animations coûteuses
```

Réponse :

```txt
mobile opérationnel, simple, rapide
```

---

## 13. Définition d’une PR réussie

Une PR v2 est réussie si :

- elle améliore une partie visible ou critique ;
- elle ne casse pas les flows existants ;
- elle fonctionne sur mobile ;
- elle utilise les composants/tokens v2 ;
- elle améliore la confiance ;
- elle réduit la duplication ;
- elle a des messages humains ;
- elle reste compréhensible pour un futur dev.

---

## 14. Definition of Done v2

Synkro v2 peut être considéré prêt quand :

- le design system v2 est appliqué aux pages principales ;
- le mobile ne ressemble plus à une web app compressée ;
- le lancement PWA n’affiche plus un écran blanc ;
- les actions principales sont visibles ;
- les erreurs sont humaines ;
- les paiements partiels fonctionnent ;
- les dettes clients sont visibles ;
- les reçus PDF existent ;
- WhatsApp est intégré aux moments clés ;
- l’onboarding guide les nouveaux utilisateurs ;
- la base permissions est prête.

---

## 15. Phrase directrice

> Ne pas refaire Synkro pour qu’il soit plus beau.  
> Refaire Synkro pour qu’il soit plus clair, plus fiable et plus utilisé.

# La colonne vertébrale complète

> SYNKRO_V2_REBUILD_PLAN.md
> SYNKRO_DESIGN_SYSTEM_V2.md
> SYNKRO_UI_COMPONENTS_SPEC.md
> SYNKRO_MOBILE_PWA_STRATEGY.md
> SYNKRO_ONBOARDING_STRATEGY.md
> SYNKRO_TRUST_SYSTEM.md
> SYNKRO_PAYMENTS_PARTIALS_SPEC.md
> SYNKRO_REPO_MIGRATION_PLAN.md
