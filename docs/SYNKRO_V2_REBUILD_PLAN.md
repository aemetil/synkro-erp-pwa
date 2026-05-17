# Synkro v2 — Rebuild Plan

> Version de travail initiale  
> Direction validée : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : transformer Synkro d’un MVP fonctionnel en un produit mature, fiable, mobile-first et profondément adapté au marché haïtien des PME.

---

## 1. Vision générale

Synkro v2 ne doit pas être une simple refonte visuelle.

Synkro v2 doit être une maturation complète du produit :

- meilleure confiance ;
- meilleure clarté ;
- meilleure expérience mobile ;
- meilleure stabilité perçue ;
- meilleure compréhension pour les utilisateurs non techniques ;
- meilleure adaptation aux réalités terrain du marché haïtien.

Synkro ne doit pas chercher à impressionner par des couleurs, des animations ou une apparence “startup”.

Synkro doit inspirer :

> calme, confiance, contrôle et simplicité.

---

## 2. Positionnement produit

Synkro est un logiciel de gestion pour les petites entreprises, commerces, pharmacies, cabinets médicaux et PME dans un marché où l’usage des outils numériques de gestion n’est pas encore naturel.

Le produit doit donc convaincre par l’usage, pas par le discours.

Le rôle de Synkro est de permettre à un utilisateur de passer de :

> “Je garde tout dans ma tête, sur papier ou dans WhatsApp”

à :

> “Je vois clairement ce qui se passe dans mon business.”

---

## 3. Philosophie produit

### 3.1 Principe central

> Synkro apporte du calme dans la gestion quotidienne d’un business.

Le produit doit réduire la charge mentale.

Il doit aider l’utilisateur à répondre rapidement à des questions simples :

- Combien ai-je vendu ?
- Qui me doit de l’argent ?
- Quels produits sont presque terminés ?
- Combien ai-je dépensé ?
- Est-ce que mon business va bien ?
- Puis-je remettre une preuve propre à mon client ?
- Qui a fait quoi dans l’entreprise ?

---

## 4. Philosophie design

### 4.1 Direction validée

La direction visuelle de Synkro v2 est :

> Monochrome fonctionnel.

Cela signifie :

- peu de couleurs ;
- beaucoup de clarté ;
- une hiérarchie forte ;
- un design sobre ;
- des interfaces silencieuses ;
- aucun effet décoratif inutile ;
- une impression de stabilité et de sérieux.

---

## 5. Couleur principale

L’accent principal validé est :

```css
#1F3A5F
```

````

Cette couleur doit représenter :

- la confiance ;
- la stabilité ;
- le sérieux ;
- la structure ;
- l’identité Synkro.

Elle ne doit pas être utilisée partout.

Elle doit servir principalement à :

- l’action principale ;
- la navigation active ;
- les éléments d’identité ;
- les états focus ;
- quelques accents système importants.

---

## 6. Règles de couleur

### 6.1 Couleurs interdites comme décoration

Synkro v2 doit éviter :

- les icônes multicolores décoratives ;
- les badges colorés sans signification métier ;
- les violets, bleus, verts et rouges utilisés au hasard ;
- les gradients startup ;
- les effets flashy ;
- les cartes colorées sans rôle clair.

### 6.2 Couleurs autorisées par fonction

Les couleurs doivent uniquement servir le sens.

| Couleur        | Usage                                              |
| -------------- | -------------------------------------------------- |
| Bleu `#1F3A5F` | action principale, identité, navigation active     |
| Vert           | argent reçu, paiement confirmé, bénéfice positif   |
| Rouge          | dette, perte, erreur, danger                       |
| Jaune / ambre  | attention, stock bas, action à vérifier            |
| Gris           | structure, texte secondaire, surfaces, séparateurs |

---

## 7. Design tokens proposés

Base initiale à intégrer dans `app/globals.css`.

