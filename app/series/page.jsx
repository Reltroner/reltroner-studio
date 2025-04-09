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
  }
];

export default function Series() {
  return <SeriesClient series={series} />;
}
