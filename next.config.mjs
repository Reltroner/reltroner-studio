import resourceSnapshot from "./lib/assets/resource-snapshot.json" with { type: "json" };
import { getHomepageImageRemotePatterns } from "./lib/assets/homepage-assets.mjs";

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
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/Reltroner/reltroner-studio-resource@f13948b3e85629d9e044876ab116ae8ac6870bd7/landing-page-resource/images/home-page-*.webp",
      },
      ...getHomepageImageRemotePatterns(),
    ],
  },
};

export default nextConfig;
