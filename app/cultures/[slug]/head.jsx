// app/cultures/[slug]/head.jsx
import { getCulture } from "@/lib/getCulture";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getCulture(slug);
  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-culture.webp";
  const url = `https://www.reltroner.com/cultures/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://www.reltroner.com${image}`,
    "author": {
      "@type": "Person",
      "name": data.author || "Rei Reltroner",
      "url": "https://www.reltroner.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.reltroner.com/images/logo.webp"
      }
    },
    "datePublished": data.date || "2025-01-01",
    "dateModified": data.modified || data.date || "2025-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return {
    title,
    description,
    keywords: `${title}, culture, Reltronland, Asthortera, worldbuilding, creative societies`,
    openGraph: {
      title,
      description,
      url,
      siteName: "Reltroner Studio",
      images: [{ url: `https://www.reltroner.com${image}`, width: 1200, height: 630, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.reltroner.com${image}`],
    },
    metadataBase: new URL("https://www.reltroner.com"),
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
    alternates: { canonical: url },
  };
}

export default function Head() { return null; }
