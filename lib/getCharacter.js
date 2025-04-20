// lib/getCharacter.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getCharacter(slug) {
  const filePath = path.join(process.cwd(), "content/characters", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);
  return {
    data,                     // front-matter (name, role, description, image, quote, dll.)
    contentHtml: processed.toString()
  };
}
