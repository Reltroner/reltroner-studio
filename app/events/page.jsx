import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Events",
  description: "Explore the events of Asthortera — complex, layered, and deeply intertwined with the fate of Astralis."
};

export default function Events() {
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
    
    
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Events</Heading>
      <p className="mb-4 text-center font-bold">A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world’s creative, economic, and ideological future.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <Link href={`/events/${event.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={event.image}
                alt={`${event.title}, ${event.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{event.role}</p>
                <p className="text-gray-600 flex-grow">{event.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
