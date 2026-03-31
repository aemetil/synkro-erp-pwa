// app/(dashboard)/sante/consultations/new/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createConsultation } from "../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { CurrencyLabel } from "@/components/currency-label"

export default async function NewConsultationPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Non autorisé</div>
  }

  // Récupérer la liste des patients
  const patients = await db.patient.findMany({
    where: { entrepriseId: session.user.entrepriseId },
    orderBy: { firstName: "asc" },
  })

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/sante/consultations">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle consultation</h1>
          <p className="text-gray-600 mt-1">Créer un dossier de consultation médicale</p>
        </div>
      </div>

      <form action={createConsultation} className="space-y-6">
        {/* Informations patient */}
        <Card>
          <CardHeader>
            <CardTitle>Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="patientId">Sélectionner un patient *</Label>
              <select
                id="patientId"
                name="patientId"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Choisir un patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName} - {patient.patientNumber}
                    {patient.dateOfBirth && ` (${new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} ans)`}
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
          </CardContent>
        </Card>

        {/* Motif et Diagnostic */}
        <Card>
          <CardHeader>
            <CardTitle>Consultation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chiefComplaint">Motif de consultation *</Label>
              <Input
                id="chiefComplaint"
                name="chiefComplaint"
                type="text"
                placeholder="Ex: Fièvre et toux"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptômes</Label>
              <textarea
                id="symptoms"
                name="symptoms"
                rows={3}
                placeholder="Description des symptômes..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnostic</Label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                rows={2}
                placeholder="Diagnostic médical..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatment">Traitement prescrit</Label>
              <textarea
                id="treatment"
                name="treatment"
                rows={3}
                placeholder="Médicaments prescrits, posologie, durée..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* Signes vitaux */}
        <Card>
          <CardHeader>
            <CardTitle>Signes vitaux (optionnel)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Température (°C)</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  step="0.1"
                  min="35"
                  max="42"
                  placeholder="37.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Tension</Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  type="text"
                  placeholder="120/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heartRate">Pouls (bpm)</Label>
                <Input
                  id="heartRate"
                  name="heartRate"
                  type="number"
                  min="40"
                  max="200"
                  placeholder="70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="70.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Taille (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="170.0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Honoraires */}
        <Card>
          <CardHeader>
            <CardTitle>Honoraires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fee">
                  <CurrencyLabel>Montant (HTG) *</CurrencyLabel>
                </Label>
                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  step="any"
                  min="0"
                  defaultValue="0"
                  placeholder="500.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isPaid" className="flex items-center gap-2 h-10">
                  <input
                    id="isPaid"
                    name="isPaid"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>Consultation payée</span>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes du médecin (optionnel)</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Notes complémentaires..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </CardContent>
        </Card>

        {/* Boutons */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Créer la consultation
          </Button>
          <Link href="/sante/consultations" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}