# Synkro Current State Audit

> État de référence du produit avant refonte v2.  
> Ce document décrit la version MVP actuelle de Synkro afin de garder une trace fiable de l’existant avant les changements de design, d’architecture produit et de logique métier.

---

## 1. Objectif

Synkro est déjà un produit fonctionnel utilisé par de vrais clients.

Ce document sert à garder une photo claire de l’état actuel avant la refonte v2.

Il doit aider à répondre plus tard à ces questions :

```txt
Qu’est-ce qui existait avant la refonte ?
Quels modules étaient déjà fonctionnels ?
Quelles logiques étaient déjà en place ?
Quelles zones étaient fragiles ?
Quels flows doivent absolument être préservés ?
Qu’est-ce qui doit changer dans la v2 ?
```

La refonte Synkro v2 ne doit pas être une reconstruction from scratch.

Elle doit être une migration progressive d’un produit actif.

---

## 2. État général du produit

Synkro est actuellement un MVP avancé.

Le produit contient déjà :

```txt
authentification
multi-tenant
dashboard
ventes
dépenses
finance
clients
rapports
commerce
produits
catégories
stock
module santé
patients
consultations
rendez-vous
paramètres
multi-devise
bug report
PWA
```

La base est fonctionnelle et structurée.

Le problème principal n’est pas l’absence de produit.

Le problème principal est :

```txt
l’interface manque encore de maturité
la logique métier finance/commerce doit être clarifiée
le dashboard mélange trop les contextes
le mobile n’est pas encore traité comme un produit natif
certaines fonctionnalités importantes sont encore trop MVP
```

---

## 3. Stack actuelle

Stack observée :

```txt
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
NextAuth
Prisma
SQLite en développement
PostgreSQL / Neon en production
Vercel
Resend
Sentry
PostHog
```

Le projet est déjà suffisamment structuré pour une migration progressive.

Il n’est pas nécessaire de tout jeter.

---

## 4. Design actuel

Le design actuel utilise encore principalement la base visuelle shadcn/Tailwind par défaut.

Signes observés :

```txt
primary blue shadcn par défaut
nombreuses classes text-blue-*
nombreuses classes bg-blue-*
couleurs décoratives multiples
interface proche admin dashboard
cartes statistiques assez génériques
sidebar classique
landing page assez SaaS/startup
```

La refonte v2 doit remplacer cette logique par :

```txt
monochrome fonctionnel
accent principal #1F3A5F
calme visuel
hiérarchie claire
mobile-first
trust-first
moins d’effet, plus de clarté
```

---

## 5. Documentation actuelle

Des documents de refonte existent ou sont prévus dans :

```txt
docs/
```

La structure recommandée est :

```txt
docs/SYNKRO_V2_REBUILD_PLAN.md
docs/SYNKRO_DESIGN_SYSTEM_V2.md
docs/SYNKRO_UI_COMPONENTS_SPEC.md
docs/SYNKRO_MOBILE_PWA_STRATEGY.md
docs/SYNKRO_ONBOARDING_STRATEGY.md
docs/SYNKRO_TRUST_SYSTEM.md
docs/SYNKRO_PAYMENTS_PARTIALS_SPEC.md
docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md
docs/SYNKRO_CURRENT_STATE_AUDIT.md
docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md
docs/SYNKRO_REPO_MIGRATION_PLAN.md
docs/SYNKRO_V2_IMPLEMENTATION_ROADMAP.md
docs/SYNKRO_ACTIVE_PRODUCT_MIGRATION_RULES.md
docs/SYNKRO_COPYWRITING_GUIDELINES.md
docs/AI_CODING_AGENT_GUIDE.md
```

Éviter les structures du type :

```txt
docs/docs/
```

afin de garder une documentation simple à trouver pour les humains et les agents IA.

---

## 6. Branches recommandées

La branche de production doit rester :

```txt
main
```

La refonte v2 doit vivre dans :

```txt
beta/v2-rebuild
```

Les documents de refonte et le code v2 doivent être commités sur `beta/v2-rebuild`.

Les notes sensibles ou internes peuvent être gardées dans :

```txt
archive/
```

si ce dossier est ignoré par Git.

