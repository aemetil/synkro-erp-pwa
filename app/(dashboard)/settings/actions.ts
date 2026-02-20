// app/(dashboard)/settings/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateEntrepriseSector(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const sector = formData.get("sector") as string

  await db.entreprise.update({
    where: { id: session.user.entrepriseId },
    data: { sector },
  })

  revalidatePath("/settings")
  revalidatePath("/dashboard")
  revalidatePath("/finance")
  revalidatePath("/") // Revalidate layout for sidebar
}
