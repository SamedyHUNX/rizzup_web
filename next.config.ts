/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
