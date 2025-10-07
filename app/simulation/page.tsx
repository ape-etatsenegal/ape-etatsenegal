"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useEffect, useRef } from "react";

export default function SimulationPage() {
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1l2MkBgdQn8O6aPPt2rlpmfX5YyA4pHJ7dcvfSP5GXTY/edit?usp=sharing&rm=full";
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
        setTimeout(restoreScrollPosition, 10);
      }
    };

    const handleScroll = () => {
      saveScrollPosition();
    };

    saveScrollPosition();

    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keydown', handleKeyDown, true);

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
        <div className="flex flex-col w-full h-[250vh] border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <iframe
            ref={iframeRef}
            src={sheetUrl}
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Bouton visible sur mobile pour éditer tout le fichier */}
        <div className="mt-4 text-center sm:hidden">
          <a
            href="https://docs.google.com/spreadsheets/d/1l2MkBgdQn8O6aPPt2rlpmfX5YyA4pHJ7dcvfSP5GXTY/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Modifier dans Google Sheets
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}