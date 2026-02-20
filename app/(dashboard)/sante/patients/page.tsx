// app/(dashboard)/sante/patients/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, User } from "lucide-react"
import { notFound } from "next/navigation"

export default async function PatientsPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const patients = await db.patient.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      _count: {
        select: { consultations: true },
      },
      consultations: {
        orderBy: { date: "desc" },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-600">Gérez vos dossiers patients</p>
        </div>
        <Button asChild>
          <Link href="/sante/patients/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau patient
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des patients</CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun patient
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par ajouter votre premier patient.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/sante/patients/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau patient
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Numéro</th>
                    <th className="pb-3 font-medium">Nom</th>
                    <th className="pb-3 font-medium">Contact</th>
                    <th className="pb-3 font-medium">Dernière visite</th>
                    <th className="pb-3 font-medium">Consultations</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-4">
                        <Link
                          href={`/sante/patients/${patient.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {patient.patientNumber}
                        </Link>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-medium">
                            {patient.firstName} {patient.lastName}
                          </div>
                          {patient.dateOfBirth && (
                            <div className="text-sm text-gray-500">
                              {new Date().getFullYear() -
                                new Date(patient.dateOfBirth).getFullYear()}{" "}
                              ans
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-sm">
                        {patient.phone && <div>{patient.phone}</div>}
                        {patient.email && (
                          <div className="text-gray-500">{patient.email}</div>
                        )}
                      </td>
                      <td className="py-4 text-sm">
                        {patient.consultations[0] ? (
                          new Date(patient.consultations[0].date).toLocaleDateString(
                            "fr-FR"
                          )
                        ) : (
                          <span className="text-gray-400">Jamais</span>
                        )}
                      </td>
                      <td className="py-4 text-sm">
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
