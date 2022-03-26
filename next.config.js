/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["maps.googleapis.com", "lh3.googleusercontent.com"],
  },
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyBhJ-E092ukCYWgRaCJN9n-tnoKYbt_0Dw",
  },
};

module.exports = nextConfig;
