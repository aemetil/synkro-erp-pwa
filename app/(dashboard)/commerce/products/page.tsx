// app/(dashboard)/commerce/products/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Pencil, Package } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"
import { notFound } from "next/navigation"

export default async function ProductsPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  // Get all products
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
    orderBy: {
      createdAt: "desc",
    },
  })

  // Get categories for filter (future enhancement)
  const categories = await db.productCategory.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    select: {
      id: true,
      name: true,
    },
  })

  // Calculate stats
  const totalProducts = products.length
  const lowStockCount = products.filter(
    (p) => p.currentStock > 0 && p.currentStock <= p.minStockLevel
  ).length
  const outOfStockCount = products.filter((p) => p.currentStock === 0).length
  const totalStockValue = products.reduce(
    (sum, p) => sum + p.currentStock * p.sellingPrice,
    0
  )

  // Get stock status badge
  function getStockBadge(stock: number, minLevel: number) {
    if (stock === 0) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
          Rupture
        </span>
      )
    }
    if (stock <= minLevel) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
          Bas
        </span>
      )
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
        En stock
      </span>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Produits</h1>
          <p className="text-xs md:text-base text-gray-600">Gérez votre catalogue de produits</p>
        </div>
        <Button asChild size="sm">
          <Link href="/commerce/products/new">
            <Plus className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Nouveau produit</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600">Total produits</CardTitle>
            <Package className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-lg md:text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-0.5">{categories.length} catégories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600">Stock bas</CardTitle>
            <Package className="h-3 w-3 md:h-4 md:w-4 text-yellow-600" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-lg md:text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-gray-500 mt-0.5">Sous le seuil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600">Rupture</CardTitle>
            <Package className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-lg md:text-2xl font-bold">{outOfStockCount}</div>
            <p className="text-xs text-gray-500 mt-0.5">En rupture</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600">Valeur stock</CardTitle>
            <Package className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold break-all">
              <CurrencyAmount amount={totalStockValue} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des produits</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun produit
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par créer votre premier produit.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/commerce/products/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau produit
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-xs md:text-sm text-gray-600">
                    <th className="pb-2 md:pb-3 font-medium hidden md:table-cell">Code</th>
                    <th className="pb-2 md:pb-3 font-medium">Nom</th>
                    <th className="pb-2 md:pb-3 font-medium hidden md:table-cell">Catégorie</th>
                    <th className="pb-2 md:pb-3 font-medium">Prix</th>
                    <th className="pb-2 md:pb-3 font-medium">Stock</th>
                    <th className="pb-2 md:pb-3 font-medium">Statut</th>
                    <th className="pb-2 md:pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-2.5 md:py-4 text-xs md:text-sm font-medium hidden md:table-cell">
                        {product.productCode}
                      </td>
                      <td className="py-2.5 md:py-4">
                        <div className="font-medium text-xs md:text-sm truncate max-w-[120px] md:max-w-xs">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 hidden md:block">
                          {product.productCode}
                        </div>
                      </td>
                      <td className="py-2.5 md:py-4 hidden md:table-cell">
                        {product.category ? (
                          <span
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: `${product.category.color || '#6b7280'}20`,
                              color: product.category.color || '#6b7280',
                            }}
                          >
                            {product.category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-2.5 md:py-4 text-xs md:text-sm">
                        <CurrencyAmount amount={product.sellingPrice} />
                      </td>
                      <td className="py-2.5 md:py-4 text-xs md:text-sm">
                        <div className="font-medium">
                          {product.currentStock} <span className="text-gray-500">{product.unit}</span>
                        </div>
                        <div className="text-xs text-gray-400 hidden md:block">
                          Min: {product.minStockLevel}
                        </div>
                      </td>
                      <td className="py-2.5 md:py-4">
                        {getStockBadge(product.currentStock, product.minStockLevel)}
                      </td>
                      <td className="py-2.5 md:py-4 text-right">
                        <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0 md:h-9 md:w-9">
                          <Link href={`/commerce/products/${product.id}/edit`}>
                            <Pencil className="h-3 w-3 md:h-4 md:w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
