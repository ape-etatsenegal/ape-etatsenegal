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
      <section className="relative w-full mb-16 mt-4 md:mt-0">
        {/* Image responsive */}


      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
}
