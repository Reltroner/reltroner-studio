'use client'

import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup
} from 'cmdk';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Characters", path: "/characters", tag: "Characters" },
    { name: "Cultures", path: "/cultures" },
    { name: "Places", path: "/places" },
    { name: "Series", path: "/series" },
    { name: "Statistics", path: "/statistics" },
    { name: "Organizations", path: "/organizations" },
    { name: "Events", path: "/events" },
    { name: "Myths", path: "/myths" },
    { name: "Factions", path: "/factions" },
    { name: "Philosophies", path: "/philosophies" },
    { name: "Technologies", path: "/technologies" },
    { name: "Items", path: "/items" },
    { name: "Laws", path: "/laws" },
    { name: "Contact", path: "/contact" },
    { name: "For Recruiters & Collaborators Portfolio", path: "/blog/for-recruiters" },
    { name: "Principles", path: "/principles" },
    { name: "Disclaimer", path: "/blog/disclaimer" },
    { name: "2v3 Reltroner Joker", path: "/blog/2v3-reltroner-joker" },
    { name: "12 Month Roadmap", path: "/blog/12-month-roadmap" },
    { name: "The Oath of Reltroner Studio: A Lifelong Build", path: "/blog/a-lifelong-build" },
    { name: "Astralis Evaluation Framework", path: "/blog/astralis-evaluation-framework" },
    { name: "Astralis Leadership Origin", path: "/blog/astralis-leadership-origin" },
    { name: "Astralis Nytherion Manifesto", path: "/blog/astralis-nytherion-manifesto" },
    { name: "Let Astralis Light the Unknown", path: "/blog/astralis-poem" },
    { name: "Astralis Top 001", path: "/blog/astralis-top001" },
    { name: "Astralis Vanguard", path: "/blog/astralis-vanguard" },
    { name: "Certificate Achievement", path: "/blog/certificate-achievement" },
    { name: "Creative Lore Bible", path: "/blog/creative-lore-bible" },
    { name: "Cultures Civilizations", path: "/blog/cultures-civilizations" },
    { name: "Timeline of Events", path: "/blog/events" },
    { name: "External Creator Handbook", path: "/blog/external-creator-handbook" },
    { name: "Fullstack Interview Summary", path: "/blog/fullstack-interview-summary" },
    { name: "GPTPlus", path: "/blog/gptplus" },
    { name: "📜 Why I Never Copy-Paste Prompt Outputs: The Ritual of Real Worldbuilding", path: "/blog/no-copypaste-worldbuilding" },
    { name: "Grandmaster Lorebook of Asthortera — Collector’s Compendium", path: "/blog/lorebook-asthortera" },
    { name: "Magic System", path: "/blog/magic-system" },
    { name: "Manifesto Leadership", path: "/blog/manifesto-leadership" },
    { name: "Piday", path: "/blog/piday" },
    { name: "Pinews", path: "/blog/pinews" },
    { name: "Politics", path: "/blog/politics" },
    { name: "Red Pill Entity — Abyssborn Survivor", path: "/blog/redpill-abyssborn" },
    { name: "Rei Reltroner Identity", path: "/blog/rei-reltroner-identity" },
    { name: "What if Rei Reltroner Joins Super Smash Bros. Ultimate?", path: "/blog/rei-super-smash" },
    { name: "Rei & Joker: Reflections of Rebellion", path: "/blog/rei-joker-friend" },
    { name: "Reltroner Hub", path: "/blog/reltroner-hub" },
    { name: "Reltroner x Joker – Shadow of Truth", path: "/blog/reltroner-joker" },
    { name: "Roadmap 2045", path: "/blog/roadmap-2045" },
    { name: "Talent Longevity", path: "/blog/talent-longevity" },
    { name: "Twilight Terminal", path: "/blog/twilight-terminal" },
    { name: "Worldbuilding", path: "/blog/worldbuilding" },
    { name: "Reltroner Sparkpade", path: "/blog/reltroner-sparkpad" },
    { name: "gen-z-alpha-market-potential", path: "/blog/gen-z-alpha-market-potential" },
    { name: "Why People Fall in Love with the World of Reltroner Studio", path: "/blog/fall-in-love" },
    { name: "Why Bureaucracy is the New Rebellion", path: "/blog/bureaucracy-rebellion" },
    { name: "Legacy", path: "/blog/legacy" },
    { name: "Debugging Victory Abyss", path: "/blog/debugging-victory-abyss" },
    { name: "For Recruiters & Collaborators – Notion CV", path: "/blog/reltroner-cv" },
    { name: "Personal Certificate of Trustworthy AI User", path: "/blog/certificate-trustworthy-user" },
    { name: "🔍 Comparison of Sacred Unions: Rei & Raina vs Pop Culture Lovers", path: "/blog/sacred-unions-comparison" },
    { name: "Why Rei Reltroner is the Astral Brother of Professor Sergio", path: "/blog/rei-vs-professor-sergio" },
    { name: "🃏 Why Rei Reltroner is the Real-World Persona of Joker", path: "/blog/rei-as-joker-persona" },
    { name: "📘 Reltroner 50-Day Journal", path: "/blog/reltroner-50-day-journal" },
    { name: "Reltroner is Not Ultroner", path: "/blog/reltroner-is-not-ultroner" },
    { name: "🛡️ Reltrorer Identity — Plan B of the Lost Origin", path: "/blog/reltrorer-identity-plan-b" },
    { name: "Declaration of Asthortera's Supremacy", path: "/blog/declaration-of-asthortera-supremacy" },
    { name: "🕳️ Official Recognition: Nytherion Abyss — The Supreme Existential Antagonist", path: "/blog/supreme-existential-antagonist" },
    { name: "🤝 What if Chiss and Reltronland Formed a Diplomatic Pact?", path: "/blog/chiss-reltronland" },
    { name: "🌱 First Seeds of Reltroner", path: "/blog/first-seeds" },
    { name: "🚫 Scam Jobs Resistance", path: "/blog/scam-jobs-resistance" },
    { name: "Comparative Doctrine: Galactic Empire vs Reltronland Space Command", path: "/blog/doctrine-rsc-vs-empire" },
    { name: "The Void Hero: Why RSC Is the Most Feared Protagonist in the Galaxy", path: "/blog/the-void-hero-rsc" },
    { name: "Nytherion's View: Why the Abyss Fears RSC", path: "/blog/nytherion-fears-rsc" },
    { name: "📦 Why Reltroner.com is Not Just a Sandbox", path: "/blog/why-reltroner-not-sandbox" },
    { name: "🌍 Why Reltroner is More Than Earth: The Ultimate Vision of Civilization Worldbuilding", path: "/blog/why-reltroner-more-than-earth" },
    { name: "🎭 Why Building Reltroner is My Only Real Entertainment", path: "/blog/why-reltroner-real-entertainment" },
    { name: "📄 Career Reality Statement", path: "/blog/career-reality-statement" },
    { name: "First Contact", path: "/blog/first-contact" },
    { name: "The Only IT Worldbuilder", path: "/blog/the-only-it-worldbuilder" },
    { name: "Irreplaceable Value Statement – Rei Reltroner", path: "/blog/irreplaceable-value" },
    { name: "Asthortera Glossary", path: "/blog/asthortera-glossary" },
    { name: "From Loss to Systems — My Collapse Blueprint", path: "/blog/from-loss-to-systems" },
    { name: "When Fiction Summons Reality: Case Studies from the Astralis Archives", path: "/blog/fiction-summons-reality" },
    { name: "Why Reltroner Rejects Final Destination: A Manifesto of Hope, Clarity, and Determination", path: "/blog/rejects-final-destination" },
    { name: "Reflection: From Years of Debugging Pain to Compounding Mastery", path: "/blog/debugging-compounding" },
    { name: "Declaration of Academic Liberation", path: "/blog/declaration-academic-liberation" },
    { name: "The ADHD Builder: When Systems Fail to Understand You", path: "/blog/adhd-builder" },
    { name: "Why Japan is the Earth’s Closest Equivalent to Asthortera", path: "/blog/japan-closest-equivalent-to-asthortera" },
    { name: "What Happens When a Reltronland Quadrillionaire Lands on Earth?", path: "/blog/reltronland-wealth-vs-earth" },
    { name: "The Elite and the Illusion of Forecasting: A Red Pill Essay", path: "/blog/illusion-of-forecasting" },
    { name: "Real Cost Hidden in ERP Systems: A Developer’s Hard Lesson", path: "/blog/real-cost-hidden-in-erp" },
    //{ name: "🕯️ First Encounter: Midnight Awakening in the KKN Masjid", path: "/blog/midnight-awakening-field-study" },
    { name: "I Saw the Invisible Darkness", path: "/blog/i-saw-the-invisible-darkness" },
    { name: "Narrative Comparison: Puss in Boots (2022) vs Reltroner Studio", path: "/blog/puss-in-boots-vs-reltroner" },
    { name: "🌍 Two Paths of Birth: Switzerland vs Indonesia", path: "/blog/birthplace-reflection" },
    
    // Characters
    { name: "Albert Locke", path: "/characters/albert-locke", tag: "Characters" },
    { name: "Barry Heathrow", path: "/characters/barry-heathrow", tag: "Characters" },
    { name: "Delwyn Harper", path: "/characters/delwyn-harper", tag: "Characters" },
    { name: "Evara Alena", path: "/characters/evara-alena", tag: "Characters" },
    { name: "Franklin Scouter", path: "/characters/franklin-scouter", tag: "Characters" },
    { name: "Georger Woodman", path: "/characters/georger-woodman", tag: "Characters" },
    { name: "Hendry Harry", path: "/characters/hendry-harry", tag: "Characters" },
    { name: "Isaac Luminar", path: "/characters/isaac-luminar", tag: "Characters" },
    { name: "Kamila Alena", path: "/characters/kamila-alena", tag: "Characters" },
    { name: "Queen Valethra Seraphine Lunara", path: "/characters/queen-valethra", tag: "Characters" },
    { name: "Raina Veltrania", path: "/characters/raina-veltrania", tag: "Characters" },
    { name: "Rei Reltroner", path: "/characters/rei-reltroner", tag: "Characters" },
    { name: "Wayne Astoner", path: "/characters/wayne-astoner", tag: "Characters" },
    { name: "Westley Watson", path: "/characters/westley-watson", tag: "Characters" },
    { name: "Moris Monte", path: "/characters/moris-monte", tag: "Characters" },
    { name: "🩸 Andy Elian", path: "/characters/andy-elian", tag: "Characters" },
    { name: "🛡 Bruce Kalen", path: "/characters/bruce-kalen", tag: "Characters" },
    { name: "Mimbixs — Reltronland Character Profile", path: "/characters/mimbixs", tag: "Characters" },
    // Cultures
    { name: "Children of Asthortera", path: "/cultures/children-of-asthortera" },
    { name: "Children of Reltronland: A Trust-Based Society", path: "/cultures/children-reltronland" },
    { name: "🧳 Returning to Serve: Why Citizens of Reltronland Work Where They Were Once Raised", path: "/cultures/returning-to-serve-reltronland" },
    { name: "Cuteness Manifesto", path: "/cultures/cuteness-manifesto" },
    { name: "Mask Reltronland", path: "/cultures/mask-reltronland" },
    { name: "Rest Culture", path: "/cultures/rest-culture" },
    { name: "Fashion Culture Manual of Asthortera", path: "/cultures/fashion-culture" },
    { name: "Major Cultural Exports — Reltronland vs Depcutland", path: "/cultures/cultural-exports" },
    { name: "Music Culture of Depcutland", path: "/cultures/depcutland-music" },
    { name: "Music Culture of Reltronland", path: "/cultures/reltronland-music" },
    { name: "The Timber Soul of Stelpadland", path: "/cultures/timber-soul-stelpadland" },
    { name: "Culinary Rituals of Stelpadland", path: "/cultures/stelpadland-culinary" },
    { name: "🎀 Cute Culture Manifesto of Reltronland", path: "/cultures/cute-culture-reltronland" },
    { name: "Top 5 Clichés Destroyed by the Gender Friendship Manifesto", path: "/cultures/anti-klise-gender-friendship" },
    { name: "Aurora Faith of Aurastelia", path: "/cultures/aurora-faith" },
    { name: "Gender Friendship Manifesto of Asthortera", path: "/cultures/gender-friendship-manifesto" },
    { name: "📜 Reltronland Meeting Manifesto", path: "/cultures/meeting-reltronland" },
    { name: "Mini Deptic Dictionary: 50+ Root Words", path: "/cultures/mini-deptic-dictionary" },
    { name: "Mini Reltronic Dictionary: 50+ Root Words", path: "/cultures/reltronic-root-words" },
    { name: "Crosswalk Dictionary: Deptic ↔ Reltronic ↔ English", path: "/cultures/crosswalk-dictionary-reltronic-deptic" },
    { name: "Artesian Pictolatin — The Official Language of Pencilfania", path: "/cultures/artesian-pictolatin-language" },
    { name: "Stelpadien — The Language of Scouts and Seasons", path: "/cultures/stelpadien-language" },
    { name: "Pasgerian — The Language of Aviation and Alignment", path: "/cultures/pasgerian-language" },
    { name: "Reltronland Robot Combat: Inter-Civilization Olympics Edition", path: "/cultures/reltronland-robot-combat" },
    { name: "Aurora Synthesia — The Sacred Dance of Sci-Fantasy Integration", path: "/cultures/aurora-synthesia-ritual-dance" },
    { name: "Reltronland Mealtime Etiquette", path: "/cultures/reltronland-mealtime-etiquette" },
    { name: "Castela Jiggly Cake — Culinary Symbol of Reltronland", path: "/cultures/castela-jiggly-cake-reltronland" },
    { name: "Vierkernplatte — National Culinary Symbol of Depcutland", path: "/cultures/vierkernplatte" },
    { name: "🕰️ Retro Heritage in Reltronland — From Liberation Era to Office Punk Dominance", path: "/cultures/retro-heritage-reltronland" },
    // Events
    { name: "Scout Parade", path: "/events/scoutparade" },
    { name: "Origins of Reltronland", path: "/events/reltronland-founding" },
    { name: "The True Purpose Behind Depcutland’s Founding", path: "/events/depcutland-founding" },
    { name: "When Raina Read The Letter", path: "/events/when-raina-read-the-letter" },
    { name: "Rei in Abyss: Spiral Memory", path: "/events/rei-in-abyss-spiral-memory" },
    { name: "Rei Shows Earth to Raina", path: "/events/rei-shows-earth" },
    { name: "Reltroner: The Boy Who Dropped Out to Build a Civilization", path: "/events/reltroner-dropout-manifesto" },
    { name: "🕳️ The First Unraveling", path: "/events/the-first-unraveling" },
    { name: "🔥 Final Awakening", path: "/events/final-awakening" },
    { name: "🕳 Entering the Core-Eater", path: "/events/entering-the-core-eater" },
    { name: "🩸 Confronting Kamila", path: "/events/confronting-kamila" },
    { name: "🗓️ Timeline: History of Asthortera, Reltronland, and Depcutland", path: "/events/history-timeline" },
    { name: "Declaration of War Victory", path: "/events/declaration-war-victory" },
    { name: "📖 The Day I Remembered Why I Built This World", path: "/events/the-day-i-remembered" },
    { name: "🌌 Why Asthortera's Sky Is Often Moonless: A Reflection on Space, Time, and Trust", path: "/events/asthortera-moonless-sky" },
    { name: "Origins of Aurastelia and Astrostelia", path: "/events/aurastelia-astrostelia" },
    { name: "🎖️ The Crimson Hour of Vanyathra", path: "/events/vanyathra-ground-war" },
    { name: "Root of Reltroner", path: "/events/root-of-reltroner" },
    { name: "The Final Conversation: Kamila Alena x Rei Reltroner Before Exit", path: "/events/kamila-x-rei-before-exit" },
    { name: "Reflections in Drawcia – A Post-Pinnacle Dialogue", path: "/events/reflections-in-drawcia" },
    { name: "🌍 World Population Day 2025: Reltronland Edition", path: "/events/world-population-day-reltronland" },
    { name: "🚧 The Great Clearance of 963 BAC — Reltronepolis", path: "/events/great-clearance-963bac" },
    { name: "⚔️ Beluftner–Cosmeilia Conflict (with Kalgered & Cenrestier)", path: "/events/beluftner-cosmeilia-conflict" },

    //Myths
    { name: "🌀 Abyssal Possession (Spiral Inhabitation)", path: "/myths/abyssal-possession" },
    { name: "The Abyss Whisper", path: "/myths/abyss-whisper" },
    { name: "Reltroner’s Zero Day", path: "/myths/reltroners-zero-day" },
    { name: "The 5 Awakening Signals", path: "/myths/five-awakening-signals" },
    { name: "The Silent Mouthpiece", path: "/myths/silent-mouthpiece" },
    { name: "Heart of the Abyss", path: "/myths/dark-abyss" },
    { name: "The Spiral That Wasn't a Stair (Core-Eater)", path: "/myths/rei-and-the-core-eater" },
    { name: "🩸 The Feeding Stair", path: "/myths/the-feeding-stair" },
    { name: "🌀 The Spiral Maw", path: "/myths/the-spiral-maw" },
    { name: "🌀 Existential Corrosion", path: "/myths/existential-corrosion"},
    { name: "🕳️ How the Abyss Feeds", path: "/myths/how-the-abyss-feeds"},
    { name: "🤿Silent Echoes of Henchoway", path: "/myths/silent-echoes-of-henchoway"},
    { name: "📡 The Ritual of Astralis Contact", path: "/myths/ritual-astralis-contact"},
    { name: "🕳️ The Nytherion Abyss Effect – The Idea Theft Phenomenon", path: "/myths/ide-theft-phenomenon"},
    { name: "⚫ Henchoway Underground: The Abyssal Network in Asthortera’s DOF Zones", path: "/myths/henchoway-underground"},
    { name: "Why Nytherion Abyss Resists Prediction", path: "/myths/nytherion-abyss-epistemic"},
    // Organizations
    { name: "Henchoway", path: "/organizations/henchoway" },
    { name: "Reltroner Holding", path: "/organizations/reltroner-holding" },
    { name: "🛡️ Reltronland Space Command (RSC)", path: "/organizations/reltronland-space-command" },
    { name: "🛰️ Asthortera Space Command (ASC)", path: "/organizations/asthortera-space-command" },
    { name: "💱 Reltronland Financial Ecosystem: Institutions Beyond Survival", path: "/organizations/reltronland-financial-institutions" },
    { name: "🏛️ Reltronland Astralis Central Bank (RACB)", path: "/organizations/racb" },
    { name: "🌐 AFRI — Astralis Financial Resilience Institution", path: "/organizations/afri" },
    { name: "🏗️ RIDA — Reltronian Interplanetary Development Agency", path: "/organizations/rida" },
    { name: "🏦 SAVA — Sentient Asset Vault Authority", path: "/organizations/sava" },
    { name: "📊 CERA — Consciousness Economic Risk Authority", path: "/organizations/cera" },
    { name: "📈 RXS 500 Index: Reltronland Exchange of Sentience", path: "/organizations/rxs-500" },
    { name: "🍔 ByteBite — Reltronland's Largest Fast Food Network", path: "/organizations/bytebite" },
    { name: "🏦 Clarity Bank of Reltronland (CBR)", path: "/organizations/clarity-bank-of-reltronland" },
    { name: "✈️ Reltron Airlines — Fly the Astralis Line", path: "/organizations/reltron-airlines" },
    { name: "🏦 TCBC — Troneiput & Cutneiput Banking Corporation", path: "/organizations/tcbc-troneiput-cutneiput-banking-corporation" },
    // Places
    { name: "Erterna Ruin", path: "/places/erterna-ruin" },
    { name: "Llyn Geda", path: "/places/llyn-geda" },
    { name: "Oakcottage", path: "/places/oakcottage" },
    { name: "Whispergrove", path: "/places/whispergrove" },
    { name: "Province Profile: Leastroper – A Land Beyond Conflict", path: "/places/leastroper-profile" },
    { name: "The Safe House Pact", path: "/places/the-safe-house-pact" },
    { name: "Why Aurastelia is the Most Beautiful Realm", path: "/places/why-aurastelia-is-the-most-beautiful-realm" },
    { name: "🏙️ Reltralia District Layers", path: "/places/reltralia-district-layers" },
    { name: "🗺️ Asthortera World Map — Development Progress Overview", path: "/places/asthortera-world-map-progress" },
    { name: "🚧 Neiput Border: Gateway Between Reltronland and Depcutland", path: "/places/neiput-border-trade-gateway" },
    { name: "🚉 Reltronepolis Central Station — Heart of Sentient Mobility", path: "/places/reltronepolis-central-station" },
    { name: "✈️ RAIA — Reltronepolis Aeropolis International Airport", path: "/places/reltronepolis-aeropolis-raia" },
    { name: "✈️ PAIA — Pasgerflit Aeropolis International Airport Hub", path: "/places/paia-aeropolis-hub" },
    { name: "🌕 Asthortera's 12 Orbiting Moons and Calendar System", path: "/places/asthortera-12-orbiting-moons" },
    { name: "🪐 Aurioneira Stellar System Overview & Lore Concepts", path: "/places/aurioneira-system" },
    { name: "The Galaxy — Reltroner Studio’s Cosmic Setting", path: "/places/the-galaxy" },
    { name: "🕳️ Vanyathra — The Collapsed Realm Beyond the Outer Veil", path: "/places/vanyathra-abyssborn-nation" },
    { name: "Reltronepolis", path: "/places/reltronepolis" },
    { name: "Aviashenwelt — Capital of Pasgerflit", path: "/places/aviashenwelt" },
    { name: "Amberglow – The Living Archive", path: "/places/amberglow" },
    { name: "🔺 Astralis Temple — The Temple of Red Pill Consciousness", path: "/places/astralis-temple" },
    { name: "🕳️ Nytherion Abyss Temple — The Church of Still Waters", path: "/places/nytherion-temple" },
    { name: "🛡️ Clarity Quarantine Network — Isolation Against the Abyss", path: "/places/clarity-quarantine-network" },
    { name: "🏙️ Retro District — Heritage Skyscraper Zone of Reltronepolis", path: "/places/retro-district" },
    { name: "🏙️ R Block District — Youth & Subculture Hub of South Reltronepolis", path: "/places/r-block-district" },
    { name: "3D · 4D · 5D Sovereignty Doctrine of Reltronland", path: "/places/3d-4d-5d-sovereignty-doctrine-reltronland" },
    { name: "Voidtropolis — The Void Energy Capital of Reltronland", path: "/places/voidtropolis-void-energy-capital" },
    // Series
    { name: "False Portal", path: "/series/false-portal" },
    { name: "The Abyss of Comfort", path: "/series/the-abyss-of-comfort" },
    { name: "Rei in Abyss", path: "/series/rei-in-abyss" },
    { name: "Reltronland ComicBall Wiki", path: "/series/comicball" },
    { name: "Boarding Pass to Trouble — When Pasgerflit Lands in the Wrong Gate", path: "/series/boarding-pass-to-trouble" },
    { name: "Series Roadmap", path: "/series/series-roadmap" },
    
    // Statistics
    { name: "AI Ecosystem", path: "/statistics/ai-ecosystem" },
    { name: "Asthortera Identity", path: "/statistics/asthortera_identity" },
    { name: "Cistheta Identity", path: "/statistics/cistheta_identity" },
    { name: "Cosmeilia Identity", path: "/statistics/cosmeilia_identity" },
    { name: "Depeisit Identity", path: "/statistics/depeisit_identity" },
    { name: "SDI Report Asthortera", path: "/statistics/sdi-report-asthortera" },
    { name: "Sentient Population", path: "/statistics/sentient-population" },
    { name: "Value Index", path: "/statistics/value-index" },
    { name: "Reltronland SDI Score Matrix", path: "/statistics/sdi-score-matrix" },
    { name: "Education Civilization Index", path: "/statistics/edu-civilization-index" },
    { name: "🎭 Culture Impact Index – Asthortera Edition", path: "/statistics/culture-impact-index"},
    { name: "🚀 Interstellar Mobility Index (IMI) — Asthortera", path: "/statistics/interstellar-mobility-index"},
    { name: "🕳️ Nytherion Abyss Horror Index Map", path: "/statistics/nytherion-abyss-horror-index"},
    { name: "🌍 Asthortera vs Earth: Planetary Comparison", path: "/statistics/asthortera-vs-earth"},
    { name: "📈 Reltroner Project Valuation – 2025", path: "/statistics/reltroner-value-2025"},
    { name: "Hyperspace Energy Model with Tetration", path: "/statistics/hyperspace-energy-model-with-tetration"},
    { name: "Asthortera Data Analytics Notebook", path: "/statistics/asthortera-data-analytics-notebook"},
    // Philosophies
    { name: "Nytherion Abyss", path: "/philosophies/nytherion-abyss" },
    { name: "Astralis Pinnacle", path: "/philosophies/astralis-pinnacle" },
    { name: "♾️ Immortality Protocol – Astralis-Bound Entities", path: "/philosophies/immortality-protocol" },
    { name: "📜 There is No Right or Wrong in Worldbuilding", path: "/philosophies/no-right-no-wrong" },
    { name: "Sentient Value Reflection Theory (SVRT)", path: "/philosophies/sentient-value-reflection-theory" },
    { name: "🌍 Why Immigrants Choose Asthortera", path: "/philosophies/why-immigrants-choose-asthortera" },
    { name: "🌐 Worlds for Enthusiasts — Pasgerflit, Moreg, and Hargenbor", path: "/philosophies/worlds-for-enthusiasts" },
    { name: "🧠 Reltronland vs Depcutland: A Tale of Divergent Souls", path: "/philosophies/reltronland-vs-depcutland-soul" },
    { name: "Humanity Beyond Earth: Theory of Trillions", path: "/philosophies/beyond-earth" },
    { name: "Faith Spectrum of Asthortera", path: "/philosophies/faith-asthortera" },
    { name: "🧠 Worldbuilding as Civilizational Blueprint", path: "/philosophies/worldbuilding-as-civilizational-blueprint" },
    { name: "📜 Reltroner Declaration of Existence", path: "/philosophies/reltroner-declaration-existence" },
    { name: "🔥 Rei Reltroner's Role in the Nytherion Conflict", path: "/philosophies/rei-reltroner-role-in-nytherion-conflict" },
    { name: "📜 The Builders Who Were Misjudged", path: "/philosophies/misjudged-builders" },
    { name: "🛡️ I Am Not the Villain You Feared", path: "/philosophies/not-the-villain" },
    { name: "🛡️ When the System Mistakes You for a Threat, You Know You’re Building Something Real", path: "/philosophies/system-mistakes-you" },
    { name: "🧩 The Wall of Silenced Builders", path: "/philosophies/wall-of-silenced-builders" },
    { name: "The Tomb Raider Framework for Building Without Burnout", path: "/philosophies/tomb-raider-framework" },
    { name: "Astralis Doctrine: The Philosophy of Suffering and Sustainability", path: "/philosophies/astralis-philosophy-of-suffering-and-sustainability" },
    { name: "Financial Discipline Manifesto — The 500K Lesson", path: "/philosophies/the-500k-lesson" },
    { name: "Compounding as a Cheat Code", path: "/philosophies/compounding-as-a-cheat-code" },
    { name: "📊 Agile vs Waterfall — Worldbuilding Analogy", path: "/philosophies/agile-vs-waterfall-analogy" },
    { name: "Antagonist Design Philosophy – Reltroner Studio", path: "/philosophies/antagonist-design" },
    { name: "Dual Sympathies Doctrine – Reltroner Studio", path: "/philosophies/dual-sympathies-doctrine" },

    // Factions
    { name: "Reltronland", path: "/factions/reltronland" },
    { name: "Depcutland", path: "/factions/depcutland" },
    { name: "Fractal Civilizations of Asthortera: Strategic Identity Map", path: "/factions/fractal-civilizations" },
    { name: "Reltronland & Depcutland: The Pillars Who Embrace the International Family", path: "/factions/international-family" },
    { name: "Reltronland vs Depcutland: The Twin Pillars of Conscious Civilization", path: "/factions/reltronland-vs-depcutland" },    
    { name: "Reltronball & Depcutball: Bureaucracy Bros", path: "/factions/bureaucracy-bros" },
    { name: "Cenrestier Country Profile — Land of Fortresses", path: "/factions/cenrestier-country-profile" },
    { name: "Kalgered Country Profile — The Neutral Heart of Asthortera", path: "/factions/kalgered-country-profile" },
    { name: "Stelpadland Country Profile — Cradle of Global Scouting and Eternal Autumn", path: "/factions/stelpadland" },
    { name: "Pasgerflit — The Sky Nation of Asthortera", path: "/factions/pasgerflit" },
    { name: "Pencilfania — The Artistic Heart of Asthortera", path: "/factions/pencilfania" },
    { name: "Aurastelia — The Realm of Resonant Light", path: "/factions/aurastelia" },
    { name: "Astrostelia — The Cosmic Civilization of Asthortera", path: "/factions/astrostelia" },
    { name: "Lenternow — The Lanternlight Nation", path: "/factions/lenternow" },
    { name: "Taramistry — Nation of Synthesis", path: "/factions/taramistry" },
    { name: "Moreg — The Nation of Endless Roads", path: "/factions/moreg" },
    { name: "Hargenbor — Guardian of the Central Seas of Asthortera", path: "/factions/hargenbor" },

    //Laws
    { name: "Asthortera Labor Rights and Employment Organization (ALREO)", path: "/laws/alreo" },
    { name: "Reltronland Immigration Policy", path: "/laws/reltronland-immigration" },
    { name: "The Soil Charter of Reltronland", path: "/laws/soil-charter" },
    { name: "Reltronland Anti-Corruption Protocol", path: "/laws/reltronland-anti-corruption" },
    { name: "The Origin of Absolute Law: From Depeisit Collapse to Reltronland Ascension", path: "/laws/anti-corruption-origin" },
    { name: "Core Constitution of Reltronland", path: "/laws/reltronland-core-constitution" },
    { name: "Aurastelia Governance Model", path: "/laws/aurastelia-governance-model" },
    { name: "🛡️ Reltronland Tobacco Regulation Act", path: "/laws/reltronland-tobacco-regulation" },
    { name: "📜 Reltronland Civilized Taxation Charter", path: "/laws/reltronland-taxation-charter"},
    { name: "⚖️ Energy Codex Year 949 BAC — Asthortera Planetary Mandate", path: "/laws/energy-codex-949"},
    { name: "🌐 Global Education Mandate in Asthortera", path: "/laws/global-education-mandate"},
    { name: "🏛️ Sentient Zoning Integrity Act — Reltronland", path: "/laws/sentient-zoning-integrity-act"},
    { name: "📜 The Stelhaven(Kalgered) Accord (983 BAC)", path: "/laws/stelhaven-accord-983"},
    { name: "📜 Galactic Alignment Treaty", path: "/laws/galactic-alignment-treaty"},
    { name: "📜 SDI Code Violation - Article 1.7.2", path: "/laws/sdi-code-1.7.2"},
    { name: "🛑 Reltronland Forbidden Substances & Narcotics Regulation Act", path: "/laws/reltronland-narcotics-regulation"},
    { name: "Stelpadland — Governance and Creed", path: "/laws/stelpadland-governance"},
    { name: "🪪 Reltronland Citizenship Ethics", path: "/laws/reltronland-citizenship-ethics"},
    { name: "⚙️ Reltronland Labor Ethics", path: "/laws/reltronland-labor-ethics"},
    { name: "🔇 Reltronland Public Silence Protocol", path: "/laws/reltronland-public-silence-protocol"},
    { name: "🔬 Sentient Upshift Lab", path: "/laws/sentient-upshift-lab"},
    { name: "✈️ The Aviashenwelt Accord — SDI-Based Visa-Free Framework", path: "/laws/aviashenwelt-accord"},
    { name: "🚫 Abolishment Decree: Feudalism & Inferiority Mentality", path: "/laws/abolish-feudalism-inferiority"},
    { name: "🏛️ Reltronland Administrative Naming Rules", path: "/laws/reltronland-administrative-naming-rules"},
    { name: "Astralis Doctrine – No Donation Policy", path: "/laws/astralis-doctrine-no-donation"},
    { name: "🛡️ RAID-1: Anti-Idleness Division of Reltronland", path: "/laws/raid1-reltronland"},
    { name: "📜 Twin Digital Accord (966 BAC)", path: "/laws/twin-digital-accord"},
    { name: "🏛️ Clarity Politics of Reltronland", path: "/laws/clarity-politics-reltronland"},
    { name: "🏛️ Reltronland Intercivilizational Gold Custody Protocol", path: "/laws/reltronland-gold-custody-protocol"},

    //Technologies
    { name: "Reltronland Hyperloop", path: "/technologies/reltronland-hyperloop" },
    { name: "Reltronian AirGrid", path: "/technologies/reltronian-airgrid" },
    { name: "Entropy Firewall", path: "/technologies/entropy-firewall" },
    { name: "Quantum Memory Cloud", path: "/technologies/quantum-memory-cloud" },
    { name: "🌍♻️ Advanced Waste Management System in Reltronland", path: "/technologies/reltronland-waste-management" },
    { name: "⚛️ Anti-Matter Energy Tech of Reltronland", path: "/technologies/reltronland-antimatter-energy" },
    { name: "🌌 Aurora Synchronization Technologies Across Asthortera", path: "/technologies/aurora-synchronization-tech" },
    { name: "☀️ Solar Flare Technology in Asthortera", path: "/technologies/solar-flare-technology" },
    { name: "✈️ Tronexus V-Class Starcraft", path: "/technologies/tronexus-v-class" },
    { name: "Web3 Library Protocol of Depcutland", path: "/technologies/web3-library-protocol-depcutland" },
    { name: "Reltroner Studio Web3 Nation Network", path: "/technologies/reltroner-studio-web3-network" },
    { name: "Twin Digital Atom (TDA) – Hyperdimensional Core Technology of Reltronland", path: "/technologies/tda-twin-digital-atom" },
    { name: "Reltronland Unified Flow Access & Payment System (UFAPS)", path: "/technologies/ufaps-reltronland" },
    { name: "🏰 Astralis Colossus Stations", path: "/technologies/astralis-colossus-stations" },
    //Principles
    { name: "Reltroner Studio Manifesto: Building Systems Beyond Survival", path: "/principles/reltroner" },
    { name: "💸 Funded Roadmap — If This Project Gets Backed", path: "/principles/funded-roadmap" },
    { name: "The Death of Feudalism: Astralis Principle 07", path: "/principles/death-of-feudalism" },
    { name: "Code of Ethics: Zero Tolerance for Sexual Content", path: "/principles/anti-sexual-content" },
    { name: "📘 YouTubers Have Channels, I Have a Civilization", path: "/principles/youtubers-have-civilization" },
    { name: "Multirealm Authority", path: "/principles/multirealm-authority" },
    { name: "🌍 Asthortera Type I.9 Doctrine", path: "/principles/asthortera-type-i9-doctrine" },
    { name: "📜 The Civilizational Maturity Doctrine of Reltroner Studio", path: "/principles/civilizational-maturity-reltroner" },
    { name: "🌌 The Emotion No One Talks About: Being Raised by Space, Not People", path: "/principles/raised-by-space" },
    { name: "🗣️ Language Paradox in Reltroner Studio", path: "/principles/language-paradox-reltroner" },
    { name: "Reltroner Design Manifesto: Building Interfaces for Conscious Civilizations", path: "/principles/reltroner-design" },
    { name: "💎 Astralis Capital Doctrine", path: "/principles/astralis-capital-doctrine" },
    { name: "🏛️ Reltronland Civilization Framework", path: "/principles/reltronland-civilization-framework" },
    { name: "📚 Reltronland Education Framework", path: "/principles/reltronland-education-framework" },
    { name: "💰 Reltronland Fiscal Grid", path: "/principles/reltronland-fiscal-grid" },
    { name: "📖 Reltronland Knowledge Architecture", path: "/principles/reltronland-knowledge-architecture" },
    { name: "🧠 SDI Engineering Principles", path: "/principles/sdi-engineering-principles" },
    { name: "No Excuse for Mediocrity – A Red Pill Cosmic Manifesto", path: "/principles/no-excuse-for-mediocrity" },
    { name: "Life as a System Architect – Beyond Code", path: "/principles/life-as-a-system-architect" },
    { name: "Reltroner is a System Architecture Firm Disguised as a Creative World-Building Studio", path: "/principles/reltroner-underlayer" },
    { name: "Worst-Case Survival Protocol", path: "/principles/worst-case-protocol" },
    { name: "How I Went from Crypto Loser to Infrastructure Winner", path: "/principles/crypto-infra-transition" },
    { name: "The Art of Comment Engineering", path: "/principles/the-art-of-comment-engineering" },
    { name: "📜 Manifesto of the Post-Efficiency Era", path: "/principles/post-efficiency-manifesto" },
    { name: "📜 Humanoid Standard Doctrine — Universality of Sentient Form", path: "/principles/humanoid-standard-doctrine" },
    { name: "Modular Civilizational Economy of Asthortera", path: "/principles/asthortera-modular-economy" },
    //Items
    { name: "🩸 Abyss Ritual Items", path: "/items/abyss-ritual-items" },
    { name: "Reltroner AI Fork – Memory-as-a-Service Product Sheet", path: "/items/reltroner-ai-fork" },
    { name: "✏️ GraphiCore — The Sentient Pencil of Pencilfania", path: "/items/graphicorespec" },
    { name: "Reltroner Startup Pitch Deck", path: "/items/reltroner-startup-pitch-deck" },

  ];

  const groupedPages = pages.reduce((acc, page) => {
    if (!acc[page.tag]) acc[page.tag] = [];
    acc[page.tag].push(page);
    return acc;
  }, {});

  return (
    <CommandDialog
  open={open}
  onOpenChange={setOpen}
  className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/30 backdrop-blur-sm transition-opacity duration-200 ease-in-out"
>
  <VisuallyHidden>
    <DialogTitle>Command Palette</DialogTitle>
  </VisuallyHidden>

  <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-600 p-4">
    <CommandInput
      placeholder="Search page..."
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4"
    />
    <CommandList className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="⬇️ Click below to select a page">
        {pages.map((page) => (
          <CommandItem
            key={page.path}
            value={page.name}
            onSelect={() => {
              router.push(page.path);
              setOpen(false);
            }}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          >
            {page.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </div>
</CommandDialog>
  );
}
