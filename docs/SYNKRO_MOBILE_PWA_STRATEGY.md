# Synkro Mobile PWA Strategy v2

> Direction : **mobile-first, léger, fiable, rassurant**  
> Design : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : transformer la PWA Synkro en une expérience mobile qui ressemble à une vraie application native, rapide et utilisable même sur téléphones modestes et connexions instables.
> Références métier : `docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md`, `docs/SYNKRO_CURRENT_STATE_AUDIT.md` et `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

## 1. Pourquoi ce document existe

Synkro est utilisé majoritairement sur mobile.

La PWA ne doit donc pas être une simple version web compressée.

Elle doit être pensée comme :

> une application mobile opérationnelle pour gérer un business au quotidien.

La priorité n’est pas de montrer beaucoup de données.

La priorité est de permettre à l’utilisateur d’agir vite, comprendre vite et faire confiance à l’application.

---

## 2. Problème actuel

L’expérience mobile actuelle souffre de plusieurs limites :

- écran blanc au lancement ;
- impression de site web dans une app ;
- navigation encore trop proche du desktop ;
- actions importantes parfois trop bas dans les pages ;
- tableaux peu adaptés aux petits écrans ;
- formulaires longs ;
- manque d’états offline / slow connection ;
- manque d’onboarding ;
- manque de feedback clair après action.

Ces problèmes réduisent la confiance.

Dans un produit de finance et gestion, un écran blanc ou un bouton qui semble ne rien faire peut donner l’impression que l’application est cassée.

---

## 3. Vision mobile v2

La version mobile de Synkro doit donner cette sensation :

> “Je peux gérer mon business rapidement, même depuis mon téléphone.”

Elle doit être :

- rapide ;
- claire ;
- tactile ;
- lisible ;
- légère ;
- rassurante ;
- orientée actions ;
- adaptée aux connexions instables ;
- utilisable sur Android bas de gamme.

---

## 4. Principe central

> Le desktop peut être analytique. Le mobile doit être opérationnel.

Sur desktop, l’utilisateur peut consulter des rapports, explorer des tableaux et analyser.

Sur mobile, l’utilisateur veut surtout :

- créer une vente ;
- enregistrer une dépense ;
- ajouter un paiement ;
- vérifier un stock ;
- voir qui doit payer ;
- envoyer un reçu ;
- consulter rapidement l’activité du jour.

---

## 5. Utilisateurs mobiles prioritaires

### 5.1 Employé en caisse

Besoins :

- créer une vente très vite ;
- voir peu de choses ;
- ne pas accéder aux zones sensibles ;
- éviter les erreurs ;
- avoir des gros boutons ;
- obtenir une confirmation claire.

### 5.2 Propriétaire / patron

Besoins :

- voir les chiffres du jour ;
- voir les impayés ;
- contrôler l’activité ;
- vérifier les stocks ;
- consulter les rapports simples ;
- voir qui a fait quoi.

### 5.3 Commerçante utilisant WhatsApp

Besoins :

- enregistrer rapidement ;
- envoyer reçu / facture par WhatsApp ;
- retrouver un client ;
- voir les dettes ;
- utiliser l’app sans formation complexe.

### 5.4 Pharmacien / boutique avec stock

Besoins :

- vérifier produits bas ;
- modifier stock ;
- enregistrer ventes ;
- recevoir stock fournisseur ;
- éviter les erreurs de quantité.

### 5.5 Cabinet médical

Besoins :

- retrouver patient ;
- enregistrer consultation ;
- voir paiement ;
- générer reçu / ordonnance ;
- gérer rendez-vous.

---

## 6. Règles d’expérience mobile

### 6.1 Une action principale par écran

Chaque écran mobile doit avoir une action évidente.

Exemples :

| Écran          | Action principale                   |
| -------------- | ----------------------------------- |
| Accueil        | Nouvelle vente                      |
| Ventes         | Nouvelle vente                      |
| Détail vente   | Ajouter un paiement / Générer reçu  |
| Produits       | Nouveau produit                     |
| Détail produit | Modifier stock                      |
| Clients        | Nouveau client                      |
| Finance        | Nouvelle dépense                    |
| Consultation   | Ajouter paiement / Générer document |

---

### 6.2 Les actions critiques ne doivent jamais être enterrées

Une action comme :

- Nouvelle vente ;
- Ajouter paiement ;
- Gérer stock ;
- Générer reçu ;
- Enregistrer ;

ne doit pas se retrouver uniquement en bas d’une longue page.

Sur mobile, utiliser :

- barre sticky en bas ;
- bouton principal visible ;
- menu d’action contextuel ;
- bouton flottant sobre si nécessaire.

---

### 6.3 Pas de tableaux complexes sur mobile

Sur mobile, éviter les tableaux.

Remplacer par des listes structurées.

Mauvais :

```txt
| Client | Date | Montant | Statut | Action |
```

Bon :

```txt
Jean Baptiste
Aujourd’hui · Cash
1 500 G
Payé
```

---

### 6.4 Le mobile doit être lisible en extérieur

Règles :

- contraste fort ;
- texte minimum `14px` ;
- labels visibles ;
- boutons grands ;
- espace suffisant ;
- ne pas dépendre uniquement de la couleur.

---

### 6.5 Les formulaires doivent être découpés

Un long formulaire mobile doit être divisé en sections :

```txt
Client
Produits
Paiement
Résumé
Notes
```

Chaque section doit avoir un objectif clair.

---

## 7. Architecture mobile recommandée

### 7.1 MobileShell

Créer un vrai `MobileShell`.

Responsabilités :

- topbar mobile ;
- bottom navigation ;
- zone de contenu ;
- action principale ;
- état offline ;
- padding safe-area ;
- support secteur ;
- support permissions.

Structure recommandée :

```txt
MobileShell
  MobileTopbar
  OfflineBanner
  PageContent
  MobileActionBar
  MobileBottomNav
