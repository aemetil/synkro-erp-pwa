// app/(dashboard)/commerce/stock/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { notFound } from "next/navigation"

export default async function StockPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const movements = await db.stockMovement.findMany({
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
    take: 100,
  })

  function getMovementBadge(type: string) {
    const badges = {
      IN: "bg-green-100 text-green-800",
      OUT: "bg-red-100 text-red-800",
      ADJUSTMENT: "bg-blue-100 text-blue-800",
    }
    const labels = {
      IN: "Entrée",
      OUT: "Sortie",
      ADJUSTMENT: "Ajustement",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badges[type as keyof typeof badges] || badges.ADJUSTMENT}`}>
        {labels[type as keyof typeof labels] || type}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mouvements de stock</h1>
        <p className="text-gray-600">Historique des entrées et sorties de stock</p>
      </div>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          {movements.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun mouvement
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Les mouvements de stock apparaîtront ici
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Produit</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Quantité</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Raison</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((movement) => (
                    <tr
                      key={movement.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-4 text-sm">
                        {new Date(movement.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-medium">{movement.product.name}</div>
                          <div className="text-sm text-gray-500">
                            {movement.product.productCode}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{getMovementBadge(movement.type)}</td>
                      <td className="py-4">
                        <span
                          className={`font-medium ${
                            movement.type === "IN"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {movement.type === "IN" ? "+" : ""}
                          {movement.quantity} {movement.product.unit}
                        </span>
                      </td>
                      <td className="py-4 text-sm">
                        <span className="text-gray-500">{movement.previousStock}</span>
                        {" → "}
                        <span className="font-medium">{movement.newStock}</span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {movement.reason || "-"}
                        {movement.reference && (
                          <div className="text-xs text-gray-400">
                            {movement.reference}
                          </div>
                        )}
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
