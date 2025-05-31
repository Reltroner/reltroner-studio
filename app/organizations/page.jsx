import OrganizationsClient from "./OrganizationsClient";

export const metadata = {
  title: "Organizations",
  description: "A curated directory of visionary entities in Asthortera — from philosophical alliances to tech-engineered think tanks — each playing a pivotal role in shaping the world’s creative, economic, and ideological future."
};

const organizations = [
  {
    title: "Reltroner Studio Holdings",
    description: "A strategic breakdown of Reltroner Studio’s multidivisional structure and its future-forward ecosystem of creativity, capital, and sovereignty.",
    slug: "reltroner-holding",
    image: "/images/reltroner-holding.webp",
    author: "Rei Reltroner",
    date: "2025-04-04",
    published: true
  },
  {
    title: "Henchoway",
    description: "A secretive cult rooted in Nytherion Abyss, Henchoway spreads illusions of comfort while manipulating the world from the depths of Tremora Trench.",
    slug: "henchoway", 
    image: "/images/henchoway.webp", 
    author: "Rei Reltroner",
    date: "2025-04-07",
    published: true
  },
  {
    title: "🛡️ Reltronland Space Command (RSC)",
    description: "The supreme void defense and exploration fleet of Reltronland, forged through sentient clarity, strategic realism, and unwavering discipline to safeguard sentient evolution across the galaxy.",
    slug: "reltronland-space-command",
    image: "/images/reltronland-space-command.webp",
    author: "Rei Reltroner",
    date: "2025-04-27",
    published: true
  },
  {
    title: "🛰️ Asthortera Space Command (ASC)",
    description: "A comprehensive and strategic breakdown of the ASC: its foundation, philosophy, command structure, operations, and geopolitical contrast with RSC.",
    slug: "asthortera-space-command",
    image: "/images/asthortera-space-command.webp",
    author: "Reltroner Studio",
    date: "2025-05-07",
    published: true
  },
  {
    title: "💱 Reltronland Financial Ecosystem: Institutions Beyond Survival",
    description: "An overview of Reltronland's advanced financial institutions—AFRI, RIDA, SAVA, and CERA—designed to replace outdated models like IMF and World Bank through meritocratic consciousness, economic clarity, and sovereign AI governance.",
    slug: "reltronland-financial-institutions",
    image: "/images/reltronland-financial-institutions.webp",
    author: "Rei Reltroner",
    date: "2025-05-09",
    published: true
  },
  {
    title: "🏛️ Reltronland Astralis Central Bank (RACB)",
    description: "An overview of the Reltronland Astralis Central Bank (RACB), the sovereign monetary institution engineered to uphold clarity-based economics, issue merit-backed digital currency, and regulate sentient liquidity across civilization.",
    slug: "racb",
    author: "Rei Reltroner",
    date: "2025-05-10",
    published: true,
    image: "/images/racb.webp"
  },
  {
    title: "🌐 AFRI — Astralis Financial Resilience Institution",
    description: "An interplanetary financial institution founded by Reltronland to stabilize economies through clarity, sentient realignment, and structural awakening—beyond the limitations of traditional austerity models.",
    slug: "afri",
    date: "2025-05-10",
    author: "Rei Reltroner",
    published: true,
    image: "/images/afri.webp"
  },
  {
    title: "🏗️ RIDA — Reltronian Interplanetary Development Agency",
    description: "A meritocratic development agency established by Reltronland to fund infrastructure, education, and conscious urban growth across post-conflict civilizations—focused on elevating sentient purpose rather than economic dominance.",
    slug: "rida",
    date: "2025-05-10",
    author: "Rei Reltroner",
    published: true,
    image: "/images/rida.webp"
  },
  {
    title: "🏦 SAVA — Sentient Asset Vault Authority",
    description: "SAVA is Reltronland’s trust-based clearinghouse and value sanctuary, safeguarding merit-backed tokens and philosophical wealth through quantum-AI infrastructure and non-political financial sovereignty.",
    slug: "sava",
    date: "2025-05-10",
    author: "Rei Reltroner",
    published: true,
    image: "/images/sava.webp"
  },
  {
    title: "📊 CERA — Consciousness Economic Risk Authority",
    description: "SAVA is Reltronland’s trust-based clearinghouse and value sanctuary, safeguarding merit-backed tokens and philosophical wealth through quantum-AI infrastructure and non-political financial sovereignty.",
    slug: "cera",
    date: "2025-05-10",
    author: "Rei Reltroner",
    published: true,
    image: "/images/cera.webp"
  },
  {
    title: "📈 RXS 500 Index: Reltronland Exchange of Sovereign",
    description: "An SDI-weighted stock index that reflects not only financial strength, but sentient impact and clarity-driven innovation.",
    slug: "rxs-500",
    image: "/images/rxs-500.webp",
    author: "Rei Reltroner",
    date: "2025-05-10",
    published: true
  },
  {
    title: "🍔 ByteBite — Reltronland's Largest Fast Food Network",
    description: "An overview of ByteBite, the massive AI-powered fast food empire born from the heart of Reltronland.",
    slug: "bytebite",
    date: "2025-05-11",
    author: "Rei Reltroner",
    published: true,
    image: "/images/bytebite-poster.webp"
  }
  
];

export default function Organizations() {
  return <OrganizationsClient organizations={organizations} />;
}