```css
:root {
  --background: 60 10% 96%; /* #F5F5F3 */
  --foreground: 0 0% 7%; /* #111111 */

  --card: 0 0% 100%;
  --card-foreground: 0 0% 7%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 7%;

  --primary: 213 51% 25%; /* #1F3A5F */
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

---

## 8. Objectif émotionnel

Chaque écran doit faire ressentir :

> “Je comprends ce qui se passe et je sais quoi faire.”

Synkro ne doit jamais faire sentir à l’utilisateur qu’il est perdu, en faute ou pas assez technique.

L’interface doit être calme, directe et rassurante.

---

## 9. Principes UX

### 9.1 Une action principale par écran

Chaque page doit avoir une action principale évidente.

Exemples :

| Page       | Action principale                  |
| ---------- | ---------------------------------- |
| Ventes     | Nouvelle vente                     |
| Finance    | Nouvelle dépense                   |
| Commerce   | Nouveau produit ou Réception stock |
| Clients    | Nouveau client                     |
| Rapports   | Exporter / filtrer période         |
| Paramètres | Enregistrer les modifications      |

Les actions principales ne doivent jamais être enterrées en bas de longues pages.

---

### 9.2 Ne jamais cacher les actions critiques

Problème actuel observé :

Certaines actions importantes comme “Gérer les produits” ou “Nouveau produit” peuvent se retrouver trop bas dans des pages longues.

Règle v2 :

> Les actions importantes doivent être visibles dès l’arrivée sur la page.

Sur desktop :

- action principale en haut à droite du header de page ;
- actions secondaires dans un groupe clair ;
- jamais uniquement en bas de page.

Sur mobile :

- action principale sticky en bas ;
- ou bouton flottant sobre ;
- ou barre d’action persistante.

---

### 9.3 Le mobile n’est pas une version compressée du desktop

La majorité des utilisateurs utilisent l’application via mobile.

La PWA doit donc être pensée comme une vraie application mobile.

Le mobile doit être :

- rapide ;
- léger ;
- tactile ;
- lisible ;
- orienté actions ;
- adapté aux petits écrans ;
- utilisable avec une connexion instable.

---

### 9.4 Le desktop peut être analytique, le mobile doit être opérationnel

Sur desktop, l’utilisateur peut analyser.

Sur mobile, l’utilisateur doit agir.

Priorités mobile :

1. enregistrer une vente ;
2. enregistrer une dépense ;
3. voir les impayés ;
4. changer un statut de paiement ;
5. voir le stock ;
6. ajouter ou modifier un produit ;
7. envoyer un reçu ;
8. consulter l’activité récente.

---

### 9.5 Les montants sont des informations critiques

Les montants ne sont pas décoratifs.

Ils doivent être :

- très lisibles ;
- bien alignés ;
- cohérents ;
- associés à un statut clair ;
- jamais noyés dans des couleurs inutiles.

---

### 9.6 Le produit doit guider, pas seulement afficher

Synkro ne doit pas seulement montrer des données.

Il doit aider l’utilisateur à comprendre quoi faire.

Exemples :

- “3 clients doivent encore payer”
- “1 produit est presque terminé”
- “Votre bénéfice est négatif ce mois-ci”
- “Ce client a déjà payé une partie”
- “Aucune vente aujourd’hui — ajoutez votre première vente”

---

## 10. Trust System

La confiance est une fonctionnalité centrale de Synkro.

### 10.1 Règles de confiance

Synkro doit toujours :

- confirmer les actions importantes ;
- afficher des messages compréhensibles ;
- éviter les erreurs techniques visibles ;
- garder une trace des paiements ;
- indiquer qui a fait quoi ;
- rendre les statuts financiers évidents ;
- éviter les changements silencieux ;
- ne jamais afficher de données incohérentes.

---

### 10.2 Actions sensibles

Les actions suivantes doivent être traitées comme sensibles :

- suppression d’une vente ;
- suppression d’une dépense ;
- modification d’un paiement ;
- modification de stock ;
- changement de statut payé / impayé / partiel ;
- ajout ou retrait d’un utilisateur ;
- changement de permissions ;
- modification des informations de l’entreprise.

Ces actions doivent avoir :

- confirmation claire ;
- feedback après succès ;
- audit log à terme ;
- message d’erreur humain en cas d’échec.

---

### 10.3 Paiements partiels

Le système actuel payé / impayé est insuffisant pour le marché.

La v2 doit intégrer :

```txt
UNPAID → PARTIAL → PAID
```

Chaque paiement doit être :

- horodaté ;
- permanent ;
- rattaché à une vente ou consultation ;
- visible dans l’historique ;
- éventuellement exportable en reçu PDF.

Règle importante :

> Un paiement enregistré ne doit pas être supprimé silencieusement.

---

## 11. Utilisateurs principaux

Synkro v2 doit prioriser les profils suivants :

### 11.1 Petite boutique de quartier

Besoins :

- enregistrer rapidement une vente ;
- suivre le stock ;
- voir les dettes clients ;
- comprendre les ventes du jour.

### 11.2 Pharmacie

Besoins :

- stock fiable ;
- produits bas ;
- historique des ventes ;
- employés avec permissions ;
- rapidité en caisse.

### 11.3 Cabinet médical

Besoins :

- patients ;
- consultations ;
- paiements ;
- reçus ;
- rendez-vous ;
- documents professionnels.

### 11.4 Commerçante utilisant WhatsApp

Besoins :

- envoyer reçu ou facture facilement ;
- retrouver un client ;
- voir les paiements en attente ;
- simplicité extrême sur mobile.

### 11.5 Employé en caisse

Besoins :

- ajouter une vente rapidement ;
- ne pas accéder à tout ;
- interface simple ;
- peu de décisions complexes ;
- actions guidées.

### 11.6 Patron / propriétaire

Besoins :

- voir les chiffres ;
- voir qui a fait quoi ;
- gérer les employés ;
- suivre les impayés ;
- consulter les rapports ;
- comprendre la santé du business.

---

## 12. Rôles et permissions

La v2 doit préparer une logique multi-utilisateurs.

### 12.1 Rôles probables

```txt
OWNER
ADMIN
CASHIER
STOCK_MANAGER
ACCOUNTANT
VIEWER
```

### 12.2 Exemple de permissions

| Permission         | Owner |  Admin | Cashier | Stock Manager | Accountant |
| ------------------ | ----: | -----: | ------: | ------------: | ---------: |
| Voir dashboard     |   Oui |    Oui |  Limité |        Limité |        Oui |
| Créer vente        |   Oui |    Oui |     Oui |           Non |        Non |
| Modifier vente     |   Oui |    Oui |  Limité |           Non |     Limité |
| Supprimer vente    |   Oui | Limité |     Non |           Non |        Non |
| Créer dépense      |   Oui |    Oui |     Non |           Non |        Oui |
| Modifier stock     |   Oui |    Oui |     Non |           Oui |        Non |
| Voir rapports      |   Oui |    Oui |     Non |        Limité |        Oui |
| Gérer utilisateurs |   Oui | Limité |     Non |           Non |        Non |
| Changer paramètres |   Oui | Limité |     Non |           Non |        Non |

---

## 13. Architecture UI recommandée

### 13.1 Composants fondamentaux à créer ou renforcer

```txt
PageHeader
PageShell
Section
MetricCard
Amount
StatusBadge
ActionBar
MobileActionBar
DataList
DataTable
EmptyState
FormSection
FormActions
ConfirmDialog
LoadingState
OfflineBanner
PermissionGate
```

---

### 13.2 PageHeader

Toutes les pages doivent utiliser un header cohérent.

Structure recommandée :

```txt
Titre
Description courte
Action principale
Actions secondaires
```

Exemple :

```txt
Ventes
Gérez vos ventes, paiements et reçus
[ Nouvelle vente ]
```

---

### 13.3 MetricCard

Les cartes de statistiques doivent être plus sobres.

Elles doivent éviter :

- icônes colorées décoratives ;
- couleurs multiples ;
- ombres trop visibles ;
- contenu trop dense.

Structure recommandée :

```txt
Label
Montant ou valeur principale
Contexte court
Variation ou statut si utile
```

---

### 13.4 Amount

Tous les montants doivent passer par un composant unique.

Objectifs :

- formatage cohérent ;
- devise cohérente ;
- couleur selon contexte ;
- support HTG / USD / EUR / DOP / MXN ;
- éviter les bugs d’hydratation ;
- éviter les décimales inutiles.

---

### 13.5 StatusBadge

Tous les statuts doivent être standardisés.

Exemples :

```txt
Payé
Partiel
Impayé
Stock bas
Rupture
Brouillon
Confirmé
Annulé
```

Les badges doivent être sobres.

Pas de couleurs agressives.

---

## 14. Refonte du shell

Le shell actuel fonctionne, mais il ressemble encore à un dashboard admin classique.

La v2 doit introduire un shell plus mature.

### 14.1 Desktop shell

Objectifs :

- sidebar plus silencieuse ;
- état actif plus subtil ;
- moins de bleu massif ;
- meilleure séparation entre navigation et contenu ;
- header plus utile ;
- meilleure hiérarchie.

### 14.2 Mobile shell

Objectifs :

- vraie navigation mobile ;
- action principale accessible ;
- pas de sidebar desktop compressée ;
- pages lisibles sur petit écran ;
- pas de tableaux complexes ;
- listes sous forme de cards ;
- états de chargement propres.

---

## 15. PWA et expérience de lancement

Problème actuel :

> écran blanc pendant quelques secondes au lancement.

Ce comportement nuit fortement à la confiance.

### 15.1 Objectif v2

Remplacer l’écran blanc par une expérience de chargement rassurante.

Minimum attendu :

- splash screen Synkro sobre ;
- fond `#F5F5F3` ;
- logo monochrome ;
- texte court : “Chargement de votre espace…” ;
- skeleton si les données prennent du temps ;
- fallback connexion lente ;
- message offline si nécessaire.

