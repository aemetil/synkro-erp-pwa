// app/(dashboard)/dashboard/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Receipt, Heart, Package } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"

// Stats pour secteur COMMERCE
async function getCommerceStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Ventes avec produits
  const salesData = await db.sale.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { total: true },
    _count: true,
  })

  // Dépenses
  const expensesData = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  // Stock total
  const stockValue = await db.product.aggregate({
    where: { entrepriseId, isActive: true },
    _sum: {
      currentStock: true,
    },
  })

  const monthlySales = salesData._sum.total || 0
  const monthlyExpenses = expensesData._sum.amount || 0
  const profit = monthlySales - monthlyExpenses

  return {
    type: "COMMERCE" as const,
    monthlySales,
    monthlyExpenses,
    profit,
    salesCount: salesData._count,
    expensesCount: expensesData._count,
    stockQuantity: stockValue._sum.currentStock || 0,
  }
}

// Stats pour secteur SANTE
async function getSanteStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Honoraires consultations
  const consultationsData = await db.consultation.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { fee: true },
    _count: true,
  })

  // Consultations impayées
  const unpaidConsultations = await db.consultation.aggregate({
    where: {
      entrepriseId,
      isPaid: false,
    },
    _sum: { fee: true },
    _count: true,
  })

  // Dépenses
  const expensesData = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  const monthlyFees = consultationsData._sum.fee || 0
  const monthlyExpenses = expensesData._sum.amount || 0
  const profit = monthlyFees - monthlyExpenses

  return {
    type: "SANTE" as const,
    monthlyFees,
    monthlyExpenses,
    profit,
    consultationsCount: consultationsData._count,
    expensesCount: expensesData._count,
    unpaidAmount: unpaidConsultations._sum.fee || 0,
    unpaidCount: unpaidConsultations._count,
  }
}

