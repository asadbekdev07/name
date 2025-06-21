console.log("Next config loaded ✅");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["via.placeholder.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
