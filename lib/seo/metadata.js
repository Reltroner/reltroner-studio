import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants/site";
import { buildCanonical, toAbsoluteUrl } from "@/lib/seo/canonical";
import { buildOpenGraph, buildTwitter } from "@/lib/seo/openGraph";

export const ROOT_METADATA = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: buildOpenGraph({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    pathname: "/",
    image: DEFAULT_OG_IMAGE,
    type: "website",
  }),
  twitter: buildTwitter({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    image: DEFAULT_OG_IMAGE,
  }),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.webp",
  },
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords,
}) {
  return {
    title,
    description,
    keywords,
    alternates: buildCanonical(pathname),
    openGraph: buildOpenGraph({
      title,
      description,
      pathname,
      image,
      type,
    }),
    twitter: buildTwitter({
      title,
      description,
      image,
    }),
  };
}

export function buildCollectionMetadata(collection) {
  return buildPageMetadata({
    title: collection.title,
    description: collection.description,
    pathname: collection.route,
    type: "website",
  });
}

export function buildEntryMetadata(collection, entry) {
  return buildPageMetadata({
    title: entry.title,
    description: entry.description || collection.description,
    pathname: `${collection.route}/${entry.slug}`,
    image: entry.image || DEFAULT_OG_IMAGE,
    type: collection.openGraphType || "article",
  });
}

export function buildStandaloneMetadata({ title, description, pathname, image }) {
  return buildPageMetadata({
    title,
    description,
    pathname,
    image,
    type: "website",
  });
}

export function buildJsonLdMeta(json) {
  return {
    other: {
      "application/ld+json": JSON.stringify(json),
    },
  };
}

export function buildAbsoluteCanonical(pathname) {
  return toAbsoluteUrl(pathname);
}