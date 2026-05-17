Parfait. Étape 2 :

```txt
docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md
```

Ce document doit devenir la référence pour ne plus avoir un dashboard générique qui mélange tout. Il définit clairement le dashboard selon le secteur : **Commerce**, **Santé**, **Autre**.

````md
# Synkro Sector Dashboard Spec

> Objectif : définir les dashboards sectoriels de Synkro v2 afin que chaque utilisateur voie les informations les plus utiles selon son activité.  
> Principe : le dashboard ne doit pas être générique. Il doit aider l’utilisateur à comprendre sa journée, ses priorités et les actions à faire maintenant.

---

## 1. Pourquoi ce document existe

Le dashboard actuel de Synkro est encore trop générique.

Il affiche des informations utiles, mais il ne s’adapte pas assez au contexte métier.

Or Synkro est une plateforme multi-secteur.

Un commerce, une pharmacie, un cabinet médical et une activité de services n’ont pas les mêmes priorités au quotidien.

La v2 doit donc introduire un dashboard sectoriel.

Objectif :

```txt
montrer les bonnes informations
au bon utilisateur
au bon moment
selon son secteur
```

---

## 2. Principe central

> Le dashboard Synkro ne doit pas tout montrer.  
> Il doit montrer ce qui aide à agir.

Un bon dashboard doit répondre rapidement à ces questions :

```txt
Qu’est-ce qui s’est passé aujourd’hui ?
Qu’est-ce qui demande mon attention ?
Qui doit payer ?
Qu’est-ce qui manque en stock ?
Quelle est l’action principale à faire maintenant ?
```

Pour Santé :

```txt
Quels rendez-vous aujourd’hui ?
Quels patients ont été vus récemment ?
Quels paiements sont en attente ?
Quelle consultation dois-je enregistrer ?
```

---

## 3. Règle produit

Le dashboard doit changer selon :

```txt
Entreprise.sector
```

Secteurs actuels :

```txt
COMMERCE
SANTE
AUTRE
```

La logique ne doit pas être seulement visuelle.

Elle doit aussi adapter :

```txt
les métriques
les actions rapides
les alertes
les listes récentes
les liens
les empty states
le wording
```

---

## 4. Dashboard Commerce

## 4.1 Objectif

Le dashboard Commerce doit aider un marchand à piloter son activité quotidienne.

Il doit répondre à :

```txt
Combien ai-je vendu aujourd’hui ?
Combien ai-je réellement encaissé ?
Qui doit encore payer ?
Quels produits sont presque terminés ?
Quels achats ou fournisseurs demandent attention ?
Quels produits se vendent le mieux ?
```

---

## 4.2 Priorités d’information

Ordre recommandé :

```txt
1. Action principale
2. Résumé du jour
3. Paiements / clients à suivre
4. Stock à surveiller
5. Achats / fournisseurs
6. Activité récente
7. Produits les plus vendus
```

---

## 4.3 Action principale

Action principale desktop et mobile :

```txt
Nouvelle vente
```

Actions secondaires possibles :

```txt
Nouveau produit
Créer un achat
Ajouter une dépense
```

Sur mobile, l’action principale doit être immédiatement visible.

---

## 4.4 Métriques principales

### Aujourd’hui

```txt
Ventes aujourd’hui
Encaissements reçus
Sorties de cash
Solde du jour
```

Important :

```txt
Ventes aujourd’hui ≠ Encaissements reçus
```

Une vente impayée ne doit pas être présentée comme argent reçu.

---

### À suivre

```txt
Clients à payer
Montant à encaisser
Produits en stock bas
Produits en rupture
Fournisseurs à payer
Achats récents
```

---

## 4.5 Layout desktop recommandé

```txt
PageHeader
  Titre : Tableau de bord
  Description : Suivez l’activité de votre commerce.
  Action : Nouvelle vente

Grid principal
  Résumé aujourd’hui
    Ventes
    Encaissements
    Sorties
    Solde

  À suivre
    Clients à payer
    Stock bas
    Fournisseurs à payer

Section gauche
  Activité récente

Section droite
  Stock à surveiller
  Achats récents

Section basse
  Produits les plus vendus
```

---

## 4.6 Layout mobile recommandé

```txt
Bonjour, [Nom]

[ Nouvelle vente ]

Aujourd’hui
  Ventes
  Encaissements
  Sorties
  Solde

À suivre
  3 clients doivent encore payer
  2 produits en stock bas
  1 fournisseur à payer

Activité récente
  Liste simple

Stock à surveiller
  Liste produits bas
```

