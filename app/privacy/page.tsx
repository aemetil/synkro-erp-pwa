// app/privacy/page.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
            Politique de Confidentialité
          </h1>
          <p className="text-gray-600 mb-8">
            Dernière mise à jour : Février 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La protection de vos données personnelles est une priorité pour Synkro. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Responsable du traitement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le responsable du traitement des données personnelles est Synkro, représenté par a.emetil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Données collectées
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nous collectons les données suivantes lors de votre utilisation de la plateforme :
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.1 Données d'inscription
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Informations d'entreprise (nom, secteur d'activité)</li>
                <li>Mot de passe (chiffré)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3.2 Données d'utilisation
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Données de ventes et dépenses</li>
                <li>Informations sur les produits et stocks</li>
                <li>Données des clients et fournisseurs</li>
                <li>Données médicales (pour le module Santé) : informations patients, consultations, rendez-vous</li>
                <li>Logs de connexion et d'utilisation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Finalités du traitement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Création et gestion de votre compte utilisateur</li>
                <li>Fourniture des services de la plateforme ERP</li>
                <li>Gestion de vos ventes, achats, stocks et finances</li>
                <li>Gestion des patients et consultations (module Santé)</li>
                <li>Génération de rapports et statistiques</li>
                <li>Amélioration de nos services</li>
                <li>Communication avec vous concernant votre compte</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Base légale du traitement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Exécution du contrat</strong> : pour fournir les services auxquels vous avez souscrit</li>
                <li><strong>Consentement</strong> : pour certaines communications marketing</li>
                <li><strong>Obligation légale</strong> : pour respecter nos obligations légales (comptabilité, fiscalité)</li>
                <li><strong>Intérêt légitime</strong> : pour améliorer nos services et assurer la sécurité de la plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Durée de conservation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles sont traitées :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Données de compte</strong> : pendant toute la durée de votre utilisation du service et jusqu'à 3 ans après la fermeture du compte</li>
                <li><strong>Données financières</strong> : 10 ans conformément aux obligations légales</li>
                <li><strong>Données médicales</strong> : conformément à la réglementation en vigueur (20 ans minimum)</li>
                <li><strong>Logs de connexion</strong> : 1 an</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Partage des données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles ne sont pas vendues, louées ou échangées. Elles peuvent être partagées uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Hébergement</strong> : nos données sont hébergées de manière sécurisée</li>
                <li><strong>Prestataires techniques</strong> : uniquement pour la fourniture des services</li>
                <li><strong>Autorités légales</strong> : en cas d'obligation légale ou judiciaire</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Tous nos prestataires sont soumis à des obligations strictes de confidentialité et de sécurité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Sécurité des données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Chiffrement des mots de passe</li>
                <li>Connexions sécurisées (HTTPS)</li>
                <li>Architecture multi-tenant avec isolation des données</li>
                <li>Sauvegardes régulières</li>
                <li>Contrôle d'accès strict</li>
                <li>Surveillance et détection des incidents de sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Vos droits
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement</strong> : supprimer vos données dans certains cas</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour exercer vos droits, vous pouvez nous contacter via notre page de contact. Nous vous répondrons dans un délai d'un mois.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Notre plateforme utilise des cookies essentiels pour assurer le bon fonctionnement du service (authentification, préférences utilisateur). Aucun cookie de tracking ou publicitaire n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Modifications
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette politique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Contact et réclamation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, vous pouvez nous contacter.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Vous disposez également du droit de déposer une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
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