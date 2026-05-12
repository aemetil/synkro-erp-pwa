// app/(dashboard)/finance/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { CurrencyAmount } from "@/components/currency-amount"
import { DollarSign, TrendingUp, TrendingDown, Calendar, Plus, Pencil, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Stats for COMMERCE sector
async function getCommerceFinanceStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  // Monthly sales
  const monthlySales = await db.sale.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { total: true },
    _count: true,
  })

  // Monthly COGS (cost of goods sold)
  const monthlySaleItems = await db.saleItem.findMany({
    where: {
      sale: { entrepriseId, date: { gte: startOfMonth, lte: endOfMonth } },
      productId: { not: null },
    },
    include: { product: { select: { costPrice: true } } },
  })
  const monthCogs = monthlySaleItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.costPrice ?? 0),
    0
  )

  // Monthly expenses
  const monthlyExpenses = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  // All-time sales
  const totalSales = await db.sale.aggregate({
    where: { entrepriseId },
    _sum: { total: true, paidAmount: true },
    _count: true,
  })

  // All-time expenses
  const totalExpenses = await db.expense.aggregate({
    where: { entrepriseId },
    _sum: { amount: true },
    _count: true,
  })

  // Recent sales
  const recentSales = await db.sale.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 10,
  })

  // Recent expenses
  const recentExpenses = await db.expense.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 10,
  })

  const monthlySalesTotal = monthlySales._sum.total || 0
  const monthlyExpensesTotal = monthlyExpenses._sum.amount || 0

  return {
    monthly: {
      sales: monthlySalesTotal,
      salesCount: monthlySales._count,
      expenses: monthlyExpensesTotal,
      expensesCount: monthlyExpenses._count,
      profit: monthlySalesTotal - monthCogs - monthlyExpensesTotal,
    },
    total: {
      sales: totalSales._sum.total || 0,
      salesCount: totalSales._count,
      paidAmount: totalSales._sum.paidAmount || 0,
      expenses: totalExpenses._sum.amount || 0,
      expensesCount: totalExpenses._count,
      netProfit: (totalSales._sum.total || 0) - (totalExpenses._sum.amount || 0),
    },
    recentSales,
    recentExpenses,
    recentConsultations: [], // Not applicable for commerce
  }
}

// Stats for SANTE sector
async function getSanteFinanceStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  // Monthly consultations (honoraires)
  const monthlyConsultations = await db.consultation.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { fee: true },
    _count: true,
  })

  // Monthly expenses
  const monthlyExpenses = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  // All-time consultations
  const totalConsultations = await db.consultation.aggregate({
    where: { entrepriseId },
    _sum: { fee: true },
    _count: true,
  })

  // Unpaid consultations
  const unpaidConsultations = await db.consultation.aggregate({
    where: {
      entrepriseId,
      isPaid: false,
    },
    _sum: { fee: true },
    _count: true,
  })

  // All-time expenses
  const totalExpenses = await db.expense.aggregate({
    where: { entrepriseId },
    _sum: { amount: true },
    _count: true,
  })

  // Recent consultations
  const recentConsultations = await db.consultation.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 10,
    include: { patient: true },
  })

  // Recent expenses
  const recentExpenses = await db.expense.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 10,
  })

  return {
    monthly: {
      fees: monthlyConsultations._sum.fee || 0,
      feesCount: monthlyConsultations._count,
      expenses: monthlyExpenses._sum.amount || 0,
      expensesCount: monthlyExpenses._count,
      profit: (monthlyConsultations._sum.fee || 0) - (monthlyExpenses._sum.amount || 0),
    },
    total: {
      fees: totalConsultations._sum.fee || 0,
      feesCount: totalConsultations._count,
      unpaidAmount: unpaidConsultations._sum.fee || 0,
      unpaidCount: unpaidConsultations._count,
      expenses: totalExpenses._sum.amount || 0,
      expensesCount: totalExpenses._count,
      netProfit: (totalConsultations._sum.fee || 0) - (totalExpenses._sum.amount || 0),
    },
    recentSales: [], // Not applicable for health
    recentConsultations,
    recentExpenses,
  }
}

