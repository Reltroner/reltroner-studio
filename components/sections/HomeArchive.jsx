'use client';

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import ArchiveCardMedia from "@/components/media/ArchiveCardMedia";
import HoverDepth from "@/components/motion/HoverDepth";

export default function HomeArchive({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredPosts = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return [post.title, post.description, post.slug]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [deferredQuery, posts]);

  return (
    <section id="content" className="section-shell px-4 py-8">
      <div className="surface-card p-6 sm:p-8">
        <p className="mb-4 text-sm text-gray-500">Optional deep reading. Stop anytime.</p>

        <div className="surface-glass mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <label htmlFor="search" className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-600">
            Search:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type a keyword..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white/80 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-900/80"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="block h-full"
              >
                <HoverDepth className="h-full">
                  <article className="surface-card flex h-full min-h-75 flex-col justify-between overflow-hidden dark:bg-gray-900 dark:text-white">
                    <ArchiveCardMedia
                      image={post.image}
                      title={post.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="flex grow flex-col p-5">
                      <h2 className="mb-2 text-xl font-semibold tracking-tight">{post.title}</h2>
                      <p className="grow text-gray-600 dark:text-gray-300">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </HoverDepth>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
}