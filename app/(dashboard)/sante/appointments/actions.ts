// app/(dashboard)/sante/appointments/actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createAppointment(formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const patientId = formData.get("patientId") as string
  const scheduledAt = new Date(formData.get("scheduledAt") as string)
  const duration = parseInt(formData.get("duration") as string) || 30
  const type = formData.get("type") as string
  const reason = (formData.get("reason") as string) || undefined
  const notes = (formData.get("notes") as string) || undefined

  await db.appointment.create({
    data: {
      patientId,
      scheduledAt,
      duration,
      type,
      status: "SCHEDULED",
      reason,
      notes,
      entrepriseId: session.user.entrepriseId,
    },
  })

  revalidatePath("/sante/appointments")
  revalidatePath(`/sante/patients/${patientId}`)
  revalidatePath("/sante")
  redirect("/sante/appointments")
}

export async function updateAppointment(appointmentId: string, formData: FormData) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const appointment = await db.appointment.findFirst({
    where: {
      id: appointmentId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!appointment) {
    throw new Error("Rendez-vous non trouvé")
  }

  const scheduledAt = new Date(formData.get("scheduledAt") as string)
  const duration = parseInt(formData.get("duration") as string) || 30
  const type = formData.get("type") as string
  const status = formData.get("status") as string
  const reason = (formData.get("reason") as string) || null
  const notes = (formData.get("notes") as string) || null

  await db.appointment.update({
    where: { id: appointmentId },
    data: {
      scheduledAt,
      duration,
      type,
      status,
      reason,
      notes,
    },
  })

  revalidatePath(`/sante/appointments/${appointmentId}/edit`)
  revalidatePath("/sante/appointments")
  revalidatePath(`/sante/patients/${appointment.patientId}`)
  revalidatePath("/sante")
  redirect("/sante/appointments")
}

export async function deleteAppointment(appointmentId: string) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const appointment = await db.appointment.findFirst({
    where: {
      id: appointmentId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!appointment) {
    throw new Error("Rendez-vous non trouvé")
  }

  await db.appointment.delete({
    where: { id: appointmentId },
  })

  revalidatePath("/sante/appointments")
  revalidatePath(`/sante/patients/${appointment.patientId}`)
  revalidatePath("/sante")
  redirect("/sante/appointments")
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string
) {
  const session = await auth()

  if (!session?.user?.entrepriseId) {
    throw new Error("Non autorisé")
  }

  const appointment = await db.appointment.findFirst({
    where: {
      id: appointmentId,
      entrepriseId: session.user.entrepriseId,
    },
  })

  if (!appointment) {
    throw new Error("Rendez-vous non trouvé")
  }

  await db.appointment.update({
    where: { id: appointmentId },
    data: { status },
  })

  revalidatePath("/sante/appointments")
  revalidatePath(`/sante/patients/${appointment.patientId}`)
  revalidatePath("/sante")
}
