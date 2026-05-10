// app/terms/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-gray-600 mb-8">
            Dernière mise à jour : Février 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Objet
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation de la plateforme Synkro, ainsi que les droits et obligations des parties dans ce cadre.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU. En cas de non-acceptation des CGU, l'utilisateur se doit de renoncer à l'accès aux services proposés par la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Accès au service
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La plateforme Synkro est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au service, que ce soient les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                L'utilisateur non-membre n'a pas accès aux services réservés aux membres. Pour cela, il doit s'identifier à l'aide de son identifiant et de son mot de passe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Inscription
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour accéder aux services de la plateforme, l'utilisateur doit créer un compte en fournissant des informations exactes et complètes. L'utilisateur s'engage à :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Fournir des informations vraies, exactes, à jour et complètes</li>
                <li>Maintenir et mettre à jour ces informations</li>
                <li>Garder confidentiels son identifiant et son mot de passe</li>
                <li>Informer immédiatement la plateforme de toute utilisation non autorisée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Services proposés
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La plateforme Synkro propose les services suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Module Finance</strong> : Gestion des ventes, dépenses et suivi financier</li>
                <li><strong>Module Commerce</strong> : Gestion des produits, catégories et stock</li>
                <li><strong>Module Santé</strong> : Gestion des patients, consultations et rendez-vous</li>
                <li><strong>Rapports et statistiques</strong> : Tableaux de bord et analyses personnalisées</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                La plateforme se réserve le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Données personnelles
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La plateforme assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés et au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour plus d'informations, veuillez consulter notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Politique de Confidentialité
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Propriété intellectuelle
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L'ensemble des contenus présents sur la plateforme (structure, textes, logos, images, etc.) sont protégés par les droits de propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments de la plateforme, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Responsabilité
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La plateforme ne peut être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au service, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                La plateforme met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au service mais n'est tenue à aucune obligation d'y parvenir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Résiliation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L'utilisateur peut résilier son compte à tout moment en contactant le support. La plateforme se réserve le droit de suspendre ou de résilier l'accès au service en cas de violation des présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Droit applicable et juridiction compétente
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGU sont régies par le droit français. En cas de litige, et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant les présentes CGU, vous pouvez nous contacter via notre page de contact.
              </p>
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