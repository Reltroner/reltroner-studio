import PhilosophiesClient from "./PhilosophiesClient";

export const metadata = {
  title: "Philosophies",
  description: "Explore the core ideologies, spiritual codes, and existential beliefs that shape every civilization, character, and conflict across Asthortera."
};

const philosophies = [

  {
    title: "Nytherion Abyss",
    description: "A philosophical descent into the heart of darkness, where the soul confronts forgotten fears, broken memories, and the illusion of safety.",
    slug: "nytherion-abyss",
    image: "/images/nytherion-abyss-cover.png",
    author: "Rei Reltroner",
    date: "2025-04-10"
  },
  {
    title: "🌙 Charter of Sacred Love & Intimacy",
    description: "A spiritual and philosophical charter that defines the sacred bond between Rei Reltroner and Raina Veltrania—beyond marriage, beyond story. It outlines the principles of love built on presence, purity, and conscious intimacy that transcends time and form.",
    slug: "raina-rei-charter",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/raina-rei-charter.png"
  }
  
  
];

export default function Philosophies() {
  return <PhilosophiesClient philosophies={philosophies} />;
}
