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
    image: "/images/nytherion-abyss-cover.webp",
    author: "Rei Reltroner",
    date: "2025-04-10"
  },
  {
    title: "♾️ Immortality Protocol – Astralis-Bound Entities",
    description: "A philosophical and metaphysical doctrine defining why certain characters in Asthortera never die—anchored not by biology, but by belief, authorship, and the eternal flame of storytelling. This protocol explains the rare class of immortal entities whose existence mirrors the breath of their creator.",
    slug: "immortality-protocol",
    image: "/images/immortality-protocol.webp",
    author: "Rei Reltroner",
    date: "2025-04-07"
  },
  {
    title: "📜 There is No Right or Wrong in Worldbuilding",
    description: "A philosophical declaration that worldbuilding is not bound by correctness, but by clarity of intent and internal coherence. In the universe of Reltroner Studio, creation is governed by meaning—not conformity.",
    slug: "no-right-no-wrong",
    image: "/images/no-right-no-wrong-banner.webp",
    author: "Rei Reltroner",
    date: "2025-04-20"
  },
  {
    title: "Sentient Value Reflection Theory (SVRT)",
    description: "A groundbreaking philosophy stating that the authenticity, depth, and admiration of fictional worlds directly mirror the growth, discipline, and sentient development of their creators.",
    slug: "sentient-value-reflection-theory",
    date: "2025-04-26",
    author: "Rei Reltroner",
    image: "/images/sentient-value-reflection-theory.webp"
  },  
  {
    title: "🌍 Why Immigrants Choose Asthortera",
    description: "Despite not leading in Kardashev scale, Asthortera offers the galaxy’s most balanced civilization—where SDI, spirit, and sentient dignity converge.",
    slug: "why-immigrants-choose-asthortera",
    image: "/images/why-immigrants-choose-asthortera.webp",
    author: "Rei Reltroner",
    date: "2025-04-23"
  },
  {
    title: "🌐 Worlds for Enthusiasts — Pasgerflit, Moreg, and Hargenbor",
    description: "An exploration of three unique nations in Asthortera—Pasgerflit, Moreg, and Hargenbor—designed not from personal interest, but as heartfelt homes for aviation, automotive, and naval enthusiasts across the galaxy.",
    slug: "worlds-for-enthusiasts",
    image: "/images/worlds-for-enthusiasts.webp",
    author: "Rei Reltroner",
    date: "2025-04-24"
  },
  {
    title: "🧠 Reltronland vs Depcutland: A Tale of Divergent Souls",
    description: "Two nations, one origin—Reltronland and Depcutland walk diverging paths of clarity and elegance. Discover their souls in contrast.",
    slug: "reltronland-vs-depcutland-soul",
    image: "/images/reltronland-vs-depcutland-soul.webp",
    author: "Rei Reltroner",
    date: "2025-04-25"
  },
  {
    title: "🧩 The Wall of Silenced Builders",
    description: "A sacred wall honoring the forgotten creators—those whose voices were silenced not because they failed, but because they were too real, too raw, too visionary to be understood by rigid systems. This wall remembers them all.",
    slug: "wall-of-silenced-builders",
    image: "/images/wall-of-silenced-builders.webp",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🛡️ I Am Not the Villain You Feared",
    description: "A personal declaration of spiritual survival—a place for those who were wrongly flagged, judged, or silenced. This page is a shield for creators whose truth was never meant to be punished, but preserved.",
    slug: "not-the-villain",
    image: "/images/not-the-villain.webp",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "📜 The Builders Who Were Misjudged",
    description: "A tribute to those who were misunderstood by automation, abandoned by policy, or mistaken as threats while building sacred and meaningful work. Their intent was pure—this page stands to remember their worth.",
    slug: "misjudged-builders",
    image: "/images/misjudged-builders.webp",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🛡️ When the System Mistakes You for a Threat, You Know You’re Building Something Real",
    description: "A personal reflection and call to creators who have been flagged, judged, or silenced—not because they broke the rules, but because they were building something too original to be understood. This is not a warning. It’s a confirmation that your vision matters.",
    slug: "system-mistakes-you",
    image: "/images/system-mistakes-you.webp",
    author: "Rei Reltroner",
    date: "2025-04-19"
  },
  {
    title: "🌙 Charter of Sacred Love & Intimacy",
    description: "A spiritual and philosophical charter that defines the sacred bond between Rei Reltroner and Raina Veltrania—beyond marriage, beyond story. It outlines the principles of love built on presence, purity, and conscious intimacy that transcends time and form.",
    slug: "raina-rei-charter",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/raina-rei-charter.webp"
  },
 
];

export default function Philosophies() {
  return <PhilosophiesClient philosophies={philosophies} />;
}
