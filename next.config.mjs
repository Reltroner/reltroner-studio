const CDN_IMAGE_PATHNAME = "/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/images/**";

const nextConfig = {
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