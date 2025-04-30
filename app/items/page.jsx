import ItemsClient from "./ItemsClient";

export const metadata = {
  title: "Items",
  description: "A living archive of world-shaping phenomena in Asthortera — from revolutions in spiritual philosophy to technological uprisings, and from interdimensional conflicts to peaceful cultural summits. Every Item listed here plays a key role in forging the soul and future of the Reltroner Saga."
};

const items = [
  {
    title: "🩸 Abyss Ritual Items",
    description: "A collection of items used in the Ritual of Nytherion Abyss. Each object is designed to comfort the soul while quietly consuming it.",
    slug: "abyss-ritual-items",
    date: "2025-04-30",
    author: "Rei Reltroner",
    image: "/images/abyss-ritual-items.webp",
    tags: ["nytherion abyss", "ritual", "items", "worldbuilding", "abyss"]
  },
  
  
  // Tambahkan lebih banyak item di masa depan...
];

export default function Items() {
  return <ItemsClient items={items} />;
}
