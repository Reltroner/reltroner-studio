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
    title: "Erterna Ruin",
    description: "The next serie as the protagonists arrive at the true location of the Nytherion Abyss portal, filled with mystery and spiritual tension.",
    author: "Rei Reltroner",
    slug: "erterna-ruin",
    image: "/images/erterna-ruin.webp",
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
    title: "📍 Reltronepolis",
    description: "Latest layout and brief descriptions of each key district in Reltronepolis Province",
    slug: "reltronepolis",
    image: "/images/reltronepolis.webp",
    author: "Rei Reltroner",
    date: "2025-05-10",
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
    description: "The continent-scale central terminal of Reltronland, integrating every mass transit mode except interstellar, and serving as the mobility pulse of Tron Square District.",
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
  },
  {
    title: "Aviashenwelt — Capital of Pasgerflit",
    description: "The diplomatic, civic, and interstellar transit heart of Pasgerflit. Aviashenwelt embodies the aviation soul of Asthortera, built around clarity, movement, and sky-bound consciousness.",
    slug: "aviashenwelt",
    image: "/images/aviashenwelt.webp",
    author: "Rei Reltroner",
    date: "2025-05-16",
    published: true
  },
  {
    title: "🌕 Asthortera's 12 Orbiting Moons and Calendar System",
    description: "A full breakdown of Asthortera’s 12 orbiting moons, their influence on its calendar system, and the symbolic meaning each brings to the planet’s spiritual, cultural, and astronomical life.",
    slug: "asthortera-12-orbiting-moons",
    date: "2025-05-05",
    author: "Rei Reltroner",
    published: true,
    image: "/images/asthortera-12-orbiting-moons.webp"
  },
  {
    title: "🪐 Aurioneira Stellar System Overview & Lore Concepts",
    description: "An expansive overview of the eight worlds orbiting the star Aurioneira—each with unique properties, lore potential, and strategic purpose in the greater sentient narrative of the Asthorteran universe.",
    slug: "aurioneira-system",
    date: "2025-05-05",
    author: "Rei Reltroner",
    published: true,
    image: "/images/aurioneira-system.webp"
  },
  {
    title: "The Galaxy — Reltroner Studio’s Cosmic Setting",
    description: "An astronomical overview of the vast and sentient-rich galactic setting where Asthortera, Depeisit, Cosmeilia, Cistheta, and other civilizations evolve, compete, and align under the light—or shadow—of cosmic ideologies.",
    slug: "the-galaxy",
    author: "Rei Reltroner",
    date: "2025-05-07",
    published: true,
    image: "/images/the-galaxy.webp"
  },
  {
    title: "🕳️ Vanyathra — The Collapsed Realm Beyond the Outer Veil",
    description: "A failed nation consumed by abyssal collapse, located in a smaller planet near the Outer Veil of the galaxy, far beyond the Astralis Core.",
    slug: "vanyathra-abyssborn-nation",
    date: "2025-05-06",
    author: "Rei Reltroner",
    image: "/images/vanyathra-abyssborn-nation.webp",
    published: true
  },
  {
    title: "Amberglow – The Living Archive",
    description: "A secluded bioluminescent forest-settlement where memory is not merely lost, but rewritten by a sentient environment. In Amberglow, peace is purchased at the price of truth—forgotten names vanish from reality itself, and only the bravest dare to remember.",
    slug: "amberglow",
    date: "2025-07-06",
    author: "Rei Reltroner",
    published: true,
    image: "/images/amberglow.webp"
  }
];

export default function Places() {
  return <PlacesClient places={places} />;
}
