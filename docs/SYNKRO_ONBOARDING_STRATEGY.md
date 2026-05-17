# Synkro Onboarding Strategy v2

> Direction : **simple, guidé, utile, non agressif**  
> Objectif : amener un nouvel utilisateur à son premier moment de valeur le plus rapidement possible, sans le noyer dans les fonctionnalités.

---

## 1. Pourquoi l’onboarding est critique

Synkro s’adresse à un marché où beaucoup d’utilisateurs n’ont jamais utilisé de logiciel de gestion moderne.

Le problème n’est donc pas seulement :

> “comment créer un compte ?”

Le vrai problème est :

> “comment faire comprendre que Synkro peut devenir utile dans la gestion quotidienne du business ?”

L’onboarding doit réduire la peur, la confusion et la charge mentale.

Il doit aider l’utilisateur à ressentir rapidement :

> “D’accord, je vois à quoi ça sert.”

---

## 2. Objectif principal

L’objectif de l’onboarding v2 est :

> amener l’utilisateur à enregistrer une première donnée utile.

La première donnée utile peut être :

- une vente ;
- un produit ;
- une dépense ;
- un patient ;
- une consultation ;
- un client avec dette.

Mais pour le module commerce, le moment magique prioritaire est :

```txt
Première vente enregistrée.
```

---

## 3. Moment magique

Le moment magique de Synkro doit être :

> l’utilisateur enregistre une vente et voit immédiatement son activité se structurer.

Exemple :

```txt
Vente enregistrée.
Total : 1 500 G

Votre journée commence à se suivre automatiquement.
```

À ce moment-là, l’utilisateur comprend que Synkro n’est pas juste une app à remplir.

Synkro devient une mémoire de son business.

---

## 4. Principes d’onboarding

### 4.1 Faire agir avant d’expliquer

Ne pas commencer par de longs textes.

L’utilisateur doit rapidement faire une action concrète.

Mauvais :

```txt
Bienvenue dans Synkro, voici toutes les fonctionnalités disponibles...
```

Bon :

```txt
Commençons par préparer votre espace de travail.
```

---

### 4.2 Demander seulement l’essentiel

Au premier démarrage, ne pas demander trop d’informations.

Essentiel :

- nom de l’entreprise ;
- secteur ;
- devise principale ;
- éventuellement premier produit ou service.

Non essentiel au départ :

- logo ;
- adresse complète ;
- paramètres avancés ;
- fiscalité ;
- permissions ;
- abonnement ;
- documents personnalisés.

Ces éléments peuvent être demandés plus tard.

---

### 4.3 Toujours expliquer le pourquoi

Chaque étape doit dire pourquoi elle existe.

Exemple :

```txt
Choisissez votre devise principale.
Elle sera utilisée pour afficher vos ventes, dépenses et rapports.
```

---

### 4.4 Ne jamais bloquer inutilement

L’utilisateur doit pouvoir sauter certaines étapes.

Mais les étapes sautées doivent être retrouvables plus tard.

Exemple :

```txt
Ignorer pour l’instant
```

---

### 4.5 Garder un ton calme

Le ton doit être :

- simple ;
- professionnel ;
- rassurant ;
- non infantilisant ;
- non agressif.

Éviter :

```txt
Boostez votre business maintenant !
```

Préférer :

```txt
Configurez votre espace pour commencer à suivre votre activité.
```

---

## 5. Utilisateurs à prendre en compte

### 5.1 Propriétaire de petite boutique

Objectif :

- configurer entreprise ;
- ajouter produit ou service ;
- enregistrer vente.

### 5.2 Pharmacie

Objectif :

- configurer commerce ;
- ajouter produits ;
- suivre stock ;
- voir stock bas.

### 5.3 Cabinet médical

Objectif :

- configurer santé ;
- ajouter patient ;
- enregistrer consultation ;
- suivre paiement.

### 5.4 Employé en caisse

Objectif :

- comprendre quoi faire ;
- créer une vente ;
- éviter accès inutile aux paramètres.

### 5.5 Patron qui invite un employé

Objectif :

- créer espace ;
- inviter utilisateur ;
- donner permissions ;
- contrôler activité.

---

## 6. Structure recommandée de l’onboarding

### Étape 1 — Bienvenue

Objectif :

- rassurer ;
- expliquer brièvement Synkro ;
- lancer l’action.

