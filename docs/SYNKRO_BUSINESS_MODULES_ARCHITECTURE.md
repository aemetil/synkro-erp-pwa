# Synkro Business Modules Architecture

> Objectif : clarifier la structure métier de Synkro v2 pour éviter les confusions entre ventes, paiements, dépenses, achats de stock, fournisseurs, clients, finance, commerce et santé.  
> Principe : Synkro doit rester simple pour l’utilisateur, mais plus juste dans sa logique métier.

---

## 1. Pourquoi ce document existe

Synkro est né comme un MVP fonctionnel.

La première version permet déjà de gérer :

- ventes ;
- dépenses ;
- clients ;
- rapports ;
- produits ;
- stock ;
- patients ;
- consultations ;
- rendez-vous ;
- paramètres.

Cette base est bonne.

Mais la refonte v2 doit corriger un point important :

> Un achat de marchandises destinées à être revendues ne doit pas être traité comme une simple dépense opérationnelle.

Ce point est fondamental pour une application de gestion de commerce.

Si Synkro mélange tout dans “Dépenses”, l’application peut donner une lecture fausse de l’activité.

---

## 2. Principe central

Synkro doit distinguer clairement :

```txt
Ventes
Paiements entrants
Dépenses opérationnelles
Achats de stock
Stock disponible
Coût des marchandises vendues
Créances clients
Dettes fournisseurs
```

L’utilisateur n’a pas besoin de voir un logiciel comptable compliqué.

Mais Synkro doit organiser les données de manière suffisamment juste pour aider le business à prendre de meilleures décisions.

---

## 3. La distinction la plus importante

## Dépense opérationnelle ≠ Achat de marchandises

### 3.1 Dépenses opérationnelles

Une dépense opérationnelle est un coût nécessaire au fonctionnement de l’entreprise, mais qui ne crée pas directement du stock destiné à être vendu.

Exemples :

```txt
Loyer
Salaire
Transport
Internet
Électricité
Marketing
Réparation
Frais bancaires
Frais MonCash
Achat de fournitures internes
Nettoyage
Entretien
```

Ces éléments appartiennent au module :

```txt
Finance → Dépenses
```

---

### 3.2 Achats de marchandises

Un achat de marchandises est un achat destiné à être revendu ou utilisé dans le cycle commercial.

Exemples :

```txt
Achat de boissons pour une boutique
Achat de médicaments pour une pharmacie
Achat de produits alimentaires
Achat de produits cosmétiques
Achat de pièces détachées
Achat de marchandises chez un fournisseur
Réception de stock fournisseur
```

Ces éléments appartiennent au module :

```txt
Commerce → Achats
```

ou :

```txt
Commerce → Réception stock
```

---

## 4. Pourquoi cette distinction est critique

Exemple :

```txt
Une boutique achète 100 000 G de marchandises.
Elle vend 80 000 G pendant le mois.
```

Si Synkro enregistre l’achat comme une simple dépense :

```txt
Ventes : 80 000 G
Dépenses : 100 000 G
Résultat affiché : -20 000 G
```

Mais cette lecture peut être trompeuse.

Pourquoi ?

Parce que l’entreprise possède encore peut-être une grande partie de ce stock.

L’argent n’a pas simplement été “consommé”.
Il a été transformé en marchandise.

Une lecture plus juste doit distinguer :

```txt
Cash sorti
Stock disponible
Produits vendus
Coût des produits vendus
Marge brute
Dépenses opérationnelles
```

---

## 5. Objectif de Synkro

Synkro ne doit pas devenir immédiatement un logiciel comptable complexe.

Mais Synkro doit éviter les confusions dangereuses.

L’objectif est :

```txt
Simple pour l’utilisateur
Plus juste dans les calculs
Adapté à la réalité terrain
```

Synkro doit aider un marchand à comprendre :

```txt
Combien j’ai vendu ?
Combien j’ai réellement encaissé ?
Qui me doit encore de l’argent ?
Combien j’ai dépensé pour fonctionner ?
Combien j’ai acheté en marchandises ?
Quelle valeur de stock me reste-t-il ?
Quels fournisseurs dois-je encore payer ?
Quels produits se vendent le mieux ?
Quels produits sont presque terminés ?
```

