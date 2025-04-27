/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "regjmsradwfmqfkzcepq.supabase.co",
      "images.pexels.com"
    ],
  },
};
module.exports = nextConfig;
