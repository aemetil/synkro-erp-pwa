# AI Coding Agent Guide — Synkro

> Guide obligatoire pour tout agent IA, co-développeur travaillant sur Synkro.  
> Synkro est un produit actif utilisé par de vrais clients. Ne jamais le traiter comme un projet neuf.

---

## 1. Contexte produit

Synkro est une application SaaS multi-tenant de gestion pour :

```txt
PME
petits commerces
pharmacies
cabinets médicaux
indépendants
entreprises de services
```

Le produit permet actuellement de gérer :

```txt
ventes
dépenses
finance
clients
commerce
produits
stock
rapports
santé
patients
consultations
rendez-vous
paramètres
```

Synkro est déjà utilisé par des clients réels.

Toute modification doit préserver les usages existants.

---

## 2. Branches

La branche de production est :

```txt
main
```

Ne jamais travailler directement sur `main`.

La branche de refonte v2 est :

```txt
beta/v2-rebuild
```

Toutes les tâches de refonte doivent partir de :

```txt
beta/v2-rebuild
```

Créer une branche dédiée par tâche :

```txt
v2/sprint-1-design-tokens
v2/sprint-2-system-components
v2/sprint-3-feedback
v2/sprint-4-page-structure
v2/dashboard-sectoriel
v2/landing-page
v2/commerce-achats
```

Puis merger vers :

```txt
beta/v2-rebuild
```

Pas vers `main`.

---

## 3. Règle principale

> Ne pas casser un flow existant pour améliorer une interface.

Un écran plus beau mais moins fiable est une régression.

Un flow plus moderne mais plus confus est une régression.

Une fonctionnalité plus ambitieuse qui fausse les chiffres est une régression.

---

## 4. Documents à lire avant de coder

Lire en priorité :

```txt
DESIGN.md
docs/SYNKRO_V2_REBUILD_PLAN.md
docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md
docs/SYNKRO_CURRENT_STATE_AUDIT.md
docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md
docs/SYNKRO_ACTIVE_PRODUCT_MIGRATION_RULES.md
docs/SYNKRO_DESIGN_SYSTEM_V2.md
docs/SYNKRO_UI_COMPONENTS_SPEC.md
docs/SYNKRO_COPYWRITING_GUIDELINES.md
docs/SYNKRO_REPO_MIGRATION_PLAN.md
docs/SYNKRO_V2_IMPLEMENTATION_ROADMAP.md
```

Pour le mobile :

```txt
docs/SYNKRO_MOBILE_PWA_STRATEGY.md
```

Pour les paiements :

```txt
docs/SYNKRO_PAYMENTS_PARTIALS_SPEC.md
```

Pour la confiance :

```txt
docs/SYNKRO_TRUST_SYSTEM.md
```

---

## 5. Direction produit v2

Synkro v2 suit la philosophie :

```txt
monochrome fonctionnel
```

Accent principal :

```txt
#1F3A5F
```

Le produit doit ressentir :

```txt
calme
fiable
professionnel
clair
mobile-first
trust-first
utile au quotidien
```

Synkro ne doit pas ressentir :

```txt
startup flashy
template admin générique
dashboard trop coloré
fintech crypto
interface décorative
produit complexe
```

---

## 6. Règles design

Utiliser les tokens et classes système.

Préférer :

```txt
background
foreground
card
border
muted
primary
success
warning
destructive
```

Éviter :

```txt
text-blue-600
bg-blue-50
text-purple-600
gradients décoratifs
couleurs aléatoires
icônes multicolores
grosses ombres
```

La couleur doit avoir un sens.

```txt
primary = action principale / identité
success = argent reçu / payé / positif
warning = attention / partiel / stock bas
destructive = erreur / dette / danger / suppression
muted = secondaire / structure
```

---

## 7. Règles UX

Chaque écran doit répondre :

```txt
Où suis-je ?
Qu’est-ce qui se passe ?
Qu’est-ce qui demande mon attention ?
Quelle action dois-je faire maintenant ?
```

Règles :

```txt
une action principale par écran
actions importantes visibles en haut
pas d’action critique enterrée en bas
pas de table complexe sur mobile
messages humains
loading states visibles
erreurs compréhensibles
confirmation pour actions sensibles
```

---

## 8. Règles pour produit actif

Flows critiques à préserver :

```txt
connexion
déconnexion
dashboard
création vente
édition vente
création dépense
édition dépense
création produit
édition produit
ajustement stock
clients
finance
rapports
paramètres
changement devise
changement secteur
signalement bug
```

