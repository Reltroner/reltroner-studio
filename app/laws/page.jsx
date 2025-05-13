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
  },
  {
    title: "📜 Reltronland Civilized Taxation Charter",
    description: "A declaration that abolishes bureaucratic taxation culture and establishes a futuristic, respectful, and civil-centered fiscal system in Reltronland — where clarity replaces fear, and contribution means trust.",
    slug: "reltronland-taxation-charter",
    image: "/images/reltronland-taxation-charter.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
    published: true
  },
  {
    title: "⚖️ Energy Codex Year 949 BAC — Asthortera Planetary Mandate",
    description: "The sacred law that governs all energy across Asthortera—ensuring that no power shall rise above sentient harmony and cosmic ethics.",
    slug: "energy-codex-949",
    image: "/images/energy-codex-949.webp",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true
  },
  {
    title: "🌐 Global Education Mandate in Asthortera",
    description: "A planetary law mandating all nations in Asthortera to implement cybergogical and experiential education with global travel integration.",
    slug: "global-education-mandate",
    image: "/images/global-education-mandate.webp",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true,
    tags: ["education", "cybergogy", "international law", "policy", "kalgered"]
  },
  {
    title: "🏛️ Sentient Zoning Integrity Act — Reltronland",
    description: "A legislative cornerstone ensuring that land usage in Reltronland aligns with the ethical, cognitive, and developmental evolution of its sentient population.",
    slug: "sentient-zoning-integrity-act",
    image: "/images/sentient-zoning-integrity-act.webp",
    author: "Rei Reltroner",
    date: "2025-04-26",
    published: true,
    tags: ["zoning", "land use", "law", "policy", "reltronland"]
  },
  {
    title: "📜 SDI Code Violation - Article 1.7.2",
    description: "Legal decree from Reltronland declaring the unauthorized creation of children without developmental capacity as a societal crime. Article 1.7.2 outlines strict criteria, sanctions, and the Eternal Sterilization Protocol for violators under the Astralis Pinnacle's SDI framework.",
    slug: "sdi-code-1.7.2",
    image: "/images/sdi-code-1.7.2.webp",
    author: "Rei Reltroner",
    date: "2025-04-26",
    published: true
  },
  {
    title: "🛑 Reltronland Forbidden Substances & Narcotics Regulation Act",
    description: "A zero-tolerance legal mandate from Reltronland enforcing strict prohibitions on narcotics, with death penalties for irredeemable offenders to preserve civilization and prevent irreversible harm.",
    slug: "reltronland-narcotics-regulation",
    image: "/images/reltronland-narcotics-regulation.webp",
    author: "Rei Reltroner",
    date: "2025-05-09",
    published: true
  },
  {
    title: "Stelpadland — Governance and Creed",
    description: "An exploration into the spiritual eco-meritocracy of Stelpadland — where leadership grows from the soil, not from ambition.",
    slug: "stelpadland-governance",
    author: "Rei Reltroner",
    date: "2025-05-14",
    tags: ["Stelpadland", "Governance", "Worldbuilding", "Spiritual Leadership", "Eco-Meritocracy"],
    image: "/images/stelpadland-governance.webp",
    published: true
  },
  {
    title: "📜 The Stelhaven(Kalgered) Accord (983 BAC)",
    description: "The foundational legal framework of globalized civilization in Asthortera—governing international military cooperation, trade, diplomacy, and legal harmonization.",
    slug: "stelhaven-accord-983",
    image: "/images/stelhaven-accord-983.webp",
    author: "Rei Reltroner",
    date: "2025-04-29",
    published: true
  },
  {
    title: "📜 Galactic Alignment Treaty ",
    description: "An interstellar charter formalized by Reltronland and client planets to ensure sentient cooperation, void security, and ethical expansion beyond Asthortera. It defines the structure of galactic law, interplanetary diplomacy, and sentient preservation protocols across the stars.",
    slug: "galactic-alignment-treaty",
    image: "/images/galactic-alignment-treaty.webp",
    author: "Rei Reltroner",
    date: "2025-04-30",
    published: true
  }
  
  // Tambahkan lebih banyak Law di masa depan...
];

export default function Laws() {
  return <LawsClient laws={laws} />;
}