Texte recommandé :

```txt
Bienvenue sur Synkro

Configurez votre espace en quelques étapes pour commencer à suivre vos ventes, dépenses et clients.
```

Action :

```txt
Commencer
```

Option :

```txt
J’ai déjà un espace
```

---

### Étape 2 — Entreprise

Objectif :

- créer le contexte métier.

Champs :

```txt
Nom de l’entreprise
Téléphone optionnel
```

Texte :

```txt
Ces informations pourront apparaître plus tard sur vos factures, reçus et documents.
```

Action :

```txt
Continuer
```

---

### Étape 3 — Secteur

Objectif :

- adapter les modules visibles.

Options :

```txt
Commerce
Santé
Autre
```

Description :

```txt
Commerce
Ventes, produits, stock et clients.

Santé
Patients, consultations, rendez-vous et paiements.

Autre
Gestion simple des ventes, dépenses et rapports.
```

Règle :

> Le secteur choisi doit adapter l’interface dès le départ.

Le dashboard affiché après onboarding doit suivre `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

### Étape 4 — Devise

Objectif :

- éviter confusion financière.

Options prioritaires :

```txt
HTG
USD
EUR
DOP
MXN
```

Texte :

```txt
Choisissez la devise utilisée le plus souvent dans votre entreprise.
Vous pourrez la modifier plus tard.
```

Valeur par défaut pour Haïti :

```txt
HTG
```

---

### Étape 5 — Premier élément utile

Cette étape dépend du secteur.

#### Commerce

Option A :

```txt
Ajouter un premier produit
```

Champs minimum :

```txt
Nom du produit
Prix de vente
Stock initial optionnel
```

Option B :

```txt
Je vends surtout des services
```

#### Santé

```txt
Ajouter un premier patient
```

Champs minimum :

```txt
Nom
Téléphone optionnel
```

#### Autre

```txt
Ajouter un premier service ou passer à la première vente
```

Règle :

> Ne pas forcer la configuration complète du catalogue.

---

### Étape 6 — Première action

Objectif :

- générer le moment magique.

#### Commerce / Autre

```txt
Enregistrez votre première vente
```

Champs minimum :

```txt
Client optionnel
Montant
Statut paiement
Méthode de paiement optionnelle
```

#### Santé

```txt
Enregistrez une première consultation
```

Champs minimum :

```txt
Patient
Montant
Statut paiement
```

---

### Étape 7 — Succès

Après la première action, afficher une confirmation forte.

Exemple commerce :

```txt
Votre première vente est enregistrée.

Synkro commence maintenant à suivre votre activité.
```

Actions :

```txt
Voir mon tableau de bord
Créer une autre vente
```

Option future :

```txt
Générer un reçu
```

---

## 7. Onboarding progressif

L’onboarding ne doit pas tout faire en une seule fois.

Après la première action, Synkro peut proposer progressivement :

- ajouter logo ;
- compléter adresse ;
- inviter un employé ;
- créer catégories ;
- activer PDF ;
- configurer WhatsApp ;
- ajouter stock ;
- personnaliser documents.

---

## 8. Checklist d’activation

Créer une petite checklist visible mais discrète.

Exemple :

```txt
Votre espace Synkro

✓ Entreprise créée
✓ Devise choisie
□ Ajouter un produit
□ Enregistrer une vente
□ Générer un reçu
□ Inviter un employé
```

Règle :

- ne pas afficher comme une obligation ;
- ne pas bloquer l’utilisateur ;
- montrer la progression ;
- donner une sensation d’avancement.

---

## 9. Empty states comme onboarding continu

Les états vides doivent aider l’utilisateur après l’onboarding.

Exemple page ventes :

```txt
Aucune vente enregistrée.

Ajoutez votre première vente pour commencer à suivre vos revenus.
[ Nouvelle vente ]
```

Exemple page stock :

```txt
Aucun produit pour le moment.

Ajoutez vos produits pour suivre votre stock et recevoir des alertes.
[ Ajouter un produit ]
```

Exemple page clients :

```txt
Aucun client pour le moment.