---

## 7. Architecture actuelle des modules

Modules existants :

```txt
Dashboard
Ventes
Finance
Dépenses
Commerce
Produits
Stock
Clients
Rapports
Santé
Patients
Consultations
Rendez-vous
Paramètres
```

Cette base est solide.

La v2 doit surtout clarifier :

```txt
ce qui appartient à Finance
ce qui appartient à Commerce
ce qui appartient à Santé
ce qui est transversal
ce qui doit être affiché selon le secteur
```

---

# 8. Module Dashboard actuel

## 8.1 État actuel

Le dashboard actuel affiche des statistiques globales et des listes récentes.

Il sert de vue d’ensemble commune.

## 8.2 Problème

Le dashboard est trop générique.

Il mélange des informations qui devraient être adaptées selon le secteur :

```txt
commerce
santé
autre
```

Pour un utilisateur, cela peut créer une impression de flou.

## 8.3 Direction v2

Le dashboard doit devenir sectoriel.

La référence détaillée de conception et de priorisation est `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

### Commerce

Priorités :

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

Priorités :

```txt
rendez-vous du jour
consultations récentes
patients récents
paiements en attente
recettes du mois
documents récents
```

### Autre

Priorités :

```txt
ventes
dépenses opérationnelles
encaissements
clients à payer
activité récente
```

## 8.4 À préserver

```txt
accès rapide aux informations clés
données réelles
stats utiles
activité récente
```

## 8.5 À refondre

```txt
hiérarchie
adaptation par secteur
mobile
actions principales
clarté des montants
```

---

# 9. Module Ventes actuel

## 9.1 État actuel

Le module Ventes permet de gérer les ventes.

Il contient déjà des éléments avancés :

```txt
saleNumber
saleItems
client
montant total
statut de paiement côté vente
paidAmount
paidDate
```

Le modèle `Sale` est déjà plus avancé qu’un simple `isPaid`.

## 9.2 Ce qui est bien

```txt
ventes réelles
items de vente
lien avec produits
prix
stock potentiellement impacté
statuts paiement partiellement préparés
```

## 9.3 Fragilités

La logique paiement n’est pas encore totalement unifiée.

Il manque un vrai modèle transversal de paiements :

```txt
Payment
PaymentTimeline
PaymentReceipt
Partial payments robustes
```

## 9.4 Direction v2

Ventes doit devenir un des flows les plus solides de Synkro.

Priorités :

```txt
créer vente rapidement
voir statut paiement clairement
ajouter paiement partiel
voir reste à payer
générer reçu
envoyer par WhatsApp
lier avec client
lier avec rapports
```

---

# 10. Module Finance actuel

## 10.1 État actuel

Finance affiche les ventes, dépenses, bénéfices et statistiques.

Il existe déjà une logique de calcul qui prend en compte certaines données commerciales.

## 10.2 Ce qui est bien

```txt
vue financière centralisée
dépenses
ventes
bénéfice
multi-devise
statistiques mensuelles
```

## 10.3 Problème majeur

La logique actuelle ne distingue pas encore assez clairement :

```txt
dépenses opérationnelles
achats de stock
encaissements reçus
ventes émises
créances clients
dettes fournisseurs
```

Un achat de marchandises peut encore être traité comme une dépense simple.

Cela peut fausser la compréhension du business.

## 10.4 Direction v2

Finance doit progressivement distinguer :

```txt
Ventes émises
Encaissements reçus
Dépenses opérationnelles
Achats de stock
Créances clients
Dettes fournisseurs
Bénéfice estimé
Cash movement
```

Finance ne doit pas devenir trop comptable, mais elle doit éviter les confusions dangereuses.

---

# 11. Module Dépenses actuel

## 11.1 État actuel

Les dépenses sont enregistrées dans un modèle générique.

Le modèle contient des champs comme :

```txt
amount
category
description
date
supplierName
```

La présence de `supplierName` montre que certaines dépenses fournisseur sont déjà capturées ici.

## 11.2 Problème

Les achats de marchandises ne devraient pas être traités comme de simples dépenses opérationnelles.

Exemple :

```txt
achat de stock
achat de médicaments
achat de marchandises fournisseur
```

Ces éléments doivent aller vers :

```txt
Commerce → Achats
```

ou :

```txt
Commerce → Réception stock
```

## 11.3 Direction v2

Garder Dépenses, mais clarifier :

```txt
Dépenses = coûts de fonctionnement
Achats = marchandises destinées à être revendues
```

La page Nouvelle dépense peut guider l’utilisateur :

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

# 12. Module Commerce actuel

## 12.1 État actuel

Commerce est déjà avancé.

Il contient :

```txt
produits
catégories
stock
mouvements de stock
prix d’achat
prix de vente
seuil stock bas
stock actuel
```

## 12.2 Ce qui est bien

```txt
catalogue produits réel
stock réel
mouvements de stock
catégories
alertes stock bas
coût produit disponible
base pour marge et COGS
```

## 12.3 Ce qui manque

Le module Commerce manque encore de briques métier importantes :

```txt
Achats
Fournisseurs
Réception stock fournisseur
Paiements fournisseurs
Dettes fournisseurs
Bons de réception
Historique fournisseur
```

## 12.4 Direction v2

Commerce doit être structuré comme :

```txt
Commerce
  Vue d’ensemble
  Produits
  Stock
  Achats
  Fournisseurs
  Catégories
