// app/(dashboard)/sante/patients/new/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createPatient } from "../actions"

export default function NewPatientPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/sante/patients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nouveau patient</h1>
          <p className="text-gray-600">Créer un dossier patient</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPatient} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" />
                </div>
                <div>
                  <Label htmlFor="gender">Sexe</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Non spécifié</option>
                    <option value="MALE">Masculin</option>
                    <option value="FEMALE">Féminin</option>
                    <option value="OTHER">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" name="address" />
                </div>
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" name="city" />
                </div>
              </div>
            </div>

            {/* Medical */}
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
                    placeholder="Liste des allergies connues"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="chronicDiseases">Maladies chroniques</Label>
                  <textarea
                    id="chronicDiseases"
                    name="chronicDiseases"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Liste des maladies chroniques"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">
                Contact d'urgence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Nom</Label>
                  <Input id="emergencyContact" name="emergencyContact" />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Téléphone</Label>
                  <Input id="emergencyPhone" name="emergencyPhone" type="tel" />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium text-sm text-gray-700">Assurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insuranceProvider">Assureur</Label>
                  <Input id="insuranceProvider" name="insuranceProvider" />
                </div>
                <div>
                  <Label htmlFor="insuranceNumber">Numéro de police</Label>
                  <Input id="insuranceNumber" name="insuranceNumber" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 border-t pt-6">
              <Button type="submit">Créer le dossier</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/sante/patients">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
