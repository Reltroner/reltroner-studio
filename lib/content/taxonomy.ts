/** Explicit editorial labels. Collection names alone never establish epistemic scope. */
export const EPISTEMIC_CLASSIFICATIONS = [
  "FICTION_CANON", "FICTION_SPECULATIVE", "REAL_WORLD_ANALYSIS",
  "CREATIVE_FRAMEWORK", "ENGINEERING_CASE_STUDY", "CROSS_DOMAIN_ANALOGY",
] as const;

export type EpistemicClassification = typeof EPISTEMIC_CLASSIFICATIONS[number];
export const MAX_SEARCHABLE_TEXT_LENGTH = 1800;
export const CLASSIFICATION_LABELS: Record<EpistemicClassification, string> = {
  FICTION_CANON: "Fiction · canon",
  FICTION_SPECULATIVE: "Fiction · speculative",
  REAL_WORLD_ANALYSIS: "Real-world analysis",
  CREATIVE_FRAMEWORK: "Creative framework",
  ENGINEERING_CASE_STUDY: "Engineering case study",
  CROSS_DOMAIN_ANALOGY: "Cross-domain analogy",
};

export interface ClassificationResult {
  classification: EpistemicClassification | null;
  classificationSource: "frontmatter" | "reviewed-mapping" | "editorial-review";
  needsEditorialReview: boolean;
}

export interface PublicContentEntry extends ClassificationResult {
  id: string;
  collection: string;
  slug: string;
  canonicalRoute: string;
  aliases: string[];
  title: string;
  description: string;
  published: true;
  tags: string[];
  searchableText: string;
  revision: string;
  provenance: { source: "git-markdown"; revision: string; modified: string };
}

/**
 * Transitional mapping reviewed against these specific published Markdown sources.
 * This derived map does not amend canon. All other legacy entries retain a null
 * label and an editorial-review flag; route/category/tag guesses are prohibited.
 * Explicit valid frontmatter supersedes this map; invalid explicit labels require review.
 */
export const REVIEWED_CLASSIFICATION_MAP: Readonly<Record<string, EpistemicClassification>> = {
  "blog:no-copypaste-worldbuilding": "CREATIVE_FRAMEWORK",
  "blog:creative-lore-bible": "CREATIVE_FRAMEWORK",
  "blog:asthortera-glossary": "FICTION_CANON",
  "blog:for-recruiters": "ENGINEERING_CASE_STUDY",
  "research:reltroner-erp-production-ready-saas": "ENGINEERING_CASE_STUDY",
};

export function classifyContent(metadata: Record<string, unknown>, identity: string): ClassificationResult {
  const explicit = metadata.epistemicClassification ?? metadata.epistemic_classification ?? metadata.epistemicType ?? metadata.epistemic_type ?? metadata.classification;
  if (typeof explicit === "string" && EPISTEMIC_CLASSIFICATIONS.includes(explicit as EpistemicClassification)) {
    return { classification: explicit as EpistemicClassification, classificationSource: "frontmatter", needsEditorialReview: false };
  }
  if (explicit == null && REVIEWED_CLASSIFICATION_MAP[identity]) {
    return { classification: REVIEWED_CLASSIFICATION_MAP[identity], classificationSource: "reviewed-mapping", needsEditorialReview: false };
  }
  return { classification: null, classificationSource: "editorial-review", needsEditorialReview: true };
}

/** Legacy documents without publication fields remain public; explicit ambiguity fails closed. */
export function isPublicContent(metadata: Record<string, unknown>): boolean {
  const normalized = (value: unknown) => typeof value === "string" ? value.trim().toLowerCase() : value;
  const truthy = (value: unknown) => value === true || ["true", "yes", "1"].includes(String(normalized(value)));
  if (truthy(metadata.draft) || truthy(metadata.private) || truthy(metadata.unpublished)) return false;
  if (["private", "internal", "restricted"].includes(String(normalized(metadata.visibility)))) return false;
  if (["draft", "unpublished", "private", "archived-private"].includes(String(normalized(metadata.status)))) return false;
  if (metadata.published != null && metadata.published !== true && normalized(metadata.published) !== "true") return false;
  if (metadata.public != null && metadata.public !== true && normalized(metadata.public) !== "true") return false;
  return true;
}
