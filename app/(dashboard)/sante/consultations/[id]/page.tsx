// app/(dashboard)/sante/consultations/[id]/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"
import { notFound } from "next/navigation"
import { CurrencyAmount } from "@/components/currency-amount"

export default async function ConsultationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const consultation = await db.consultation.findFirst({
    where: {
      id: params.id,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      patient: true,
    },
  })

  if (!consultation) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/sante/patients/${consultation.patientId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au patient
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {consultation.consultationNumber}
            </h1>
            <p className="text-gray-600">
              {new Date(consultation.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href={`/sante/patients/${consultation.patientId}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {consultation.patient.firstName} {consultation.patient.lastName}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {consultation.patient.patientNumber}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinical Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations cliniques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <div className="text-gray-600 font-medium">Motif de consultation</div>
              <div className="mt-1">{consultation.chiefComplaint}</div>
            </div>

            {consultation.symptoms && (
              <div>
                <div className="text-gray-600 font-medium">Symptômes</div>
                <div className="mt-1">{consultation.symptoms}</div>
              </div>
            )}

            {consultation.diagnosis && (
              <div>
                <div className="text-gray-600 font-medium">Diagnostic</div>
                <div className="mt-1">{consultation.diagnosis}</div>
              </div>
            )}

            {consultation.treatment && (
              <div>
                <div className="text-gray-600 font-medium">Traitement prescrit</div>
                <div className="mt-1">{consultation.treatment}</div>
              </div>
            )}

            {consultation.notes && (
              <div>
                <div className="text-gray-600 font-medium">Notes</div>
                <div className="mt-1">{consultation.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vital Signs */}
        {(consultation.temperature ||
          consultation.bloodPressure ||
          consultation.heartRate ||
          consultation.weight ||
          consultation.height) && (
          <Card>
            <CardHeader>
              <CardTitle>Signes vitaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {consultation.temperature && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Température</span>
                  <span className="font-medium">{consultation.temperature} °C</span>
                </div>
              )}
              {consultation.bloodPressure && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tension artérielle</span>
                  <span className="font-medium">{consultation.bloodPressure} mmHg</span>
                </div>
              )}
              {consultation.heartRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Fréquence cardiaque</span>
                  <span className="font-medium">{consultation.heartRate} bpm</span>
                </div>
              )}
              {consultation.weight && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Poids</span>
                  <span className="font-medium">{consultation.weight} kg</span>
                </div>
              )}
              {consultation.height && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taille</span>
                  <span className="font-medium">{consultation.height} cm</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Facturation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Honoraires</span>
              <span className="font-medium text-lg">
                <CurrencyAmount amount={consultation.fee} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Statut</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  consultation.isPaid
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {consultation.isPaid ? "Payé" : "Impayé"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Follow-up */}
        {consultation.nextAppointment && (
          <Card>
            <CardHeader>
              <CardTitle>Suivi</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="text-gray-600">Prochain rendez-vous</div>
              <div className="font-medium mt-1">
                {new Date(consultation.nextAppointment).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
