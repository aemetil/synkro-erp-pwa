// app/(dashboard)/sante/patients/[id]/edit/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updatePatient, deletePatient } from "../../actions"
import { notFound } from "next/navigation"
import { DeleteButton } from "@/components/delete-button"

export default async function EditPatientPage({
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
  })

  if (!patient) {
    notFound()
  }

  const dateValue = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
    : ""

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/sante/patients/${patient.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Modifier le patient</h1>
          <p className="text-gray-600">{patient.patientNumber}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updatePatient.bind(null, patient.id)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    defaultValue={patient.firstName}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    defaultValue={patient.lastName}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    defaultValue={dateValue}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexe</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={patient.gender || ""}
                  >
                    <option value="">Non spécifié</option>
                    <option value="MALE">Masculin</option>
                    <option value="FEMALE">Féminin</option>
                    <option value="OTHER">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={patient.phone || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={patient.email || ""}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={patient.address || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" name="city" defaultValue={patient.city || ""} />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">
                Informations médicales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Groupe sanguin</Label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={patient.bloodType || ""}
                  >
                    <option value="">Non spécifié</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={patient.allergies || ""}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="chronicDiseases">Maladies chroniques</Label>
                  <textarea
                    id="chronicDiseases"
                    name="chronicDiseases"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={patient.chronicDiseases || ""}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">
                Contact d'urgence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Nom</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    defaultValue={patient.emergencyContact || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Téléphone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    defaultValue={patient.emergencyPhone || ""}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Assurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insuranceProvider">Assureur</Label>
                  <Input
                    id="insuranceProvider"
                    name="insuranceProvider"
                    defaultValue={patient.insuranceProvider || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceNumber">Numéro de police</Label>
                  <Input
                    id="insuranceNumber"
                    name="insuranceNumber"
                    defaultValue={patient.insuranceNumber || ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t pt-6">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/sante/patients/${patient.id}`}>Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Supprimer le patient</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Le dossier du patient sera définitivement supprimé. Cette action est
            irréversible.
          </p>
          <DeleteButton
            action={async () => {
              "use server"
              await deletePatient(patient.id)
            }}
            itemName={`${patient.firstName} ${patient.lastName}`}
            itemType="patient"
          />
        </CardContent>
      </Card>
    </div>
  )
}
