import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Series",
  description: "Explore the series of Asthortera — complex, layered, and deeply intertwined with the fate of Astralis."
};

export default function Series() {
  const series = [
    {
        title: "Arrival at Eterna Ruin",
        description: "The next serie as the protagonists arrive at the true location of the Nytherion Abyss portal, filled with mystery and spiritual tension.",
        author: "Rei Reltroner",
        slug: "eterna-ruin",
        image: "/images/eterna-ruin.png",
        date: "2025-04-04"
    },
    
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Series</Heading>
      <p className="mb-4 text-center font-bold">Unravel the character-driven sagas across multiple timelines — where political tension, cosmic mysteries, and inner wars shape Asthortera’s fate.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {series.map((serie, index) => (
          <Link href={`/series/${serie.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={serie.image}
                alt={`${serie.title}, ${serie.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {serie.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{serie.role}</p>
                <p className="text-gray-600 flex-grow">{serie.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
