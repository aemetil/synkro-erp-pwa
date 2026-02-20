// app/(dashboard)/commerce/categories/new/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createCategory } from "../actions"

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/commerce/categories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nouvelle catégorie</h1>
          <p className="text-gray-600">Créez une nouvelle catégorie de produits</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCategory} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Boissons, Alimentation"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description de la catégorie"
              />
            </div>

            <div>
              <Label htmlFor="color">Couleur</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  defaultValue="#3B82F6"
                  className="w-20 h-10"
                />
                <p className="text-sm text-gray-500 flex items-center">
                  Couleur pour les badges
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button type="submit">Créer la catégorie</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/commerce/categories">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
