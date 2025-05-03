import { getStatistic } from "@/lib/getStatistic";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getStatistic(slug);

  if (!data) return notFound();

  const fullUrl = `https://www.reltroner.com/statistics/${slug}`;
  const fullImage = `https://www.reltroner.com${data.image}`;
  const dateISO = `${data.date}T00:00:00+07:00`;
  const modifiedISO = `${(data.modified || data.date)}T00:00:00+07:00`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": data.title,
    "description": data.description,
    "url": fullUrl,
    "creator": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "url": "https://www.reltroner.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.reltroner.com/images/logo.webp"
      }
    },
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": fullUrl
    },
    "image": fullImage,
    "datePublished": dateISO,
    "dateModified": modifiedISO,
  };

  return {
    title: data.title,
    description: data.description,
    keywords: `${data.title}, Reltroner Statistics, Asthortera, Reltronland Metrics, SDI Index, futuristic data, Rei Reltroner, world simulation`,
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      url: fullUrl,
      siteName: "Reltroner Studio",
      images: [
        {
          url: fullImage,
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
      images: [fullImage],
    },
    metadataBase: new URL("https://www.reltroner.com"),
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default function Head() {
  return null;
}
