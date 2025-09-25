"use client";

import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function Page() {
  return (
    <div className="min-h-screen mx-auto bg-gray-50">
      {/* Header */}
      <Header />

      {/* Section Documentation */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-12">
          Documentation
        </h2>

        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {[
            {
              title: "Note d’information",
              file: "/documents/Note_APE_Etat_du_Sénégal.pdf",
            },
            {
              title: "Le bulletin de souscription",
              file: "/documents/bulletin_senegal_sakinah.pdf",
            },
            {
              title: "Le dépliant de l'opération",
              file: "/documents/depliant_A5_APE_senegal_sakina.pdf",
            },
            {
              title: "Les 3 étapes pour souscrire",
              file: "/documents/etapes_souscription.pdf",
            },
          ].map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Titre cliquable */}
              <button
                onClick={() =>
                  window.open(doc.file, "_blank", "noopener,noreferrer")
                }
                className="w-full p-4 flex flex-col items-center bg-[#b7e07f] hover:bg-[#aaec4e] transition"
              >
                <h3 className="text-lg font-semibold text-black hover:text-white">
                  {doc.title}
                </h3>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}
