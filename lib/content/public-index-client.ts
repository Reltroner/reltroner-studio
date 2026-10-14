import { useCallback, useEffect, useState } from "react";
import { EPISTEMIC_CLASSIFICATIONS, isPublicContent, type EpistemicClassification, type PublicContentEntry } from "./taxonomy";

/**
 * Build-time static public index endpoint. One derived, published-only document is
 * shared by Ctrl+K, collection search, Archive Explorer and Reltroner Navigator,
 * instead of serialising the whole index into every page's HTML payload.
 */
export const PUBLIC_INDEX_ENDPOINT = "/api/public-index";
export const MAX_CLIENT_INDEX_ENTRIES = 5000;

export interface PublicIndexPayload {
  version: string;
  count: number;
  entries: PublicContentEntry[];
}

export type PublicIndexStatus = "idle" | "loading" | "ready" | "error";

const isText = (value: unknown): value is string => typeof value === "string";
const isSafeRoute = (value: unknown): value is string => isText(value) && value.startsWith("/") && !value.startsWith("//") && !/[\s\\]/.test(value);

/** Defense in depth: the client re-applies publication and shape checks to transport data. */
export function parsePublicIndexPayload(payload: unknown): PublicContentEntry[] {
  const entries = (payload && typeof payload === "object" ? (payload as { entries?: unknown }).entries : null);
  if (!Array.isArray(entries)) throw new Error("Malformed public index payload");
  return entries.slice(0, MAX_CLIENT_INDEX_ENTRIES).filter((candidate): candidate is PublicContentEntry => {
    if (!candidate || typeof candidate !== "object") return false;
    const entry = candidate as Record<string, unknown>;
    const classification = entry.classification;
    return entry.published === true
      && isPublicContent(entry)
      && isText(entry.id) && isText(entry.collection) && isText(entry.slug) && isText(entry.title)
      && isSafeRoute(entry.canonicalRoute)
      && Array.isArray(entry.aliases) && entry.aliases.every(isSafeRoute)
      && Array.isArray(entry.tags) && entry.tags.every(isText)
      && (classification === null || EPISTEMIC_CLASSIFICATIONS.includes(classification as EpistemicClassification));
  });
}

let pendingIndex: Promise<PublicContentEntry[]> | null = null;
let resolvedIndex: PublicContentEntry[] | null = null;

export function loadPublicContentIndex(fetcher: typeof fetch = fetch): Promise<PublicContentEntry[]> {
  if (resolvedIndex) return Promise.resolve(resolvedIndex);
  if (!pendingIndex) {
    pendingIndex = fetcher(PUBLIC_INDEX_ENDPOINT, { headers: { Accept: "application/json" }, credentials: "omit" })
      .then((response) => {
        if (!response.ok) throw new Error(`Public index unavailable (${response.status})`);
        return response.json() as Promise<unknown>;
      })
      .then((payload) => {
        resolvedIndex = parsePublicIndexPayload(payload);
        return resolvedIndex;
      })
      .catch((error: unknown) => {
        // Allow a later retry instead of caching a failed network state.
        pendingIndex = null;
        throw error;
      });
  }
  return pendingIndex;
}

/** Test-only reset of the module-level memo. */
export function resetPublicContentIndexCache(): void {
  pendingIndex = null;
  resolvedIndex = null;
}

/**
 * Lazily loads the shared public index. When `enabled` becomes true the request is
 * scheduled during idle time so it does not compete with first paint.
 */
export function usePublicContentIndex(enabled = true) {
  const [entries, setEntries] = useState<PublicContentEntry[]>(() => resolvedIndex ?? []);
  const [status, setStatus] = useState<PublicIndexStatus>(() => (resolvedIndex ? "ready" : "idle"));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (resolvedIndex) { setEntries(resolvedIndex); setStatus("ready"); return; }
    let active = true;
    setStatus("loading");
    const run = () => {
      loadPublicContentIndex()
        .then((loaded) => { if (active) { setEntries(loaded); setStatus("ready"); } })
        .catch(() => { if (active) setStatus("error"); });
    };
    const idle = typeof window !== "undefined" && "requestIdleCallback" in window
      ? window.requestIdleCallback(run, { timeout: 1200 })
      : null;
    const timer = idle === null ? setTimeout(run, 0) : null;
    return () => {
      active = false;
      if (idle !== null) window.cancelIdleCallback(idle);
      if (timer !== null) clearTimeout(timer);
    };
  }, [enabled, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  return { entries, status, retry };
}
