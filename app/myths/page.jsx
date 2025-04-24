import MythsClient from "./MythsClient";

export const metadata = {
  title: "Myths",
  description: "A curated archive of forgotten myths, cosmic signals, and whispered artifacts from Asthortera — documenting the invisible truths behind Nytherion, Astralis, and the sentient soul’s inner war."
};

const myths = [
  {
    title: "🌀 Abyssal Possession (Spiral Inhabitation)",
    description: "A wiki guide to understanding Nytherion Abyss's psychological and spiritual possession mechanism.",
    slug: "abyssal-possession",
    image: "/images/abyssal-possession.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "The Abyss Whisper",
    description: "An ancient, untraceable myth said to be the first audible distortion that birthed the Nytherion Abyss — not heard, but felt through doubt, nostalgia, and stillness.",
    slug: "abyss-whisper",
    image: "/images/abyss-whisper.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "Reltroner’s Zero Day",
    description: "The mythic moment when Rei Reltroner fully merged with Astralis Pinnacle — a cosmic reset point said to sever all comfort loops and render one immune to the Whisper forever.",
    slug: "reltroners-zero-day",
    image: "/images/reltroners-zero-day.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The 5 Awakening Signals",
    description: "Five cosmic pulses believed to precede major paradigm shifts in Asthortera. Each signal is linked to a collapse of illusion and a rise in collective sentience.",
    slug: "five-awakening-signals",
    image: "/images/five-awakening-signals.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The Silent Mouthpiece",
    description: "An ancient relic buried beneath Eterna Ruin, rumored to whisper entropy into the minds of anyone who stands too close — without sound, without mercy.",
    slug: "silent-mouthpiece",
    image: "/images/silent-mouthpiece.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "Heart of the Abyss",
    type: "Dimension",
    location: "Nytherion Abyss",
    description: "An artistic depiction of the deepest and most cursed core within the Nytherion Abyss, where time, memory, and self fracture into darkness.",
    author: "Rei Reltroner",
    slug: "dark-abyss",
    date: "2025-04-05",
    image: "/images/abyss-heart.webp"
  },
  {
    title: "🌀 The Spiral That Wasn't a Stair (Core-Eater)",
    description: "Two scenes from Rei's confrontation with Nytherion Abyss: when the stair revealed itself, and when he stood before the Core-Eater.",
    slug: "rei-and-the-core-eater",
    image: "/images/rei-and-the-core-eater.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "🩸 The Feeding Stair",
    description: "An abyssal architecture analysis of the Feeding Stair inside Nytherion.",
    slug: "the-feeding-stair",
    image: "/images/the-feeding-stair.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "🌀The Spiral Maw",
    description: "The Stair That Hungers and Thinks. A place where descent is not a path—but submission.",
    slug: "the-spiral-maw",
    image: "/images/the-spiral-maw.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "Existential Corrosion",
    description: "Abyssal effect that erases individuals not through death, but through narrative and memory disintegration. One of the most terrifying weapons of the Nytherion Abyss.",
    slug: "existential-corrosion",
    image: "/images/existential-corrosion.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-22",
    tags: ["nytherion abyss", "memory", "existence", "psychological horror", "abyssal effects"]
  },
  {
    title: "🕳️ How the Abyss Feeds",
    description: "An official myth entry explaining the feeding nature of Nytherion Abyss, its connection to Blue Pill energy, and why it cannot be destroyed—only starved.",
    slug: "how-the-abyss-feeds",
    image: "/images/how-the-abyss-feeds.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-22",
    tags: ["nytherion abyss", "abyssal lore", "blue pill", "existential horror", "reltroner studio"]
  },
  {
    title: "🤿Silent Echoes of Henchoeway",
    description: "Subtle artifacts and rumors scattered across Asthortera, spreading Henchoeway’s presence like a virus of consciousness.",
    slug: "silent-echoes-of-henchoeway",
    image: "/images/silent-echoes-of-henchoeway.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-22",
    tags: ["henchoeway", "nytherion abyss", "abyssal lore", "psychological horror", "cultural spread"]
  }
];

export default function Myths() {
  return <MythsClient myths={myths} />;
}