```

---

### 7.2 MobileTopbar

Rôle :

- afficher le contexte ;
- permettre retour arrière ;
- afficher action secondaire si nécessaire ;
- ne pas prendre trop de place.

Exemples :

```txt
← Nouvelle vente
```

```txt
Synkro
Aujourd’hui
```

```txt
← Produit
Modifier
```

Règles :

- hauteur compacte ;
- fond calme ;
- pas de gros logo inutile sur les écrans internes ;
- priorité au contexte.

---

### 7.3 MobileBottomNav

La bottom navigation doit contenir maximum 5 éléments.

#### Commerce

```txt
Accueil
Ventes
Stock
Clients
Menu
```

Le menu Commerce doit aussi donner accès simplement à :

```txt
Achats
Fournisseurs
Réception stock
Stock bas
```

#### Santé

```txt
Accueil
Patients
RDV
Finance
Menu
```

#### Général / Autre

```txt
Accueil
Ventes
Finance
Clients
Menu
```

Règles :

- labels visibles ;
- icônes simples ;
- état actif discret ;
- pas de couleur excessive ;
- pas plus de 5 items.

---

### 7.4 MobileActionBar

La barre d’action mobile est utilisée pour garder l’action principale visible.

Exemples :

```txt
[ Nouvelle vente ]
```

```txt
[ Enregistrer la vente ]
```

```txt
[ Ajouter un paiement ]
```

```txt
[ Générer le reçu ]
```

Règles :

- sticky bottom ;
- hauteur tactile ;
- fond opaque ou légèrement flou ;
- respect de `safe-area-inset-bottom` ;
- ne pas masquer le contenu.

---

## 8. Expérience de lancement PWA

### 8.1 Problème

Actuellement, la PWA peut afficher un écran blanc pendant quelques secondes.

C’est dangereux pour la confiance.

L’utilisateur peut penser :

- l’app bug ;
- la connexion est perdue ;
- mes données ne chargent pas ;
- je dois fermer l’app.

---

### 8.2 Objectif

Remplacer l’écran blanc par une expérience de lancement rassurante.

Le lancement doit dire :

> Synkro est là, vos données arrivent.

---

### 8.3 Splash screen recommandé

Fond :

```css
#F5F5F3
```

Logo :

```txt
Synkro monochrome
```

Texte :

```txt
Chargement de votre espace…
```

Option après quelques secondes :

```txt
Connexion lente détectée. Vos données arrivent.
```

---

### 8.4 Règles du splash

- pas d’animation lourde ;
- pas de loader agressif ;
- pas de blanc pur ;
- pas de skeleton vide sans contexte ;
- affichage rapide du shell si possible ;
- texte humain si le chargement dure.

---

## 9. Loading states

### 9.1 Page loading

Utiliser un état de page complet quand une page majeure charge.

```txt
Chargement de votre espace…
Vos données arrivent.
```

### 9.2 Section loading

Utiliser des skeletons pour :

- cartes statistiques ;
- listes ;
- activité récente ;
- tables desktop.

### 9.3 Slow connection

Après un délai raisonnable :

```txt
Connexion lente détectée. Merci de patienter.
```

ou :

```txt
Vos données arrivent. Cela peut prendre quelques secondes.
```

---

## 10. Offline strategy

Synkro doit progressivement préparer le offline.

Même si la v2 ne permet pas toutes les actions hors ligne, elle doit déjà gérer proprement les états.

### 10.1 États minimum

```txt
Online
Offline
Reconnecting
Syncing
Sync failed
```

### 10.2 Banner offline

Message :

```txt
Vous êtes hors ligne. Certaines données peuvent ne pas être à jour.
```

### 10.3 Connexion retrouvée

Message :

```txt
Connexion retrouvée. Synchronisation en cours…
```

### 10.4 Règle

Ne jamais laisser l’utilisateur dans le doute.

S’il ne peut pas enregistrer, expliquer pourquoi.

---

## 11. Navigation mobile détaillée

### 11.1 Accueil mobile

L’accueil mobile ne doit pas être un dashboard analytique lourd.

Il doit être orienté action et adapté au secteur :

Référence détaillée : `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

