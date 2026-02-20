// app/(dashboard)/sante/patients/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { generatePatientNumber } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPatient(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const patientNumber = await generatePatientNumber(session.user.entrepriseId)

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const dateOfBirth = formData.get("dateOfBirth")
    ? new Date(formData.get("dateOfBirth") as string)
    : undefined
  const gender = (formData.get("gender") as string) || undefined
  const phone = (formData.get("phone") as string) || undefined
  const email = (formData.get("email") as string) || undefined
  const address = (formData.get("address") as string) || undefined
  const city = (formData.get("city") as string) || undefined
  const bloodType = (formData.get("bloodType") as string) || undefined
  const allergies = (formData.get("allergies") as string) || undefined
  const chronicDiseases = (formData.get("chronicDiseases") as string) || undefined
  const emergencyContact = (formData.get("emergencyContact") as string) || undefined
  const emergencyPhone = (formData.get("emergencyPhone") as string) || undefined
  const insuranceProvider = (formData.get("insuranceProvider") as string) || undefined
  const insuranceNumber = (formData.get("insuranceNumber") as string) || undefined

  const patient = await db.patient.create({
    data: {
      patientNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      city,
      bloodType,
      allergies,
      chronicDiseases,
      emergencyContact,
      emergencyPhone,
      insuranceProvider,
      insuranceNumber,
      entrepriseId: session.user.entrepriseId,
    },
  })

  revalidatePath("/sante/patients")
  revalidatePath("/sante")
  redirect(`/sante/patients/${patient.id}`)
}

export async function updatePatient(patientId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const patient = await db.patient.findFirst({
    where: {
      id: patientId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!patient) {
    throw new Error("Patient non trouvé")
  }

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const dateOfBirth = formData.get("dateOfBirth")
    ? new Date(formData.get("dateOfBirth") as string)
    : null
  const gender = (formData.get("gender") as string) || null
  const phone = (formData.get("phone") as string) || null
  const email = (formData.get("email") as string) || null
  const address = (formData.get("address") as string) || null
  const city = (formData.get("city") as string) || null
  const bloodType = (formData.get("bloodType") as string) || null
  const allergies = (formData.get("allergies") as string) || null
  const chronicDiseases = (formData.get("chronicDiseases") as string) || null
  const emergencyContact = (formData.get("emergencyContact") as string) || null
  const emergencyPhone = (formData.get("emergencyPhone") as string) || null
  const insuranceProvider = (formData.get("insuranceProvider") as string) || null
  const insuranceNumber = (formData.get("insuranceNumber") as string) || null

  await db.patient.update({
    where: { id: patientId },
    data: {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      city,
      bloodType,
      allergies,
      chronicDiseases,
      emergencyContact,
      emergencyPhone,
      insuranceProvider,
      insuranceNumber,
    },
  })

  revalidatePath(`/sante/patients/${patientId}`)
  revalidatePath("/sante/patients")
  revalidatePath("/sante")
  redirect(`/sante/patients/${patientId}`)
}

export async function deletePatient(patientId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const patient = await db.patient.findFirst({
    where: {
      id: patientId,
      entrepriseId: session.user.entrepriseId,
    },
    include: {
      _count: {
        select: { consultations: true },
      },
    },
  })

  if (!patient) {
    throw new Error("Patient non trouvé")
  }

  if (patient._count.consultations > 0) {
    throw new Error(
      "Impossible de supprimer un patient avec des consultations. Supprimez d'abord les consultations."
    )
  }

  await db.patient.delete({
    where: { id: patientId },
  })

  revalidatePath("/sante/patients")
  revalidatePath("/sante")
  redirect("/sante/patients")
}
