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
    { name: "Laws", path: "/laws" },
    { name: "Contact", path: "/contact" },
    { name: "Portfolio", path: "/blog/for-recruiters" },
    { name: "Principles", path: "/principles" },
    { name: "Disclaimer", path: "/blog/disclaimer" },
    { name: "2v3 Reltroner Joker", path: "/blog/2v3-reltroner-joker" },
    { name: "12 Month Roadmap", path: "/blog/12-month-roadmap" },
    { name: "A Lifelong Build", path: "/blog/a-lifelong-build" },
    { name: "Asthortera Character Pocketbook", path: "/blog/asthortera-character-pocketbook" },
    { name: "Astralis Evaluation Framework", path: "/blog/astralis-evaluation-framework" },
    { name: "Astralis Leadership Origin", path: "/blog/astralis-leadership-origin" },
    { name: "Astralis Nytherion Manifesto", path: "/blog/astralis-nytherion-manifesto" },
    { name: "Astralis Poem", path: "/blog/astralis-poem" },
    { name: "Astralis Top 001", path: "/blog/astralis-top001" },
    { name: "Astralis Vanguard", path: "/blog/astralis-vanguard" },
    { name: "Certificate Achievement", path: "/blog/certificate-achievement" },
    { name: "Creative Lore Bible", path: "/blog/creative-lore-bible" },
    { name: "Cultures Civilizations", path: "/blog/cultures-civilizations" },
    { name: "Timeline of Events", path: "/blog/events" },
    { name: "External Creator Handbook", path: "/blog/external-creator-handbook" },
    { name: "Fullstack Interview Summary", path: "/blog/fullstack-interview-summary" },
    { name: "GPTPlus", path: "/blog/gptplus" },
    { name: "Legal Disclaimer", path: "/blog/legal-disclaimer" },
    { name: "Grandmaster Lorebook of Asthortera — Collector’s Compendium", path: "/blog/lorebook-asthortera" },
    { name: "Magic System", path: "/blog/magic-system" },
    { name: "Manifesto Leadership", path: "/blog/manifesto-leadership" },
    { name: "Piday", path: "/blog/piday" },
    { name: "Pinews", path: "/blog/pinews" },
    { name: "Politics", path: "/blog/politics" },
    { name: "Redpill Abyssborn", path: "/blog/redpill-abyssborn" },
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
    // Cultures
    { name: "Children of Asthortera", path: "/cultures/children-of-asthortera" },
    { name: "Cuteness Manifesto", path: "/cultures/cuteness-manifesto" },
    { name: "Mask Reltronland", path: "/cultures/mask-reltronland" },
    { name: "Rest Culture", path: "/cultures/rest-culture" },
    { name: "Fashion Culture Manual of Asthortera", path: "/cultures/fashion-culture" },
    { name: "Major Cultural Exports — Reltronland vs Depcutland", path: "/cultures/cultural-exports" },
    { name: "Music Culture of Depcutland", path: "/cultures/depcutland-music" },
    { name: "Music Culture of Reltronland", path: "/cultures/reltronland-music" },
    { name: "Top 5 Clichés Destroyed by the Gender Friendship Manifesto", path: "/cultures/anti-klise-gender-friendship" },
    { name: "Aurora Faith of Aurastelia", path: "/cultures/aurora-faith" },
    { name: "Gender Friendship Manifesto of Asthortera", path: "/cultures/gender-friendship-manifesto" },
    // Events
    { name: "Scout Parade", path: "/events/scoutparade" },
    { name: "Origins of Reltronland", path: "/events/reltronland-founding" },
    { name: "The True Purpose Behind Depcutland’s Founding", path: "/events/depcutland-founding" },
    { name: "When Raina Read The Letter", path: "/events/when-raina-read-the-letter" },
    { name: "Rei in Abyss: Spiral Memory", path: "/events/rei-in-abyss-spiral-memory" },
    { name: "Rei Shows Earth to Raina", path: "/events/rei-shows-earth" },
    //Myths
    { name: "The Abyss Whisper", path: "/myths/abyss-whisper" },
    { name: "Reltroner’s Zero Day", path: "/myths/reltroners-zero-day" },
    { name: "The 5 Awakening Signals", path: "/myths/five-awakening-signals" },
    { name: "The Silent Mouthpiece", path: "/myths/silent-mouthpiece" },
    // Organizations
    { name: "Henchoeway", path: "/organizations/henchoeway" },
    { name: "Reltroner Holding", path: "/organizations/reltroner-holding" },
    // Places
    { name: "Heart of the Abyss", path: "/places/dark-abyss" },
    { name: "Eterna Ruin", path: "/places/eterna-ruin" },
    { name: "Llyn Geda", path: "/places/llyn-geda" },
    { name: "Oakcottage", path: "/places/oakcottage" },
    { name: "Whispergrove", path: "/places/whispergrove" },
    { name: "Province Profile: Leastroper – A Land Beyond Conflict", path: "/places/leastroper-profile" },
    { name: "The Safe House Pact", path: "/places/the-safe-house-pact" },
    { name: "Why Aurastelia is the Most Beautiful Realm", path: "/places/why-aurastelia-is-the-most-beautiful-realm" },
    // Series
    { name: "False Portal", path: "/series/false-portal" },
    { name: "The Abyss of Comfort", path: "/series/the-abyss-of-comfort" },
    { name: "Rei in Abyss", path: "/series/rei-in-abyss" },
    { name: "Reltronland ComicBall Wiki", path: "/series/comicball" },
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
    // Philosophies
    { name: "Nytherion Abyss", path: "/philosophies/nytherion-abyss" },
    { name: "📜 The Builders Who Were Misjudged", path: "/philosophies/misjudged-builders" },
    { name: "🛡️ I Am Not the Villain You Feared", path: "/philosophies/not-the-villain" },
    { name: "🛡️ When the System Mistakes You for a Threat, You Know You’re Building Something Real", path: "/philosophies/system-mistakes-you" },
    { name: "🧩 The Wall of Silenced Builders", path: "/philosophies/wall-of-silenced-builders" },
    { name: "🌙 Charter of Sacred Love & Intimacy", path: "/philosophies/raina-rei-charter" },
    // Factions
    { name: "Reltronland", path: "/factions/reltronland" },
    { name: "Depcutland", path: "/factions/depcutland" },
    { name: "Fractal Civilizations of Asthortera: Strategic Identity Map", path: "/factions/fractal-civilizations" },
    { name: "Reltronland & Depcutland: The Pillars Who Embrace the International Family", path: "/factions/international-family" },
    { name: "Reltronland vs Depcutland: The Twin Pillars of Conscious Civilization", path: "/factions/reltronland-vs-depcutland" },    
    { name: "Reltronball & Depcutball: Bureaucracy Bros", path: "/factions/bureaucracy-bros" },
    { name: "Cenrestier Country Profile — Land of Fortresses", path: "/factions/cenrestier-country-profile" },
    { name: "Kalgered Country Profile — The Neutral Heart of Asthortera", path: "/factions/kalgered-country-profile" },

    //Laws
    { name: "Asthortera Labor Rights and Employment Organization (ALREO)", path: "/laws/alreo" },
    { name: "Reltronland Immigration Policy", path: "/laws/reltronland-immigration" },
    { name: "The Soil Charter of Reltronland", path: "/laws/soil-charter" },
    { name: "Reltronland Anti-Corruption Protocol", path: "/laws/reltronland-anti-corruption" },
    { name: "The Origin of Absolute Law: From Depeisit Collapse to Reltronland Ascension", path: "/laws/anti-corruption-origin" },
    { name: "Core Constitution of Reltronland", path: "/laws/reltronland-core-constitution" },
    { name: "Aurastelia Governance Model", path: "/laws/aurastelia-governance-model" },
    //Technologies
    { name: "Reltronland Hyperloop", path: "/technologies/reltronland-hyperloop" },
    { name: "Reltronian AirGrid", path: "/technologies/reltronian-airgrid" },
    { name: "Entropy Firewall", path: "/technologies/entropy-firewall" },
    { name: "Quantum Memory Cloud", path: "/technologies/quantum-memory-cloud" },
    //Principles
    { name: "Reltroner Studio Manifesto: Building Systems Beyond Survival", path: "/principles/reltroner" },
    { name: "The Death of Feudalism: Astralis Principle 07", path: "/principles/death-of-feudalism" },
    { name: "Code of Ethics: Zero Tolerance for Sexual Content", path: "/principles/anti-sexual-content" },

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
