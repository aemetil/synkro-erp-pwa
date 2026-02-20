// app/(dashboard)/commerce/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Package, AlertTriangle, TrendingUp, FolderOpen } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"
import { notFound } from "next/navigation"

export default async function CommerceDashboardPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  // Get products stats
  const products = await db.product.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
      isActive: true,
    },
    include: {
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  })

  const totalProducts = products.length
  const lowStockProducts = products.filter(
    (p) => p.currentStock <= p.minStockLevel && p.currentStock > 0
  )
  const outOfStockProducts = products.filter((p) => p.currentStock === 0)
  const totalStockValue = products.reduce(
    (sum, p) => sum + p.currentStock * p.sellingPrice,
    0
  )

  // Get categories count
  const categoriesCount = await db.productCategory.count({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
  })

  // Get recent stock movements
  const recentMovements = await db.stockMovement.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      product: {
        select: {
          name: true,
          productCode: true,
          unit: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Commerce</h1>
        <p className="text-gray-600">Gestion de votre catalogue et stock</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total produits
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">
              {categoriesCount} catégories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Stock bas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-gray-500 mt-1">Produits sous le seuil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rupture
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockProducts.length}</div>
            <p className="text-xs text-gray-500 mt-1">Produits en rupture</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Valeur stock
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold break-words">
              <CurrencyAmount amount={totalStockValue} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Valeur totale</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alertes stock</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">
                Aucune alerte de stock
              </p>
            ) : (
              <div className="space-y-3">
                {outOfStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.productCode}
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                      Rupture
                    </span>
                  </div>
                ))}
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.currentStock} {product.unit} (min:{" "}
                        {product.minStockLevel})
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
                      Stock bas
                    </span>
                  </div>
                ))}
              </div>
            )}
            {(lowStockProducts.length > 5 || outOfStockProducts.length > 5) && (
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/commerce/products">Voir tous les produits</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Recent Stock Movements */}
        <Card>
          <CardHeader>
            <CardTitle>Mouvements récents</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMovements.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">Aucun mouvement</p>
            ) : (
              <div className="space-y-3">
                {recentMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {movement.product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {movement.reason || movement.product.productCode}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${
                          movement.type === "IN"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {movement.type === "IN" ? "+" : ""}
                        {movement.quantity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {movement.newStock} {movement.product.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/commerce/stock">Voir l'historique</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button asChild className="h-auto py-4">
          <Link href="/commerce/products/new">
            <Package className="h-5 w-5 mr-2" />
            Nouveau produit
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4">
          <Link href="/commerce/categories/new">
            <FolderOpen className="h-5 w-5 mr-2" />
            Nouvelle catégorie
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4">
          <Link href="/commerce/products">
            <Package className="h-5 w-5 mr-2" />
            Gérer les produits
          </Link>
        </Button>
      </div>
    </div>
  )
}