// Stats pour secteur AUTRE (mixte)
async function getMixedStats(entrepriseId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Ventes générales
  const salesData = await db.sale.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { total: true },
    _count: true,
  })

  // Honoraires consultations
  const consultationsData = await db.consultation.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { fee: true },
    _count: true,
  })

  // Dépenses
  const expensesData = await db.expense.aggregate({
    where: {
      entrepriseId,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
    _count: true,
  })

  const monthlySales = salesData._sum.total || 0
  const monthlyFees = consultationsData._sum.fee || 0
  const totalRevenue = monthlySales + monthlyFees
  const monthlyExpenses = expensesData._sum.amount || 0
  const profit = totalRevenue - monthlyExpenses

  return {
    type: "AUTRE" as const,
    monthlySales,
    monthlyFees,
    totalRevenue,
    monthlyExpenses,
    profit,
    salesCount: salesData._count,
    consultationsCount: consultationsData._count,
    expensesCount: expensesData._count,
  }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  // Récupérer le secteur de l'entreprise
  const entreprise = await db.entreprise.findUnique({
    where: { id: session.user.entrepriseId },
    select: { sector: true },
  })

  if (!entreprise) {
    return <div>Erreur: Entreprise non trouvée</div>
  }

  // Récupérer les stats selon le secteur
  const sector = entreprise.sector || "AUTRE"
  let stats:
    | Awaited<ReturnType<typeof getCommerceStats>>
    | Awaited<ReturnType<typeof getSanteStats>>
    | Awaited<ReturnType<typeof getMixedStats>>

  if (sector === "COMMERCE") {
    stats = await getCommerceStats(session.user.entrepriseId)
  } else if (sector === "SANTE") {
    stats = await getSanteStats(session.user.entrepriseId)
  } else {
    stats = await getMixedStats(session.user.entrepriseId)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord
          {sector && <span className="text-sm text-gray-500 ml-3">({sector === "COMMERCE" ? "Commerce" : sector === "SANTE" ? "Santé" : "Mixte"})</span>}
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenue, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      {/* Stats Cards - COMMERCE */}
      {stats.type === "COMMERCE" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ventes du mois
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold break-words">
                <CurrencyAmount amount={stats.monthlySales} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.salesCount} vente{stats.salesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Dépenses du mois
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-red-600 break-words">
                <CurrencyAmount amount={stats.monthlyExpenses} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.expensesCount} dépense{stats.expensesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bénéfice net
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-lg md:text-2xl font-bold break-words ${stats.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Stock total
              </CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-purple-600 break-words">
                {stats.stockQuantity}
              </div>
              <p className="text-xs text-gray-500 mt-1">unités en stock</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Cards - SANTE */}
      {stats.type === "SANTE" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Honoraires du mois
              </CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold break-words">
                <CurrencyAmount amount={stats.monthlyFees} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.consultationsCount} consultation{stats.consultationsCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Dépenses du mois
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-red-600 break-words">
                <CurrencyAmount amount={stats.monthlyExpenses} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.expensesCount} dépense{stats.expensesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bénéfice net
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-lg md:text-2xl font-bold break-words ${stats.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Impayés
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-orange-600 break-words">
                <CurrencyAmount amount={stats.unpaidAmount} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.unpaidCount} consultation{stats.unpaidCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Cards - AUTRE (Mixte) */}
      {stats.type === "AUTRE" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ventes commerce
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold break-words">
                <CurrencyAmount amount={stats.monthlySales} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.salesCount} vente{stats.salesCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Honoraires santé
              </CardTitle>
              <Heart className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold break-words">
                <CurrencyAmount amount={stats.monthlyFees} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.consultationsCount} consultation{stats.consultationsCount > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenus totaux
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-purple-600 break-words">
                <CurrencyAmount amount={stats.totalRevenue} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Commerce + Santé
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Bénéfice net
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-lg md:text-2xl font-bold break-words ${stats.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                <CurrencyAmount amount={stats.profit} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {stats.type === "SANTE" ? "Consultations récentes" : "Ventes récentes"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity entrepriseId={session.user.entrepriseId} sector={sector} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dépenses récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentExpenses entrepriseId={session.user.entrepriseId} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function RecentActivity({ entrepriseId, sector }: { entrepriseId: string; sector: string }) {
  if (sector === "SANTE") {
    // Afficher les consultations pour Santé
    const consultations = await db.consultation.findMany({
      where: { entrepriseId },
      include: { patient: true },
      orderBy: { date: "desc" },
      take: 5,
    })

    if (consultations.length === 0) {
      return <p className="text-sm text-gray-500">Aucune consultation enregistrée</p>
    }

    return (
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div key={consultation.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-pink-100 flex items-center justify-center">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {consultation.patient.firstName} {consultation.patient.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(consultation.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="text-sm font-semibold text-green-600">
              +{formatCurrency(consultation.fee)}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    // Afficher les ventes pour Commerce et Autre
    const sales = await db.sale.findMany({
      where: { entrepriseId },
      orderBy: { date: "desc" },
      take: 5,
    })

    if (sales.length === 0) {
      return <p className="text-sm text-gray-500">Aucune vente enregistrée</p>
    }

    return (
      <div className="space-y-4">
        {sales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                <Receipt className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {sale.customerName || sale.saleNumber}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(sale.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="text-sm font-semibold text-green-600">
              +{formatCurrency(sale.total)}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

async function RecentExpenses({ entrepriseId }: { entrepriseId: string }) {
  const expenses = await db.expense.findMany({
    where: { entrepriseId },
    orderBy: { date: "desc" },
    take: 5,
  })

  if (expenses.length === 0) {
    return <p className="text-sm text-gray-500">Aucune dépense enregistrée</p>
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center">
              <Receipt className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{expense.description || "Dépense"}</p>
              <p className="text-xs text-gray-500">
                {new Date(expense.date).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="text-sm font-semibold text-red-600">
            -{formatCurrency(expense.amount)}
          </div>
        </div>
      ))}
    </div>
  )
}