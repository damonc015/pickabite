/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["maps.googleapis.com", "lh3.googleusercontent.com"],
  },
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyBOD47Afyna04Igvb_yREInKjDYA2tRLRs",
  },
};

module.exports = nextConfig;
