import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to this project so Next doesn't
  // mis-infer it from a parent lockfile (caused intermittent dev crashes).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
