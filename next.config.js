/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Critical for static sites
  trailingSlash: true, // Fixes path issues
  images: {
    unoptimized: true, // Required for static export
  },
  // Add if using API routes (delete if not needed)
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
