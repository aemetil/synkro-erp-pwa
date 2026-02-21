"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Loader2 } from "lucide-react"

type Product = {
  id: string
  name: string
  sellingPrice: number
  currentStock: number
  unit: string
}

type SaleItem = {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  availableStock: number
  unit: string
}

type Props = {
  products: Product[]
  onSubmit: (data: FormData) => Promise<void>
}

export function SaleFormWithProducts({ products, onSubmit }: Props) {
  const [items, setItems] = useState<SaleItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("CASH")
  const [paymentStatus, setPaymentStatus] = useState("PAID")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const addItem = () => {
    if (products.length === 0) return

    const firstProduct = products[0]
    setItems([
      ...items,
      {
        productId: firstProduct.id,
        productName: firstProduct.name,
        quantity: 1,
        unitPrice: firstProduct.sellingPrice,
        availableStock: firstProduct.currentStock,
        unit: firstProduct.unit,
      },
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]

    if (field === "productId") {
      const product = products.find((p) => p.id === value)
      if (product) {
        newItems[index] = {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.sellingPrice,
          availableStock: product.currentStock,
          unit: product.unit,
        }
      }
    } else if (field === "quantity") {
      newItems[index].quantity = parseInt(value) || 0
    } else if (field === "unitPrice") {
      newItems[index].unitPrice = parseFloat(value) || 0
    }

    setItems(newItems)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (items.length === 0) {
      setError("Veuillez ajouter au moins un produit")
      return
    }

    if (!customerName.trim()) {
      setError("Le nom du client est requis")
      return
    }

    // Check stock availability
    for (const item of items) {
      if (item.quantity > item.availableStock) {
        setError(
          `Stock insuffisant pour ${item.productName}. Disponible: ${item.availableStock} ${item.unit}`
        )
        return
      }
    }

    const formData = new FormData()
    formData.append("customerName", customerName)
    formData.append("paymentMethod", paymentMethod)
    formData.append("paymentStatus", paymentStatus)
    formData.append("notes", notes)
    formData.append("items", JSON.stringify(items))

    startTransition(async () => {
      try {
        await onSubmit(formData)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Une erreur est survenue. Veuillez réessayer.")
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations client</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nom du client *</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex: Jean Dupont"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Produits</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              disabled={products.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucun produit disponible. Créez des produits dans Commerce → Produits
            </p>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-500">
              Cliquez sur "Ajouter un produit" pour commencer
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-end border-b pb-4 last:border-0"
                >
                  {/* Product Select */}
                  <div className="col-span-12 md:col-span-4 space-y-2">
                    <Label>Produit</Label>
                    <select
                      value={item.productId}
                      onChange={(e) =>
                        updateItem(index, "productId", e.target.value)
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.currentStock} {product.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-4 md:col-span-2 space-y-2">
                    <Label>Quantité</Label>
                    <Input
                      type="number"
                      min="1"
                      max={item.availableStock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", e.target.value)
                      }
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-4 md:col-span-2 space-y-2">
                    <Label>Prix unitaire</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(index, "unitPrice", e.target.value)
                      }
                    />
                  </div>

                  {/* Total */}
                  <div className="col-span-3 md:col-span-3 space-y-2">
                    <Label>Total</Label>
                    <div className="flex h-10 items-center rounded-md border border-input bg-gray-50 px-3 text-sm font-medium">
                      {(item.quantity * item.unitPrice).toFixed(2)} HTG
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-1 md:col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-end pt-4 border-t">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Sous-total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {calculateSubtotal().toFixed(2)} HTG
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <CardTitle>Paiement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Méthode de paiement *</Label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
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
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="PAID">Payé</option>
                <option value="PENDING">En attente</option>
                <option value="PARTIAL">Partiel</option>
                <option value="OVERDUE">En retard</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Notes additionnelles..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <Button type="submit" className="flex-1" disabled={items.length === 0 || isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Création en cours...
            </>
          ) : (
            "Créer la vente"
          )}
        </Button>
        <Button type="button" variant="outline" className="flex-1" disabled={isPending}>
          Annuler
        </Button>
      </div>
    </form>
  )
}