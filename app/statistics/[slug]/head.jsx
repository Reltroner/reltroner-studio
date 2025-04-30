import { getStatistic } from "@/lib/getStatistic";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getStatistic(slug);

  if (!data) return notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": data.title,
    "description": data.description,
    "url": `https://reltroner.com/statistics/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "url": "https://reltroner.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reltroner.com/images/logo.png"
      }
    },
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": `https://reltroner.com/statistics/${slug}`
    },
    "image": data.image,
    "datePublished": data.date || "2025-01-01",
    "dateModified": data.modified || data.date || "2025-01-01",
  };

  return {
    title: data.title,
    description: data.description,
    keywords: `${data.title}, Reltroner Statistics, Asthortera, Reltronland Metrics, SDI Index, futuristic data, Rei Reltroner, world simulation`,
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      url: `https://reltroner.com/statistics/${slug}`,
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
