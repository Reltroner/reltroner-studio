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
    image: "/images/whispergrove.webp",
    description: "An eternally autumn forest where emotions resonate with nature. Whispergrove is a Nytherion-sensitive zone known for its memory echoes, spiritual presence, and mystical silence.",
    protectedStatus: "Level-4 Cultural and Ecological Heritage Site",
    myth: "The forest whispers the names the world has forgotten.",
    quote: "The forest sings what the world is too loud to hear.",
    date: "2025-04-04",
    published: true
  },
  {
    title: "Llyn Geda",
    type: "Landmark - Sacred Lake",
    location: "Eastern edge of Whispergrove Forest, East Scotpaders, Stelpadland",
    slug: "llyn-geda",
    image: "/images/llyn-geda.webp",
    description: "Known as the Lake of Silent Witness, Llyn Geda holds emotional echoes and unspoken memories. Its glassy surface reflects more than just one’s appearance — it mirrors the soul.",
    phenomenon: ["Stillness Veil", "Memory Pulse", "Vanishing Echo"],
    quote: "Still water holds the loudest grief.",
    date: "2025-04-04",
    published: true
  },
  {
    title: "Oakcottage Headquarters",
    type: "Institution",
    location: "Whispergrove Forest, East Scotpaders, Stelpadland",
    slug: "oakcottage",
    image: "/images/oakcottage-hq.webp",
    description: "A legendary scouting institution rooted in the heart of Whispergrove Forest. Oakcottage trains leaders of character and resilience, blending nature, survival, and spiritual development into a sacred rite of passage.",
    established: "Year 712 (Stelpad Calendar)",
    affiliation: "Ministry of Education & Character Formation, Stelpadland",
    quote: "We remember even what the world forgets.",
    date: "2025-04-04",
    published: true
  },
  {
    title: "Eterna Ruin",
    description: "The next serie as the protagonists arrive at the true location of the Nytherion Abyss portal, filled with mystery and spiritual tension.",
    author: "Rei Reltroner",
    slug: "eterna-ruin",
    image: "/images/eterna-ruin.webp",
    date: "2025-04-04",
    published: true
  },
  {
    title: "Province Profile: Leastroper – A Land Beyond Conflict",
    description: "Explore Leastroper, the demilitarized diplomatic province of Reltronland—known for its clarity, serenity, and peaceful border with the crystalline kingdom of Krisberia.",
    slug: "leastroper-profile",
    image: "/images/leastroper-profile.webp",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Why Aurastelia is the Most Beautiful Realm",
    description: "Beyond visual splendor, Aurastelia offers a living resonance of balance, light, and inner clarity — unmatched across any fictional universe.",
    slug: "why-aurastelia-is-the-most-beautiful-realm",
    image: "/images/aurastelia-most-beautiful-realm-banner.webp",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  },
  {
    title: "The Safe House Pact",
    description: "A secret meeting near the border of Leastroper reveals the first spiritual operation to stop Gandia’s Nytherion infiltration in Skytrone.",
    slug: "the-safe-house-pact",
    image: "/images/the-safe-house-pact.webp",
    author: "Rei Reltroner",
    date: "2025-04-17",
    published: true
  },
  {
    title: "🏙️ Reltralia District Layers",
    description: "An official breakdown of the core, fallback, and metaphysical identity districts within the capital city of Reltronland.",
    slug: "reltralia-district-layers",
    image: "/images/reltralia-district-layers.webp",
    author: "Rei Reltroner",
    date: "2025-04-21",
    published: true
  },
  {
    title: "🗺️ Asthortera World Map — Development Progress Overview",
    description: "A live reflection of the evolving worldbuilding structure of Asthortera, featuring ongoing adjustments in territorial borders, naming conventions, and narrative planning.",
    slug: "asthortera-world-map-progress",
    image: "/images/asthortera-world-map-progress.webp",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true
  },
  {
    title: "🚧 Neiput Border: Gateway Between Reltronland and Depcutland",
    description: "A symbolic and strategic passageway between two civilizational titans—Reltronland and Depcutland. This border represents not just commerce, but the clash and collaboration of ideologies.",
    slug: "neiput-border-trade-gateway",
    image: "/images/depcutland-reltronland-border.webp",
    author: "Rei Reltroner",
    date: "2025-04-23",
    published: true,
    date: "2025-04-23"
  },
  {
    title: "🚉 Reltronepolis Central Station — Heart of Sentient Mobility",
    description: "The continent-scale central terminal of Reltronland, integrating every mass transit mode except interstellar, and serving as the mobility pulse of Trons Square District.",
    slug: "reltronepolis-central-station",
    image: "/images/reltronepolis-central-station.webp",
    author: "Rei Reltroner",
    date: "2025-04-24",
    published: true,
    tags: ["reltronepolis", "transportation", "urbanism", "architecture"]
  },
  {
    title: "✈️ RAIA — Reltronepolis Aeropolis International Airport",
    description: "Reltronland’s primary spaceport for planetary and interstellar travel, seamlessly linked with RCS and powered by hybrid antimatter and aurora systems.",
    slug: "reltronepolis-aeropolis-raia",
    image: "/images/reltronepolis-aeropolis-raia.webp",
    author: "Rei Reltroner",
    date: "2025-04-24",
    published: true,
    tags: ["reltronepolis", "transportation", "urbanism", "architecture"]
  },
  {
    title: "✈️ PAIA — Pasgerflit Aeropolis International Airport Hub",
    description: "The largest and most advanced interstellar and planetary air hub in Asthortera, representing Pasgerflit’s core identity as the world of endless airports.",
    slug: "paia-aeropolis-hub",
    image: "/images/paia-aeropolis-hub.webp",
    author: "Rei Reltroner",
    date: "2025-04-24",
    published: true,
    tags: ["pasgerflit", "transportation", "urbanism", "architecture"]
  }
];

export default function Places() {
  return <PlacesClient places={places} />;
}
