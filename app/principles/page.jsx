import PrinciplesClient from "./PrincipleClient";

export const metadata = {
  title: "Principles",
  description: "The Principles page is the forge where the Reltroner Saga’s core ideologies are born, refined, and immortalized. Here, ideas like the abolition of feudalism and the rise of spiritual meritocracy form the backbone of Rei Reltroner’s legacy—not as a fictional character, but as a true architect of meaning.",
};

const principles = [
  {
    title: "Reltroner Studio Manifesto: Building Systems Beyond Survival",
    description: "Explore the philosophy, mission, and future-facing projects of Reltroner Studio.",
    slug: "reltroner",
    image: "/images/reltroner-studio-banner.webp",
    author: "Reltroner Studio",
    date: "2025-03-22"
  },
  {
    title: "💸 Funded Roadmap — If This Project Gets Backed",
    description: "A masterlist of systems, upgrades, and innovations awaiting realization—activated only through investor support or external funding.",
    slug: "funded-roadmap",
    image: "/images/funded-roadmap.webp",
    author: "Reltroner Studio",
    date: "2025-04-26"
  },
  {
    title: "The Death of Feudalism: Astralis Principle 07",
    description: "Reltronland’s ideological extermination of hierarchy-based dominance and inherited power.",
    slug: "death-of-feudalism",
    author: "Reltroner Studio",
    date: "2025-04-15",
    published: true,
    image: "/images/death-of-feudalism.webp"
  },
  {
    title: "Multirealm Authority",
    description: "Only one entity is permitted to traverse both Earth and Asthortera—Rei Reltroner. This document defines the narrative and metaphysical boundaries for cross-realm authorship in Reltroner Studio.",
    slug: "multirealm-authority",
    author: "Reltroner Studio",
    date: "2025-04-15",
    published: true,
    image: "/images/multirealm-authority.webp",
  },
  {
    title: "🛡️ Code of Ethics: Zero Tolerance for Sexual Content",
    description: "A strict ethical directive from Reltroner Studio banning all forms of sexual content—visual, verbal, or digital—accompanied by a permanent audit and enforcement system designed to preserve the purity, discipline, and clarity of the creative environment.",
    slug: "anti-sexual-content",
    author: "Reltroner Studio",
    date: "2025-04-18",
    published: true,
    image: "/images/anti-sexual-content.webp"
  },
  {
    title: "📘 YouTubers Have Channels, I Have a Civilization",
    description: "A powerful reflection from Rei Reltroner on the philosophical and structural difference between posting for visibility and building for legacy. While others create for reach, he constructs a world that lives beyond algorithms — a civilization in motion.",
    slug: "youtubers-have-civilization",
    author: "Rei Reltroner",
    date: "2025-04-20",
    published: true,
    image: "/images/youtubers-have-civilization.webp"
  },
  {
    title: "🌍 Asthortera Type I.9 Doctrine",
    description: "A philosophical manifesto defining Asthortera’s conscious choice to remain a Type I.9 civilization—balancing immense planetary power with deep spiritual restraint.",
    slug: "asthortera-type-i9-doctrine",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true,
    tags: ["Asthortera", "Type I.9", "Doctrine"],
    image: "/images/asthortera-type-i9-doctrine.webp"
  },
  {
    title: "📜 The Civilizational Maturity Doctrine of Reltroner Studio",
    description: "An institutional doctrine outlining the philosophical, educational, and societal pillars that define Reltroner Studio as the most emotionally mature civilization in fictional history.",
    slug: "civilizational-maturity-reltroner",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/civilizational-maturity-reltroner.webp"
  },
  {
    title: "🌌 The Emotion No One Talks About: Being Raised by Space, Not People",
    description: "A quiet, often overlooked truth — that for some of us, home wasn’t a person, but a place. This is the emotional reality of being raised by public space, not family.",
    slug: "raised-by-space",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/raised-by-space.webp"
  },
  {
    title: "🗣️ Language Paradox in Reltroner Studio",
    description: "Explaining the narrative reason behind the use of English in a universe where Earth never existed.",
    slug: "language-paradox-reltroner",
    author: "Rei Reltroner",
    date: "2025-05-06",
    published: true,
    image: "/images/language-paradox-reltroner.webp"
  },
  {
    title: "Reltroner Design Manifesto: Building Interfaces for Conscious Civilizations",
    description: "A philosophical and technical declaration of why Reltroner Studio rejects noisy UI templates in favor of minimalist, sentient-centered design — built to reflect the clarity and purpose of a living civilization.",
    slug: "reltroner-design",
    image: "/images/reltroner-design.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-05-09"
  },
  {
    title: "💎 Astralis Capital Doctrine",
    description: "The supreme philosophical code guiding all economic and fiscal behavior in Reltronland — replacing greed-driven capitalism with clarity-based capital stewardship.",
    slug: "astralis-capital-doctrine",
    author: "Rei Reltroner",
    date: "2025-05-14",
    tags: ["Astralis Doctrine", "Reltronland", "Capital Philosophy", "Clarity Economics", "Post-Capitalism"],
    published: true,
    image: "/images/astralis-capital-doctrine.webp"
  },
  {
    title: "🏛️ Reltronland Civilization Framework",
    description: "A structural blueprint of Reltronland as a Red Pill-based civilization — designed not as fictional entertainment, but as a viable ideological and digital alternative to feudal global systems.",
    slug: "reltronland-civilization-framework",
    author: "Rei Reltroner",
    date: "2025-05-15",
    tags: ["Reltronland", "Civilization Framework", "Red Pill Doctrine", "SDI", "Alternative Governance"],
    published: true,
    image: "/images/reltronland-civilization-framework.webp"
  },
  {
    title: "📚 Reltronland Education Framework",
    description: "A clarity-based, SDI-aligned educational doctrine that governs the entire learning ecosystem in Reltronland — from early childhood to advanced civic integration.",
    slug: "reltronland-education-framework",
    author: "Rei Reltroner",
    date: "2025-05-15",
    tags: ["Reltronland", "Education", "Clarity Learning", "SDI Uplift", "Red Pill Curriculum"],
    published: true,
    image: "/images/reltronland-education-framework.webp"
  },
  {
    title: "💰 Reltronland Fiscal Grid",
    description: "An autonomous, clarity-indexed fiscal allocation system that powers the Red Pill economy of Reltronland. Designed to replace bureaucratic, corruptible budget models.",
    slug: "reltronland-fiscal-grid",
    author: "Rei Reltroner",
    date: "2025-05-15",
    tags: ["Reltronland", "Fiscal Grid", "Red Pill Budgeting", "Autonomous Finance", "Astralis Economy"],
    published: true,
    image: "/images/reltronland-fiscal-grid.webp"
  },
  {
    title: "📖 Reltronland Knowledge Architecture",
    description: "A sovereign framework for storing, distributing, and safeguarding clarity-based knowledge across physical and digital institutions in Reltronland.",
    slug: "reltronland-knowledge-architecture",
    author: "Rei Reltroner",
    date: "2025-05-16",
    tags: ["Reltronland", "Knowledge Systems", "Library Doctrine", "Information Clarity", "Sentient Archives"],
    image: "/images/reltronland-knowledge-architecture.webp",
    published: true
  },
  {
    title: "🧠 SDI Engineering Principles",
    description: "A structural breakdown of the Sentient Development Index (SDI) — the central metric for societal clarity and maturity in Reltronland and greater Asthortera.",
    slug: "sdi-engineering-principles",
    author: "Rei Reltroner",
    date: "2025-05-16",
    tags: ["SDI", "Reltronland", "Civilization Index", "Societal Clarity", "Red Pill Metrics"],
    image: "/images/sdi-engineering-principles.webp",
    published: true
  },
  {
    title: "No Excuse for Mediocrity – A Red Pill Cosmic Manifesto",
    description: "This manifesto declares that mediocrity is no longer justifiable in an age of infinite possibility. It is a Red Pill proclamation for those who dare to deviate, build new systems, and embody extreme clarity in the face of cosmic stagnation. Crafted by Reltroner Studio, it speaks to founders, visionaries, and self-taught architects who choose to ascend rather than conform.",
    slug: "no-excuse-for-mediocrity",
    image: "/images/no-excuse-for-mediocrity.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-05-18"
  },
  {
    title: "Life as a System Architect – Beyond Code",
    description: "A philosophical and technical reflection on how system architecture extends beyond code—into clarity-driven living, mental resilience, and existential design.",
    slug: "life-as-a-system-architect",
    author: "Rei Reltroner",
    date: "2025-05-20",
    published: true,
    image: "/images/life-as-a-system-architect.webp"
  },
  {
    title: "Reltroner is a System Architecture Firm Disguised as a Creative World-Building Studio",
    description: "Unmasking the deeper system logic behind Reltroner Studio's imaginative surface.",
    slug: "reltroner-underlayer",
    author: "Rei Reltroner",
    date: "2025-05-20",
    published: true,
    image: "/images/reltroner-underlayer.webp"
  },
  {
    title: "Worst-Case Survival Protocol",
    description: "An unfiltered backup life plan if all other systems fail",
    slug: "worst-case-protocol",
    date: "2025-06-19",
    author: "Rei Reltroner",
    image: "/images/worst-case-protocol.webp",
    published: true
  },
  {
    title: "How I Went from Crypto Loser to Infrastructure Winner",
    description: "How I turned a -87% altcoin portfolio into real-world access to Web3 infrastructure for Reltroner Studio.",
    slug: "crypto-infra-transition",
    image: "/images/crypto-infra-transition.webp",
    date: "2025-06-23",
    published: true,
    tags: ["crypto", "altcoin", "builder", "web3", "reltroner studio", "reflection"],
    author: "Reltroner Studio"
  },
  {
    title: "The Art of Comment Engineering",
    description: "A conscious strategy for using comments as a vessel for Red Pill insight, differentiation, and professional infiltration.",
    author: "Reltroner Studio",
    date: "2025-07-05",
    published: true,
    slug: "the-art-of-comment-engineering",
    image: "/images/the-art-of-comment-engineering.webp",
    tags: ["comment strategy", "red pill", "content infiltration", "linkedin", "ai ethics", "reflection"]
  },
  {
    title: "📜 Manifesto of the Post-Efficiency Era",
    description: "A declaration by Reltroner Studio to transcend automation and reclaim the human spirit through creativity, consciousness, and cosmic narrative.",
    slug: "post-efficiency-manifesto",
    author: "Reltroner Studio",
    date: "2025-07-16",
    tags: ["meaning", "post-efficiency", "redpill", "consciousness", "ai-paradox", "astralis-economy"],
    published: true,
    image: "/images/post-efficiency-manifesto.webp"
  }
  
  // Tambahkan lebih banyak principle di masa depan...
];

export default function Principles() {
  return <PrinciplesClient principles={principles} />;
}
