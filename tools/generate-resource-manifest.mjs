import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const RESOURCE_REPOSITORY = "Reltroner/reltroner-studio-resource";
export const RESOURCE_ROOT = "landing-page-resource";

export function assertGitSha(value) {
  if (typeof value !== "string" || !/^[a-f0-9]{40}$/i.test(value)) throw new Error("A full 40-character Git SHA is required");
  return value.toLowerCase();
}

export function createResourceSnapshot(sourceSha, records) {
  sourceSha = assertGitSha(sourceSha);
  if (!Array.isArray(records) || !records.length) throw new Error("Resource tree has no eligible assets");
  const seen = new Set();
  const resources = records.map(({ path, blobSha, bytes }) => {
    if (typeof path !== "string" || !/^landing-page-resource\/(images|files|videos)\/[A-Za-z0-9_ .()/-]+$/.test(path) || path.split("/").some(part => !part || part === "." || part === "..")) throw new Error(`Unsafe resource path: ${path}`);
    if (seen.has(path)) throw new Error(`Duplicate resource path: ${path}`);
    if (!Number.isSafeInteger(bytes) || bytes <= 0) throw new Error(`Invalid resource size: ${path}`);
    seen.add(path);
    return { path, blobSha: assertGitSha(blobSha), bytes };
  }).sort((left, right) => left.path < right.path ? -1 : left.path > right.path ? 1 : 0);
  return { sourceSha, provenance: "Verified read-only Git tree at one immutable resource commit.", resources };
}

export function serializeResourceSnapshot(snapshot) {
  return `${JSON.stringify(snapshot, null, 2)}\n`;
}

// Optional offline review hook; production synchronization needs no local resource checkout.
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [repository, sourceSha, output = "lib/assets/resource-snapshot.json"] = process.argv.slice(2);
  if (!repository) throw new Error("Provide a local resource repository and a full source commit SHA");
  assertGitSha(sourceSha);
  const repositoryPath = resolve(repository).replace(/\\/g, "/");
  const tree = execFileSync("git", ["-c", `safe.directory=${repositoryPath}`, "-C", repositoryPath, "ls-tree", "-r", "-l", sourceSha, "--", `${RESOURCE_ROOT}/images`, `${RESOURCE_ROOT}/files`, `${RESOURCE_ROOT}/videos`], { encoding: "utf8" });
  const records = tree.split(/\r?\n/).filter(Boolean).map(line => {
    const match = line.match(/^100(?:644|755) blob ([a-f0-9]{40})\s+(\d+)\t(.+)$/);
    if (!match) throw new Error(`Unsupported resource tree record: ${line}`);
    return { path: match[3], blobSha: match[1], bytes: Number(match[2]) };
  });
  const snapshot = createResourceSnapshot(sourceSha, records);
  writeFileSync(resolve(output), serializeResourceSnapshot(snapshot));
  console.log(`Generated ${snapshot.resources.length} immutable resource entries at ${snapshot.sourceSha}`);
}
