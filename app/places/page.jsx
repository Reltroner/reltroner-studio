import PlacesClient from "./PlacesClient";

export const metadata = {
  title: "Places",
  description: "Journey through cities, ruins, and forgotten dimensions — each with their own pulse, memory, and power in the grand chronicle of Asthortera."
};

const places = [
  {
    title: "Whispergrove Forest",
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
    title: "Llyn Geda",
    type: "Landmark - Sacred Lake",
    location: "Eastern edge of Whispergrove Forest, East Scotpaders, Stelpadland",
    slug: "llyn-geda",
    image: "/images/llyn-geda.png",
    description: "Known as the Lake of Silent Witness, Llyn Geda holds emotional echoes and unspoken memories. Its glassy surface reflects more than just one’s appearance — it mirrors the soul.",
    phenomenon: ["Stillness Veil", "Memory Pulse", "Vanishing Echo"],
    quote: "Still water holds the loudest grief."
  },
  {
    title: "Oakcottage Headquarters",
    type: "Institution",
    location: "Whispergrove Forest, East Scotpaders, Stelpadland",
    slug: "oakcottage",
    image: "/images/oakcottage-hq.png",
    description: "A legendary scouting institution rooted in the heart of Whispergrove Forest. Oakcottage trains leaders of character and resilience, blending nature, survival, and spiritual development into a sacred rite of passage.",
    established: "Year 712 (Stelpad Calendar)",
    affiliation: "Ministry of Education & Character Formation, Stelpadland",
    quote: "We remember even what the world forgets."
  },
  {
    title: "Heart of the Abyss",
    type: "Dimension",
    location: "Nytherion Abyss",
    description: "An artistic depiction of the deepest and most cursed core within the Nytherion Abyss, where time, memory, and self fracture into darkness.",
    author: "Rei Reltroner",
    slug: "dark-abyss",
    date: "2025-04-05",
    image: "/images/dark-abyss.png"
  },
  {
    title: "Eterna Ruin",
    description: "The next serie as the protagonists arrive at the true location of the Nytherion Abyss portal, filled with mystery and spiritual tension.",
    author: "Rei Reltroner",
    slug: "eterna-ruin",
    image: "/images/eterna-ruin.png",
    date: "2025-04-04"
  },
  {
    title: "Province Profile: Leastroper – A Land Beyond Conflict",
    description: "Explore Leastroper, the demilitarized diplomatic province of Reltronland—known for its clarity, serenity, and peaceful border with the crystalline kingdom of Krisberia.",
    slug: "leastroper-profile",
    image: "/images/leastroper-profile.png",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Why Aurastelia is the Most Beautiful Realm",
    description: "Beyond visual splendor, Aurastelia offers a living resonance of balance, light, and inner clarity — unmatched across any fictional universe.",
    slug: "why-aurastelia-is-the-most-beautiful-realm",
    image: "/images/aurastelia-most-beautiful-realm-banner.png",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  },
  {
    title: "The Safe House Pact",
    description: "A secret meeting near the border of Leastroper reveals the first spiritual operation to stop Gandia’s Nytherion infiltration in Skytrone.",
    slug: "the-safe-house-pact",
    image: "/images/the-safe-house-pact.png",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  }
];

export default function Places() {
  return <PlacesClient places={places} />;
}
