# Synkro Design System v2

> Direction : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : construire une interface calme, fiable, mobile-first et adaptée aux PME haïtiennes.
> Références métier : `docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md`, `docs/SYNKRO_CURRENT_STATE_AUDIT.md` et `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

---

## 1. Philosophie du design system

Le design system Synkro v2 n’est pas seulement une collection de couleurs et de composants.

Il doit garantir que chaque écran de Synkro reste :

- clair ;
- sobre ;
- rapide ;
- cohérent ;
- rassurant ;
- facile à utiliser ;
- adapté au mobile ;
- compréhensible par des utilisateurs non techniques.

Synkro ne doit pas ressembler à un dashboard générique.

Synkro doit ressembler à un outil professionnel de confiance.

---

## 2. Direction visuelle

La direction visuelle validée est :

> Monochrome fonctionnel.

Cela signifie :

- peu de couleurs ;
- une hiérarchie forte ;
- des surfaces calmes ;
- des bordures discrètes ;
- des ombres minimales ;
- des icônes utiles, pas décoratives ;
- une couleur principale sobre ;
- des couleurs métier uniquement quand elles ont un sens.

---

## 3. Couleur principale

```css
#1F3A5F
```

Nom recommandé :

```txt
Synkro Blue
```

Ce bleu doit être utilisé pour :

- actions principales ;
- navigation active ;
- focus states ;
- identité produit ;
- liens importants ;
- éléments interactifs dominants.

Il ne doit pas être utilisé pour décorer inutilement l’interface.

---

## 4. Tokens CSS recommandés

À intégrer dans :

```txt
app/globals.css
```

Base proposée :

```css
:root {
  --background: 60 10% 96%; /* #F5F5F3 */
  --foreground: 0 0% 7%; /* #111111 */

  --card: 0 0% 100%; /* #FFFFFF */
  --card-foreground: 0 0% 7%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 7%;

  --primary: 213 51% 25%; /* #1F3A5F */
  --primary-foreground: 0 0% 100%;

  --secondary: 60 6% 93%; /* #EEEEEC */
  --secondary-foreground: 0 0% 10%;

  --muted: 60 6% 93%;
  --muted-foreground: 0 0% 42%; /* #6B6B6B */

  --accent: 60 6% 93%;
  --accent-foreground: 0 0% 10%;

  --destructive: 4 75% 40%;
  --destructive-foreground: 0 0% 100%;

  --border: 30 7% 90%; /* #E7E5E4 */
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

## 5. Palette fonctionnelle

### 5.1 Palette principale

| Token              | Couleur   | Usage                        |
| ------------------ | --------- | ---------------------------- |
| `background`       | `#F5F5F3` | fond global                  |
| `card`             | `#FFFFFF` | surfaces principales         |
| `foreground`       | `#111111` | texte principal              |
| `muted-foreground` | `#6B6B6B` | texte secondaire             |
| `border`           | `#E7E5E4` | séparateurs                  |
| `primary`          | `#1F3A5F` | action principale / identité |

---

### 5.2 Palette métier

Les couleurs métier ne doivent jamais être décoratives.

| Token         | Usage                                          |
| ------------- | ---------------------------------------------- |
| `success`     | paiement reçu, bénéfice positif, stock correct |
| `warning`     | stock bas, attention, action à vérifier        |
| `destructive` | dette, perte, erreur, suppression, rupture     |
| `primary`     | action système, navigation, identité           |

---

## 6. Règles d’utilisation des couleurs

### À faire

- utiliser `primary` pour l’action principale ;
- utiliser le vert uniquement pour les valeurs positives ou confirmées ;
- utiliser le rouge uniquement pour les erreurs, pertes, dettes ou dangers ;
- utiliser le jaune uniquement pour l’attention ;
- garder la majorité de l’interface en noir, blanc, gris et bleu sobre.

### À éviter

- icônes multicolores sans sens ;
- violet décoratif ;
- cartes statistiques colorées sans raison ;
- gradients ;
- badges trop saturés ;
- gros blocs bleus partout ;
- mélanger plusieurs couleurs sur un même écran sans nécessité.

---

## 7. Typographie

### 7.1 Police recommandée

Police principale recommandée :

```txt
Inter
```

Alternatives acceptables :

```txt
Geist
IBM Plex Sans
```

### 7.2 Style typographique

La typographie doit être :

- sobre ;
- très lisible ;
- neutre ;
- stable ;
- professionnelle.

Éviter les polices trop “startup”, trop rondes ou trop décoratives.

---

## 8. Échelle typographique

### Desktop

| Usage          | Taille | Poids |
| -------------- | -----: | ----: |
| Page title     | `32px` | `700` |
| Section title  | `20px` | `650` |
| Card title     | `15px` | `600` |
| Body           | `15px` | `400` |
| Secondary text | `14px` | `400` |
| Label          | `13px` | `500` |
| Small          | `12px` | `400` |

### Mobile

| Usage          | Taille | Poids |
| -------------- | -----: | ----: |
| Page title     | `28px` | `700` |
| Section title  | `19px` | `650` |
| Card title     | `15px` | `600` |
| Body           | `15px` | `400` |
| Secondary text | `14px` | `400` |
| Label          | `13px` | `500` |

---

## 9. Montants

Les montants sont des informations critiques.

Ils doivent être plus lisibles que décoratifs.

### Règles

- aligner les montants proprement ;
- utiliser une graisse forte ;
- éviter les décimales inutiles ;
- utiliser la couleur uniquement si elle porte un sens ;
- toujours garder une cohérence de format.

### Exemples

```txt
15 217 G
15 217,29 G
+1 500 G
-200 G
```

### Couleurs

| Type             | Couleur       |
| ---------------- | ------------- |
| Montant neutre   | `foreground`  |
| Montant reçu     | `success`     |
| Montant dû       | `destructive` |
| Bénéfice positif | `success`     |
| Bénéfice négatif | `destructive` |

---

## 10. Espacement

Le système d’espacement doit réduire le bruit visuel.

### Tokens recommandés

| Token      | Valeur | Usage             |
| ---------- | -----: | ----------------- |
| `space-1`  |  `4px` | micro             |
| `space-2`  |  `8px` | petit             |
| `space-3`  | `12px` | compact           |
| `space-4`  | `16px` | standard          |
| `space-5`  | `20px` | confortable       |
| `space-6`  | `24px` | section           |
| `space-8`  | `32px` | grande séparation |
| `space-10` | `40px` | page              |

### Règle

Sur mobile, privilégier :

```txt
16px à 20px de padding horizontal
```

Sur desktop :

```txt
24px à 32px de padding
```

---

## 11. Radius

Synkro doit être doux, mais pas enfantin.

### Tokens

| Token | Valeur | Usage                        |
| ----- | -----: | ---------------------------- |
| `sm`  |  `8px` | inputs, petits badges        |
| `md`  | `12px` | boutons, cards compactes     |
| `lg`  | `16px` | cards principales            |
| `xl`  | `20px` | grands blocs                 |
| `2xl` | `24px` | surfaces mobiles importantes |

### Règle

Éviter les coins trop ronds qui donnent un aspect “app grand public fun”.

---

## 12. Ombres

Les ombres doivent être minimales.

Synkro doit paraître stable, pas flottant.

### Recommandation

Utiliser principalement :

- bordure ;
- contraste de surface ;
- spacing.

L’ombre doit être légère.

```css
--shadow-card: 0 1px 2px rgba(17, 17, 17, 0.04);
--shadow-popover: 0 8px 24px rgba(17, 17, 17, 0.08);
```

Éviter :

- grosses ombres ;
- glow ;
- effets flottants exagérés.

---

## 13. Layout

### 13.1 Page layout desktop

Structure recommandée :

```txt
AppShell
  Sidebar
  Main
    Topbar
    PageContainer
      PageHeader
      Content
```

### 13.2 Page layout mobile

Structure recommandée :

```txt
MobileShell
  MobileTopbar
  PageContent
  MobileActionBar / BottomNavigation
```

Le mobile ne doit pas être une version compressée du desktop.

---

## 14. PageHeader

Toutes les pages principales doivent utiliser un `PageHeader`.

### Structure

```txt
Titre
Description
Action principale
Actions secondaires
```

### Exemple

```txt
Ventes
Gérez vos ventes, paiements et reçus

[ Nouvelle vente ]
```

### Règles

- une seule action principale ;
- description courte ;
- pas plus de deux actions secondaires visibles ;
- sur mobile, l’action principale peut être déplacée en sticky bottom.

---

## 15. Boutons

### 15.1 Types de boutons

| Variant       | Usage             |
| ------------- | ----------------- |
| `primary`     | action principale |
| `secondary`   | action secondaire |
| `outline`     | action neutre     |
| `ghost`       | action discrète   |
| `destructive` | action dangereuse |

---

### 15.2 Bouton primary

Usage :

- Nouvelle vente ;
- Enregistrer ;
- Ajouter un paiement ;
- Générer un reçu ;
- Inviter un utilisateur.

Style :

```txt
fond primary
texte blanc
hauteur 44px desktop
hauteur 48px mobile
radius 12px
```

---

### 15.3 Bouton secondaire

Usage :

- filtrer ;
- annuler ;
- voir l’historique ;
- exporter si non prioritaire.

Style :

```txt
fond muted ou blanc
bordure subtile
texte foreground
```

---

### 15.4 Bouton destructive

Usage :

- supprimer ;
- annuler définitivement ;
- retirer un utilisateur ;
- supprimer un produit.

Règle :

> Une action destructive doit toujours être confirmée.

---

## 16. Inputs

### 16.1 Règles

Les inputs doivent être :

- grands ;
- lisibles ;
- calmes ;
- faciles à toucher ;
- clairement labellisés.

### Style recommandé

```txt
height: 44px desktop
height: 48px mobile
border: border
background: white
radius: 10px ou 12px
```

### Important

Ne jamais dépendre uniquement du placeholder.

Toujours utiliser un label visible.

---

## 17. Formulaires

Les formulaires sont centraux pour Synkro.

### 17.1 Structure recommandée

```txt
FormPage
  PageHeader
  FormSection
    Fields
  FormSection
    Fields
  FormActions
```

### 17.2 Exemple nouvelle vente

```txt
Client
Produits / services
Paiement
Notes
Résumé
Action finale
```

### 17.3 Règles

- diviser les formulaires longs en sections ;
- montrer un résumé avant validation ;
- garder le bouton final visible ;
- afficher les erreurs inline ;
- confirmer clairement le succès.

---

## 18. Cards

Les cartes doivent être sobres.

### 18.1 MetricCard

Structure :

```txt
Label
Valeur principale
Contexte
Variation ou statut optionnel
```

Exemple :

```txt
Ventes ce mois
15 217 G
44 ventes
```

### Règles

- pas d’icône obligatoire ;
- pas de couleur décorative ;
- valeur principale très lisible ;
- contexte court ;
- pas plus de 3 infos par carte.

---

## 19. Data tables

Les tables sont acceptables sur desktop, mais doivent être évitées sur mobile.

### Desktop

Tables recommandées pour :

- ventes ;
- clients ;
- stock ;
- rapports ;
- paiements ;
- utilisateurs.

### Mobile

Transformer les tables en listes.

Exemple mobile :

```txt
Georges Dupont
11/05/2026 · Cash
+105 G
Payé
```

---

## 20. DataList mobile

Composant recommandé :

```txt
DataList
  DataListItem
    Title
    Metadata
    Amount
    Status
    Optional action
```

Usage :

- ventes récentes ;
- dépenses ;
- clients ;
- mouvements de stock ;
- paiements ;
- consultations.

---

## 21. Badges

### 21.1 Statuts financiers

| Statut  | Style      |
| ------- | ---------- |
| Payé    | vert doux  |
| Partiel | jaune doux |
| Impayé  | rouge doux |
| Annulé  | gris       |

### 21.2 Stock

| Statut    | Style                |
| --------- | -------------------- |
| Stock OK  | gris ou vert discret |
| Stock bas | jaune                |
| Rupture   | rouge                |

### 21.3 Règle

Les badges doivent être discrets.

Pas de couleurs saturées.

---

## 22. Empty states

Les états vides doivent guider l’utilisateur.

Mauvais :

```txt
Aucune donnée.
```

Bon :

```txt
Aucune vente pour le moment.
Ajoutez votre première vente pour commencer à suivre votre activité.
[ Nouvelle vente ]
```

### Règles

- expliquer ce qui manque ;
- dire pourquoi c’est utile ;
- proposer une action ;
- rester court.

---

## 23. Loading states

Le chargement doit rassurer.

### Règles

- éviter écran blanc ;
- utiliser skeletons ;
- afficher un message simple si chargement long ;
- prévoir connexion lente.

Messages :

```txt
Chargement de votre espace…
Vos données arrivent…
Connexion lente détectée. Merci de patienter.
```

---

## 24. Offline states

Synkro doit préparer une expérience mobile avec connexion instable.

### Messages

```txt
Vous êtes hors ligne.
Certaines données peuvent ne pas être à jour.
```

```txt
Connexion retrouvée.
Synchronisation en cours…
```

---

## 25. Toasts et feedback

Chaque action importante doit produire un feedback.

### Succès

```txt
Vente enregistrée.
Produit mis à jour.
Paiement ajouté.
Dépense supprimée.
```

### Erreur

```txt
Impossible d’enregistrer pour le moment.
Vérifiez votre connexion puis réessayez.
```

### Règle

Ne jamais afficher d’erreur technique brute.

---

## 26. Dialogues de confirmation

À utiliser pour :

- suppression ;
- changement de statut sensible ;
- modification de paiement ;
- retrait d’un utilisateur ;
- annulation d’une opération.

### Structure

```txt
Titre clair
Explication courte
Action destructive
Annuler
```

Exemple :

```txt
Supprimer cette vente ?
Cette action ne peut pas être annulée. Les montants liés à cette vente seront retirés des rapports.
[ Supprimer ] [ Annuler ]
```

---

## 27. Navigation desktop

### Sidebar actuelle

La sidebar actuelle est fonctionnelle mais trop “admin template”.

### V2

Objectifs :

- état actif plus subtil ;
- moins de bleu massif ;
- meilleure séparation des modules ;
- support permissions ;
- support secteur ;
- support actions rapides.

### Recommandation

L’état actif peut utiliser :

- fond très léger ;
- texte primary ;
- icône primary ;
- petite barre verticale ;
- pas nécessairement un gros bloc bleu.

---

## 28. Navigation mobile

Le mobile doit avoir une vraie navigation.

Options possibles :

### Option A — Bottom navigation

Pour les sections principales :

```txt
Accueil
Ventes
Stock
Clients
Menu
```

### Option B — Action hub

Bouton principal central :

```txt
+
Nouvelle vente
Nouvelle dépense
Nouveau produit
```

### Recommandation initiale

Combiner :

- bottom navigation pour les zones ;
- action principale sticky selon la page ;
- menu secondaire pour les autres modules.

---

## 29. Mobile action bar

Sur les flows critiques, utiliser une barre sticky en bas.

Exemples :

```txt
[ Enregistrer la vente ]
```

```txt
[ Ajouter un paiement ]
```

```txt
[ Générer le reçu ]
```

Règle :

> L’action importante ne doit jamais disparaître après un long scroll.

---

## 30. Icônes

Les icônes doivent aider à scanner, pas décorer.

### Règles

- utiliser Lucide ;
- taille standard `18px` ou `20px` ;
- stroke cohérent ;
- couleur neutre par défaut ;
- primary uniquement pour action active ;
- éviter les icônes multicolores.

---

## 31. Graphiques et rapports

Les rapports doivent expliquer avant de visualiser.

### Règle

Chaque graphique important doit avoir une phrase de lecture.

Exemple :

```txt
En mai, vous avez émis 715 G de ventes.
Vous avez reçu 620 G en encaissements.
Vos dépenses opérationnelles sont de 200 G.
Vos achats de stock sont suivis séparément.
```

### Graphiques

- barres simples ;
- lignes simples ;
- pas de couleurs multiples inutiles ;
- légendes claires ;
- éviter les visualisations complexes.

---

## 32. Documents PDF

Les documents PDF doivent suivre le même langage visuel.

### Principes

- propre ;
- professionnel ;
- très lisible ;
- noir et blanc dominant ;
- accent `#1F3A5F` limité ;
- informations de l’entreprise visibles ;
- statut clair ;
- montants alignés.

### Documents prioritaires

- facture ;
- reçu ;
- reçu de paiement partiel ;
- ordonnance ;
- rapport mensuel ;
- bon de réception ;
- inventaire.

---

## 33. Accessibilité

Synkro doit être lisible sur :

- téléphones bas de gamme ;
- écrans faibles ;
- luminosité extérieure ;
- connexions lentes.

### Règles

- contraste suffisant ;
- boutons minimum 44px ;
- labels visibles ;
- textes pas trop petits ;
- pas d’information uniquement par couleur ;
- feedback clair.

---

## 34. Performance perçue

La performance perçue est une partie du design.

### Règles

- skeletons plutôt que blanc ;
- optimistic UI seulement si sûr ;
- éviter animations lourdes ;
- réduire images inutiles ;
- charger d’abord l’essentiel ;
- éviter les pages trop longues sur mobile.

---

## 35. Composants prioritaires à créer

Ordre recommandé :

```txt
PageHeader
PageShell
MetricCard
Amount
StatusBadge
DataList
FormSection
FormActions
MobileActionBar
EmptyState
LoadingState
ConfirmDialog
PermissionGate
OfflineBanner
```

---

## 36. Exemple de structure de composants

```txt
components/
  layout/
    app-shell.tsx
    desktop-sidebar.tsx
    mobile-shell.tsx
    mobile-bottom-nav.tsx
    page-header.tsx

  system/
    amount.tsx
    status-badge.tsx
    metric-card.tsx
    data-list.tsx
    empty-state.tsx
    loading-state.tsx
    offline-banner.tsx
    permission-gate.tsx

  forms/
    form-section.tsx
    form-actions.tsx

  feedback/
    confirm-dialog.tsx
```

---

## 37. Migration recommandée

### Étape 1

Mettre à jour les tokens dans `globals.css`.

### Étape 2

Créer les composants système sans changer toutes les pages.

### Étape 3

Migrer la sidebar et le shell.

### Étape 4

Migrer les pages critiques :

```txt
Dashboard
Ventes
Nouvelle vente
Détail vente
Commerce
Finance
Clients
Rapports
Paramètres
```

### Étape 5

Créer la vraie expérience mobile.

### Étape 6

Créer les states PWA :

```txt
loading
offline
slow connection
empty
error
```

---

## 38. Anti-patterns

À éviter dans Synkro v2 :

- trop de bleu ;
- trop de couleurs ;
- trop d’icônes ;
- tous les blocs en cards ;
- tables desktop sur mobile ;
- action principale en bas d’une longue page ;
- messages techniques ;
- loading blanc ;
- boutons désactivés sans explication ;
- fonctionnalités “bientôt” trop visibles ;
- écrans qui affichent tout au même niveau.

---

## 39. Check-list d’un bon écran Synkro

Avant de valider un écran, vérifier :

- l’action principale est-elle claire ?
- les montants sont-ils lisibles ?
- les couleurs ont-elles un sens ?
- l’utilisateur sait-il quoi faire ensuite ?
- l’écran fonctionne-t-il bien sur mobile ?
- les erreurs sont-elles humaines ?
- le chargement est-il rassurant ?
- les actions sensibles sont-elles confirmées ?
- l’écran inspire-t-il confiance ?
- peut-on enlever quelque chose ?

---

## 40. Phrase directrice

> Moins d’effet. Plus de clarté. Plus de confiance.

Synkro v2 doit être calme, utile et évident.
