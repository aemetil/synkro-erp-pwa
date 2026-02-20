// lib/stock-manager.ts
import { db } from "@/lib/db"

export interface AdjustStockParams {
  productId: string
  quantityChange: number // positive or negative
  type: "IN" | "OUT" | "ADJUSTMENT"
  reason?: string
  reference?: string
  entrepriseId: string
}

export interface CreateStockMovementResult {
  previousStock: number
  newStock: number
  movementId: string
}

/**
 * Adjust product stock and create a stock movement record
 * Uses a transaction to ensure data consistency
 */
export async function adjustStock({
  productId,
  quantityChange,
  type,
  reason,
  reference,
  entrepriseId,
}: AdjustStockParams): Promise<CreateStockMovementResult> {
  return await db.$transaction(async (tx) => {
    // Get current product
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { currentStock: true, entrepriseId: true },
    })

    if (!product) {
      throw new Error("Produit non trouvé")
    }

    // Verify ownership
    if (product.entrepriseId !== entrepriseId) {
      throw new Error("Non autorisé")
    }

    const previousStock = product.currentStock
    const newStock = previousStock + quantityChange

    // Prevent negative stock
    if (newStock < 0) {
      throw new Error(
        `Stock insuffisant. Stock actuel: ${previousStock}, Demandé: ${Math.abs(
          quantityChange
        )}`
      )
    }

    // Create movement record
    const movement = await tx.stockMovement.create({
      data: {
        productId,
        type,
        quantity: quantityChange,
        previousStock,
        newStock,
        reason: reason || undefined,
        reference: reference || undefined,
        entrepriseId,
      },
    })

    // Update product stock
    await tx.product.update({
      where: { id: productId },
      data: { currentStock: newStock },
    })

    return {
      previousStock,
      newStock,
      movementId: movement.id,
    }
  })
}

/**
 * Reverse a stock movement (useful when deleting a sale)
 */
export async function reverseStockMovement(
  movementId: string,
  entrepriseId: string
): Promise<void> {
  await db.$transaction(async (tx) => {
    const movement = await tx.stockMovement.findUnique({
      where: { id: movementId },
    })

    if (!movement || movement.entrepriseId !== entrepriseId) {
      throw new Error("Mouvement non trouvé")
    }

    // Create reverse movement
    await adjustStock({
      productId: movement.productId,
      quantityChange: -movement.quantity,
      type: movement.type === "IN" ? "OUT" : "IN",
      reason: `Annulation: ${movement.reason || ""}`,
      reference: `REV-${movement.reference || movement.id}`,
      entrepriseId,
    })
  })
}

/**
 * Get stock movements for a product
 */
export async function getProductStockMovements(
  productId: string,
  entrepriseId: string,
  limit = 10
) {
  return await db.stockMovement.findMany({
    where: {
      productId,
      entrepriseId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      product: {
        select: {
          name: true,
          productCode: true,
        },
      },
    },
  })
}

/**
 * Get low stock products (below minimum level)
 */
export async function getLowStockProducts(entrepriseId: string) {
  return await db.product.findMany({
    where: {
      entrepriseId,
      isActive: true,
      currentStock: {
        lte: db.product.fields.minStockLevel,
      },
    },
    orderBy: {
      currentStock: "asc",
    },
    include: {
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  })
}

/**
 * Get products out of stock
 */
export async function getOutOfStockProducts(entrepriseId: string) {
  return await db.product.findMany({
    where: {
      entrepriseId,
      isActive: true,
      currentStock: 0,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })
}
