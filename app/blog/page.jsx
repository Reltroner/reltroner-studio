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
  },
  {
    title: "First Contact",
    description: "A spiritual and historical log of the first human resonance ever recorded from the outer world — toward the quiet universe of Reltroner Studio.",
    slug: "first-contact",
    author: "Rei Reltroner",
    date: "2025-05-11",
    published: true,
    image: "/images/first-contact.webp"
  },
  {
    title: "The Only IT Worldbuilder",
    description: "A bold declaration of an emerging new archetype — a builder in tech who doesn't just deploy code, but constructs civilization from collapse.",
    slug: "the-only-it-worldbuilder",
    author: "Rei Reltroner",
    date: "2025-05-11",
    published: true,
    image: "/images/the-only-it-worldbuilder.webp"
  },
  {
    title: "Irreplaceable Value Statement – Rei Reltroner",
    description: "A strategic declaration of why Rei Reltroner cannot be replaced by conventional developers or AI. Forged through collapse, clarity, and sovereignty, this manifesto outlines the rare blend of system architecture, red pill philosophy, and battle-tested vision that defines Reltroner's irreplaceable value in the AI era.",
    slug: "irreplaceable-value",
    image: "/images/irreplaceable-value.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-05-15"
  },
  {
    title: "From Loss to Systems — My Collapse Blueprint",
    description: "A reflective chronicle on how failure, pressure, and existential despair forged the birth of Reltroner Studio.",
    slug: "from-loss-to-systems",
    author: "Rei Reltroner",
    published: true,
    date: "2025-05-18",
    image: "/images/from-loss-to-systems.webp"
  },
  {
    title: "When Fiction Summons Reality: Case Studies from the Astralis Archives",
    description: "An investigative exploration into how powerful fictional narratives—from snakes on planes to predictive pandemics—have echoed into real-world events, as archived by the Astralis Pinnacle research division.",
    slug: "fiction-summons-reality",
    author: "Rei Reltroner",
    date: "2025-05-24",
    published: true,
    image: "/images/fiction-summons-reality.webp"
  },
  {
    title: "Why Reltroner Rejects Final Destination: A Manifesto of Hope, Clarity, and Determination",
    description: "A philosophical and narrative contrast between the fatalistic horror of Final Destination and the empowering ethos of Reltroner Studio — where death is not the end, but a frontier to transcend through hope, clarity, and perpetual struggle.",
    slug: "rejects-final-destination",
    image: "/images/rejects-final-destination.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-05-25"
  },
  {
    title: "Reflection: From Years of Debugging Pain to Compounding Mastery",
    description: "A personal journey from helpless debugging loops to exponential mastery — proof that persistence and compounding growth turn pain into power.",
    slug: "debugging-compounding",
    image: "/images/debugging-compounding.webp",
    author: "Reltroner Studio",
    date: "2025-05-30",
    published: true
  },
  {
    title: "Declaration of Academic Liberation",
    description: "A powerful manifesto rejecting academic feudalism and intellectual suppression, this declaration empowers visionary students to rise above outdated systems, embrace self-directed learning, and reclaim their educational sovereignty through clarity, courage, and purpose.",
    slug: "declaration-academic-liberation",
    image: "/images/declaration-academic-liberation.webp",
    author: "Reltroner Studio",
    date: "2025-05-28",
    published: true
  },
  {
    title: "The ADHD Builder: When Systems Fail to Understand You",
    slug: "adhd-builder",
    description: "A personal legacy for those who never felt seen by traditional education, but found their power through building.",
    image: "/images/adhd-builder.webp",
    date: "2025-06-06",
    author: "Reltroner Studio",
    published: true
  },
  {
    title: "Why Japan is the Earth’s Closest Equivalent to Asthortera",
    description: "An in-depth comparison of Japan’s cultural identity and Asthortera’s fictional civilization—exploring how Japan’s cognitive preservation, ethical structure, and symbolic continuity mirror the most advanced traits of Asthortera.",
    slug: "japan-closest-equivalent-to-asthortera",
    image: "/images/japan-closest-equivalent-to-asthortera.webp",
    author: "Rei Reltroner",
    date: "2025-06-18",
    published: true
  },
  {
    title: "What Happens When a Reltronland Quadrillionaire Lands on Earth?",
    description: "A thought experiment on the absurd scale of economic power from Reltronland compared to Earth's current civilization.",
    slug: "reltronland-wealth-vs-earth",
    author: "Rei Reltroner",
    date: "2025-06-20",
    published: true,
    image: "/images/reltronland-wealth-vs-earth.webp"
  },
  {
    title: "The Elite and the Illusion of Forecasting: A Red Pill Essay",
    description: "A fearless manifesto that exposes the failure of mainstream forecasting and unmasks the elite’s manipulation of future narratives. This Red Pill essay challenges the illusions sold to the middle class and calls for critical awakening.",
    slug: "illusion-of-forecasting",
    author: "Rei Reltroner",
    date: "2025-06-28",
    published: true,
    image: "/images/illusion-of-forecasting.webp"
  },
  {
    title: "Real Cost Hidden in ERP Systems: A Developer’s Hard Lesson",
    description: "A firsthand story of how building an ERP system taught me the painful reality of hidden infrastructure costs—especially for solo developers. This post uncovers unexpected billing from cloud hosting, the contrast with free deployments, and how this experience became my competitive edge.",
    slug: "real-cost-hidden-in-erp",
    date: "2025-07-02",
    author: "Rei Reltroner",
    image: "/images/real-cost-hidden-in-erp.webp",
    published: true
  },
  {
    title: "🕯️ First Encounter: Midnight Awakening in the KKN Masjid",
    description: "A paranormal and spiritual experience during community service (KKN) in 2025.",
    slug: "midnight-awakening-field-study",
    author: "Rei Reltroner",
    date: "2025-07-07",
    published: true,
    image: "/images/midnight-awakening-field-study.webp",
    tags: ["paranormal", "consciousness", "field-journal", "astralis"]
  }
  
];

export default function Blog() {
  return <BlogClient posts={posts} />;
}