Le mobile doit éviter :

```txt
grille complexe
trop de cartes statistiques
tableaux
graphiques lourds
```

---

## 4.7 Cartes recommandées

### Ventes aujourd’hui

```txt
Label : Ventes aujourd’hui
Valeur : 18 500 G
Contexte : 12 ventes enregistrées
```

### Encaissements

```txt
Label : Encaissements
Valeur : 15 000 G
Contexte : argent réellement reçu
```

### Clients à payer

```txt
Label : Clients à payer
Valeur : 3
Contexte : 4 700 G à encaisser
```

### Stock bas

```txt
Label : Stock bas
Valeur : 2
Contexte : produits à réapprovisionner
```

---

## 4.8 Listes recommandées

### Clients à payer

```txt
Client
Montant restant
Dernière vente
Action : Voir
```

### Stock bas

```txt
Produit
Stock actuel
Seuil
Action : Réapprovisionner / Voir produit
```

### Achats récents

```txt
Fournisseur
Montant achat
Statut paiement
Date
```

### Activité récente

```txt
Vente enregistrée
Paiement ajouté
Produit mis à jour
Stock ajusté
Achat créé
```

---

## 4.9 Empty states Commerce

### Aucune vente

```txt
Aucune vente aujourd’hui.
Ajoutez une vente pour commencer à suivre l’activité de la journée.
[ Nouvelle vente ]
```

### Aucun produit

```txt
Aucun produit pour le moment.
Ajoutez vos produits pour suivre votre stock et vos ventes.
[ Nouveau produit ]
```

### Aucun stock bas

```txt
Aucun produit en stock bas.
Votre stock ne demande pas d’attention pour le moment.
```

### Aucun client à payer

```txt
Aucun paiement client en attente.
Les ventes impayées ou partielles apparaîtront ici.
```

---

## 4.10 Ce qu’il faut éviter

Ne pas afficher :

```txt
tous les rapports sur le dashboard
toutes les dépenses mélangées aux achats de stock
des graphiques complexes
des cartes multicolores
des informations santé
des modules inutiles au commerce
```

---

# 5. Dashboard Santé

## 5.1 Objectif

Le dashboard Santé doit aider un cabinet médical à suivre la journée de consultation.

Il doit répondre à :

```txt
Quels rendez-vous ai-je aujourd’hui ?
Quels patients ont été vus récemment ?
Quels paiements sont en attente ?
Quelles consultations sont récentes ?
Quelle action médicale dois-je faire maintenant ?
```

---

## 5.2 Priorités d’information

Ordre recommandé :

```txt
1. Rendez-vous du jour
2. Action principale
3. Consultations récentes
4. Paiements en attente
5. Patients récents
6. Recettes du mois
```

---

## 5.3 Action principale

Selon l’usage dominant :

```txt
Nouvelle consultation
```

Actions secondaires :

```txt
Nouveau patient
Nouveau rendez-vous
Ajouter un paiement
```

Si le cabinet utilise surtout le planning, l’action principale peut être :

```txt
Nouveau rendez-vous
```

Mais par défaut, recommander :

```txt
Nouvelle consultation
```

---

## 5.4 Métriques principales

```txt
Rendez-vous aujourd’hui
Consultations du jour
Paiements reçus
Paiements en attente
Patients récents
Recettes du mois
```

---

## 5.5 Layout desktop recommandé

```txt
PageHeader
  Titre : Tableau de bord
  Description : Suivez les rendez-vous, consultations et paiements.
  Action : Nouvelle consultation

Section principale
  Rendez-vous du jour
  Consultations récentes

Section latérale
  Paiements en attente
  Patients récents

Résumé
  Recettes du mois
  Consultations du mois
```

---

## 5.6 Layout mobile recommandé

```txt
Bonjour, [Nom]

[ Nouvelle consultation ]

Aujourd’hui
  Rendez-vous
  Consultations
  Paiements reçus

À suivre
  Rendez-vous à confirmer
  Paiements en attente

Rendez-vous du jour
  Liste simple

Consultations récentes
  Liste simple
```

---

## 5.7 Listes recommandées

### Rendez-vous du jour

```txt
Heure
Patient
Type
Statut
Action : Voir / Démarrer consultation
```

### Consultations récentes

```txt
Patient
Date
Motif
Statut paiement
Montant
```

### Paiements en attente

```txt
Patient
Consultation
Reste à payer
Action : Ajouter paiement
```

### Patients récents

```txt
Nom
Dernière consultation
Téléphone optionnel
```

---

## 5.8 Empty states Santé

