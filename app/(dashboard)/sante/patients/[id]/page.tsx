// app/(dashboard)/sante/patients/[id]/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Calendar, FileText, Pencil, User } from "lucide-react"
import { notFound } from "next/navigation"
import { CurrencyAmount } from "@/components/currency-amount"

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const patient = await db.patient.findFirst({
    where: {
      id: params.id,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      consultations: {
        orderBy: { date: "desc" },
        take: 10,
      },
      appointments: {
        where: {
          scheduledAt: { gte: new Date() },
        },
        orderBy: { scheduledAt: "asc" },
      },
    },
  })

  if (!patient) {
    notFound()
  }

  const age = patient.dateOfBirth
    ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sante/patients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-gray-600">{patient.patientNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/sante/consultations/new?patientId=${patient.id}`}>
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle consultation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/sante/patients/${patient.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {patient.dateOfBirth && (
                <div>
                  <div className="text-gray-600">Âge</div>
                  <div className="font-medium">{age} ans</div>
                </div>
              )}
              {patient.gender && (
                <div>
                  <div className="text-gray-600">Sexe</div>
                  <div className="font-medium">
                    {patient.gender === "MALE"
                      ? "Masculin"
                      : patient.gender === "FEMALE"
                      ? "Féminin"
                      : "Autre"}
                  </div>
                </div>
              )}
              {patient.bloodType && (
                <div>
                  <div className="text-gray-600">Groupe sanguin</div>
                  <div className="font-medium">{patient.bloodType}</div>
                </div>
              )}
              {patient.phone && (
                <div>
                  <div className="text-gray-600">Téléphone</div>
                  <div className="font-medium">{patient.phone}</div>
                </div>
              )}
              {patient.email && (
                <div>
                  <div className="text-gray-600">Email</div>
                  <div className="font-medium">{patient.email}</div>
                </div>
              )}
              {patient.address && (
                <div>
                  <div className="text-gray-600">Adresse</div>
                  <div className="font-medium">
                    {patient.address}
                    {patient.city && `, ${patient.city}`}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {(patient.allergies || patient.chronicDiseases) && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-700">Alertes médicales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {patient.allergies && (
                  <div>
                    <div className="text-gray-600 font-medium">Allergies</div>
                    <div>{patient.allergies}</div>
                  </div>
                )}
                {patient.chronicDiseases && (
                  <div>
                    <div className="text-gray-600 font-medium">
                      Maladies chroniques
                    </div>
                    <div>{patient.chronicDiseases}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {(patient.insuranceProvider || patient.emergencyContact) && (
            <Card>
              <CardHeader>
                <CardTitle>Autres informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {patient.insuranceProvider && (
                  <div>
                    <div className="text-gray-600">Assurance</div>
                    <div className="font-medium">{patient.insuranceProvider}</div>
                    {patient.insuranceNumber && (
                      <div className="text-gray-500">{patient.insuranceNumber}</div>
                    )}
                  </div>
                )}
                {patient.emergencyContact && (
                  <div>
                    <div className="text-gray-600">Contact d'urgence</div>
                    <div className="font-medium">{patient.emergencyContact}</div>
                    {patient.emergencyPhone && (
                      <div className="text-gray-500">{patient.emergencyPhone}</div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Consultations & Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          {patient.appointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Rendez-vous à venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded"
                    >
                      <div>
                        <div className="font-medium">
                          {new Date(apt.scheduledAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-sm text-gray-600">{apt.reason}</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Consultation History */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des consultations</CardTitle>
            </CardHeader>
            <CardContent>
              {patient.consultations.length === 0 ? (
                <p className="text-sm text-gray-500 py-4">
                  Aucune consultation enregistrée
                </p>
              ) : (
                <div className="space-y-4">
                  {patient.consultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">
                            {new Date(consultation.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="text-sm text-gray-600">
                            {consultation.consultationNumber}
                          </div>
                        </div>
                        <Link
                          href={`/sante/consultations/${consultation.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Voir détails
                        </Link>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Motif: </span>
                          {consultation.chiefComplaint}
                        </div>
                        {consultation.diagnosis && (
                          <div>
                            <span className="text-gray-600">Diagnostic: </span>
                            {consultation.diagnosis}
                          </div>
                        )}
                        {consultation.treatment && (
                          <div>
                            <span className="text-gray-600">Traitement: </span>
                            {consultation.treatment}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <span className="text-gray-600">Honoraires: </span>
                            <CurrencyAmount amount={consultation.fee} />
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              consultation.isPaid
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {consultation.isPaid ? "Payé" : "Impayé"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
