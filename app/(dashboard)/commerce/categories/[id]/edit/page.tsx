// app/(dashboard)/commerce/categories/[id]/edit/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { updateCategory, deleteCategory } from "../../actions"
import { notFound } from "next/navigation"
import { DeleteButton } from "@/components/delete-button"

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const category = await db.productCategory.findFirst({
    where: {
      id: params.id,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  if (!category) {
    notFound()
  }

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
          <h1 className="text-2xl font-bold">Modifier la catégorie</h1>
          <p className="text-gray-600">{category._count.products} produit(s)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateCategory.bind(null, category.id)} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={category.name}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={category.description || ""}
              />
            </div>

            <div>
              <Label htmlFor="color">Couleur</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  defaultValue={category.color || "#3B82F6"}
                  className="w-20 h-10"
                />
                <p className="text-sm text-gray-500 flex items-center">
                  Couleur pour les badges
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/commerce/categories">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Delete Section */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Supprimer la catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Les produits de cette catégorie ne seront pas supprimés, ils seront
            simplement sans catégorie.
          </p>
          <DeleteButton
            action={async () => {
              "use server"
              await deleteCategory(category.id)
            }}
            itemName={category.name}
            itemType="catégorie"
          />
        </CardContent>
      </Card>
    </div>
  )
}
