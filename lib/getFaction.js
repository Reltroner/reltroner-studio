// lib/getfaction.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Reads an faction markdown file from content/factions/{slug}.md
 * Returns front-matter data and rendered HTML.
 */
export async function getFaction(slug) {
  const filePath = path.join(process.cwd(), "content/factions", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    data,
    contentHtml: processed.toString(),
  };
}