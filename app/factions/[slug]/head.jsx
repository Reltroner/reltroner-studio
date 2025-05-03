// app/factions/[slug]/head.jsx
import { getFaction } from "@/lib/getFaction";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getFaction(slug);

  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-faction.webp";
  const url = `https://www.reltroner.com/factions/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": title,
    "description": description,
    "url": url,
    "logo": `https://www.reltroner.com${image}`,
    "founder": {
      "@type": "Person",
      "name": data.founder || "Unknown",
      "url": "https://www.reltroner.com/about"
    },
    "foundingDate": data.date || "2025-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Reltroner Studio",
      images: [
        {
          url: `https://www.reltroner.com${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.reltroner.com${image}`],
    },
    alternates: { canonical: url },
    metadataBase: new URL("https://www.reltroner.com"),
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
}

export default function Head() {
  return null;
}
