// app/legal/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function LegalPage() {
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Mentions Légales
          </h1>
          <p className="text-gray-600 mb-8">
            Dernière mise à jour : Février 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Éditeur du site
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le site Synkro est édité par :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-2">
                <p className="text-gray-700">
                  <strong>Nom :</strong> aemetil
                </p>
                <p className="text-gray-700">
                  <strong>Site web :</strong>{" "}
                  <a
                    href="https://aemetil.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    aemetil.github.io
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Directeur de la publication
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le directeur de la publication du site est aemetil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Hébergement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le site est hébergé par :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-2">
                <p className="text-gray-700">
                  <strong>Hébergeur :</strong> Vercel Inc.
                </p>
                <p className="text-gray-700">
                  <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </p>
                <p className="text-gray-700">
                  <strong>Site web :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Données personnelles
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Politique de Confidentialité
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le site utilise des cookies uniquement pour assurer son bon fonctionnement technique (authentification, préférences utilisateur). Ces cookies sont essentiels et ne nécessitent pas de consentement préalable.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Aucun cookie de tracking, analytique ou publicitaire n'est utilisé sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Liens hypertextes
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le site peut contenir des liens hypertextes vers d'autres sites. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Limitation de responsabilité
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                L'éditeur ne peut être tenu responsable des dommages directs ou indirects qui pourraient résulter de l'accès au site ou de l'utilisation du site et/ou des informations qui y sont contenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Droit applicable
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Crédits
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le site Synkro a été conçu et développé avec les technologies suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Framework :</strong> Next.js 14 (React)</li>
                <li><strong>Base de données :</strong> SQLite avec Prisma ORM</li>
                <li><strong>Authentification :</strong> NextAuth.js</li>
                <li><strong>UI :</strong> Tailwind CSS et shadcn/ui</li>
                <li><strong>Icônes :</strong> Lucide React</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant les mentions légales, vous pouvez nous contacter via notre page de contact ou consulter nos autres pages légales :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>
                  <Link href="/terms" className="text-primary hover:underline">
                    Conditions Générales d'Utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-primary hover:underline">
                    Politique de Confidentialité
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-400">
            <p>Built &amp; designed by{" "}
              <a href="https://aemetil.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 inline-flex items-center gap-0.5">
                aemetil<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}