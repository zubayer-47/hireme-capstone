/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
      EMAILJS_API_KEY: process.env.EMAILJS_API_KEY,
      EMAILJS_EMAIL_ID: process.env.EMAILJS_EMAIL_ID,
      EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
      EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY
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
