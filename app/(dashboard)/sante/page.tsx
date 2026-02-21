// app/(dashboard)/sante/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, FileText, Calendar, DollarSign } from "lucide-react"
import { CurrencyAmount } from "@/components/currency-amount"
import { notFound } from "next/navigation"

export default async function SanteDashboardPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const [patientsCount, consultationsCount, todayAppointments, monthlyStats] =
    await Promise.all([
      db.patient.count({
        where: { entrepriseId: session.user.entrepriseId },
      }),
      db.consultation.count({
        where: { entrepriseId: session.user.entrepriseId },
      }),
      db.appointment.findMany({
        where: {
          entrepriseId: session.user.entrepriseId,
          scheduledAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
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
          scheduledAt: "asc",
        },
      }),
      db.consultation.aggregate({
        where: {
          entrepriseId: session.user.entrepriseId,
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: {
          fee: true,
        },
        _count: true,
      }),
    ])

  const unpaidConsultations = await db.consultation.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
      isPaid: false,
    },
    include: {
      patient: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  })

  const monthlyRevenue = monthlyStats._sum.fee || 0
  const monthlyConsultationsCount = monthlyStats._count

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Santé</h1>
        <p className="text-xs md:text-sm text-gray-600">Gestion de votre cabinet médical</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total patients
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Aujourd'hui
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-gray-500 mt-1">Rendez-vous</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ce mois
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyConsultationsCount}</div>
            <p className="text-xs text-gray-500 mt-1">Consultations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Honoraires mensuels
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold break-words">
              <CurrencyAmount amount={monthlyRevenue} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous d'aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">Aucun rendez-vous</p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded"
                  >
                    <div>
                      <div className="font-medium">
                        {new Date(apt.scheduledAt).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        - {apt.patient.firstName} {apt.patient.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {apt.reason || apt.type}
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/sante/appointments">Voir tous les rendez-vous</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultations impayées</CardTitle>
          </CardHeader>
          <CardContent>
            {unpaidConsultations.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">
                Aucune consultation impayée
              </p>
            ) : (
              <div className="space-y-3">
                {unpaidConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-3 bg-yellow-50 rounded"
                  >
                    <div>
                      <div className="font-medium">
                        {consultation.patient.firstName}{" "}
                        {consultation.patient.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(consultation.date).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        <CurrencyAmount amount={consultation.fee} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/sante/consultations">Voir toutes les consultations</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button asChild className="h-auto py-4">
          <Link href="/sante/patients/new">
            <Users className="h-5 w-5 mr-2" />
            Nouveau patient
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4">
          <Link href="/sante/consultations/new">
            <FileText className="h-5 w-5 mr-2" />
            Nouvelle consultation
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4">
          <Link href="/sante/appointments/new">
            <Calendar className="h-5 w-5 mr-2" />
            Nouveau rendez-vous
          </Link>
        </Button>
      </div>
    </div>
  )
}
