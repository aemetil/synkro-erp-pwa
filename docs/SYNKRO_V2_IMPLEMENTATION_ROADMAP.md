# Synkro v2 — Implementation Roadmap

> Direction : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : organiser l’exécution de Synkro v2 en étapes courtes, réalistes et progressives.
> Références métier : `docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md`, `docs/SYNKRO_CURRENT_STATE_AUDIT.md` et `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

## 1. Objectif du document

Cette roadmap sert à transformer les documents stratégiques Synkro v2 en travail concret.

Elle doit aider à répondre chaque semaine à ces questions :

```txt
Qu’est-ce qu’on construit maintenant ?
Pourquoi ?
Quels fichiers sont concernés ?
Comment savoir si c’est terminé ?
```

---

## 2. Principe d’exécution

Synkro v2 ne doit pas être lancé comme un grand chantier flou.

La bonne approche est :

```txt
petites PR
base solide
migration progressive
focus mobile
focus confiance
fonctionnalités critiques avant polish
```

---

## 3. Ordre global

L’ordre recommandé est :

```txt
1. Fondation visuelle
2. Composants système
3. Feedback / erreurs / loading
4. Layout desktop
5. Layout mobile
6. Dashboard v2
7. Ventes v2
8. Formulaires v2
9. Paiements partiels
10. Clients / dettes
11. Commerce / stock
12. Finance / rapports
13. PWA loading / offline
14. Onboarding
15. PDF / WhatsApp
16. Permissions / utilisateurs
```

---

## 4. Sprint 0 — Préparation

### Objectif

Préparer le repo et sécuriser la base avant les changements v2.

### Tâches

```txt
Créer branche v2/rebuild-foundation
Créer dossier docs si nécessaire
Ajouter les documents v2
Vérifier build actuel
Vérifier lint actuel
Vérifier variables d’environnement
Faire backup base de données production
Lister pages critiques existantes
Lister bugs connus
```

### Fichiers concernés

```txt
docs/*
package.json
.env.example
README.md si besoin
```

### Critères de succès

- les docs v2 sont dans le repo ;
- le build actuel est connu ;
- les bugs critiques sont listés ;
- la branche v2 existe.

---

## 5. Sprint 1 — Design tokens & visual reset

### Objectif

Installer la base visuelle Synkro v2.

### Pourquoi

Sans tokens propres, chaque redesign d’écran va recréer de la dette visuelle.

### Tâches

```txt
Mettre à jour app/globals.css
Intégrer primary #1F3A5F
Calmer background / card / border / muted
Ajouter success / warning tokens
Vérifier shadcn button / input / card
Vérifier focus ring
Vérifier contraste
Tester pages principales rapidement
```

### Fichiers concernés

```txt
app/globals.css
tailwind.config.ts
components/ui/button.tsx
components/ui/input.tsx
components/ui/card.tsx
components/ui/badge.tsx
```

### Critères de succès

- le bleu shadcn par défaut n’est plus dominant ;
- l’app paraît plus calme ;
- les boutons restent lisibles ;
- les inputs restent clairs ;
- pas de page cassée visuellement.

---

## 6. Sprint 2 — System components foundation

### Objectif

Créer les composants UI v2 réutilisables.

### Pourquoi

Avant de migrer les pages, il faut une base stable.

### Tâches

```txt
Créer PageContainer
Créer PageHeader
Créer Amount
Créer StatusBadge
Créer MetricCard
Créer EmptyState
Créer LoadingState
Créer ErrorState
Créer SuccessState
Créer ConfirmDialog
Créer FormSection
Créer FormActions
Créer FieldError
```

### Fichiers à créer

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

### Critères de succès

- composants compilent ;
- composants utilisent les tokens ;
- aucun composant ne dépend d’une page spécifique ;
- composants prêts à être utilisés progressivement.

---

## 7. Sprint 3 — Human errors & feedback states

### Objectif

Améliorer la confiance immédiatement.

### Pourquoi

Une app finance/gestion ne peut pas exposer des erreurs techniques.

### Tâches

```txt
Créer app/error.tsx
Créer app/not-found.tsx
Créer app/(dashboard)/error.tsx
Mapper erreurs login NextAuth
Créer helper getFriendlyErrorMessage
Standardiser toasts succès/erreur
Ajouter loading state sur boutons critiques existants
Corriger pages avec bouton sans feedback
```

### Fichiers concernés

```txt
app/error.tsx
app/not-found.tsx
app/(dashboard)/error.tsx
app/(auth)/login/page.tsx
lib/errors.ts
components/feedback/*
```

### Messages standard

```txt
Email ou mot de passe incorrect.
Impossible de charger cette page.
Impossible d’enregistrer pour le moment.
Vérifiez votre connexion puis réessayez.
```

### Critères de succès

- login n’affiche plus de code technique ;
- erreur dashboard humaine ;
- les actions critiques donnent un feedback ;
- moins de zones silencieuses.

---

## 8. Sprint 4 — Page structure migration

### Objectif

Uniformiser les pages principales.

### Pourquoi

Cela apporte rapidement une perception de maturité sans refaire tous les écrans.

### Tâches

```txt
Migrer Dashboard avec PageContainer/PageHeader
Migrer Sales
Migrer Finance
Migrer Commerce
Migrer Clients
Migrer Reports
Migrer Settings
Mettre action principale en haut
Supprimer actions importantes enterrées
Uniformiser descriptions
```

### Fichiers concernés

```txt
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/sales/page.tsx
app/(dashboard)/finance/page.tsx
app/(dashboard)/commerce/page.tsx
app/(dashboard)/customers/page.tsx
app/(dashboard)/reports/page.tsx
app/(dashboard)/settings/page.tsx
```

Note : garder le label “Clients” côté produit, mais préserver la route active `app/(dashboard)/customers/page.tsx` tant qu’aucun plan de migration n’existe.

### Critères de succès

- toutes les pages ont un header cohérent ;
- chaque page a une action principale claire ;
- actions importantes visibles sans scroll ;
- le produit paraît moins template.

---

## 9. Sprint 5 — Desktop shell v2

### Objectif

Refondre le shell desktop.

### Pourquoi

Le shell crée la première impression du produit.

### Tâches

```txt
Refondre sidebar
Réduire gros blocs bleus
Créer état actif subtil
Clarifier modules
Améliorer header
Ajouter meilleur espace compte/entreprise
Garder navigation conditionnelle secteur
Préparer permissions futures
```

### Fichiers concernés

```txt
components/layout/dashboard-shell.tsx
components/layout/sidebar.tsx
components/layout/header.tsx
app/(dashboard)/layout.tsx
```

### Critères de succès

- navigation plus calme ;
- active state clair mais discret ;
- moins admin dashboard ;
- aucun lien secteur cassé.

---

## 10. Sprint 6 — Mobile shell foundation

### Objectif

Créer la base mobile native-like.

### Pourquoi

La majorité des utilisateurs utilise Synkro via mobile.

### Tâches

```txt
Créer MobileShell
Créer MobileTopbar
Créer MobileBottomNav
Créer MobileActionBar
Créer MobileListItem
Respecter safe-area
Ajouter padding bottom pages mobile
Adapter nav selon secteur
Créer menu mobile secondaire
```

### Fichiers à créer

```txt
components/mobile/mobile-shell.tsx
components/mobile/mobile-topbar.tsx
components/mobile/mobile-bottom-nav.tsx
components/mobile/mobile-action-bar.tsx
components/mobile/mobile-list-item.tsx
```

### Bottom nav commerce

```txt
Accueil
Ventes
Stock
Clients
Menu
```

### Critères de succès

- l’app mobile ne ressemble plus à une sidebar compressée ;
- bottom nav fonctionne ;
- action principale accessible ;
- contenu non masqué par la nav.

---

## 11. Sprint 7 — Dashboard v2

### Objectif

Transformer le dashboard en page utile, claire, action-first et sectorielle.

Référence détaillée : `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

### Tâches

```txt
Remplacer stat cards par MetricCard
Réduire couleurs décoratives
Créer section Aujourd’hui
Créer section À suivre
Créer activité récente en DataList mobile
Ajouter action principale Nouvelle vente
Adapter Commerce / Santé / Autre
Ajouter empty states utiles
```

Le dashboard Commerce doit prioriser ventes, encaissements, paiements en attente, stock bas, Achats et Fournisseurs. Le dashboard Santé doit prioriser RDV, patients, consultations et paiements de consultation. Le dashboard Autre doit rester centré sur ventes, encaissements, dépenses opérationnelles et créances clients.

### Fichiers concernés

```txt
app/(dashboard)/dashboard/page.tsx
components/dashboard/*
components/system/metric-card.tsx
components/system/data-list.tsx
```

### Structure mobile cible

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

### Critères de succès

- mobile plus simple ;
- moins de cards inutiles ;
- action principale évidente ;
- alertes importantes visibles.

---

## 12. Sprint 8 — Sales list/detail v2

### Objectif

Faire des ventes le flow central et fiable.

### Tâches

```txt
Migrer sales page vers PageHeader
Créer SalesList mobile
Créer SalesTable desktop plus sobre
Standardiser statuts
Utiliser Amount partout
Créer ou améliorer détail vente
Préparer AddPayment
Ajouter actions reçus futures
```

### Fichiers concernés

```txt
app/(dashboard)/sales/page.tsx
app/(dashboard)/sales/[id]/page.tsx
components/sales/*
components/system/amount.tsx
components/system/status-badge.tsx
```

### Critères de succès

- vente retrouvable rapidement ;
- statut clair ;
- montant lisible ;
- détail vente orienté paiement ;
- mobile utilisable.

---

## 13. Sprint 9 — Forms v2

### Objectif

Refondre les formulaires critiques.

### Tâches

```txt
Nouvelle vente avec FormSection
Nouvelle dépense avec FormSection
Nouveau produit avec FormSection
Édition produit avec FormSection
FormActions sticky mobile
Erreurs inline
Loading submit
Protection double clic
Vérifier params async sur pages [id]
```

### Fichiers concernés

```txt
app/(dashboard)/sales/new/page.tsx
app/(dashboard)/sales/[id]/edit/page.tsx
app/(dashboard)/finance/expenses/new/page.tsx
app/(dashboard)/commerce/products/new/page.tsx
app/(dashboard)/commerce/products/[id]/edit/page.tsx
components/forms/*
```

### Critères de succès

- les formulaires sont plus lisibles ;
- action submit visible ;
- aucune soumission silencieuse ;
- les erreurs sont humaines ;
- mobile confortable.

---

## 14. Sprint 10 — Payments partials model

### Objectif

Introduire la base technique des paiements partiels.

### Tâches

```txt
Ajouter enum PaymentStatus
Ajouter enum PaymentMethod
Ajouter model Payment
Ajouter relations Sale/Consultation
Ajouter paymentStatus
Garder isPaid temporairement
Créer migration
Créer script backfill
Créer helpers calculatePaidAmount / remainingAmount / status
```

### Fichiers concernés

```txt
prisma/schema.prisma
prisma/migrations/*
lib/payments/*
```

### Critères de succès

- migration passe ;
- données existantes conservées ;
- ventes payées migrées en PAID ;
- ventes impayées en UNPAID ;
- build OK.

---

## 15. Sprint 11 — Payments partials UI

### Objectif

Rendre les paiements partiels utilisables.

### Tâches

```txt
Créer PaymentSummary
Créer PaymentTimeline
Créer AddPaymentDialog
Créer RemainingBalance
Créer createPayment server action
Créer validation zod
Créer transaction Prisma
Revalidate paths
Ajouter paiement sur détail vente
Ajouter paiement sur consultation
```

### Fichiers à créer

```txt
components/payments/payment-summary.tsx
components/payments/payment-timeline.tsx
components/payments/add-payment-dialog.tsx
components/payments/remaining-balance.tsx
app/(dashboard)/actions/payments.ts ou actions/payments/*
lib/payments/*
```

### Critères de succès

- paiement partiel possible ;
- solde restant correct ;
- statut auto UNPAID/PARTIAL/PAID ;
- impossible de payer plus que le solde ;
- UI mobile claire.

---

## 16. Sprint 12 — Clients & debts v2

### Objectif

Faire de la page clients un outil de suivi des dettes.

### Tâches

```txt
Ajouter solde dû par client
Ajouter filtre Avec dette
Créer ClientBalance
Créer ClientDebtSummary
Créer ClientPaymentHistory
Adapter détail client
Ajouter liens vers ventes impayées/partielles
```

### Fichiers concernés

```txt
app/(dashboard)/customers/page.tsx
app/(dashboard)/customers/[id]/page.tsx
components/customers/*
lib/customers/*
```

Note route : ne pas renommer `/customers` vers `/clients` sans redirection, tests d’accès direct et communication si le changement est visible.

### Critères de succès

- on voit rapidement qui doit payer ;
- solde client clair ;
- historique client utile ;
- mobile lisible.

---

## 17. Sprint 13 — Commerce / stock v2

### Objectif

Améliorer le module commerce autour du stock réel, des Achats, des Fournisseurs et de la Réception stock.

### Tâches

```txt
Refondre page commerce
Refondre produits mobile
Créer ProductStockStatus
Créer LowStockAlert
Améliorer historique stock
Action ajuster stock visible
Préparer réception fournisseur
Préparer Achats de marchandises
Préparer Fournisseurs
Créer empty states utiles
```

### Fichiers concernés

```txt
app/(dashboard)/commerce/page.tsx
app/(dashboard)/commerce/products/page.tsx
app/(dashboard)/commerce/products/[id]/edit/page.tsx
app/(dashboard)/commerce/stock/page.tsx
app/(dashboard)/commerce/purchases/page.tsx
app/(dashboard)/commerce/suppliers/page.tsx
components/commerce/*
lib/stock-manager.ts
```

### Critères de succès

- stock compréhensible ;
- produits modifiables facilement ;
- stock bas visible ;
- Achats distincts des Dépenses opérationnelles ;
- Fournisseurs préparés simplement ;
- actions non enterrées.

---

## 18. Sprint 14 — Finance & reports v2

### Objectif

Clarifier les chiffres importants.

### Tâches

```txt
Distinguer ventes émises et encaissements
Ajouter créances restantes
Ajouter dépenses opérationnelles
Ajouter achats de stock
Préparer dettes fournisseurs
Afficher bénéfice estimé avec prudence
Simplifier rapports mobile
Ajouter phrases explicatives
Préparer filtre période
Préparer export PDF/CSV
Utiliser Amount et MetricCard partout
```

### Fichiers concernés

```txt
app/(dashboard)/finance/page.tsx
app/(dashboard)/reports/page.tsx
components/reports/*
lib/finance/*
```

### Critères de succès

- pas de confusion entre vente et cash reçu ;
- pas de confusion entre Achats et Dépenses opérationnelles ;
- rapports plus compréhensibles ;
- mobile lisible ;
- chiffres cohérents.

---

## 19. Sprint 15 — PWA launch / offline

### Objectif

Supprimer l’écran blanc et améliorer la confiance au lancement.

### Tâches

```txt
Créer app/loading.tsx
Créer app/(dashboard)/loading.tsx
Créer splash sobre
Ajouter OfflineBanner
Détecter online/offline
Ajouter slow connection message
Vérifier manifest
Vérifier theme-color
Vérifier icons PWA
```

### Fichiers concernés

```txt
app/loading.tsx
app/(dashboard)/loading.tsx
app/layout.tsx
components/system/offline-banner.tsx
components/pwa/*
public/*
```

### Critères de succès

- plus d’écran blanc inquiétant ;
- état loading rassurant ;
- offline visible ;
- PWA plus native.

---

## 20. Sprint 16 — Onboarding v2

### Objectif

Créer la première expérience guidée.

### Tâches

```txt
Créer route onboarding
Créer welcome step
Créer company step
Créer sector step
Créer currency step
Créer checklist dashboard
Rediriger nouveaux users sans setup
Ajouter events PostHog
```

### Fichiers concernés

```txt
app/(onboarding)/layout.tsx
app/(onboarding)/onboarding/page.tsx
components/onboarding/*
lib/onboarding/*
app/(dashboard)/dashboard/page.tsx
```

### Critères de succès

- nouvel utilisateur sait quoi faire ;
- setup court ;
- dashboard moins vide ;
- premier usage guidé.

---

## 21. Sprint 17 — PDF receipts

### Objectif

Créer les premiers documents professionnels.

### Tâches

```txt
Créer template reçu
Créer reçu paiement partiel
Créer numéro reçu
Créer génération PDF
Ajouter bouton Générer reçu
Préparer stockage document
Préparer partage lien
```

### Fichiers concernés

```txt
lib/pdf/*
components/documents/*
app/api/documents/*
components/payments/*
components/sales/*
```

### Critères de succès

- reçu généré ;
- reçu partiel affiche solde ;
- document propre ;
- accent #1F3A5F utilisé sobrement.

---

## 22. Sprint 18 — WhatsApp sharing

### Objectif

Intégrer WhatsApp aux moments clés.

### Tâches

```txt
Créer buildWhatsAppUrl
Créer messages paiement
Créer messages reçu
Ajouter bouton après reçu
Ajouter bouton après paiement
Gérer santé avec prudence
```

### Fichiers concernés

```txt
lib/whatsapp.ts
components/documents/*
components/payments/*
components/sales/*
components/health/*
```

### Critères de succès

- partage WhatsApp fonctionne ;
- message clair ;
- données sensibles santé protégées ;
- action au bon moment.

---

## 23. Sprint 19 — Permissions foundation

### Objectif

Préparer multi-utilisateurs et employés.

### Tâches

```txt
Définir rôles
Créer PermissionGate
Créer helpers permissions
Préparer Membership/Invitation si nécessaire
Masquer actions sensibles
Audit log minimum
```

### Fichiers concernés

```txt
prisma/schema.prisma
lib/permissions/*
components/system/permission-gate.tsx
app/(dashboard)/settings/*
components/users/*
```

### Critères de succès

- base permissions prête ;
- actions sensibles protégées côté UI ;
- architecture prête pour employés ;
- propriétaire garde contrôle.

---

## 24. Sprint 20 — Polish, QA, release prep

### Objectif

Stabiliser avant release v2.

### Tâches

```txt
QA mobile complète
QA desktop complète
Tester low-end mobile
Tester connexion lente
Tester paiements partiels
Tester migrations
Tester permissions
Tester PDF
Vérifier Sentry
Vérifier PostHog events
Mettre à jour changelog
Préparer release notes
```

### Critères de succès

- flows critiques validés ;
- bugs bloquants corrigés ;
- release notes prêtes ;
- v2 peut être testée par clients sélectionnés.

---

## 25. Flows critiques à tester à chaque étape

### Vente

```txt
Créer vente
Modifier vente
Voir vente
Changer statut / ajouter paiement
Générer reçu
```

### Produit

```txt
Créer produit
Modifier produit
Ajuster stock
Voir stock bas
```

### Client

```txt
Voir client
Voir dette
Voir historique
```

### Finance

```txt
Créer dépense
Voir encaissements
Voir bénéfice
```

### Mobile

```txt
Lancer PWA
Naviguer
Créer vente
Créer paiement
Gérer erreur réseau
```

---

## 26. Priorité réelle si temps limité

Si le temps est limité, prioriser :

```txt
1. Design tokens
2. PageHeader/PageContainer
3. Mobile shell
4. Nouvelle vente mobile
5. Paiements partiels
6. Clients avec dette
7. Reçu PDF
8. PWA loading
```

Ces huit éléments auront plus d’impact que des dizaines de petits polishs.

---

## 27. Ce qu’il faut repousser

À repousser tant que les bases ne sont pas solides :

```txt
Mode sombre
IA
Graphiques avancés
Dashboard personnalisable
Animations complexes
Intégrations tierces avancées
API publique
```

---

## 28. Definition of Done globale v2

Synkro v2 est prêt si :

```txt
L’app inspire plus confiance qu’avant.
Le mobile est utilisable comme vraie app.
Les actions principales sont visibles.
Les erreurs sont humaines.
Les paiements partiels fonctionnent.
Les clients avec dette sont clairs.
Les reçus professionnels existent.
L’onboarding guide les nouveaux utilisateurs.
Les documents v2 sont dans le repo.
Les flows critiques ont été testés.
```

---

## 29. Phrase directrice

> Construire Synkro v2 étape par étape, sans perdre de vue le terrain :  
> vendre, encaisser, suivre, prouver, comprendre.
