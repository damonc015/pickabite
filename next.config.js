/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "maps.googleapis.com",
      "lh3.googleusercontent.com",
      "pickabite.vercel.app",
    ],
  },
};

module.exports = nextConfig;
