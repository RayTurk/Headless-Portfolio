/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WP_HOSTNAME || 'cms.rturk.me',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ISR and caching headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirect WordPress admin paths
  async redirects() {
    return [
      {
        source: '/wp-admin',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin`,
        permanent: false,
      },
      {
        source: '/wp-login.php',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-login.php`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
