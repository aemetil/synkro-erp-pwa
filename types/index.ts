// types/index.ts
export type Role = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER" | "ACCOUNTANT"

export type PaymentMethod = "CASH" | "CARD" | "BANK_TRANSFER" | "CHECK" | "MOBILE_PAYMENT" | "OTHER"

export type PaymentStatus = "PENDING" | "PAID" | "PARTIAL" | "OVERDUE" | "CANCELLED" | "REFUNDED"

export type ExpenseCategory =
  | "RENT"
  | "SALARIES"
  | "SUPPLIES"
  | "UTILITIES"
  | "MARKETING"
  | "EQUIPMENT"
  | "INSURANCE"
  | "TAXES"
  | "TRANSPORT"
  | "MAINTENANCE"
  | "OTHER"

export type SubscriptionTier = "FREE" | "STARTER" | "PROFESSIONAL" | "ENTERPRISE"

export type SubscriptionStatus = "TRIAL" | "ACTIVE" | "PAST_DUE" | "CANCELLED" | "EXPIRED"
