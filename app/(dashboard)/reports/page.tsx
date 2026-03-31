// app/(dashboard)/reports/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import { CurrencyAmount } from "@/components/currency-amount"
import { Button } from "@/components/ui/button"
import { Download, Calendar, TrendingUp, TrendingDown } from "lucide-react"

async function getReportData(entrepriseId: string) {
  // Get data for the last 6 months
  const now = new Date()
  const months = []
  for (let i = 5; i >= 0; i--) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1, 0, 0, 0, 0)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999)

    const sales = await db.sale.aggregate({
      where: {
        entrepriseId,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { total: true },
      _count: true,
    })

    const expenses = await db.expense.aggregate({
      where: {
        entrepriseId,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { amount: true },
      _count: true,
    })

    months.push({
      name: startOfMonth.toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      sales: sales._sum.total || 0,
      expenses: expenses._sum.amount || 0,
      profit: (sales._sum.total || 0) - (expenses._sum.amount || 0),
      salesCount: sales._count,
      expensesCount: expenses._count,
    })
  }

  // Get expenses by category
  const expensesByCategory = await db.expense.groupBy({
    by: ["category"],
    where: { entrepriseId },
    _sum: { amount: true },
    _count: true,
  })

  // Get payment methods distribution
  const paymentMethods = await db.sale.groupBy({
    by: ["paymentMethod"],
    where: { entrepriseId },
    _sum: { total: true },
    _count: true,
  })

  return {
    months,
    expensesByCategory: expensesByCategory.sort((a, b) => (b._sum.amount || 0) - (a._sum.amount || 0)),
    paymentMethods: paymentMethods.sort((a, b) => (b._sum.total || 0) - (a._sum.total || 0)),
  }
}

export default async function ReportsPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  const data = await getReportData(session.user.entrepriseId)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
          <p className="text-gray-600 mt-2">
            Analysez vos performances financières
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Période
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Monthly Trend */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Évolution mensuelle (6 derniers mois)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">Mois</th>
                  <th className="pb-3 font-medium">Ventes</th>
                  <th className="pb-3 font-medium">Dépenses</th>
                  <th className="pb-3 font-medium">Bénéfice</th>
                  <th className="pb-3 font-medium">Transactions</th>
                </tr>
              </thead>
              <tbody>
                {data.months.map((month, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium">{month.name}</td>
                    <td className="py-4 text-sm text-green-600 font-semibold">
                      +<CurrencyAmount amount={month.sales} />
                    </td>
                    <td className="py-4 text-sm text-red-600 font-semibold">
                      -<CurrencyAmount amount={month.expenses} />
                    </td>
                    <td className={`py-4 text-sm font-semibold ${
                      month.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {month.profit >= 0 ? "+" : ""}<CurrencyAmount amount={month.profit} />
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {month.salesCount} ventes / {month.expensesCount} dépenses
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium text-green-900">Total ventes</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-green-600 break-words">
                <CurrencyAmount amount={data.months.reduce((sum, m) => sum + m.sales, 0)} />
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <p className="text-sm font-medium text-red-900">Total dépenses</p>
              </div>
              <p className="text-lg md:text-2xl font-bold text-red-600 break-words">
                <CurrencyAmount amount={data.months.reduce((sum, m) => sum + m.expenses, 0)} />
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Bénéfice net</p>
              </div>
              <p className={`text-lg md:text-2xl font-bold break-words ${
                data.months.reduce((sum, m) => sum + m.profit, 0) >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                <CurrencyAmount amount={data.months.reduce((sum, m) => sum + m.profit, 0)} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown by Category and Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Dépenses par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            {data.expensesByCategory.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune dépense enregistrée</p>
            ) : (
              <div className="space-y-4">
                {data.expensesByCategory.map((category, index) => {
                  const total = data.expensesByCategory.reduce((sum, c) => sum + (c._sum.amount || 0), 0)
                  const percentage = total > 0 ? ((category._sum.amount || 0) / total) * 100 : 0

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{category.category}</p>
                          <p className="text-xs text-gray-500">
                            {category._count} transaction{category._count > 1 ? "s" : ""}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          <CurrencyAmount amount={category._sum.amount || 0} />
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% du total</p>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Méthodes de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            {data.paymentMethods.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune vente enregistrée</p>
            ) : (
              <div className="space-y-4">
                {data.paymentMethods.map((method, index) => {
                  const total = data.paymentMethods.reduce((sum, m) => sum + (m._sum.total || 0), 0)
                  const percentage = total > 0 ? ((method._sum.total || 0) / total) * 100 : 0

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{method.paymentMethod}</p>
                          <p className="text-xs text-gray-500">
                            {method._count} transaction{method._count > 1 ? "s" : ""}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                          <CurrencyAmount amount={method._sum.total || 0} />
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% du total</p>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
