// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"

const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis")
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          include: {
            entreprise: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        })

        if (!user || !user.passwordHash) {
          throw new Error("Email ou mot de passe incorrect")
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isPasswordValid) {
          throw new Error("Email ou mot de passe incorrect")
        }

        if (!user.isActive) {
          throw new Error("Compte désactivé")
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          entrepriseId: user.entrepriseId,
          entreprise: user.entreprise,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.entrepriseId = user.entrepriseId

        if (user.entreprise) {
          token.entrepriseName = user.entreprise.name
          token.entrepriseSlug = user.entreprise.slug
        }
      }

      // Update session (when calling update())
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.entrepriseId = token.entrepriseId as string
        session.user.entrepriseName = token.entrepriseName as string
        session.user.entrepriseSlug = token.entrepriseSlug as string
      }

      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
export const authOptions = authConfig
