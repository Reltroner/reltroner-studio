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
    title: "🗓️ Timeline: History of Asthortera, Reltronland, and Depcutland",
    description: "A curated historical overview of Asthortera’s civilizations, chronicling the rise of Reltronland and Depcutland—two superpowers born from divergence, vision, and conflict.",
    slug: "history-timeline",
    author: "Rei Reltroner",
    date: "2025-04-23",
    image: "/images/history-timeline.webp",
    tags: ["timeline", "asthortera", "reltronland", "depcutland", "history"],
    published: true
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
    title: "Declaration of War Victory",
    description: "The pivotal moment that defined Reltronland's ascendancy and Depcutland's transformation. This article chronicles the aftermath of the Great Declaration War, highlighting the victories, struggles, and evolving destinies of two divergent nations.",
    slug: "declaration-war-victory",
    image: "/images/declaration-war-victory.webp",
    author: "Rei Reltroner",
    date: "2025-04-22",
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
    title: "📖 The Day I Remembered Why I Built This World",
    description: "A personal reflection from the founder of Reltroner Studio on the emotional bond, clarity, and truth behind the creation of Reltronland.",
    slug: "the-day-i-remembered",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/the-day-i-remembered.webp"
  },
  {
    title: "🌌 Why Asthortera's Sky Is Often Moonless: A Reflection on Space, Time, and Trust",
    description: "In a world with 12 moons, why are so many skies moonless? This page explores the intentional absence of celestial bodies as a symbolic and scientific reality within the lore of Asthortera.",
    slug: "asthortera-moonless-sky",
    date: "2025-05-05",
    author: "Rei Reltroner",
    published: true,
    image: "/images/asthortera-moonless-sky.webp"
  },
  {
    title: "Origins of Aurastelia and Astrostelia",
    description: "The early divergence of two celestial nations—Aurastelia and Astrostelia—whose roots trace back to cosmic migrations and the eternal tension between spiritual resonance and scientific pursuit.",
    slug: "aurastelia-astrostelia",
    date: "2025-05-08",
    author: "Reltroner Studio Archives",
    published: true,
    image: "/images/aurastelia-astrostelia.webp"
  },
  {
    title: "Root of Reltroner",
    description: "The existential and emotional origin of Reltroner — a nation born not from triumph, but from collapse, solitude, and obsessive observation.",
    slug: "root-of-reltroner",
    author: "Rei Reltroner",
    date: "2025-05-11",
    published: true,
    image: "/images/root-of-reltroner.webp"
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
    title: "Scout Parade in Evercotage",
    description: "Highlight of the grand Scout Parade in Evercotage, the capital of Stelpadland.",
    slug: "scoutparade",
    image: "/images/scout-parade.webp",
    author: "Raidan",
    date: "March 16, 2025"
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
  },
  {
    title: "🎖️ The Crimson Hour of Vanyathra",
    description: "A ground combat mission between RSC forces and Abyssborn entities in the outer ruins of collapsed Vanyathra. Year 138 AC.",
    slug: "vanyathra-ground-war",
    author: "Rei Reltroner",
    date: "2025-05-07",
    published: true,
    image: "/images/vanyathra-ground-war.webp"
  },
  {
    title: "The Final Conversation: Kamila Alena x Rei Reltroner Before Exit",
    description: "A secret memory buried in the Abyss—the last words exchanged between Kamila and Rei before Astralis Pinnacle was born.",
    slug: "kamila-x-rei-before-exit",
    date: "2025-05-19",
    author: "Rei Reltroner",
    image: "/images/kamila-x-rei-before-exit.webp",
    published: true
  },
  {
    title: "Reflections in Drawcia – A Post-Pinnacle Dialogue",
    description: "A private conversation between Rei and Kamila after the birth of Astralis Pinnacle, revisiting Drawcia and the memory of fear.",
    slug: "reflections-in-drawcia",
    date: "2025-05-19",
    author: "Reltroner Studio Archive",
    image: "/images/reflections-in-drawcia.webp",
    published: true
  },
  {
    title: "🌍 World Population Day 2025: Reltronland Edition",
    description: "A historic celebration held in Reltralia, the capital of Reltronland, commemorating World Population Day 2025 with a futuristic vision of population, productivity, and red pill consciousness.",
    slug: "world-population-day-reltronland",
    author: "Rei Reltroner",
    date: "2025-07-11",
    image: "/images/world-population-day-reltronland.webp",
    tags: ["Reltronland", "Civilization Framework", "Red Pill Doctrine", "SDI", "Alternative Governance"],
    published: true
  }
  // Tambahkan lebih banyak event di masa depan...
];

export default function Events() {
  return <EventsClient events={events} />;
}
