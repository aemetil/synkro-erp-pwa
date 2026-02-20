// app/(dashboard)/sante/consultations/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"
import { notFound } from "next/navigation"

export default async function ConsultationsPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const consultations = await db.consultation.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      patient: {
        select: {
          firstName: true,
          lastName: true,
          patientNumber: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 50,
  })

  const totalFees = consultations.reduce((sum, c) => sum + c.fee, 0)
  const unpaidFees = consultations
    .filter((c) => !c.isPaid)
    .reduce((sum, c) => sum + c.fee, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Consultations</h1>
          <p className="text-gray-600">Historique des consultations</p>
        </div>
        <Button asChild>
          <Link href="/sante/consultations/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle consultation
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Honoraires totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold break-words">
              <CurrencyAmount amount={totalFees} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Impayés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold break-words text-red-600">
              <CurrencyAmount amount={unpaidFees} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
          {consultations.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucune consultation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par enregistrer une consultation.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Motif</th>
                    <th className="pb-3 font-medium">Diagnostic</th>
                    <th className="pb-3 font-medium">Honoraires</th>
                    <th className="pb-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((consultation) => (
                    <tr
                      key={consultation.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-4 text-sm">
                        {new Date(consultation.date).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4">
                        <div>
                          <Link
                            href={`/sante/patients/${consultation.patientId}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {consultation.patient.firstName}{" "}
                            {consultation.patient.lastName}
                          </Link>
                          <div className="text-sm text-gray-500">
                            {consultation.patient.patientNumber}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{consultation.chiefComplaint}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {consultation.diagnosis || "-"}
                      </td>
                      <td className="py-4 text-sm">
                        <CurrencyAmount amount={consultation.fee} />
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            consultation.isPaid
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {consultation.isPaid ? "Payé" : "Impayé"}
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
