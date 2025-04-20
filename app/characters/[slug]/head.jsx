import { getCharacter } from "@/lib/getCharacter";

export async function generateMetadata({ params }) {
    const { data } = await getCharacter(params.slug);

  if (!data) {
    return {
      title: "Not Found | Reltroner Studio",
      description: "This character profile could not be located.",
    };
  }

  const title = data.name;
  const description = data.description;
  const image = data.image || "/images/default-character.png";
  const url = `https://www.reltroner.com/characters/${params.slug}`;

  return {
    title,
    description,
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
    alternates: { canonical: url }
  };
}

export default function Head() {
  return null;
}