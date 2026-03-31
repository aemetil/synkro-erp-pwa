// app/(dashboard)/commerce/products/[id]/edit/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateProduct, deleteProduct, adjustProductStock } from "../../actions"
import { notFound } from "next/navigation"
import { DeleteButton } from "@/components/delete-button"
import { CurrencyLabel } from "@/components/currency-label"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  // Get product
  const product = await db.product.findFirst({
    where: {
      id: params.id,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      category: true,
      stockMovements: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  })

  if (!product) {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/commerce/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Modifier le produit</h1>
          <p className="text-gray-600">{product.productCode}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du produit</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateProduct.bind(null, product.id)} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-700">
                    Informations générales
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Nom du produit *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        defaultValue={product.name}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={product.description || ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="categoryId">Catégorie</Label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={product.categoryId || ""}
                      >
                        <option value="">Sans catégorie</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="unit">Unité</Label>
                      <select
                        id="unit"
                        name="unit"
                        defaultValue={product.unit}
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
                        defaultValue={product.costPrice}
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
                        defaultValue={product.sellingPrice}
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
                        defaultValue={product.taxRate}
                      />
                    </div>
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-medium text-sm text-gray-700">
                    Gestion du stock
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Stock actuel</Label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                        <span className="font-medium">{product.currentStock}</span>{" "}
                        {product.unit}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Utilisez le formulaire d'ajustement ci-dessous
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="minStockLevel">Seuil d'alerte</Label>
                      <Input
                        id="minStockLevel"
                        name="minStockLevel"
                        type="number"
                        min="0"
                        defaultValue={product.minStockLevel}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-medium text-sm text-gray-700">
                    Informations supplémentaires
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        name="sku"
                        type="text"
                        defaultValue={product.sku || ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="barcode">Code-barres</Label>
                      <Input
                        id="barcode"
                        name="barcode"
                        type="text"
                        defaultValue={product.barcode || ""}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="isActive" className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          value="true"
                          defaultChecked={product.isActive}
                          className="rounded border-gray-300"
                        />
                        Produit actif
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        Les produits inactifs n'apparaissent pas dans les listes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 border-t pt-6">
                  <Button type="submit">Enregistrer les modifications</Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/commerce/products">Annuler</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Delete Section */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zone de danger</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                La suppression désactivera ce produit. Il n'apparaîtra plus dans les
                listes mais les données historiques seront conservées.
              </p>
              <DeleteButton
                action={deleteProduct.bind(null, product.id)}
                itemName={product.name}
                itemType="produit"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stock Adjustment */}
          <Card>
            <CardHeader>
              <CardTitle>Ajuster le stock</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={adjustProductStock.bind(null, product.id)} className="space-y-4">
                <div>
                  <Label htmlFor="adjustment">Ajustement</Label>
                  <Input
                    id="adjustment"
                    name="adjustment"
                    type="number"
                    required
                    placeholder="Ex: +10 ou -5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisez + pour ajouter, - pour retirer
                  </p>
                </div>

                <div>
                  <Label htmlFor="reason">Raison</Label>
                  <select
                    id="reason"
                    name="reason"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Achat">Achat</option>
                    <option value="Retour client">Retour client</option>
                    <option value="Perte">Perte</option>
                    <option value="Vol">Vol</option>
                    <option value="Inventaire">Inventaire</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  Ajuster le stock
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Mouvements récents</CardTitle>
            </CardHeader>
            <CardContent>
              {product.stockMovements.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun mouvement</p>
              ) : (
                <div className="space-y-3">
                  {product.stockMovements.map((movement) => (
                    <div
                      key={movement.id}
                      className="text-sm border-b last:border-0 pb-3 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            movement.type === "IN"
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {movement.type === "IN" ? "+" : ""}
                          {movement.quantity}
                        </span>
                        <span className="text-gray-500">
                          {movement.previousStock} → {movement.newStock}
                        </span>
                      </div>
                      {movement.reason && (
                        <p className="text-gray-600 mt-1">{movement.reason}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(movement.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
