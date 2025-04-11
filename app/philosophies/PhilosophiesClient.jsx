'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function PhilosophiesClient({ philosophies }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPhilosophies = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return philosophies.filter(
      (phi) =>
        phi.title.toLowerCase().includes(q) ||
        phi.description.toLowerCase().includes(q) ||
        phi.slug.toLowerCase().includes(q) ||
        (phi.author && phi.author.toLowerCase().includes(q))
    );
  }, [searchQuery, philosophies]);

  return (
    <div className="p-5 bg-slate-100">
      {/* Heading Centered */}
      <div className="text-center mb-6">
        <Heading>Philosophies</Heading>
        <p className="text-sm text-gray-700 font-bold">
        Explore the core ideologies, spiritual codes, and existential beliefs that shape every civilization, character, and conflict across Asthortera.
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

      {/* Philosophie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhilosophies.length > 0 ? (
          filteredPhilosophies.map((phi, index) => (
            <Link href={`/philosophies/${phi.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={phi.image}
                  alt={phi.title}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {phi.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{phi.description}</p>
                  <p className="text-sm mt-2 italic text-gray-500">By {phi.author}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No Philosophies found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
