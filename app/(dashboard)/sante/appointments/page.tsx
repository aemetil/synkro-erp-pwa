// app/(dashboard)/sante/appointments/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Calendar } from "lucide-react"
import { notFound } from "next/navigation"

const STATUS = {
  SCHEDULED:   { label: "Planifié", color: "bg-blue-100 text-blue-800" },
  CONFIRMED:   { label: "Confirmé", color: "bg-green-100 text-green-800" },
  IN_PROGRESS: { label: "En cours", color: "bg-purple-100 text-purple-800" },
  COMPLETED:   { label: "Terminé",  color: "bg-gray-100 text-gray-800" },
  CANCELLED:   { label: "Annulé",   color: "bg-red-100 text-red-800" },
  NO_SHOW:     { label: "Absent",   color: "bg-orange-100 text-orange-800" },
}

const fmt = (d: Date) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })
const fmtTime = (d: Date) => new Date(d).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

export default async function AppointmentsPage() {
  const session = await auth()
  if (!session?.user?.entrepriseId) notFound()

  const appointments = await db.appointment.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    include: { patient: { select: { firstName: true, lastName: true, phone: true } } },
    orderBy: { scheduledAt: "desc" },
    take: 50,
  })

  const upcoming = appointments.filter((a) => a.scheduledAt >= new Date())
  const past = appointments.filter((a) => a.scheduledAt < new Date())

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Rendez-vous</h1>
          <p className="text-xs md:text-sm text-gray-600">Gestion du planning</p>
        </div>
        <Button asChild size="sm">
          <Link href="/sante/appointments/new">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Nouveau rendez-vous</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">À venir</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">{upcoming.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 leading-tight">Passés</CardTitle>
            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="text-xl md:text-2xl font-bold">{past.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-3 px-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Planning</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6">
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun rendez-vous</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par planifier un rendez-vous.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="py-2 px-3 md:py-3 md:px-0 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Patient</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Type</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">Motif</th>
                    <th className="py-2 px-3 md:py-3 md:px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((apt) => {
                    const s = STATUS[apt.status as keyof typeof STATUS] ?? { label: apt.status, color: "bg-gray-100 text-gray-800" }
                    return (
                      <tr key={apt.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 md:py-4 md:px-0 text-xs md:text-sm whitespace-nowrap">
                          <div>{fmt(apt.scheduledAt)} {fmtTime(apt.scheduledAt)}</div>
                          <div className="text-xs text-gray-400 hidden md:block">{apt.duration} min</div>
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2">
                          <div className="font-medium text-xs md:text-sm">
                            <span className="block max-w-[80px] md:max-w-none truncate">
                              {apt.patient.firstName} {apt.patient.lastName}
                            </span>
                          </div>
                          {apt.patient.phone && (
                            <div className="text-xs text-gray-500 hidden md:block">{apt.patient.phone}</div>
                          )}
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm hidden md:table-cell">{apt.type}</td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2 text-xs md:text-sm text-gray-600 hidden md:table-cell">
                          {apt.reason || "-"}
                        </td>
                        <td className="py-2.5 px-3 md:py-4 md:px-2">
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${s.color}`}>{s.label}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
