/** Public links may navigate externally; executable and protocol-relative URIs never pass. */
export function safePublicLink(value: string): string | null {
  const candidate = String(value || "").trim();
  if (!candidate || /[\u0000-\u0020\u007f]/.test(candidate) || candidate.includes("\\") || candidate.startsWith("//")) return null;
  if (candidate.startsWith("#") || candidate.startsWith("/")) return candidate;
  try {
    const url = new URL(candidate);
    if (url.username || url.password || url.port) return null;
    if (url.protocol === "https:") return url.href;
    if (url.protocol === "mailto:" && !/[\r\n]/.test(decodeURIComponent(candidate))) return candidate;
    return null;
  } catch { return null; }
}
