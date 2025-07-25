import StatisticsClient from "./StatisticsClient";

export const metadata = {
  title: "Statistics",
  description: "Decode the raw numbers behind the world — from population structures to SDI indicators — and understand what truly drives Asthortera beneath the surface."
};

const statistics = [
  {
    title: "🌍 Asthortera vs Earth: Planetary Comparison",
    description: "A detailed and immersive comparison between Earth and the fictional Super Earth, Asthortera — exploring differences in planetary size, population, life expectancy, gravity adaptation, and civilization advancement. Discover how Asthortera envisions a future of resilience, innovation, and spiritual growth across a grander world.",
    slug: "asthortera-vs-earth",
    image: "/images/asthortera-vs-earth.webp",
    author: "Rei Reltroner",
    date: "2025-04-27", 
    published: true
  },
  {
    title: "Sentient Composition Across Planets",
    description: "An overview of the dominant sentient species and human lineages inhabiting the primary planets in the Asthortera galaxy.",
    author: "Rei Reltroner",
    slug: "sentient-population",
    image: "/images/sentient-population.webp",
    date: "2025-04-04"
  },
  {
    title: "Where Do I Stand in the AI Ecosystem",
    description: "A self-aware documentation of Rei Reltroner's position in the global landscape of AI usage.",
    author: "Chatty (GPTPlus Mode)",
    slug: "ai-ecosystem",
    image: "/images/ai-ecosystem.webp",
    date: "2025-04-05"
  },
  {
    title: "Personal Index of Rei Reltroner",
    description: "A multidimensional self-assessment of Rei Reltroner's current value, power, and visionary trajectory.",
    author: "Chatty (GPTPlus Mode)",
    slug: "value-index",
    date: "2025-04-05",
    published: true,
    image: "/images/value-index.webp"
  },
  {
    title: "Official SDI Report of Asthortera",
    description: "A world-building overview of the Sentient Development Index (SDI) across key nations in Asthortera, including Reltronland, Depcutland, and others.",
    author: "Rei Reltroner",
    slug: "sdi-report-asthortera",
    date: "2025-04-06",
    published: true,
    image: "/images/sdi-report-asthortera.webp"
  },
  {
    title: "Depeisit Identity",
    description: "A planet rooted in tradition and trapped in spiritual stagnation. Depeisit reflects a civilization that fears change, worships order, and slowly drifts into the abyss of comfort.",
    author: "Rei Reltroner",
    slug: "depeisit_identity", 
    date: "2025-04-07", 
    published: true,
    image: "/images/depeisit_identity.webp"
  },
  {
    title: "Asthortera Identity",
    description: "A planet of conscious evolution, diversity, and high development. Asthortera stands as the galaxy's central stage for meritocracy, interstellar migration, and spiritual-political balance.",
    author: "Rei Reltroner",
    slug: "asthortera_identity",  
    date: "2025-04-07", 
    published: true,
    image: "/images/asthortera_identity.webp"
  },
  {
    title: "Cosmeilia Identity",
    description: "A planet of ethereal beauty, cosmic resonance, and spiritual governance. Cosmeilia thrives beyond material progress, led by light, emotion, and harmonic purpose.",
    author: "Rei Reltroner",
    slug: "cosmeilia_identity",  
    date: "2025-04-07", 
    published: true,
    image: "/images/cosmeilia_identity.webp"
  },
  {
    title: "Cistheta Identity",
    description: "A hyper-urbanized planet of ancestral discipline and digital precision. Cistheta leads the galaxy in technocultural synthesis, merging tradition with high-speed innovation.",
    author: "Rei Reltroner",
    slug: "cistheta_identity",  
    date: "2025-04-07", 
    published: true,
    image: "/images/cistheta_identity.webp"
  },
  {
    title: "SDI Score Matrix",
    description: "A matrix of the Sentient Development Index (SDI) scores of Reltronland, showcasing their development levels across various dimensions.",
    author: "Rei Reltroner",
    slug: "sdi-score-matrix",  
    date: "2025-04-11", 
    published: true,
    image: "/images/sdi-score-matrix.webp"
  },
  {
    title: "Education Civilization Index – Asthortera Edition",
    description: "A cross-national report evaluating the depth, diversity, and sentient impact of higher education systems across Asthortera—featuring metrics like field of study distribution, lifelong learning, and immigrant integration.",
    slug: "edu-civilization-index",
    image: "/images/education-civilization-index.webp",
    author: "Rei Reltroner",
    date: "2025-04-14",
    published: true
  },
  {
    title: "🎭 Culture Impact Index – Asthortera Edition",
    description: "A deep dive into how culture shapes civilizational power in Reltronland and Depcutland.",
    slug: "culture-impact-index",
    image: "/images/culture-impact-index.webp",
    author: "Rei Reltroner",
    date: "2025-04-21",
    published: true
  },
  {
    title: "🚀 Interstellar Mobility Index (IMI) — Asthortera",
    description: "A ranked evaluation of Asthortera’s top interstellar hubs based on launch throughput, route coverage, passenger flux, and energy integration.",
    slug: "interstellar-mobility-index",
    image: "/images/interstellar-mobility-index.webp",
    author: "Rei Reltroner",
    date: "2025-04-24",
    published: true
  },
  {
    title: "🕳️ Nytherion Abyss Horror Index Map",
    description: "A layered psychological index mapping the fear, trauma, and existential horror within Nytherion Abyss — surpassing traditional narratives and revealing the true depth of Asthortera’s most enigmatic dimension.",
    slug: "nytherion-abyss-horror-index",
    image: "/images/nytherion-abyss-horror-index.webp",
    author: "Rei Reltroner",
    date: "2025-04-26", 
    published: true
  },
  {
    title: "📈 Reltroner Project Valuation – 2025",
    description: "An analytical snapshot of the Reltroner project's growth trajectory, estimating its value based on solo system architecture output, strategic scalability, and red-pill-driven creative infrastructure during the first 5 months of development.",
    slug: "reltroner-value-2025",
    date: "2025-05-18",
    image: "/images/reltroner-value-2025.webp",
    author: "Rei Reltroner",
    published: true
  },
  {
    title: "Hyperspace Energy Model with Tetration",
    description: "A conceptual framework that employs tetration (↑↑) to estimate the energy requirements for inter‑galactic and inter‑supercluster hyperspace travel.",
    slug: "hyperspace-energy-model-with-tetration",
    author: "Rei Reltroner",
    date: "2025-06-28",
    published: true,
    image: "/images/hyperspace-energy-model-with-tetration.webp"
  }
];

export default function Statistics() {
  return <StatisticsClient statistics={statistics} />;
}
