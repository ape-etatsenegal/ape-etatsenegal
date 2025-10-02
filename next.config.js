/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {},
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ape-etatsenegal.com',
          },
        ],
        destination: 'https://www.ape-etatsenegal.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
