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
            <section className="relative w-full flex justify-center mb-2 mt-2">
              {/* Image responsive */}
              <Image
                src="/images/date.png" 
                alt="cadre operation"
                width={1920}
                height={1080}
                className="w-1/2 h-auto"
                priority
              />
            </section>
      <section className="relative w-full mt-4 md:mt-0">
        <iframe
          src="/documents/bulletin_senegal_sakinah.pdf"
          width="100%"
          height="600px"
          className="border-0"
        />
      </section>

      {/* Footer */}
           <Footer />
    </div>
  );
}
