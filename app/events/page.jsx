import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events",
  description: "A living archive of world-shaping phenomena in Asthortera — from revolutions in spiritual philosophy to technological uprisings, and from interdimensional conflicts to peaceful cultural summits. Every event listed here plays a key role in forging the soul and future of the Reltroner Saga."
};

const events = [
  {
    title: "Rei in Abyss: Spiral Memory",
    description:"Trapped within a decaying spiral of lost thoughts and broken geometry, Rei awakens in Sector D—where time loops, mirrors lie, and illusions rot. Inspired by unsettling childhood memories and surreal echoes of comfort, this chapter explores the moment Rei confronts the first layer of Nytherion Abyss and begins to remember what the world tried to erase.",
    slug: "rei-in-abyss-spiral-memory",
    author: "Rei Reltroner",
    date: "2025-04-19",
    image: "/images/abyss-d.webp",
    published: true
  },
  {
    title: "Scout Parade in Evercotage",
    description: "Highlight of the grand Scout Parade in Evercotage, the capital of Stelpadland.",
    slug: "scoutparade",
    image: "/images/scout-parade.webp",
    author: "Raidan",
    date: "March 16, 2025"
  },
  {
    title: "Origins of Reltronland",
    description: "The origin story of Reltronland—from Rathroper's soil to a nation of conscious design and meritocratic spirit.",
    slug: "reltronland-founding",
    image: "/images/reltronland-founding.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The True Purpose Behind Depcutland’s Founding",
    description: "Uncover the hidden motivations and long-game strategy behind Depcutland’s creation—how a former Depeisit elite established a cultural buffer to preserve legacy, counter Reltronland, and shape the future through subtlety.",
    slug: "depcutland-founding",
    image: "/images/depcutland-founding.webp",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "When Raina Read The Letter",
    description: "The moment Raina discovered Rei’s true origin beyond Asthortera—and understood the pain he never put into words.",
    slug: "when-raina-read-the-letter",
    image: "/images/when-raina-read-the-letter.webp",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  },
  {
    title: "🌍 Rei Shows Earth to Raina",
    description: "In a quiet moment in Reltralia, Rei shows Raina the harsh realities of Earth—his birthplace. As footage of Indonesia plays, truths are unveiled: cycles of survival, suppressed dreams, and the roots of Reltronland's order. This is not just a memory—it’s the reason Reltronland was born. A story of pain transformed into purpose.",
    slug: "rei-shows-earth",
    image: "/images/rei-shows-earth.webp",
    author: "Rei Reltroner",
    date: "2025-04-18",
    published: true
  },
  {
    title: "Reltroner: The Boy Who Dropped Out to Build a Civilization",
    description: "From failure to foundation. How dropping out became the first brick of Astralis Pinnacle and the birth of Reltroner Studio.",
    slug: "reltroner-dropout-manifesto",
    image: "/images/reltroner-dropout-manifesto.webp",
    author: "Reltroner Studio",
    date: "2025-04-22",
    published: true,
    tags: ["manifesto", "reltroner studio", "astralis", "dropout", "philosophy"]
  },
  {
    title: "🕳️ The First Unraveling",
    description: "The earliest known recorded incident of Nytherion Abyss breaching the fabric of Asthortera's reality. A silent horror that erased a person from existence.",
    slug: "the-first-unraveling",
    image: "/images/the-first-unraveling.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
    published: true,
    tags: ["nytherion abyss", "the abyss of comfort", "opening scene", "existential horror"]
  },
  {
    title: "🔥 Final Awakening",
    description: "The climactic moment in Rei in Abyss where Rei rejects all illusions of comfort and ignites Astralis energy from within. The first known spiritual breakaway from the Nytherion Abyss.",
    slug: "final-awakening",
    image: "/images/final-awakening.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
    published: true,
    tags: ["rei reltroner", "rei in abyss", "nytherion abyss", "astralis pinnacle", "scene"]
  },
  {
    title: "🕳 Entering the Core-Eater",
    description: "As the team descends into the deepest layer of Nytherion Abyss, they approach the entity known only in whispers: the Core-Eater. A place where nothing survives—not even the idea of escape.",
    slug: "entering-the-core-eater",
    image: "/images/entering-the-core-eater.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
    published: true,
    tags: ["nytherion abyss", "the abyss of comfort", "core-eater", "delwyn harper", "scene"]
  },
  {
    title: "🩸 Confronting Kamila",
    description: "At the edge of the Heart of the Abyss, Delwyn Harper and his team come face-to-face with Kamila Alena, the human embodiment of Nytherion's comfort-based annihilation.",
    slug: "confronting-kamila",
    image: "/images/confronting-kamila.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
    published: true,
    tags: ["kamila alena", "nytherion abyss", "the abyss of comfort", "scene", "delwyn harper"]
  }
  // Tambahkan lebih banyak event di masa depan...
];

export default function Events() {
  return <EventsClient events={events} />;
}
