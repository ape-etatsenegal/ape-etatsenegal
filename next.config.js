/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  async redirects() {
    return [
      {
        source: '/:path*',               // toutes les URLs
        has: [
          { type: 'host', value: 'ape-etatsenegal.com' } // si domaine sans www
        ],
        destination: 'https://www.ape-etatsenegal.com/:path*', // redirection vers www
        permanent: true,                 // 301
      },
    ]
  },
};

module.exports = nextConfig;

