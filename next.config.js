/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore les erreurs ESLint lors de la build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Pour désactiver l’optimisation automatique des images
  images: {
    unoptimized: true,
  },

  // Build autonome
  output: 'standalone',

  // Experimental options (vide pour éviter les warnings)
  experimental: {
    // serverActions supprimé pour compatibilité Next.js 15+
  },
};

module.exports = nextConfig;
