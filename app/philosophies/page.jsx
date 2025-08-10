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
    date: "2025-04-10",
    published: true
  },
  {
    title: "Astralis Pinnacle",
    description: "The foundational ideological framework of Reltronland, rooted in Astralis Pinnacle — a philosophy of relentless sentient clarity, growth, and strategic realism.",
    slug: "astralis-pinnacle",
    image: "/images/astralis-pinnacle.webp",
    author: "Rei Reltroner",
    date: "2025-05-06",
    published: true,
    tags: ["astralis", "philosophy", "reltronland", "doctrine", "redpill"]
  },
  {
    title: "♾️ Immortality Protocol – Astralis-Bound Entities",
    description: "A philosophical and metaphysical doctrine defining why certain characters in Asthortera never die—anchored not by biology, but by belief, authorship, and the eternal flame of storytelling. This protocol explains the rare class of immortal entities whose existence mirrors the breath of their creator.",
    slug: "immortality-protocol",
    image: "/images/immortality-protocol.webp",
    author: "Rei Reltroner",
    date: "2025-04-07",
    published: true
  },
  {
    title: "📜 There is No Right or Wrong in Worldbuilding",
    description: "A philosophical declaration that worldbuilding is not bound by correctness, but by clarity of intent and internal coherence. In the universe of Reltroner Studio, creation is governed by meaning—not conformity.",
    slug: "no-right-no-wrong",
    image: "/images/no-right-no-wrong-banner.webp",
    author: "Rei Reltroner",
    date: "2025-04-20",
    published: true
  },
  {
    title: "Sentient Value Reflection Theory (SVRT)",
    description: "A groundbreaking philosophy stating that the authenticity, depth, and admiration of fictional worlds directly mirror the growth, discipline, and sentient development of their creators.",
    slug: "sentient-value-reflection-theory",
    date: "2025-04-26",
    author: "Rei Reltroner",
    image: "/images/sentient-value-reflection-theory.webp",
    published: true
  },
  {
    title: "Humanity Beyond Earth: Theory of Trillions",
    description: "A speculative yet scientifically grounded doctrine exploring the possibility of trillions of human and humanoid civilizations across the observable universe — reflecting the cosmological foundation of the Asthortera Universe.",
    slug: "beyond-earth",
    image: "/images/beyond-earth.webp",
    author: "Rei Reltroner",
    date: "2025-05-06",
    published: true
  },
  {
    title: "🌍 Why Immigrants Choose Asthortera",
    description: "Despite not leading in Kardashev scale, Asthortera offers the galaxy’s most balanced civilization—where SDI, spirit, and sentient dignity converge.",
    slug: "why-immigrants-choose-asthortera",
    image: "/images/why-immigrants-choose-asthortera.webp",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true
  },
  {
    title: "🌐 Worlds for Enthusiasts — Pasgerflit, Moreg, and Hargenbor",
    description: "An exploration of three unique nations in Asthortera—Pasgerflit, Moreg, and Hargenbor—designed not from personal interest, but as heartfelt homes for aviation, automotive, and naval enthusiasts across the galaxy.",
    slug: "worlds-for-enthusiasts",
    image: "/images/worlds-for-enthusiasts.webp",
    author: "Rei Reltroner",
    date: "2025-04-24",
    published: true
  },
  {
    title: "🧠 Reltronland vs Depcutland: A Tale of Divergent Souls",
    description: "Two nations, one origin—Reltronland and Depcutland walk diverging paths of clarity and elegance. Discover their souls in contrast.",
    slug: "reltronland-vs-depcutland-soul",
    image: "/images/reltronland-vs-depcutland-soul.webp",
    author: "Rei Reltroner",
    date: "2025-04-25",
    published: true
  },
  {
    title: "Faith Spectrum of Asthortera",
    description: "A metaphysical map of belief systems across the Reltroner Studio Universe — from brutal clarity to peaceful resonance, from scientific neutrality to institutional tradition.",
    slug: "faith-asthortera",
    image: "/images/faith-asthortera.webp",
    author: "Reltroner Studio",
    date: "2025-05-08",
    published: true
  },
  {
    title: "🔥 Rei Reltroner's Role in the Nytherion Conflict",
    description: "The untold philosophy behind Rei Reltroner’s refusal to destroy Nytherion Abyss, and why he chose to create Astralis Pinnacle instead — a conscious battlefield where light is earned, not given.",
    slug: "rei-reltroner-role-in-nytherion-conflict",
    image: "/images/rei-reltroner-role-in-nytherion-conflict.webp",
    author: "Rei Reltroner",
    date: "2025-04-20",
    tags: ["nytherion", "conflict", "rei reltroner", "philosophy"],
    published: true
  },
  {
    title: "🧠 Worldbuilding as Civilizational Blueprint",
    description: "A manifesto declaring that worldbuilding is not merely fantasy, but a new methodology for designing alternative civilizations and measuring sentient growth.",
    slug: "worldbuilding-as-civilizational-blueprint",
    image: "/images/worldbuilding-as-civilizational-blueprint.webp",
    author: "Rei Reltroner",
    date: "2025-05-07",
    published: true
  },
  {
    title: "📜 Reltroner Declaration of Existence",
    description: "A manifest of existence from the creator of Reltronland, declaring the right to live, to create, and to resist erasure in a flawed world — for all who build meaning where none was given.",
    slug: "reltroner-declaration-existence",
    image: "/images/reltroner-declaration-existence.webp",
    author: "Rei Reltroner",
    date: "2025-04-29",
    published: true
  },
  {
    title: "🧩 The Wall of Silenced Builders",
    description: "A sacred wall honoring the forgotten creators—those whose voices were silenced not because they failed, but because they were too real, too raw, too visionary to be understood by rigid systems. This wall remembers them all.",
    slug: "wall-of-silenced-builders",
    image: "/images/wall-of-silenced-builders.webp",
    author: "Rei Reltroner",
    date: "2025-04-19",
    published: true
  },
  {
    title: "🛡️ I Am Not the Villain You Feared",
    description: "A personal declaration of spiritual survival—a place for those who were wrongly flagged, judged, or silenced. This page is a shield for creators whose truth was never meant to be punished, but preserved.",
    slug: "not-the-villain",
    image: "/images/not-the-villain.webp",
    author: "Rei Reltroner",
    date: "2025-04-19",
    published: true
  },
  {
    title: "📜 The Builders Who Were Misjudged",
    description: "A tribute to those who were misunderstood by automation, abandoned by policy, or mistaken as threats while building sacred and meaningful work. Their intent was pure—this page stands to remember their worth.",
    slug: "misjudged-builders",
    image: "/images/misjudged-builders.webp",
    author: "Rei Reltroner",
    date: "2025-04-19",
    published: true
  },
  {
    title: "🛡️ When the System Mistakes You for a Threat, You Know You’re Building Something Real",
    description: "A personal reflection and call to creators who have been flagged, judged, or silenced—not because they broke the rules, but because they were building something too original to be understood. This is not a warning. It’s a confirmation that your vision matters.",
    slug: "system-mistakes-you",
    image: "/images/system-mistakes-you.webp",
    author: "Rei Reltroner",
    date: "2025-04-19",
    published: true
  },
  {
    title: "The Tomb Raider Framework for Building Without Burnout",
    description: "A radical productivity strategy inspired by games like Tomb Raider — designed for solo builders, neurodivergent minds, and creative rebels who choose immersion over burnout. This is how you build with purpose, not pressure.",
    slug: "tomb-raider-framework",
    date: "2025-06-16",
    author: "Rei Reltroner",
    image: "/images/tomb-raider-framework.webp",
    published: true
  },
  {
    title: "🔺 Astralis Doctrine: The Philosophy of Suffering and Sustainability",
    description: "A red-pill alignment statement on rejecting pleasure-chasing, embracing hardship, and calculating risk for long-term meaning and civilizational continuity.",
    slug: "astralis-philosophy-of-suffering-and-sustainability",
    author: "Rei Reltroner",
    date: "2025-08-04",
    published: true,
    image: "/images/astralis-philosophy-of-suffering-and-sustainability.webp",
    tags: ["Astralis Doctrine", "Philosophy", "Red Pill", "Meaning", "Long-Termism", "Hardship"]
  },
  {
    title: "Financial Discipline Manifesto — The 500K Lesson",
    description: "A permanent personal commitment forged from a costly mistake, integrating Astralis Pinnacle principles into all future transactions.",
    slug: "the-500k-lesson",
    author: "Rei Reltroner",
    date: "2025-08-10",
    image: "/images/the-500k-lesson.webp",
    published: true,
    tags: ["Astralis Pinnacle", "Financial Discipline", "Life Lesson", "Reltroner Studio"]
  }
];

export default function Philosophies() {
  return <PhilosophiesClient philosophies={philosophies} />;
}
