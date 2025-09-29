"use client";

import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function Page() {

  return (
    <div className="min-h-screen mx-auto bg-gray-50">
      {/* Header */}
           <Header />
      {/* Hero Section */}
      
      <section className="w-full flex justify-center items-center mt-8 mb-12 px-4">
        <div className="relative w-full md:w-3/4 lg:w-2/3 aspect-video rounded-2xl overflow-hidden shadow-lg">
          <video
            controls
            autoPlay={false}
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src="/videos/tutoriel.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </section>
      
      <section className="relative w-full mb-16 mt-4 md:mt-0">
        {/* Image responsive */}
        <Image
          src="/images/souscription.jpg"
          alt="cadre operation"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}
