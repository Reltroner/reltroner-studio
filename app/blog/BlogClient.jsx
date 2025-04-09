'use client';

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function BlogClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q)
    );
  }, [searchQuery, posts]);

  return (
    <div className="p-5 bg-slate-100 dark:bg-gray-900 dark:text-white">
      <Heading>Blog</Heading>
      <p className="mb-4 text-center font-bold ">Explore recent articles about world-building and events.</p>

      {/* Search Box */}
      <div className="flex items-center gap-x-2 mb-6 ">
        <label htmlFor="search" className="font-semibold text-gray-700 dark:bg-gray-900 dark:text-white">
          Search:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Type a keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center dark:bg-gray-900 dark:text-white">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index} className="block h-full dark:bg-gray-900 dark:text-white">
              <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px] dark:bg-gray-900 dark:text-white">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity dark:bg-gray-900 dark:text-white"
                />
                <div className="p-4 flex flex-col flex-grow dark:bg-gray-900 dark:text-white">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors dark:bg-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 flex-grow dark:bg-gray-900 dark:text-white">{post.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No posts found matching "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
}
