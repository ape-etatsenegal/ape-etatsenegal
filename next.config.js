/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone', // IMPORTANT : force une build plus autonome
  experimental: {
    serverActions: false,
  },
};

module.exports = nextConfig;
