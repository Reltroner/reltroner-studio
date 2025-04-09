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
  }

];

export default function Cultures() {
  return <CulturesClient cultures={cultures} />;
}