Les clients apparaîtront ici quand vous enregistrerez des ventes.
[ Nouvelle vente ]
```

---

## 10. Onboarding mobile

L’onboarding mobile doit être encore plus court.

### Règles

- une question par écran ;
- gros boutons ;
- peu de texte ;
- aucune table ;
- progression visible ;
- bouton retour ;
- possibilité de quitter.

Structure mobile :

```txt
Bienvenue
Entreprise
Secteur
Devise
Première vente
Succès
```

---

## 11. Onboarding desktop

Sur desktop, il est possible d’afficher un peu plus de contexte.

Mais éviter de transformer l’onboarding en formulaire administratif.

Structure desktop possible :

```txt
Carte centrale
Progression à gauche ou en haut
Aide courte à droite
```

---

## 12. Messages recommandés

### Bienvenue

```txt
Bienvenue sur Synkro.
Préparons votre espace pour suivre votre activité plus simplement.
```

### Secteur

```txt
Votre secteur nous aide à afficher les bons outils dès le départ.
```

### Devise

```txt
Cette devise sera utilisée pour vos ventes, dépenses et rapports.
```

### Premier produit

```txt
Ajoutez un produit que vous vendez souvent.
Vous pourrez compléter votre catalogue plus tard.
```

### Première vente

```txt
Enregistrez une première vente pour voir comment Synkro organise votre activité.
```

### Succès

```txt
C’est fait. Votre activité commence à prendre forme.
```

---

## 13. Ce qu’il ne faut pas faire

Éviter :

- demander trop d’informations au départ ;
- forcer le logo ;
- forcer l’adresse complète ;
- parler d’abonnement trop tôt ;
- afficher toutes les fonctionnalités ;
- montrer un dashboard vide sans accompagnement ;
- utiliser un ton marketing agressif ;
- créer un onboarding de plus de 5-7 minutes ;
- bloquer l’accès si une étape non critique n’est pas remplie.

---

## 14. Onboarding et abonnements

Ne pas mettre la monétisation trop tôt dans le premier onboarding.

Le trial long fait partie de la stratégie.

L’objectif au début est :

> créer de l’usage et de l’habitude.

L’abonnement devient pertinent quand l’utilisateur :

- a enregistré des ventes ;
- a des clients ;
- a généré des documents ;
- a invité des employés ;
- a accumulé de l’historique.

---

## 15. Onboarding et PDF

Les documents PDF sont un levier émotionnel très fort.

Mais il n’est pas obligatoire de les montrer dès le premier écran.

Moment recommandé :

Après une première vente ou un premier paiement :

```txt
Vous pouvez maintenant générer un reçu propre pour votre client.
```

Actions :

```txt
Générer reçu
Envoyer par WhatsApp
Plus tard
```

---

## 16. Onboarding et WhatsApp

WhatsApp doit apparaître naturellement après une action utile.

Exemple :

```txt
Paiement ajouté.
Voulez-vous envoyer le reçu au client par WhatsApp ?
```

Actions :

```txt
Envoyer par WhatsApp
Pas maintenant
```

Règle :

> WhatsApp ne doit pas être une fonctionnalité décorative. Il doit apparaître au moment où il aide vraiment.

---

## 17. Onboarding et multi-utilisateurs

La gestion employés doit être proposée après que le propriétaire comprend la valeur.

Moment recommandé :

Après quelques ventes ou lors de la configuration avancée :

```txt
Vous travaillez avec un employé ?
Invitez-le pour enregistrer les ventes sans lui donner accès à tout.
```

Actions :

```txt
Inviter un employé
Plus tard
```

---

## 18. Onboarding sectoriel

### 18.1 Commerce

Activation idéale :

```txt
Entreprise créée
Devise choisie
Premier produit ajouté
Première vente enregistrée
```

Moment magique :

```txt
Voir la vente apparaître dans le résumé du jour.
```

### 18.2 Santé

Activation idéale :

```txt
Entreprise créée
Devise choisie
Premier patient ajouté
Première consultation enregistrée
```

Moment magique :

```txt
Voir l’historique patient et le paiement de consultation.
```

### 18.3 Autre

Activation idéale :

```txt
Entreprise créée
Devise choisie
Première vente ou dépense enregistrée
```

Moment magique :

```txt
Voir le solde activité apparaître.
```

---

## 19. Données de démonstration

Question stratégique :

Faut-il utiliser des données de démo ?

### Avantages

- évite dashboard vide ;
- montre la valeur immédiatement ;
- aide l’utilisateur à comprendre les pages.

### Risques

- confusion entre données réelles et données démo ;
- impression de fausse activité ;
- problème de confiance si mal indiqué.

### Recommandation

Utiliser plutôt :

```txt
Exemples guidés temporaires
```

Pas de fausses données persistantes par défaut.

Si des exemples sont affichés, ils doivent être clairement marqués :

```txt
Exemple
```

Et disparaître après la première vraie donnée.

---

## 20. Activation metrics

Mesurer l’onboarding avec PostHog.

Événements recommandés :

```txt
onboarding_started
onboarding_company_created
onboarding_sector_selected
onboarding_currency_selected
onboarding_first_product_created
onboarding_first_sale_created
onboarding_first_patient_created
onboarding_first_consultation_created
onboarding_completed
onboarding_skipped
```

Mesures importantes :

- temps jusqu’à première vente ;
- taux de complétion onboarding ;
- étape où les utilisateurs abandonnent ;
- premier module utilisé ;
- usage mobile vs desktop ;
- premier document généré ;
- premier paiement partiel ajouté.

---

## 21. Emails ou messages après onboarding

Après inscription, éviter les emails génériques.

Préférer des messages orientés usage.

Exemples :

```txt
Votre espace Synkro est prêt.
Ajoutez votre première vente pour commencer à suivre votre activité.
```

Après première vente :

```txt
Votre première vente est enregistrée.
La prochaine étape : générer un reçu professionnel pour votre client.
```

---

## 22. Onboarding checklist après connexion

Après l’onboarding initial, afficher une checklist discrète sur le dashboard jusqu’à activation.

La checklist doit rester cohérente avec le dashboard sectoriel décrit dans `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

