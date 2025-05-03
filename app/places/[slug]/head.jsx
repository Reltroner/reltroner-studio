// app/places/[slug]/head.jsx
import { getPlace } from "@/lib/getPlace";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getPlace(slug);

  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-place.webp";
  const url = `https://www.reltroner.com/places/${slug}`;

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
    alternates: {
      canonical: url,
    },
  };
}

export default function Head() {
  return null;
}
