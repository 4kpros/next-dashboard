import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.digitschool.cm",
    ],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    WEBSITE_URL: process.env.WEBSITE_URL,

    API_BASE_URL_REDIRECT: process.env.API_BASE_URL_REDIRECT,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.API_BASE_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
