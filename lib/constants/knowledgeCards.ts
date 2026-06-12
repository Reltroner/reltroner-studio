import { knowledgeNavigation } from './navigation';

export interface KnowledgeCardMeta {
  name: string;
  href: string;
  description: string;
  accent: string;
  gradient: string;
}

export const KNOWLEDGE_CARDS: KnowledgeCardMeta[] = [
  {
    name: 'For Recruiters & Collaborators',
    href: '/blog/for-recruiters',
    description: 'Public-facing profile and collaboration context for recruiters and partners.',
    accent: 'Recruiters',
    gradient: 'from-blue-800/40 to-slate-800/80',
  },
  {
    name: 'Blog',
    href: '/blog',
    description: 'Editorial essays, updates, and journal archives.',
    accent: 'Editorial',
    gradient: 'from-blue-900/40 to-slate-900/80',
  },
  {
    name: 'Principles',
    href: '/principles',
    description: 'Core doctrines and foundational worldbuilding rules.',
    accent: 'Doctrine',
    gradient: 'from-indigo-900/40 to-slate-900/80',
  },
  {
    name: 'Philosophies',
    href: '/philosophies',
    description: 'Reflective doctrines, existential frameworks, and worldview systems.',
    accent: 'Reflection',
    gradient: 'from-violet-900/40 to-slate-900/80',
  },
  {
    name: 'Laws',
    href: '/laws',
    description: 'Legal charters, governance rules, and institutional protocols.',
    accent: 'Governance',
    gradient: 'from-slate-700/40 to-slate-900/80',
  },
  {
    name: 'Items',
    href: '/items',
    description: 'Artifacts, tools, objects, and symbolic assets within the archive.',
    accent: 'Artifacts',
    gradient: 'from-zinc-700/40 to-slate-900/80',
  },
  {
    name: 'Myths',
    href: '/myths',
    description: 'Abyssal stories, symbolic legends, and metaphysical narratives.',
    accent: 'Mythos',
    gradient: 'from-red-900/40 to-slate-900/80',
  },
  {
    name: 'Organizations',
    href: '/organizations',
    description: 'Corporate entities, institutions, and networks.',
    accent: 'Institution',
    gradient: 'from-sky-900/40 to-slate-900/80',
  },
  {
    name: 'Places',
    href: '/places',
    description: 'Maps, cities, and geographical locations.',
    accent: 'Location',
    gradient: 'from-emerald-900/40 to-slate-900/80',
  },
  {
    name: 'Statistics',
    href: '/statistics',
    description: 'Analytics, charts, and metrics of the ecosystem.',
    accent: 'Metrics',
    gradient: 'from-cyan-900/40 to-slate-900/80',
  },
  {
    name: 'Technologies',
    href: '/technologies',
    description: 'Systems, circuits, and futuristic tech frameworks.',
    accent: 'System',
    gradient: 'from-purple-900/40 to-slate-900/80',
  },
  {
    name: 'Characters',
    href: '/characters',
    description: 'Profiles, identities, and people of consequence.',
    accent: 'Identity',
    gradient: 'from-rose-900/40 to-slate-900/80',
  },
  {
    name: 'Factions',
    href: '/factions',
    description: 'Emblems, alliances, and governance structures.',
    accent: 'Alliance',
    gradient: 'from-orange-900/40 to-slate-900/80',
  },
  {
    name: 'Cultures',
    href: '/cultures',
    description: 'Heritage, rituals, and societal norms.',
    accent: 'Heritage',
    gradient: 'from-teal-900/40 to-slate-900/80',
  },
  {
    name: 'Events',
    href: '/events',
    description: 'Historical timelines and future signals.',
    accent: 'Timeline',
    gradient: 'from-amber-900/40 to-slate-900/80',
  },
  {
    name: 'Series',
    href: '/series',
    description: 'Story arcs, collections, and media series.',
    accent: 'Collection',
    gradient: 'from-fuchsia-900/40 to-slate-900/80',
  },
  {
    name: 'Disclaimer',
    href: '/blog/disclaimer',
    description: 'Legal and public-facing disclaimer for Reltroner Studio.',
    accent: 'Legal',
    gradient: 'from-gray-800/40 to-slate-900/80',
  },
];
