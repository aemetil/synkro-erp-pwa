// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://getsynkro.app"
const siteDescription = "Solution de gestion complète pour PME et indépendants en Haïti. Finance, ventes, clients, stock et santé — tout en un."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synkro — Gestion d'entreprise pour PME haïtiennes",
    template: "%s | Synkro",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Synkro",
    title: "Synkro — Gestion d'entreprise pour PME haïtiennes",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Synkro — Gestion d'entreprise pour PME haïtiennes",
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "48x48" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SJ8K1QHEB8" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SJ8K1QHEB8');
        `}} />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
