import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Local review hook only. Reads a resource Git tree; never pushes or triggers a deployment.
// Usage: node tools/generate-resource-manifest.mjs <resource-repo> <40-char-sha> [output-json]
const [repository, sourceSha, output = "lib/assets/resource-snapshot.json"] = process.argv.slice(2);
if (!repository || !/^[a-f0-9]{40}$/i.test(sourceSha || "")) throw new Error("Provide a local resource repository and a full source commit SHA");
const repositoryPath = resolve(repository).replace(/\\/g, "/");
const tree = execFileSync("git", ["-c", `safe.directory=${repositoryPath}`, "-C", repositoryPath, "ls-tree", "-r", "-l", sourceSha, "--", "landing-page-resource/images", "landing-page-resource/files", "landing-page-resource/videos"], { encoding: "utf8" });
const resources = tree.split(/\r?\n/).filter(Boolean).map((line) => {
  const match = line.match(/^\d+ blob ([a-f0-9]{40})\s+(\d+)\t(.+)$/);
  if (!match) throw new Error(`Unsupported resource tree record: ${line}`);
  const [, blobSha, bytes, resourcePath] = match;
  if (!/^landing-page-resource\/(images|files|videos)\/[A-Za-z0-9_ .()/-]+$/.test(resourcePath) || resourcePath.split("/").some((part) => part === "..")) throw new Error(`Unsafe resource path: ${resourcePath}`);
  return { path: resourcePath, blobSha, bytes: Number(bytes) };
}).sort((left, right) => left.path.localeCompare(right.path, "en"));
if (!resources.length) throw new Error("Resource tree has no eligible assets");
writeFileSync(resolve(output), `${JSON.stringify({ sourceSha: sourceSha.toLowerCase(), provenance: "Read-only local Git tree; resource delivery and deployment automation require separate verification.", resources }, null, 2)}\n`);
console.log(`Generated ${resources.length} immutable resource entries at ${sourceSha}`);
