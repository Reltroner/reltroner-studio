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
    image: "/images/abyssal-possession.png",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "The Abyss Whisper",
    description: "An ancient, untraceable myth said to be the first audible distortion that birthed the Nytherion Abyss — not heard, but felt through doubt, nostalgia, and stillness.",
    slug: "abyss-whisper",
    image: "/images/abyss-whisper.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "Reltroner’s Zero Day",
    description: "The mythic moment when Rei Reltroner fully merged with Astralis Pinnacle — a cosmic reset point said to sever all comfort loops and render one immune to the Whisper forever.",
    slug: "reltroners-zero-day",
    image: "/images/reltroners-zero-day.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The 5 Awakening Signals",
    description: "Five cosmic pulses believed to precede major paradigm shifts in Asthortera. Each signal is linked to a collapse of illusion and a rise in collective sentience.",
    slug: "five-awakening-signals",
    image: "/images/five-awakening-signals.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The Silent Mouthpiece",
    description: "An ancient relic buried beneath Eterna Ruin, rumored to whisper entropy into the minds of anyone who stands too close — without sound, without mercy.",
    slug: "silent-mouthpiece",
    image: "/images/silent-mouthpiece.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "🌀 The Spiral That Wasn't a Stair",
    description: "Two scenes from Rei's confrontation with Nytherion Abyss: when the stair revealed itself, and when he stood before the Core-Eater.",
    slug: "rei-and-the-core-eater",
    image: "/images/rei-and-the-core-eater.png",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "🩸 The Feeding Stair",
    description: "A mobile-friendly abyssal architecture analysis of the Feeding Stair inside Nytherion.",
    slug: "the-feeding-stair",
    image: "/images/the-feeding-stair.png",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  },
  {
    title: "The Spiral Maw",
    description: "The Stair That Hungers and Thinks. A place where descent is not a path—but submission.",
    slug: "the-spiral-maw",
    image: "/images/the-spiral-maw.png",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-20"
  }
];

export default function Myths() {
  return <MythsClient myths={myths} />;
}
