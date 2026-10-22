import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import { decodeString } from "micromark-util-decode-string";
import { isPublicContent } from "../lib/content/taxonomy.ts";
import { COLLECTIONS, COLLECTION_ORDER } from "../lib/constants/collections.js";
import { normalizeResourcePath, KNOWN_MISSING_NON_BLOCKING } from "../lib/assets/resource-paths.mjs";
import { createResourceSnapshot, RESOURCE_ROOT, RESOURCE_REPOSITORY } from "./generate-resource-manifest.mjs";

export { KNOWN_MISSING_NON_BLOCKING };

export function collectDocumentReferences(source, sourcePath) {
  const { data, content } = matter(source);
  if (!isPublicContent(data)) return null;
  const references = [];
  const add = (value, image = false) => {
    if (image || /^(?:\/(?:images|files|videos)\/|https:\/\/cdn\.jsdelivr\.net\/gh\/Reltroner\/reltroner-studio-resource@)/.test(value)) references.push({ value, sourcePath });
  };
  if (data.image) {
    if (typeof data.image !== "string") throw new Error(`Invalid image frontmatter: ${sourcePath}`);
    add(data.image, true);
  }
  const tree = remark().use(gfm).parse(content);
  const definitions = new Map();
  function visit(node, callback) {
    callback(node);
    node.children?.forEach(child => visit(child, callback));
  }
  visit(tree, node => { if (node.type === "definition") definitions.set(node.identifier, node.url); });
  visit(tree, node => {
    if (node.type === "image" || node.type === "link") add(node.url, node.type === "image");
    if (node.type === "imageReference" || node.type === "linkReference") {
      const value = definitions.get(node.identifier);
      if (value) add(value, node.type === "imageReference");
    }
    if (node.type === "html") {
      const html = node.value.replace(/<!--[\s\S]*?-->|<(script|style|pre|code|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
      for (const tag of html.matchAll(/<(img|source|video|audio|a)\b([^<>]*)>/gi)) {
        for (const attr of tag[2].matchAll(/\b(src|href|poster)\s*=\s*(?:"([^"<>]*)"|'([^'<>]*)'|([^\s"'<>`=]+))/gi)) {
          add(decodeString(attr[2] ?? attr[3] ?? attr[4]), tag[1].toLowerCase() === "img" || attr[1].toLowerCase() === "poster");
        }
      }
    }
  });
  return references;
}

export async function collectPublishedReferences(contentRoot = "content") {
  let published = 0;
  const references = [];
  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const sourcePath = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(sourcePath);
      else if (/\.(md|mdx)$/i.test(entry.name)) {
        const found = collectDocumentReferences(await fs.readFile(sourcePath, "utf8"), sourcePath.replaceAll("\\", "/"));
        if (found) { published++; references.push(...found); }
      }
    }
  }
  for (const collection of COLLECTION_ORDER) await walk(path.join(contentRoot, COLLECTIONS[collection].contentDir));
  return { published, references };
}

export async function auditResourceReferences(snapshot, { published = 0, references }, { verifyHistorical } = {}) {
  snapshot = createResourceSnapshot(snapshot.sourceSha, snapshot.resources);
  const inventory = new Map(snapshot.resources.map(resource => [resource.path.slice(RESOURCE_ROOT.length), resource]));
  const assets = new Map();
  const failures = [];
  for (const { value, sourcePath } of references) {
    const logicalPath = normalizeResourcePath(value);
    if (!logicalPath) { failures.push({ asset: value, sourcePath, reason: "Unsafe or unauthorized resource reference" }); continue; }
    const explicitSha = value.match(new RegExp(`^https://cdn\\.jsdelivr\\.net/gh/${RESOURCE_REPOSITORY}@([a-f0-9]{40})/`, "i"))?.[1].toLowerCase();
    const sourceSha = explicitSha || snapshot.sourceSha;
    const key = `${sourceSha}:${logicalPath}`;
    if (assets.has(key)) { assets.get(key).sources.add(sourcePath); continue; }
    const historical = sourceSha !== snapshot.sourceSha;
    const resource = historical ? await verifyHistorical?.(sourceSha, `${RESOURCE_ROOT}${logicalPath}`) : inventory.get(logicalPath);
    const exempt = !historical && !resource && KNOWN_MISSING_NON_BLOCKING.includes(logicalPath);
    const status = resource ? "PASS" : exempt ? "EXEMPT" : "FAIL";
    const asset = { asset: logicalPath, sourceSha, status, ...(exempt ? { classification: "KNOWN_MISSING_NON_BLOCKING" } : {}), ...(resource ? { blobSha: resource.blobSha, bytes: resource.bytes } : {}), sources: new Set([sourcePath]) };
    assets.set(key, asset);
    if (status === "FAIL") failures.push({ asset: logicalPath, sourcePath, reason: historical ? "Historical resource revision not verified" : "Missing resource" });
  }
  return { sourceSha: snapshot.sourceSha, published, referenced: references.length, assets: [...assets.values()].map(asset => ({ ...asset, sources: [...asset.sources].sort() })).sort((a, b) => a.asset.localeCompare(b.asset, "en")), failures };
}

export function printResourceAudit(report) {
  console.log(JSON.stringify({ sourceSha: report.sourceSha, published: report.published, referenced: report.referenced, pass: report.assets.filter(a => a.status === "PASS").length, exempt: report.assets.filter(a => a.status === "EXEMPT"), failures: report.failures }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const snapshot = JSON.parse(await fs.readFile("lib/assets/resource-snapshot.json", "utf8"));
  const { createHistoricalVerifier } = await import("./sync-resource-manifest.mjs");
  const report = await auditResourceReferences(snapshot, await collectPublishedReferences(), { verifyHistorical: createHistoricalVerifier() });
  printResourceAudit(report);
  if (report.failures.length) process.exitCode = 1;
}
