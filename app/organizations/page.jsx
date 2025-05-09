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
    date: "2025-04-04",
    published: true
  },
  {
    title: "Henchoeway",
    description: "A secretive cult rooted in Nytherion Abyss, Henchoeway spreads illusions of comfort while manipulating the world from the depths of Tremora Trench.",
    slug: "henchoeway", 
    image: "/images/henchoeway.webp", 
    author: "Rei Reltroner",
    date: "2025-04-07",
    published: true
  },
  {
    title: "🛡️ Reltronland Space Command (RSC)",
    description: "The supreme void defense and exploration fleet of Reltronland, forged through sentient clarity, strategic realism, and unwavering discipline to safeguard sentient evolution across the galaxy.",
    slug: "reltronland-space-command",
    image: "/images/reltronland-space-command.webp",
    author: "Rei Reltroner",
    date: "2025-04-27",
    published: true
  },
  {
    title: "🛰️ Asthortera Space Command (ASC)",
    description: "A comprehensive and strategic breakdown of the ASC: its foundation, philosophy, command structure, operations, and geopolitical contrast with RSC.",
    slug: "asthortera-space-command",
    image: "/images/asthortera-space-command.webp",
    author: "Reltroner Studio",
    date: "2025-05-07",
    published: true
  },
  {
    title: "💱 Reltronland Financial Ecosystem: Institutions Beyond Survival",
    description: "An overview of Reltronland's advanced financial institutions—AFRI, RIDA, SAVA, and CERA—designed to replace outdated models like IMF and World Bank through meritocratic consciousness, economic clarity, and sovereign AI governance.",
    slug: "reltronland-financial-institutions",
    image: "/images/reltronland-financial-institutions.webp",
    author: "Rei Reltroner",
    date: "2025-05-09",
    published: true
  },
  {
    title: "🏛️ Reltronland Astralis Central Bank (RACB)",
    description: "An overview of the Reltronland Astralis Central Bank (RACB), the sovereign monetary institution engineered to uphold clarity-based economics, issue merit-backed digital currency, and regulate sentient liquidity across civilization.",
    slug: "racb",
    author: "Rei Reltroner",
    date: "2025-05-10",
    published: true,
    image: "/images/racb.webp"
  }
  
];

export default function Organizations() {
  return <OrganizationsClient organizations={organizations} />;
}
