# Synkro Trust System v2

> Direction : **confiance, transparence, traçabilité**  
> Design : **monochrome fonctionnel**  
> Accent principal : `#1F3A5F`  
> Objectif : faire de la confiance une couche produit explicite dans Synkro v2.

---

## 1. Pourquoi un Trust System

Synkro touche à des données sensibles :

- ventes ;
- dépenses ;
- bénéfices ;
- dettes ;
- paiements ;
- stock ;
- patients ;
- consultations ;
- documents professionnels ;
- activité des employés.

Dans ce contexte, la confiance ne peut pas dépendre uniquement d’un joli design.

La confiance doit être construite dans :

- les écrans ;
- les messages ;
- les statuts ;
- les confirmations ;
- les historiques ;
- les permissions ;
- les documents ;
- les erreurs ;
- les comportements système.

---

## 2. Principe central

> Un utilisateur doit toujours comprendre ce qui s’est passé, ce qui est enregistré, ce qui reste à faire et qui a fait quoi.

Synkro doit éviter toute ambiguïté dans les données critiques.

---

## 3. Ce que Synkro doit faire ressentir

Chaque interaction sensible doit faire ressentir :

- sécurité ;
- clarté ;
- contrôle ;
- stabilité ;
- professionnalisme ;
- prévisibilité.

L’utilisateur doit sentir :

```txt
Mes données sont organisées.
Mes paiements sont suivis.
Mes clients sont clairs.
Mon business est sous contrôle.
```

---

## 4. Risques de confiance à éviter

Synkro v2 doit éviter absolument :

- bouton qui ne fait rien ;
- écran blanc sans explication ;
- erreur technique brute ;
- paiement modifié sans trace ;
- vente supprimée sans confirmation ;
- statut payé/impayé ambigu ;
- montant incohérent entre deux pages ;
- données qui semblent disparaître ;
- changement de stock sans historique ;
- utilisateur employé avec trop d’accès ;
- document PDF non professionnel ;
- action lente sans feedback ;
- double clic créant double vente ou double paiement.

---

## 5. Règles générales de confiance

### 5.1 Toujours confirmer une action importante

Exemples :

```txt
Vente enregistrée.
Paiement ajouté.
Produit mis à jour.
Dépense supprimée.
Stock ajusté.
Utilisateur invité.
```

### 5.2 Toujours expliquer les erreurs

Mauvais :

```txt
Server Action failed.
```

Bon :

```txt
Impossible d’enregistrer la vente pour le moment.
Vérifiez votre connexion puis réessayez.
```

### 5.3 Toujours montrer le statut actuel

Exemples :

```txt
Payé
Partiel
Impayé
En retard
Stock bas
Rupture
```

### 5.4 Toujours garder une trace des opérations sensibles

À terme, Synkro doit pouvoir répondre :

```txt
Qui a enregistré cette vente ?
Qui a ajouté ce paiement ?
Quand le stock a-t-il été modifié ?
Qui a supprimé cette dépense ?
```

---

## 6. Actions sensibles

Les actions suivantes sont sensibles :

```txt
Créer vente
Modifier vente
Supprimer vente
Ajouter paiement
Modifier statut paiement
Créer dépense
Modifier dépense
Supprimer dépense
Ajuster stock
Recevoir stock fournisseur
Modifier produit
Supprimer produit
Modifier consultation
Modifier patient
Inviter utilisateur
Modifier permissions
Changer abonnement
Changer paramètres entreprise
```

Chaque action sensible doit avoir :

- permissions ;
- feedback ;
- loading state ;
- gestion d’erreur ;
- confirmation si destructive ;
- trace dans audit log si nécessaire.

---

## 7. Paiements

Les paiements sont le cœur de la confiance financière.

### 7.1 Problème actuel

Le modèle simple :

```txt
Payé / Impayé
```

est insuffisant pour le marché.

Beaucoup de clients paient progressivement.

### 7.2 Modèle v2

Statuts recommandés :

```txt
UNPAID
PARTIAL
PAID
OVERDUE
CANCELLED
```

### 7.3 Règle fondamentale

> Un paiement enregistré ne doit jamais disparaître silencieusement.

Chaque paiement doit être :

- horodaté ;
- associé à un utilisateur ;
- associé à une vente ou consultation ;
- consultable ;
- exportable en reçu ;
- inclus dans le calcul du solde.

---

## 8. Paiement partiel

### 8.1 Exemple réel

