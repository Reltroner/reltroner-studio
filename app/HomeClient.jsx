'use client';

import { useState, useMemo } from "react";
import Link from "next/link";

export default function HomeClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(q) ||
        post.description?.toLowerCase().includes(q) ||
        post.slug?.toLowerCase().includes(q)
    );
  }, [searchQuery, posts]);

  return (
    <div className="p-5 bg-slate-100">

      {/* Hero Heading for SEO */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reltroner Studio
        </h1>
        <p className="text-gray-700 text-lg font-semibold max-w-2xl mx-auto">
          A digital agency specializing in web development and the creative sanctuary of the fictional universe Asthortera.
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          💡 Press <kbd className="px-1 py-0.5 border rounded text-sm">Ctrl</kbd> + <kbd className="px-1 py-0.5 border rounded text-sm">K</kbd> or <kbd className="px-1 py-0.5 border rounded text-sm">⌘</kbd> + <kbd className="px-1 py-0.5 border rounded text-sm">K</kbd> to quickly navigate pages.
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

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index} className="block h-full">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">{post.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No posts found matching “{searchQuery}”.
          </p>
        )}
      </div>
    </div>
  );
}