### Aucun rendez-vous aujourd’hui

```txt
Aucun rendez-vous aujourd’hui.
Les rendez-vous planifiés apparaîtront ici.
[ Nouveau rendez-vous ]
```

### Aucune consultation récente

```txt
Aucune consultation récente.
Ajoutez une consultation pour commencer à suivre l’activité du cabinet.
[ Nouvelle consultation ]
```

### Aucun paiement en attente

```txt
Aucun paiement en attente.
Les consultations impayées ou partielles apparaîtront ici.
```

---

## 5.9 Ce qu’il faut éviter

Ne pas afficher :

```txt
stock commerce par défaut
produits les plus vendus
achats fournisseurs
terminologie client/vente si le contexte est médical
graphiques trop commerciaux
```

Le module Santé doit garder son vocabulaire :

```txt
patients
consultations
rendez-vous
paiements
documents médicaux
```

---

# 6. Dashboard Autre

## 6.1 Objectif

Le dashboard Autre sert aux entreprises qui n’entrent pas clairement dans Commerce ou Santé.

Il doit rester simple.

Il doit répondre à :

```txt
Combien ai-je vendu ?
Combien ai-je encaissé ?
Combien ai-je dépensé ?
Qui doit encore payer ?
Quelle activité récente dois-je voir ?
```

---

## 6.2 Priorités d’information

```txt
1. Nouvelle vente
2. Résumé du jour ou du mois
3. Encaissements
4. Dépenses opérationnelles
5. Clients à payer
6. Activité récente
```

---

## 6.3 Action principale

```txt
Nouvelle vente
```

Actions secondaires :

```txt
Nouvelle dépense
Ajouter un paiement
```

---

## 6.4 Métriques principales

```txt
Ventes
Encaissements
Dépenses opérationnelles
Solde estimé
Clients à payer
```

---

## 6.5 Layout desktop recommandé

```txt
PageHeader
  Titre : Tableau de bord
  Description : Suivez vos ventes, dépenses et paiements.
  Action : Nouvelle vente

Résumé
  Ventes
  Encaissements
  Dépenses
  Solde

À suivre
  Clients à payer
  Paiements en attente

Activité récente
```

---

## 6.6 Layout mobile recommandé

```txt
Bonjour, [Nom]

[ Nouvelle vente ]

Aujourd’hui
  Ventes
  Encaissements
  Dépenses
  Solde

À suivre
  Clients à payer

Activité récente
```

---

## 6.7 Empty states Autre

### Aucune activité

```txt
Aucune activité pour le moment.
Ajoutez une vente ou une dépense pour commencer à suivre votre activité.
[ Nouvelle vente ]
```

---

# 7. Données et calculs

## 7.1 Données communes

Tous les dashboards peuvent utiliser :

```txt
entreprise
secteur
devise
ventes
paiements
dépenses
clients
activité récente
```

---

## 7.2 Données Commerce

```txt
produits
stock
mouvements stock
achats
fournisseurs
clients à payer
produits les plus vendus
```

Si Achats/Fournisseurs ne sont pas encore implémentés, afficher uniquement les sections disponibles et prévoir les emplacements pour v2.

Ne pas afficher de fausses données.

---

## 7.3 Données Santé

```txt
patients
consultations
rendez-vous
paiements consultations
```

---

## 7.4 Données Autre

```txt
ventes
dépenses opérationnelles
clients
paiements
activité récente
```

---

## 7.5 Règles de calcul importantes

### Ventes vs Encaissements

```txt
Ventes = ventes émises
Encaissements = argent réellement reçu
```

Ne pas confondre les deux.

---

### Dépenses vs Achats

```txt
Dépenses opérationnelles = coûts de fonctionnement
Achats de stock = marchandises destinées à être revendues
```

Ne pas mélanger silencieusement.

---

### Clients à payer

Inclure :

```txt
ventes impayées
ventes partielles
consultations impayées
consultations partielles
```

selon le secteur.

---

### Fournisseurs à payer

Inclure :

```txt
achats fournisseurs impayés
achats fournisseurs partiels
```

quand le module Achats/Fournisseurs sera disponible.

---

# 8. Wording par secteur

## 8.1 Commerce

Utiliser :

```txt
Ventes
Clients
Produits
Stock
Achats
Fournisseurs
Encaissements
Clients à payer
Stock bas
Rupture
```

---

## 8.2 Santé

Utiliser :

```txt
Patients
Consultations
Rendez-vous
Paiements
Recettes
Paiements en attente
Documents médicaux
```

Éviter :

