// app/characters/[slug]/head.jsx

import { getCharacter } from "@/lib/getCharacter";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data } = await getCharacter(slug);
  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-character.webp";
  const url = `https://www.reltroner.com/characters/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": title,
    "description": description,
    "image": `https://www.reltroner.com${image}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.reltroner.com/images/logo.webp"
      }
    },
    "author": {
      "@type": "Person",
      "name": data.author || "Rei Reltroner",
      "url": "https://www.reltroner.com/about"
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
      type: "profile",
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
