/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add trailing slash for better static hosting compatibility
  trailingSlash: true,
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Simply set publicRuntimeConfig to an empty object to prevent errors
  publicRuntimeConfig: {},
};

module.exports = nextConfig; 