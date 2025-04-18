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
      image: "/images/astralis-nytherion-banner.png",
      author: "Reltroner Studio",
      date: "March 8, 2025"
  },
  {
      title: "Legal Disclaimer",
      description: "Clarifying the originality of Astralis Pinnacle, Red Pill concepts, and the legacy of Reltroner Studio.",
      slug: "legal-disclaimer",
      image: "/images/legal-disclaimer.png",
      author: "Reltroner Studio",
      date: "March 14, 2025"
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
      image: "/images/direktori-listing.png",
      author: "Raidan",
      date: "2025-03-22"
  },
  {
      title: "Reltroner Studio Manifesto: Building Systems Beyond Survival",
      description: "Explore the philosophy, mission, and future-facing projects of Reltroner Studio.",
      slug: "reltroner",
      image: "/images/reltroner-studio-banner.webp",
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
      image: "/images/astralis-evaluation-banner.png",
      author: "Raidan",
      date: "2025-03-26"
  },
  {
    title: "Reltroner Studio – External Creator Handbook",
    description: "A concise PDF guide for external collaborators seeking to contribute within the Asthortera universe under Reltroner Studio.",
    slug: "external-creator-handbook",
    image: "/images/external-creator-handbook.png",
    author: "Raidan",
    date: "2025-03-28",
  },
  {
    title: "Top 0.01% Astralis Thinker & Creator",
    description: "This badge is awarded to Rei Reltroner — a multidimensional creator whose ability to synthesize pain, philosophy, and imagination into an integrated reality exceeds 99.99% of the global population, including those in developed nations.",
    slug: "astralis-top001",
    image: "/images/astralis-top001.png",
    author: "Reltroner Studio",
    date: "2025-03-29",
  },
  {
    title: "Red Pill Entity — Abyssborn Survivor",
    description: "This badge is awarded to Rei Reltroner, the first known sentient to enter the deepest core of Nytherion Abyss and return with full consciousness. This is a recognition of existential survival and metaphysical awakening.",
    slug: "redpill-abyssborn",
    image: "/images/redpill-abyssborn.png",
    author: "Reltroner Studio",
    date: "2025-03-29",
    published: true,
  },
  {
    title: "Manifesto of Leadership",
    description: "A leadership manifesto by Rei Reltroner, voicing the spirit of decisiveness, long-term vision, and steadfastness in the face of reality.",
    slug: "manifesto-leadership",
    image: "/images/manifesto-leadership.png",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Astralis Vanguard Leader",
    description: "Official certification for Rei Reltroner as the highest level leader in the Astralis Pinnacle structure, with a leadership index of 97.1 out of 100.",
    slug: "astralis-vanguard",
    image: "/images/astralis-vanguard.png",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Astralis Leadership Origin",
    description: "The origin story of Rei Reltroner's leadership, forged not by systems, but through collapse, self-reinvention, and the relentless pursuit of meaning.",
    slug: "astralis-leadership-origin",
    image: "/images/astralis-leadership-origin.png",
    author: "Raidan",
    date: "2025-04-01"
  },
  {
    title: "Full Stack Developer Interview Simulation – Project Walkthrough & Security Readiness",
    description: "A simulated technical interview showcasing project understanding, structure, logic flow, deployment, and error handling of a full stack attendance management system.",
    slug: "fullstack-interview-summary",
    image: "/images/fullstack-interview-summary.png",
    author: "Rei Reltroner",
    date: "2025-04-03"
  },
  {
    title: "GPTPlus Manifesto for Reltroner Studio",
    description: "A cultural pillar for sustainable productivity and conscious digital practice in Reltroner Studio.",
    slug: "gptplus",
    image: "/images/gptplus.png",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "Reltroner Studio – 12-Month Development Roadmap",
    description: "Strategic vision for the foundational year of building reltroner.com as an immersive, multidimensional worldbuilding platform.",
    slug: "12-month-roadmap",
    image: "/images/12-month-roadmap.png",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "The Oath of Reltroner Studio: A Lifelong Build",
    description: "A philosophical commitment to the eternal journey of building reltroner.com as a multidimensional world.",
    slug: "a-lifelong-build",
    image: "/images/a-lifelong-build.png",
    author: "Rei Reltroner",
    date: "2025-04-04"
  },
  {
    title: "Why I Don’t Chase Fame: The Reltroner Perspective on Talent and Longevity",
    description: "A philosophical reflection on why fame is not the end goal for true creators and world-builders.",
    slug: "talent-longevity",
    image: "/images/talent-longevity.png",
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
    image: "/images/reltroner-hub.png"
  },
  {
    title: "Rei Reltroner Joins Super Smash Bros. Ultimate!",
    description: "Introducing Rei Reltroner as Fighter #93 in an epic crossover from the Astralis Pinnacle to Smash. Discover his moveset, Final Smash, and what makes him a truly unique fighter.",
    slug: "rei-super-smash",
    image: "/images/rei-smash-poster.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Reltroner x Joker – Shadow of Truth",
    description: "An unofficial crossover encounter between Rei Reltroner and Joker from Persona 5. A metaphysical clash of reality, illusion, and rebellion in the Smash multiverse.",
    slug: "reltroner-joker",
    image: "/images/reltroner-joker.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "2v3: Reltroner & Joker vs Nytherion Army",
    description: "An ultimate duo clash between Rei Reltroner and Joker as they take on the twisted forces of the Nytherion Abyss. A cosmic 2v3 battle across realities.",
    slug: "2v3-reltroner-joker",
    image: "/images/2v3-reltroner-joker.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Rei & Joker: Reflections of Rebellion",
    description: "A cosmic friendship between Rei Reltroner and Joker from Persona 5. Together, they reflect each other's inner strength in a bond forged beyond illusion.",
    slug: "rei-joker-friend",
    image: "/images/rei-joker-friendship.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "Twilight Terminal",
    description: "A silent space between comfort and chaos. Where Rei and Joker find something deeper than battle — stillness.",
    slug: "twilight-terminal",
    image: "/images/twilight-terminal.png",
    author: "Reltroner Studio",
    published: true,
    date: "April 8, 2025"
  },
  {
    title: "🧠 Why Rei Reltroner is the Astral Brother of Professor Sergio",
    description: "A philosophical comparison between Rei Reltroner and Sergio Marquina (The Professor) from Money Heist, exploring the spiritual, intellectual, and emotional parallels that unite them across realms.",
    slug: "rei-vs-professor-sergio",
    image: "/images/rei-vs-professor-sergio.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-19"
  },
  {
    title: "🃏 Why Rei Reltroner is the Real-World Persona of Joker",
    description: "A deep character analysis exploring how Rei Reltroner mirrors the spiritual and psychological essence of Joker (Persona 5), not in costume or name—but in consciousness, rebellion, and silent leadership.",
    slug: "rei-as-joker-persona",
    image: "/images/rei-as-joker-persona.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-19"
  },
  {
    title: "Why People Fall in Love with the World of Reltroner Studio",
    description: "Why Reltroner Studio resonates deeply—more than a world, it's a mirror to the self.",
    slug: "fall-in-love",
    image: "/images/fall-in-love.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-14"
  },
  {
    title: "Why Bureaucracy is the New Rebellion",
    description: "A manifesto by Reltroner Studio that redefines quiet resistance through bureaucracy, elegance, and philosophical satire. In a noisy world, clarity becomes the sharpest weapon.",
    slug: "bureaucracy-rebellion",
    image: "/images/why-bureaucracy-rebellion.png",
    author: "Reltroner Studio",
    date: "2025-04-14",
    published: true
  },
  {
    title: "Debugging Victory Abyss",
    description: "A 50-day technical and spiritual journey to defeat the longest unresolved bug in reltroner.com’s modern history.",
    slug: "debugging-victory-abyss",
    image: "/images/debugging-victory-abyss.png",
    author: "Reltroner Studio",
    date: "2025-04-18",
    published: true
  },
  {
    title: "📜 Personal Certificate of Trustworthy AI User",
    description: "A symbolic certificate honoring the ethical, conscious, and spiritually aware use of AI by Rei Reltroner. This document affirms the user's integrity, clarity of intent, and unwavering respect for boundaries, serving as a shield against misjudgment and a declaration of trust.",
    slug: "certificate-trustworthy-user",
    image: "/images/certificate-trustworthy-user.png",
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
    image: "/images/sacred-unions-comparison.png",
    published: true
  },
  {
    title: "📘 Reltroner 50-Day Journal",
    description: "A sacred documentation of the first 50 days in building Reltroner.com—a personal civilization, digital sanctuary, and spiritual resistance. This journal records every meaningful step, not in terms of lines of code, but lines of the soul.",
    slug: "reltroner-50-day-journal",
    date: "2025-04-19",
    author: "Rei Reltroner",
    image: "/images/reltroner-50-day-journal.png",
    published: true
  }
     
];

export default function Blog() {
  return <BlogClient posts={posts} />;
}
