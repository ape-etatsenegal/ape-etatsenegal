"use client";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen mx-auto bg-gray-50">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          Oups ! Cette page est introuvable.
        </p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
}
