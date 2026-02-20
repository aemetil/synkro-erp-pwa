// app/(dashboard)/sales/new/page.tsx
import { Button } from "@/components/ui/button"
import { createSaleWithProducts } from "../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { SaleFormWithProducts } from "@/components/sales/sale-form-with-products"

export default async function NewSalePage() {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Non autorisé</div>
  }

  // Get active products with stock
  const products = await db.product.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
      isActive: true,
    },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      sellingPrice: true,
      currentStock: true,
      unit: true,
    },
  })

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/sales">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle vente</h1>
          <p className="text-gray-600 mt-1">
            Sélectionnez des produits et créez une vente
          </p>
        </div>
      </div>

      <SaleFormWithProducts products={products} onSubmit={createSaleWithProducts} />
    </div>
  )
}