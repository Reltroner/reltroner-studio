// app/series/[slug]/head.jsx
import { getSerie } from "@/lib/getSerie";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const { data } = await getSerie(slug);

  if (!data) return notFound();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.image],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

export default function Head() {
    return null;
  }