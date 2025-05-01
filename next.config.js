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
};

module.exports = nextConfig; 