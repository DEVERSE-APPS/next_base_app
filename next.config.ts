import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Allow embedding in iframes from any origin
          // Note: X-Frame-Options is deprecated, use CSP frame-ancestors instead
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:* https://*.deverse.com https://deverse.com"
          }
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
  },

};

export default nextConfig;