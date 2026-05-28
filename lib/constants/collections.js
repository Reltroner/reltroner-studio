/** @typedef {import('@/types/content').ContentCollectionDefinition} ContentCollectionDefinition */
/** @typedef {import('@/types/content').ContentCollectionKey} ContentCollectionKey */

/** @type {Record<ContentCollectionKey, ContentCollectionDefinition>} */
export const COLLECTIONS = {
  blog: {
    key: "blog",
    title: "Blog",
    description: "Explore recent articles about world-building and events.",
    route: "/blog",
    contentDir: "blog",
    group: "Journal",
    schemaType: "Article",
    openGraphType: "article",
  },
  characters: {
    key: "characters",
    title: "Characters",
    description: "Explore the living minds that shape Asthortera's destiny.",
    route: "/characters",
    contentDir: "characters",
    group: "Worldbuilding",
    schemaType: "Person",
    openGraphType: "profile",
  },
  cultures: {
    key: "cultures",
    title: "Cultures",
    description:
      "Dive into the ethos and daily rituals of Asthortera — where identity, behavior, and belief systems converge into legacies that define civilizations.",
    route: "/cultures",
    contentDir: "cultures",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  events: {
    key: "events",
    title: "Events",
    description:
      "A living archive of world-shaping phenomena in Asthortera — from revolutions in spiritual philosophy to technological uprisings, and from interdimensional conflicts to peaceful cultural summits.",
    route: "/events",
    contentDir: "events",
    group: "Worldbuilding",
    schemaType: "Event",
    openGraphType: "article",
  },
  factions: {
    key: "factions",
    title: "Factions",
    description:
      "Discover the major ideological factions that shape the destiny of Asthortera — from cyber-meritocratic nations to shadow organizations and metaphysical cults.",
    route: "/factions",
    contentDir: "factions",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  items: {
    key: "items",
    title: "Items",
    description:
      "A curated catalog of Asthortera artifacts and relics—explore the objects, from Abyss Ritual Items to future worldbuilding essentials, that give life to the Reltroner Studio universe.",
    route: "/items",
    contentDir: "items",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  laws: {
    key: "laws",
    title: "Laws",
    description:
      "Explore foundational laws and interplanetary regulations that shape justice, labor, and order across Asthortera.",
    route: "/laws",
    contentDir: "laws",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  myths: {
    key: "myths",
    title: "Myths",
    description:
      "A curated archive of forgotten myths, cosmic signals, and whispered artifacts from Asthortera — documenting the invisible truths behind Nytherion, Astralis, and the sentient soul's inner war.",
    route: "/myths",
    contentDir: "myths",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  organizations: {
    key: "organizations",
    title: "Organizations",
    description:
      "A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world's creative, economic, and ideological future.",
    route: "/organizations",
    contentDir: "organizations",
    group: "Worldbuilding",
    schemaType: "Organization",
    openGraphType: "article",
  },
  philosophies: {
    key: "philosophies",
    title: "Philosophies",
    description:
      "Explore the core ideologies, spiritual codes, and existential beliefs that shape every civilization, character, and conflict across Asthortera.",
    route: "/philosophies",
    contentDir: "philosophies",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  places: {
    key: "places",
    title: "Places",
    description:
      "Journey through cities, ruins, and forgotten dimensions — each with their own pulse, memory, and power in the grand chronicle of Asthortera.",
    route: "/places",
    contentDir: "places",
    group: "Worldbuilding",
    schemaType: "Place",
    openGraphType: "article",
  },
  principles: {
    key: "principles",
    title: "Principles",
    description:
      "The Principles page is the forge where the Reltroner Saga's core ideologies are born, refined, and immortalized. Here, ideas like the abolition of feudalism and the rise of spiritual meritocracy form the backbone of Rei Reltroner's legacy.",
    route: "/principles",
    contentDir: "principles",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  series: {
    key: "series",
    title: "Series",
    description:
      "Unravel the character-driven sagas across multiple timelines — where political tension, cosmic mysteries, and inner wars shape Asthortera's fate.",
    route: "/series",
    contentDir: "series",
    group: "Worldbuilding",
    schemaType: "Article",
    openGraphType: "article",
  },
  statistics: {
    key: "statistics",
    title: "Statistics",
    description:
      "Decode the raw numbers behind the world — from population structures to SDI indicators — and understand what truly drives Asthortera beneath the surface.",
    route: "/statistics",
    contentDir: "statistics",
    group: "Engineering",
    schemaType: "Dataset",
    openGraphType: "article",
  },
  technologies: {
    key: "technologies",
    title: "Technologies",
    description:
      "Explore the most advanced, AI-regulated technologies across Asthortera — from hyper-speed transit systems to sentient atmospheric control grids, built to sustain a cyber-meritocratic civilization.",
    route: "/technologies",
    contentDir: "technologies",
    group: "Engineering",
    schemaType: "TechArticle",
    openGraphType: "article",
  },
};

export const COLLECTION_ORDER = Object.keys(COLLECTIONS);

export function getCollectionConfig(collection) {
  return COLLECTIONS[collection] || null;
}