---

## 6. Architecture métier globale

Synkro v2 doit être pensé comme plusieurs couches.

```txt
Synkro Core
Finance Core
Commerce Module
Santé Module
Documents
Permissions
Rapports
```

---

# 7. Synkro Core

Synkro Core contient les éléments communs à tous les secteurs.

```txt
Entreprise
Utilisateurs
Devise
Permissions
Abonnement
Paramètres
Documents
Préférences
```

## 7.1 Entreprise

Contient :

```txt
nom
secteur
devise principale
devise secondaire
logo
adresse
téléphone
email
abonnement
préférences
```

## 7.2 Utilisateurs

Permettra de gérer :

```txt
propriétaire
admin
employé caisse
gestionnaire stock
comptable
lecteur
```

## 7.3 Devise

Synkro doit supporter les devises déjà prévues :

```txt
HTG
USD
EUR
DOP
MXN
```

Mais la devise ne doit pas masquer les réalités métier :

```txt
vente émise
paiement reçu
dépense opérationnelle
achat stock
dette fournisseur
```

## 7.4 Documents

Les documents ne doivent pas être un gros module visible partout au début.

Ils doivent vivre dans les contextes où ils sont utiles :

```txt
Vente → reçu / facture
Paiement → reçu de paiement
Consultation → reçu / document médical
Rapport → export PDF
Achat → bon de réception
Stock → inventaire
```

---

# 8. Finance Core

Finance Core est transversal.

Il ne doit pas tout mélanger.

## 8.1 Finance doit suivre

```txt
Encaissements reçus
Ventes émises
Dépenses opérationnelles
Achats de stock
Créances clients
Dettes fournisseurs
Bénéfice estimé
Cash movement
Rapports
```

---

## 8.2 Ventes émises

Une vente émise représente ce que l’entreprise a facturé ou vendu.

Mais une vente émise n’est pas forcément de l’argent reçu.

Exemple :

```txt
Vente : 2 000 G
Client paie aujourd’hui : 1 000 G
Reste à payer : 1 000 G
```

La vente existe, mais le cash reçu est seulement :

```txt
1 000 G
```

---

## 8.3 Encaissements reçus

Les encaissements représentent l’argent réellement reçu.

Exemples :

```txt
paiement cash client
paiement MonCash
paiement carte
paiement virement
```

C’est une donnée essentielle pour comprendre la trésorerie réelle.

---

## 8.4 Créances clients

Une créance client représente l’argent qu’un client doit encore à l’entreprise.

Synkro doit utiliser un langage simple :

```txt
Reste à payer
Paiement en attente
Solde dû
```

Éviter les termes agressifs dans l’interface :

```txt
mauvais payeur
client endetté
débiteur
```

---

## 8.5 Dépenses opérationnelles

Les dépenses opérationnelles sont les coûts du fonctionnement.

Exemples :

```txt
loyer
salaires
transport
internet
électricité
marketing
réparations
frais bancaires
```

Elles doivent rester dans :

```txt
Finance → Dépenses
```

---

## 8.6 Achats de stock

Les achats de stock sont des sorties de cash ou des dettes fournisseurs liées aux marchandises.

Ils doivent être visibles dans Finance, mais ne doivent pas être mélangés silencieusement avec les dépenses opérationnelles.

Finance peut afficher :

```txt
Dépenses opérationnelles
Achats de stock
Total sorties de cash
Dettes fournisseurs
```

---

## 8.7 Dettes fournisseurs

Une dette fournisseur représente l’argent que l’entreprise doit à un fournisseur.

Exemple :

```txt
Achat fournisseur : 50 000 G
Payé aujourd’hui : 20 000 G
Reste à payer fournisseur : 30 000 G
```

Synkro doit distinguer :

```txt
Clients qui doivent payer l’entreprise
Entreprise qui doit payer un fournisseur
```

