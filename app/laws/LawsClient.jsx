'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function LawsClient({ laws }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLaws = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return laws.filter(
      (law) =>
        law.title.toLowerCase().includes(q) ||
        law.description.toLowerCase().includes(q) ||
        law.slug.toLowerCase().includes(q) ||
        (law.author && law.author.toLowerCase().includes(q))
    );
  }, [searchQuery, laws]);

  return (
    <div className="p-5 bg-slate-100">
      {/* Heading + Deskripsi */}
      <div className="text-center mb-6">
        <Heading>Laws</Heading>
        <p className="text-sm text-gray-700 font-bold">
        Explore foundational laws and interplanetary regulations that shape justice, labor, and order across Asthortera.
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

      {/* Law Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLaws.length > 0 ? (
          filteredLaws.map((law, index) => (
            <Link href={`/laws/${law.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={law.image}
                  alt={law.title}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {law.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{law.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {law.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No laws found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
