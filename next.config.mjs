import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "/rvdata/secrets/bestviewinvestment/.env" });
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.redvisionweb.com",
      },
      {
        protocol: "https",
        hostname: "redvisionweb.com",
      },
    ],
  },
};

export default nextConfig;