---

## 8.8 Bénéfice estimé

Le bénéfice ne doit pas être calculé naïvement comme :

```txt
ventes - toutes les dépenses
```

Pour un commerce avec stock, il faut progressivement aller vers :

```txt
Ventes
- Coût des marchandises vendues
= Marge brute

Marge brute
- Dépenses opérationnelles
= Bénéfice estimé
```

Pour v2, Synkro peut commencer simple, mais doit préparer cette logique.

---

# 9. Commerce Module

Le module Commerce est destiné aux boutiques, pharmacies, commerces de détail, grossistes légers et entreprises qui vendent des produits ou services.

## 9.1 Structure recommandée

```txt
Commerce
  Vue d’ensemble
  Produits
  Stock
  Achats
  Fournisseurs
  Catégories
```

Dans la sidebar principale, il n’est pas nécessaire d’afficher tous ces éléments.

La sidebar peut simplement afficher :

```txt
Commerce
```

Puis la page Commerce contient les sous-sections.

---

## 9.2 Produits

Le module Produits permet de gérer le catalogue.

Champs principaux :

```txt
nom
code produit
SKU
code-barres
catégorie
prix d’achat
prix de vente
unité
stock actuel
seuil d’alerte
statut actif/inactif
```

## 9.3 Stock

Le stock suit les quantités disponibles.

Il doit répondre à :

```txt
Combien reste-t-il ?
Quels produits sont bas ?
Quels produits sont en rupture ?
Pourquoi le stock a changé ?
```

Chaque changement de stock doit idéalement créer un mouvement.

Types de mouvements :

```txt
IN
OUT
ADJUSTMENT
RETURN
CANCELLED
```

Sources possibles :

```txt
SALE
PURCHASE
MANUAL_ADJUSTMENT
RETURN
CANCELLED_SALE
```

---

## 9.4 Achats

Le module Achats enregistre les marchandises achetées auprès des fournisseurs.

Un achat doit capturer :

```txt
fournisseur
date
produits reçus
quantités
coût unitaire
coût total
statut paiement fournisseur
notes
```

Résultat d’un achat :

```txt
stock augmenté
achat enregistré
historique fournisseur mis à jour
dette fournisseur créée si non payé
paiement fournisseur enregistré si payé
mouvement stock IN créé
bon de réception disponible
```

---

## 9.5 Fournisseurs

Le module Fournisseurs permet de suivre les personnes ou entreprises auprès desquelles l’entreprise achète ses marchandises.

Champs possibles :

```txt
nom
téléphone
adresse
email
notes
historique achats
montant dû
dernière livraison
```

Fournisseurs ne doit pas forcément être un module principal dans la sidebar.

Il peut vivre dans :

```txt
Commerce → Fournisseurs
```

---

## 9.6 Catégories

Les catégories aident à organiser les produits.

Exemples :

```txt
Boissons
Alimentation
Médicaments
Cosmétiques
Services
Accessoires
```

Les catégories ne doivent pas devenir trop importantes dans la navigation principale.

---

# 10. Santé Module

Le module Santé est destiné aux cabinets médicaux et professionnels de santé.

## 10.1 Structure recommandée

```txt
Santé
  Patients
  Consultations
  Rendez-vous
  Paiements
  Documents médicaux
```

Dans la sidebar, les éléments principaux peuvent être :

```txt
Patients
Consultations
Rendez-vous
Finance
Rapports
Paramètres
```

---

## 10.2 Patients

Le patient est une entité médicale, pas seulement un client.

Synkro doit éviter de traiter l’expérience Santé comme une simple vente commerciale.

Champs patients :

```txt
nom
téléphone
date de naissance
sexe
adresse
contact d’urgence
assurance
allergies
maladies chroniques
notes médicales
```

---

## 10.3 Consultations

Une consultation représente un acte médical.

Elle peut avoir :

```txt
motif
symptômes
diagnostic
traitement
signes vitaux
honoraires
statut paiement
notes médecin
```

---

## 10.4 Rendez-vous

