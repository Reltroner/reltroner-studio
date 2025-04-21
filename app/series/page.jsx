import SeriesClient from "./SeriesClient";

export const metadata = {
  title: "Series",
  description: "Unravel the character-driven sagas across multiple timelines — where political tension, cosmic mysteries, and inner wars shape Asthortera’s fate."
};

const series = [
  {
    title: "The Abyss of Comfort",
    description: "A spiritual saga where illusion shatters, comfort crumbles, and awakening begins. This is the core identity of Nytherion Abyss, and the flagship series of Reltroner Studio.",
    author: "Rei Reltroner",
    slug: "the-abyss-of-comfort",
    image: "/images/the-abyss-of-comfort.webp",
    date: "2025-04-04"
  },
  {
    title: "Rei in Abyss",
    description: "A psychological, existential descent into Nytherion Abyss. After losing everything—academic status, identity, and 95% of his assets—Rei awakens in a false paradise of comfort, entertainment, and forgetfulness. But he refuses to stay. A story of quiet revolt, painful truth, and rebuilding from nothing.",
    author: "Rei Reltroner",
    slug: "rei-in-abyss",
    image: "/images/rei-in-abyss.webp",
    date: "2025-04-13"
  },
  {
    title: "Reltronland ComicBall Wiki",
    description: "The official wiki hub for the bureaucratic satire of Reltronball and Depcutball—where castella meets cravat, and diplomacy is illustrated with wit and charm.",
    slug: "comicball",
    image: "/images/comicball.webp",
    author: "Reltroner Studio",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Asthortera Novel Series Roadmap",
    description: "Explore the complete timeline and narrative structure of the Asthortera universe. Each novel represents a unique POV arc that weaves into the grand tapestry of the Reltroner Saga.",
    slug: "series-roadmap",
    image: "/images/series-roadmap.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025",
  },

];

export default function Series() {
  return <SeriesClient series={series} />;
}
