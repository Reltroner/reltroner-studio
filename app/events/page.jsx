import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events",
  description: "A living archive of world-shaping phenomena in Asthortera — from revolutions in spiritual philosophy to technological uprisings, and from interdimensional conflicts to peaceful cultural summits. Every event listed here plays a key role in forging the soul and future of the Reltroner Saga."
};

const events = [
  {
    title: "Asthortera Novel Series Roadmap",
    description: "Explore the complete timeline and narrative structure of the Asthortera universe. Each novel represents a unique POV arc that weaves into the grand tapestry of the Reltroner Saga.",
    slug: "series-roadmap",
    image: "/images/series-roadmap.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025",
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
    title: "Origins of Reltronland",
    description: "The origin story of Reltronland—from Rathroper's soil to a nation of conscious design and meritocratic spirit.",
    slug: "reltronland-founding",
    image: "/images/reltronland-founding.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11"
  },
  {
    title: "The True Purpose Behind Depcutland’s Founding",
    description: "Uncover the hidden motivations and long-game strategy behind Depcutland’s creation—how a former Depeisit elite established a cultural buffer to preserve legacy, counter Reltronland, and shape the future through subtlety.",
    slug: "depcutland-founding",
    image: "/images/depcutland-founding.png",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "When Raina Read The Letter",
    description: "The moment Raina discovered Rei’s true origin beyond Asthortera—and understood the pain he never put into words.",
    slug: "when-raina-read-the-letter",
    image: "/images/when-raina-read-the-letter.png",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  }
  // Tambahkan lebih banyak event di masa depan...
];

export default function Events() {
  return <EventsClient events={events} />;
}
