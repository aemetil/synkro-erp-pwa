# Synkro Payments & Partials Spec v2

> Direction : **paiements traçables, dettes claires, reçus professionnels**  
> Objectif : remplacer la logique binaire payé / impayé par un système fiable de paiements complets, partiels et soldes restants.

---

## 1. Pourquoi cette spec existe

Le modèle actuel basé sur :

```txt
isPaid: true / false
```

est insuffisant.

Dans la réalité terrain, beaucoup de clients ne paient pas toujours en une seule fois.

Exemple :

```txt
Total dû : 2 000 G
Paiement aujourd’hui : 1 000 G
Paiement semaine suivante : 300 G
Solde restant : 700 G
```

Synkro v2 doit donc gérer les paiements comme une série d’événements, pas comme un simple statut.

---

## 2. Objectif produit

Le système de paiement v2 doit permettre de répondre clairement à ces questions :

- Combien le client devait-il au départ ?
- Combien a-t-il déjà payé ?
- Combien reste-t-il à payer ?
- Quand chaque paiement a-t-il été fait ?
- Qui a enregistré le paiement ?
- Quelle méthode de paiement a été utilisée ?
- Peut-on générer un reçu pour chaque paiement ?
- La vente ou consultation est-elle payée, partielle ou impayée ?

---

## 3. Principe central

> Un paiement est une preuve.  
> Il doit être permanent, horodaté et traçable.

Un paiement ne doit pas être traité comme une simple modification de statut.

---

## 4. Statuts de paiement

### 4.1 Statuts recommandés

```txt
UNPAID
PARTIAL
PAID
OVERDUE
CANCELLED
```

### 4.2 Signification

| Statut      | Signification                                |
| ----------- | -------------------------------------------- |
| `UNPAID`    | aucun paiement enregistré                    |
| `PARTIAL`   | au moins un paiement, mais solde restant > 0 |
| `PAID`      | total payé >= total dû                       |
| `OVERDUE`   | solde restant > 0 et échéance dépassée       |
| `CANCELLED` | vente/consultation annulée                   |

---

## 5. Modèle de données recommandé

### 5.1 Nouveau modèle Payment

```prisma
model Payment {
  id            String   @id @default(cuid())
  entrepriseId String
  saleId        String?
  consultationId String?

  amount        Float
  currency      String
  method        PaymentMethod?
  note          String?

  recordedById  String?
  recordedAt    DateTime @default(now())

  receiptNumber String?  @unique

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  entreprise    Entreprise @relation(fields: [entrepriseId], references: [id], onDelete: Cascade)
  sale          Sale?      @relation(fields: [saleId], references: [id], onDelete: Cascade)
  consultation  Consultation? @relation(fields: [consultationId], references: [id], onDelete: Cascade)
  recordedBy    User?     @relation(fields: [recordedById], references: [id])
}
```

---

### 5.2 PaymentMethod enum

```prisma
enum PaymentMethod {
  CASH
  MONCASH
  CARD
  BANK_TRANSFER
  CHECK
  OTHER
}
```

Labels UI recommandés :

| Enum            | Label    |
| --------------- | -------- |
| `CASH`          | Cash     |
| `MONCASH`       | MonCash  |
| `CARD`          | Carte    |
| `BANK_TRANSFER` | Virement |
| `CHECK`         | Chèque   |
| `OTHER`         | Autre    |

---

### 5.3 PaymentStatus enum

```prisma
enum PaymentStatus {
  UNPAID
  PARTIAL
  PAID
  OVERDUE
  CANCELLED
}
```

---

## 6. Modifications Sale

### 6.1 Avant

```prisma
isPaid Boolean
```

### 6.2 Après

```prisma
paymentStatus PaymentStatus @default(UNPAID)
payments      Payment[]
dueDate       DateTime?
```

### 6.3 Champs financiers

Conserver :

```prisma
totalAmount Float
```

Ajouter éventuellement :

```prisma
paidAmountCache Float @default(0)
remainingAmountCache Float @default(0)
```

### 6.4 Note sur les caches

Les champs cache peuvent améliorer la performance.

Mais la source de vérité doit rester :

```txt
sum(payments.amount)
```

Si des caches existent, ils doivent être recalculés après chaque création de paiement.

---

## 7. Modifications Consultation

Même logique que `Sale`.

