const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = {
  images: {
    domains: ["images.prismic.io"],
  },
};
