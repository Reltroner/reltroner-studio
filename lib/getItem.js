// lib/getItem.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Reads an Item markdown file from content/items/{slug}.md
 * Returns front-matter data and rendered HTML.
 */
export async function getItem(slug) {
  const filePath = path.join(process.cwd(), "content/items", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    data,
    contentHtml: processed.toString(),
  };
}