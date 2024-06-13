/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.mjs
export default {
    env: {
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  };
  
