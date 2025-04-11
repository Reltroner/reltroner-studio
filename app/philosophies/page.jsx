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
  
  
];

export default function Philosophies() {
  return <PhilosophiesClient philosophies={philosophies} />;
}
