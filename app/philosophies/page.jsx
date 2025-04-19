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
    title: "🧩 The Wall of Silenced Builders",
    description: "A sacred wall honoring the forgotten creators—those whose voices were silenced not because they failed, but because they were too real, too raw, too visionary to be understood by rigid systems. This wall remembers them all.",
    slug: "wall-of-silenced-builders",
    image: "/images/wall-of-silenced-builders.png",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🛡️ I Am Not the Villain You Feared",
    description: "A personal declaration of spiritual survival—a place for those who were wrongly flagged, judged, or silenced. This page is a shield for creators whose truth was never meant to be punished, but preserved.",
    slug: "not-the-villain",
    image: "/images/not-the-villain.png",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "📜 The Builders Who Were Misjudged",
    description: "A tribute to those who were misunderstood by automation, abandoned by policy, or mistaken as threats while building sacred and meaningful work. Their intent was pure—this page stands to remember their worth.",
    slug: "misjudged-builders",
    image: "/images/misjudged-builders.png",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🛡️ When the System Mistakes You for a Threat, You Know You’re Building Something Real",
    description: "A personal reflection and call to creators who have been flagged, judged, or silenced—not because they broke the rules, but because they were building something too original to be understood. This is not a warning. It’s a confirmation that your vision matters.",
    slug: "system-mistakes-you",
    image: "/images/system-mistakes-you.png",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🌙 Charter of Sacred Love & Intimacy",
    description: "A spiritual and philosophical charter that defines the sacred bond between Rei Reltroner and Raina Veltrania—beyond marriage, beyond story. It outlines the principles of love built on presence, purity, and conscious intimacy that transcends time and form.",
    slug: "raina-rei-charter",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/raina-rei-charter.png"
  },
 
];

export default function Philosophies() {
  return <PhilosophiesClient philosophies={philosophies} />;
}
