import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output: 'export'，使用 Vercel 默认 SSR 模式
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
