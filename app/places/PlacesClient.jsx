'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function PlacesClient({ places }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return places.filter(
      (place) =>
        place.name?.toLowerCase().includes(q) ||
        place.description?.toLowerCase().includes(q) ||
        place.slug?.toLowerCase().includes(q) ||
        place.location?.toLowerCase().includes(q) ||
        place.type?.toLowerCase().includes(q) ||
        place.author?.toLowerCase().includes(q)
    );
  }, [searchQuery, places]);

  return (
    <div className="p-5 bg-slate-100">
      {/* Heading Centered */}
      <div className="text-center mb-6">
        <Heading>Places</Heading>
        <p className="text-sm text-gray-700 font-bold">
          Journey through cities, ruins, and forgotten dimensions — each with their own pulse, memory, and power in the grand chronicle of Asthortera.
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place, index) => (
            <Link href={`/places/${place.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h2>
                  {place.type && (
                    <p className="text-sm font-semibold text-gray-700 italic mb-1">
                      {place.type}
                    </p>
                  )}
                  {place.location && (
                    <p className="text-xs text-gray-500 mb-1">📍 {place.location}</p>
                  )}
                  <p className="text-gray-600 flex-grow">{place.description}</p>
                  {place.quote && (
                    <p className="italic text-xs text-gray-500 mt-2">“{place.quote}”</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No places found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
