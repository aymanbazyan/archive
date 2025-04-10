import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
    staleTimes: {
      dynamic: 86400, // Cache dynamic pages for 24 hours
      static: 604800, // Cache static pages for 7 days
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