```txt
Commerce dashboard
Santé dashboard
Autre dashboard
```

Structure recommandée :

```txt
Bonjour, [Nom]

[ + Nouvelle vente ]

Aujourd’hui
Entrées
Sorties opérationnelles
Solde

À suivre
3 clients doivent payer
2 produits en stock bas

Activité récente
...
```

### 11.2 Menu mobile

Le menu mobile contient les éléments secondaires :

```txt
Rapports
Paramètres
Abonnement
Utilisateurs
Bug report
Déconnexion
```

### 11.3 Recherche mobile

La recherche doit être accessible dans les pages de liste :

- ventes ;
- clients ;
- produits ;
- patients.

Règle :

> chercher doit être plus rapide que scroller.

---

## 12. Mobile forms

### 12.1 Nouvelle vente

Priorité absolue.

Structure recommandée :

```txt
Client
Produits / services
Paiement
Résumé
Notes optionnelles
[ Enregistrer la vente ]
```

Règles :

- bouton enregistrer sticky ;
- total toujours visible dans le résumé ;
- choix payé / partiel / impayé clair ;
- éviter trop de champs au départ ;
- permettre vente rapide sans client détaillé si nécessaire.

---

### 12.2 Nouvelle dépense

Structure :

```txt
Montant
Catégorie
Date
Méthode de paiement
Note
[ Enregistrer la dépense ]
```

Règles :

- montant en premier ;
- catégorie rapide ;
- date par défaut aujourd’hui ;
- note optionnelle.

---

### 12.3 Nouveau produit

Structure :

```txt
Information produit
Prix
Stock
Catégorie
Options avancées
[ Enregistrer le produit ]
```

Règles :

- ne pas afficher toutes les options avancées dès le départ ;
- stock initial facile à saisir ;
- seuil bas clair ;
- unités compréhensibles.

---

### 12.4 Ajouter un paiement

Structure :

```txt
Montant dû
Montant reçu
Méthode
Note optionnelle
Solde restant
[ Ajouter le paiement ]
```

Règles :

- afficher le solde avant et après ;
- empêcher montant supérieur sans confirmation ;
- générer reçu après succès ;
- proposer partage WhatsApp.

---

## 13. Mobile list pattern

### 13.1 Structure

Chaque élément de liste mobile doit idéalement contenir :

```txt
Titre principal
Métadonnées
Montant ou statut principal
Action / chevron
```

### 13.2 Exemple vente

