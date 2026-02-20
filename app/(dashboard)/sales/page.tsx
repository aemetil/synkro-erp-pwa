// app/(dashboard)/sales/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import { CurrencyAmount } from "@/components/currency-amount"
import { Button } from "@/components/ui/button"
import { Plus, Search, Pencil } from "lucide-react"
import Link from "next/link"

export default async function SalesPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  const sales = await db.sale.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    orderBy: { date: "desc" },
  })

  const stats = await db.sale.aggregate({
    where: { entrepriseId: session.user.entrepriseId },
    _sum: {
      total: true,
      paidAmount: true,
    },
    _count: true,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventes</h1>
          <p className="text-gray-600 mt-2">
            Gérez toutes vos ventes et factures
          </p>
        </div>
        <Link href="/sales/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle vente
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total des ventes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold break-words">
              <CurrencyAmount amount={stats._sum.total || 0} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {stats._count} vente{stats._count > 1 ? "s" : ""} au total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Montant payé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600 break-words">
              <CurrencyAmount amount={stats._sum.paidAmount || 0} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Encaissé
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Impayés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600 break-words">
              <CurrencyAmount amount={(stats._sum.total || 0) - (stats._sum.paidAmount || 0)} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              En attente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des ventes</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucune vente enregistrée</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer votre première vente
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Numéro</th>
                    <th className="pb-3 font-medium">Client</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Montant</th>
                    <th className="pb-3 font-medium">Payé</th>
                    <th className="pb-3 font-medium">Statut</th>
                    <th className="pb-3 font-medium">Paiement</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 text-sm font-medium">{sale.saleNumber}</td>
                      <td className="py-4 text-sm">{sale.customerName || "-"}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {new Date(sale.date).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4 text-sm font-semibold">
                        <CurrencyAmount amount={sale.total} />
                      </td>
                      <td className="py-4 text-sm text-green-600">
                        <CurrencyAmount amount={sale.paidAmount} />
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sale.paymentStatus === "PAID" ? "bg-green-100 text-green-800" :
                          sale.paymentStatus === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                          sale.paymentStatus === "PARTIAL" ? "bg-orange-100 text-orange-800" :
                          sale.paymentStatus === "OVERDUE" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {sale.paymentStatus === "PAID" ? "Payé" :
                           sale.paymentStatus === "PENDING" ? "En attente" :
                           sale.paymentStatus === "PARTIAL" ? "Partiel" :
                           sale.paymentStatus === "OVERDUE" ? "En retard" :
                           sale.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{sale.paymentMethod}</td>
                      <td className="py-4">
                        <Link href={`/sales/${sale.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                        </Link>
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