### 15.2 Messages recommandés

```txt
Chargement de votre espace…
Connexion lente détectée. Vos données arrivent.
Vous êtes hors ligne. Certaines données peuvent ne pas être à jour.
Synchronisation en cours…
```

---

## 16. Onboarding v2

Synkro n’a pas encore d’onboarding.

La v2 doit en introduire un simple, court et utile.

### 16.1 Objectif

Amener l’utilisateur à son premier moment de valeur en moins de 2 minutes.

Moment de valeur possible :

> enregistrer une première vente et voir le montant apparaître dans le tableau de bord.

### 16.2 Étapes recommandées

1. Créer ou confirmer l’entreprise
2. Choisir le secteur
3. Choisir la devise principale
4. Ajouter un premier produit ou service
5. Enregistrer une première vente
6. Voir le résumé
7. Option : partager / imprimer un reçu

### 16.3 Règle

L’onboarding ne doit pas être long.

Il doit faire agir, pas seulement expliquer.

---

## 17. Refonte par page

## 17.1 Dashboard

### Problème actuel

Le dashboard affiche plusieurs cartes statistiques au même niveau.

Sur mobile, cela devient vite lourd.

### Objectif v2

Transformer le dashboard en page de pilotage simple.

### Priorité d’information

1. Action principale
2. Résumé du jour ou du mois
3. Alertes importantes
4. Activité récente
5. Accès rapides

