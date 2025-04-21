import OrganizationsClient from "./OrganizationsClient";

export const metadata = {
  title: "Organizations",
  description: "A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world’s creative, economic, and ideological future."
};

const organizations = [
  {
    title: "Reltroner Studio Holdings",
    description: "A strategic breakdown of Reltroner Studio’s multidivisional structure and its future-forward ecosystem of creativity, capital, and sovereignty.",
    slug: "reltroner-holding",
    image: "/images/reltroner-holding.webp",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "Henchoeway",
    description: "A secretive cult rooted in Nytherion Abyss, Henchoeway spreads illusions of comfort while manipulating the world from the depths of Tremora Trench.",
    slug: "henchoeway", 
    image: "/images/henchoeway.webp", 
    author: "Rei Reltroner",
    date: "2025-04-07"
  }
];

export default function Organizations() {
  return <OrganizationsClient organizations={organizations} />;
}