```txt
Total : 2 000 G
Paiement 1 : 1 000 G
Paiement 2 : 300 G
Solde restant : 700 G
Statut : Partiel
```

### 8.2 UI recommandée

Sur détail vente :

```txt
Montant total
2 000 G

Déjà payé
1 300 G

Reste à payer
700 G

Statut
Partiel
```

### 8.3 Timeline paiement

Chaque paiement doit apparaître dans une timeline :

```txt
12 mai 2026 — 1 000 G — Cash — enregistré par Marie
13 mai 2026 — 300 G — MonCash — enregistré par Jean
```

### 8.4 Ajout paiement

Avant validation, afficher :

```txt
Montant dû : 700 G
Montant reçu : [      ]
Solde après paiement : ...
```

Après validation :

```txt
Paiement ajouté.
Solde restant : 400 G.
```

---

## 9. Reçus

### 9.1 Rôle

Le reçu est un objet de confiance.

Il permet au client et au marchand d’avoir une preuve.

### 9.2 Types de reçus

```txt
Reçu vente complète
Reçu paiement partiel
Reçu solde payé
Reçu consultation
```

### 9.3 Informations minimales

Un reçu doit contenir :

- nom entreprise ;
- date ;
- numéro de reçu ;
- client ;
- montant payé ;
- montant total ;
- solde restant ;
- méthode de paiement ;
- statut ;
- émetteur ;
- contact entreprise.

### 9.4 Règle

> Un reçu de paiement partiel doit toujours afficher le solde restant.

---

## 10. Documents PDF

Les documents PDF doivent être cohérents avec le Trust System.

### 10.1 Rôle des documents

Les documents créent :

- preuve ;
- professionnalisme ;
- crédibilité ;
- switching cost ;
- mémoire.

### 10.2 Documents prioritaires

```txt
Facture
Reçu
Reçu de paiement partiel
Rapport mensuel
Ordonnance
Consultation
Bon de réception stock
Inventaire
```

### 10.3 Règles visuelles

- monochrome dominant ;
- accent `#1F3A5F` limité ;
- montants alignés ;
- statut visible ;
- numéro unique ;
- date claire ;
- entreprise claire ;
- client clair.

---

## 11. Numérotation

Les documents et transactions doivent avoir des numéros lisibles.

Exemples :

```txt
SALE-ABC123-2026-0001
PAY-ABC123-2026-0001
INV-ABC123-2026-0001
REC-ABC123-2026-0001
CONS-ABC123-2026-0001
```

Objectif :

- éviter collisions multi-tenant ;
- faciliter recherche ;
- rassurer ;
- permettre référence client.

---

## 12. Stock

Le stock est une zone de confiance importante.

Les règles stock doivent suivre `docs/SYNKRO_BUSINESS_MODULES_ARCHITECTURE.md` : une Réception stock fournisseur est un achat de marchandises, pas une simple dépense opérationnelle.

### 12.1 Règle

> Aucun changement de stock ne doit être invisible.

Chaque mouvement de stock doit avoir :

- type ;
- quantité ;
- date ;
- utilisateur ;
- raison ;
- produit ;
- référence liée si applicable.

### 12.2 Types de mouvements

```txt
IN
OUT
ADJUSTMENT
RETURN
CANCELLED
```

### 12.3 Réception fournisseur

Une réception fournisseur doit créer :

- mouvement stock `IN` ;
- achat de stock lié ;
- référence fournisseur ;
- dette fournisseur ou encaissement sortant si non réglé / réglé ;
- bon de réception.

### 12.4 UI recommandée

Sur détail produit :

```txt
Stock actuel : 24

Historique
+10 Réception fournisseur — 12 mai
-2 Vente — 13 mai
-1 Ajustement manuel — 13 mai
```

---

## 13. Suppression

La suppression est dangereuse pour la confiance.

### 13.1 Règle

Préférer :

```txt
Annuler
Archiver
Désactiver
```

plutôt que supprimer définitivement.

### 13.2 Suppression autorisée

Si une suppression existe, elle doit avoir :

- confirmation ;
- explication ;
- permission ;
- audit log ;
- impact clairement expliqué.

Exemple :

```txt
Supprimer cette vente ?
Cette action ne peut pas être annulée. Les montants liés à cette vente seront retirés des rapports.
```

### 13.3 Recommandation

Pour les ventes, paiements et consultations, envisager plutôt :

```txt
CANCELLED
VOIDED
ARCHIVED
```

au lieu de suppression dure.

---

## 14. Audit logs

### 14.1 Objectif