```prisma
paymentStatus PaymentStatus @default(UNPAID)
payments      Payment[]
dueDate       DateTime?
```

---

## 8. Règles métier

### 8.1 Calcul du montant payé

```ts
const paidAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
```

### 8.2 Calcul du solde restant

```ts
const remainingAmount = Math.max(totalAmount - paidAmount, 0);
```

### 8.3 Calcul du statut

```ts
function getPaymentStatus(
  totalAmount: number,
  paidAmount: number,
): PaymentStatus {
  if (paidAmount <= 0) return "UNPAID";
  if (paidAmount < totalAmount) return "PARTIAL";
  return "PAID";
}
```

### 8.4 Overdue

Si une date d’échéance existe :

```ts
if (remainingAmount > 0 && dueDate < today) {
  return "OVERDUE";
}
```

### 8.5 Montant supérieur au solde

Par défaut, empêcher un paiement supérieur au solde.

Message :

```txt
Le montant reçu dépasse le solde restant.
```

Option future :

- autoriser avec confirmation ;
- enregistrer comme avance client ;
- gérer crédit client.

Pour v2 initiale, rester simple :

> paiement maximum = solde restant.

---

## 9. Règles d’immutabilité

### 9.1 Paiement non modifiable

Un paiement enregistré ne doit pas être modifié directement.

Raison :

- confiance ;
- preuve ;
- audit ;
- cohérence documents.

### 9.2 Correction d’erreur

Si erreur :

- créer une annulation ;
- ou créer un paiement négatif contrôlé ;
- ou marquer le paiement comme annulé avec raison.

Pour v2 initiale, recommandation :

```txt
Payment.status: ACTIVE | VOIDED
voidReason
voidedAt
voidedById
```

### 9.3 Extension modèle

```prisma
enum PaymentRecordStatus {
  ACTIVE
  VOIDED
}
```

```prisma
status     PaymentRecordStatus @default(ACTIVE)
voidReason String?
voidedAt   DateTime?
voidedById String?
```

---

## 10. Migration depuis isPaid

### 10.1 Objectif

Migrer les données existantes sans perdre la logique actuelle.

### 10.2 Règles

Pour chaque `Sale` :

#### Si `isPaid = true`

Créer un paiement initial :

```txt
amount = sale.totalAmount
currency = sale.currency ou entreprise.currency
method = OTHER
note = "Paiement initial migré depuis l’ancien système"
recordedAt = sale.createdAt ou now
```

Définir :

```txt
paymentStatus = PAID
```

#### Si `isPaid = false`

Ne créer aucun paiement.

Définir :

```txt
paymentStatus = UNPAID
```

Même logique pour `Consultation`.

---

## 11. Numérotation des reçus

Chaque paiement peut générer un reçu.

Format recommandé :

```txt
REC-{TAG}-{YEAR}-{NUMBER}
```

Exemple :

```txt
REC-A1B2C3-2026-0001
```

Où :

```txt
TAG = 6 derniers caractères de entrepriseId
YEAR = année courante
NUMBER = compteur séquentiel
```

---

## 12. UI — Détail vente

Le détail vente doit devenir la page principale de gestion du paiement.

### 12.1 Structure recommandée

```txt
Header
  Numéro vente
  Statut paiement

Résumé paiement
  Total
  Déjà payé
  Reste à payer

Actions
  Ajouter paiement
  Générer reçu
  Envoyer WhatsApp

Paiements
  Timeline des paiements

Articles
  Liste des produits/services

Informations
  Client
  Date
  Méthode
  Employé
```

---

### 12.2 Exemple visuel texte

```txt
Vente SALE-2026-0001
Partiel

Total
2 000 G

Déjà payé
1 300 G

Reste à payer
700 G

[ Ajouter paiement ]
[ Envoyer reçu ]
```

---

## 13. UI — Ajouter paiement

### 13.1 Champs

```txt
Montant reçu
Méthode de paiement
Date
Note optionnelle
```

### 13.2 Informations visibles

Avant validation :

```txt
Solde actuel : 700 G
Montant reçu : 300 G
Solde après paiement : 400 G
```

### 13.3 Bouton

```txt
Ajouter le paiement
```

### 13.4 Après succès

```txt
Paiement ajouté.
Solde restant : 400 G.
```

Actions :

