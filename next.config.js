/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // On laisse la configuration de redirection côté Vercel
};

module.exports = nextConfig;
