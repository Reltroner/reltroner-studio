import resourceSnapshot from "./lib/assets/resource-snapshot.json" with { type: "json" };

const CDN_IMAGE_PATHNAME = `/gh/Reltroner/reltroner-studio-resource@${resourceSnapshot.sourceSha}/landing-page-resource/images/**`;

const nextConfig = {
  output: "export",
  staticPageGenerationTimeout: 300,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: CDN_IMAGE_PATHNAME,
      },
    ],
  },
};

export default nextConfig;
