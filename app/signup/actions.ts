// app/signup/actions.ts
"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function createAccount(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const entrepriseName = formData.get("entrepriseName") as string
    const sector = formData.get("sector") as string

    // Validation
    if (!firstName || !lastName || !email || !password || !entrepriseName) {
      return { success: false, error: "Tous les champs obligatoires doivent être remplis" }
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Les mots de passe ne correspondent pas" }
    }

    if (password.length < 6) {
      return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" }
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "Un compte existe déjà avec cet email" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate slug from entreprise name
    const slug = entrepriseName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
      .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
      + "-" + Math.random().toString(36).substring(2, 7) // Add random suffix for uniqueness

    // Create entreprise and user in a transaction
    await db.$transaction(async (tx) => {
      // Create entreprise
      const entreprise = await tx.entreprise.create({
        data: {
          name: entrepriseName,
          slug,
          email,
          sector: sector || "AUTRE",
        },
      })

      // Create user
      await tx.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          passwordHash: hashedPassword,
          entrepriseId: entreprise.id,
        },
      })
    })

    return { success: true }
  } catch (error: any) {
    console.error("Signup error:", error)
    return { success: false, error: error.message || "Une erreur est survenue lors de la création du compte" }
  }
}