```txt
Générer reçu
Envoyer par WhatsApp
Voir la vente
```

---

## 14. UI — Liste ventes

La liste ventes doit afficher le statut de paiement clairement.

### 14.1 Colonnes desktop

```txt
Numéro
Client
Date
Montant total
Payé
Solde
Statut
Actions
```

### 14.2 Mobile list

```txt
Client ou numéro vente
Date · Méthode
Total : 2 000 G
Reste : 700 G
Partiel
```

---

## 15. UI — Clients

La page clients doit mettre en avant les soldes dus.

### 15.1 Métriques client

```txt
Total acheté
Total payé
Solde dû
Dernier paiement
Nombre de ventes
```

### 15.2 Priorité

Les clients avec solde dû doivent être faciles à trouver.

Filtres :

```txt
Tous
Avec dette
Payés
```

---

## 16. UI — Dashboard

Le dashboard doit afficher les dettes comme un signal important.

Widgets possibles :

```txt
Paiements en attente
Montant total dû
Paiements reçus aujourd’hui
Clients avec dette
```

Exemple :

```txt
À suivre
3 clients doivent encore payer
Total dû : 4 700 G
```

---

## 17. UI — Finance

La page finance doit distinguer :

- ventes totales ;
- paiements réellement reçus ;
- créances restantes.

Important :

```txt
Une vente impayée ne doit pas être confondue avec cash reçu.
```

### 17.1 Recommandation

Afficher deux notions :

```txt
Chiffre d’affaires
Encaissements reçus
```

Exemple :

```txt
Ventes émises : 20 000 G
Paiements reçus : 15 000 G
Reste à encaisser : 5 000 G
```

---

## 18. UI — Rapports

Les rapports doivent inclure :

- total vendu ;
- total encaissé ;
- solde restant ;
- ventes partiellement payées ;
- ventes impayées ;
- évolution des paiements reçus.

Rapport mensuel recommandé :

```txt
Ventes du mois
Encaissements reçus
Créances ouvertes
Dépenses
Bénéfice estimé
```

---

## 19. Reçus de paiement

### 19.1 Reçu complet

Si le paiement solde la vente :

```txt
Statut : Payé
Solde restant : 0 G
```

### 19.2 Reçu partiel

Si le paiement ne solde pas la vente :

```txt
Statut : Partiel
Montant payé aujourd’hui : 300 G
Déjà payé : 1 300 G
Solde restant : 700 G
```

### 19.3 Champs requis

```txt
Entreprise
Client
Numéro reçu
Numéro vente
Date paiement
Montant payé
Méthode
Total vente
Déjà payé
Solde restant
Statut
Émis par
```

---

## 20. WhatsApp

Après un paiement, proposer :

```txt
Envoyer le reçu par WhatsApp
```

Message recommandé :

```txt
Bonjour [Client], voici votre reçu de paiement pour la vente [SALE_NUMBER].

Montant payé : [AMOUNT]
Solde restant : [REMAINING]
Merci.
```

Pour un paiement complet :

```txt
Montant payé : [AMOUNT]
Statut : Payé
Merci.
```

---

## 21. Permissions

### 21.1 Ajouter paiement

Permissions recommandées :

```txt
payments:create
```

### 21.2 Annuler paiement

Permission stricte :

```txt
payments:void
```

### 21.3 Voir paiements

```txt
payments:read
```

### 21.4 Règle

Un caissier peut ajouter un paiement, mais ne devrait pas pouvoir l’annuler sans permission.

---

## 22. Audit log

Chaque paiement doit créer un audit log.

### 22.1 Actions

```txt
PAYMENT_CREATED
PAYMENT_VOIDED
SALE_PAYMENT_STATUS_UPDATED
CONSULTATION_PAYMENT_STATUS_UPDATED
```

### 22.2 Metadata

```json
{
  "paymentId": "...",
  "amount": 300,
  "currency": "HTG",
  "saleId": "...",
  "previousStatus": "PARTIAL",
  "newStatus": "PAID"
}
```

---

## 23. Server actions

### 23.1 createPayment

Responsabilités :

- vérifier session ;
- vérifier entreprise ;
- vérifier permission ;
- vérifier vente ou consultation ;
- calculer solde restant ;
- valider montant ;
- créer paiement ;
- recalculer statut ;
- générer numéro reçu ;
- créer audit log ;
- revalidate paths ;
- retourner succès ou erreur humaine.

