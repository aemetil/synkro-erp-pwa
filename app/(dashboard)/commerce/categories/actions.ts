// app/(dashboard)/commerce/categories/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCategory(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || undefined
  const color = (formData.get("color") as string) || "#3B82F6"

  await db.productCategory.create({
    data: {
      name,
      description,
      color,
      entrepriseId: session.user.entrepriseId,
    },
  })

  revalidatePath("/commerce/categories")
  revalidatePath("/commerce/products")
  redirect("/commerce/categories")
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const category = await db.productCategory.findFirst({
    where: {
      id: categoryId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!category) {
    throw new Error("Catégorie non trouvée")
  }

  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || undefined
  const color = (formData.get("color") as string) || "#3B82F6"

  await db.productCategory.update({
    where: { id: categoryId },
    data: {
      name,
      description,
      color,
    },
  })

  revalidatePath("/commerce/categories")
  revalidatePath("/commerce/products")
  redirect("/commerce/categories")
}

export async function deleteCategory(categoryId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const category = await db.productCategory.findFirst({
    where: {
      id: categoryId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!category) {
    throw new Error("Catégorie non trouvée")
  }

  // Products will have their categoryId set to null (onDelete: SetNull)
  await db.productCategory.delete({
    where: { id: categoryId },
  })

  revalidatePath("/commerce/categories")
  revalidatePath("/commerce/products")
  redirect("/commerce/categories")
}
