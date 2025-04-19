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
    image: "/images/death-of-feudalism.png"
  },
  {
    title: "🛡️ Code of Ethics: Zero Tolerance for Sexual Content",
    description: "A strict ethical directive from Reltroner Studio banning all forms of sexual content—visual, verbal, or digital—accompanied by a permanent audit and enforcement system designed to preserve the purity, discipline, and clarity of the creative environment.",
    slug: "anti-sexual-content",
    author: "Reltroner Studio",
    date: "2025-04-18",
    published: true,
    image: "/images/anti-sexual-content.png"
  }
  
  // Tambahkan lebih banyak principle di masa depan...
];

export default function Principles() {
  return <PrinciplesClient principles={principles} />;
}
