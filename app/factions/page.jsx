import FactionsClient from "./FactionsClient";

export const metadata = {
  title: "Factions",
  description: "Discover the major ideological factions that shape the destiny of Asthortera — from cyber-meritocratic nations to shadow organizations and metaphysical cults."
};

const factions = [
  {
    title: "Reltronland",
    description: "The ideological embodiment of Astralis Pinnacle — a disciplined superpower built on meritocracy, sentient development, and the rejection of illusion.",
    slug: "reltronland",
    image: "/images/reltronland-cover.png",
    author: "Rei Reltroner",
    date: "2025-04-10"
  },
  {
    title: "Depcutland",
    description: "An elegant and reflective Tier 1 civilization in Asthortera, Depcutland embodies philosophical refinement, archival meritocracy, and cultural diplomacy. It preserves the soul of civilization while mentoring the world in aesthetics, ethics, and memory.",
    slug: "depcutland",
    image: "/images/depcutland.png",
    author: "Rei Reltroner",
    date: "2025-04-10"
  },
  {
    title: "Fractal Civilizations of Asthortera: Strategic Identity Map",
    description: "An in-depth ideological overview of the four major forces shaping Asthortera: Reltronland, Depcutland, Henchoeway, and Depeisit—each reflecting a distinct philosophy of civilization, consciousness, and collapse.",
    slug: "fractal-civilizations",
    image: "/images/fractal-civilizations.png",
    author: "Rei Reltroner",
    date: "2025-04-13"
  },
  {
    title: "Reltronland & Depcutland: The Pillars Who Embrace the International Family",
    description: "A worldbuilding document highlighting how Reltronland and Depcutland, as Tier 1 civilizations, actively collaborate with Tier 2 nations across Asthortera, forming a planetary family built on unity, diplomacy, and conscious growth.",
    slug: "international-family",
    image: "/images/international-family.png",
    author: "Rei Reltroner",
    date: "2025-04-13"
  },
  {
    title: "Reltronland vs Depcutland: The Twin Pillars of Conscious Civilization",
    description: "A philosophical comparison between Reltronland and Depcutland—two ideological giants shaped by meritocracy and elegance, clarity and contemplation, as the twin forces that uphold Asthortera’s sentient evolution.",
    slug: "reltronland-vs-depcutland",
    image: "/images/reltronland-vs-depcutland.png",
    author: "Rei Reltroner",
    date: "2025-04-13"
  }
  
  // {
  //   title: "Depcutland",
  //   description: "The ideological embodiment of Depcut Pinnacle — a disciplined superpower built on meritocracy, sentient development, and the rejection of illusion.",
  //   slug: "depcutland",
  //   image: "/images/depcutland-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // }
  // {
  //   title: "Henchoeway",
  //   description: "A manipulative organization that seeks to control minds and systems through illusion, stagnation, and psychological warfare. The brain behind the abyss.",
  //   slug: "henchoeway",
  //   image: "/images/henchoeway-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // },
  // {
  //   title: "Nytherion Cult",
  //   description: "A secretive spiritual order worshipping the power of comfort, fear, and emotional paralysis. Their belief: peace exists only in stillness — even if it means death of progress.",
  //   slug: "nytherion-cult",
  //   image: "/images/nytherion-cult-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // },
  // {
  //   title: "Astralis Vanguard",
  //   description: "The elite force of awakened minds who guard the path to Astralis Pinnacle. Trained to endure truth, lead with clarity, and resist every form of manipulation.",
  //   slug: "astralis-vanguard",
  //   image: "/images/astralis-vanguard-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // }
];


export default function Factions() {
  return <FactionsClient factions={factions} />;
}
