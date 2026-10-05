// Next.js 16 no longer lints during `next build`, so the old `eslint.ignoreDuringBuilds` key is gone.
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
