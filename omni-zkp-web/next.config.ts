import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js bottom-left dev indicator
  devIndicators: false,

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
