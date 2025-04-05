import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "places",
  description: "Explore the places of Asthortera — complex, layered, and deeply intertwined with the fate of Astralis."
};

export default function Places() {
  const places = [
    {
        name: "Whispergrove Forest",
        type: "Region - Sacred Forest",
        location: "East Scotpaders, Stelpadland",
        slug: "whispergrove",
        image: "/images/whispergrove.png",
        description: "An eternally autumn forest where emotions resonate with nature. Whispergrove is a Nytherion-sensitive zone known for its memory echoes, spiritual presence, and mystical silence.",
        protectedStatus: "Level-4 Cultural and Ecological Heritage Site",
        myth: "The forest whispers the names the world has forgotten.",
        quote: "The forest sings what the world is too loud to hear."
    },
    {
        name: "Llyn Geda",
        type: "Landmark - Sacred Lake",
        location: "Eastern edge of Whispergrove Forest, East Scotpaders, Stelpadland",
        slug: "llyn-geda",
        image: "/images/llyn-geda.png",
        description: "Known as the Lake of Silent Witness, Llyn Geda holds emotional echoes and unspoken memories. Its glassy surface reflects more than just one’s appearance — it mirrors the soul.",
        phenomenon: ["Stillness Veil", "Memory Pulse", "Vanishing Echo"],
        quote: "Still water holds the loudest grief."
    },
    {
        name: "Oakcottage Headquarters",
        type: "Institution",
        location: "Whispergrove Forest, East Scotpaders, Stelpadland",
        slug: "oakcottage",
        image: "/images/oakcottage-hq.png",
        description: "A legendary scouting institution rooted in the heart of Whispergrove Forest. Oakcottage trains leaders of character and resilience, blending nature, survival, and spiritual development into a sacred rite of passage.",
        established: "Year 712 (Stelpad Calendar)",
        affiliation: "Ministry of Education & character Formation, Stelpadland",
        quote: "We remember even what the world forgets."
    },
    {
      name: "Heart of the Abyss",
      type: "Dimension",
      location: "Nytherion Abyss",
      description: "An artistic depiction of the deepest and most cursed core within the Nytherion Abyss, where time, memory, and self fracture into darkness.",
      author: "Rei Reltroner",
      slug: "dark-abyss",
      date: "2025-04-05",
      image: "/images/dark-abyss.png"
    }    
  
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Places</Heading>
      <p className="mb-4 text-center font-bold">Journey through cities, ruins, and forgotten dimensions — each with their own pulse, memory, and power in the grand chronicle of Asthortera.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <Link href={`/places/${place.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={place.image}
                alt={`${place.name}, ${place.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {place.name}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{place.role}</p>
                <p className="text-gray-600 flex-grow">{place.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
