import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import { resolveStaticAssetUrl } from "@/lib/assets/cdn";
import { resolveCdnImageUrl } from "@/lib/assets/image";
import { COLLECTIONS, COLLECTION_ORDER } from "@/lib/constants/collections";
import { STATIC_ROUTE_ITEMS } from "@/lib/constants/routes";
import { ECOSYSTEM_APPS } from "@/lib/constants/apps";
import { processVideoDirectives, injectVideoEmbeds } from "@/lib/utils/videoEmbeds";
import { enforcePublicUrls } from "@/lib/security/markdown-rendering";
import { articleMarkdownHtml } from "@/lib/content/markdown-renderer";
import { classifyContent, isPublicContent, MAX_SEARCHABLE_TEXT_LENGTH } from "@/lib/content/taxonomy";
import { discoverRelatedContent } from "@/lib/content/search";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const WORDS_PER_MINUTE = 220;
const CONTENT_DIAGNOSTICS_PREFIX = "[content]";
const reportedContentDiagnostics = new Set();
const TOPIC_STOP_WORDS = new Set([
  "about",
  "against",
  "also",
  "and",
  "archive",
  "article",
  "asthortera",
  "because",
  "build",
  "built",
  "from",
  "into",
  "journal",
  "record",
  "reltroner",
  "studio",
  "that",
  "their",
  "there",
  "this",
  "through",
  "with",
  "worldbuilding",
]);

