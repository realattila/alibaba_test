/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "src"],
  },
  i18n,
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.join(__dirname, "./src"),
      components: path.join(__dirname, "./src/components"),
      store: path.join(__dirname, "./src/store"),
      services: path.join(__dirname, "./src/services"),
      api: path.join(__dirname, "./src/api"),
      hooks: path.join(__dirname, "./src/hooks"),
      utility: path.join(__dirname, "./src/utility"),
      static: path.join(__dirname, "./public"),
      styles: path.join(__dirname, "./public/styles"),
      icons: path.join(__dirname, "./public/icons"),
      images: path.join(__dirname, "./public/images"),
    };

    return config;
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;
