// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

// Métadonnées officielles pour Google / réseaux sociaux
export const metadata: Metadata = {
  title: "APE Etat du Sénégal - Emprunt Obligatoire",
  description: "Site officiel de l'emprunt obligataire de l'Etat du Sénégal",
  metadataBase: new URL("https://www.ape-etatsenegal.com"),

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "APE Etat du Sénégal - Emprunt Obligatoire",
    description: "Site officiel de l'emprunt obligataire de l'Etat du Sénégal",
    url: "https://www.ape-etatsenegal.com",
    siteName: "APE Sénégal",
    images: [
      {
        url: "/favicon.ico",
        width: 48,
        height: 48,
        alt: "Logo APE Sénégal",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "APE Etat du Sénégal - Emprunt Obligatoire",
    description: "Site officiel de l'emprunt obligataire de l'Etat du Sénégal",
    images: ["/favicon.ico"],
    creator: "@apeetatsenegal",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* URL canonique */}
        <link rel="canonical" href="https://www.ape-etatsenegal.com/" />
        <link rel="preload" as="image" href="/favicon.ico" />

        {/* JSON-LD côté serveur pour Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "APE Etat du Sénégal",
                "url": "https://www.ape-etatsenegal.com",
                "logo": "https://www.ape-etatsenegal.com/favicon.ico",
                "image": "https://www.ape-etatsenegal.com/favicon.ico",
                "sameAs": [
                  "https://www.facebook.com/apesenegal",
                  "https://twitter.com/apesenegal"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "APE Etat du Sénégal",
                "url": "https://www.ape-etatsenegal.com",
                "publisher": {
                  "@type": "Organization",
                  "name": "APE Etat du Sénégal",
                  "logo": "https://www.ape-etatsenegal.com/favicon.ico"
                }
              }
            ]),
          }}
        />
      </head>
      <body className="font-arial">
        {children}
      </body>
    </html>
  );
}
