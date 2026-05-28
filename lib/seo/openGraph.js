import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/constants/site";
import { toAbsoluteUrl } from "@/lib/seo/canonical";

function normalizeImage(image, title) {
  const imageUrl = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);

  return [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title || SITE_NAME,
    },
  ];
}

export function buildOpenGraph({ title, description, pathname, image, type = "website" }) {
  return {
    title,
    description,
    url: toAbsoluteUrl(pathname),
    siteName: SITE_NAME,
    images: normalizeImage(image, title),
    locale: "en_US",
    type,
  };
}

export function buildTwitter({ title, description, image }) {
  return {
    card: "summary_large_image",
    title,
    description,
    images: normalizeImage(image, title).map((entry) => entry.url),
    creator: "@reltroner",
  };
}