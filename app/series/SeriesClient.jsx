'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function SeriesClient({ series }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSeries = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return series.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.slug?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q)
    );
  }, [searchQuery, series]);

  return (
    <div className="p-5 bg-slate-100">

      {/* Heading + Description Centered */}
      <div className="text-center mb-6">
        <Heading>Series</Heading>
        <p className="text-sm text-gray-700 font-bold">
          Unravel the character-driven sagas across multiple timelines — where political tension, cosmic mysteries, and inner wars shape Asthortera’s fate.
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
        {filteredSeries.length > 0 ? (
          filteredSeries.map((serie, index) => (
            <Link href={`/series/${serie.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={serie.image}
                  alt={serie.title}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {serie.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{serie.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {serie.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No series found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