### Desktop

Peut garder une structure analytique.

### Mobile

Doit devenir action-first.

Exemple mobile :

```txt
Bonjour Sylvain

[ + Nouvelle vente ]

Aujourd’hui
Entrées : 12 500 G
Sorties : 2 000 G
Solde : 10 500 G

À suivre
3 clients doivent payer
1 produit en stock bas

Activité récente
...
```

---

## 17.2 Ventes

### Objectif

Faire de la vente le flow le plus rapide et le plus fiable de Synkro.

### Priorités

- créer une vente rapidement ;
- voir si elle est payée ;
- gérer paiement partiel ;
- générer reçu ;
- retrouver une vente ;
- modifier uniquement si autorisé.

### Améliorations v2

- ajouter recherche ;
- ajouter filtres simples ;
- améliorer statuts ;
- ajouter détail vente clair ;
- intégrer paiements partiels ;
- bouton reçu / WhatsApp ;
- meilleure version mobile sous forme de liste.

---

## 17.3 Finance

### Objectif

Donner une vision claire des entrées, sorties et bénéfice.

### Problème actuel

La page est fonctionnelle mais encore trop “dashboard”.

### Améliorations v2

- réduire les cartes ;
- clarifier bénéfice ;
- mieux distinguer ventes et dépenses ;
- rendre les dépenses plus faciles à gérer ;
- créer page complète dépenses ;
- préparer export PDF / CSV ;
- montrer les anomalies.

---

## 17.4 Commerce

### Objectif

Devenir le centre opérationnel pour produits, stock et approvisionnement.

### Problèmes observés

- certaines actions importantes peuvent être trop bas dans la page ;
- gestion stock déjà utilisée réellement ;
- modification produit critique.

### Améliorations v2

- action principale visible en haut ;
- bouton “Réception stock” à prévoir ;
- alertes stock plus visibles ;
- page produit détail claire ;
- historique stock lisible ;
- distinction entre ajustement manuel et réception fournisseur ;
- éviter les actions cachées en bas.

---

## 17.5 Clients

### Objectif

Transformer la page clients en outil de suivi relationnel et financier.

### Améliorations v2

