// app/(dashboard)/sales/[id]/edit/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateSale, deleteSale } from "../../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DeleteButton } from "@/components/delete-button"
import { CurrencyLabel } from "@/components/currency-label"

export default async function EditSalePage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Non autorisé</div>
  }

  const sale = await db.sale.findFirst({
    where: {
      id: params.id,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!sale) {
    notFound()
  }

  // Calculer le taux de TVA à partir du montant
  const taxRate = sale.subtotal > 0 ? (sale.taxAmount / sale.subtotal) * 100 : 0

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/sales">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier la vente</h1>
          <p className="text-gray-600 mt-1">{sale.saleNumber}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la vente</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSale.bind(null, sale.id)} className="space-y-6">
            {/* Nom du client */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Nom du client *</Label>
              <Input
                id="customerName"
                name="customerName"
                type="text"
                defaultValue={sale.customerName || ""}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>

            {/* Montant */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtotal">
                  <CurrencyLabel>Montant HT (HTG) *</CurrencyLabel>
                </Label>
                <Input
                  id="subtotal"
                  name="subtotal"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={sale.subtotal}
                  placeholder="1000.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">TVA (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={taxRate.toFixed(2)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">
                  <CurrencyLabel>Remise (HTG)</CurrencyLabel>
                </Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={sale.discount}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Paiement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Méthode de paiement *</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  defaultValue={sale.paymentMethod}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="CASH">Espèces</option>
                  <option value="CARD">Carte bancaire</option>
                  <option value="BANK_TRANSFER">Virement bancaire</option>
                  <option value="CHECK">Chèque</option>
                  <option value="MOBILE_PAYMENT">Paiement mobile</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Statut de paiement *</Label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  defaultValue={sale.paymentStatus}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="PAID">Payé</option>
                  <option value="PENDING">En attente</option>
                  <option value="PARTIAL">Partiel</option>
                  <option value="OVERDUE">En retard</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                defaultValue={sale.notes || ""}
                placeholder="Notes additionnelles..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Enregistrer les modifications
              </Button>
              <Link href="/sales" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>

          {/* Bouton de suppression */}
          <div className="mt-8 pt-8 border-t">
            <DeleteButton
              action={async () => {
                "use server"
                await deleteSale(sale.id)
              }}
              itemName={sale.saleNumber}
              itemType="vente"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}