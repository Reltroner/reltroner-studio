import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Cultures",
  description: "Explore the cultures of Asthortera — complex, layered, and deeply intertwined with the fate of Astralis."
};

export default function Cultures() {
  const cultures = [
    {
        title: "Sacred Rest Policy",
        description: "Reltroner Studio's official stance on intentional rest as a pathway to deeper creativity and sustained mental strength.",
        slug: "rest-culture",
        author: "Rei Reltroner",
        date: "2025-04-05",
        published: true,
        image: "/images/rest-culture.png"
    },
    {
        title: "The Cuteness Manifesto: Softness Within Strength",
        description: "Cuteness isn’t a trend. It’s a weapon. Reltroner Studio shows how softness becomes strategy in a world built on mental warfare.",
        slug: "cuteness-manifesto",
        author: "Rei Reltroner",
        date: "2025-04-06",
        published: true,
        image: "/images/cuteness-manifesto.png"
    }
  
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Cultures</Heading>
      <p className="mb-4 text-center font-bold">Dive into the ethos and daily rituals of Asthortera — where identity, behavior, and belief systems converge into legacies that define civilizations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cultures.map((culture, index) => (
          <Link href={`/cultures/${culture.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={culture.image}
                alt={`${culture.title}, ${culture.role}`}
                className="w-full max-h-[400px] object-contain mx-auto px-4"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {culture.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{culture.role}</p>
                <p className="text-gray-600 flex-grow">{culture.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
