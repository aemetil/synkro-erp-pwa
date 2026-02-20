// types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      entrepriseId: string
      entrepriseName: string
      entrepriseSlug: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    role: string
    entrepriseId: string
    entreprise?: {
      id: string
      name: string
      slug: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    entrepriseId: string
    entrepriseName?: string
    entrepriseSlug?: string
  }
}
