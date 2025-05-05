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
      image: "/images/rest-culture.webp"
  },
  {
      title: "The Cuteness Manifesto: Softness Within Strength",
      description: "Cuteness isn’t a trend. It’s a weapon. Reltroner Studio shows how softness becomes strategy in a world built on mental warfare.",
      slug: "cuteness-manifesto",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/cuteness-manifesto.webp"
  },
  {
      title: "Children of Asthortera",
      description: "An exploration of the sentient, curious, and emotionally resilient children in the world of Asthortera.",
      slug: "children-of-asthortera",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/children-of-asthortera.webp"
  },
  {
    title: "Children of Reltronland: A Trust-Based Society",
    description: "From birth to independence, children in Reltronland grow through empathy, curiosity, and civic trust—reshaping the meaning of growing up.",
    slug: "children-reltronland",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/children-reltronland.webp"
  },
  {
    title: "🧳 Returning to Serve: Why Citizens of Reltronland Work Where They Were Once Raised",
    description: "In Reltronland, many adults choose to work at the very stations, terminals, and public spaces that raised them—honoring the places that once gave them clarity, comfort, and trust.",
    slug: "returning-to-serve-reltronland",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/returning-to-serve-reltronland.webp"
  },
  {
    title: "Culture Note: Masks and Mobility in Reltronland",
    description: "An overview of why mask-wearing remains prevalent in Reltronland despite the absence of a health crisis.",
    slug: "mask-reltronland",
    image: "/images/mask-reltronland.webp",
    author: "Rei Reltroner",
    date: "2025-04-04",
  },
  {
    title: "Fashion Culture Manual of Asthortera",
    description: "A comprehensive guide to the visual philosophy, national dress codes, and cultural fusion attire of Reltronland and Depcutland—two supercivilizations united by elegance, discipline, and interplanetary dignity.",
    slug: "fashion-culture",
    image: "/images/fashion-culture.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Major Cultural Exports — Reltronland vs Depcutland",
    description: "An in-depth look at the top cultural exports from Reltronland and Depcutland, showcasing how fashion, literature, music, and architecture shape their global influence across Asthortera.",
    slug: "cultural-exports",
    image: "/images/cultural-exports.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Reltronland",
    description: "Explore how retro jazz, lo-fi instrumentals, and ambient elegance form the rhythmic soul of Reltronland’s white-collar civilization.",
    slug: "reltronland-music",
    image: "/images/reltronland-music.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Depcutland",
    description: "Dive into the solemn grandeur of Depcutland's classical music culture—where orchestral rituals, philosophical soundscapes, and aesthetic discipline echo through marble halls.",
    slug: "depcutland-music",
    image: "/images/depcutland-music.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Aurora Faith of Aurastelia",
    description: "The spiritual foundation of Aurastelia led by Queen Valethra — a radiant path of inner peace, balance, and silent enlightenment.",
    slug: "aurora-faith",
    author: "Rei Reltroner",
    date: "2025-04-14",
    image: "/images/aurora-faith.webp"
  },
  {
    title: "Top 5 Clichés Destroyed by the Gender Friendship Manifesto",
    description: "A deconstruction of outdated tropes by Asthortera’s mature philosophy of sentient connection.",
    slug: "anti-klise-gender-friendship",
    author: "Reltroner Studio",
    date: "2025-04-16",
    image: "/images/anti-klise-gender-friendship.webp"
  },
  {
    title: "Gender Friendship Manifesto of Asthortera",
    description: "A cultural doctrine that redefines friendship across genders without stigma, cringe, or romantic overtones.",
    slug: "gender-friendship-manifesto",
    author: "Reltroner Studio",
    date: "2025-04-16",
    published: true,
    image: "/images/gender-friendship-manifesto.webp"
  },
  {
    title: "📜 Reltronland Meeting Manifesto",
    description: "Discover how Reltronland redefines meetings with a culture of pure efficiency, no excessive formalities, and true meritocracy — a new global standard for collaboration.",
    slug: "meeting-reltronland",
    author: "Reltroner Studio",
    date: "2025-04-16",
    published: true,
    image: "/images/meeting-reltronland.webp"
  }  

];

export default function Cultures() {
  return <CulturesClient cultures={cultures} />;
}
