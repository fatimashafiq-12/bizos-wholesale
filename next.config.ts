import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "erpmedia.biz-os.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
