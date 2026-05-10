// app/contact/page.tsx
import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logos/s_logo.png" alt="S" width={32} height={32} style={{ width: 'auto', height: 'auto' }} />
            <span className="font-bold text-lg text-blue-600">Synkro</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est là pour vous
              accompagner dans votre transformation digitale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" placeholder="Esaïe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" placeholder="EMETIL" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="esaie.emetil@gmail.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      placeholder="Nom de votre entreprise. Ex.: Cubana Boulangerie"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <select
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="demo">Demande de démo</option>
                      <option value="pricing">Informations tarifaires</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Décrivez votre besoin ou votre question..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Envoyer le message
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Nous vous répondrons dans les 24 heures ouvrées
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">
                        contact@getsynkro.app
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Téléphone</p>
                      <p className="text-sm text-gray-600">+509 48 36 17 52</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Adresse</p>
                      <p className="text-sm text-gray-600">Croix-des-missions, Haïti</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium">9h - 18h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Samedi - Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">
                    Besoin d'aide immédiate ?
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    Consultez notre documentation ou connectez-vous pour accéder
                    au support.
                  </p>
                  <Link href="/login">
                    <Button variant="secondary" size="sm" className="w-full">
                      Accéder au support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
          <p>Built &amp; designed by{" "}
            <a href="https://aemetil.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 inline-flex items-center gap-0.5">
              aemetil<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </p>
          <p className="mt-1">© 2026 Synkro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