function toDateValue(value) {
  if (!value) return 0;

  const parsed = new Date(value);
  const timestamp = parsed.getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function normalizeDateString(value) {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  return String(value);
}

function normalizeStringList(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
  }

  const normalizedValue = String(value)
    .trim()
    .replace(/^\\?\[/, "")
    .replace(/\\?\]$/, "");

  return [
    ...new Set(
      normalizedValue
        .split(",")
        .map((item) => item.trim().replace(/^['\"]|['\"]$/g, ""))
        .filter(Boolean)
    )
  ];
}

function stripMarkdown(source) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[\*_~>#|]/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/^[^a-z0-9]+/i, "")
    .trim();
}

function getWordCount(source) {
  const plainText = stripMarkdown(source);

  if (!plainText) {
    return 0;
  }

  return plainText.split(/\s+/).filter(Boolean).length;
}

function getReadingTime(source) {
  return Math.max(1, Math.round(getWordCount(source) / WORDS_PER_MINUTE));
}

function getSummaryText(description, source) {
  if (description) {
    return description;
  }

  const plainText = stripMarkdown(source);

  if (!plainText) {
    return "";
  }

  if (plainText.length <= 180) {
    return plainText;
  }

  return `${plainText.slice(0, 177).trimEnd()}...`;
}

export function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return ""; }
    })
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try { return String.fromCodePoint(parseInt(dec, 10)); } catch { return ""; }
    })
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function slugifyText(value) {
  return String(decodeHtmlEntities(value))
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function normalizeTopicValue(value) {
  return String(value || "").trim().toLowerCase();
}

function toTitleCase(value) {
  return String(value)
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function decorateContentHtml(contentHtml, headings) {
  let decorated = contentHtml;

  decorated = decorated
    .replace(/<blockquote>/g, '<blockquote class="archive-quote">')
    .replace(/<hr\s*\/?>(?:\n)?/g, '<hr class="archive-divider" />')
    .replace(/<img /g, '<img loading="lazy" class="editorial-inline-media" ')
    .replace(/<table>([\s\S]*?)<\/table>/g, '<div class="archive-table-wrap"><table class="archive-table">$1</table></div>')
    .replace(
      /<blockquote class="archive-quote">\s*<p>\[!(NOTE|ARCHIVE|TIMELINE|REFERENCE)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
      (_, variant, body) => {
        return `<aside class="archive-callout" data-variant="${String(variant).toLowerCase()}"><p class="archive-callout-label">${toTitleCase(variant)}</p><div>${body}</div></aside>`;
      }
    );

  decorated = decorated.replace(/\b(src|href)=["']([^"']+)["']/gi, (match, attribute, url) => {
    const resolvedUrl = resolveStaticAssetUrl(url);

    if (!resolvedUrl || resolvedUrl === url) {
      return match;
    }

    return `${attribute}="${resolvedUrl}"`;
  });

  return { contentHtml: decorated, headings };
}

function extractTopicTokens(...values) {
  const tokens = values
    .filter(Boolean)
    .flatMap((value) =>
      String(value)
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2 && !TOPIC_STOP_WORDS.has(token))
    );

  return [...new Set(tokens)];
}

function getSharedValues(leftValues, rightValues) {
  const rightSet = new Set(rightValues);
  return leftValues.filter((value) => rightSet.has(value));
}

function buildRelationshipLabel(currentEntry, candidate, sharedTags) {
  if (sharedTags.length > 0) {
    return `Shared topic · ${toTitleCase(sharedTags[0])}`;
  }

  if (
    currentEntry.category &&
    candidate.category &&
    normalizeTopicValue(currentEntry.category) === normalizeTopicValue(candidate.category)
  ) {
    return `Shared category · ${candidate.category}`;
  }

  if (
    currentEntry.type &&
    candidate.type &&
    normalizeTopicValue(currentEntry.type) === normalizeTopicValue(candidate.type)
  ) {
    return `Shared record type · ${candidate.type}`;
  }

  if (currentEntry.collection === candidate.collection) {
    return `${COLLECTIONS[candidate.collection].title} archive`;
  }

  return "Associated archive record";
}

function formatTitleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function resolveContentImagePath(image) {
  if (!image) {
    return null;
  }

  const normalizedImage = String(image).trim();

  if (!normalizedImage) {
    return null;
  }

  if (!normalizedImage.startsWith("/")) {
    return normalizedImage;
  }

  return resolveCdnImageUrl(normalizedImage);
}

function getContentDiagnosticLocation(error) {
  if (!error?.mark) {
    return "";
  }

  const line = Number.isInteger(error.mark.line) ? error.mark.line + 1 : null;
  const column = Number.isInteger(error.mark.column) ? error.mark.column + 1 : null;

  if (line && column) {
    return `:${line}:${column}`;
  }

  if (line) {
    return `:${line}`;
  }

  return "";
}

function reportContentDiagnostic(collection, fileName, error, phase = "frontmatter parsing") {
  const location = getContentDiagnosticLocation(error);
  const reason = error?.reason || error?.message || "Unknown content pipeline error";
  const diagnosticKey = `${phase}:${collection}/${fileName}${location}:${reason}`;

  if (reportedContentDiagnostics.has(diagnosticKey)) {
    return;
  }

  reportedContentDiagnostics.add(diagnosticKey);

  console.error(
    `${CONTENT_DIAGNOSTICS_PREFIX} ${phase} failed for ${collection}/${fileName}${location}: ${reason}`,
  );
}

function reportCollectionDiagnostic(collection, error, phase = "collection registry") {
  const reason = error?.message || "Unknown collection pipeline error";
  const diagnosticKey = `${phase}:${collection}:${reason}`;

  if (reportedContentDiagnostics.has(diagnosticKey)) {
    return;
  }

  reportedContentDiagnostics.add(diagnosticKey);
  console.error(`${CONTENT_DIAGNOSTICS_PREFIX} ${phase} failed for ${collection}: ${reason}`);
}

async function readParsedContentFile(collection, fileName, filePath) {
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      source,
      data,
      content,
    };
  } catch (error) {
    reportContentDiagnostic(collection, fileName, error);
    return null;
  }
}

function normalizeContentSlug(value) {
  const slug = String(value).trim();
  let decoded;
  try { decoded = decodeURIComponent(slug); } catch { throw new Error("Invalid encoded content slug"); }
  if (!decoded || decoded === "." || decoded === ".." || /[\\/;?#\u0000-\u001f]/.test(decoded)) {
    throw new Error("Unsafe content slug or alias");
  }
  return slug;
}

function normalizeFrontmatter(collection, fileName, rawData, content) {
  const fileSlug = fileName.replace(/\.md$/, "");
  const slug = normalizeContentSlug(rawData.slug || fileSlug);
  const aliases = Array.isArray(rawData.aliases) ? rawData.aliases.filter(Boolean).map(normalizeContentSlug) : [];
  const summary = getSummaryText(rawData.description, content);

  if (slug !== fileSlug) {
    aliases.push(fileSlug);
  }

  return {
    ...rawData,
    collection,
    fileName,
    slug,
    aliases: [...new Set(aliases)],
    title: rawData.title || formatTitleFromSlug(slug),
    description: rawData.description || summary,
    summary,
    image: rawData.image || null,
    role: rawData.role || "",
    quote: rawData.quote || "",
    category: rawData.category || "",
    type: rawData.type || "",
    tags: normalizeStringList(rawData.tags),
    date: normalizeDateString(rawData.date),
    modified: normalizeDateString(rawData.modified || rawData.date),
    startDate: normalizeDateString(rawData.startDate),
    endDate: normalizeDateString(rawData.endDate),
    author: rawData.author || "Rei Reltroner",
    published: isPublicContent(rawData),
    ...classifyContent(rawData, `${collection}:${slug}`),
    searchableText: [rawData.role, rawData.quote, rawData.category, rawData.type, stripMarkdown(content)].filter(Boolean).join(" ").slice(0, MAX_SEARCHABLE_TEXT_LENGTH),
    revision: `sha256:${createHash("sha256").update(JSON.stringify(rawData)).update(content).digest("hex")}`,
    readingTime: getReadingTime(content),
    wordCount: getWordCount(content),
  };
}

async function listMarkdownFiles(collection) {
  const config = COLLECTIONS[collection];

  if (!config) {
    throw new Error(`Unknown content collection: ${collection}`);
  }

  const directory = path.join(CONTENT_ROOT, config.contentDir);
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));
}

