import { getCharacter } from "@/lib/getCharacter";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getCharacter(slug);
  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-character.webp";
  const url = `https://www.reltroner.com/characters/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      sitetitle: "Reltroner Studio",
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

export default function Head() {
  return null;
}