Pour Santé :

```txt
patients
consultations
rendez-vous
paiements consultation existants
```

Si une tâche risque de casser un flow existant, arrêter et demander validation.

---

## 9. Règles de migration

Synkro v2 doit être migré progressivement.

Approche :

```txt
ajouter nouveau système
faire cohabiter temporairement
migrer lecture
migrer écriture
tester
observer
nettoyer plus tard
```

Ne pas supprimer immédiatement :

```txt
anciens champs DB
anciennes routes
anciens helpers
anciens composants
ancienne logique paiement
ancienne logique dépenses
```

Sauf demande explicite.

---

## 10. Règles base de données

Ne pas modifier Prisma schema sans demande explicite.

Si une modification DB est demandée :

```txt
expliquer le changement
prévoir migration progressive
préserver données existantes
éviter migration destructive
prévoir rollback
tester seed
tester build
```

Ne jamais supprimer un champ utilisé en production sans plan de migration.

Attention particulière :

```txt
Sale
Consultation
Expense
Product
StockMovement
Entreprise
User
```

---

## 11. Règle importante : Achats ≠ Dépenses

Ne pas traiter les achats de marchandises comme de simples dépenses opérationnelles.

Distinction métier :

```txt
Dépenses opérationnelles = loyer, salaire, internet, transport, électricité, marketing, frais bancaires
Achats = marchandises destinées à être revendues, stock fournisseur, médicaments, produits, inventaire
```

Les achats de stock doivent aller vers :

```txt
Commerce → Achats
Commerce → Réception stock
Commerce → Fournisseurs
```

La page Dépenses doit rester pour les coûts de fonctionnement.

Si un utilisateur tente de créer une dépense qui ressemble à un achat stock, l’UX doit guider sans bloquer :

```txt
Cette dépense semble être un achat de stock.
Pour suivre correctement vos produits, votre stock et vos marges, créez plutôt un achat fournisseur.
```

Actions :

```txt
Créer un achat
Continuer comme dépense
```

---

## 12. Dashboard sectoriel

Le dashboard ne doit pas être générique.

Il doit s’adapter au secteur.

