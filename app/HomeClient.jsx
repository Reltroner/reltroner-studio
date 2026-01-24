'use client';
// app/HomeClient.jsx
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

      {/* ================= HERO ================= */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landing-page.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        <div className="relative z-10 text-white flex flex-col items-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Reltroner Studio
          </h1>
          <p className="text-lg md:text-xl max-w-3xl drop-shadow-md">
            A creative technology studio helping teams and organizations
            design clear systems, scalable architectures, and documentation
            that survives complexity and change.
          </p>
          <a
            href="#how-to-read"
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
          >
            Start Here
          </a>
        </div>
      </section>

      {/* ================= READING PERMISSION BLOCK ================= */}
      <section
        id="how-to-read"
        className="py-16 px-6 bg-white border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            How to use this site
          </h2>

          <p className="text-gray-700">
            You don’t need to read everything.  
            This is not a sales funnel. Take only what you need — and stop.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
            <div className="border rounded-lg p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">🟢 Light read · 1–2 min</p>
              <h3 className="font-semibold mb-2">Just curious</h3>
              <p className="text-gray-600 mb-4">
                Get a quick sense of what Reltroner Studio is about.
              </p>
              <Link href="/about" className="text-blue-600 underline">
                Read the short overview →
              </Link>
            </div>

            <div className="border rounded-lg p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">🔵 Professional · 3–5 min</p>
              <h3 className="font-semibold mb-2">Recruiters & collaborators</h3>
              <p className="text-gray-600 mb-4">
                Understand where Rei fits best — and where he doesn’t.
              </p>
              <Link
                href="/blog/for-recruiters"
                className="text-blue-600 underline"
              >
                Go to recruiter fast lane →
              </Link>
            </div>

            <div className="border rounded-lg p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">⚫ Deep dive · Optional</p>
              <h3 className="font-semibold mb-2">Thinking & philosophy</h3>
              <p className="text-gray-600 mb-4">
                Explore systems, narratives, and long-form reasoning.
              </p>
              <a href="#content" className="text-blue-600 underline">
                Browse the archive →
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            You can stop reading here if this already answers your question.
          </p>
        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Capabilities</h2>
          <p className="text-gray-600 mt-2">
            What Reltroner Studio delivers for modern organizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "System & Platform Design",
              desc:
                "Design and implementation of internal platforms, SaaS prototypes, and operational tools built with modular, scalable architectures."
            },
            {
              title: "Technical Architecture & Clarity",
              desc:
                "API-first thinking, system decomposition, and architectural documentation that enables teams to scale without losing clarity."
            },
            {
              title: "Narrative Documentation & Alignment",
              desc:
                "Narrative-driven documentation that turns complex decisions into shared understanding and long-term knowledge."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6 text-center bg-blue-50">
        <h2 className="text-3xl font-bold mb-4">
          Build systems that last
        </h2>
        <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
          Reltroner Studio partners with teams that value structure,
          documentation, and long-term thinking over short-term delivery.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Discuss a Collaboration
        </a>
      </section>

      {/* ================= CONTENT ARCHIVE ================= */}
      <section id="content" className="py-10 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-500 mb-4">
            Optional deep reading. Stop anytime.
          </p>

          {/* Search */}
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
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={index}
                  className="block h-full"
                >
                  <div className="flex flex-col h-full border rounded-lg shadow-md hover:shadow-lg transition">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 flex-grow">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No posts found.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
