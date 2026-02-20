// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google OAuth avatars
      "pub-xxxxx.r2.dev", // Cloudflare R2 (remplacer xxxxx)
    ],
  },
};

module.exports = nextConfig;
