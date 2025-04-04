import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Statistics",
  description: "Explore the statistics of Asthortera, a complex, layered, and deeply intertwined story that shape Asthortera’s destiny."
};

export default function Statistics() {
  const statistics = [
    {
        title: "Sentient Composition Across Planets",
        description: "An overview of the dominant sentient species and human lineages inhabiting the primary planets in the Asthortera galaxy.",
        author: "Rei Reltroner",
        slug: "sentient-population",
        image: "/images/sentient-population.png",
        date: "2025-04-04"
    },
    
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Statistics</Heading>
      <p className="mb-4 text-center font-bold">Explore the statistics of Asthortera, a complex, layered, and deeply intertwined story that shape Asthortera’s destiny.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((statistic, index) => (
          <Link href={`/statistics/${statistic.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={statistic.image}
                alt={`${statistic.title}, ${statistic.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {statistic.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{statistic.role}</p>
                <p className="text-gray-600 flex-grow">{statistic.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
