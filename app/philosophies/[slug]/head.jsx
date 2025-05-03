// app/philosophies/[slug]/head.jsx

import { getPhilosophie } from "@/lib/getPhilosophie";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data } = await getPhilosophie(slug);
  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-philosophy.webp";
  const url = `https://www.reltroner.com/philosophies/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://www.reltroner.com${image}`,
    "author": {
      "@type": "Person",
      "name": data.author || "Rei Reltroner"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.reltroner.com/images/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "datePublished": data.date || "2025-01-01",
    "dateModified": data.modified || data.date || "2025-01-01"
  };

  return {
    title,
    description,
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
    alternates: { canonical: url },
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default function Head() {
  return null;
}
