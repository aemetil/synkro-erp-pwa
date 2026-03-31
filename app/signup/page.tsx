// app/signup/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { createAccount } from "./actions"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await createAccount(formData)

      if (result.success) {
        // Redirect to login with success message
        router.push("/login?registered=true")
      } else {
        setError(result.error || "Une erreur est survenue")
        setLoading(false)
      }
    } catch (err: any) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image src="/logos/s_logo.png" alt="S" width={36} height={36} priority />
            <span className="font-bold text-xl text-blue-600">Synkro</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-center">
            Commencez à gérer votre entreprise en quelques minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Jean"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Dupont"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700">Informations entreprise</h3>
              <div className="space-y-2">
                <Label htmlFor="entrepriseName">Nom de l'entreprise *</Label>
                <Input
                  id="entrepriseName"
                  name="entrepriseName"
                  placeholder="Mon Entreprise"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Secteur d'activité</Label>
                <select
                  id="sector"
                  name="sector"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={loading}
                >
                  <option value="AUTRE">Tous les modules (Recommandé)</option>
                  <option value="COMMERCE">Commerce uniquement</option>
                  <option value="SANTE">Santé uniquement</option>
                </select>
                <p className="text-xs text-gray-500">
                  Vous pourrez modifier ce paramètre plus tard dans les paramètres
                </p>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-700">Sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    minLength={6}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500">Minimum 6 caractères</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    minLength={6}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>

            <p className="text-xs text-center text-gray-500">
              En créant un compte, vous acceptez nos{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}