```txt
Boutique Marie
Aujourd’hui · Cash
1 500 G
Payé
```

### 13.3 Exemple produit

```txt
Doliprane 500mg
Stock : 12 · Seuil : 5
250 G
Stock OK
```

### 13.4 Exemple client

```txt
Jean Baptiste
3 ventes · Dernier achat hier
Solde dû : 700 G
```

---

## 14. Mobile detail pages

Les pages détail doivent être orientées décision.

### 14.1 Détail vente

Structure :

```txt
Statut paiement
Montant total
Solde restant
Client
Paiements
Articles
Actions
Historique
```

Actions principales :

```txt
Ajouter paiement
Générer reçu
Envoyer WhatsApp
```

### 14.2 Détail produit

Structure :

```txt
Nom produit
Stock actuel
Prix
Seuil
Historique stock
Actions
```

Actions principales :

```txt
Ajuster stock
Modifier produit
Réception fournisseur
```

### 14.3 Détail client

Structure :

```txt
Nom client
Solde dû
Historique ventes
Paiements
Actions
```

Actions principales :

```txt
Nouvelle vente
Envoyer rappel
Voir historique
```

---

## 15. Native feel

La PWA doit paraître native.

### 15.1 Règles visuelles

- bottom nav fixe ;
- transitions simples ;
- actions sticky ;
- grandes zones tactiles ;
- pas de hover-only interactions ;
- feedback immédiat.

### 15.2 Règles techniques

- éviter layout shift ;
- charger les données importantes en priorité ;
- réduire JS inutile sur mobile ;
- utiliser skeletons ;
- optimiser les formulaires ;
- préserver le scroll naturel ;
- respecter safe areas.

---

## 16. Low-end Android strategy

Synkro doit fonctionner correctement sur téléphones modestes.

### 16.1 Règles

- éviter animations lourdes ;
- éviter grandes images ;
- limiter les graphiques complexes ;
- pagination ou lazy loading ;
- pas de longues tables ;
- réduire les composants client quand possible ;
- éviter les effets blur coûteux partout.

### 16.2 Graphiques

Sur mobile :

- privilégier résumé texte ;
- graphique simple si nécessaire ;
- pas de visualisations multiples sur un seul écran.

---

## 17. Connexion lente

### 17.1 Problème

Beaucoup d’utilisateurs peuvent avoir une connexion instable.

### 17.2 Réponse produit

Synkro doit :

- afficher rapidement le shell ;
- charger les données par sections ;
- éviter les écrans bloqués ;
- expliquer les délais ;
- permettre de réessayer ;
- éviter les doubles soumissions.

### 17.3 Messages

```txt
Connexion lente détectée.
Vos données arrivent.
```

```txt
Impossible d’enregistrer pour le moment.
Vérifiez votre connexion puis réessayez.
```

---

## 18. Double submission protection

Sur mobile, les utilisateurs peuvent cliquer plusieurs fois si rien ne se passe.

Règles :

- désactiver le bouton pendant l’enregistrement ;
- afficher loader dans le bouton ;
- afficher toast après succès ;
- empêcher double paiement ;
- empêcher double vente ;
- garder action idempotente côté serveur si possible.

Messages :

```txt
Enregistrement…
Vente enregistrée.
Paiement ajouté.
```

---

## 19. PWA install prompt

L’installation PWA peut être encouragée, mais sans agressivité.

### 19.1 Message recommandé

```txt
Ajoutez Synkro à votre écran d’accueil pour y accéder plus rapidement.
```

Action :

```txt
Ajouter à l’écran d’accueil
```

### 19.2 Règle

Ne pas bloquer l’utilisation avec une popup agressive.

---

## 20. Onboarding mobile

L’onboarding mobile doit être court.

### 20.1 Objectif

Amener à une première action utile.

Moment magique :

```txt
Première vente enregistrée.
```

### 20.2 Flow recommandé

```txt
Bienvenue
Choix secteur
Choix devise
Ajouter premier produit ou service
Créer première vente
Voir résumé
```

### 20.3 Règle

Ne pas demander trop d’informations au départ.

Chaque étape doit sembler utile.

---

## 21. Notifications et rappels

