import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify the protocol (https or http)
        hostname: "lh5.googleusercontent.com", // The domain name
      },
    ],
  },
};

export default nextConfig;
