"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useEffect, useRef } from "react";

export default function SimulationPage() {
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1l2MkBgdQn8O6aPPt2rlpmfX5YyA4pHJ7dcvfSP5GXTY/edit?usp=sharing";
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let scrollPosition = 0;

    const saveScrollPosition = () => {
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    };

    const restoreScrollPosition = () => {
      window.scrollTo(0, scrollPosition);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        saveScrollPosition();
        event.preventDefault();
        event.stopPropagation();
        
        // Restaurer la position après un court délai
        setTimeout(restoreScrollPosition, 10);
      }
    };

    const handleScroll = () => {
      saveScrollPosition();
    };

    // Sauvegarder la position actuelle
    saveScrollPosition();

    // Empêcher le défilement
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keydown', handleKeyDown, true);

    // Restaurer la position périodiquement (au cas où)
    const interval = setInterval(restoreScrollPosition, 100);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Simulation 
        </h1>

        <div className="flex flex-col w-full h-[200vh] border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <iframe
            ref={iframeRef}
            src={sheetUrl}
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}