const getCollectionRegistry = cache(async (collection) => {
  const files = await listMarkdownFiles(collection);
  const items = await Promise.all(
    files.map(async (entry) => {
      const filePath = path.join(CONTENT_ROOT, collection, entry.name);
      const parsedFile = await readParsedContentFile(collection, entry.name, filePath);

      if (!parsedFile) {
        return null;
      }

      try {
        const frontmatter = normalizeFrontmatter(
          collection,
          entry.name,
          parsedFile.data,
          parsedFile.content,
        );
        const image = resolveContentImagePath(frontmatter.image);

        return {
          ...frontmatter,
          image,
          filePath,
          route: `${COLLECTIONS[collection].route}/${frontmatter.slug}`,
        };
      } catch (error) {
        reportContentDiagnostic(collection, entry.name, error, "registry normalization");
        return null;
      }
    })
  );

  const validItems = items.filter(Boolean);

  return validItems.sort((left, right) => {
    const publishedDelta = Number(right.published) - Number(left.published);
    if (publishedDelta !== 0) return publishedDelta;

    const dateDelta = toDateValue(right.date) - toDateValue(left.date);
    if (dateDelta !== 0) return dateDelta;

    return left.title.localeCompare(right.title);
  });
});

let cachedAllPublishedEntries = null;
const getAllPublishedEntries = cache(async () => {
  if (cachedAllPublishedEntries) return cachedAllPublishedEntries;
  const entries = await Promise.all(
    COLLECTION_ORDER.map((collection) => getCollectionEntries(collection))
  );

  cachedAllPublishedEntries = entries.flat();
  return cachedAllPublishedEntries;
});

async function getRelatedEntries(entry, limit = 3) {
  const allEntries = await getAllPublishedEntries();
  const toSearchEntry = (item) => ({ ...item, id: `${item.collection}:${item.slug}`, canonicalRoute: item.route });
  const matches = discoverRelatedContent(allEntries.map(toSearchEntry), toSearchEntry(entry), limit);
  return matches.map((candidate) => ({
    title: candidate.title,
    route: candidate.route,
    description: candidate.summary,
    date: candidate.date,
    collection: candidate.collection,
    collectionTitle: COLLECTIONS[candidate.collection].title,
    relationshipLabel: buildRelationshipLabel(entry, candidate, getSharedValues(entry.tags.map(normalizeTopicValue), candidate.tags.map(normalizeTopicValue))),
    tags: candidate.tags.slice(0, 3),
  }));
}

export async function getCollectionEntries(collection, options = {}) {
  const { includeDrafts = false } = options;
  let items;

  try {
    items = await getCollectionRegistry(collection);
  } catch (error) {
    reportCollectionDiagnostic(collection, error);
    return [];
  }

  if (includeDrafts) {
    return items;
  }

  return items.filter((item) => item.published);
}

const collectionEntryResultCache = new Map();

