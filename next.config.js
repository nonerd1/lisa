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
};

module.exports = nextConfig; 