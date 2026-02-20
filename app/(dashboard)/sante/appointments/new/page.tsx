// app/(dashboard)/sante/appointments/new/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createAppointment } from "../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export default async function NewAppointmentPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Non autorisé</div>
  }

  // Récupérer la liste des patients
  const patients = await db.patient.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    orderBy: { firstName: "asc" },
  })

  // Date et heure par défaut (maintenant + 1h)
  const defaultDate = new Date()
  defaultDate.setHours(defaultDate.getHours() + 1)
  defaultDate.setMinutes(0)
  const defaultDateTime = defaultDate.toISOString().slice(0, 16)

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/sante/appointments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouveau rendez-vous</h1>
          <p className="text-gray-600 mt-1">Planifier un rendez-vous pour un patient</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAppointment} className="space-y-6">
            {/* Patient */}
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient *</Label>
              <select
                id="patientId"
                name="patientId"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Sélectionner un patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName} - {patient.patientNumber}
                  </option>
                ))}
              </select>
              {patients.length === 0 && (
                <p className="text-sm text-gray-500">
                  Aucun patient trouvé.{" "}
                  <Link href="/sante/patients/new" className="text-blue-600 hover:underline">
                    Créer un patient
                  </Link>
                </p>
              )}
            </div>

            {/* Date et heure + Durée */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Date et heure *</Label>
                <Input
                  id="scheduledAt"
                  name="scheduledAt"
                  type="datetime-local"
                  defaultValue={defaultDateTime}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="15"
                  step="15"
                  defaultValue="30"
                  placeholder="30"
                  required
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type de rendez-vous *</Label>
              <select
                id="type"
                name="type"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="CONSULTATION">Consultation</option>
                <option value="FOLLOW_UP">Suivi</option>
                <option value="EMERGENCY">Urgence</option>
                <option value="PROCEDURE">Procédure</option>
              </select>
            </div>

            {/* Motif */}
            <div className="space-y-2">
              <Label htmlFor="reason">Motif (optionnel)</Label>
              <textarea
                id="reason"
                name="reason"
                rows={2}
                placeholder="Ex: Contrôle annuel, douleur abdominale..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Notes additionnelles..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Créer le rendez-vous
              </Button>
              <Link href="/sante/appointments" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}