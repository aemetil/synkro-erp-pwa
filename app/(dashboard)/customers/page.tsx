// app/(dashboard)/customers/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import { CurrencyAmount } from "@/components/currency-amount"
import { Button } from "@/components/ui/button"
import { Plus, Search, Users } from "lucide-react"

export default async function CustomersPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  // Get unique customers from sales
  const sales = await db.sale.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
      customerName: { not: null },
    },
    select: {
      customerName: true,
      total: true,
      date: true,
    },
  })

  // Group by customer
  const customerMap = new Map<string, { name: string; totalSales: number; salesCount: number; lastSale: Date }>()

  sales.forEach(sale => {
    if (sale.customerName) {
      const existing = customerMap.get(sale.customerName)
      if (existing) {
        existing.totalSales += sale.total
        existing.salesCount += 1
        if (sale.date > existing.lastSale) {
          existing.lastSale = sale.date
        }
      } else {
        customerMap.set(sale.customerName, {
          name: sale.customerName,
          totalSales: sale.total,
          salesCount: 1,
          lastSale: sale.date,
        })
      }
    }
  })

  const customers = Array.from(customerMap.values()).sort((a, b) => b.totalSales - a.totalSales)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos clients et suivez leur historique
          </p>
        </div>
        <Button disabled title="Les clients sont créés automatiquement depuis les ventes">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Clients actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Chiffre d'affaires moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600 break-words">
              <CurrencyAmount amount={customers.length > 0
                ? customers.reduce((sum, c) => sum + c.totalSales, 0) / customers.length
                : 0} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Par client
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Ventes totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-purple-600 break-words">
              <CurrencyAmount amount={customers.reduce((sum, c) => sum + c.totalSales, 0)} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tous les clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des clients</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Aucun client enregistré</p>
              <p className="text-sm text-gray-400 mb-4">
                Les clients apparaîtront automatiquement lorsque vous créerez des ventes avec un nom de client
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer une vente
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Nom du client</th>
                    <th className="pb-3 font-medium">Nombre de ventes</th>
                    <th className="pb-3 font-medium">Chiffre d'affaires</th>
                    <th className="pb-3 font-medium">Dernière vente</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {customer.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{customer.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {customer.salesCount} vente{customer.salesCount > 1 ? "s" : ""}
                      </td>
                      <td className="py-4 text-sm font-semibold text-green-600">
                        <CurrencyAmount amount={customer.totalSales} />
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {new Date(customer.lastSale).toLocaleDateString("fr-FR")}
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
