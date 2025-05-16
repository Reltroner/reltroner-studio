// app/page.jsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Reltroner Studio",
  description: "Reltroner Studio is a digital agency specializing in web development and the creative sanctuary of the fictional universe Asthortera — a world of clarity, meritocracy, and visionary storytelling.",
  keywords: "Reltroner Studio, Asthortera, web development agency, worldbuilding, Rei Reltroner, creative universe, meritocracy, red pill world, futuristic storytelling",
};

const posts = [
  {
    title: "World Building Basics",
    description: "Exploring the fundamentals of world-building for creative writing.",
    slug: "worldbuilding",
    image: "/images/WorldBuilding.webp"
  },
  {
    title: "Magic System: Astralis vs Nytherion",
    description: "Explore the core metaphysical conflict between creation and illusion in Asthortera.",
    slug: "magic-system",
    image: "/images/magic-astralis-nytherion.webp",
  },
  {
    title: "Public Identity Declaration of Rei Reltroner",
    description: "The official declaration of Rei Reltroner's real-world identity and spiritual alignment with the Asthortera world-building.",
    slug: "rei-reltroner-identity",
    author: "Rei Reltroner (Raidan)",
    date: "2025-04-06",
    published: true,
    image: "/images/rei-idcard.webp"
  },
  {
    title: "Creative Lore Bible",
    description: "The ideological framework and worldbuilding foundation of Reltroner Studio — where illusion meets clarity, and fiction becomes a manifesto.",
    slug: "creative-lore-bible",
    image: "/images/creative-lore-bible.webp",
    author: "Reltroner Studio",
    date: "March 28, 2025"
  },
  {
    title: "Grandmaster Lorebook of Asthortera — Collector’s Compendium",
    description: "An integrated and immersive worldbuilding codex of Asthortera, its civilizations, dimensions, conflicts, and characters — from Spiral to Astralis.",
    slug: "lorebook-asthortera",
    image: "/images/lorebook-asthortera.webp",
    author: "Reltroner Studio",
    published: true,
    date: "March 29, 2025"
  },
  {
    title: "For Recruiters & Collaborators – Notion CV",
    description: "Notion-style version of my professional profile and collaboration vision.",
    slug: "reltroner-cv",
    date: "2025-04-18",
    published: true,
    image: "/images/reltroner-cv-banner.webp"
  },
  {
    title: "Asthortera Glossary",
    description: "Official glossary of protected terms, rituals, and narrative systems in the Asthortera Universe by Reltroner Studio.",
    slug: "asthortera-glossary",
    date: "2025-05-16",
    author: "Rei Reltroner",
    published: true,
    image: "/images/asthortera-glossary.webp"
  },
  {
    title: "Cultures & Civilizations",
    description: "Building realistic cultures and societies for your world.",
    slug: "cultures-civilizations",
    image: "/images/culciv.webp"
  },
  {
    title: "Politics",
    description: "Understanding political systems and power dynamics in your world.",
    slug: "politics",
    image: "/images/politics.webp"
  },
  {
    title: "Locations/Geography",
    description: "Designing immersive landscapes and geographic features.",
    slug: "locations",
    image: "/images/locations.webp"
  },
  {
    title: "Events",
    description: "Creating impactful historical and future events for your world.",
    slug: "events",
    image: "/images/events.webp"
  },
  {
    title: "Legacy of Reltroner",
    description: "A comprehensive overview of the Reltroner legacy, its impact on world-building, and its future directions.",
    slug: "legacy",
    date: "2025-04-18",
    image: "/images/legacy.webp",
    published: true
  }
  
];

export default function Home() {
  return <HomeClient posts={posts} />;
}