- mettre en avant clients avec dettes ;
- voir historique par client ;
- voir total acheté ;
- voir solde restant ;
- accéder aux ventes liées ;
- envoyer rappel ou reçu par WhatsApp à terme.

### Important

Pour le marché local, la page client doit aider à répondre :

> Qui me doit encore de l’argent ?

---

## 17.6 Rapports

### Objectif

Rendre les chiffres compréhensibles, pas seulement visibles.

### Problème actuel

La page utilise encore beaucoup de tableaux et de barres.

### Améliorations v2

- ajouter résumés textuels ;
- afficher tendances simples ;
- filtrer par période ;
- exporter PDF ;
- rendre mobile lisible ;
- éviter les tableaux lourds sur mobile.

Exemple :

```txt
En mai, votre business a généré 715 G de ventes et 200 G de dépenses.
Votre bénéfice estimé est de 515 G.
```

---

## 17.7 Paramètres

### Objectif

Rendre les paramètres plus structurés et moins longs.

### Améliorations v2

Diviser en sections :

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

Chaque section peut devenir une page ou un bloc pliable.

---

## 18. Documents PDF

Les documents professionnels sont un levier d’adoption majeur.

### 18.1 Documents prioritaires

- facture ;
- reçu de paiement ;
- reçu de paiement partiel ;
- rapport mensuel ;
- ordonnance ;
- consultation ;
- bon de réception stock ;
- inventaire.

### 18.2 Philosophie document

Les documents doivent inspirer :

- professionnalisme ;
- preuve ;
- confiance ;
- clarté ;
- traçabilité.

### 18.3 WhatsApp

Chaque document important doit prévoir une action :

```txt
Envoyer par WhatsApp
```

C’est prioritaire pour le marché haïtien.

---

## 19. Paiements partiels

### 19.1 Pourquoi c’est prioritaire

Le marché fonctionne souvent avec des paiements progressifs.

Exemple :

```txt
Dette : 2 000 G
Paiement aujourd’hui : 1 000 G
Paiement semaine suivante : 300 G
Solde restant : 700 G
```

### 19.2 Modèle recommandé

```txt
Sale / Consultation
  totalAmount
  status: UNPAID | PARTIAL | PAID
  payments: Payment[]

Payment
  id
  amount
  recordedAt
  recordedBy
  note
  method
```

### 19.3 Règles

- paiement immuable ;
- solde calculé automatiquement ;
- reçu générable ;
- historique visible ;
- statut mis à jour automatiquement ;
- aucun paiement ne disparaît sans trace.

---

## 20. Multi-utilisateurs

### 20.1 Pourquoi c’est important

Des utilisateurs demandent déjà l’ajout d’employés avec permissions.

C’est un signal fort.

### 20.2 Priorités v2

- invitation utilisateur ;
- rôle ;
- permissions ;
- désactivation utilisateur ;
- audit log simple ;
- limite selon abonnement.

---

## 21. Fiabilité et erreurs

### 21.1 Problème

Un produit de finance ne peut pas exposer des erreurs techniques ou comportements incohérents.

### 21.2 Règles v2

- pas de boutons qui ne font rien ;
- pas d’erreurs Next.js brutes ;
- pas de données aléatoires ;
- pas de redirection confuse ;
- toujours afficher succès / échec ;
- toujours expliquer quoi faire ensuite.

### 21.3 Messages d’erreur

Mauvais :

```txt
CredentialsSignin
```

Bon :

```txt
Email ou mot de passe incorrect.
```

Mauvais :

```txt
An error occurred in the Server Components render
```

Bon :

```txt
Une erreur est survenue. Vous pouvez réessayer ou revenir au tableau de bord.
```

---

## 22. Migration technique recommandée

### Phase 0 — Audit

Objectif :

- identifier les classes Tailwind répétées ;
- identifier les couleurs hardcodées ;
- identifier les composants dupliqués ;
- identifier les pages critiques ;
- identifier les patterns à extraire.

Fichiers prioritaires :

```txt
app/globals.css
tailwind.config.ts
components/layout/*
components/ui/*
app/(dashboard)/layout.tsx
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/sales/**
app/(dashboard)/finance/**
app/(dashboard)/commerce/**
app/(dashboard)/clients/**
app/(dashboard)/reports/**
app/(dashboard)/settings/**
```

---

### Phase 1 — Tokens

Objectif :

