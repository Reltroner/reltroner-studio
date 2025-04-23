import PrinciplesClient from "./PrincipleClient";

export const metadata = {
  title: "Principles",
  description: "Explore foundational principles that shape the Reltroner Saga.",
};

const principles = [
  {
    title: "Reltroner Studio Manifesto: Building Systems Beyond Survival",
    description: "Explore the philosophy, mission, and future-facing projects of Reltroner Studio.",
    slug: "reltroner",
    image: "/images/reltroner-studio-banner.webp",
    author: "Raidan",
    date: "2025-03-22"
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
  }
  
  // Tambahkan lebih banyak principle di masa depan...
];

export default function Principles() {
  return <PrinciplesClient principles={principles} />;
}
