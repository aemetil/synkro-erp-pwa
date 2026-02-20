// app/(dashboard)/finance/new/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createExpense } from "../../sales/actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CurrencyLabel } from "@/components/currency-label"

export default function NewExpensePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/finance">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle dépense</h1>
          <p className="text-gray-600 mt-1">Enregistrer une nouvelle dépense</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la dépense</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createExpense} className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Ex: Achat de fournitures"
                required
              />
            </div>

            {/* Montant et Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">
                  <CurrencyLabel>Montant (HTG) *</CurrencyLabel>
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="500.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <select
                  id="category"
                  name="category"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="RENT">Loyer</option>
                  <option value="SALARIES">Salaires</option>
                  <option value="SUPPLIES">Fournitures</option>
                  <option value="UTILITIES">Services publics</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="EQUIPMENT">Équipement</option>
                  <option value="INSURANCE">Assurance</option>
                  <option value="TAXES">Taxes</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>
            </div>

            {/* Fournisseur et Paiement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplierName">Fournisseur</Label>
                <Input
                  id="supplierName"
                  name="supplierName"
                  type="text"
                  placeholder="Nom du fournisseur"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Méthode de paiement *</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
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
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Notes additionnelles..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Créer la dépense
              </Button>
              <Link href="/finance" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}