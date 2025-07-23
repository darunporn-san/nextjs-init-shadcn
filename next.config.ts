import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ['en', 'th'],
  //   defaultLocale: 'en',
  // },
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;
