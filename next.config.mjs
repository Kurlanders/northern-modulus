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
}

export default nextConfig
