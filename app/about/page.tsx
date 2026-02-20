// app/about/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Heart,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" >
            <Image src="/logos/s_logo.png" alt="S" width={32} height={32} />
            <Image src="/logos/synkro_blue_logo.png" alt="Synkro" width={100} height={30} className="hidden md:block" />
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À propos de nous
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nous créons des solutions simples et puissantes pour aider les entreprises à gérer leurs activités avec efficacité. Notre mission : rendre la gestion d'entreprise accessible à tous.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Simplifier la gestion d'entreprise en proposant une solution ERP complète, intuitive et accessible. Nous croyons que chaque entrepreneur mérite des outils professionnels sans complexité inutile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Devenir la solution de référence pour les PME et entrepreneurs qui recherchent un ERP moderne, modulaire et évolutif. Accompagner la croissance de nos clients avec des outils qui s'adaptent à leurs besoins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600">
              Ce qui guide notre travail au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Simplicité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Des interfaces claires et intuitives. Pas de fonctionnalités inutiles, juste l'essentiel pour bien gérer votre entreprise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous adoptons les dernières technologies pour vous offrir une expérience moderne et performante qui évolue avec vos besoins.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Fiabilité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vos données sont précieuses. Nous garantissons leur sécurité et leur disponibilité avec des infrastructures robustes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Solution tout-en-un
                </h3>
                <p className="text-gray-600">
                  Finance, Commerce, Santé : tous vos besoins dans une seule application. Activez uniquement les modules dont vous avez besoin.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Support réactif
                </h3>
                <p className="text-gray-600">
                  Une équipe dédiée à votre service. Nous sommes là pour vous accompagner dans votre utilisation et répondre à vos questions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Rapide à prendre en main
                </h3>
                <p className="text-gray-600">
                  Interface intuitive, pas de formation complexe nécessaire. Commencez à gérer votre entreprise en quelques minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Évolutif avec vous
                </h3>
                <p className="text-gray-600">
                  Que vous soyez une petite entreprise ou en pleine croissance, notre solution s'adapte à votre taille et vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Construit avec les meilleures technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-6">
                Nous utilisons des technologies modernes et éprouvées pour garantir performance, sécurité et évolutivité.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">Next.js 14</p>
                  <p className="text-sm text-gray-600">Framework React</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">Prisma</p>
                  <p className="text-sm text-gray-600">ORM TypeSafe</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">NextAuth</p>
                  <p className="text-sm text-gray-600">Authentification</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">Tailwind CSS</p>
                  <p className="text-sm text-gray-600">Design moderne</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600">
              Passionnés par la création de solutions qui font la différence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">B</span>
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  b.odnis
                </h3>
                <p className="text-primary mb-3">Co-fondateur & Vision</p>
                <p className="text-gray-600">
                  À l'origine de l'idée et de la vision du projet. Expertise en gestion d'entreprise et compréhension des besoins métiers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">A</span>
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  a.emetil
                </h3>
                <p className="text-primary mb-3">Co-fondateur & Développeur</p>
                <p className="text-gray-600">
                  Créateur de solutions innovantes et passionné par l'entrepreneuriat. Également fondateur de{" "}
                  <a
                    href="https://qonekt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Qonekt
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Prêt à transformer votre gestion ?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Rejoignez les entreprises qui font confiance à notre solution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Commencer maintenant
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://qonekt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              a.emetil
            </a>
          </p>
          <p className="mt-2">© 2026 Synkro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}