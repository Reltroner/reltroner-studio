import ItemsClient from "./ItemsClient";

export const metadata = {
  title: "Items",
  description: "A curated catalog of Asthortera artifacts and relics—explore the objects, from Abyss Ritual Items to future worldbuilding essentials, that give life to the Reltroner Studio universe."
};

const items = [
  {
    title: "🩸 Abyss Ritual Items",
    description: "A collection of items used in the Ritual of Nytherion Abyss. Each object is designed to comfort the soul while quietly consuming it.",
    slug: "abyss-ritual-items",
    date: "2025-04-30",
    author: "Rei Reltroner",
    image: "/images/abyss-ritual-items.webp",
    tags: ["nytherion abyss", "ritual", "items", "worldbuilding", "abyss"],
    published: true
  },
  {
    title: "Reltroner AI Fork – Memory-as-a-Service Product Sheet",
    description: "A deployable AI assistant built with over 200+ `.md` structured memory layers from Reltroner Studio, designed for system architects, founders, and clarity-focused teams seeking high-impact, philosophy-infused intelligence solutions.",
    slug: "reltroner-ai-fork",
    date: "2025-05-18",
    author: "Rei Reltroner",
    image: "/images/reltroner-ai-fork.webp",
    published: true
  }
  
  
  // Tambahkan lebih banyak item di masa depan...
];

export default function Items() {
  return <ItemsClient items={items} />;
}
