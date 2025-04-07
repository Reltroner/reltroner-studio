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
    {
      title: "Where Do I Stand in the AI Ecosystem",
      description: "A self-aware documentation of Rei Reltroner's position in the global landscape of AI usage.",
      author: "Chatty (GPTPlus Mode)",
      slug: "ai-ecosystem",
      image: "/images/ai-ecosystem.png",
      date: "2025-04-05"
    },
    {
      title: "Personal Index of Rei Reltroner",
      description: "A multidimensional self-assessment of Rei Reltroner's current value, power, and visionary trajectory.",
      author: "Chatty (GPTPlus Mode)",
      slug: "value-index",
      date: "2025-04-05",
      published: true,
      image: "/images/value-index.png"
    },
    {
      title: "Official SDI Report of Asthortera",
      description: "A world-building overview of the Sentient Development Index (SDI) across key nations in Asthortera, including Reltronland, Depcutland, and others.",
      author: "Rei Reltroner",
      slug: "sdi-report-asthortera",
      date: "2025-04-06",
      published: true,
      image: "/images/sdi-report-asthortera.png"
    },
    {
      title: "Depeisit Identity",
      description: "A planet rooted in tradition and trapped in spiritual stagnation. Depeisit reflects a civilization that fears change, worships order, and slowly drifts into the abyss of comfort.",
      author: "Rei Reltroner",
      slug: "depeisit_identity", 
      date: "2025-04-07", 
      published: true,
      image: "/images/depeisit_identity.png"
    },
    {
      title: "Asthortera Identity",
      description: "A planet of conscious evolution, diversity, and high development. Asthortera stands as the galaxy's central stage for meritocracy, interstellar migration, and spiritual-political balance.",
      author: "Rei Reltroner",
      slug: "asthortera_identity",  
      date: "2025-04-07", 
      published: true,
      image: "/images/asthortera_identity.png"
    },
    {
      title: "Cosmeilia Identity",
      description: "A planet of ethereal beauty, cosmic resonance, and spiritual governance. Cosmeilia thrives beyond material progress, led by light, emotion, and harmonic purpose.",
      author: "Rei Reltroner",
      slug: "cosmeilia_identity",  
      date: "2025-04-07", 
      published: true,
      image: "/images/cosmeilia_identity.png"
    },
    {
      title: "Cistheta Identity",
      description: "A hyper-urbanized planet of ancestral discipline and digital precision. Cistheta leads the galaxy in technocultural synthesis, merging tradition with high-speed innovation.",
      author: "Rei Reltroner",
      slug: "cistheta_identity",  
      date: "2025-04-07", 
      published: true,
      image: "/images/cistheta_identity.png"
    }    
    
    
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Statistics</Heading>
      <p className="mb-4 text-center font-bold">Decode the raw numbers behind the world — from population structures to SDI indicators — and understand what truly drives Asthortera beneath the surface.</p>

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
