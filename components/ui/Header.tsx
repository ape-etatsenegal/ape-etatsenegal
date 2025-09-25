"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const links = [
    { label: "Accueil", href: "/" },
    { label: "Cadre et objectif de l'opération", href: "/cadre" },
    { label: "Caractéristiques de l'opération", href: "/caracteristique" },
    { label: "Documentation", href: "/documentation" },
    { label: "Évènements", href: "/evenements" },
    { label: "Attraits de l'opération", href: "/attraits" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubscribeClick = () => {
    setShowDates(true);
    setFadeOut(false);
  };

  // disparition automatique après 10 secondes
useEffect(() => {
  if (showDates) {
    const timer = setTimeout(() => {
      setFadeOut(true); // animation de disparition
      setTimeout(() => setShowDates(false), 1000); // après l'animation, le texte est retiré
    }, 5000); // <-- ici, 5000 ms = 5 secondes

    return () => clearTimeout(timer);
  }
}, [showDates]);


  // compte à rebours (inchangé)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-18T16:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.floor(difference / (7500 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = (filename: string) => {
    const fileUrl = `/documents/${filename}.pdf`;

    const element = document.createElement("a");
    element.href = fileUrl;
    element.download = `${filename}.pdf`;
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      {/* Header */}
 <header className="bg-white shadow-md">
        <div className="relative mx-auto px-0 py-2">
          <div className="flex items-center justify-between">
            {/* Logos du header */}
            <div className="flex items-center ml-4 mr-20 space-x-4">
              <Link href="/">
                <Image
                  src="/images/logo3.png"
                  alt="Logo 1"
                  width={80}
                  height={80}
                  className="h-auto w-auto object-contain"
                  priority
                />
              </Link>
              <Link href="/">
                <Image
                  src="/images/logo1.png"
                  alt="Logo 2"
                  width={80}
                  height={80}
                  className="h-auto w-auto object-contain"
                />
              </Link>
              <Link href="/">
                <Image
                  src="/images/logo2.png"
                  alt="Logo 3"
                  width={80}
                  height={80}
                  className="h-auto w-[70%] object-contain"
                />
              </Link>
            </div>

            {/* Nouveaux boutons diaspora (uniquement desktop) */}
            <div className="hidden lg:flex space-x-2 mr-2 z-50">
               <a href="https://emprunt-2025.impaxis-securities.com/" target="_blank" rel="noopener noreferrer">
              <Button className="btn-rouge hover:bg-[#b7e07f]">
                Je souscris - Diaspora
              </Button>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-2 mr-6 z-50">
              <a href="https://emprunt-2025.impaxis-securities.com/" target="_blank" rel="noopener noreferrer">
                <Button className="btn-senegal hover:bg-[#b7e07f]">
                  Je souscris
                </Button>
              </a>
               <a href="/faq">
              <Button className="btn-rouge hover:bg-[#b7e07f]">FAQ</Button>
              </a>
            </nav>

          {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 mr-4 text-gray-600 hover:text-senegal-green rounded-lg border border-gray-300 bg-white shadow-sm"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-300 bg-white shadow-lg mx-2">
              <div className="flex flex-col space-y-2 pt-4 sm:mr-[10rem] sm:ml-[10rem]">
                <Link
                  href="https://emprunt-2025.impaxis-securities.com/" target="_blank" rel="noopener noreferrer"
                >
                  <Button className="btn-senegal hover:bg-[#b7e07f] w-full">je souscris</Button>
                </Link>
                <Link
                  href="https://emprunt-2025.impaxis-securities.com/" target="_blank" rel="noopener noreferrer"
                >
                  <Button className="btn-rouge hover:bg-[#b7e07f] w-full">
                    je souscris-diaspora
                  </Button>
                </Link>
                <Link href="/souscris">
                </Link>
                 <a href="/faq">
                <Button className="btn-rouge hover:bg-[#b7e07f] border-0 w-full">FAQ</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bande rouge texte défilant */}
      <div className="hidden bg-senegal-red text-white py-2 lg:py-2 overflow-hidden shadow-senegal">
        <div className="animate-scroll whitespace-nowrap flex">
          <span className="inline-block text-sm lg:text-2xl font-arial font-bold mr-96 text-shadow">
            Cérémonie de lancement le 18 Septembre 2025 à 16H00 GMT au Terrou-Bi
          </span>
          <span className="inline-block text-sm lg:text-2xl font-arial font-bold text-shadow">
            Cérémonie De Lancement le 18 Septembre 2025 à 16H00 GMT au Terrou-Bi
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white border-b border-gray-200 mt-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-1 lg:ml-32 lg:mr-32">
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-[#00843D] text-white font-medium text-base xl:text-xl py-1 md:py-2 px-2 rounded-md transform transition-all duration-300 hover:hover:bg-[#b7e07f] hover:-translate-y-1 shadow-md text-center w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
