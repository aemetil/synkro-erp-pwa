// app/(dashboard)/commerce/products/new/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createProduct } from "../actions"
import { notFound } from "next/navigation"
import { CurrencyLabel } from "@/components/currency-label"

export default async function NewProductPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  // Get categories for dropdown
  const categories = await db.productCategory.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/commerce/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nouveau produit</h1>
          <p className="text-gray-600">Ajoutez un nouveau produit à votre catalogue</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProduct} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Informations générales</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ex: Coca-Cola 350ml"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description du produit"
                  />
                </div>

                <div>
                  <Label htmlFor="categoryId">Catégorie</Label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sans catégorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {categories.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      <Link href="/commerce/categories/new" className="text-blue-600 hover:underline">
                        Créer une catégorie
                      </Link>
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="unit">Unité</Label>
                  <select
                    id="unit"
                    name="unit"
                    defaultValue="pcs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pcs">Pièce(s)</option>
                    <option value="kg">Kilogramme(s)</option>
                    <option value="l">Litre(s)</option>
                    <option value="m">Mètre(s)</option>
                    <option value="box">Boîte(s)</option>
                    <option value="pack">Pack(s)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Prix</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="costPrice">
                    <CurrencyLabel>Prix d'achat (HTG)</CurrencyLabel>
                  </Label>
                  <Input
                    id="costPrice"
                    name="costPrice"
                    type="number"
                    step="any"
                    min="0"
                    defaultValue="0"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="sellingPrice">
                    <CurrencyLabel>Prix de vente (HTG) *</CurrencyLabel>
                  </Label>
                  <Input
                    id="sellingPrice"
                    name="sellingPrice"
                    type="number"
                    step="any"
                    min="0"
                    required
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="taxRate">Taux de taxe (%)</Label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    type="number"
                    step="any"
                    min="0"
                    max="100"
                    defaultValue="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Gestion du stock</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStock">Stock initial</Label>
                  <Input
                    id="currentStock"
                    name="currentStock"
                    type="number"
                    min="0"
                    defaultValue="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="minStockLevel">Seuil d'alerte</Label>
                  <Input
                    id="minStockLevel"
                    name="minStockLevel"
                    type="number"
                    min="0"
                    defaultValue="5"
                    placeholder="5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vous serez alerté quand le stock atteint ce niveau
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Informations supplémentaires</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    type="text"
                    placeholder="Code article interne"
                  />
                </div>

                <div>
                  <Label htmlFor="barcode">Code-barres</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    type="text"
                    placeholder="EAN, UPC, etc."
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 border-t pt-6">
              <Button type="submit">Créer le produit</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/commerce/products">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
