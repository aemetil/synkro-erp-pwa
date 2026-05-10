import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getPostHogClient } from "@/lib/posthog-server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, category, description, language } = await req.json()

    if (!email || !category || !description) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
    }

    const categoryLabels: Record<string, string> = {
      bug: "Bug / Erreur",
      affichage: "Problème d'affichage",
      calcul: "Calcul incorrect",
      lenteur: "Lenteur / Performance",
      connexion: "Connexion / Accès",
      suggestion: "Suggestion d'amélioration",
      autre: "Autre",
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_BUG_REPORT_TO!,
      subject: `[Synkro] ${categoryLabels[category] || category}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB;">📬 Nouveau rapport — Synkro</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold; width: 140px;">Email</td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Catégorie</td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${categoryLabels[category] || category}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Langue</td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${language === "ht" ? "🇭🇹 Kreyòl" : "🇫🇷 Français"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #f3f4f6; font-weight: bold; vertical-align: top;">Description</td>
              <td style="padding: 8px; white-space: pre-wrap;">${description}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">
            Envoyé depuis Synkro v1.2.1 — ${new Date().toLocaleString("fr-FR")}
          </p>
        </div>
      `,
    })

    const posthog = getPostHogClient()
    posthog.capture({
      distinctId: email,
      event: "bug_report_submitted",
      properties: {
        category,
        language,
      },
    })
    await posthog.shutdown()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