Permettre au propriétaire de comprendre l’activité.

Questions à répondre :

```txt
Qui a fait cette vente ?
Qui a ajouté ce paiement ?
Qui a modifié ce produit ?
Qui a ajusté le stock ?
Qui a supprimé cette dépense ?
```

### 14.2 Modèle simple recommandé

```txt
AuditLog
  id
  entrepriseId
  userId
  action
  entityType
  entityId
  metadata
  createdAt
```

### 14.3 Actions à logger

```txt
SALE_CREATED
SALE_UPDATED
SALE_CANCELLED
PAYMENT_CREATED
EXPENSE_CREATED
EXPENSE_DELETED
PRODUCT_UPDATED
STOCK_ADJUSTED
USER_INVITED
PERMISSION_UPDATED
SETTINGS_UPDATED
```

### 14.4 UI

Afficher l’audit log progressivement :

- d’abord sur détails sensibles ;
- ensuite page admin ;
- ensuite rapports avancés.

---

## 15. Permissions

La confiance passe par le contrôle d’accès.

### 15.1 Rôles recommandés

```txt
OWNER
ADMIN
CASHIER
STOCK_MANAGER
ACCOUNTANT
VIEWER
```

### 15.2 Principe

> Chaque rôle doit voir seulement ce dont il a besoin.

### 15.3 Employé caisse

Peut :

- créer vente ;
- voir ses ventes récentes ;
- ajouter paiement si autorisé ;
- imprimer reçu.

Ne peut pas :

- voir tous les rapports ;
- supprimer ventes ;
- modifier paramètres ;
- gérer utilisateurs ;
- voir bénéfice global si non autorisé.

---

## 16. Erreurs

Les erreurs sont des moments de confiance critique.

### 16.1 Erreurs techniques à cacher

Ne jamais afficher :

```txt
CredentialsSignin
Server Component render error
PrismaClientKnownRequestError
NEXT_REDIRECT
undefined
```

### 16.2 Messages recommandés

Login :

```txt
Email ou mot de passe incorrect.
```

Connexion :

```txt
Impossible de charger vos données.
Vérifiez votre connexion puis réessayez.
```

Sauvegarde :

```txt
Impossible d’enregistrer pour le moment.
Aucune modification n’a été appliquée.
```

Permission :

```txt
Vous n’avez pas l’autorisation d’effectuer cette action.
```

---

## 17. États de chargement

Un produit de confiance ne doit pas afficher un vide inquiétant.

### 17.1 À éviter

```txt
écran blanc
bouton qui reste figé
liste vide sans explication
```

### 17.2 À faire

- skeleton ;
- bouton loading ;
- message si connexion lente ;
- toast succès / erreur ;
- désactivation anti double-clic.

Messages :

```txt
Chargement de votre espace…
Enregistrement…
Paiement en cours d’ajout…
Connexion lente détectée. Vos données arrivent.
```

---

## 18. Cohérence des montants

### 18.1 Règle

Un même montant doit être affiché pareil partout.

Cela inclut :

- dashboard ;
- finance ;
- rapport ;
- PDF ;
- détail vente ;
- client ;

