/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghiogoesdgzptfmqtrxz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "storage.buzzsprout.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.buzzsprout.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
