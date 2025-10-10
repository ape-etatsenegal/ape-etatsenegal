"use client";

import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen mx-auto bg-gray-50">
      {/* Header */}
      <Header />
<section className="py-16 px-4 bg-gray-50">
  <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-12">
    Les liens pour suivre le direct
  </h2>

  <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
    {[
      {
        title: "Lien Youtube",
        url: "https://m.youtube.com/watch?v=HwYQZLwAQNA",
      },
      {
        title: "Lien Facebook",
        url: "https://www.facebook.com/share/v/17BpP3dHZH/?mibextid=wwXIfr",
      },
    ].map((link, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
      >
        <a
          href={link.url}
          target="_blank"  
          rel="noopener noreferrer"
          className="w-full p-4 flex flex-col items-center bg-[#b7e07f] hover:bg-[#aaec4e] transition"
        >
          <h3 className="text-lg font-semibold text-black hover:text-white">
            {link.title}
          </h3>
        </a>
      </div>
    ))}
  </div>
</section>



      {/* Section vidéo /}
      {/* 
      <section className="w-full flex justify-center items-center mt-8 mb-12 px-4">
        <div className="relative w-full md:w-3/4 lg:w-2/3 aspect-video rounded-2xl overflow-hidden shadow-lg">
          <video
            controls
            autoPlay={false}
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src="/videos/BON_1.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </section>
      */}   

      {/* Hero Section */}
            <section className="relative mb-4 md:mb-8 mt-4 ml-20 mr-20">
        {/* Image en arrière-plan */}
        <Image
          src="/images/impaxisshow.jpeg"
          alt="cadre operation"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </section>
      <section className="relative w-full mb-16 mt-4 md:mt-0">
        {/* Image en arrière-plan */}
        <Image
          src="/images/evenement.jpg"
          alt="cadre operation"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />

        {/* Div cliquable avec bordure */}
        <a
          href="https://events.teams.microsoft.com/event/5e4c25b1-9ef5-4993-82df-e0f3cd83e9cb@73eebfe9-a4b4-4e94-9d6f-4709c4f5e2f7"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[34%] top-[55%] w-[25%] h-[5%] flex items-center justify-center"
        >
          <div className="w-full h-full flex items-center justify-center"></div>
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
