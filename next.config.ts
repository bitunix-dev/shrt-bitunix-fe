/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dilb4d364/image/upload/**", // Sesuaikan dengan path folder di Cloudinary
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons**", // ✅ Tambahkan Google Favicon API
      },
    ],
  },
};

export default nextConfig;
