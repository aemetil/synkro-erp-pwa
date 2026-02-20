// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(
  amount: number,
  currency = "HTG",
  locale = "fr-HT"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}

// Format date
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

// Generate unique ID (for sale numbers, etc.)
export function generateId(prefix: string, count: number): string {
  const year = new Date().getFullYear()
  const paddedCount = String(count + 1).padStart(4, "0")
  return `${prefix}-${year}-${paddedCount}`
}

// Calculate percentage change
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

// Generate product code
export async function generateProductCode(entrepriseId: string): Promise<string> {
  const { db } = await import("@/lib/db")
  const year = new Date().getFullYear()
  const count = await db.product.count({
    where: {
      entrepriseId,
      productCode: { startsWith: `PROD-${year}` },
    },
  })
  return generateId("PROD", count)
}

// Generate patient number
export async function generatePatientNumber(entrepriseId: string): Promise<string> {
  const { db } = await import("@/lib/db")
  const year = new Date().getFullYear()
  const count = await db.patient.count({
    where: {
      entrepriseId,
      patientNumber: { startsWith: `PAT-${year}` },
    },
  })
  return generateId("PAT", count)
}

// Generate consultation number
export async function generateConsultationNumber(entrepriseId: string): Promise<string> {
  const { db } = await import("@/lib/db")
  const year = new Date().getFullYear()
  const count = await db.consultation.count({
    where: {
      entrepriseId,
      consultationNumber: { startsWith: `CONS-${year}` },
    },
  })
  return generateId("CONS", count)
}
