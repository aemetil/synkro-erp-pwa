// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import {
  ArrowRight,
  DollarSign,
  Package,
  Heart,
  BarChart3,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Synkro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://synkro.app",
  description: "Solution de gestion complète pour PME et indépendants en Haïti. Finance, ventes, clients, stock et santé.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Essai gratuit disponible" },
  creator: { "@type": "Organization", name: "Synkro", url: "https://synkro.app" },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logos/s_logo.png" alt="S" width={32} height={32} priority style={{ width: 'auto', height: 'auto' }} />
            <span className="font-bold text-lg text-blue-600 hidden md:block">Synkro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Fonctionnalités
            </a>
            <a href="#modules" className="text-sm text-gray-600 hover:text-gray-900">
              Modules
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Tarifs
            </a>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Connexion
              </Button>
            </Link>
          </nav>
          <Link href="/login" className="md:hidden">
            <Button size="sm">Connexion</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Version 1.2.1 - Tous les modules disponibles
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            Gérez votre entreprise
            <span className="block text-primary">en toute simplicité</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Solution ERP complète pour gérer vos ventes, votre commerce, vos consultations santé et bien plus encore. Tout ce dont vous avez besoin, en un seul endroit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Demander une démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Pourquoi choisir notre ERP ?
            </h2>
            <p className="text-xl text-gray-600">
              Des fonctionnalités puissantes pour booster votre productivité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tableaux de bord intelligents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualisez vos performances en temps réel avec des statistiques adaptées à votre secteur d'activité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sécurisé et fiable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vos données sont protégées avec un système multi-tenant sécurisé et des sauvegardes automatiques.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Facile à utiliser</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Interface intuitive et moderne. Prenez en main l'application en quelques minutes, sans formation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Des modules adaptés à vos besoins
            </h2>
            <p className="text-xl text-gray-600">
              Activez uniquement les fonctionnalités dont vous avez besoin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Finance Module */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Finance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Gérez vos ventes, dépenses et suivez vos revenus en temps réel.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Suivi des ventes et dépenses
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Rapports financiers détaillés
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Statistiques mensuelles
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Commerce Module */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Commerce</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Gérez vos produits, catégories et stock automatiquement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Gestion des produits et prix
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Suivi automatique du stock
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Historique des mouvements
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Santé Module */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl">Santé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Gérez vos patients, consultations et rendez-vous médicaux.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                    Dossiers patients complets
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                    Gestion des rendez-vous
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                    Suivi des consultations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour obtenir une démo personnalisée et découvrir nos offres
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Essayer maintenant
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contacter l'équipe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logos/s_logo.png" alt="S" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
                <span className="font-bold text-base text-blue-600">Synkro</span>
              </div>
              <p className="text-sm text-gray-600">
                Solution complète de gestion d'entreprise
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#features" className="hover:text-gray-900">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#modules" className="hover:text-gray-900">
                    Modules
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-gray-900">
                    Tarifs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-gray-900">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/terms" className="hover:text-gray-900">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gray-900">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-gray-900">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              Built &amp; designed by{" "}
              <a
                href="https://aemetil.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 inline-flex items-center gap-0.5"
              >
                aemetil
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </p>
            <p className="mt-1">© 2026 Synkro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}