// Resource artwork is exported as verified same-origin files; no remote image host is trusted.
const nextConfig = {
  output: "export",
  staticPageGenerationTimeout: 300,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
