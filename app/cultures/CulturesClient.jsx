'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function CulturesClient({ cultures }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCultures = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return cultures.filter(
      (culture) =>
        culture.title.toLowerCase().includes(q) ||
        culture.description.toLowerCase().includes(q) ||
        culture.slug.toLowerCase().includes(q) ||
        (culture.author && culture.author.toLowerCase().includes(q))
    );
  }, [searchQuery, cultures]);

  return (
    <div className="p-5 bg-slate-100">
        {/* Heading + Description Centered */}
      <div className="text-center mb-6">
        <Heading>Cultures</Heading>
        <p className="text-sm text-gray-700 font-bold">
          Dive into the ethos and daily rituals of Asthortera — where identity, behavior, and belief systems converge into legacies that define civilizations.
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

      {/* Culture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCultures.length > 0 ? (
          filteredCultures.map((culture, index) => (
            <Link href={`/cultures/${culture.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={culture.image}
                  alt={culture.title}
                  className="w-full max-h-[400px] object-contain mx-auto px-4"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {culture.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{culture.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {culture.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No culture documents found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
