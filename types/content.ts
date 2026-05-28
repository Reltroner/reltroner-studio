export type ContentCollectionKey =
  | "blog"
  | "characters"
  | "cultures"
  | "events"
  | "factions"
  | "items"
  | "laws"
  | "myths"
  | "organizations"
  | "philosophies"
  | "places"
  | "principles"
  | "series"
  | "statistics"
  | "technologies";

export interface ContentCollectionDefinition {
  key: ContentCollectionKey;
  title: string;
  description: string;
  route: string;
  contentDir: string;
  group: string;
  schemaType: string;
  openGraphType: string;
}

export interface ContentEntry {
  collection: ContentCollectionKey;
  title: string;
  slug: string;
  aliases: string[];
  description: string;
  summary: string;
  image: string | null;
  role: string;
  quote: string;
  category: string;
  type: string;
  tags: string[];
  date: string;
  modified: string;
  startDate: string;
  endDate: string;
  author: string;
  published: boolean;
  readingTime: number;
  wordCount: number;
  fileName: string;
  filePath: string;
  route: string;
}

export interface ContentHeading {
  id: string;
  text: string;
  level: number;
}

export interface RelatedContentEntry {
  title: string;
  route: string;
  description: string;
  date: string;
  collection: ContentCollectionKey;
  collectionTitle: string;
  relationshipLabel: string;
  tags: string[];
}