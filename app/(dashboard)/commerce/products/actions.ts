// app/(dashboard)/commerce/products/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateProductCode } from "@/lib/utils"
import { adjustStock } from "@/lib/stock-manager"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Extract form data
  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || undefined
  const categoryId = (formData.get("categoryId") as string) || undefined
  const costPrice = parseFloat(formData.get("costPrice") as string) || 0
  const sellingPrice = parseFloat(formData.get("sellingPrice") as string)
  const taxRate = parseFloat(formData.get("taxRate") as string) || 0
  const currentStock = parseInt(formData.get("currentStock") as string) || 0
  const minStockLevel = parseInt(formData.get("minStockLevel") as string) || 5
  const unit = (formData.get("unit") as string) || "pcs"
  const sku = (formData.get("sku") as string) || undefined
  const barcode = (formData.get("barcode") as string) || undefined

  // Generate product code
  const productCode = await generateProductCode(session.user.entrepriseId)

  // Create product
  const product = await db.product.create({
    data: {
      productCode,
      name,
      description,
      categoryId,
      costPrice,
      sellingPrice,
      taxRate,
      currentStock,
      minStockLevel,
      unit,
      sku,
      barcode,
      isActive: true,
      entrepriseId: session.user.entrepriseId,
    },
  })

  // Create initial stock movement if stock > 0
  if (currentStock > 0) {
    await db.stockMovement.create({
      data: {
        productId: product.id,
        type: "IN",
        quantity: currentStock,
        previousStock: 0,
        newStock: currentStock,
        reason: "Stock initial",
        reference: product.productCode,
        entrepriseId: session.user.entrepriseId,
      },
    })
  }

  revalidatePath("/commerce/products")
  revalidatePath("/commerce")
  redirect("/commerce/products")
}

export async function updateProduct(productId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Verify ownership
  const product = await db.product.findFirst({
    where: {
      id: productId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!product) {
    throw new Error("Produit non trouvé")
  }

  // Extract form data
  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || undefined
  const categoryId = (formData.get("categoryId") as string) || undefined
  const costPrice = parseFloat(formData.get("costPrice") as string) || 0
  const sellingPrice = parseFloat(formData.get("sellingPrice") as string)
  const taxRate = parseFloat(formData.get("taxRate") as string) || 0
  const minStockLevel = parseInt(formData.get("minStockLevel") as string) || 5
  const unit = (formData.get("unit") as string) || "pcs"
  const sku = (formData.get("sku") as string) || undefined
  const barcode = (formData.get("barcode") as string) || undefined
  const isActive = formData.get("isActive") === "true"

  // Update product
  await db.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      categoryId,
      costPrice,
      sellingPrice,
      taxRate,
      minStockLevel,
      unit,
      sku,
      barcode,
      isActive,
    },
  })

  revalidatePath("/commerce/products")
  revalidatePath("/commerce")
  redirect("/commerce/products")
}

export async function deleteProduct(productId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Verify ownership
  const product = await db.product.findFirst({
    where: {
      id: productId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!product) {
    throw new Error("Produit non trouvé")
  }

  // Soft delete (set inactive) instead of hard delete
  await db.product.update({
    where: { id: productId },
    data: { isActive: false },
  })

  revalidatePath("/commerce/products")
  revalidatePath("/commerce")
  redirect("/commerce/products")
}

export async function adjustProductStock(productId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const adjustment = parseInt(formData.get("adjustment") as string)
  const reason = formData.get("reason") as string

  if (!adjustment || adjustment === 0) {
    throw new Error("Ajustement invalide")
  }

  const type = adjustment > 0 ? "IN" : "OUT"

  await adjustStock({
    productId,
    quantityChange: adjustment,
    type,
    reason,
    reference: `ADJ-${Date.now()}`,
    entrepriseId: session.user.entrepriseId,
  })

  revalidatePath(`/commerce/products/${productId}/edit`)
  revalidatePath("/commerce/products")
  revalidatePath("/commerce")
}
