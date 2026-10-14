import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { isPublicContent } from "../lib/content/taxonomy.ts";
import { resolveResourceAsset, RESOURCE_SOURCE_SHA } from "../lib/assets/resource-manifest.ts";

// Read-only source diagnostic. Run with tools/test-loader.mjs; no HTTP/provider calls.
const missing = new Map();
let published = 0;
let referenced = 0;
for (const collection of await fs.readdir("content", { withFileTypes: true })) {
  if (!collection.isDirectory()) continue;
  for (const filename of await fs.readdir(path.join("content", collection.name))) {
    if (!filename.endsWith(".md")) continue;
    const sourcePath = path.join("content", collection.name, filename);
    let parsed;
    try { parsed = matter(await fs.readFile(sourcePath, "utf8")); } catch { continue; }
    if (!isPublicContent(parsed.data)) continue;
    published++;
    const route = `/${collection.name}/${parsed.data.slug || filename.slice(0, -3)}`;
    const source = `${parsed.data.image || ""}\n${parsed.content}`;
    const assets = [...source.matchAll(/\/(?:images|files|videos)\/[^\s"'()<>{}]+/g)].map((match) => match[0]);
    for (const asset of new Set(assets)) {
      referenced++;
      if (!resolveResourceAsset(asset)) {
        if (!missing.has(asset)) missing.set(asset, []);
        missing.get(asset).push(route);
      }
    }
  }
}
console.log(JSON.stringify({ resourceSha: RESOURCE_SOURCE_SHA, published, referenced, missing: [...missing].sort(([a], [b]) => a.localeCompare(b, "en")).map(([asset, routes]) => ({ asset, routes })) }, null, 2));
