import HomeClient from "./HomeClient";

export const metadata = {
  title: "Home",
  description: "Welcome to the home page about world-building!"
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
    title: "Reltroner Sparkpad",
    description: "A futuristic personal branding toolkit designed for Gen Z & Alpha to build powerful digital identities through portfolio builders, AI content assistants, and growth trackers.",
    slug: "reltroner-sparkpad",
    image: "/images/reltroner-sparkpad.webp"
  },
  {
    title: "Gen z & Alpha Market Potential",
    description: "Strategic insight and business directions for capturing the minds and markets of Gen Z and Gen Alpha, focused on clarity, identity, and digital sanctuary.",
    slug: "gen-z-alpha-market-potential",
    image: "/images/gen-z-alpha-market-potential.webp"
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
