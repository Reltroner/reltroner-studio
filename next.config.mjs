import resourceSnapshot from "./lib/assets/resource-snapshot.json" with { type: "json" };

const CDN_IMAGE_PATHNAME = `/gh/Reltroner/reltroner-studio-resource@${resourceSnapshot.sourceSha}/landing-page-resource/images/**`;

const nextConfig = {
  async redirects() {
    return [
      { source: '/factions/beluftrner', destination: '/factions/beluftner', permanent: true },
      { source: '/factions/cenrestier-country-profile', destination: '/factions/cenrestier', permanent: true },
      { source: '/factions/kalgered-country-profile', destination: '/factions/kalgered', permanent: true },
    ];
  },
  images: {
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
