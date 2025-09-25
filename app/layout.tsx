import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APE Etat du Sénégal - Emprunt Obligataire",
  description: "Site officiel de l'emprunt obligataire de l'Etat du Sénégal",

  // Domaine principal
  metadataBase: new URL("https://ape-etatsenegal.com"),   

  icons: {
    icon: "/favicon.ico",   
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "APE Etat du Sénégal - Emprunt Obligataire",
    description: "Découvrez l'emprunt obligataire officiel de l'Etat du Sénégal",
    url: "https://ape-etatsenegal.com",
    siteName: "APE Sénégal",
    images: [
      {
        url: "https://ape-etatsenegal.com/images/logo2.png", // URL absolue
        width: 1200,
        height: 630,
        alt: "Logo APE Sénégal",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "APE Etat du Sénégal - Emprunt Obligataire",
    description: "Découvrez l'emprunt obligataire officiel de l'Etat du Sénégal",
    images: ["https://ape-etatsenegal.com/images/logo2.png"], // URL absolue
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* ✅ JSON-LD pour Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "APE Etat du Sénégal",
              "url": "https://ape-etatsenegal.com",
              "logo": "https://ape-etatsenegal.com/images/logo2.png",
              "sameAs": [
                "https://www.facebook.com/apesenegal", 
                "https://twitter.com/apesenegal"
              ]
            }),
          }}
        />
      </head>
      <body className="font-arial">{children}</body>
    </html>
  );
}
