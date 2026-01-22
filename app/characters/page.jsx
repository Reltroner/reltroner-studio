import CharactersClient from "./CharactersClient";

export const metadata = {
  title: "Characters",
  description: "Explore the living minds that shape Asthortera’s destiny."
};

const characters = [
  {
      title: "Rei Reltroner",
      role: "Architect of Astralis Pinnacle",
      description: "A transformative visionary and the silent guardian of Astralis against the Spiral.",
      slug: "rei-reltroner",
      image: "/images/rei-reltroner.webp",
      published: true
  },
  {
      title: "Evara Alena",
      role: "Kamila Alena’s Daughter",
      description: "A perceptive and intuitive presence who senses the echoes of Astralis and the void of Nytherion despite her youth.",
      slug: "evara-alena",
      image: "/images/evara-alena.webp",
      published: true
  },
  {
      title: "Delwyn Harper",
      role: "Shadow Bounty Hunter of Leferlint",
      description: "A haunted seeker of truth, Delwyn walks through the colorful illusions of Pencilfania to reveal the shadows beneath.",
      slug: "delwyn-harper",
      image: "/images/delwyn-harper.webp",
      quote: "Every light leaves a shadow. I'm here to drag it out.",
      published: true
  },
  {
      title: "Isaac Luminar",
      role: "The Lighting Man of Inferminte",
      description: "An extended, lore-consistent character sheet for Isaac Luminar, the Lantern Reformist of Lenternow, detailing his biography, psychology, political position, tech skills, and multi-arc narrative role in the Asthortera universe.",
      slug: "isaac-luminar",
      image: "/images/isaac-luminar.webp",
      quote: "Just because it shines doesn’t mean it saves.",
      published: true
  },
  {
      title: "Kamila Alena",
      role: "Throne of the Nytherion Abyss",
      description: "The silent origin of Nytherion's chaos, carrying pain turned into strategy.",
      slug: "kamila-alena",
      image: "/images/kamila-alena.webp",
      quote: "Peace built on truth is fragile. Peace built on comfort is eternal.",
      published: true
  },
  {
      title: "Barry Heathrow",
      role: "Senior Flight Attendant & Covert Aviation Operative",
      description: "An unassuming steward turned critical operative in Asthortera’s shadow war for airspace.",
      slug: "barry-heathrow",
      image: "/images/barry-heathrow.webp",
      quote: "Not every war is fought on land. Some battles are whispered between altitude and silence.",
      published: true
  },
  {
      title: "Nathan Harry",
      role: "Covert Analyst & Morale Anchor of The Flightless Pact",
      description: "A grounded soul in a world of turbulence — Nathan works behind the scenes to keep the resistance human.",
      slug: "nathan-harry",
      image: "/images/nathan-harry.webp",
      quote: "You don’t win by flying higher. You win by remembering why you took off in the first place.",
      published: true
  },
  {
      title: "Raina Veltrania",
      role: "Human Capital Development Manager, Skytrone",
      description: "A sharp and composed leader in Reltronland’s most influential innovation company, Raina stands at the intersection of idealism, professionalism, and silent resistance.",
      slug: "raina-veltrania",
      image: "/images/raina-veltrania.webp",
      quote: "A person’s worth is not defined by status, but by the results and impact of their work.",
      published: true
  },
  {
      title: "Wayne Astoner",
      role: "Corporate white-collar at Skytrone",
      description: "His clarity echoes Rei’s early days — potential waiting to ignite.",
      slug: "wayne-astoner",
      image: "/images/wayne-astoner.webp",
      published: true
  },
  {
      title: "Albert Locke",
      role: "Senior Astronomer & Cosmic Systems Analyst",
      description: "A scientific bridge between logic and the unknown, Albert Locke tracks cosmic phenomena that shape technology and destiny in Asthortera.",
      slug: "albert-locke",
      image: "/images/albert-locke.webp",
      published: true
  },
  {
      title: "Queen Valethra Seraphine Lunara",
      role: "Cosmic Balance Keeper",
      description: "A timeless ruler harmonizing spiritual clarity and moral power.",
      slug: "queen-valethra",
      image: "/images/queen-valethra.webp",
      quote: "Aurora light does not choose light or darkness — it merely reflects the state of our hearts.",
      published: true
  },
  {
      title: "Dr. Westley Watson",
      role: "Director of The Endless Library of Depcutland",
      description: "A political intellectual who manipulates information as power, Watson is the keeper of forbidden knowledge and a silent strategist behind Asthortera’s global balance.",
      slug: "westley-watson",
      image: "/images/westley-watson.webp",
      quote: "Knowledge is power... but only to those who know how to wield it.",
      published: true
  },
  {
    title: "Franklin Scouter",
    role: "Senior Scout Mentor of Oakcottage",
    description: "A grounded and principled leader from Whispergrove Forest, Franklin is the only person who feels the void left by Georger’s disappearance, despite not remembering him. His quiet resilience and deep connection with nature make him a guardian of forgotten truths.",
    slug: "franklin-scouter", 
    image: "/images/franklin-scouter.webp", 
    quote: "There’s a name stuck in my heart, though I’ve never heard it before.",
    published: true
},
{
    title: "Georger Woodman", 
    role: "Scout Creator & Viral Influencer",
    description: "A visionary content creator who blended scouting tradition with modern digital storytelling. Once beloved by billions, he vanished mysteriously into the Nytherion Abyss, erasing all traces of his existence — except a lingering echo in Whispergrove.",
    slug: "georger-woodman",
    image: "/images/georger-woodman.webp", 
    quote: "Maybe I just wanted to be remembered for something that mattered.",
    published: true
},
{
    title: "Moris Monte",
    role: "Puzzle Seeker",
    description: "A nostalgic puzzle seeker from Cenrestier who believes the locked Level 9 from his childhood game still exists somewhere in the real world. Moris now lives in the castle-laden outskirts of Citadeladia, searching for memories lost in time.",
    slug: "moris-monte",
    date: "2025-04-17",
    image: "/images/moris-monte.webp",
    tags: ["Cenrestier", "Citadeladia", "Memory Series", "Castle Lore"],
    published: true
},
{
    title: "🩸 Andy Elian",
    role: "The Victim of Nytherion Abyss",
    description: "A curious soul who sought comfort in beauty and simplicity, until comfort became the doorway to erasure. The first known victim of Nytherion Abyss's existential corrosion.",
    slug: "andy-elian",
    date: "2025-04-22",
    image: "/images/andy-elian.webp",
    tags: ["character", "nytherion abyss", "victim", "the abyss of comfort"],
    published: true
},
{
    title: "🛡 Bruce Kalen",
    role: "The Rational Anchor",
    description: "A rational anchor in a world unraveling. The only person who remembers Andy Elian after his erasure by Nytherion Abyss. His journey begins where the world forgets.",
    slug: "bruce-kalen",
    date: "2025-04-22",
    image: "/images/bruce-kalen.webp",
    tags: ["character", "nytherion abyss", "anchor", "the abyss of comfort"],
    published: true
},
{
    title: "Mimbixs — Reltronland Character Profile",
    slug: "mimbixs",
    tags: ["mascot", "cute culture", "data analyst", "Reltronland", "Mimbixs"],
    role: "Senior Astronomer & Cosmic Systems Analyst",
    description: "Mimbixs is a cosmic-themed mascot from Reltronland, blending cute culture with data mastery. As a Senior Astronomer & Systems Analyst, Mimbixs interprets celestial metrics and behavioral data to guide civilization through logic, clarity, and a pixelated smile.",
    author: "Reltroner Studio",
    date: "2025-06-22",
    published: true,
    image: "/images/mimbixs.webp"
}
  
];

export default function Characters() {
  return <CharactersClient characters={characters} />;
}
