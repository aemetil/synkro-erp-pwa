// app/(dashboard)/customers/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { CurrencyAmount } from "@/components/currency-amount"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

const fmt = (d: Date) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })

export default async function CustomersPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) return <div>Erreur: Entreprise non trouvée</div>

  const sales = await db.sale.findMany({
    where: { entrepriseId: session.user.entrepriseId, customerName: { not: null } },
    select: { customerName: true, total: true, date: true },
  })

  const customerMap = new Map<string, { name: string; totalSales: number; salesCount: number; lastSale: Date }>()
  sales.forEach(sale => {
    if (sale.customerName) {
      const existing = customerMap.get(sale.customerName)
      if (existing) {
        existing.totalSales += sale.total
        existing.salesCount += 1
        if (sale.date > existing.lastSale) existing.lastSale = sale.date
      } else {
        customerMap.set(sale.customerName, { name: sale.customerName, totalSales: sale.total, salesCount: 1, lastSale: sale.date })
      }
    }
  })

  const customers = Array.from(customerMap.values()).sort((a, b) => b.totalSales - a.totalSales)
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSales, 0)
  const avgRevenue = customers.length > 0 ? totalRevenue / customers.length : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">Gérez vos clients et suivez leur historique</p>
        </div>
        <Button size="sm" disabled title="Les clients sont créés automatiquement depuis les ventes">
          <Plus className="h-4 w-4" />
          <span className="hidden md:inline ml-2">Nouveau client</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-6 mb-4 md:mb-8">
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Clients</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Moy./client</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold text-green-600 break-all">
              <CurrencyAmount amount={avgRevenue} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Total CA</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold text-purple-600 break-all">
              <CurrencyAmount amount={totalRevenue} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Liste des clients</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Aucun client enregistré</p>
              <p className="text-sm text-gray-400 mb-4">Les clients apparaîtront automatiquement via les ventes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Ventes</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">CA</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Dernière vente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 md:py-4 md:px-0">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {customer.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-medium block max-w-[80px] md:max-w-none truncate">
                            {customer.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell">
                        {customer.salesCount} vente{customer.salesCount > 1 ? "s" : ""}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm font-semibold text-green-600 whitespace-nowrap">
                        <CurrencyAmount amount={customer.totalSales} />
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell whitespace-nowrap">
                        {fmt(customer.lastSale)}
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
