// app/(dashboard)/settings/page.tsx
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, User, Bell, Shield, CreditCard, Tag, Coins } from "lucide-react"
import { updateEntrepriseSector } from "./actions"
import { CurrencySelector } from "@/components/currency-selector"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    return <div>Erreur: Session non trouvée</div>
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      entreprise: true,
    },
  })

  if (!user) {
    return <div>Erreur: Utilisateur non trouvé</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">
          Gérez les paramètres de votre compte et de votre entreprise
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-600" />
              <CardTitle>Informations de l'entreprise</CardTitle>
            </div>
            <CardDescription>
              Gérez les informations de votre entreprise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input
                  id="company-name"
                  defaultValue={user.entreprise.name}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-slug">Identifiant</Label>
                <Input
                  id="company-slug"
                  defaultValue={user.entreprise.slug}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input
                  id="company-email"
                  type="email"
                  defaultValue={user.entreprise.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Téléphone</Label>
                <Input
                  id="company-phone"
                  defaultValue={user.entreprise.phone || ""}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Adresse</Label>
              <Input
                id="company-address"
                defaultValue={user.entreprise.address || ""}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-city">Ville</Label>
                <Input
                  id="company-city"
                  defaultValue={user.entreprise.city || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-postal">Code postal</Label>
                <Input
                  id="company-postal"
                  defaultValue={user.entreprise.postalCode || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-country">Pays</Label>
                <Input
                  id="company-country"
                  defaultValue={user.entreprise.country}
                  disabled
                />
              </div>
            </div>
            <div className="pt-4">
              <Button disabled>Enregistrer les modifications</Button>
            </div>
          </CardContent>
        </Card>

        {/* Sector Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-gray-600" />
              <CardTitle>Secteur d'activité</CardTitle>
            </div>
            <CardDescription>
              Choisissez votre secteur pour activer les modules correspondants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateEntrepriseSector} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Secteur</Label>
                <select
                  id="sector"
                  name="sector"
                  defaultValue={user.entreprise.sector || "AUTRE"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMMERCE">Commerce - Gestion de produits et stock</option>
                  <option value="SANTE">Santé - Gestion de patients et consultations</option>
                  <option value="AUTRE">Autre - Tous les modules disponibles</option>
                </select>
                <p className="text-sm text-gray-500">
                  Le secteur détermine quels modules apparaissent dans votre menu de navigation
                </p>
              </div>
              <Button type="submit">Enregistrer le secteur</Button>
            </form>
          </CardContent>
        </Card>

        {/* Currency */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-gray-600" />
              <CardTitle>Devise</CardTitle>
            </div>
            <CardDescription>
              Choisissez la devise d'affichage de vos montants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencySelector />
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <CardTitle>Profil utilisateur</CardTitle>
            </div>
            <CardDescription>
              Gérez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Nom complet</Label>
                <Input
                  id="user-name"
                  defaultValue={user.name || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  defaultValue={user.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Rôle</Label>
                <Input
                  id="user-role"
                  defaultValue={user.role}
                  disabled
                />
              </div>
            </div>
            <div className="pt-4">
              <Button disabled>Mettre à jour le profil</Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <CardTitle>Abonnement</CardTitle>
            </div>
            <CardDescription>
              Gérez votre abonnement et facturation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Plan actuel</p>
                <p className="text-lg font-semibold">{user.entreprise.subscriptionTier}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Statut</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.entreprise.subscriptionStatus === "ACTIVE" ? "bg-green-100 text-green-800" :
                    user.entreprise.subscriptionStatus === "TRIAL" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {user.entreprise.subscriptionStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Fonctionnalités activées</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>✓ Nombre maximum d'utilisateurs: {user.entreprise.maxUsers}</li>
                <li>{user.entreprise.aiEnabled ? "✓" : "✗"} IA et automatisation</li>
                <li>{user.entreprise.advancedReports ? "✓" : "✗"} Rapports avancés</li>
                <li>{user.entreprise.multiUser ? "✓" : "✗"} Multi-utilisateurs</li>
              </ul>
            </div>
            <div className="pt-4">
              <Button disabled>Mettre à niveau</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configurez vos préférences de notification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-gray-500">Recevoir les notifications importantes par email</p>
                </div>
                <Button variant="outline" size="sm" disabled>Activer</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rappels de paiement</p>
                  <p className="text-sm text-gray-500">Recevoir des rappels pour les factures impayées</p>
                </div>
                <Button variant="outline" size="sm" disabled>Activer</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rapports mensuels</p>
                  <p className="text-sm text-gray-500">Recevoir un résumé mensuel de votre activité</p>
                </div>
                <Button variant="outline" size="sm" disabled>Activer</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <CardTitle>Sécurité</CardTitle>
            </div>
            <CardDescription>
              Gérez la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mot de passe</p>
                <p className="text-sm text-gray-500">Dernière modification il y a 30 jours</p>
              </div>
              <Button variant="outline" disabled>Changer</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
              </div>
              <Button variant="outline" disabled>Configurer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Cette page de paramètres affiche les données actuelles en mode lecture seule.
              Les fonctionnalités d'édition seront activées dans les prochaines versions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
