// app/(dashboard)/sante/appointments/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Calendar } from "lucide-react"
import { notFound } from "next/navigation"

export default async function AppointmentsPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const appointments = await db.appointment.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      patient: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "desc",
    },
    take: 50,
  })

  const upcoming = appointments.filter((a) => a.scheduledAt >= new Date())
  const past = appointments.filter((a) => a.scheduledAt < new Date())

  function getStatusBadge(status: string) {
    const badges = {
      SCHEDULED: "bg-blue-100 text-blue-800",
      CONFIRMED: "bg-green-100 text-green-800",
      IN_PROGRESS: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-gray-100 text-gray-800",
      CANCELLED: "bg-red-100 text-red-800",
      NO_SHOW: "bg-orange-100 text-orange-800",
    }
    const labels = {
      SCHEDULED: "Planifié",
      CONFIRMED: "Confirmé",
      IN_PROGRESS: "En cours",
      COMPLETED: "Terminé",
      CANCELLED: "Annulé",
      NO_SHOW: "Absent",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${badges[status as keyof typeof badges] || badges.SCHEDULED}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rendez-vous</h1>
          <p className="text-gray-600">Gestion du planning</p>
        </div>
        <Button asChild>
          <Link href="/sante/appointments/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau rendez-vous
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              À venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcoming.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Passés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{past.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planning</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucun rendez-vous
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par planifier un rendez-vous.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3 font-medium">Date & Heure</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Motif</th>
                    <th className="pb-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-4 text-sm">
                        {new Date(appointment.scheduledAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        <div className="text-xs text-gray-500">
                          {appointment.duration} min
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-medium">
                            {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </div>
                          {appointment.patient.phone && (
                            <div className="text-sm text-gray-500">
                              {appointment.patient.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-sm">{appointment.type}</td>
                      <td className="py-4 text-sm">{appointment.reason || "-"}</td>
                      <td className="py-4">{getStatusBadge(appointment.status)}</td>
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
