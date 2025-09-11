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
  },
  {
    title: "🪪 Reltronland Citizenship Ethics",
    description: "A declaration of ethical responsibilities, spiritual expectations, and clarity-driven behavior required of all Reltronland citizens. Citizenship is not a label — it is a lived contribution.",
    slug: "reltronland-citizenship-ethics",
    image: "/images/reltronland-citizenship-ethics.webp",
    author: "Rei Reltroner",
    date: "2025-05-13",
    published: true,
    tags: ["Reltronland", "Citizenship", "Ethical Framework", "Clarity Code", "Sentient Society"]
  },
  {
    title: "⚙️ Reltronland Labor Ethics",
    description: "A doctrinal guide to ethical work behavior, meritocratic contribution, and clarity-aligned productivity in the sovereign civilization of Reltronland.",
    slug: "reltronland-labor-ethics",
    author: "Rei Reltroner",
    date: "2025-05-15",
    tags: ["Reltronland", "Labor Doctrine", "Meritocracy", "Work Philosophy", "Red Pill Ethics"],
    image: "/images/reltronland-labor-ethics.webp",
    published: true
  },
  {
    title: "🔇 Reltronland Public Silence Protocol",
    description: "A civic doctrine governing the design, maintenance, and sacred respect of silence zones in Reltronland — spaces of mental calibration and collective emotional clarity.",
    slug: "reltronland-public-silence-protocol",
    author: "Rei Reltroner",
    date: "2025-05-15",
    tags: ["Reltronland", "Silence Zones", "Civic Clarity", "Spiritual Discipline", "Red Pill Ethics"],
    image: "/images/reltronland-public-silence-protocol.webp",
    published: true
  },
  {
    title: "🔬 Sentient Upshift Lab",
    description: "An intensive integration and clarity refinement facility for newly arrived citizens, SDI-negative regions, and those recovering from illusionist exposure.",
    slug: "sentient-upshift-lab",
    author: "Rei Reltroner",
    date: "2025-05-16",
    tags: ["Reltronland", "SDI Recovery", "Clarity Training", "Sentient Evolution", "Red Pill Uplift"],
    image: "/images/sentient-upshift-lab.webp",
    published: true
  },
  {
    title: "✈️ The Aviashenwelt Accord — SDI-Based Visa-Free Framework",
    description: "An interplanetary treaty signed in 979 BAC that allows individuals with SDI scores above 0.921 to travel freely across Asthortera’s highest-trust civilizations.",
    slug: "aviashenwelt-accord",
    date: "2025-05-16",
    author: "Rei Reltroner",
    published: true,
    image: "/images/aviashenwelt-accord.webp"
  },
  {
    title: "🚫 Abolishment Decree: Feudalism & Inferiority Mentality",
    description: "A core decree of Reltronland banning all forms of feudal hierarchy and inferiority-based self-conception as tools of the Nytherion Abyss, to preserve clarity, meritocracy, and sentient growth.",
    slug: "abolish-feudalism-inferiority",
    image: "/images/abolish-feudalism-inferiority.webp",
    author: "Rei Reltroner",
    date: "2025-05-18",
    published: true
  },
  {
    title: "🏛️ Reltronland Administrative Naming Rules",
    description: "A linguistic and philosophical framework defining naming conventions for each administrative level in Reltronland, from the central nation to localized subdistricts and below.",
    slug: "reltronland-administrative-naming-rules",
    image: "/images/reltronland-administrative-naming-rules.webp",
    date: "2025-06-25",
    author: "Rei Reltroner",
    published: true
  },
  {
    title: "Astralis Doctrine – No Donation Policy",
    description: "An official declaration of the strict no-donation spiritual principle within the Astralis Pinnacle Temple of Reltronland.",
    slug: "astralis-doctrine-no-donation",
    author: "Reltroner Studio",
    date: "2025-07-09",
    published: true,
    image: "/images/temple-policy-redpill-extreme.webp",
    tags: ["astralis", "doctrine", "redpill", "donation", "policy"]
  },
  {
    title: "🛡️ RAID-1: Anti-Idleness Division of Reltronland",
    description: "An elite task force in Reltronland dedicated to eradicating existential stagnation, ensuring all sentients contribute meaningfully to civilization.",
    slug: "raid1-reltronland",
    author: "Rei Reltroner",
    date: "2025-08-04",
    published: true,
    image: "/images/raid1-reltronland.webp",
    tags: ["Reltronland", "Red Pill Doctrine", "Anti-Idleness", "Meritocracy", "Productivity Enforcement"]
  },
  {
    title: "📜 Twin Digital Accord (966 BAC)",
    description: "A bilateral treaty between Depcutland and Reltronland on the preservation of knowledge through Digital Twin Systems.",
    slug: "twin-digital-accord",
    author: "Reltroner Studio",
    date: "2025-09-05",
    published: true,
    image: "/images/twin-digital-accord.webp",
    tags: ["digital twin", "knowledge preservation", "depcutland", "reltronland", "accord"]
  },
  {
    title: "🏛️ Clarity Politics of Reltronland",
    description: "A DAO-based political framework where governance is determined by citizens with SDI ≥ 0.990, ensuring meritocratic, depersonalized, and future-oriented decision making.",
    slug: "clarity-politics-reltronland",
    author: "Reltroner Studio",
    date: "2025-09-09",
    published: true,
    image: "/images/clarity-politics-reltronland.webp"
  }
  
  // Tambahkan lebih banyak Law di masa depan...
];

export default function Laws() {
  return <LawsClient laws={laws} />;
}
