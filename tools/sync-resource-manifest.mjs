import fs from "node:fs/promises";
import { assertGitSha, createResourceSnapshot, serializeResourceSnapshot, RESOURCE_REPOSITORY, RESOURCE_ROOT } from "./generate-resource-manifest.mjs";

// Read-only GitHub transport and inventory for the first-party asset build (tools/sync-first-party-assets.mjs).
const API_ORIGIN = "https://api.github.com";
const RAW_ORIGIN = "https://raw.githubusercontent.com";
const API_PREFIX = `/repos/${RESOURCE_REPOSITORY}/`;
const RAW_PREFIX = `/${RESOURCE_REPOSITORY}/`;
const MAX_ATTEMPTS = 3;
const MAX_RATE_LIMIT_WAIT = 60_000;
const UNSPECIFIED_RATE_LIMIT_WAIT = 60_000;

/** GITHUB_TOKEN is the only credential source; Cloudflare Pages Production and Preview builds must provide it. */
function resolveGithubCredentials(env) {
  const token = String(env.GITHUB_TOKEN ?? "").trim();
  if (token && !/^[\x21-\x7e]+$/.test(token)) throw new Error("GITHUB_TOKEN contains characters that cannot be sent in an HTTP header; no request was sent");
  // Cloudflare injects CF_PAGES=1 and CF_PAGES_BRANCH. Require authentication in BOTH
  // Production and Preview: a branch-only deployment must never fall back to GitHub's
  // shared 60-requests/hour anonymous rate limit when a token is missing.
  const pages = String(env.CF_PAGES ?? "").trim() === "1" || Boolean(String(env.CF_PAGES_BRANCH ?? "").trim());
  const production = pages && env.CF_PAGES_BRANCH === "main";
  if (pages && !token) throw new Error(
    "GITHUB_TOKEN is required for Cloudflare Pages builds (Production AND Preview). " +
    "Configure it as an encrypted build-time secret in the Pages project for both environments; " +
    "no GitHub API request was sent."
  );
  return { token: token || null, production };
}

/** Only the resource repository on the GitHub API and raw byte hosts may be requested. */
export function assertApprovedGithubUrl(value) {
  const url = new URL(value);
  const api = url.origin === API_ORIGIN && url.pathname.startsWith(API_PREFIX);
  const raw = url.origin === RAW_ORIGIN && url.pathname.startsWith(RAW_PREFIX);
  if (url.username || url.password || url.port || url.hash || !(api || raw)) throw new Error(`Refusing request to an unapproved resource origin: ${url.origin}`);
  return { url, api };
}

