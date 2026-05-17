# Synkro Active Product Migration Rules

> Contexte : Synkro est déjà en production, avec des clients actifs.  
> Objectif : faire évoluer Synkro vers la v2 sans casser les usages existants, sans perdre de données, et sans diminuer la confiance des utilisateurs.

---

## 1. Principe central

Synkro v2 n’est pas une reconstruction from scratch.

Synkro v2 est une migration progressive d’un produit actif.

Cela signifie :

```txt
Chaque changement doit préserver les données existantes.
Chaque changement doit préserver les flows utilisés aujourd’hui.
Chaque changement doit pouvoir être testé avant exposition complète.
Chaque changement doit pouvoir être annulé ou désactivé si nécessaire.
```

---

## 2. Règle principale

> Ne jamais casser un usage réel pour améliorer une interface.

Un écran plus beau mais moins fiable est une régression.

Un flow plus moderne mais qui ralentit un commerçant est une régression.

Une feature mieux pensée mais qui crée une confusion sur les montants est une régression.

---

## 3. Priorité absolue

Les flows existants suivants doivent rester fonctionnels pendant toute la migration :

```txt
Connexion
Dashboard
Créer vente
Modifier vente
Créer dépense
Modifier dépense
Créer produit
Modifier produit
Ajuster stock
Voir clients
Voir finance
Voir rapports
Changer devise
Signaler bug
Déconnexion
```

Si l’un de ces flows casse, la priorité devient correction immédiate.

---

## 4. Migration progressive

Chaque partie de Synkro v2 doit être introduite progressivement.

Ordre recommandé :

```txt
1. Ajouter les nouvelles fondations sans retirer l’ancien
2. Migrer une page ou un flow à la fois
3. Tester avec données réelles ou proches du réel
4. Observer erreurs et retours
5. Étendre seulement après stabilité
6. Supprimer l’ancien code uniquement quand le nouveau est confirmé
```

---

## 5. Ne pas supprimer trop tôt

Pendant la migration, éviter de supprimer immédiatement :

```txt
anciens champs DB
anciens composants
anciens helpers
anciens flows
anciennes routes
ancienne logique isPaid
anciens formats de devise
```

Préférer :

```txt
ajouter nouveau système
faire cohabiter temporairement
migrer les lectures
migrer les écritures
backfill les données
surveiller
nettoyer plus tard
```

---

## 6. Feature flags

Pour les changements sensibles, utiliser des feature flags.

### 6.1 Features à flagger

```txt
nouveau mobile shell
paiements partiels
nouveau dashboard
nouvelle page ventes
nouveau formulaire vente
PDF reçus
onboarding
permissions
WhatsApp sharing
```

### 6.2 Exemples de flags

```txt
NEXT_PUBLIC_FEATURE_MOBILE_SHELL_V2
NEXT_PUBLIC_FEATURE_PAYMENTS_PARTIALS
NEXT_PUBLIC_FEATURE_DASHBOARD_V2
NEXT_PUBLIC_FEATURE_ONBOARDING_V2
NEXT_PUBLIC_FEATURE_RECEIPTS_PDF
NEXT_PUBLIC_FEATURE_PERMISSIONS_V2
```

### 6.3 Règle

Une feature sensible doit pouvoir être désactivée rapidement sans rollback complet.

---

## 7. Déploiement progressif

Ne pas exposer toute la v2 à tous les utilisateurs immédiatement.

### 7.1 Étapes recommandées

```txt
1. Local
2. Preview Vercel
3. Test interne
4. Test avec compte démo
5. Test avec 1 ou 2 clients volontaires
6. Déploiement partiel
7. Déploiement général
```

### 7.2 Clients pilotes

Choisir des clients :

- qui utilisent vraiment l’app ;
- qui donnent des retours ;
- qui comprennent qu’ils testent une amélioration ;
- dont l’activité n’est pas trop risquée pour un premier test.

---

## 8. Données de production

Les données de production sont critiques.

### 8.1 Avant toute migration DB

Faire :

```txt
backup base de données
vérifier migration en local
tester migration sur copie de production si possible
préparer rollback
relire les champs touchés
vérifier relations multi-tenant
```

### 8.2 Migrations sensibles

Migrations à traiter avec prudence :

```txt
paiements partiels
statuts paiement
suppression ou remplacement isPaid
stock movements
permissions utilisateurs
audit logs
documents PDF liés aux ventes
```

---

## 9. Règle pour isPaid

La logique actuelle `isPaid` ne doit pas être supprimée immédiatement.

### 9.1 Migration recommandée

```txt
Étape 1 : ajouter PaymentStatus et Payment
Étape 2 : backfill depuis isPaid
Étape 3 : lire paymentStatus en priorité
Étape 4 : continuer à maintenir isPaid temporairement
Étape 5 : vérifier cohérence sur plusieurs jours
Étape 6 : retirer isPaid seulement quand tout est stable
```