// Stats for AUTRE sector (mixed)
async function getMixedFinanceStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  // Monthly sales
  const monthlySales = await db.sale.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { total: true },
    _count: true,
  })

  // Monthly consultations
  const monthlyConsultations = await db.consultation.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { fee: true },
    _count: true,
  })

  // Monthly expenses
  const monthlyExpenses = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  // All-time sales
  const totalSales = await db.sale.aggregate({
    where: { entrepriseId },
    _sum: { total: true },
    _count: true,
  })

  // All-time consultations
  const totalConsultations = await db.consultation.aggregate({
    where: { entrepriseId },
    _sum: { fee: true },
    _count: true,
  })

  // All-time expenses
  const totalExpenses = await db.expense.aggregate({
    where: { entrepriseId },
    _sum: { amount: true },
    _count: true,
  })

  // Recent sales
  const recentSales = await db.sale.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 5,
  })

  // Recent consultations
  const recentConsultations = await db.consultation.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 5,
    include: { patient: true },
  })

  // Recent expenses
  const recentExpenses = await db.expense.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 10,
  })

  // Monthly COGS (cost of goods sold)
  const mixedMonthlySaleItems = await db.saleItem.findMany({
    where: {
      sale: { entrepriseId, date: { gte: startOfMonth, lte: endOfMonth } },
      productId: { not: null },
    },
    include: { product: { select: { costPrice: true } } },
  })
  const mixedMonthCogs = mixedMonthlySaleItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.costPrice ?? 0),
    0
  )

  const monthlySalesTotal = monthlySales._sum.total || 0
  const monthlyFeesTotal = monthlyConsultations._sum.fee || 0
  const monthlyRevenue = monthlySalesTotal + monthlyFeesTotal
  const monthlyExpensesTotal = monthlyExpenses._sum.amount || 0

  const totalSalesAmount = totalSales._sum.total || 0
  const totalFeesAmount = totalConsultations._sum.fee || 0
  const totalRevenue = totalSalesAmount + totalFeesAmount
  const totalExpensesAmount = totalExpenses._sum.amount || 0

  return {
    monthly: {
      sales: monthlySalesTotal,
      salesCount: monthlySales._count,
      fees: monthlyFeesTotal,
      feesCount: monthlyConsultations._count,
      revenue: monthlyRevenue,
      expenses: monthlyExpensesTotal,
      expensesCount: monthlyExpenses._count,
      profit: monthlyRevenue - mixedMonthCogs - monthlyExpensesTotal,
    },
    total: {
      sales: totalSalesAmount,
      salesCount: totalSales._count,
      fees: totalFeesAmount,
      feesCount: totalConsultations._count,
      revenue: totalRevenue,
      expenses: totalExpensesAmount,
      expensesCount: totalExpenses._count,
      netProfit: totalRevenue - totalExpensesAmount,
    },
    recentSales,
    recentConsultations,
    recentExpenses,
  }
}

