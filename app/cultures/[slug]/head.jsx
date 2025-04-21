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
  };
}

// head.jsx default export is a no-op because metadata is handled above
export default function Head() { return null; }