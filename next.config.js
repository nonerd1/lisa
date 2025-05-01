/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment with correct basePath
  basePath: '/L.I.S.A',
  // Make sure trailingSlash is true for GitHub Pages
  trailingSlash: true,
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure asset prefix for GitHub Pages
  assetPrefix: '/L.I.S.A/',
  // Add public runtime config for base path awareness in components
  publicRuntimeConfig: {
    basePath: '/L.I.S.A',
  },
};

module.exports = nextConfig; 