import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old multi-page site collapsed into a one-pager; keep inbound links alive.
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/services/:slug", destination: "/#services", permanent: true },
      { source: "/builds", destination: "/#work", permanent: true },
      { source: "/builds/:slug", destination: "/#work", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/faq", destination: "/#book", permanent: true },
      { source: "/contact", destination: "/#book", permanent: true },
    ];
  },
};

export default nextConfig;