export default async function FinancePage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  // Get entreprise sector
  const entreprise = await db.entreprise.findUnique({
    where: { id: session.user.entrepriseId },
    select: { sector: true },
  })

  const sector = entreprise?.sector || "AUTRE"

  // Get stats based on sector
  let stats: any
  if (sector === "COMMERCE") {
    stats = await getCommerceFinanceStats(session.user.entrepriseId)
  } else if (sector === "SANTE") {
    stats = await getSanteFinanceStats(session.user.entrepriseId)
  } else {
    stats = await getMixedFinanceStats(session.user.entrepriseId)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            Finance <span className="text-xs md:text-sm text-gray-500">({sector === "COMMERCE" ? "Commerce" : sector === "SANTE" ? "Santé" : "Mixte"})</span>
          </h1>
          <p className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">
            {sector === "COMMERCE"
              ? "Ventes, dépenses et trésorerie"
              : sector === "SANTE"
              ? "Honoraires, dépenses et trésorerie"
              : "Revenus, dépenses et trésorerie"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/finance/new">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Nouvelle dépense</span>
            </Button>
          </Link>
          <div className="relative hidden md:inline-flex">
            <Button variant="outline" size="sm" disabled className="opacity-60 cursor-not-allowed">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <span className="absolute -top-2 -right-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium leading-none whitespace-nowrap">Bientôt</span>
          </div>
        </div>
      </div>

      {/* Stats Overview - COMMERCE */}
      {sector === "COMMERCE" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Ventes ce mois
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-green-600 break-all">
                <CurrencyAmount amount={stats.monthly.sales} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.salesCount} transaction{stats.monthly.salesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Dépenses ce mois
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-red-600 break-all">
                <CurrencyAmount amount={stats.monthly.expenses} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.expensesCount} dépense{stats.monthly.expensesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Bénéfice mensuel
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className={`text-sm md:text-2xl font-bold break-all ${stats.monthly.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.monthly.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Total des ventes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-purple-600 break-all">
                <CurrencyAmount amount={stats.total.sales} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.total.salesCount} vente{stats.total.salesCount > 1 ? "s" : ""} au total
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Overview - SANTE */}
      {sector === "SANTE" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Honoraires ce mois
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-green-600 break-all">
                <CurrencyAmount amount={stats.monthly.fees} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.feesCount} consultation{stats.monthly.feesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Dépenses ce mois
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-red-600 break-all">
                <CurrencyAmount amount={stats.monthly.expenses} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.expensesCount} dépense{stats.monthly.expensesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Bénéfice mensuel
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className={`text-sm md:text-2xl font-bold break-all ${stats.monthly.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.monthly.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Impayés
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-orange-600 break-all">
                <CurrencyAmount amount={stats.total.unpaidAmount} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.total.unpaidCount} consultation{stats.total.unpaidCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Overview - AUTRE (Mixed) */}
      {sector === "AUTRE" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Ventes commerce
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-green-600 break-all">
                <CurrencyAmount amount={stats.monthly.sales} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.salesCount} vente{stats.monthly.salesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Honoraires santé
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-blue-600 break-all">
                <CurrencyAmount amount={stats.monthly.fees} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                {stats.monthly.feesCount} consultation{stats.monthly.feesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Revenus totaux
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className="text-sm md:text-2xl font-bold text-purple-600 break-all">
                <CurrencyAmount amount={stats.monthly.revenue} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5 hidden md:block">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs font-medium text-gray-600 leading-tight">
                Bénéfice mensuel
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
              <div className={`text-sm md:text-2xl font-bold break-all ${stats.monthly.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.monthly.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Après dépenses ({stats.monthly.expensesCount})
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales or Consultations */}
        {sector === "SANTE" ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Consultations récentes</CardTitle>
                <Link href="/sante/consultations">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {stats.recentConsultations.length === 0 ? (
                <p className="text-sm text-gray-500">Aucune consultation enregistrée</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentConsultations.map((consultation: any) => (
                    <div key={consultation.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-medium">
                          {consultation.patient.firstName} {consultation.patient.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(consultation.date).toLocaleDateString("fr-FR")} • {consultation.consultationNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          +<CurrencyAmount amount={consultation.fee} />
                        </p>
                        <p className={`text-xs ${consultation.isPaid ? "text-green-600" : "text-orange-600"}`}>
                          {consultation.isPaid ? "Payé" : "Impayé"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : sector === "COMMERCE" ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ventes récentes</CardTitle>
                <Link href="/sales">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {stats.recentSales.length === 0 ? (
                <p className="text-sm text-gray-500">Aucune vente enregistrée</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentSales.map((sale: any) => (
                    <div key={sale.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-medium">
                          {sale.customerName || sale.saleNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(sale.date).toLocaleDateString("fr-FR")} • {sale.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          +<CurrencyAmount amount={sale.total} />
                        </p>
                        <p className={`text-xs ${
                          sale.paymentStatus === "PAID" ? "text-green-600" :
                          sale.paymentStatus === "PENDING" ? "text-yellow-600" :
                          "text-gray-600"
                        }`}>
                          {sale.paymentStatus === "PAID" ? "Payé" :
                           sale.paymentStatus === "PENDING" ? "En attente" :
                           sale.paymentStatus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* AUTRE - Show both */
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ventes & Consultations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentSales.length === 0 && stats.recentConsultations.length === 0 ? (
                    <p className="text-sm text-gray-500">Aucune transaction enregistrée</p>
                  ) : (
                    <>
                      {stats.recentSales.slice(0, 3).map((sale: any) => (
                        <div key={`sale-${sale.id}`} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <p className="text-sm font-medium">
                              {sale.customerName || sale.saleNumber}
                            </p>
                            <p className="text-xs text-gray-500">
                              Vente • {new Date(sale.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-green-600">
                              +<CurrencyAmount amount={sale.total} />
                            </p>
                          </div>
                        </div>
                      ))}
                      {stats.recentConsultations.slice(0, 3).map((consultation: any) => (
                        <div key={`cons-${consultation.id}`} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <p className="text-sm font-medium">
                              {consultation.patient.firstName} {consultation.patient.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Consultation • {new Date(consultation.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-green-600">
                              +<CurrencyAmount amount={consultation.fee} />
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dépenses récentes</CardTitle>
              <div className="relative inline-flex">
                <Button variant="ghost" size="sm" disabled className="opacity-60 cursor-not-allowed">
                  Voir tout
                </Button>
                <span className="absolute -top-2 -right-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium leading-none whitespace-nowrap">Bientôt</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recentExpenses.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune dépense enregistrée</p>
            ) : (
              <div className="space-y-4">
                {stats.recentExpenses.map((expense: any) => (
                  <div key={expense.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{expense.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString("fr-FR")} • {expense.category}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm font-semibold text-red-600">
                        -<CurrencyAmount amount={expense.amount} />
                      </p>
                      <p className="text-xs text-gray-600">{expense.paymentMethod}</p>
                    </div>
                    <Link href={`/finance/${expense.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
