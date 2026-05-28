import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_SOCIALS } from "@/lib/constants/site";
import { toAbsoluteUrl } from "@/lib/seo/canonical";

function buildPublisher() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: toAbsoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/images/logo.webp"),
    },
  };
}

function buildAuthor(author) {
  return {
    "@type": "Person",
    name: author || "Rei Reltroner",
    url: toAbsoluteUrl("/about"),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: toAbsoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/images/logo.webp"),
    },
    sameAs: [SITE_SOCIALS.youtube, SITE_SOCIALS.github, SITE_SOCIALS.twitter],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: toAbsoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${toAbsoluteUrl("/")}search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildUniverseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Reltroner Studio Universe",
    creator: {
      "@type": "Person",
      name: "Rei Reltroner",
      url: toAbsoluteUrl("/about"),
    },
    dateCreated: "2025-04-06T00:00:00+07:00",
    description:
      "A deeply immersive digital world known as Asthortera — home of Reltronland, Depcutland, and the core narratives of The Abyss of Comfort and The Freezone Code.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toAbsoluteUrl("/"),
    },
  };
}

export function buildContentJsonLd(collection, entry) {
  const path = `${collection.route}/${entry.slug}`;
  const image = toAbsoluteUrl(entry.image || DEFAULT_OG_IMAGE);
  const url = toAbsoluteUrl(path);

  switch (collection.schemaType) {
    case "Person":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: entry.title,
        description: entry.description,
        image,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        author: buildAuthor(entry.author),
        publisher: buildPublisher(),
      };
    case "Event":
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: entry.title,
        description: entry.description,
        startDate: entry.startDate || entry.date || "2025-01-01",
        endDate: entry.endDate || entry.date || "2025-01-02",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        image,
        url,
        location: {
          "@type": "Place",
          name: entry.location || "Reltronland Virtual Archives",
          address: {
            "@type": "PostalAddress",
            addressCountry: {
              "@type": "Country",
              name: "Asthortera",
            },
          },
        },
        performer: {
          "@type": "PerformingGroup",
          name: "Reltroner Studio Speakers",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url,
        },
        organizer: buildPublisher(),
      };
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: entry.title,
        description: entry.description,
        image,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        publisher: buildPublisher(),
      };
    case "Place":
      return {
        "@context": "https://schema.org",
        "@type": "Place",
        name: entry.title,
        description: entry.description,
        image,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        publisher: buildPublisher(),
      };
    case "Dataset":
      return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: entry.title,
        description: entry.description,
        url,
        image,
        creator: buildAuthor(entry.author),
        publisher: buildPublisher(),
      };
    default:
      return {
        "@context": "https://schema.org",
        "@type": collection.schemaType || "Article",
        headline: entry.title,
        description: entry.description,
        image,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        datePublished: entry.date || "2025-01-01",
        dateModified: entry.modified || entry.date || "2025-01-01",
        author: buildAuthor(entry.author),
        publisher: buildPublisher(),
      };
  }
}