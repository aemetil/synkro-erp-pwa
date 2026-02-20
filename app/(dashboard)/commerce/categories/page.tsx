// app/(dashboard)/commerce/categories/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Pencil, FolderOpen } from "lucide-react"
import { notFound } from "next/navigation"

export default async function CategoriesPage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    notFound()
  }

  const categories = await db.productCategory.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catégories de produits</h1>
          <p className="text-gray-600">Organisez vos produits par catégorie</p>
        </div>
        <Button asChild>
          <Link href="/commerce/categories/new">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Link>
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des catégories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Aucune catégorie
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Créez des catégories pour organiser vos produits.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/commerce/categories/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle catégorie
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/commerce/categories/${category.id}/edit`}
                  className="block"
                >
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color || "#3B82F6" }}
                      />
                      <Pencil className="h-4 w-4 text-gray-400" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {category._count.products} produit(s)
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