Avant de modifier le dashboard, lire `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

### Commerce

Afficher en priorité :

```txt
ventes aujourd’hui
encaissements
clients à payer
stock bas
ruptures
achats récents
dettes fournisseurs
produits les plus vendus
```

### Santé

Afficher en priorité :

```txt
rendez-vous du jour
consultations récentes
patients récents
paiements en attente
recettes du mois
```

### Autre

Afficher en priorité :

```txt
ventes
dépenses opérationnelles
encaissements
clients à payer
activité récente
```

---

## 13. Routes existantes

Ne pas renommer les routes existantes sans validation.

Important :

```txt
/customers
```

peut être utilisé techniquement pour la page Clients.

L’interface peut afficher :

```txt
Clients
```

mais ne pas remplacer automatiquement `/customers` par `/clients` sans plan de migration.

---

## 14. Pages dynamiques Next.js

Attention aux routes `[id]`.

Avec les versions récentes de Next.js, `params` peut être une Promise.

Utiliser :

```ts
const { id } = await params;
```

Puis vérifier :

```ts
if (!id) {
  notFound();
}
```

Ne jamais faire un `findFirst` avec un filtre `id` undefined.

Risque :

```txt
mauvais enregistrement chargé
données d’un autre item affichées
confusion client
perte de confiance
```

---

## 15. Erreurs utilisateur

Ne jamais afficher d’erreurs techniques brutes.

Éviter :

```txt
CredentialsSignin
Server action failed
PrismaClientKnownRequestError
Server Components render error
undefined
NEXT_REDIRECT
```

Préférer :

```txt
Email ou mot de passe incorrect.
Impossible d’enregistrer pour le moment.
Vérifiez votre connexion puis réessayez.
Vous n’avez pas l’autorisation d’effectuer cette action.
Impossible de charger cette page.
```

---

## 16. Copywriting

Langue principale :

```txt
français simple
```

Ton :

```txt
clair
calme
professionnel
humain
non agressif
non infantilisant
```

Éviter :

```txt
jargon technique
anglais mélangé sans raison
messages trop marketing
humour dans moments sensibles
termes comptables lourds non expliqués
```

Préférer :

```txt
Nouvelle vente
Ajouter le paiement
Reste à payer
Paiement en attente
Dépenses opérationnelles
Achats
Fournisseurs
Réception stock
Encaissements
```

---

## 17. Mobile

Synkro est fortement mobile-first.

Les changements UI doivent être vérifiés sur mobile.

Règles :

```txt
pas de table complexe sur mobile
boutons minimum 44-48px
action principale accessible
bottom nav si shell mobile
listes plutôt que tableaux
pas de scroll horizontal
safe-area respectée
loading visible
```

Test minimum :

```txt
375px
390px
414px
Chrome mobile
PWA si possible
connexion lente simulée si possible
```

---

## 18. PWA

Ne pas laisser un écran blanc inquiétant.

Utiliser des états :

```txt
Chargement de votre espace…
Vos données arrivent.
Connexion lente détectée.
Vous êtes hors ligne.
```

Le lancement de l’app doit rassurer.

---

## 19. Composants v2

Quand des composants v2 existent, les utiliser.

Composants recommandés :

```txt
PageContainer
PageHeader
Amount
StatusBadge
MetricCard
EmptyState
LoadingState
ErrorState
SuccessState
FormSection
FormActions
ConfirmDialog
MobileActionBar
DataList
PermissionGate
```

Ne pas recréer des variantes locales si un composant système existe déjà.

---

## 20. Montants

Tous les montants doivent être cohérents.

Éviter :

```tsx
{
  amount.toLocaleString();
}
G;
```

Préférer un composant central :

```tsx
<Amount value={amount} currency={currency} />
```

ou le composant équivalent existant si la migration n’est pas encore faite.

Les montants doivent distinguer :

```txt
vente émise
paiement reçu
reste à payer
dépense opérationnelle
achat stock
dette fournisseur
```

---

## 21. Statuts

Utiliser des labels français cohérents.

Paiements :

```txt
Payé
Partiel
Impayé
En retard
Annulé
```

Stock :

```txt
Stock OK
Stock bas
Rupture
```

Rendez-vous :

```txt
Planifié
Confirmé
En cours
Terminé
Annulé
Absent
```

Ne pas mélanger :

```txt
paid
Payé
PAID
Réglé
Terminé
```

sans mapping clair.

---

## 22. Actions sensibles

Actions à protéger :

```txt
suppression vente
suppression dépense
modification paiement
annulation paiement
ajustement stock
suppression produit
modification paramètres entreprise
changement permissions
suppression utilisateur
```

Ces actions doivent avoir :

```txt
confirmation
message clair
loading state
feedback succès/erreur
audit log si prévu
```

---

## 23. Tests à lancer

Avant de considérer une tâche terminée :

```bash
npm run lint
npm run build
```

Si les scripts échouent, expliquer pourquoi.

Ne pas ignorer une erreur TypeScript ou build sans la signaler.

---

## 24. Tests manuels minimum

Après UI ou logique sensible, vérifier :

```txt
/login
/dashboard
/sales
/finance
/commerce
/customers
/reports
/settings
```

Flows :

```txt
créer vente
modifier vente
créer dépense
créer produit
modifier produit
voir stock
voir clients
voir finance
voir rapports
logout
```

Pour santé :

```txt
voir patients
voir consultations
voir rendez-vous
```

---

## 25. Format attendu des réponses

À la fin de chaque tâche, résumer :

```txt
Fichiers modifiés
Risque estimé
Tests lancés
Résultat des tests
Points non résolus
Recommandations suivantes
```

Ne pas répondre seulement :

```txt
Done
```

ou :

```txt
J’ai terminé
```

---

## 26. Ce qu’il ne faut pas faire

Ne pas :

```txt
travailler sur main
modifier la DB sans demande
renommer les routes sans plan
supprimer des champs existants sans migration
changer la logique financière sans tests
hardcoder des couleurs décoratives
afficher des erreurs techniques
refaire tout le design d’un coup
mélanger santé et commerce
traiter achats stock comme dépenses simples
```

---

## 27. Ce qu’il faut faire

Toujours :

```txt
travailler par petites PR
préserver les flows clients
respecter les docs v2
utiliser les composants système
tester mobile
garder les actions principales visibles
écrire des messages humains
documenter les risques
```

---

## 28. Phrase directrice

> Synkro v2 doit gagner la confiance des nouveaux utilisateurs sans perdre celle des utilisateurs actuels.

Chaque changement doit rendre le produit plus clair, plus fiable ou plus utile.
