// app/(dashboard)/commerce/stock/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { notFound } from "next/navigation"

export default async function StockPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) notFound()

  const movements = await db.stockMovement.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    include: { product: { select: { name: true, productCode: true, unit: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  function getMovementBadge(type: string) {
    const badges = { IN: "bg-green-100 text-green-800", OUT: "bg-red-100 text-red-800", ADJUSTMENT: "bg-blue-100 text-blue-800" }
    const labels = { IN: "Entrée", OUT: "Sortie", ADJUSTMENT: "Ajust." }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badges[type as keyof typeof badges] || badges.ADJUSTMENT}`}>
        {labels[type as keyof typeof labels] || type}
      </span>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Mouvements de stock</h1>
        <p className="text-xs md:text-sm text-gray-600">Historique des entrées et sorties de stock</p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Historique</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {movements.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun mouvement</h3>
              <p className="mt-1 text-sm text-gray-500">Les mouvements de stock apparaîtront ici</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Produit</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Qté</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Stock</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Raison</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {movements.map((movement) => (
                    <tr key={movement.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 md:py-4 md:px-0 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                        <span className="md:hidden">
                          {new Date(movement.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                        </span>
                        <span className="hidden md:inline">
                          {new Date(movement.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2">
                        <div className="font-medium text-xs md:text-sm">
                          <span className="block max-w-[100px] md:max-w-none truncate">{movement.product.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 hidden md:block">{movement.product.productCode}</div>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2">{getMovementBadge(movement.type)}</td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 whitespace-nowrap">
                        <span className={`text-xs md:text-sm font-medium ${movement.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                          {movement.type === "IN" ? "+" : ""}{movement.quantity}
                          <span className="hidden md:inline"> {movement.product.unit}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm hidden md:table-cell whitespace-nowrap">
                        <span className="text-gray-500">{movement.previousStock}</span>{" → "}
                        <span className="font-medium">{movement.newStock}</span>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell">
                        {movement.reason || "-"}
                        {movement.reference && <div className="text-xs text-gray-400">{movement.reference}</div>}
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
