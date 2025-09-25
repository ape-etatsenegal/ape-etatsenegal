"use client";

import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/ui/Modal";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const recaptchaRef = useRef<InstanceType<typeof ReCAPTCHA>>(null);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    message: "",
    captchaToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "warning">(
    "success"
  );
  // validation de notre formulaire
  const validateForm = () => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /^[^<>$%{}]*$/;

    if (!formData.prenom || !formData.nom || !formData.email) {
      setModalType("error");
      setModalMessage("Veuillez remplir le formulaire !");
      setShowModal(true);
      return false;
    }

    if (!nameRegex.test(formData.prenom)) {
      setModalType("error");
      setModalMessage("Le prénom contient des caractères invalides.");
      setShowModal(true);
      return false;
    }

    if (!nameRegex.test(formData.nom)) {
      setModalType("error");
      setModalMessage("Le nom contient des caractères invalides.");
      setShowModal(true);
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setModalType("error");
      setModalMessage("L'email n'est pas valide.");
      setShowModal(true);
      return false;
    }

    if (formData.message && !messageRegex.test(formData.message)) {
      setModalType("error");
      setModalMessage("Le message contient des caractères invalides.");
      setShowModal(true);
      return false;
    }

    if (!formData.captchaToken) {
      setModalType("error");
      setModalMessage("Veuillez valider le reCAPTCHA.");
      setShowModal(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setModalType("success");
        setModalMessage("Inscription réussie !");
        setFormData({
          prenom: "",
          nom: "",
          email: "",
          message: "",
          captchaToken: "",
        });

        // Reset du reCAPTCHA
        recaptchaRef.current?.reset();
      } else if (data.error === "email_exists") {
        setModalType("warning");
        setModalMessage("Cette adresse e-mail est déjà utilisée !");
      } else {
        setModalType("error");
        setModalMessage("Une erreur est survenue, réessayez.");
      }
    } catch (err) {
      setModalType("error");
      setModalMessage("Erreur réseau.");
    }

    setShowModal(true);
    setLoading(false);
  };

  type DocItem = {
    icon: string;
    title: string;
    pdf?: string; // optionnel
    link?: string; // optionnel
  };

  const firstRow: DocItem[] = [
    {
      icon: "/images/3.jpg",
      title: "Le dépliant de l'opération",
      pdf: "depliant_A5_APE_senegal_sakina",
    },
    {
      icon: "/images/1.jpg",
      title: "La note d'information",
      pdf: "Note_APE_Etat_du_Sénégal",
    },
    {
      icon: "/images/2.jpg",
      title: "Le bulletin de souscription",
      pdf: "bulletin_senegal_sakinah",
    },
  ];

  const secondRow: DocItem[] = [
    {
      icon: "/images/4.jpg",
      title: "Les 3 étapes pour souscrire",
      link: "/souscription",
    },
        {
      icon: "/images/6.jpg",
      title: "Liste des SGI",
       link: "https://apsgi.org/liste-des-sgi/",
    },
  ];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleDownload = (filename: string) => {
    // Chemin vers le vrai PDF dans public/documents
    const fileUrl = `/documents/${filename}.pdf`;

    const element = document.createElement("a");
    element.href = fileUrl; // URL réelle du PDF
    element.download = `${filename}.pdf`; // nom lors du téléchargement
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen mx-auto bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative w-full mb-16 mt-4 md:mt-0">
        {/* nous avons une image responsive, image d'accueil */}
        <Image
          src="/images/Home.jpg"
          alt="Enfant souriant"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />

        {/* Bouton centré en bas, en rouge posé sur l'image */}
        <div className="absolute -bottom-4 lg:bottom-2 2xl:bottom-5 space-x-4 right-1/4">
          <Link href="https://emprunt-2025.impaxis-securities.com/" target="_blank" rel="noopener noreferrer">
            <Button className="btn-senegal-grand md:text-lg font-bold hover:bg-[#afe465]">
              Je souscris
            </Button>
          </Link>
        </div>
      </section>
      {/* Documentation Section */}{" "}
<section className="pb-10 md:pb-52 md:py-9 bg-gray-200">
  <div className="relative">
    <h3 className="text-2xl md:text-3xl font-bold text-center justify-center -mb-4 md:mb-6 py-6 text-gray-800">
      Documentation de l&apos;opération à télécharger
    </h3>

    {/* Première ligne */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 justify-center justify-items-center mx-auto max-w-xl">
      {firstRow.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center cursor-pointer group w-full max-w-[250px] mx-auto"
          onClick={() => {
            if (item.pdf) {
              handleDownload(item.pdf);
            } else if (item.link) {
              if (item.link.startsWith("http")) {
                window.open(item.link, "_blank");
              } else {
                window.location.href = item.link;
              }
            }
          }}
        >
          <Image
            src={item.icon}
            alt={item.title}
            width={200}
            height={200}
            className="object-cover w-full h-auto mb-2 mt-5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          />
          <div className="border bg-senegal-green hover:bg-[#afe465] text-xs text-white font-medium py-2 px-0.5 w-full rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            {item.title}
          </div>
        </div>
      ))}
    </div>

    {/* Deuxième ligne */}
    <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 justify-center justify-items-center mx-auto md:max-w-sm">
      {secondRow.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-center text-center cursor-pointer group w-full max-w-[250px] mx-auto"
          onClick={() => {
            if (item.title === "Simulation") return;

            if (item.link) {
              if (item.link.startsWith("http")) {
                window.open(item.link, "_blank");
              } else {
                window.location.href = item.link;
              }
            } else if (item.pdf) {
              handleDownload(item.pdf);
            }
          }}
        >
          {item.title !== "Simulation" && (
            <>
              <Image
                src={item.icon}
                alt={item.title}
                width={200}
                height={200}
                className="object-cover w-full h-auto mb-2 mt-5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              />
              <div className="border bg-senegal-green hover:bg-[#afe465] text-xs text-white font-medium py-2 px-0.5 w-full rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                {item.title}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Webinar Registration */}
      <section className="py-1 md:py-8 mt-10 md:-mt-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-senegal-soft opacity-10"></div>
        <div className="relative mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-arial font-bold mb-4 text-black">
            Rendez-vous - événements webinar
          </h3>
          <div className="relative -mt-4 mb-6 h-1 bg-gray-500 rounded-full"></div>

          <div
            id="formulaire"
            className="bg-senegal-green text-white py-3 mb-6 rounded-t-xl shadow-senegal"
          >
            <h4 className="text-xl font-bold ml-4 font-arial text-shadow">
              Inscrivez-vous au Webinaire
            </h4>
          </div>
          <div className="relative">
            <form
              onSubmit={handleSubmit}
              className="max-w-4xl lg:max-w-6xl border border-senegal-green rounded-xl p-8 shadow-xl bg-white/80 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Input
                    placeholder="Prénom..."
                    value={formData.prenom}
                    onChange={(e) =>
                      setFormData({ ...formData, prenom: e.target.value })
                    }
                    className="w-full border-2 border-senegal-green/30 focus:border-senegal-green rounded-lg px-4 py-3 font-medium"
                  />
                  <Input
                    placeholder="Nom..."
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    className="w-full border-2 border-senegal-green/30 focus:border-senegal-green rounded-lg px-4 py-3 font-medium"
                  />
                  <Input
                    type="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-2 border-senegal-green/30 focus:border-senegal-green rounded-lg px-4 py-3 font-medium"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full h-32 border-2 border-senegal-green/30 focus:border-senegal-green rounded-lg px-4 py-3 font-medium resize-none"
                  />
                </div>
              </div>
              {/* reCAPTCHA v2 */}
              <div className="my-4">   
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token: string | null) =>
                    setFormData({ ...formData, captchaToken: token || "" })
                  }
                  ref={recaptchaRef}
                />
              </div>
              <Button
                type="submit"
                className="btn-senegal mt-6 md:px-3 md:py-5 text-lg font-bold flex items-center justify-center hover:bg-[#afe465]"
                disabled={loading} // désactive le bouton pendant le chargement
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"  
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Chargement..." : "Je m'inscris"}
              </Button>
            </form>

            {showModal && (
              <Modal
                message={modalMessage}
                type={modalType}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-12 bg-gray-200">
        <div className="relative mx-auto px-4">
          <h3 className="text-4xl font-arial font-bold mb-8 text-black">FAQ</h3>
          <div className="relative -mt-4 mb-8 h-1 bg-gray-500 rounded-full"></div>
          <Button
            className="btn-senegal hover:bg-[#afe465] md:px-3 md:py-5 text-lg font-bold"
            onClick={() => handleDownload("FAQ")}
          >
            Je télécharge
          </Button>
          {/* Red accent strip */}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