Les rendez-vous doivent aider le cabinet à organiser la journée.

Statuts possibles :

```txt
Planifié
Confirmé
En cours
Terminé
Annulé
Absent
```

---

## 10.5 Paiements santé

Les paiements partiels doivent aussi s’appliquer aux consultations.

Exemple :

```txt
Consultation : 2 500 G
Payé : 1 500 G
Reste à payer : 1 000 G
Statut : Partiel
```

Le système Payment doit donc pouvoir être lié à :

```txt
Vente
Consultation
Achat fournisseur
```

ou être spécialisé selon le type de paiement.

---

## 10.6 Documents médicaux

Documents possibles :

```txt
reçu consultation
ordonnance
certificat médical
compte-rendu
convocation rendez-vous
dossier patient
```

Attention :

Les documents médicaux contiennent des données sensibles.

Le partage WhatsApp doit être plus prudent que pour les reçus commerciaux.

---

# 11. Paiements

Les paiements sont transversaux.

Synkro doit distinguer :

```txt
Paiements entrants
Paiements sortants
```

---

## 11.1 Paiements entrants

Argent reçu par l’entreprise.

Sources :

```txt
vente
consultation
paiement client
```

Exemples :

```txt
cash
MonCash
carte
virement
chèque
autre
```

---

## 11.2 Paiements sortants

Argent payé par l’entreprise.

Sources :

```txt
achat fournisseur
dépense opérationnelle
paiement dette fournisseur
```

---

## 11.3 Statuts de paiement

Statuts recommandés :

```txt
UNPAID
PARTIAL
PAID
OVERDUE
CANCELLED
```

Labels UI :

```txt
Impayé
Partiel
Payé
En retard
Annulé
```

---

## 11.4 Paiements partiels

Les paiements partiels doivent être disponibles pour :

```txt
ventes
consultations
achats fournisseurs
```

Mais l’UI doit rester simple.

Vente :

```txt
Client doit payer l’entreprise
```

Achat :

```txt
Entreprise doit payer fournisseur
```

Cette différence doit être claire.

---

# 12. Clients

Les clients sont principalement liés aux ventes.

Synkro doit aider à répondre :

```txt
Qui a acheté ?
Qui doit encore payer ?
Quel est l’historique de ce client ?
Combien ce client a déjà payé ?
```

## 12.1 Page Clients

La page Clients doit mettre en avant :

```txt
nom client
nombre de ventes
total acheté
total payé
reste à payer
dernière vente
dernier paiement
```

## 12.2 Filtres recommandés

```txt
Tous
Avec paiement en attente
Payés
Récents
```

---

# 13. Fournisseurs

Les fournisseurs sont liés aux achats.

Synkro doit aider à répondre :

```txt
Chez qui j’achète ?
Combien ai-je acheté chez ce fournisseur ?
Combien dois-je encore payer ?
Quand était la dernière livraison ?
Quels produits viennent de ce fournisseur ?
```

## 13.1 Page Fournisseurs

Champs principaux :

```txt
nom
téléphone
adresse
notes
total achats
total payé
reste à payer
dernière livraison
```

## 13.2 Filtres recommandés

```txt
Tous
Avec paiement en attente
Récents
```

---

# 14. Dashboard sectoriel

Le dashboard ne doit pas être identique pour tous les secteurs.

Il doit s’adapter au type d’entreprise.

Référence détaillée pour les layouts, métriques, actions rapides et tests : `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

## 14.1 Dashboard Commerce

Priorités :

```txt
Ventes aujourd’hui
Encaissements reçus
Clients à payer
Stock bas
Ruptures
Achats récents
Dettes fournisseurs
Produits les plus vendus
```

Structure mobile recommandée :

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
Dettes fournisseurs

Activité récente
```

Actions rapides :

```txt
Nouvelle vente
Nouveau produit
Créer un achat
Ajouter un paiement
```

---

## 14.2 Dashboard Santé

Priorités :

```txt
Rendez-vous du jour
Consultations récentes
Patients récents
Paiements en attente
Recettes du mois
Documents récents
```

