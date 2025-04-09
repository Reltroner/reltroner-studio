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
  // Tambahkan lebih banyak event di masa depan...
];

export default function Events() {
  return <EventsClient events={events} />;
}
