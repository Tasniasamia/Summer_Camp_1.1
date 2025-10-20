/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    backend_url:
      process.env.NODE_ENV === "production"
        ? "http://localhost:4000/"
        : "http://localhost:4000/",
    socket_url: "http://localhost:4000/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
