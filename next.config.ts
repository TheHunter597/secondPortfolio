const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = {
  images: {
    domains: ["images.prismic.io"],
  },
  devServer: {
    host: '0.0.0.0'
  }
};
