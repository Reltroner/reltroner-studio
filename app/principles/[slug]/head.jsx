import { getPrinciple } from "@/lib/getPrinciple";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getPrinciple(slug);
  if (!data) return notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.image,
    "datePublished": data.date || "2025-01-01",
    "dateModified": data.modified || data.date || "2025-01-01",
    "author": {
      "@type": "Person",
      "name": data.author || "Rei Reltroner",
      "url": "https://reltroner.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reltroner.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reltroner.com/principles/${slug}`
    }
  };

  return {
    title: data.title,
    description: data.description,
    keywords: `${data.title}, Reltroner Studio, Rei Reltroner, Astralis Pinnacle, meritocracy, antifuedalism, worldbuilding, clarity, visionary code`,
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      url: `https://reltroner.com/principles/${slug}`,
      siteName: "Reltroner Studio",
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      creator: "@reltroner",
      images: [data.image],
    },
    metadataBase: new URL("https://reltroner.com"),
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default function Head() {
  return null;
}
