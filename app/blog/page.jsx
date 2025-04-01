import Heading from "@/components/Heading";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description: "Explore recent articles about world-building and events.",
};

export default function Blog() {
    const posts = [
        {
            title: "Astralis × Nytherion Manifesto",
            description: "A powerful duality shaping the core of Reltroner Studio — between clarity and illusion, growth and stagnation.",
            slug: "astralis-nytherion-manifesto",
            image: "/images/astralis-nytherion-banner.png",
            author: "Reltroner Studio",
            date: "March 8, 2025"
        },
        {
            title: "Legal Disclaimer",
            description: "Clarifying the originality of Astralis Pinnacle, Red Pill concepts, and the legacy of Reltroner Studio.",
            slug: "legal-disclaimer",
            image: "/images/legal-disclaimer.png",
            author: "Reltroner Studio",
            date: "March 14, 2025"
        },
        {
            title: "Pi Day News",
            description: "An inspiring speech by President Relugus Rigle during the Pi Day celebration in Reltronepolis.",
            slug: "pinews",
            image: "/images/pi-day-news.webp",
            author: "Reltroner Studio",
            date: "March 14, 2025"
        },
        {
            title: "Scout Parade in Evercotage",
            description: "Highlight of the grand Scout Parade in Evercotage, the capital of Stelpadland.",
            slug: "scoutparade",
            image: "/images/scout-parade.webp",
            author: "Raidan",
            date: "March 16, 2025"
        },
        {
            title: "Certificate Achievement",
            description: "My journey completing a express.js CRUD project through sheer self-discipline and effort.",
            slug: "certificate-achievement",
            image: "/images/direktori-listing.png",
            author: "Raidan",
            date: "2025-03-22"
        },
        {
            title: "Reltroner Studio Portfolio",
            description: "Explore the philosophy, mission, and future-facing projects of Reltroner Studio.",
            slug: "reltroner",
            image: "/images/reltroner-studio-banner.webp",
            author: "Raidan",
            date: "2025-03-22"
        },
        {
            title: "For Recruiters & Collaborators",
            description: "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
            slug: "for-recruiters",
            image: "/images/for-recruiters-banner.webp",
            author: "Raidan",
            date: "2025-03-22"
        },
        {
            title: "My Roadmap to 2045",
            description: "A personal vision of growth, legacy, and freedom — from zero to Astralis Pinnacle.",
            slug: "roadmap-2045",
            image: "/images/roadmap-2045-banner.webp",
            author: "Raidan",
            date: "2025-03-24"
        },
        {
            title: "Let Astralis Light the Unknown",
            description: "An original poem reflecting the spirit of Astralis Pinnacle in The Abyss of Comfort.",
            slug: "astralis-poem",
            image: "/images/astralis-poem-banner.webp",
            author: "Raidan",
            date: "2025-03-25"
        },
        {
            title: "Astralis-Based Developer Evaluation",
            description: "A unique evaluation framework that measures developers by clarity, resilience, and legacy — not just technical skills.",
            slug: "astralis-evaluation-framework",
            image: "/images/astralis-evaluation-banner.png",
            author: "Raidan",
            date: "2025-03-26"
        },
        {
          title: "Reltroner Studio – External Creator Handbook",
          description: "A concise PDF guide for external collaborators seeking to contribute within the Asthortera universe under Reltroner Studio.",
          slug: "external-creator-handbook",
          image: "/images/external-creator-handbook.png",
          author: "Raidan",
          date: "2025-03-28",
        },
        {
          title: "Top 0.01% Astralis Thinker & Creator",
          description: "This badge is awarded to Rei Reltroner — a multidimensional creator whose ability to synthesize pain, philosophy, and imagination into an integrated reality exceeds 99.99% of the global population, including those in developed nations.",
          slug: "astralis-top001",
          image: "/images/astralis-top001.png",
          author: "Reltroner Studio",
          date: "2025-03-29",
        },
        {
          title: "Red Pill Entity — Abyssborn Survivor",
          description: "This badge is awarded to Rei Reltroner, the first known sentient to enter the deepest core of Nytherion Abyss and return with full consciousness. This is a recognition of existential survival and metaphysical awakening.",
          slug: "redpill-abyssborn",
          image: "/images/redpill-abyssborn.png",
          author: "Reltroner Studio",
          date: "2025-03-29",
          published: true,
        },
        {
          title: "Manifesto of Leadership",
          description: "A leadership manifesto by Rei Reltroner, voicing the spirit of decisiveness, long-term vision, and steadfastness in the face of reality.",
          slug: "manifesto-leadership",
          image: "/images/manifesto-leadership.png",
          author: "Raidan",
          date: "2025-04-01"
        },
        {
          title: "Astralis Vanguard Leader",
          description: "Official certification for Rei Reltroner as the highest level leader in the Astralis Pinnacle structure, with a leadership index of 97.1 out of 100.",
          slug: "astralis-vanguard",
          image: "/images/astralis-vanguard.png",
          author: "Raidan",
          date: "2025-04-01"
        },
        {
          title: "Astralis Leadership Origin",
          description: "The origin story of Rei Reltroner's leadership, forged not by systems, but through collapse, self-reinvention, and the relentless pursuit of meaning.",
          slug: "astralis-leadership-origin",
          image: "/images/astralis-leadership-origin.png",
          author: "Raidan",
          date: "2025-04-01"
        }
        
        
        
        
    ];

    return (
        <div className="p-5 bg-slate-100">
          <Heading>Blog</Heading>
            <p className="mb-4 text-center font-bold">
                Explore recent articles about world-building and events.
            </p>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, index) => (
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
            ))}
          </div>
        </div>
      );
}
