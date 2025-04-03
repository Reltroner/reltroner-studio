import Link from "next/link";
import PostCard from "@/components/PostCard";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Characters",
  description: "Explore the characters of Asthortera — complex, layered, and deeply intertwined with the fate of Astralis."
};

export default function Characters() {
  const characters = [
    {
        name: "Rei Reltroner",
        role: "Architect of Astralis Pinnacle",
        description: "A transformative visionary and the silent guardian of Astralis against the Spiral.",
        slug: "rei-reltroner",
        image: "/images/rei-reltroner.png"
    },
    {
        name: "Evara Alena",
        role: "Kamila Alena’s Daughter",
        description: "A perceptive and intuitive presence who senses the echoes of Astralis and the void of Nytherion despite her youth.",
        slug: "evara-alena",
        image: "/images/evara-alena.png"
    },
    {
        name: "Delwyn Harper",
        role: "Shadow Bounty Hunter of Leferlint",
        description: "A haunted seeker of truth, Delwyn walks through the colorful illusions of Pencilfania to reveal the shadows beneath.",
        slug: "delwyn-harper",
        image: "/images/delwyn-harper.png",
        quote: "Every light leaves a shadow. I'm here to drag it out."
    },
    {
        name: "Isaac Luminar",
        role: "Lighting Engineer & Aurora Gateway Architect",
        description: "A master of light trapped in a city of illusions, Isaac exposes the dark mechanisms behind the brilliance of Lenternow.",
        slug: "isaac-luminar",
        image: "/images/isaac-luminar.png",
        quote: "Just because it shines doesn’t mean it saves."
    },
    {
        name: "Kamila Alena",
        role: "Founder of Henchoeway",
        description: "The silent origin of Nytherion's chaos, carrying pain turned into strategy.",
        slug: "kamila-alena",
        image: "/images/kamila-alena.png",
        quote: "Peace built on truth is fragile. Peace built on comfort is eternal."
    },
    {
        name: "Barry Heathrow",
        role: "Senior Flight Attendant & Covert Aviation Operative",
        description: "An unassuming steward turned critical operative in Asthortera’s shadow war for airspace.",
        slug: "barry-heathrow",
        image: "/images/barry-heathrow.png",
        quote: "Not every war is fought on land. Some battles are whispered between altitude and silence.",
    },
    {
        name: "Hendry Harry",
        role: "Covert Analyst & Morale Anchor of The Flightless Pact",
        description: "A grounded soul in a world of turbulence — Hendry works behind the scenes to keep the resistance human.",
        slug: "hendry-harry",
        image: "/images/hendry-harry.png",
        quote: "You don’t win by flying higher. You win by remembering why you took off in the first place."
    },
    {
        name: "Raina Veltrania",
        role: "Human Capital Development Manager, Skytrone",
        description: "A sharp and composed leader in Reltronland’s most influential innovation company, Raina stands at the intersection of idealism, professionalism, and silent resistance.",
        slug: "raina-veltrania",
        image: "/images/raina-veltrania.png",
        quote: "A person’s worth is not defined by status, but by the results and impact of their work."
    },
    {
        name: "Wayne Astoner",
        role: "Corporate white-collar at Skytrone",
        description: "His clarity echoes Rei’s early days — potential waiting to ignite.",
        slug: "wayne-astoner",
        image: "/images/wayne-astoner.png"
    },
    {
        name: "Albert Locke",
        role: "Senior Astronomer & Cosmic Systems Analyst",
        description: "A scientific bridge between logic and the unknown, Albert Locke tracks cosmic phenomena that shape technology and destiny in Asthortera.",
        slug: "albert-locke",
        image: "/images/albert-locke.png"
    },
    {
        name: "Queen Valethra Seraphine Lunara",
        role: "Cosmic Balance Keeper",
        description: "A timeless ruler harmonizing spiritual clarity and moral power.",
        slug: "queen-valethra",
        image: "/images/queen-valethra.png"
    },
    {
        name: "Dr. Westley Watson",
        role: "Director of The Endless Library of Depcutland",
        description: "A political intellectual who manipulates information as power, Watson is the keeper of forbidden knowledge and a silent strategist behind Asthortera’s global balance.",
        slug: "westley-watson",
        image: "/images/westley-watson.png",
        quote: "Knowledge is power... but only to those who know how to wield it."
    },
    {
      name: "Franklin Scouter",
      role: "Senior Scout Mentor of Oakcottage",
      description: "A grounded and principled leader from Whispergrove Forest, Franklin is the only person who feels the void left by Georger’s disappearance, despite not remembering him. His quiet resilience and deep connection with nature make him a guardian of forgotten truths.",
      slug: "franklin-scouter", 
      image: "/images/franklin-scouter.png", 
      quote: "There’s a name stuck in my heart, though I’ve never heard it before."
  },
  {
      name: "Georger Woodman", 
      role: "Scout Creator & Viral Influencer",
      description: "A visionary content creator who blended scouting tradition with modern digital storytelling. Once beloved by billions, he vanished mysteriously into the Nytherion Abyss, erasing all traces of his existence — except a lingering echo in Whispergrove.",
      slug: "georger-woodman",
      image: "/images/georger-woodman.png", 
      quote: "Maybe I just wanted to be remembered for something that mattered."
  }
  
  ];

  return (
    <div className="p-5 bg-slate-100">
      <Heading>Characters</Heading>
      <p className="mb-4 text-center font-bold">Explore the living minds that shape Asthortera’s destiny.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character, index) => (
          <Link href={`/characters/${character.slug}`} key={index} className="block h-full">
            <div className="flex flex-col justify-between h-full border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 min-h-[300px]">
              <img
                src={character.image}
                alt={`${character.name}, ${character.role}`}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {character.name}
                </h2>
                <p className="text-sm font-semibold text-gray-700 italic mb-2">{character.role}</p>
                <p className="text-gray-600 flex-grow">{character.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
