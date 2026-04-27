// app/(dashboard)/sante/consultations/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateConsultationNumber } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createConsultation(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const consultationNumber = await generateConsultationNumber(session.user.entrepriseId)

  const patientId = formData.get("patientId") as string
  const chiefComplaint = formData.get("chiefComplaint") as string
  const symptoms = (formData.get("symptoms") as string) || undefined
  const diagnosis = (formData.get("diagnosis") as string) || undefined
  const treatment = (formData.get("treatment") as string) || undefined
  const notes = (formData.get("notes") as string) || undefined
  const temperature = formData.get("temperature")
    ? parseFloat(formData.get("temperature") as string)
    : undefined
  const bloodPressure = (formData.get("bloodPressure") as string) || undefined
  const heartRate = formData.get("heartRate")
    ? parseInt(formData.get("heartRate") as string)
    : undefined
  const weight = formData.get("weight")
    ? parseFloat(formData.get("weight") as string)
    : undefined
  const height = formData.get("height")
    ? parseFloat(formData.get("height") as string)
    : undefined
  const fee = parseFloat(formData.get("fee") as string) || 0
  const isPaid = formData.get("isPaid") === "on"

  const consultation = await db.consultation.create({
    data: {
      consultationNumber,
      patientId,
      chiefComplaint,
      symptoms,
      diagnosis,
      treatment,
      notes,
      temperature,
      bloodPressure,
      heartRate,
      weight,
      height,
      fee,
      isPaid,
      entrepriseId: session.user.entrepriseId,
    },
  })

  revalidatePath("/sante/consultations")
  revalidatePath(`/sante/patients/${patientId}`)
  revalidatePath("/sante")
  revalidatePath("/dashboard")
  revalidatePath("/reports")
  redirect(`/sante/consultations/${consultation.id}`)
}

export async function updateConsultation(consultationId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const consultation = await db.consultation.findFirst({
    where: {
      id: consultationId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!consultation) {
    throw new Error("Consultation non trouvée")
  }

  const chiefComplaint = formData.get("chiefComplaint") as string
  const symptoms = (formData.get("symptoms") as string) || null
  const diagnosis = (formData.get("diagnosis") as string) || null
  const treatment = (formData.get("treatment") as string) || null
  const notes = (formData.get("notes") as string) || null
  const temperature = formData.get("temperature")
    ? parseFloat(formData.get("temperature") as string)
    : null
  const bloodPressure = (formData.get("bloodPressure") as string) || null
  const heartRate = formData.get("heartRate")
    ? parseInt(formData.get("heartRate") as string)
    : null
  const weight = formData.get("weight")
    ? parseFloat(formData.get("weight") as string)
    : null
  const height = formData.get("height")
    ? parseFloat(formData.get("height") as string)
    : null
  const fee = parseFloat(formData.get("fee") as string) || 0
  const isPaid = formData.get("isPaid") === "on"

  await db.consultation.update({
    where: { id: consultationId },
    data: {
      chiefComplaint,
      symptoms,
      diagnosis,
      treatment,
      notes,
      temperature,
      bloodPressure,
      heartRate,
      weight,
      height,
      fee,
      isPaid,
    },
  })

  revalidatePath(`/sante/consultations/${consultationId}`)
  revalidatePath("/sante/consultations")
  revalidatePath(`/sante/patients/${consultation.patientId}`)
  revalidatePath("/sante")
  revalidatePath("/dashboard")
  revalidatePath("/reports")
  redirect(`/sante/consultations/${consultationId}`)
}

export async function markConsultationAsPaid(consultationId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const consultation = await db.consultation.findFirst({
    where: { id: consultationId, entrepriseId: session.user.entrepriseId },
  })

  if (!consultation) {
    throw new Error("Consultation non trouvée")
  }

  await db.consultation.update({
    where: { id: consultationId },
    data: { isPaid: true },
  })

  revalidatePath(`/sante/consultations/${consultationId}`)
  revalidatePath("/sante/consultations")
  revalidatePath(`/sante/patients/${consultation.patientId}`)
  revalidatePath("/sante")
  revalidatePath("/finance")
  revalidatePath("/dashboard")
  revalidatePath("/reports")
}

export async function deleteConsultation(consultationId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const consultation = await db.consultation.findFirst({
    where: {
      id: consultationId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!consultation) {
    throw new Error("Consultation non trouvée")
  }

  await db.consultation.delete({
    where: { id: consultationId },
  })

  revalidatePath("/sante/consultations")
  revalidatePath(`/sante/patients/${consultation.patientId}`)
  revalidatePath("/sante")
  revalidatePath("/dashboard")
  revalidatePath("/reports")
  redirect("/sante/consultations")
}
