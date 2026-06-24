import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    cpus: 2,
    optimizePackageImports: ["lucide-react", "motion"]
  }
};
export default nextConfig;
