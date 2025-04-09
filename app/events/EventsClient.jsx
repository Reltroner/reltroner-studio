'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function EventsClient({ events }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.slug.toLowerCase().includes(q) ||
        (event.author && event.author.toLowerCase().includes(q))
    );
  }, [searchQuery, events]);

  return (
    <div className="p-5 bg-slate-100">
      {/* Heading + Deskripsi */}
      <div className="text-center mb-6">
        <Heading>Events</Heading>
        <p className="text-sm text-gray-700 font-bold">
          A living archive of world-shaping phenomena in Asthortera — from revolutions in spiritual philosophy to technological uprisings, and from interdimensional conflicts to peaceful cultural summits. Every event listed here plays a key role in forging the soul and future of the Reltroner Saga.
        </p>
      </div>
      {/* Search Box */}
      <div className="flex items-center gap-x-2 mb-6">
        <label htmlFor="search" className="font-semibold text-gray-700">
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Type a keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Link href={`/events/${event.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{event.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {event.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No events found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