### 23.2 Pseudo-code

```ts
export async function createPayment(input: CreatePaymentInput) {
  const session = await requireSession()

  const entity = await getSaleOrConsultation(input)

  const remaining = calculateRemaining(entity.totalAmount, entity.payments)

  if (input.amount <= 0) {
    return { error: "Le montant doit être supérieur à 0." }
  }

  if (input.amount > remaining) {
    return { error: "Le montant reçu dépasse le solde restant." }
  }

  const payment = await prisma.payment.create(...)

  const newPaidAmount = paidAmount + input.amount
  const newStatus = getPaymentStatus(entity.totalAmount, newPaidAmount)

  await updateEntityStatus(newStatus)
  await createAuditLog(...)
  revalidatePath(...)

  return { success: true, payment }
}
```

---

## 24. Validation

### 24.1 CreatePaymentInput

```ts
const createPaymentSchema = z.object({
  saleId: z.string().optional(),
  consultationId: z.string().optional(),
  amount: z.number().positive(),
  method: z
    .enum(["CASH", "MONCASH", "CARD", "BANK_TRANSFER", "CHECK", "OTHER"])
    .optional(),
  note: z.string().max(500).optional(),
});
```

### 24.2 Règle

Exactement un de ces champs doit être fourni :

```txt
saleId
consultationId
```

---

## 25. Anti double-clic

### 25.1 Frontend

- bouton loading ;
- disable submit ;
- toast succès ;
- éviter submit multiple.

### 25.2 Backend

Prévoir à terme :

```txt
idempotencyKey
```

Pour v2 initiale, au minimum :

- désactiver le bouton ;
- vérifier montant restant au moment serveur ;
- transaction Prisma.

---

## 26. Transactions Prisma

La création d’un paiement et la mise à jour du statut doivent être atomiques.

Utiliser :

```ts
await prisma.$transaction(async (tx) => {
  // create payment
  // update sale/consultation status
  // create audit log
});
```

---

## 27. Revalidation

Après paiement, revalider :

```txt
/dashboard
/finance
/reports
/sales
/sales/[id]
/clients
/clients/[id]
```

Pour consultation :

```txt
/dashboard
/finance
/reports
/sante
/sante/consultations
/sante/consultations/[id]
/sante/patients/[id]
```

---

## 28. Tests importants

### 28.1 Cas à tester

- paiement complet sur vente impayée ;
- paiement partiel ;
- deuxième paiement partiel ;
- paiement qui solde la vente ;
- paiement montant 0 ;
- paiement négatif ;
- paiement supérieur au solde ;
- paiement sans permission ;
- paiement sur vente inexistante ;
- paiement sur vente d’une autre entreprise ;
- double clic ;
- migration ancienne vente payée ;
- migration ancienne vente impayée ;
- affichage client avec solde dû ;
- finance avec encaissement vs vente émise.

---

## 29. Impact sur pricing

Le paiement partiel peut être disponible dès Free/Trial.

Mais certains éléments peuvent être paywall :

```txt
PDF reçu
Historique illimité
Rapport comptes clients
Export créances
Multi-utilisateurs
```

Recommandation :

- ajout paiement : disponible ;
- suivi solde : disponible ;
- reçu PDF : paywall Starter+ ou trial ;
- rapports avancés créances : Pro+.

---

## 30. Impact sur business

Cette fonctionnalité peut devenir un des principaux leviers d’adoption.

Pourquoi ?

Parce qu’elle répond à une réalité forte :

```txt
Les clients paient souvent par morceaux.
Les commerçants ont besoin de savoir clairement qui doit quoi.
```

Si Synkro réussit ça simplement, le produit devient beaucoup plus difficile à abandonner.

---

## 31. Définition du succès

La feature est réussie si :

- un marchand comprend immédiatement le statut d’une vente ;
- un paiement partiel peut être ajouté en moins de 30 secondes ;
- le solde restant est toujours clair ;
- le client peut recevoir un reçu propre ;
- les dettes sont visibles dans Clients et Dashboard ;
- les rapports distinguent ventes et encaissements ;
- aucun paiement ne disparaît sans trace.

---

## 32. Phrase directrice

> Dans Synkro, un paiement n’est pas seulement un montant.  
> C’est une preuve de confiance.
