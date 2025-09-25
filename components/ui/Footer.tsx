"use client";

import Image from "next/image";
export default function Page() {
  return (
    <div>
      {/* Footer */}
      <footer className="relative bg-white border-t mt-0">
        <div className="relative mx-auto px-4 pb-0">
          {/* Partner Logos Section */}

          <div className="flex items-center justify-center mb-8">
            {/* Bloc 1 */}

            {/* Bloc 2 */}
            <div className="relative flex items-center justify-center mt-6">
              <Image
                src="/images/impaxis.jpg"
                alt="Enfant souriant"
                width={150}
                height={150}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Bloc 3 */}
          </div>
        </div>

        {/* Green footer background - full width */}
        <div className="text-center text-sm py-6">
          <div className="container mx-auto px-4">
            <p className="mb-6 leading-relaxed text-base font-arial text-gray-700">
              Cette opération a été enregistrée par l&apos;Autorité des Marchés
              Financiers de l&apos;Union Monétaire Ouest Africaine (AMF-UMOA)
              sous les visas N• EE/25-24, EE/25-25, EE/25-26 et EE/25-27.
            </p>
          </div>
        </div>

        {/* Copyright section with green background */}
        <div className="bg-white w-full">
          <div className="relative mt-0 mb-6 h-0.5 bg-gray-200"></div>
          <div className="container mx-auto px-4 py-3 lg:py-4 text-center">
            <p className="font-bold text-black text-xs text-shadow">
              © 2025 APE Etat du Sénégal . Tous droits réservés
            </p>
            <div className="border-t border-gray-500 mt-1 pt-1">
              <p></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
