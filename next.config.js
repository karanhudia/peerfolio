/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip TypeScript type checking during build for faster deployment
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Optimize for serverless deployment
  output: 'standalone',
  // Add any other configurations as needed
  eslint: {
    // Similarly, you can ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 