Structure mobile recommandée :

```txt
Bonjour, [Nom]

[ Nouvelle consultation ]

Aujourd’hui
Rendez-vous
Consultations
Paiements reçus

À suivre
Patients à rappeler
Paiements en attente
Rendez-vous à confirmer

Activité récente
```

Actions rapides :

```txt
Nouveau patient
Nouvelle consultation
Nouveau rendez-vous
Ajouter un paiement
```

---

## 14.3 Dashboard Autre

Priorités :

```txt
Ventes
Dépenses opérationnelles
Encaissements
Clients à payer
Activité récente
Rapports simples
```

Actions rapides :

```txt
Nouvelle vente
Nouvelle dépense
Ajouter un paiement
```

---

# 15. Navigation recommandée

## 15.1 Commerce

Sidebar principale :

```txt
Tableau de bord
Ventes
Commerce
Clients
Finance
Rapports
Paramètres
```

Dans Commerce :

```txt
Vue d’ensemble
Produits
Stock
Achats
Fournisseurs
Catégories
```

---

## 15.2 Santé

Sidebar principale :

```txt
Tableau de bord
Patients
Consultations
Rendez-vous
Finance
Rapports
Paramètres
```

---

## 15.3 Autre

Sidebar principale :

```txt
Tableau de bord
Ventes
Clients
Finance
Rapports
Paramètres
```

---

## 15.4 Concepts à ne pas sur-exposer

Ne pas forcément mettre dans la sidebar principale :

```txt
Documents
Paiements
Utilisateurs
Fournisseurs
Catégories
```

Ces concepts peuvent vivre dans leur contexte :

```txt
Documents → ventes, consultations, rapports
Paiements → ventes, clients, consultations, achats
Utilisateurs → paramètres
Fournisseurs → commerce
Catégories → commerce
```

---

# 16. Finance : structure recommandée

La page Finance doit progressivement séparer :

```txt
Encaissements
Dépenses opérationnelles
Achats de stock
Créances clients
Dettes fournisseurs
Résumé financier
```

## 16.1 Finance overview

Métriques recommandées :

```txt
Encaissements reçus
Ventes émises
Dépenses opérationnelles
Achats de stock
Reste à encaisser
Reste à payer fournisseurs
Bénéfice estimé
```

## 16.2 Pourquoi cette distinction compte

Une vente impayée augmente les ventes émises, mais pas les encaissements.

Un achat de stock augmente le stock, mais ne doit pas être traité exactement comme une dépense consommée.

Une dette fournisseur représente une obligation future.

---

# 17. Rapports : structure recommandée

Les rapports doivent expliquer l’activité, pas seulement afficher des chiffres.

## 17.1 Rapports Commerce

```txt
Ventes par période
Encaissements reçus
Créances clients
Achats de stock
Stock bas
Produits les plus vendus
Marge estimée
Dépenses opérationnelles
Bénéfice estimé
```

## 17.2 Rapports Santé

```txt
Consultations par période
Rendez-vous
Paiements reçus
Paiements en attente
Patients récents
Recettes
```

## 17.3 Rapports Autre

```txt
Ventes
Encaissements
Dépenses opérationnelles
Clients à payer
Bénéfice estimé
```

---

# 18. Nouveau flow : Achat

## 18.1 Objectif

Permettre à un commerce d’enregistrer correctement l’achat de marchandises.

## 18.2 Étapes

```txt
1. Choisir ou créer fournisseur
2. Ajouter produits reçus
3. Indiquer quantités
4. Indiquer prix d’achat
5. Définir paiement fournisseur
6. Vérifier résumé
7. Valider achat
```

## 18.3 Résultat système

Après validation :

```txt
Purchase créé
PurchaseItems créés
StockMovement IN créé pour chaque produit
Stock produit augmenté
Supplier mis à jour
SupplierPayment créé si paiement immédiat
Dette fournisseur créée si paiement partiel ou impayé
Finance mise à jour
```

---

## 18.4 Paiement fournisseur

Options :

