"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createSale(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Extraire les données du formulaire
  const customerName = formData.get("customerName") as string
  const subtotal = parseFloat(formData.get("subtotal") as string)
  const taxRate = parseFloat(formData.get("taxRate") as string) || 0
  const discount = parseFloat(formData.get("discount") as string) || 0
  const paymentMethod = formData.get("paymentMethod") as string
  const paymentStatus = formData.get("paymentStatus") as string
  const notes = formData.get("notes") as string

  // Calculs
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount - discount
  const paidAmount = paymentStatus === "PAID" ? total : 0

  // Générer le numéro de vente
  const salesCount = await db.sale.count({
    where: { entrepriseId: session.user.entrepriseId },
  })
  const saleNumber = `SALE-${new Date().getFullYear()}-${String(salesCount + 1).padStart(4, "0")}`

  // Créer la vente
  await db.sale.create({
    data: {
      saleNumber,
      customerName,
      subtotal,
      taxAmount,
      discount,
      total,
      paymentMethod,
      paymentStatus,
      paidAmount,
      paidDate: paymentStatus === "PAID" ? new Date() : null,
      notes: notes || null,
      entrepriseId: session.user.entrepriseId,
    },
  })

  // Revalider le cache et rediriger
  revalidatePath("/sales")
  revalidatePath("/dashboard")
  redirect("/sales")
}

export async function createSaleWithProducts(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Parse items from form
  const customerName = formData.get("customerName") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const paymentStatus = formData.get("paymentStatus") as string
  const notes = formData.get("notes") as string
  const itemsJson = formData.get("items") as string

  if (!itemsJson) {
    throw new Error("Aucun produit sélectionné")
  }

  const items = JSON.parse(itemsJson) as Array<{
    productId: string
    quantity: number
    unitPrice: number
  }>

  if (items.length === 0) {
    throw new Error("Aucun produit sélectionné")
  }

  // Générer le numéro de vente
  const salesCount = await db.sale.count({
    where: { entrepriseId: session.user.entrepriseId },
  })
  const saleNumber = `SALE-${new Date().getFullYear()}-${String(salesCount + 1).padStart(4, "0")}`

  // Calculer le total
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  const total = subtotal
  const paidAmount = paymentStatus === "PAID" ? total : 0

  // Créer la vente avec les items ET déduire du stock dans une transaction
  await db.$transaction(async (tx) => {
    // 1. Créer la vente
    const newSale = await tx.sale.create({
      data: {
        saleNumber,
        customerName,
        subtotal,
        taxAmount: 0,
        discount: 0,
        total,
        paymentMethod,
        paymentStatus,
        paidAmount,
        paidDate: paymentStatus === "PAID" ? new Date() : null,
        notes: notes || null,
        entrepriseId: session.user.entrepriseId,
      },
    })

    // 2. Créer les SaleItems et déduire du stock
    for (const item of items) {
      // Récupérer le produit pour avoir son nom
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        throw new Error(`Produit ${item.productId} non trouvé`)
      }

      // Vérifier le stock disponible
      if (product.currentStock < item.quantity) {
        throw new Error(
          `Stock insuffisant pour ${product.name}. Disponible: ${product.currentStock} ${product.unit}`
        )
      }

      // Créer le SaleItem
      await tx.saleItem.create({
        data: {
          saleId: newSale.id,
          productId: product.id,
          name: product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: 0,
          total: item.quantity * item.unitPrice,
        },
      })

      const previousStock = product.currentStock
      const newStock = previousStock - item.quantity

      // Déduire du stock
      await tx.product.update({
        where: { id: product.id },
        data: {
          currentStock: newStock,
        },
      })

      // Créer un mouvement de stock (OUT)
      await tx.stockMovement.create({
        data: {
          productId: product.id,
          type: "OUT",
          quantity: item.quantity,
          previousStock,
          newStock,
          reason: `Vente ${saleNumber}`,
          reference: newSale.id,
          entrepriseId: session.user.entrepriseId,
        },
      })
    }
  })

  // Revalider le cache
  revalidatePath("/sales")
  revalidatePath("/dashboard")
  revalidatePath("/finance")
  revalidatePath("/commerce")
  redirect("/sales")
}

export async function createExpense(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const description = formData.get("description") as string
  const amount = parseFloat(formData.get("amount") as string)
  const category = formData.get("category") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const supplierName = formData.get("supplierName") as string
  const notes = formData.get("notes") as string

  await db.expense.create({
    data: {
      description,
      amount,
      category,
      paymentMethod,
      supplierName: supplierName || null,
      notes: notes || null,
      entrepriseId: session.user.entrepriseId,
    },
  })

  revalidatePath("/finance")
  revalidatePath("/dashboard")
  redirect("/finance")
}

export async function updateSale(saleId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Vérifier que la vente appartient à l'entreprise
  const existingSale = await db.sale.findFirst({
    where: { id: saleId, entrepriseId: session.user.entrepriseId },
  })

  if (!existingSale) {
    throw new Error("Vente non trouvée")
  }

  const customerName = formData.get("customerName") as string
  const subtotal = parseFloat(formData.get("subtotal") as string)
  const taxRate = parseFloat(formData.get("taxRate") as string) || 0
  const discount = parseFloat(formData.get("discount") as string) || 0
  const paymentMethod = formData.get("paymentMethod") as string
  const paymentStatus = formData.get("paymentStatus") as string
  const notes = formData.get("notes") as string

  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount - discount
  const paidAmount = paymentStatus === "PAID" ? total : 0

  await db.sale.update({
    where: { id: saleId },
    data: {
      customerName,
      subtotal,
      taxAmount,
      discount,
      total,
      paymentMethod,
      paymentStatus,
      paidAmount,
      paidDate: paymentStatus === "PAID" ? new Date() : null,
      notes: notes || null,
    },
  })

  revalidatePath("/sales")
  revalidatePath("/dashboard")
  redirect("/sales")
}

export async function updateExpense(expenseId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Vérifier que la dépense appartient à l'entreprise
  const existingExpense = await db.expense.findFirst({
    where: { id: expenseId, entrepriseId: session.user.entrepriseId },
  })

  if (!existingExpense) {
    throw new Error("Dépense non trouvée")
  }

  const description = formData.get("description") as string
  const amount = parseFloat(formData.get("amount") as string)
  const category = formData.get("category") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const supplierName = formData.get("supplierName") as string
  const notes = formData.get("notes") as string

  await db.expense.update({
    where: { id: expenseId },
    data: {
      description,
      amount,
      category,
      paymentMethod,
      supplierName: supplierName || null,
      notes: notes || null,
    },
  })

  revalidatePath("/finance")
  revalidatePath("/dashboard")
  redirect("/finance")
}

export async function deleteSale(saleId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Vérifier que la vente appartient à l'entreprise
  const existingSale = await db.sale.findFirst({
    where: { id: saleId, entrepriseId: session.user.entrepriseId },
  })

  if (!existingSale) {
    throw new Error("Vente non trouvée")
  }

  await db.sale.delete({
    where: { id: saleId },
  })

  revalidatePath("/sales")
  revalidatePath("/dashboard")
  redirect("/sales")
}

export async function deleteExpense(expenseId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  // Vérifier que la dépense appartient à l'entreprise
  const existingExpense = await db.expense.findFirst({
    where: { id: expenseId, entrepriseId: session.user.entrepriseId },
  })

  if (!existingExpense) {
    throw new Error("Dépense non trouvée")
  }

  await db.expense.delete({
    where: { id: expenseId },
  })

  revalidatePath("/finance")
  revalidatePath("/dashboard")
  redirect("/finance")
}