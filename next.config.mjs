/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👉 required for GitHub Pages static export
  trailingSlash: true,
  //assetPrefix: './',

  // 👉 your existing config preserved
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