À terme, Synkro peut utiliser des notifications, mais avec prudence.

Cas utiles :

- stock bas ;
- paiement en retard ;
- fin de trial ;
- rapport mensuel disponible ;
- rendez-vous du jour.

Règle :

> Une notification doit aider le business, pas créer du bruit.

---

## 22. WhatsApp-first actions

WhatsApp est un canal central.

La PWA mobile doit prévoir des actions WhatsApp dans les flows clés.

### 22.1 Cas prioritaires

- envoyer reçu ;
- envoyer facture ;
- envoyer rappel de paiement ;
- envoyer ordonnance ;
- envoyer rendez-vous ;
- partager rapport simple.

### 22.2 Règle

Le bouton WhatsApp ne doit apparaître que quand il a du sens.

Exemple après paiement :

```txt
Paiement ajouté.
[ Envoyer le reçu par WhatsApp ]
```

---

## 23. États de succès mobile

Après une action, ne pas seulement revenir à la liste.

Afficher un état clair.

### Exemple vente

```txt
Vente enregistrée.
Total : 1 500 G

[ Générer reçu ]
[ Nouvelle vente ]
[ Voir la vente ]
```

### Exemple paiement

```txt
Paiement ajouté.
Solde restant : 700 G

[ Envoyer reçu ]
[ Voir la vente ]
```

---

## 24. Gestion des erreurs mobile

Les erreurs doivent être courtes et actionnables.

Mauvais :

```txt
Server action failed.
```

Bon :

```txt
Impossible d’enregistrer la vente.
Vérifiez votre connexion puis réessayez.
```

Mauvais :

```txt
Invalid input.
```

Bon :

```txt
Le montant doit être supérieur à 0.
```

---

## 25. Safe area

La PWA doit respecter les zones système mobile.

CSS recommandé :

```css
.mobile-shell {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Pour les barres fixes :

```css
.mobile-action-bar {
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}
```

---

## 26. Performance budget

### 26.1 Objectif

L’utilisateur doit sentir que Synkro est rapide.

### 26.2 Règles

- réduire les composants client inutiles ;
- charger moins de données au premier écran ;
- préférer pagination / limit ;
- éviter gros bundles de graphiques sur mobile ;
- lazy-load les modules lourds ;
- précharger les pages critiques ;
- éviter animations coûteuses.

---

## 27. Pages mobiles prioritaires

Ordre de refonte recommandé :

```txt
1. App launch / splash / loading
2. Mobile shell
3. Accueil mobile
4. Nouvelle vente
5. Détail vente
6. Ajouter paiement
7. Produits / stock
8. Nouveau produit
9. Clients
10. Finance
11. Rapports
12. Paramètres
```

---

## 28. Critères de réussite

La stratégie mobile est réussie si :

- l’app ne montre plus d’écran blanc au lancement ;
- l’utilisateur comprend quoi faire en moins de 10 secondes ;
- une vente peut être enregistrée rapidement ;
- les actions principales sont toujours visibles ;
- les listes sont lisibles sans tableau complexe ;
- les formulaires sont confortables sur petit écran ;
- les erreurs sont compréhensibles ;
- l’app reste utilisable avec connexion lente ;
- l’utilisateur a l’impression d’utiliser une vraie app mobile ;
- les marchands peuvent dire : “ça m’aide vraiment tous les jours”.

---

## 29. Checklist mobile avant validation d’un écran

Avant de valider un écran mobile, vérifier :

- l’action principale est-elle visible ?
- le titre est-il clair ?
- les montants sont-ils lisibles ?
- les boutons sont-ils assez grands ?
- les erreurs sont-elles humaines ?
- le chargement est-il rassurant ?
- l’écran fonctionne-t-il sans hover ?
- la page évite-t-elle les tables complexes ?
- le scroll est-il raisonnable ?
- le bouton principal reste-t-il accessible ?
- la page respecte-t-elle la safe area ?
- l’écran inspire-t-il confiance ?

---

## 30. Phrase directrice

> Sur mobile, Synkro doit être moins un dashboard et plus un outil de terrain.

Chaque écran mobile doit aider l’utilisateur à faire une action utile, rapidement et avec confiance.
