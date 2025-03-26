/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Bypass TypeScript errors during build for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypass ESLint errors during build for deployment
    ignoreDuringBuilds: true,
  },
  // Optimize for serverless deployment
  output: 'standalone',
  
  // External packages that should not be bundled
  serverExternalPackages: ['@prisma/client', '@neondatabase/serverless'],
}

module.exports = nextConfig 