- remplacer la base visuelle ;
- intégrer `#1F3A5F` ;
- réduire les couleurs décoratives ;
- unifier border, background, cards, text.

---

### Phase 2 — Composants de base

Créer ou standardiser :

```txt
PageHeader
MetricCard
Amount
StatusBadge
ActionBar
FormSection
EmptyState
ConfirmDialog
LoadingState
```

---

### Phase 3 — Shell desktop + mobile

Objectif :

- nouveau dashboard shell ;
- sidebar desktop plus sobre ;
- vraie navigation mobile ;
- header plus utile ;
- action principale persistante sur mobile.

---

### Phase 4 — Pages critiques

Ordre recommandé :

1. Dashboard
2. Ventes
3. Nouvelle vente
4. Détail vente
5. Paiements partiels
6. Commerce / stock
7. Finance
8. Clients
9. Rapports
10. Paramètres

---

### Phase 5 — PWA + onboarding

Objectif :

- supprimer écran blanc ;
- ajouter splash/loading ;
- onboarding court ;
- première action guidée ;
- état offline/connexion lente.

---

### Phase 6 — Documents et WhatsApp

Objectif :

- PDF propres ;
- reçus ;
- factures ;
- partage WhatsApp ;
- identité entreprise.

---

## 23. Règles de contenu

### 23.1 Langage

Synkro doit utiliser un langage simple.

Éviter :

```txt
Transaction successfully mutated
Server action failed
CredentialsSignin
```

Préférer :

```txt
Vente enregistrée.
Produit mis à jour.
Paiement ajouté.
Impossible d’enregistrer pour le moment. Réessayez.
```

---

### 23.2 Ton

Le ton doit être :

- calme ;
- direct ;
- professionnel ;
- humain ;
- jamais infantilisant.

---

## 24. Règles mobile

### 24.1 Taille tactile

Les actions doivent être faciles à toucher.

Minimum recommandé :

```txt
44px à 48px de hauteur
```

### 24.2 Listes

Sur mobile, éviter les tableaux.

Utiliser des cartes/lignes :

```txt
Client
Date
Montant
Statut
Action
```

### 24.3 Formulaires

Les formulaires doivent être divisés en sections simples.

Exemple :

```txt
Client
Produits
Paiement
Notes
Résumé
```

### 24.4 Bouton principal

Sur les flows critiques, le bouton principal doit rester accessible.

Exemple :

```txt
[ Enregistrer la vente ]
```

en bas de l’écran.

---

## 25. Anti-patterns à éviter

Synkro v2 doit éviter :

- trop de couleurs ;
- trop de cartes ;
- trop d’icônes ;
- tables complexes sur mobile ;
- boutons importants en bas de longues pages ;
- messages d’erreur techniques ;
- actions sans feedback ;
- design trop “admin template” ;
- dashboard trop analytique sur mobile ;
- onboarding trop long ;
- fonctionnalités visibles mais non disponibles sans explication.

---

## 26. Priorités produit v2

### Priorité haute

- design tokens ;
- shell desktop/mobile ;
- dashboard mobile ;
- nouvelle vente ;
- paiement partiel ;
- reçu PDF ;
- partage WhatsApp ;
- gestion utilisateurs / permissions ;
- stock fournisseur ;
- erreurs custom ;
- PWA loading.

### Priorité moyenne

- rapports avancés ;
- export CSV ;
- abonnement ;
- audit logs complets ;
- documents personnalisés avec logo.

### Priorité basse

- mode sombre ;
- dashboard personnalisable ;
- IA ;
- intégrations avancées.

---

## 27. Définition du succès v2

Synkro v2 sera réussi si :

- un nouvel utilisateur comprend quoi faire en moins de 30 secondes ;
- une vente peut être enregistrée rapidement sur mobile ;
- un paiement partiel peut être compris sans explication ;
- un patron peut voir qui lui doit de l’argent ;
- un employé peut utiliser l’app sans accéder aux zones sensibles ;
- l’app ne donne plus l’impression d’un site web compressé en PWA ;
- les documents PDF inspirent confiance ;
- les clients disent : “qu’est-ce que je faisais avant ?”

---

## 28. Phrase directrice

Toutes les décisions produit, design et code doivent être guidées par cette phrase :

> Est-ce que cette décision rend Synkro plus clair, plus fiable et plus utile au quotidien ?

Si la réponse est non, il faut simplifier.

---
````