```txt
Produits les plus vendus
Clients à payer
Achat fournisseur
```

sauf si contexte spécifique.

---

## 8.3 Autre

Utiliser :

```txt
Ventes
Dépenses
Encaissements
Clients
Activité récente
Paiements en attente
```

---

# 9. Actions rapides

## 9.1 Commerce

```txt
Nouvelle vente
Nouveau produit
Créer un achat
Ajouter une dépense
```

## 9.2 Santé

```txt
Nouvelle consultation
Nouveau patient
Nouveau rendez-vous
Ajouter un paiement
```

## 9.3 Autre

```txt
Nouvelle vente
Nouvelle dépense
Ajouter un paiement
```

---

# 10. Composants recommandés

Le dashboard sectoriel doit utiliser les composants v2 :

```txt
PageContainer
PageHeader
MetricCard
Amount
StatusBadge
DataList
EmptyState
LoadingState
MobileActionBar
```

Composants domaine possibles :

```txt
DashboardTodaySummary
DashboardFollowUpList
CommerceStockAlertList
CommercePurchaseList
HealthAppointmentsToday
HealthRecentConsultations
CustomerPendingPayments
RecentActivityList
```

---

# 11. Architecture de composants recommandée

```txt
components/dashboard/
  dashboard-shell-content.tsx
  dashboard-today-summary.tsx
  dashboard-follow-up-list.tsx
  recent-activity-list.tsx

  commerce-dashboard.tsx
  commerce-stock-alert-list.tsx
  commerce-purchase-list.tsx
  commerce-top-products.tsx

  health-dashboard.tsx
  health-appointments-today.tsx
  health-recent-consultations.tsx
  health-pending-payments.tsx

  general-dashboard.tsx
```

La page principale peut décider :

```txt
if sector = COMMERCE → CommerceDashboard
if sector = SANTE → HealthDashboard
else → GeneralDashboard
```

---

# 12. États à prévoir

Chaque dashboard doit gérer :

```txt
loading
empty
error
no data yet
partial data
slow connection
```

Ne pas afficher un écran vide.

---

# 13. Progressive implementation

Le dashboard sectoriel peut être implémenté progressivement.

## Phase 1

```txt
Créer composants séparés Commerce / Santé / Autre
Réutiliser les données existantes
Ne pas modifier DB
Ne pas ajouter Achats si non implémenté
```

## Phase 2

```txt
Ajouter sections Achats/Fournisseurs lorsque le modèle existe
Mieux distinguer encaissements et ventes
Ajouter clients à payer
```

## Phase 3

```txt
Ajouter paiements partiels robustes
Ajouter dettes fournisseurs
Ajouter rapports sectoriels
```

---

# 14. Ne pas faire dans la première version

Ne pas commencer par :

```txt
graphiques complexes
analytics avancés
IA
comparaisons longues
dashboard personnalisable
trop de widgets
toutes les données en même temps
```

Le premier dashboard sectoriel doit être simple.

---

# 15. Critères d’acceptation

Le dashboard sectoriel est réussi si :

```txt
un commerce voit surtout ventes, encaissements, stock et clients à payer
un cabinet voit surtout rendez-vous, consultations, patients et paiements
une activité autre voit surtout ventes, dépenses, encaissements et activité
l’action principale est visible immédiatement
le mobile est lisible
les données ne se mélangent pas
les empty states guident l’utilisateur
aucune route existante n’est cassée
aucune logique DB n’est modifiée sans plan
```

---

# 16. Tests manuels

Tester avec entreprise secteur :

```txt
COMMERCE
SANTE
AUTRE
```

Pour chaque secteur :

```txt
dashboard desktop
dashboard mobile
action principale
empty states
activité récente
montants
navigation
loading state
```

---

# 17. Risques

## 17.1 Risque : afficher des sections sans données

Ne pas afficher une section Achats si le module Achats n’existe pas encore, sauf comme placeholder discret et clairement marqué.

## 17.2 Risque : confusion ventes / encaissements

Toujours distinguer :

```txt
vente enregistrée
paiement reçu
reste à payer
```

## 17.3 Risque : trop de widgets

Un dashboard avec trop de blocs devient inutilisable.

Préférer :

```txt
peu de blocs
forte hiérarchie
action claire
```

---

# 18. Phrase directrice

> Le dashboard Synkro doit être le tableau de bord du métier, pas un résumé générique de base de données.

Chaque secteur doit voir ce qui compte pour lui.
````

Après ça, tu peux demander à Codex une dernière passe de cohérence documentaire légère :
