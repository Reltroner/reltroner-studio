import LawsClient from "./LawsClient";

export const metadata = {
  title: "Laws",
  description: "Explore foundational laws and interplanetary regulations that shape justice, labor, and order across Asthortera."
};

const laws = [
  {
    title: "Asthortera Labor Rights and Employment Organization (ALREO)",
    description: "A comprehensive legal framework protecting labor rights, regulating fair employment, and enforcing ethical workforce distribution across Asthortera.",
    slug: "alreo",
    image: "/images/alreo.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Reltronland Immigration Policy",
    description: "A high-tier, AI-driven immigration framework designed to filter only the most talented, disciplined, and value-creating individuals into Reltronland — the heart of Astralis Pinnacle.",
    slug: "reltronland-immigration",
    image: "/images/reltronland-immigration.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Reltronland Anti-Corruption Protocol",
    description: "Absolute justice against corruption and feudalism within Reltronland and Asthortera.",
    slug: "reltronland-anti-corruption",
    author: "Reltroner Studio",
    date: "2025-04-15",
    published: true,
    image: "/images/reltronland-anti-corruption.webp"
  },
  {
    title: "The Origin of Absolute Law: From Depeisit Collapse to Reltronland Ascension",
    description: "How the anti-corruption framework of Reltronland evolved from the ruins of Depeisit through Depcutland's legal enlightenment.",
    slug: "anti-corruption-origin",
    author: "Reltroner Studio",
    date: "2025-04-15",
    published: true,
    image: "/images/anti-corruption-origin.webp"
  },
  {
    title: "Core Constitution of Reltronland",
    description: "The foundational doctrines that govern the Reltronland civilization—spiritually, ethically, structurally.",
    slug: "reltronland-core-constitution",
    author: "Reltroner Studio",
    date: "2025-04-15",
    published: true,
    image: "/images/reltronland-core-constitution.webp"
  },
  {
    title: "The Soil Charter of Reltronland",
    description: "The foundational zoning doctrine of Reltronland that defines how every piece of land must serve clarity, merit, and sentient development—marking Rathroper as sacred ground zero.",
    slug: "soil-charter",
    image: "/images/soil-charter.webp",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Aurastelia Governance Model",
    description: "A spiritual-functional hybrid system led by Queen Valethra, balancing sentient resonance, harmony, and conscious policymaking.",
    slug: "aurastelia-governance-model",
    image: "/images/aurastelia-governance-model.webp",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  },
  {
    title: "🛡️ Reltronland Tobacco Regulation Act",
    description: "A comprehensive legal act from Reltronland enforcing strict tobacco control through economic barriers, spatial limitations, and high civil penalties — upholding a national standard of clean air and disciplined living.",
    slug: "reltronland-tobacco-regulation",
    image: "/images/reltronland-tobacco-regulation.webp",
    author: "Rei Reltroner",
    date: "2025-04-18",
    published: true
  }
  // Tambahkan lebih banyak Law di masa depan...
];

export default function Laws() {
  return <LawsClient laws={laws} />;
}
