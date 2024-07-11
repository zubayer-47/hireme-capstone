/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL
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
          {
            protocol: "https",
            hostname: "adept-weasel-331.convex.cloud"
          }
        ],
      },
};

export default nextConfig;
