// app/(dashboard)/sante/patients/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, User } from "lucide-react"
import { notFound } from "next/navigation"

const fmt = (d: Date) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })

export default async function PatientsPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) notFound()

  const patients = await db.patient.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    include: {
      _count: { select: { consultations: true } },
      consultations: { orderBy: { date: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Patients</h1>
          <p className="text-xs md:text-sm text-gray-600">Gérez vos dossiers patients</p>
        </div>
        <Button asChild size="sm">
          <Link href="/sante/patients/new">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Nouveau patient</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-6">
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Total patients</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Avec consultation</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">
              {patients.filter(p => p._count.consultations > 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Liste des patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {patients.length === 0 ? (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun patient</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier patient.</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/sante/patients/new"><Plus className="h-4 w-4 mr-2" />Nouveau patient</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">N°</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Contact</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Dernière visite</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Consult.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 md:py-4 md:px-0 text-xs md:text-sm whitespace-nowrap">
                        <Link href={`/sante/patients/${patient.id}`} className="font-medium text-blue-600 hover:underline">
                          {patient.patientNumber}
                        </Link>
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2">
                        <div className="font-medium text-xs md:text-sm">
                          <span className="block max-w-[90px] md:max-w-none truncate">
                            {patient.firstName} {patient.lastName}
                          </span>
                        </div>
                        {patient.dateOfBirth && (
                          <div className="text-xs text-gray-500 hidden md:block">
                            {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} ans
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm hidden md:table-cell">
                        {patient.phone && <div>{patient.phone}</div>}
                        {patient.email && <div className="text-gray-500">{patient.email}</div>}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm whitespace-nowrap">
                        {patient.consultations[0]
                          ? fmt(patient.consultations[0].date)
                          : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-center">
                        {patient._count.consultations}
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
