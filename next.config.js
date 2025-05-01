/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment - update if your repo name is different
  // basePath: process.env.NODE_ENV === 'production' ? '/repository-name' : '',
};

module.exports = nextConfig; 