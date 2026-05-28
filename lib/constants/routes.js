import { COLLECTIONS } from "@/lib/constants/collections";

/** @typedef {import('@/types/routes').AppRouteItem} AppRouteItem */
/** @typedef {import('@/types/routes').NavigationItem} NavigationItem */

/** @type {AppRouteItem[]} */
export const STATIC_ROUTE_ITEMS = [
  {
    name: "Home",
    path: "/",
    group: "Pages",
    description: "Entry point into the studio archive, collections, and featured worldbuilding records.",
    tags: ["archive", "collections", "worldbuilding"],
  },
  {
    name: "About",
    path: "/about",
    group: "Pages",
    description: "Studio philosophy, authorship context, and the mission behind the civilization archive.",
    tags: ["studio", "philosophy", "mission"],
  },
  {
    name: "Contact",
    path: "/contact",
    group: "Pages",
    description: "Direct outreach for collaborators, readers, recruiters, and archive inquiries.",
    tags: ["contact", "collaboration", "recruiting"],
  },
  {
    name: "For Recruiters & Collaborators",
    path: "/blog/for-recruiters",
    group: "Pages",
    description: "Portfolio-style overview for collaborators, recruiters, and professional context.",
    tags: ["portfolio", "recruiting", "collaboration"],
  },
  {
    name: "Disclaimer",
    path: "/blog/disclaimer",
    group: "Pages",
    description: "Usage notes, legal framing, and context for the archive and its materials.",
    tags: ["legal", "usage", "policies"],
  },
];

/** @type {NavigationItem[]} */
export const NAV_ITEMS = [
  { name: "🏠 Home", href: "/" },
  { name: "ℹ️ About", href: "/about" },
  { name: "📝 Blog", href: COLLECTIONS.blog.route },
  { name: "👤 Characters", href: COLLECTIONS.characters.route },
  { name: "🎬 Series", href: COLLECTIONS.series.route },
  { name: "🌆 Places", href: COLLECTIONS.places.route },
  { name: "🎎 Cultures", href: COLLECTIONS.cultures.route },
  { name: "🧠 Philosophies", href: COLLECTIONS.philosophies.route },
  { name: "⚖️ Laws", href: COLLECTIONS.laws.route },
  { name: "🧬 Technologies", href: COLLECTIONS.technologies.route },
  { name: "🗡️ Items", href: COLLECTIONS.items.route },
  { name: "🛡️ Factions", href: COLLECTIONS.factions.route },
  { name: "🕯️ Myths", href: COLLECTIONS.myths.route },
  { name: "📊 Statistics", href: COLLECTIONS.statistics.route },
  { name: "🏢 Organizations", href: COLLECTIONS.organizations.route },
  { name: "📅 Events", href: COLLECTIONS.events.route },
  { name: "📜 Principles", href: COLLECTIONS.principles.route },
  { name: "🧳 Portfolio", href: "/blog/for-recruiters" },
  { name: "📬 Contact", href: "/contact" },
  { name: "⚠️ Disclaimer", href: "/blog/disclaimer" },
];