Exemple :

```txt
Terminez la configuration de votre espace

✓ Devise choisie
□ Ajouter un produit
□ Enregistrer une vente
□ Générer un reçu
□ Inviter un employé
```

Règles :

- possibilité de masquer ;
- ne pas prendre trop d’espace ;
- disparaît après activation ;
- revient dans paramètres si besoin.

---

## 23. Activation selon type d’utilisateur

### Propriétaire

Activé quand :

```txt
entreprise créée
première vente enregistrée
dashboard consulté
```

### Employé caisse

Activé quand :

```txt
invitation acceptée
première vente enregistrée
```

### Cabinet médical

Activé quand :

```txt
premier patient créé
première consultation enregistrée
```

### Commerce avec stock

Activé quand :

```txt
premier produit ajouté
première vente avec produit enregistrée
stock mis à jour automatiquement
```

---

## 24. Erreurs pendant onboarding

Les erreurs doivent être simples.

Mauvais :

```txt
Server action failed.
```

Bon :

```txt
Impossible de continuer pour le moment.
Vérifiez votre connexion puis réessayez.
```

Mauvais :

```txt
Invalid sector.
```

Bon :

```txt
Veuillez choisir un secteur d’activité.
```

---

## 25. États de chargement onboarding

Pendant une étape :

```txt
Préparation de votre espace…
```

Après validation :

```txt
Enregistrement…
```

Si lent :

```txt
Cela prend quelques secondes. Merci de patienter.
```

---

## 26. Priorité d’implémentation

### Phase 1 — Minimum onboarding

- écran bienvenue ;
- choix entreprise ;
- choix secteur ;
- choix devise ;
- redirection dashboard ;
- checklist d’activation.

### Phase 2 — Activation commerce

- premier produit ;
- première vente guidée ;
- succès après vente.

### Phase 3 — Activation santé

- premier patient ;
- première consultation guidée ;
- succès après consultation.

### Phase 4 — Progressive onboarding

- PDF ;
- WhatsApp ;
- logo entreprise ;
- employés ;
- permissions ;
- documents.

---

## 27. Critères de réussite

L’onboarding v2 est réussi si :

- l’utilisateur comprend Synkro sans formation ;
- l’utilisateur termine la configuration sans stress ;
- la première vente est créée rapidement ;
- le dashboard n’est plus vide et froid ;
- les utilisateurs découvrent les fonctionnalités progressivement ;
- l’app ne donne pas l’impression d’être compliquée ;
- l’utilisateur revient après la première session.

---

## 28. Phrase directrice

> L’onboarding Synkro ne doit pas expliquer le produit.  
> Il doit faire ressentir sa valeur.
