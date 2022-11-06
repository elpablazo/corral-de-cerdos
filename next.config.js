const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy({
  customDomain: "https://sholomitosanalytics.app.obeskay.com",
})({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});

module.exports = nextConfig;
