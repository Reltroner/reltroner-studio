import CulturesClient from "./CulturesClient";

export const metadata = {
  title: "Cultures",
  description: "Dive into the ethos and daily rituals of Asthortera — where identity, behavior, and belief systems converge into legacies that define civilizations."
};

const cultures = [
  
  {
    title: "Mini Deptic Dictionary: 50+ Root Words",
    description: "A foundational glossary for the Deptic language, used by the people of Depcutland and Depeisit in the Asthortera universe.",
    slug: "mini-deptic-dictionary",
    author: "Reltroner Studio",
    date: "2025-06-01",
    published: true,
    image: "/images/mini-deptic-dictionary.webp"
  },
  {
    title: "Mini Reltronic Dictionary: 50+ Root Words",
    description: "A foundational glossary for the Reltronic language — a hybrid linguistic system forged from Depeisian (Deptic), Cisthetan fluency, and the doctrine of Astralis Pinnacle. Designed as the official language of Reltronland, Reltronic enables high-clarity expression of logic, identity, and transcendence.",
    slug: "reltronic-root-words",
    image: "/images/reltronic-root-words.webp",
    author: "Reltroner Studio",
    date: "2025-06-01",
    published: true
  },
  {
    title: "Crosswalk Dictionary: Deptic ↔ Reltronic ↔ English",
    description: "A multilingual comparative lexicon mapping core concepts between Deptic, Reltronic, and English — illustrating linguistic divergence, doctrinal evolution, and ideological clarity across the twin nations of Depcutland and Reltronland in the Asthortera universe.",
    slug: "crosswalk-dictionary-reltronic-deptic",
    image: "/images/crosswalk-dictionary-reltronic-deptic.webp",
    author: "Reltroner Studio",
    date: "2025-06-01",
    published: true
  },
  {
    title: "📖 Artesian Pictolatin — The Official Language of Pencilfania",
    description: "A classical-visual hybrid language rooted in Latin, Greek, and artistic metaphor, governing the linguistic soul of Pencilfania.",
    image: "/images/artesian-pictolatin-language.webp",
    author: "Reltroner Studio",
    date: "2025-06-03",
    slug: "artesian-pictolatin-language",
    published: true
  },
  {
    title: "🍁 Stelpadien — The Language of Scouts and Seasons",
    description: "A native-tundra ceremonial language rooted in nature, scouting, and seasonal consciousness — the official tongue of Stelpadland.",
    slug: "stelpadien-language",
    image: "/images/stelpadien-language.webp",
    author: "Reltroner Studio",
    date: "2025-06-03",
    published: true
  },
  {
    title: "🛫 Pasgerian — The Language of Aviation and Alignment",
    description: "A high-frequency transit language rooted in aviation, Hawaiian phonetics, and spiritual clarity, spoken by the people of Pasgerflit.",
    slug: "pasgerian-language",
    image: "/images/pasgerian-language.webp",
    author: "Reltroner Studio",
    date: "2025-06-04",
    published: true
  },
  {
    title: "Culture Note: Masks and Mobility in Reltronland",
    description: "An overview of why mask-wearing remains prevalent in Reltronland despite the absence of a health crisis.",
    slug: "mask-reltronland",
    image: "/images/mask-reltronland.webp",
    author: "Rei Reltroner",
    date: "2025-04-04",
  },
  {
    title: "Fashion Culture Manual of Asthortera",
    description: "A comprehensive guide to the visual philosophy, national dress codes, and cultural fusion attire of Reltronland and Depcutland—two supercivilizations united by elegance, discipline, and interplanetary dignity.",
    slug: "fashion-culture",
    image: "/images/fashion-culture.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Major Cultural Exports — Reltronland vs Depcutland",
    description: "An in-depth look at the top cultural exports from Reltronland and Depcutland, showcasing how fashion, literature, music, and architecture shape their global influence across Asthortera.",
    slug: "cultural-exports",
    image: "/images/cultural-exports.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Reltronland",
    description: "Explore how retro jazz, lo-fi instrumentals, and ambient elegance form the rhythmic soul of Reltronland’s white-collar civilization.",
    slug: "reltronland-music",
    image: "/images/reltronland-music.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Music Culture of Depcutland",
    description: "Dive into the solemn grandeur of Depcutland's classical music culture—where orchestral rituals, philosophical soundscapes, and aesthetic discipline echo through marble halls.",
    slug: "depcutland-music",
    image: "/images/depcutland-music.webp",
    author: "Rei Reltroner",
    date: "2025-04-13",
  },
  {
    title: "Aurora Faith of Aurastelia",
    description: "The spiritual foundation of Aurastelia led by Queen Valethra — a radiant path of inner peace, balance, and silent enlightenment.",
    slug: "aurora-faith",
    author: "Rei Reltroner",
    date: "2025-04-14",
    image: "/images/aurora-faith.webp"
  },
  {
    title: "The Timber Soul of Stelpadland",
    description: "A cultural deep dive into Stelpadland’s sacred woodcraft — where every tree is memory, every furniture is legacy, and every act of reboisation is a vow of harmony.",
    slug: "timber-soul-stelpadland",
    author: "Rei Reltroner",
    date: "2025-05-14",
    tags: ["Stelpadland", "Timber Culture", "Worldbuilding", "Nature Integration", "Cultural Lore"],
    image: "/images/timber-soul-stelpadland.webp",
    published: true
  },
  {
    title: "Culinary Rituals of Stelpadland",
    description: "A deep look into the food culture of Stelpadland—where meals are seasonal ceremonies, salmon is smoked in silence, and even tea holds the memory of forests.",
    slug: "stelpadland-culinary",
    author: "Rei Reltroner",
    date: "2025-05-14",
    tags: ["Stelpadland", "Culinary Lore", "Worldbuilding", "Nature Rituals", "Cultural Food"],
    image: "/images/stelpadland-culinary.webp",
    published: true
  },
  {
    title: "🎀 Cute Culture Manifesto of Reltronland",
    description: "An official guide to the rise, values, and fashion identity of Cosmic Cute Culture in Reltronland, shaped by meritocracy, interplanetary youth, and the legacy of Cosmeilia.",
    slug: "cute-culture-reltronland",
    image: "/images/cute-culture-reltronland.webp",
    author: "Rei Reltroner",
    date: "2025-05-16",
    published: true
  },
  {
    title: "Reltronland Robot Combat: Inter-Civilization Olympics Edition",
    description: "An original competitive sport from Reltronland where robots battle across physical and virtual control systems — featured in the Asthortera-wide Olympics.",
    slug: "reltronland-robot-combat",
    image: "/images/reltronland-robot-combat.webp",
    author: "Rei Reltroner",
    date: "2025-07-27",
    published: true
  },
  {
    title: "Aurora Synthesia — The Sacred Dance of Sci-Fantasy Integration",
    description: "Traditional ceremonial dance of Aurastelia that celebrates the harmony between futuristic technology and ancient spirituality.",
    slug: "aurora-synthesia-ritual-dance",
    image: "/images/aurora-synthesia-ritual-dance.webp",
    author: "Reltroner Studio",
    date: "2025-07-27",
    published: true,
    tags: ["aurastelia", "culture", "aurora", "dance", "sci-fi", "fantasy", "worldbuilding"]
  },
  {
    title: "Reltronland Mealtime Etiquette",
    description: "Cultural protocol in Reltronland that respects cognitive recovery and health during meals, forbidding unnecessary verbal disruptions unless urgent.",
    slug: "reltronland-mealtime-etiquette",
    image: "/images/reltronland-mealtime-etiquette.webp",
    author: "Reltroner Studio",
    date: "2025-07-31",
    published: true,
    tags: ["reltronland", "etiquette", "mealtime", "ethics", "sentient-health", "astralis-pinnacle"]
  },
  {
    title: "Castela Jiggly Cake — Culinary Symbol of Reltronland",
    description: "Fusion cake filled with mozzarella, carbonara, and melting cheese — the iconic functional food for Reltronland’s white-collar society.",
    slug: "castela-jiggly-cake-reltronland",
    author: "Reltroner Studio",
    date: "2025-08-02",
    published: true,
    tags: ["reltronland", "castela", "culinary", "culture", "food-identity", "white-collar"],
    image: "/images/castela-jiggly-cake-reltronland.webp"
  },
  {
    title: "📜 Reltronland Meeting Manifesto",
    description: "Discover how Reltronland redefines meetings with a culture of pure efficiency, no excessive formalities, and true meritocracy — a new global standard for collaboration.",
    slug: "meeting-reltronland",
    author: "Reltroner Studio",
    date: "2025-04-16",
    published: true,
    image: "/images/meeting-reltronland.webp"
  },
  {
    title: "Top 5 Clichés Destroyed by the Gender Friendship Manifesto",
    description: "A deconstruction of outdated tropes by Asthortera’s mature philosophy of sentient connection.",
    slug: "anti-klise-gender-friendship",
    author: "Reltroner Studio",
    date: "2025-04-16",
    image: "/images/anti-klise-gender-friendship.webp"
  },
  {
    title: "Gender Friendship Manifesto of Asthortera",
    description: "A cultural doctrine that redefines friendship across genders without stigma, cringe, or romantic overtones.",
    slug: "gender-friendship-manifesto",
    author: "Reltroner Studio",
    date: "2025-04-16",
    published: true,
    image: "/images/gender-friendship-manifesto.webp"
  },
  {
      title: "Sacred Rest Policy",
      description: "Reltroner Studio's official stance on intentional rest as a pathway to deeper creativity and sustained mental strength.",
      slug: "rest-culture",
      author: "Rei Reltroner",
      date: "2025-04-05",
      published: true,
      image: "/images/rest-culture.webp"
  },
  {
      title: "The Cuteness Manifesto: Softness Within Strength",
      description: "Cuteness isn’t a trend. It’s a weapon. Reltroner Studio shows how softness becomes strategy in a world built on mental warfare.",
      slug: "cuteness-manifesto",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/cuteness-manifesto.webp"
  },
  {
      title: "Children of Asthortera",
      description: "An exploration of the sentient, curious, and emotionally resilient children in the world of Asthortera.",
      slug: "children-of-asthortera",
      author: "Rei Reltroner",
      date: "2025-04-06",
      published: true,
      image: "/images/children-of-asthortera.webp"
  },
  {
    title: "Children of Reltronland: A Trust-Based Society",
    description: "From birth to independence, children in Reltronland grow through empathy, curiosity, and civic trust—reshaping the meaning of growing up.",
    slug: "children-reltronland",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/children-reltronland.webp"
  },
  {
    title: "🧳 Returning to Serve: Why Citizens of Reltronland Work Where They Were Once Raised",
    description: "In Reltronland, many adults choose to work at the very stations, terminals, and public spaces that raised them—honoring the places that once gave them clarity, comfort, and trust.",
    slug: "returning-to-serve-reltronland",
    author: "Rei Reltroner",
    date: "2025-05-04",
    published: true,
    image: "/images/returning-to-serve-reltronland.webp"
  },

];

export default function Cultures() {
  return <CulturesClient cultures={cultures} />;
}
