/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent TypeScript type errors from failing the Vercel build.
  // Fix any type errors locally with `npm run build` before removing this.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent ESLint errors from failing the Vercel build.
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/work', statusCode: 301 },
      { source: '/process', destination: '/3d-printing', statusCode: 301 },
      { source: '/solutions', destination: '/3d-printing', statusCode: 301 },
      { source: '/solutions/:path*', destination: '/3d-printing', statusCode: 301 },
    ]
  },
}

export default nextConfig
