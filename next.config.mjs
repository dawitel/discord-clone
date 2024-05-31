/** @type {import('next').NextConfig} */
const nextConfig = {
  // fix: hostname configuration for next/image
  images: {
    domains: ["utfs.io", "uploadthing.com"],
  },
};

export default nextConfig;
