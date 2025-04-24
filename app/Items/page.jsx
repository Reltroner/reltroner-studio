import ItemsClient from "./ItemsClient";

export const metadata = {
  title: "Items",
  description: "Explore foundational items and interplanetary regulations that shape justice, labor, and order across Asthortera."
};

const items = [
  {
    title: "Asthortera Labor Rights and Employment Organization (ALREO)",
    description: "A comprehensive legal framework protecting labor rights, regulating fair employment, and enforcing ethical workforce distribution across Asthortera.",
    slug: "alreo",
    image: "/images/alreo.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  
  
  // Tambahkan lebih banyak item di masa depan...
];

export default function Items() {
  return <ItemsClient items={items} />;
}
