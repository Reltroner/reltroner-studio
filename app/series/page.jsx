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
    image: "/images/the-abyss-of-comfort.png",
    date: "2025-04-04"
  },
  {
    title: "Rei in Abyss",
    description: "A psychological, existential descent into Nytherion Abyss. After losing everything—academic status, identity, and 95% of his assets—Rei awakens in a false paradise of comfort, entertainment, and forgetfulness. But he refuses to stay. A story of quiet revolt, painful truth, and rebuilding from nothing.",
    author: "Rei Reltroner",
    slug: "rei-in-abyss",
    image: "/images/rei-in-abyss.png",
    date: "2025-04-13"
  }

];

export default function Series() {
  return <SeriesClient series={series} />;
}
