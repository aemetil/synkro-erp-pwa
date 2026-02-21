// app/(dashboard)/sales/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { CurrencyAmount } from "@/components/currency-amount"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import Link from "next/link"

const STATUS_LABEL: Record<string, { label: string; short: string; color: string }> = {
  PAID:    { label: "Payé",       short: "Payé",    color: "bg-green-100 text-green-800" },
  PENDING: { label: "En attente", short: "Attente", color: "bg-yellow-100 text-yellow-800" },
  PARTIAL: { label: "Partiel",    short: "Partiel", color: "bg-orange-100 text-orange-800" },
  OVERDUE: { label: "En retard",  short: "Retard",  color: "bg-red-100 text-red-800" },
}

export default async function SalesPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) return <div>Erreur: Entreprise non trouvée</div>

  const sales = await db.sale.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    orderBy: { date: "desc" },
  })

  const stats = await db.sale.aggregate({
    where: { entrepriseId: session.user.entrepriseId },
    _sum: { total: true, paidAmount: true },
    _count: true,
  })

  const unpaid = (stats._sum.total || 0) - (stats._sum.paidAmount || 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Ventes</h1>
          <p className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">Gérez toutes vos ventes et factures</p>
        </div>
        <Link href="/sales/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Nouvelle vente</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-6 mb-4 md:mb-8">
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Total ventes</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold break-all"><CurrencyAmount amount={stats._sum.total || 0} /></div>
            <p className="text-xs text-gray-500 mt-0.5 hidden md:block">{stats._count} vente{stats._count > 1 ? "s" : ""}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Encaissé</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold text-green-600 break-all"><CurrencyAmount amount={stats._sum.paidAmount || 0} /></div>
            <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Payé</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Impayés</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold text-red-600 break-all"><CurrencyAmount amount={unpaid} /></div>
            <p className="text-xs text-gray-500 mt-0.5 hidden md:block">En attente</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Liste des ventes</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucune vente enregistrée</p>
              <Link href="/sales/new">
                <Button><Plus className="h-4 w-4 mr-2" />Créer votre première vente</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">N°</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Client</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Montant</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Payé</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Paiement</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.map((sale) => {
                    const status = STATUS_LABEL[sale.paymentStatus] ?? { label: sale.paymentStatus, short: sale.paymentStatus, color: "bg-gray-100 text-gray-800" }
                    return (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 md:py-4 md:px-0 text-xs md:text-sm font-medium whitespace-nowrap">{sale.saleNumber}</td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm">
                          <span className="block max-w-[70px] md:max-w-none truncate">{sale.customerName || "-"}</span>
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell whitespace-nowrap">
                          {new Date(sale.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm font-semibold whitespace-nowrap">
                          <CurrencyAmount amount={sale.total} />
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-green-600 hidden md:table-cell whitespace-nowrap">
                          <CurrencyAmount amount={sale.paidAmount} />
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            <span className="md:hidden">{status.short}</span>
                            <span className="hidden md:inline">{status.label}</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell">{sale.paymentMethod}</td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2">
                          <Link href={`/sales/${sale.id}/edit`}>
                            <Button variant="outline" size="sm" className="h-7 w-7 p-0 md:h-9 md:w-auto md:px-3">
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="hidden md:inline ml-1">Modifier</span>
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
