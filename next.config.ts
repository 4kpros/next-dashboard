import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.digitschool.cm", "lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
