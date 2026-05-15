// app/(dashboard)/sales/[id]/edit/page.tsx
import { Button } from "@/components/ui/button"
import { updateSaleWithProducts, deleteSale } from "../../actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DeleteButton } from "@/components/delete-button"
import { SaleFormWithProducts } from "@/components/sales/sale-form-with-products"

export default async function EditSalePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    return <div>Erreur: Non autorisé</div>
  }

  const sale = await db.sale.findFirst({
    where: {
      id,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sellingPrice: true,
              currentStock: true,
              unit: true,
            },
          },
        },
      },
    },
  })

  if (!sale) {
    notFound()
  }

  const saleProductIds = sale.items
    .map((item) => item.productId)
    .filter((productId): productId is string => Boolean(productId))

  const products = await db.product.findMany({
    where: {
      entrepriseId: session.user.entrepriseId,
      OR: [
        { isActive: true },
        { id: { in: saleProductIds } },
      ],
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

  const initialItems = sale.items
    .filter((item) => item.productId && item.product)
    .map((item) => ({
      productId: item.productId!,
      productName: item.product?.name ?? item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      availableStock: (item.product?.currentStock ?? 0) + item.quantity,
      unit: item.product?.unit ?? "pcs",
    }))

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
          <h1 className="text-3xl font-bold text-gray-900">Modifier la vente</h1>
          <p className="text-gray-600 mt-1">{sale.saleNumber}</p>
        </div>
      </div>

      <SaleFormWithProducts
        products={products}
        onSubmit={updateSaleWithProducts.bind(null, sale.id)}
        initialSale={{
          customerName: sale.customerName,
          paymentMethod: sale.paymentMethod,
          paymentStatus: sale.paymentStatus,
          notes: sale.notes,
          items: initialItems,
        }}
        submitLabel="Enregistrer les modifications"
        pendingLabel="Modification en cours..."
      />

      <div className="mt-8 pt-8 border-t">
        <DeleteButton
          action={deleteSale.bind(null, sale.id)}
          itemName={sale.saleNumber}
          itemType="vente"
        />
      </div>
    </div>
  )
}