### 9.2 Règle

Pendant la période de transition :

```txt
isPaid et paymentStatus ne doivent pas diverger silencieusement.
```

Si divergence détectée :

```txt
log Sentry
corriger via script
ne pas afficher de donnée ambiguë
```

---

## 10. Règles pour les montants

Les montants doivent être protégés.

### 10.1 Interdit

```txt
changer une logique de calcul sans tests
changer le format devise global sans vérifier toutes les pages
mélanger vente émise et paiement reçu
modifier rétroactivement des montants existants sans trace
```

### 10.2 Obligatoire

```txt
tester dashboard
tester finance
tester rapports
tester détail vente
tester clients
tester PDF
tester multi-devise
```

---

## 11. Compatibilité avec les clients actuels

Les clients actuels ne doivent pas être perdus après une mise à jour.

### 11.1 Après refonte UI

Préserver :

```txt
noms des pages
actions principales
accès aux ventes
accès aux produits
accès au stock
accès aux clients
accès aux paramètres
```

### 11.2 Si une action change de place

Il faut :

- la rendre plus visible qu’avant ;
- éventuellement ajouter un petit message ;
- éviter de la cacher dans un menu secondaire.

Exemple :

```txt
Le bouton “Nouveau produit” doit rester visible en haut de la page Produits.
```

---

## 12. Ne pas surprendre les utilisateurs

Synkro doit évoluer sans donner l’impression que tout a changé du jour au lendemain.

### 12.1 Bonnes pratiques

```txt
changer progressivement
garder les labels familiers
ne pas renommer toutes les pages en même temps
prévenir pour les gros changements
mettre les nouvelles actions aux endroits attendus
```

### 12.2 Exemple

Si `Ventes` devient plus puissant avec paiements partiels, garder le nom :

```txt
Ventes
```

Ne pas renommer brutalement en :

```txt
Transactions financières
```

---

## 13. Communication in-app

Pour les changements visibles, ajouter des messages courts.

### 13.1 Exemple paiements partiels

```txt
Nouveau : vous pouvez maintenant ajouter plusieurs paiements à une vente.
```

### 13.2 Exemple mobile

```txt
La navigation mobile a été améliorée pour accéder plus vite aux ventes, clients et stock.
```

### 13.3 Règle

Ne pas afficher trop de popups.

Préférer :

- petit banner ;
- note discrète ;
- message dans changelog ;
- badge “Nouveau” temporaire.

---

## 14. Rollback plan

Chaque changement sensible doit avoir un plan de rollback.

### 14.1 Avant merge

Répondre à :

```txt
Que se passe-t-il si cette feature casse ?
Peut-on la désactiver ?
Les données créées restent-elles compatibles ?
Le rollback casse-t-il les données ?
Y a-t-il une migration irréversible ?
```

### 14.2 Règle

Une migration DB irréversible ne doit pas être faite sans backup et test préalable.

---

## 15. Observabilité

Utiliser Sentry et PostHog pour surveiller la migration.

### 15.1 Sentry

Surveiller :

```txt
erreurs server actions
erreurs pages dynamiques [id]
erreurs Prisma
erreurs auth
erreurs PDF
erreurs paiements
erreurs stock
```

### 15.2 PostHog

Mesurer :

```txt
création vente
création paiement
échec création paiement
clic nouvelle vente
clic nouveau produit
usage mobile nav
abandon formulaire
clic reçu PDF
clic WhatsApp
```

---

## 16. Tests avant déploiement

Avant chaque déploiement v2, tester au minimum :

```txt
login
dashboard
nouvelle vente
édition vente
nouvelle dépense
nouveau produit
édition produit
stock
clients
finance
rapports
mobile
logout
```

Pour les sprints paiements :

```txt
vente impayée
paiement partiel
paiement complet
paiement supérieur solde
client avec solde dû
finance encaissements
rapport créances
```

---

## 17. Tests mobile obligatoires

Chaque changement UI doit être testé sur mobile.

Minimum :

```txt
largeur 375px
largeur 390px
largeur 414px
Android Chrome
PWA installée si possible
connexion lente simulée
```

### Points à vérifier

```txt
boutons accessibles
pas de scroll horizontal
pas d’action cachée
bottom nav ne masque pas le contenu
formulaires utilisables
loading visible
```

---

## 18. Déploiement des composants v2

Les composants v2 doivent être introduits sans forcer toute l’app à migrer d’un coup.

### 18.1 Exemple

Créer :

```txt
components/system/amount.tsx
```

Puis migrer progressivement :

```txt
dashboard
finance
sales
clients
reports
PDF
```

### 18.2 Règle

Un composant v2 peut cohabiter temporairement avec l’ancien composant.

Mais chaque nouveau code doit utiliser le composant v2.

---

## 19. Pages à risque élevé

Certaines pages sont plus sensibles.

### 19.1 Risque financier

```txt
sales
finance
reports
clients
payments
expenses
```