Pour les montants affichés sur le dashboard, respecter aussi `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.
- reçu.

### 18.2 Recommandation

Tous les montants doivent passer par un composant central :

```txt
Amount
```

Tous les calculs financiers doivent passer par des helpers centralisés.

---

## 19. Cohérence des statuts

Tous les statuts doivent être centralisés.

Utiliser :

```txt
StatusBadge
```

Éviter les labels improvisés :

```txt
Payé
paid
PAID
Réglé
Terminé
```

Choisir un vocabulaire cohérent :

```txt
Payé
Partiel
Impayé
En retard
Annulé
```

---

## 20. WhatsApp

WhatsApp est un canal de confiance local.

### 20.1 Cas d’usage

- envoyer reçu ;
- envoyer facture ;
- envoyer rappel paiement ;
- envoyer ordonnance ;
- envoyer confirmation rendez-vous.

### 20.2 Règle

Les messages WhatsApp doivent être simples et professionnels.

Exemple :

```txt
Bonjour Jean, voici votre reçu de paiement Synkro pour la vente #SALE-2026-0001.
Montant payé : 1 000 G
Solde restant : 700 G
```

### 20.3 Attention

Ne pas exposer d’informations médicales sensibles dans un message WhatsApp sans décision explicite de l’utilisateur.

---

## 21. Santé et confidentialité

Le module santé demande plus de prudence.

### 21.1 Données sensibles

- patient ;
- consultation ;
- diagnostic ;
- traitement ;
- rendez-vous ;
- documents médicaux.

### 21.2 Règles

- limiter les accès employés ;
- éviter partage WhatsApp automatique de détails médicaux ;
- confirmer avant envoi ;
- prévoir export document contrôlé ;
- audit log pour modifications sensibles.

---

## 22. Trust copywriting

Le langage produit doit renforcer la confiance.

### 22.1 Ton

- direct ;
- calme ;
- humain ;
- professionnel ;
- jamais agressif ;
- jamais infantilisant.

### 22.2 Exemples

Mauvais :

```txt
Oops! Something went wrong.
```

Bon :

```txt
Une erreur est survenue.
Vous pouvez réessayer dans quelques instants.
```

Mauvais :

```txt
Are you sure?
```

Bon :

```txt
Confirmer cette action ?
Cette modification sera enregistrée dans l’historique.
```

---

## 23. Anti-fraude douce

Sans accuser l’utilisateur, Synkro doit limiter les manipulations dangereuses.

### 23.1 Exemples

- paiements immuables ;
- audit logs ;
- suppression limitée ;
- permissions ;
- reçus numérotés ;
- historique stock ;
- annulation plutôt que suppression.

### 23.2 Principe

> Le système protège le business sans rendre l’utilisateur suspect.

---

## 24. Transparence

L’utilisateur doit comprendre les conséquences.

Exemples :

Avant suppression :

```txt
Cette vente sera retirée des rapports.
```

Avant paiement :

```txt
Ce paiement sera ajouté à l’historique et mettra à jour le solde restant.
```

Avant changement de devise :

```txt
Cette devise sera utilisée pour les nouveaux affichages. Les montants existants ne seront pas automatiquement convertis.
```

---

## 25. Sentry, PostHog et support

### 25.1 Sentry

Utiliser Sentry pour :

- erreurs serveur ;
- erreurs client ;
- actions critiques échouées ;
- problèmes de formulaires.

### 25.2 PostHog

Utiliser PostHog pour comprendre :

- abandon onboarding ;
- échec de création vente ;
- clics sur PDF ;
- clics WhatsApp ;
- usage mobile ;
- actions les plus fréquentes.

### 25.3 Bug report

Le bug report doit rester simple.

Mais après soumission :

```txt
Merci. Votre signalement a été envoyé.
```

Et en cas d’erreur :

```txt
Impossible d’envoyer le signalement pour le moment.
```

---

## 26. Checklist Trust avant livraison

Avant de livrer une fonctionnalité sensible, vérifier :

- l’action a-t-elle un loading state ?
- l’action a-t-elle un feedback succès ?
- l’erreur est-elle compréhensible ?
- les permissions sont-elles respectées ?
- les montants sont-ils cohérents ?
- les statuts sont-ils clairs ?
- les suppressions sont-elles confirmées ?
- l’action est-elle tracée si nécessaire ?
- l’utilisateur comprend-il l’impact ?
- le mobile est-il fiable ?
- la connexion lente est-elle gérée ?

---

## 27. Priorités d’implémentation

### Phase 1 — Trust minimum

- messages d’erreur humains ;
- loading states ;
- confirmations suppression ;
- statuts standardisés ;
- `Amount` centralisé ;
- suppression écran blanc PWA.

### Phase 2 — Paiements partiels

- modèle `Payment` ;
- statut `PARTIAL` ;
- timeline paiements ;
- solde restant ;
- reçu paiement partiel.

### Phase 3 — Audit logs

- modèle `AuditLog` ;
- log actions critiques ;
- affichage dans détails vente / stock / utilisateurs.

### Phase 4 — Permissions

- rôles ;
- permissions ;
- `PermissionGate` ;
- UI gestion utilisateurs.

### Phase 5 — Documents de confiance

- reçus ;
- factures ;
- bons ;
- PDF santé ;
- WhatsApp.

---

## 28. Définition d’un produit de confiance

Synkro inspire confiance si :

- les données ne semblent jamais disparaître ;
- les montants sont cohérents partout ;
- les actions importantes sont confirmées ;
- les erreurs sont humaines ;
- les paiements sont traçables ;
- les employés ont des accès contrôlés ;
- les documents sont professionnels ;
- l’utilisateur sait toujours quoi faire ensuite.

---

## 29. Phrase directrice

> La confiance n’est pas une impression.  
> C’est un comportement produit répété à chaque interaction.
