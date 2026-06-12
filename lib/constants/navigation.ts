import { ECOSYSTEM_APPS } from './apps';

export interface NavigationItem {
  name: string;
  href: string;
}

export const topNavigation: NavigationItem[] = [
  { name: 'Ecosystem', href: '/' },
  { name: 'Apps', href: '#apps' },
  { name: 'Knowledge', href: '#knowledge' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const knowledgeNavigation: NavigationItem[] = [
  { name: 'For Recruiters', href: '/blog/for-recruiters' },
  { name: 'Blog', href: '/blog' },
  { name: 'Principles', href: '/principles' },
  { name: 'Philosophies', href: '/philosophies' },
  { name: 'Laws', href: '/laws' },
  { name: 'Items', href: '/items' },
  { name: 'Myths', href: '/myths' },
  { name: 'Organizations', href: '/organizations' },
  { name: 'Places', href: '/places' },
  { name: 'Statistics', href: '/statistics' },
  { name: 'Technologies', href: '/technologies' },
  { name: 'Characters', href: '/characters' },
  { name: 'Factions', href: '/factions' },
  { name: 'Cultures', href: '/cultures' },
  { name: 'Events', href: '/events' },
  { name: 'Series', href: '/series' },
  { name: 'Disclaimer', href: '/blog/disclaimer' },
];

export const ecosystemNavigation = ECOSYSTEM_APPS.map((app) => ({
  name: app.name,
  href: app.url,
  status: app.status,
  type: app.type,
  description: app.description,
}));