```

Le module Achats doit créer automatiquement :

```txt
stock movement IN
mise à jour stock produit
historique fournisseur
paiement fournisseur si payé
dette fournisseur si impayé ou partiel
```

---

# 13. Module Stock actuel

## 13.1 État actuel

Le stock existe déjà avec des mouvements.

Les produits ont :

```txt
stock
minStockLevel
costPrice
sellingPrice
```

## 13.2 Ce qui est bien

```txt
stock bas
rupture possible
historique mouvements
ajustements
tracking produit
```

## 13.3 Fragilités

Le stock n’est pas encore assez lié à un vrai flow achat fournisseur.

Il manque la chaîne complète :

```txt
achat fournisseur → produits reçus → stock IN → dette/paiement fournisseur
```

## 13.4 Direction v2

Le stock doit être alimenté principalement par :

```txt
Achats
Réception stock
Ventes
Ajustements manuels
Retours
Annulations
```

Un ajustement manuel doit rester possible, mais ne doit pas remplacer le vrai flow achat.

---

# 14. Module Clients actuel

## 14.1 État actuel

Les clients sont liés aux ventes.

La route actuelle peut être techniquement nommée :

```txt
/customers
```

même si l’interface parle de :

```txt
Clients
```

## 14.2 Attention route

Comme le produit est déjà actif, ne pas renommer brutalement :

```txt
/customers
```

vers :

```txt
/clients
```

sans plan de migration.

Court terme :

```txt
garder /customers
afficher “Clients” dans l’UI
```

Plus tard :

```txt
ajouter /clients comme alias ou migration contrôlée
```

## 14.3 Direction v2

Clients doit aider à répondre :

```txt
qui a acheté ?
qui doit encore payer ?
combien reste-t-il à payer ?
quel est l’historique du client ?
quand a-t-il payé pour la dernière fois ?
```

La page Clients doit mettre en avant :

```txt
clients avec paiement en attente
reste à payer
historique ventes
paiements récents
```

---

# 15. Module Rapports actuel

## 15.1 État actuel

Rapports affiche déjà des statistiques et analyses.

## 15.2 Ce qui est bien

```txt
vue mensuelle
graphiques
répartition
statistiques
```

## 15.3 Problème

Les rapports doivent devenir plus métier.

Actuellement, ils risquent de rester trop génériques.

## 15.4 Direction v2

Rapports doit varier selon le secteur.

### Commerce

```txt
ventes
encaissements
achats de stock
dépenses opérationnelles
créances clients
dettes fournisseurs
stock bas
produits les plus vendus
marge estimée
```

### Santé

```txt
consultations
rendez-vous
patients récents
paiements reçus
paiements en attente
recettes
```

### Autre

```txt
ventes
encaissements
dépenses opérationnelles
clients à payer
bénéfice estimé
```

---

# 16. Module Santé actuel

## 16.1 État actuel

Le module Santé est réel et déjà structuré.

Il contient :

```txt
patients
consultations
rendez-vous
dossiers patients
signes vitaux
historique médical
paiements consultation
```

## 16.2 Ce qui est bien

```txt
patients
consultations
appointments
historique
dossiers détaillés
honoraires
```

## 16.3 Fragilité

La logique paiement Santé n’est pas alignée avec la logique paiement Ventes.

Les consultations utilisent encore davantage une logique type :

```txt
isPaid
```

alors que les ventes ont déjà :

```txt
paymentStatus
paidAmount
paidDate
```

## 16.4 Direction v2

Paiements partiels doivent aussi s’appliquer aux consultations.

Exemple :

```txt
Consultation : 2 500 G
Payé : 1 500 G
Reste à payer : 1 000 G
Statut : Partiel
```

Le module Santé doit garder son langage médical :

```txt
Patient
Consultation
Rendez-vous
Document médical
Paiement consultation
```

Éviter de le transformer en simple commerce.

---

# 17. Paramètres actuels

## 17.1 État actuel

Paramètres contient déjà :

```txt
informations entreprise
profil utilisateur
abonnement
préférences
sécurité
secteur
devise
```

## 17.2 Direction v2

Paramètres doit devenir plus structuré :

```txt
Entreprise
Devise
Secteur
Utilisateurs
Abonnement
Sécurité
Documents
Préférences
```

Les utilisateurs et permissions doivent vivre dans Paramètres, pas comme module principal de sidebar.

---

# 18. Landing page actuelle

## 18.1 État actuel

La landing existe déjà.

Elle semble encore proche d’une landing SaaS classique.

## 18.2 Direction v2

La landing doit être refaite séparément.

Elle doit porter la nouvelle philosophie :

```txt
gestion claire et fiable pour PME haïtiennes
monochrome fonctionnel
sobriété
confiance
clarté
marché émergent
mobile-first
```

Elle doit éviter :

```txt
startup flashy
trop de bleu
gradients
promesses vagues
dashboard générique
```

Sprint recommandé :

```txt
Sprint 4.5 — Landing page v2
```

Règle :

```txt
ne pas toucher à l’app connectée dans ce sprint
```

---

# 19. PWA actuelle

## 19.1 État actuel

La PWA existe, mais l’expérience de lancement peut afficher un écran blanc.

## 19.2 Problème

Un écran blanc au lancement nuit à la confiance.

## 19.3 Direction v2

Ajouter :

```txt
loading global
dashboard loading
splash sobre
message connexion lente
offline banner
safe-area mobile
bottom navigation mobile
```

Messages recommandés :

```txt
Chargement de votre espace…
Vos données arrivent.
Connexion lente détectée.
Vous êtes hors ligne.
```

---

# 20. Routes et vocabulaire

## 20.1 Point important

Certaines routes techniques peuvent être en anglais :

```txt
/customers
```

mais l’interface doit rester en français :

```txt
Clients
```

## 20.2 Règle

Ne pas renommer les routes existantes sans plan.

Codex ne doit pas remplacer automatiquement :

```txt
/customers
```

par :

```txt
/clients
```

sans demande explicite.

---

# 21. Problèmes connus ou déjà observés

## 21.1 Bug params Next.js

Un bug a existé sur les pages dynamiques `[id]`.

Problème :

```txt
params est une Promise dans les versions récentes de Next.js.
Accéder directement à params.id peut donner undefined.
```

Règle :

```ts
const { id } = await params;
```

Puis :

```ts
if (!id) {
  notFound();
}
```

Dans l’état inspecté, plusieurs pages dynamiques semblent déjà corrigées.

## 21.2 Actions enterrées

Certains boutons importants peuvent se retrouver trop bas dans des pages longues.

Exemples :

```txt
gérer produits
nouveau produit
modifier stock
```

Direction v2 :

```txt
actions principales visibles en haut
action sticky sur mobile si nécessaire
```

## 21.3 Finance floue

Finance peut mélanger :

```txt
dépenses
achats de marchandises
cash sorti
profit
```

Direction v2 :

```txt
séparer dépenses opérationnelles et achats stock
```

---

# 22. Flows critiques à préserver

Pendant toute la refonte, les flows suivants doivent continuer à fonctionner :

```txt
connexion
déconnexion
dashboard
créer vente
modifier vente
voir vente
créer dépense
modifier dépense
créer produit
modifier produit
ajuster stock
voir clients
voir finance
voir rapports
changer devise
changer secteur
signaler bug
```

Pour Santé :

```txt
voir patients
créer patient
modifier patient
voir consultation
créer consultation
voir rendez-vous
```

Ces flows passent avant le polish visuel.

---

# 23. Zones à risque élevé

## 23.1 Finance

Risques :

```txt
mauvais calcul bénéfice
confusion vente émise / encaissement reçu
confusion dépense / achat stock
multi-devise
```

## 23.2 Ventes

Risques :

```txt
statut paiement incorrect
stock non mis à jour
double soumission
montant incohérent
```

## 23.3 Stock

Risques :

```txt
stock négatif
mouvement manquant
ajustement sans trace
achat non relié au stock
```

## 23.4 Santé

Risques :

```txt
données médicales sensibles
paiement consultation non aligné
documents médicaux
confidentialité WhatsApp
```

## 23.5 Routes dynamiques

Risques :

```txt
params undefined
mauvais enregistrement chargé
findFirst sans filtre valide
```

---

# 24. Refactor prioritaire recommandé

Ordre recommandé :

```txt
1. Nettoyer docs et branche beta
2. Design tokens
3. Composants système
4. Erreurs humaines + loading states
5. Page structure
6. Dashboard sectoriel
7. Landing page v2
8. Shell desktop
9. Shell mobile
10. Commerce : Achats + Fournisseurs
11. Finance : dépenses vs achats stock
12. Paiements partiels transversaux
13. PDF / reçus / WhatsApp
14. Permissions utilisateurs
```

---

# 25. Écarts entre MVP actuel et vision v2

## 25.1 Design

MVP actuel :

```txt
admin dashboard
shadcn blue
couleurs décoratives
landing SaaS classique
```

Vision v2 :

```txt
monochrome fonctionnel
#1F3A5F
calme
confiance
mobile-first
```

## 25.2 Business architecture

MVP actuel :

```txt
dépenses génériques
commerce stock partiel
pas encore Achats/Fournisseurs structurés
```

Vision v2 :

```txt
dépenses opérationnelles
achats stock
fournisseurs
dettes fournisseurs
stock relié aux achats
```

## 25.3 Dashboard

MVP actuel :

```txt
dashboard générique
```

Vision v2 :

```txt
dashboard sectoriel
commerce / santé / autre
```

## 25.4 Paiements

MVP actuel :

```txt
vente partiellement avancée
santé encore plus simple
pas de Payment timeline robuste
```

Vision v2 :

```txt
paiements partiels transversaux
reste à payer
timeline
reçus
```

---

# 26. Recommandations pour Codex

Codex doit toujours lire :

```txt
docs/AI_CODING_AGENT_GUIDE.md
docs/SYNKRO_ACTIVE_PRODUCT_MIGRATION_RULES.md
docs/SYNKRO_CURRENT_STATE_AUDIT.md
docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md
DESIGN.md
```

Avant toute tâche UI ou architecture.

Règles :

```txt
ne pas travailler sur main
ne pas modifier la DB sans demande explicite
ne pas renommer les routes existantes sans plan
ne pas casser les flows actifs
ne pas remplacer /customers par /clients sans migration
ne pas traiter achats stock comme simples dépenses
ne pas exposer des erreurs techniques
```

---

# 27. Définition de succès de la refonte

La refonte est réussie si :

```txt
Synkro est plus clair sans devenir plus compliqué
le dashboard change selon le secteur
commerce distingue achats et dépenses
finance devient plus juste
mobile devient utilisable comme vraie app
clients actifs ne perdent pas leurs repères
les actions importantes sont visibles
les erreurs sont humaines
les montants sont cohérents
la landing inspire confiance
```

---

# 28. Phrase directrice

> La v2 doit transformer Synkro d’un MVP fonctionnel en un produit métier clair, fiable et adapté à la réalité des entreprises qui l’utilisent déjà.
