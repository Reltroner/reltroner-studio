'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function StatisticsClient({ statistics }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStatistics = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return statistics.filter(
      (stat) =>
        stat.title?.toLowerCase().includes(q) ||
        stat.description?.toLowerCase().includes(q) ||
        stat.slug?.toLowerCase().includes(q) ||
        stat.author?.toLowerCase().includes(q)
    );
  }, [searchQuery, statistics]);

  return (
    <div className="p-5 bg-slate-100">

      {/* Heading Centered */}
      <div className="text-center mb-6">
        <Heading>Statistics</Heading>
        <p className="text-sm text-gray-700 font-bold">
          Decode the raw numbers behind the world — from population structures to SDI indicators — and understand what truly drives Asthortera beneath the surface.
        </p>
      </div>
      {/* Search Box */}
      <div className="flex items-center gap-x-2 mb-6 sticky top-4">
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStatistics.length > 0 ? (
          filteredStatistics.map((stat, index) => (
            <Link href={`/statistics/${stat.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={stat.image}
                  alt={stat.title}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {stat.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{stat.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {stat.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No statistics found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
