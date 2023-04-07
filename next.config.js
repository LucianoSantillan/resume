/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Exclude .test.tsx files from the build
    if (isServer) {
      config.module.rules.push({
        test: /\.test\.tsx?$/,
        use: 'ignore-loader',
      });
    }

    return config;
  },
};

module.exports = nextConfig;