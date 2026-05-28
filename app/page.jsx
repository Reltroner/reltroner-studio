// app/page.jsx
import Link from "next/link";
import HomeArchive from "@/components/sections/HomeArchive";
import { resolveCdnImageUrl, toBackgroundImageStyle } from "@/lib/assets/image";

export const metadata = {
  title: "Reltroner Studio",
  description: "Reltroner Studio is a digital agency specializing in web development and the creative sanctuary of the fictional universe Asthortera — a world of clarity, meritocracy, and visionary storytelling.",
  keywords: "Reltroner Studio, Asthortera, web development agency, worldbuilding, Rei Reltroner, creative universe, meritocracy, red pill world, futuristic storytelling",
};

const posts = [
  {
    title: "World Building Basics",
    description: "Exploring the fundamentals of world-building for creative writing.",
    slug: "worldbuilding",
    image: "/images/WorldBuilding.webp"
  },
  {
    title: "Magic System: Astralis vs Nytherion",
    description: "Explore the core metaphysical conflict between creation and illusion in Asthortera.",
    slug: "magic-system",
    image: "/images/magic-astralis-nytherion.webp",
  },
  {
    title: "Public Identity Declaration of Rei Reltroner",
    description: "The official declaration of Rei Reltroner's real-world identity and spiritual alignment with the Asthortera world-building.",
    slug: "rei-reltroner-identity",
    author: "Rei Reltroner (Raidan)",
    date: "2025-04-06",
    published: true,
    image: "/images/rei-idcard.webp"
  },
  {
    title: "Creative Lore Bible",
    description: "The ideological framework and worldbuilding foundation of Reltroner Studio — where illusion meets clarity, and fiction becomes a manifesto.",
    slug: "creative-lore-bible",
    image: "/images/creative-lore-bible.webp",
    author: "Reltroner Studio",
    date: "March 28, 2025"
  },
  {
    title: "Grandmaster Lorebook of Asthortera — Collector’s Compendium",
    description: "An integrated and immersive worldbuilding codex of Asthortera, its civilizations, dimensions, conflicts, and characters — from Spiral to Astralis.",
    slug: "lorebook-asthortera",
    image: "/images/lorebook-asthortera.webp",
    author: "Reltroner Studio",
    published: true,
    date: "March 29, 2025"
  },
  {
    title: "For Recruiters & Collaborators – Notion CV",
    description: "Notion-style version of my professional profile and collaboration vision.",
    slug: "reltroner-cv",
    date: "2025-04-18",
    published: true,
    image: "/images/reltroner-cv-banner.webp"
  },
  {
    title: "Asthortera Glossary",
    description: "Official glossary of protected terms, rituals, and narrative systems in the Asthortera Universe by Reltroner Studio.",
    slug: "asthortera-glossary",
    date: "2025-05-16",
    author: "Rei Reltroner",
    published: true,
    image: "/images/asthortera-glossary.webp"
  },
  {
    title: "Cultures & Civilizations",
    description: "Building realistic cultures and societies for your world.",
    slug: "cultures-civilizations",
    image: "/images/culciv.webp"
  },
  {
    title: "Politics",
    description: "Understanding political systems and power dynamics in your world.",
    slug: "politics",
    image: "/images/politics.webp"
  },
  {
    title: "Locations/Geography",
    description: "Designing immersive landscapes and geographic features.",
    slug: "locations",
    image: "/images/locations.webp"
  },
  {
    title: "Events",
    description: "Creating impactful historical and future events for your world.",
    slug: "events",
    image: "/images/events.webp"
  },
  {
    title: "Legacy of Reltroner",
    description: "A comprehensive overview of the Reltroner legacy, its impact on world-building, and its future directions.",
    slug: "legacy",
    date: "2025-04-18",
    image: "/images/legacy.webp",
    published: true
  }
  
].map((post) => ({
  ...post,
  image: resolveCdnImageUrl(post.image),
}));

const heroBackgroundImage = toBackgroundImageStyle("/images/landing-page.webp");

export default function Home() {
  return (
    <div className="space-y-5 px-5 pb-8">
      <section
        className="section-shell surface-card relative flex flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6 py-40 text-center"
        style={heroBackgroundImage ? { backgroundImage: heroBackgroundImage } : undefined}
      >
        <div className="absolute inset-0 z-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center space-y-6 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg md:text-6xl">
            Reltroner Studio
          </h1>
          <p className="max-w-3xl text-lg drop-shadow-md md:text-xl">
            A creative technology studio helping teams and organizations design
            clear systems, scalable architectures, and documentation that survives
            complexity and change.
          </p>
          <a
            href="#how-to-read"
            className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
          >
            Start Here
          </a>
        </div>
      </section>

      <section
        id="how-to-read"
        className="section-shell surface-card px-6 py-16"
      >
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold">How to use this site</h2>

          <p className="text-gray-700">
            You don’t need to read everything.
            {" "}
            This is not a sales funnel. Take only what you need and stop.
          </p>

          <div className="mt-8 grid gap-6 text-left md:grid-cols-3">
            <div className="surface-glass p-5">
              <p className="mb-2 text-sm text-gray-500">Light read · 1–2 min</p>
              <h3 className="mb-2 font-semibold">Just curious</h3>
              <p className="mb-4 text-gray-600">
                Get a quick sense of what Reltroner Studio is about.
              </p>
              <Link href="/about" className="text-blue-600 underline">
                Read the short overview →
              </Link>
            </div>

            <div className="surface-glass p-5">
              <p className="mb-2 text-sm text-gray-500">Professional · 3–5 min</p>
              <h3 className="mb-2 font-semibold">Recruiters & collaborators</h3>
              <p className="mb-4 text-gray-600">
                Understand where Rei fits best and where he doesn’t.
              </p>
              <Link href="/blog/for-recruiters" className="text-blue-600 underline">
                Go to recruiter fast lane →
              </Link>
            </div>

            <div className="surface-glass p-5">
              <p className="mb-2 text-sm text-gray-500">Deep dive · Optional</p>
              <h3 className="mb-2 font-semibold">Thinking & philosophy</h3>
              <p className="mb-4 text-gray-600">
                Explore systems, narratives, and long-form reasoning.
              </p>
              <a href="#content" className="text-blue-600 underline">
                Browse the archive →
              </a>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            You can stop reading here if this already answers your question.
          </p>
        </div>
      </section>

      <section className="section-shell surface-card px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold">Capabilities</h2>
          <p className="mt-2 text-gray-600">
            What Reltroner Studio delivers for modern organizations
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {[
            {
              title: "System & Platform Design",
              desc:
                "Design and implementation of internal platforms, SaaS prototypes, and operational tools built with modular, scalable architectures.",
            },
            {
              title: "Technical Architecture & Clarity",
              desc:
                "API-first thinking, system decomposition, and architectural documentation that enables teams to scale without losing clarity.",
            },
            {
              title: "Narrative Documentation & Alignment",
              desc:
                "Narrative-driven documentation that turns complex decisions into shared understanding and long-term knowledge.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="surface-glass p-6"
            >
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell surface-card bg-blue-50 px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Build systems that last</h2>
        <p className="mx-auto mb-6 max-w-3xl text-gray-700">
          Reltroner Studio partners with teams that value structure,
          documentation, and long-term thinking over short-term delivery.
        </p>
        <Link
          href="/contact"
          className="rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Discuss a Collaboration
        </Link>
      </section>

      <HomeArchive posts={posts} />
    </div>
  );
}
