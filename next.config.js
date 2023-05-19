/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com", protocol: "https", port: "" },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    MONGO_URI:
      "mongodb+srv://nextapp:nextapp@next-app.6i1ft8m.mongodb.net/Acc?retryWrites=true&w=majority",
  },
  JWT_SECRET: "899c9b5b0469bcff67177b39eb46bd0e",
};

module.exports = nextConfig
