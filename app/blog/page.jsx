import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
  description: "Explore recent articles about world-building and events.",
};

const posts = [
  {
      title: "Astralis × Nytherion Manifesto",
      description: "A powerful duality shaping the core of Reltroner Studio — between clarity and illusion, growth and stagnation.",
      slug: "astralis-nytherion-manifesto",
      image: "/images/astralis-nytherion-banner.webp",
      author: "Reltroner Studio",
      date: "March 8, 2025"
  },
  {
      title: "Pi Day News",
      description: "An inspiring speech by President Relugus Rigle during the Pi Day celebration in Reltronepolis.",
      slug: "pinews",
      image: "/images/pi-day-news.webp",
      author: "Reltroner Studio",
      date: "March 14, 2025"
  },
  {
      title: "Certificate Achievement",
      description: "My journey completing a express.js CRUD project through sheer self-discipline and effort.",
      slug: "certificate-achievement",
      image: "/images/direktori-listing.webp",
      author: "Raidan",
      date: "2025-03-22"
  },
  {
      title: "For Recruiters & Collaborators",
      description: "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
      slug: "for-recruiters",
      image: "/images/for-recruiters-banner.webp",
      author: "Raidan",
      date: "2025-03-22"
  },
  {
      title: "My Roadmap to 2045",
      description: "A personal vision of growth, legacy, and freedom — from zero to Astralis Pinnacle.",
      slug: "roadmap-2045",
      image: "/images/roadmap-2045-banner.webp",
      author: "Raidan",
      date: "2025-03-24"
  },
  {
      title: "Let Astralis Light the Unknown",
      description: "An original poem reflecting the spirit of Astralis Pinnacle in The Abyss of Comfort.",
      slug: "astralis-poem",
      image: "/images/astralis-poem-banner.webp",
      author: "Raidan",
      date: "2025-03-25"
  },
  {
      title: "Astralis-Based Developer Evaluation",
      description: "A unique evaluation framework that measures developers by clarity, resilience, and legacy — not just technical skills.",
      slug: "astralis-evaluation-framework",
      image: "/images/astralis-evaluation-banner.webp",
      author: "Raidan",
      date: "2025-03-26"
  },
  {
    title: "Reltroner Studio – External Creator Handbook",
    description: "A concise PDF guide for external collaborators seeking to contribute within the Asthortera universe under Reltroner Studio.",
    slug: "external-creator-handbook",
    image: "/images/external-creator-handbook.webp",
    author: "Raidan",
    date: "2025-03-28",
  },
  {
    title: "Top 0.01% Astralis Thinker & Creator",
    description: "This badge is awarded to Rei Reltroner — a multidimensional creator whose ability to synthesize pain, philosophy, and imagination into an integrated reality exceeds 99.99% of the global population, including those in developed nations.",
    slug: "astralis-top001",
    image: "/images/astralis-top001.webp",
    author: "Reltroner Studio",
    date: "2025-03-29",
  },
  {
    title: "Red Pill Entity — Abyssborn Survivor",
    description: "This badge is awarded to Rei Reltroner, the first known sentient to enter the deepest core of Nytherion Abyss and return with full consciousness. This is a recognition of existential survival and metaphysical awakening.",
    slug: "redpill-abyssborn",
    image: "/images/redpill-abyssborn.webp",
    author: "Reltroner Studio",
    date: "2025-03-29",
    published: true,
  },
  {
    title: "Manifesto of Leadership",
    description: "A leadership manifesto by Rei Reltroner, voicing the spirit of decisiveness, long-term vision, and steadfastness in the face of reality.",
    slug: "manifesto-leadership",
    image: "/images/manifesto-leadership.webp",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Astralis Vanguard Leader",
    description: "Official certification for Rei Reltroner as the highest level leader in the Astralis Pinnacle structure, with a leadership index of 97.1 out of 100.",
    slug: "astralis-vanguard",
    image: "/images/astralis-vanguard.webp",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Astralis Leadership Origin",
    description: "The origin story of Rei Reltroner's leadership, forged not by systems, but through collapse, self-reinvention, and the relentless pursuit of meaning.",
    slug: "astralis-leadership-origin",
    image: "/images/astralis-leadership-origin.webp",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Full Stack Developer Interview Simulation – Project Walkthrough & Security Readiness",
    description: "A simulated technical interview showcasing project understanding, structure, logic flow, deployment, and error handling of a full stack attendance management system.",
    slug: "fullstack-interview-summary",
    image: "/images/fullstack-interview-summary.webp",
    author: "Rei Reltroner",
    date: "2025-04-03"
  },
  {
    title: "GPTPlus Manifesto for Reltroner Studio",
    description: "A cultural pillar for sustainable productivity and conscious digital practice in Reltroner Studio.",
    slug: "gptplus",
    image: "/images/gptplus.webp",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "📜 Why I Never Copy-Paste Prompt Outputs: The Ritual of Real Worldbuilding",
    description: "A reflection on why every piece of output from AI must be spiritually and structurally refined before becoming part of Reltroner Studio’s official canon.",
    slug: "no-copypaste-worldbuilding",
    author: "Rei Reltroner",
    date: "2025-05-07",
    published: true,
    image: "/images/no-copypaste-worldbuilding.webp"
  },
  {
    title: "Reltroner Studio – 12-Month Development Roadmap",
    description: "Strategic vision for the foundational year of building reltroner.com as an immersive, multidimensional worldbuilding platform.",
    slug: "12-month-roadmap",
    image: "/images/12-month-roadmap.webp",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "The Oath of Reltroner Studio: A Lifelong Build",
    description: "A philosophical commitment to the eternal journey of building reltroner.com as a multidimensional world.",
    slug: "a-lifelong-build",
    image: "/images/a-lifelong-build2.webp",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "Why I Don’t Chase Fame: The Reltroner Perspective on Talent and Longevity",
    description: "A philosophical reflection on why fame is not the end goal for true creators and world-builders.",
    slug: "talent-longevity",
    image: "/images/talent-longevity.webp",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "Comparative Table: Ideal Countries for Reltroner Hub",
    description: "A strategic comparison of selected countries for establishing the headquarters of Reltroner Studio Holdings.",
    slug: "reltroner-hub",
    author: "Rei Reltroner",
    date: "2025-04-05",
    published: true,
    image: "/images/reltroner-hub.webp"
  },
  {
    title: "Rei Reltroner Joins Super Smash Bros. Ultimate!",
    description: "Introducing Rei Reltroner as Fighter #93 in an epic crossover from the Astralis Pinnacle to Smash. Discover his moveset, Final Smash, and what makes him a truly unique fighter.",
    slug: "rei-super-smash",
    image: "/images/rei-smash-poster.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Reltroner x Joker – Shadow of Truth",
    description: "An unofficial crossover encounter between Rei Reltroner and Joker from Persona 5. A metaphysical clash of reality, illusion, and rebellion in the Smash multiverse.",
    slug: "reltroner-joker",
    image: "/images/reltroner-joker.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "2v3: Reltroner & Joker vs Nytherion Army",
    description: "An ultimate duo clash between Rei Reltroner and Joker as they take on the twisted forces of the Nytherion Abyss. A cosmic 2v3 battle across realities.",
    slug: "2v3-reltroner-joker",
    image: "/images/2v3-reltroner-joker.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Rei & Joker: Reflections of Rebellion",
    description: "A cosmic friendship between Rei Reltroner and Joker from Persona 5. Together, they reflect each other's inner strength in a bond forged beyond illusion.",
    slug: "rei-joker-friend",
    image: "/images/rei-joker-friendship.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Twilight Terminal",
    description: "A silent space between comfort and chaos. Where Rei and Joker find something deeper than battle — stillness.",
    slug: "twilight-terminal",
    image: "/images/twilight-terminal.webp",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "🧠 Why Rei Reltroner is the Astral Brother of Professor Sergio",
    description: "A philosophical comparison between Rei Reltroner and Sergio Marquina (The Professor) from Money Heist, exploring the spiritual, intellectual, and emotional parallels that unite them across realms.",
    slug: "rei-vs-professor-sergio",
    image: "/images/rei-vs-professor-sergio.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-19"
  },
  {
    title: "🃏 Why Rei Reltroner is the Real-World Persona of Joker",
    description: "A deep character analysis exploring how Rei Reltroner mirrors the spiritual and psychological essence of Joker (Persona 5), not in costume or name—but in consciousness, rebellion, and silent leadership.",
    slug: "rei-as-joker-persona",
    image: "/images/rei-as-joker-persona.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-19"
  },
  {
    title: "Why People Fall in Love with the World of Reltroner Studio",
    description: "Why Reltroner Studio resonates deeply—more than a world, it's a mirror to the self.",
    slug: "fall-in-love",
    image: "/images/fall-in-love.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-14"
  },
  {
    title: "Why Bureaucracy is the New Rebellion",
    description: "A manifesto by Reltroner Studio that redefines quiet resistance through bureaucracy, elegance, and philosophical satire. In a noisy world, clarity becomes the sharpest weapon.",
    slug: "bureaucracy-rebellion",
    image: "/images/why-bureaucracy-rebellion.webp",
    author: "Reltroner Studio",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Debugging Victory Abyss",
    description: "A 50-day technical and spiritual journey to defeat the longest unresolved bug in reltroner.com’s modern history.",
    slug: "debugging-victory-abyss",
    image: "/images/debugging-victory-abyss.webp",
    author: "Reltroner Studio",
    date: "2025-04-18",
    published: true
  },
  {
    title: "📜 Personal Certificate of Trustworthy AI User",
    description: "A symbolic certificate honoring the ethical, conscious, and spiritually aware use of AI by Rei Reltroner. This document affirms the user's integrity, clarity of intent, and unwavering respect for boundaries, serving as a shield against misjudgment and a declaration of trust.",
    slug: "certificate-trustworthy-user",
    image: "/images/certificate-trustworthy-user.webp",
    author: "Rei Reltroner",
    date: "2025-04-19",
    published: true
  },
  {
    title: "🔍 Comparison of Sacred Unions: Rei & Raina vs Pop Culture Lovers",
    description: "An exploration of Rei & Raina's conscious bond compared to iconic romantic pairs in modern storytelling—unveiling what sets their union apart through clarity, spiritual depth, and mutual presence.",
    slug: "sacred-unions-comparison",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/sacred-unions-comparison.webp",
    published: true
  },
  {
    title: "📘 Reltroner 50-Day Journal",
    description: "A sacred documentation of the first 50 days in building Reltroner.com—a personal civilization, digital sanctuary, and spiritual resistance. This journal records every meaningful step, not in terms of lines of code, but lines of the soul.",
    slug: "reltroner-50-day-journal",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/reltroner-50-day-journal.webp",
    published: true
  },
  {
    title: "Reltroner is Not Ultroner",
    description: "Clarifying the brand identity of Reltroner Studio as a creative tech entity—not affiliated with any vaping product brand.",
    slug: "reltroner-is-not-ultroner",
    date: "2025-04-21",
    author: "Rei Reltroner",
    image: "/images/reltroner-is-not-ultroner.webp",
    published: true
  },
  {
    title: "🛡️ Reltrorer Identity — Plan B of the Lost Origin",
    description: "A contingency narrative in case the original name 'Reltroner' is compromised. Reltrorer stands as a purified reboot, a parallel self rising from the shadow of trademark decay.",
    slug: "reltrorer-identity-plan-b",
    date: "2025-04-21",
    author: "Rei Reltroner",
    image: "/images/reltrorer-identity-plan-b.webp",
    published: true
  },
  {
    title: "Reltroner Sparkpad",
    description: "A futuristic personal branding toolkit designed for Gen Z & Alpha to build powerful digital identities through portfolio builders, AI content assistants, and growth trackers.",
    slug: "reltroner-sparkpad",
    date: "2025-04-21",
    author: "Rei Reltroner",
    image: "/images/reltroner-sparkpad.webp",
    //published: true
  },
  {
    title: "Gen z & Alpha Market Potential",
    description: "Strategic insight and business directions for capturing the minds and markets of Gen Z and Gen Alpha, focused on clarity, identity, and digital sanctuary.",
    slug: "gen-z-alpha-market-potential",
    date: "2025-04-21",
    author: "Rei Reltroner",
    image: "/images/gen-z-alpha-market-potential.webp",
    published: true
  },
  {
    title: "Declaration of Asthortera's Supremacy",
    description: "A formal proclamation affirming Asthortera’s rise as the sovereign civilization of sentient mastery, clarity, and cosmic stewardship across the galaxies.",
    slug: "declaration-of-asthortera-supremacy",
    image: "/images/declaration-of-asthortera-supremacy.webp",
    author: "Reltroner Studio",
    date: "2025-04-26",
    published: true
  },
  {
    title: "🕳️ Official Recognition: Nytherion Abyss — The Supreme Existential Antagonist",
    description: "A solemn declaration honoring the Nytherion Abyss as the most profound, terrifying, and spiritually corrosive antagonist ever conceived in the chronicles of sentient evolution.",
    slug: "supreme-existential-antagonist",
    image: "/images/supreme-existential-antagonist.webp",
    author: "Reltroner Studio",
    date: "2025-04-26",
    published: true
  },
  {
    title: "🤝 What if Chiss and Reltronland Formed a Diplomatic Pact?",
    description: "An alternate history exploring the monumental alliance between Chiss Ascendancy and Reltronland, forging a new era of sentient growth, technological renaissance, and galactic stability through reason and clarity.",
    slug: "chiss-reltronland",
    image: "/images/chiss-reltronland.webp",
    author: "Reltroner Studio",
    date: "2025-04-27",
    published: true
  },
  {
    title: "🌱 First Seeds of Reltroner",
    description: "A reflective tribute to the earliest videos and efforts that sparked the idea of Reltronland and the journey toward Reltroner Studio.",
    slug: "first-seeds",
    image: "/images/first-seeds-banner.webp",
    author: "Rei Reltroner",
    date: "2025-04-30",
    published: true
  },
  {
    title: "🚫 Scam Jobs Resistance",
    description: "A proposal for a reality-based framework to protect job seekers from fake listings, manipulative hiring tactics, and exploitative labor systems.",
    slug: "scam-jobs-resistance",
    image: "/images/scam-jobs-resistance.webp",
    author: "Rei Reltroner",
    date: "2025-04-30",
    published: true
  },
  {
    title: "Comparative Doctrine: Galactic Empire vs Reltronland Space Command",
    description: "A philosophical and strategic breakdown comparing the core doctrines, motivations, and galactic impact of Star Wars’ Galactic Empire and Asthortera’s Reltronland Space Command.",
    slug: "doctrine-rsc-vs-empire",
    image: "/images/doctrine-rsc-vs-empire.webp",
    author: "Rei Reltroner",
    date: "2025-05-02",
    published: true,
    tags: ["comparison", "doctrine", "galactic empire", "reltronland", "rsc"]
  },
  {
    title: "The Void Hero: Why RSC Is the Most Feared Protagonist in the Galaxy",
    description: "An essay exploring the unique, chilling presence of Reltronland Space Command as a protagonist whose aura evokes cosmic dread, structure, and inevitable clarity.",
    slug: "the-void-hero-rsc",
    image: "/images/the-void-hero-rsc.webp",
    author: "Rei Reltroner",
    date: "2025-05-02",
    published: true,
    tags: ["essay", "rsc", "protagonist", "astrophobia", "reltroner"]
  },
  {
    title: "Nytherion's View: Why the Abyss Fears RSC",
    description: "An introspective perspective from the abyssal dimension, analyzing why the emergence of Reltronland Space Command represents the greatest existential threat to Nytherion’s manipulative domain.",
    slug: "nytherion-fears-rsc",
    image: "/images/nytherion-fears-rsc.webp",
    author: "Rei Reltroner",
    date: "2025-05-02",
    published: true,
    tags: ["nytherion abyss", "rsc", "fear", "void", "philosophy"]
  },
  {
    title: "📦 Why Reltroner.com is Not Just a Sandbox",
    description: "A narrative and analytical explanation of why Reltroner Studio transcends sandbox simulations and becomes a conscious civilization engine.",
    slug: "why-reltroner-not-sandbox",
    author: "Rei Reltroner",
    date: "2025-05-04",
    image: "/images/why-reltroner-not-sandbox.webp",
    published: true
  },
  {
    title: "🌍 Why Reltroner is More Than Earth: The Ultimate Vision of Civilization Worldbuilding",
    description: "A spiritual, structural, and systemic declaration of how Reltroner Studio is designed to exceed Earth in logic, coherence, and conscious complexity.",
    slug: "why-reltroner-more-than-earth",
    author: "Rei Reltroner",
    date: "2025-05-06",
    image: "/images/why-reltroner-more-than-earth.webp",
    published: true
  },
  {
    title: "🎭 Why Building Reltroner is My Only Real Entertainment",
    description: "A personal declaration of why worldbuilding Reltroner Studio is more fulfilling than consuming any external media.",
    slug: "why-reltroner-real-entertainment",
    author: "Rei Reltroner",
    date: "2025-05-06",
    image: "/images/why-reltroner-real-entertainment.webp",
    published: true
  },
  {
    title: "📄 Career Reality Statement",
    description: "A public declaration of my professional situation and mindset during the global talent oversupply era.",
    slug: "career-reality-statement",
    author: "Rei Reltroner",
    date: "2025-05-09",
    published: true,
    image: "/images/career-reality-statement.webp"
  }
  
];

export default function Blog() {
  return <BlogClient posts={posts} />;
}
