/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "assets.aceternity.com",
          },
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
        ],
      },
};

export default nextConfig;
