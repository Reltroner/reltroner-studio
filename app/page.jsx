import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Home",
  description: "Welcome to the home page about world-building!"
};

export default function Home() {
  const posts = [
    {
      title: "World Building Basics",
      description: "Exploring the fundamentals of world-building for creative writing.",
      slug: "worldbuilding",
      image: "/images/WorldBuilding.jpg"
    },
    {
      title: "Magic System: Astralis vs Nytherion",
      description: "Explore the core metaphysical conflict between creation and illusion in Asthortera.",
      slug: "magic-system",
      image: "/images/magic-astralis-nytherion.webp"
    },
    {
      title: "Creative Lore Bible",
      description: "The ideological framework and worldbuilding foundation of Reltroner Studio — where illusion meets clarity, and fiction becomes a manifesto.",
      slug: "creative-lore-bible",
      image: "/images/creative-lore-bible.png",
      author: "Reltroner Studio",
      date: "March 28, 2025"
    },
    {
      title: "Grandmaster Lorebook of Asthortera — Collector’s Compendium",
      description: "An integrated and immersive worldbuilding codex of Asthortera, its civilizations, dimensions, conflicts, and characters — from Spiral to Astralis.",
      slug: "lorebook-asthortera",
      image: "/images/lorebook-asthortera.png",
      author: "Reltroner Studio",
      published: true,
      date: "2025-03-29",
      
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
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Home</Heading>
      <p className="mb-4 text-center font-bold">Welcome to the home page about world-building!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index} className="block h-full">
          <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 min-h-[300px]">
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
