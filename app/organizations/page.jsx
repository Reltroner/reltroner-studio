import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Organizations",
  description: "A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world’s creative, economic, and ideological future."
};

export default function Organizations() {
  const organizations = [
    {
      title: "Reltroner Studio Holdings",
      description: "A strategic breakdown of Reltroner Studio’s multidivisional structure and its future-forward ecosystem of creativity, capital, and sovereignty.",
      slug: "reltroner-holding",
      image: "/images/reltroner-holding.png",
      author: "Rei Reltroner",
      date: "2025-04-04"
    },
    {
      title: "Henchoeway",
      description: "A secretive cult rooted in Nytherion Abyss, Henchoeway spreads illusions of comfort while manipulating the world from the depths of Tremora Trench.",
      slug: "henchoeway", 
      image: "/images/henchoeway.png", 
      author: "Rei Reltroner",
      date: "2025-04-07"
    }
    
    
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Organizations</Heading>
      <p className="mb-4 text-center font-bold">A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world’s creative, economic, and ideological future.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((organization, index) => (
          <Link href={`/organizations/${organization.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={organization.image}
                alt={`${organization.title}, ${organization.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {organization.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{organization.role}</p>
                <p className="text-gray-600 flex-grow">{organization.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
