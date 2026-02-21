// app/(dashboard)/sante/consultations/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"
import { notFound } from "next/navigation"

const fmt = (d: Date) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })

export default async function ConsultationsPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) notFound()

  const consultations = await db.consultation.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    include: { patient: { select: { firstName: true, lastName: true, patientNumber: true } } },
    orderBy: { date: "desc" },
    take: 50,
  })

  const totalFees = consultations.reduce((sum, c) => sum + c.fee, 0)
  const unpaidFees = consultations.filter((c) => !c.isPaid).reduce((sum, c) => sum + c.fee, 0)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Consultations</h1>
          <p className="text-xs md:text-sm text-gray-600">Historique des consultations</p>
        </div>
        <Button asChild size="sm">
          <Link href="/sante/consultations/new">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Nouvelle consultation</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-6">
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Total</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">{consultations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Honoraires</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold break-all"><CurrencyAmount amount={totalFees} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Impayés</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-sm md:text-2xl font-bold text-red-600 break-all"><CurrencyAmount amount={unpaidFees} /></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Historique</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {consultations.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune consultation</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par enregistrer une consultation.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Patient</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Motif</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Diagnostic</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Honoraires</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consultations.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 md:py-4 md:px-0 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                        {fmt(c.date)}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2">
                        <Link href={`/sante/patients/${c.patientId}`} className="font-medium text-xs md:text-sm text-blue-600 hover:underline">
                          <span className="block max-w-[80px] md:max-w-none truncate">
                            {c.patient.firstName} {c.patient.lastName}
                          </span>
                        </Link>
                        <div className="text-xs text-gray-500 hidden md:block">{c.patient.patientNumber}</div>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm hidden md:table-cell">
                        {c.chiefComplaint}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell">
                        {c.diagnosis || "-"}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm whitespace-nowrap">
                        <CurrencyAmount amount={c.fee} />
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2">
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${c.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {c.isPaid ? "Payé" : "Impayé"}
                        </span>
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
