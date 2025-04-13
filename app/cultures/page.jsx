import CulturesClient from "./CulturesClient";

export const metadata = {
  title: "Cultures",
  description: "Dive into the ethos and daily rituals of Asthortera — where identity, behavior, and belief systems converge into legacies that define civilizations."
};

const cultures = [
  {
      title: "Sacred Rest Policy",
      description: "Reltroner Studio's official stance on intentional rest as a pathway to deeper creativity and sustained mental strength.",
      slug: "rest-culture",
      author: "Rei Reltroner",
      date: "2025-04-05",
      published: true,
      image: "/images/rest-culture.png"
  },
  {
      title: "The Cuteness Manifesto: Softness Within Strength",
      description: "Cuteness isn’t a trend. It’s a weapon. Reltroner Studio shows how softness becomes strategy in a world built on mental warfare.",
      slug: "cuteness-manifesto",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/cuteness-manifesto.png"
  },
  {
      title: "Children of Asthortera",
      description: "An exploration of the sentient, curious, and emotionally resilient children in the world of Asthortera.",
      slug: "children-of-asthortera",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/children-of-asthortera.png"
  },
  {
    title: "Culture Note: Masks and Mobility in Reltronland",
    description: "An overview of why mask-wearing remains prevalent in Reltronland despite the absence of a health crisis.",
    slug: "mask-reltronland",
    image: "/images/mask-reltronland.png",
    author: "Rei Reltroner",
    date: "2025-04-04",
  },
  {
    title: "Fashion Culture Manual of Asthortera",
    description: "A comprehensive guide to the visual philosophy, national dress codes, and cultural fusion attire of Reltronland and Depcutland—two supercivilizations united by elegance, discipline, and interplanetary dignity.",
    slug: "fashion-culture",
    image: "/images/fashion-culture.png",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Major Cultural Exports — Reltronland vs Depcutland",
    description: "An in-depth look at the top cultural exports from Reltronland and Depcutland, showcasing how fashion, literature, music, and architecture shape their global influence across Asthortera.",
    slug: "cultural-exports",
    image: "/images/cultural-exports.png",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Reltronland",
    description: "Explore how retro jazz, lo-fi instrumentals, and ambient elegance form the rhythmic soul of Reltronland’s white-collar civilization.",
    slug: "reltronland-music",
    image: "/images/reltronland-music.png",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Depcutland",
    description: "Dive into the solemn grandeur of Depcutland's classical music culture—where orchestral rituals, philosophical soundscapes, and aesthetic discipline echo through marble halls.",
    slug: "depcutland-music",
    image: "/images/depcutland-music.png",
    author: "Rei Reltroner",
    date: "2025-04-13",
  }
  
  

];

export default function Cultures() {
  return <CulturesClient cultures={cultures} />;
}