export async function getCollectionEntry(collection, slug) {
  const cacheKey = `${collection}:${slug}`;
  if (collectionEntryResultCache.has(cacheKey)) {
    return collectionEntryResultCache.get(cacheKey);
  }

  let items;

  try {
    items = await getCollectionRegistry(collection);
  } catch (error) {
    reportCollectionDiagnostic(collection, error, "entry lookup");
    return null;
  }

  const entry = items.find((item) => item.slug === slug || item.aliases.includes(slug));

  if (!entry || !entry.published) {
    return null;
  }

  const parsedFile = await readParsedContentFile(collection, entry.fileName, entry.filePath);

  if (!parsedFile) {
    return null;
  }

  try {
    const { transformedMarkdown, placeholders } = processVideoDirectives(parsedFile.content, entry.title);
    const processed = await remark().use(gfm).use(enforcePublicUrls).use(articleMarkdownHtml, { slugify: slugifyText, title: entry.title, mediaPlaceholders: [...placeholders.keys()] }).process(transformedMarkdown);
    const { contentHtml, headings } = decorateContentHtml(processed.toString(), processed.data.articleHeadings || []);
    const finalContentHtml = injectVideoEmbeds(contentHtml, placeholders);
    const extracted = processed.data.articleIntroduction;
    const decorateFragment = (html) => injectVideoEmbeds(decorateContentHtml(html, []).contentHtml, placeholders);
    const introduction = {
      ...extracted,
      bodyHtml: decorateFragment(extracted.bodyHtml),
      ...(extracted.leadHtml ? { leadHtml: decorateFragment(extracted.leadHtml) } : {}),
      ...(extracted.titleHtml ? { titleHtml: decorateFragment(extracted.titleHtml) } : {}),
    };
    const relatedEntries = await getRelatedEntries(entry);

    const result = {
      entry,
      contentHtml: finalContentHtml,
      introduction,
      headings,
      relatedEntries,
      redirectTo:
        entry.slug !== slug ? `${COLLECTIONS[collection].route}/${entry.slug}` : null,
    };
    collectionEntryResultCache.set(cacheKey, result);
    return result;
  } catch (error) {
    reportContentDiagnostic(collection, entry.fileName, error, "content rendering");
    return null;
  }
}

export async function getCollectionStaticParams(collection) {
  const items = await getCollectionEntries(collection);
  return items.map((item) => ({ slug: item.slug }));
}

/**
 * Navigation entries for Ctrl+K. With `includeArchiveEntries: false` only static
 * pages, ecosystem apps and collection indexes are returned; article records are
 * loaded lazily from the shared build-time public index (/api/public-index).
 */
export async function getCommandPaletteEntries({ includeArchiveEntries = true } = {}) {
  const items = await Promise.all(
    COLLECTION_ORDER.map(async (collection) => {
      const config = COLLECTIONS[collection];
      const entries = await getCollectionEntries(collection);

      const staticEntry = {
        name: config.title,
        path: config.route,
        group: config.group,
        description: config.description,
      };

      const contentEntries = entries.map((entry) => ({
        id: `${entry.collection}:${entry.slug}`,
        name: entry.title,
        path: `${config.route}/${entry.slug}`,
        collection: entry.collection,
        canonicalRoute: entry.route,
        published: true,
        classification: entry.classification,
        needsEditorialReview: entry.needsEditorialReview,
        searchableText: entry.searchableText,
        group: config.title,
        description: entry.summary,
        category: entry.category,
        tags: entry.tags,
      }));

      return { staticEntry, contentEntries };
    })
  );

  const ecosystemEntries = ECOSYSTEM_APPS
    .filter((app) => app.status === 'live' && app.name !== 'Future Apps' && app.url !== '#')
    .map((app) => ({
      name: app.name,
      path: app.url,
      group: 'Ecosystem Apps',
      description: app.description,
    }));

  const contentItems = items.flatMap(({ contentEntries }) => contentEntries);
  const archiveItems = items.flatMap(({ staticEntry, contentEntries }) => includeArchiveEntries ? [staticEntry, ...contentEntries] : [staticEntry]);
  const publicRoutes = new Set(contentItems.filter((item) => item.published).map((item) => item.path));
  const staticItems = STATIC_ROUTE_ITEMS.filter((item) => {
    const isArticleReference = Object.values(COLLECTIONS).some((config) => item.path.startsWith(`${config.route}/`));
    return !isArticleReference || publicRoutes.has(item.path);
  });
  const uniqueEntries = new Map();
  for (const item of [...ecosystemEntries, ...staticItems, ...archiveItems]) {
    const previous = uniqueEntries.get(item.path);
    uniqueEntries.set(item.path, previous ? { ...previous, ...item } : item);
  }
  return [...uniqueEntries.values()];
}
