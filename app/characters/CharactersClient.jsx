'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function CharactersClient({ characters }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return characters.filter(
      (char) =>
        char.title.toLowerCase().includes(q) ||
        char.role.toLowerCase().includes(q) ||
        char.description.toLowerCase().includes(q) ||
        (char.quote && char.quote.toLowerCase().includes(q)) ||
        char.slug.toLowerCase().includes(q)
    );
  }, [searchQuery, characters]);

  return (
    <div className="p-5 bg-slate-100">
        {/* Heading Centered */}
        <div className="text-center mb-6">
            <Heading>Characters</Heading>
            <p className="mb-4 text-center font-bold">
            Explore the living minds that shape Asthortera’s destiny.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character, index) => (
            <Link href={`/characters/${character.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={character.image}
                  alt={`${character.title}, ${character.role}`}
                  className="w-full max-h-[400px] object-contain mx-auto"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {character.title}
                  </h2>
                  <p className="text-sm font-semibold text-gray-700 italic mb-2">{character.role}</p>
                  <p className="text-gray-600 flex-grow">{character.description}</p>
                  {character.quote && (
                    <blockquote className="text-sm text-blue-800 mt-2 italic border-l-4 border-blue-300 pl-3">
                      “{character.quote}”
                    </blockquote>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No characters found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