```txt
Payé
Partiel
Impayé
```

Si partiel :

```txt
Total achat : 50 000 G
Payé : 20 000 G
Reste à payer fournisseur : 30 000 G
```

---

## 18.5 Reçu / bon de réception

Un achat peut générer :

```txt
Bon de réception
Reçu paiement fournisseur
Historique fournisseur
```

---

# 19. Nouveau guidage dans “Nouvelle dépense”

Synkro doit aider l’utilisateur à ne pas mélanger dépenses et achats de stock.

Si une catégorie ou description indique un achat de marchandises :

```txt
marchandises
stock
produits
fournisseur
réception
médicaments
inventaire
```

Synkro peut afficher :

```txt
Cette dépense semble être un achat de stock.

Pour suivre correctement vos produits, votre stock et vos marges, créez plutôt un achat fournisseur.
```

Actions :

```txt
Créer un achat
Continuer comme dépense
```

Règle :

```txt
Guider sans bloquer.
```

L’utilisateur doit pouvoir continuer comme dépense si nécessaire.

---

# 20. Modèles de données conceptuels

Ce document ne définit pas encore le schéma final Prisma, mais propose les concepts.

## 20.1 Supplier

```txt
id
entrepriseId
name
phone
email
address
notes
createdAt
updatedAt
```

## 20.2 Purchase

```txt
id
entrepriseId
supplierId
purchaseNumber
date
status
paymentStatus
totalAmount
paidAmount
remainingAmount
notes
createdById
createdAt
updatedAt
```

Statuts possibles :

```txt
DRAFT
RECEIVED
CANCELLED
```

## 20.3 PurchaseItem

```txt
id
purchaseId
productId
quantity
unitCost
totalCost
createdAt
updatedAt
```

## 20.4 SupplierPayment

Option simple :

```txt
id
purchaseId
supplierId
amount
method
note
recordedAt
recordedById
createdAt
updatedAt
```

Option plus avancée :

```txt
Payment
  direction: INCOMING | OUTGOING
  sourceType: SALE | CONSULTATION | PURCHASE | EXPENSE
```

Pour v2 initiale, la simplicité doit primer.

---

## 20.5 StockMovement

Champs importants :

```txt
id
entrepriseId
productId
type
quantity
previousStock
newStock
sourceType
sourceId
reason
createdById
createdAt
```

Exemples :

```txt
type: IN
sourceType: PURCHASE
sourceId: purchaseId
```

---

# 21. Pharmacies : préparation future

Les pharmacies peuvent utiliser le module Commerce, mais elles ont des besoins plus spécifiques.

À prévoir plus tard :

```txt
numéro de lot
date d’expiration
alerte expiration
fournisseur par lot
prix d’achat par lot
contrôle stock plus strict
```

Ne pas forcer ces champs dans v2 initiale pour tous les commerces.

Mais ne pas concevoir le modèle de manière à les rendre impossibles.

---

# 22. Ce qu’il ne faut pas faire maintenant

Ne pas transformer Synkro en logiciel comptable complet dès v2.

À repousser :

```txt
FIFO
coût moyen pondéré avancé
multi-entrepôts
bons de commande complexes
retours fournisseurs avancés
tax accounting complet
comptabilité générale complète
rapports fiscaux automatisés
```

Ces sujets peuvent venir plus tard.

---

# 23. Ce qu’il faut absolument faire

Priorités métier v2 :

```txt
1. Distinguer Dépenses opérationnelles et Achats de stock
2. Ajouter Achats dans Commerce
3. Ajouter Fournisseurs dans Commerce
4. Relier Achats au Stock
5. Relier Achats aux paiements fournisseurs
6. Faire évoluer Finance pour afficher les deux types de sorties
7. Adapter Dashboard selon secteur
8. Adapter Rapports selon secteur
9. Garder l’interface simple
```

---

# 24. Impact sur les documents existants

Ce document doit être référencé par :

