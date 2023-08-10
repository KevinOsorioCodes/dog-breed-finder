/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.rendit.io',
        port: '',
        pathname: '/n/**',
      },
    ],
  },
};
module.exports = nextConfig;