### 19.2 Risque stock

```txt
commerce/products
commerce/stock
commerce/products/[id]/edit
```

### 19.3 Risque santé

```txt
sante/patients
sante/consultations
sante/appointments
```

### 19.4 Règle

Ces pages doivent être migrées avec plus de tests que les pages purement visuelles.

---

## 20. Pages à risque faible

Peuvent être migrées plus tôt :

```txt
about
contact
landing
static pages
empty states
page headers
settings layout non critique
```

Mais attention :

```txt
la landing influence la confiance commerciale.
```

---

## 21. Gestion des bugs clients pendant v2

Pendant la refonte, les bugs clients restent prioritaires.

### 21.1 Règle

Un bug client réel passe avant un polish v2.

### 21.2 Process recommandé

```txt
recevoir bug
reproduire
corriger sur branche hotfix si urgent
déployer
documenter dans changelog
réintégrer dans branche v2
```

### 21.3 Ne pas attendre v2

Si un client ne peut pas :

```txt
modifier un produit
enregistrer une vente
changer un paiement
voir son stock
```

corriger immédiatement, même si la refonte v2 est en cours.

---

## 22. Versioning

Conserver un changelog clair.

### 22.1 Versions possibles

```txt
1.2.x — hotfix production
1.3.0 — fondations v2 invisibles
1.4.0 — mobile shell / UI v2 partielle
2.0.0 — paiements partiels + PDF + mobile v2 + onboarding
```

### 22.2 Règle

Ne pas appeler “2.0” une version qui est seulement visuelle.

La v2 doit apporter une vraie maturité produit.

---

## 23. Release notes utilisateurs

Pour les utilisateurs, écrire simplement.

### Exemple

```txt
Synkro s’améliore.

Nous avons rendu l’application plus claire sur mobile, amélioré les pages de ventes et ajouté une meilleure gestion des paiements.

Vos données restent inchangées.
```

### Règle

Toujours rassurer :

```txt
Vos données restent inchangées.
```

quand une mise à jour importante touche l’interface.

---

## 24. Support pendant migration

Pendant les changements visibles, faciliter le support.

### 24.1 Ajouter

```txt
Signaler un problème
Besoin d’aide ?
Qu’est-ce qui a changé ?
```

### 24.2 Réponses rapides

Préparer des réponses pour :

```txt
Où est passé le bouton Nouvelle vente ?
Comment ajouter un paiement ?
Pourquoi je vois Partiel ?
Comment envoyer un reçu ?
```

---

## 25. Données existantes et nouvelles features

Quand une nouvelle feature arrive, elle doit gérer les anciennes données.

### Exemple paiement partiel

Ancienne vente payée :

```txt
isPaid = true
```

Nouvelle lecture :

```txt
paymentStatus = PAID
payment créé automatiquement ou considéré comme paiement initial
```

Ancienne vente impayée :

```txt
paymentStatus = UNPAID
payments = []
```

### Règle

Aucun utilisateur ne doit voir ses anciennes ventes dans un état incohérent.

---

## 26. Checklist avant migration DB

Avant migration :

```txt
backup DB
relire schema
tester migration local
tester rollback possible
vérifier données existantes
vérifier multi-tenant
vérifier contraintes uniques
vérifier cascade delete
vérifier seed
préparer script de correction
```

Après migration :

```txt
vérifier nombre de ventes
vérifier ventes payées
vérifier ventes impayées
vérifier consultations payées
vérifier dashboard
vérifier finance
vérifier rapports
```

---

## 27. Checklist avant déploiement UI

```txt
desktop testé
mobile testé
action principale visible
pas de scroll horizontal
pas d’écran blanc
loading visible
erreurs humaines
boutons critiques fonctionnent
liens navigation fonctionnent
aucun texte technique
Sentry sans nouvelle erreur critique
```

---

## 28. Checklist après déploiement

Dans les heures suivant le déploiement :

```txt
surveiller Sentry
surveiller logs Vercel
tester compte démo
tester compte réel interne
vérifier création vente
vérifier modification produit
vérifier bug report
vérifier mobile
noter retours clients
```

---

## 29. Règles de design sur produit actif

### 29.1 Ne pas trop changer la mémoire musculaire

Les utilisateurs apprennent où cliquer.

Si une action est déplacée, elle doit être :

- plus visible ;
- plus logique ;
- pas cachée.

### 29.2 Garder les mots familiers

Si les clients connaissent :

```txt
Ventes
Produits
Finance
Clients
```

ne pas changer tous les termes d’un coup.

### 29.3 Améliorer sans désorienter

Le produit doit paraître :

```txt
plus clair
plus stable
plus professionnel
```

pas :

```txt
complètement étranger
```

---

## 30. Règle finale

> Synkro v2 doit gagner la confiance des nouveaux utilisateurs sans perdre celle des utilisateurs actuels.

La migration doit être progressive, observable et réversible autant que possible.