// Milliseconds to wait for a rate-limited response, or null when the response is not rate limited.
function rateLimitWait(response, now) {
  const retryAfter = response.headers.get("retry-after");
  if (retryAfter !== null) {
    const seconds = Number(retryAfter);
    if (retryAfter.trim() !== "" && Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
    const date = Date.parse(retryAfter);
    return Number.isNaN(date) ? UNSPECIFIED_RATE_LIMIT_WAIT : Math.max(0, date - now);
  }
  if (response.headers.get("x-ratelimit-remaining") === "0") {
    const reset = Number(response.headers.get("x-ratelimit-reset"));
    return Number.isFinite(reset) && reset > 0 ? Math.max(0, reset * 1000 - now) : Infinity;
  }
  return response.status === 429 ? UNSPECIFIED_RATE_LIMIT_WAIT : null;
}

/**
 * Bearer credentials go to api.github.com only; raw byte downloads are always anonymous. Redirects are
 * refused rather than followed, a rejected token never falls back to anonymous access, and token values
 * are redacted from every error.
 */
export function createGithubClient({ fetchImpl = fetch, env = process.env, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now, maxWaitMs = MAX_RATE_LIMIT_WAIT } = {}) {
  const { token, production } = resolveGithubCredentials(env);
  const fail = message => Object.assign(new Error(message), { permanent: true });
  const redact = error => {
    const message = String(error?.message ?? error);
    return token && message.includes(token) ? Object.assign(new Error(message.replaceAll(token, "[redacted]")), { permanent: true }) : error;
  };
  async function request(target, { read, timeout = 15000 }) {
    const { url, api } = assertApprovedGithubUrl(target);
    const label = api ? `GitHub API ${url.pathname.slice(API_PREFIX.length - 1)}${url.search}` : `Resource download ${url.pathname}`;
    const headers = api
      ? { Accept: "application/vnd.github+json", "User-Agent": "reltroner-resource-sync", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      : { "User-Agent": "reltroner-first-party-assets" };
    for (let attempt = 1; ; attempt++) {
      try {
        const response = await fetchImpl(url.href, { redirect: "manual", headers, signal: AbortSignal.timeout(timeout) });
        if (response.type === "opaqueredirect" || (response.status >= 300 && response.status < 400) || response.redirected || (response.url && new URL(response.url).origin !== url.origin)) {
          throw fail(`${label} attempted a redirect; refused without following it`);
        }
        if (response.ok) return await read(response);
        const wait = response.status === 403 || response.status === 429 ? rateLimitWait(response, now()) : null;
        if (wait !== null) {
          const scope = token ? "for the configured GITHUB_TOKEN" : "for anonymous access; configure GITHUB_TOKEN";
          if (attempt >= MAX_ATTEMPTS || wait > maxWaitMs) throw fail(`${label} is rate limited (HTTP ${response.status}) ${scope}; retry window ${Number.isFinite(wait) ? `${Math.ceil(wait / 1000)}s` : "unknown"} exceeds the bounded wait`);
          await sleep(wait);
          continue;
        }
        if (response.status === 401 || response.status === 403) {
          throw fail(token ? `${label} rejected the configured GITHUB_TOKEN (HTTP ${response.status}); stopped without anonymous fallback` : `${label} returned HTTP ${response.status}`);
        }
        if (![500, 502, 503, 504].includes(response.status) || attempt >= MAX_ATTEMPTS) throw fail(`${label} returned HTTP ${response.status}`);
      } catch (error) {
        if (error?.permanent || attempt >= MAX_ATTEMPTS) throw redact(error);
      }
      await sleep(500 * attempt);
    }
  }
  return Object.freeze({
    authenticated: Boolean(token),
    production,
    json(endpoint) {
      if (!/^\/[A-Za-z0-9_./?=&-]+$/.test(endpoint) || endpoint.includes("..") || endpoint.includes("//")) throw new Error("Invalid GitHub API endpoint");
      return request(`${API_ORIGIN}${API_PREFIX}${endpoint.slice(1)}`, { read: response => response.json() });
    },
    raw(sourceSha, resourcePath, options) {
      return request(`${RAW_ORIGIN}${RAW_PREFIX}${assertGitSha(sourceSha)}/${resourcePath.split("/").map(encodeURIComponent).join("/")}`, options);
    },
  });
}

export function snapshotFromGithubTree(sourceSha, tree, expectedTreeSha) {
  if (assertGitSha(tree?.sha) !== assertGitSha(expectedTreeSha) || tree.truncated !== false || !Array.isArray(tree.tree)) throw new Error("Resource Git tree is incomplete or does not match the selected commit");
  const records = [];
  for (const entry of tree.tree) {
    if (typeof entry?.path !== "string") throw new Error("Malformed resource Git tree record");
    if (!new RegExp(`^${RESOURCE_ROOT}/(images|files|videos)/`).test(entry.path) || entry.type === "tree") continue;
    if (entry.type !== "blob" || !["100644", "100755"].includes(entry.mode)) throw new Error(`Unsupported resource Git object: ${entry.path}`);
    records.push({ path: entry.path, blobSha: entry.sha, bytes: entry.size });
  }
  return createResourceSnapshot(sourceSha, records);
}

/** Pinned commits are immutable: one tree request per commit, shared by every caller in a run. */
export function createHistoricalVerifier(fetchImpl = fetch, github = createGithubClient({ fetchImpl })) {
  const revisions = new Map();
  return async (sourceSha, resourcePath) => {
    sourceSha = assertGitSha(sourceSha);
    if (!revisions.has(sourceSha)) revisions.set(sourceSha, (async () => {
      // The trees endpoint resolves a commit SHA to that commit's root tree.
      const tree = await github.json(`/git/trees/${sourceSha}?recursive=1`);
      return snapshotFromGithubTree(sourceSha, tree, tree?.sha);
    })());
    return (await revisions.get(sourceSha)).resources.find(resource => resource.path === resourcePath) || null;
  };
}

export async function synchronizeResources({ fetchImpl = fetch, github = createGithubClient({ fetchImpl }), collect, verifyHistorical = createHistoricalVerifier(fetchImpl, github), write = fs.writeFile, output = "lib/assets/resource-snapshot.json" } = {}) {
  const { auditResourceReferences, collectPublishedReferences } = await import("./audit-resource-references.mjs");
  // Exactly one mutable lookup selects the immutable identity for this build.
  const commit = await github.json("/commits/main");
  const sourceSha = assertGitSha(commit.sha);
  const treeSha = assertGitSha(commit.commit?.tree?.sha);
  const tree = await github.json(`/git/trees/${treeSha}?recursive=1`);
  const snapshot = snapshotFromGithubTree(sourceSha, tree, treeSha);
  const report = await auditResourceReferences(snapshot, await (collect || collectPublishedReferences)(), { verifyHistorical });
  if (report.failures.length) throw new Error(`Resource integrity failed: ${JSON.stringify(report.failures)}`);
  // The old snapshot is never used as a successful network-failure fallback.
  await write(output, serializeResourceSnapshot(snapshot), "utf8");
  return { snapshot, report };
}
