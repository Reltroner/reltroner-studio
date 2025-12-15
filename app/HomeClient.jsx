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

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/landing-page.webp')",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Reltroner Studio
        </h1>
        <p className="text-lg md:text-xl max-w-3xl drop-shadow-md">
          A creative–technology studio helping teams and organizations
          design clear systems, scalable architectures, and documentation
          that survives complexity and change.
        </p>
        <a
          href="#get-started"
          className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Explore Capabilities
        </a>
      </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Capabilities</h2>
          <p className="text-gray-600 mt-2">
            What Reltroner Studio delivers for modern organizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              System & Platform Design
            </h3>
            <p className="text-gray-600">
              Design and implementation of internal platforms, SaaS prototypes,
              and operational tools built with modular, scalable architectures
              tailored to real business constraints.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Technical Architecture & Clarity
            </h3>
            <p className="text-gray-600">
              API-first thinking, system decomposition, and architectural
              documentation that enables teams to scale without losing clarity,
              ownership, or velocity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Narrative Documentation & Alignment
            </h3>
            <p className="text-gray-600">
              Narrative-driven documentation that aligns engineering,
              product, and stakeholders — turning complex decisions into
              shared understanding and long-term institutional knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="py-20 px-6 text-center bg-blue-50">
        <h2 className="text-3xl font-bold mb-4">
          Build systems that last
        </h2>
        <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
          Reltroner Studio partners with teams that value structure,
          documentation, and long-term thinking over short-term delivery.
          If your organization is facing complexity, transition, or scale,
          we help bring clarity and direction.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Discuss a Collaboration
        </a>
      </section>

      {/* Hero Heading for SEO */}
      <section className="py-7 px-6 bg-gray-50">
      <div className="text-center mb-6">
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
    </section>
    </div>
  );
}