```txt
SYNKRO_V2_REBUILD_PLAN.md
SYNKRO_REPO_MIGRATION_PLAN.md
SYNKRO_V2_IMPLEMENTATION_ROADMAP.md
SYNKRO_TRUST_SYSTEM.md
SYNKRO_PAYMENTS_PARTIALS_SPEC.md
SYNKRO_MOBILE_PWA_STRATEGY.md
SYNKRO_COPYWRITING_GUIDELINES.md
SYNKRO_UI_COMPONENTS_SPEC.md
DESIGN.md
```

Mais il n’est pas nécessaire de réécrire tous ces fichiers.

Il suffit d’ajouter des références ciblées et de corriger les passages où “achats de stock” est traité comme une simple dépense.

---

# 25. Risques produit

## 25.1 Risque : trop de complexité

Si Synkro expose trop de concepts, les petits commerçants seront perdus.

Réponse :

```txt
garder la sidebar simple
mettre Achats et Fournisseurs dans Commerce
guider avec des textes courts
éviter les termes comptables lourds
```

---

## 25.2 Risque : finance faussée

Si Synkro mélange achats de stock et dépenses opérationnelles, les rapports peuvent être trompeurs.

Réponse :

```txt
séparer les deux dans les données
séparer les deux dans Finance
expliquer avec des labels simples
```

---

## 25.3 Risque : casser les habitudes actuelles

Des utilisateurs ont déjà appris à utiliser “Dépenses”.

Réponse :

```txt
ne pas supprimer Dépenses
ajouter un guidage vers Achats
laisser “Continuer comme dépense”
communiquer doucement le changement
```

---

## 25.4 Risque : pharmacie limitée

Si Synkro ne prépare pas lots/expiration, les pharmacies sérieuses seront limitées.

Réponse :

```txt
préparer le modèle
ne pas exposer trop tôt
ajouter plus tard comme option pharmacie
```

---

# 26. Copywriting recommandé

## 26.1 Dépenses

```txt
Dépenses opérationnelles
Coûts de fonctionnement
Nouvelle dépense
Enregistrer la dépense
```

## 26.2 Achats

```txt
Achats
Achat fournisseur
Réception stock
Créer un achat
Produits reçus
Montant achat
Paiement fournisseur
Reste à payer fournisseur
```

## 26.3 Stock

```txt
Stock actuel
Stock bas
Rupture
Ajuster stock
Historique stock
Réception de stock
```

## 26.4 Clients

```txt
Reste à payer
Paiement en attente
Clients à payer
Solde dû
```

## 26.5 Fournisseurs

```txt
Fournisseurs
Reste à payer fournisseur
Achats récents
Dernière livraison
```

---

# 27. Exemple d’interface simple

## Page Finance

Au lieu de :

```txt
Dépenses : 100 000 G
```

Afficher :

```txt
Dépenses opérationnelles : 25 000 G
Achats de stock : 75 000 G
Sorties de cash : 100 000 G
```

---

## Dashboard Commerce

```txt
Aujourd’hui
Ventes : 18 500 G
Encaissements : 15 000 G
Sorties : 7 000 G

À suivre
3 clients doivent encore payer
2 produits en stock bas
1 fournisseur à payer
```

---

## Page Dépense

Si l’utilisateur saisit “achat marchandises” :

```txt
Cette dépense semble être un achat de stock.

Pour suivre correctement vos produits, votre stock et vos marges, créez plutôt un achat fournisseur.

[ Créer un achat ] [ Continuer comme dépense ]
```

---

# 28. Définition du succès

Cette architecture est réussie si :

```txt
un commerçant comprend où enregistrer un achat de marchandises
un achat augmente automatiquement le stock
une dépense opérationnelle reste simple
Finance ne mélange pas tout
les dettes fournisseurs sont visibles
les clients à payer sont visibles
le dashboard change selon le secteur
les rapports deviennent plus utiles
l’app reste simple malgré une logique plus juste
```

---

# 29. Phrase directrice

> Synkro doit rester simple en surface, mais juste dans sa logique métier.

La simplicité ne doit pas venir d’un mélange des concepts.
Elle doit venir d’une bonne organisation.

```

```
