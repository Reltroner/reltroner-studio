// lib/getCulture.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getCulture(slug) {
  const filePath = path.join(process.cwd(), "content/cultures", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  return {
    data,
    contentHtml: processed.toString(),
  };
}
