import { normalizeResourcePath, resolveResourceUrl } from "./resource-manifest";

// Verified manifest entries supply complete same-origin asset URLs; there is no external CDN base.
const IMAGE_PREFIX = "/images/";
const FILE_PREFIX = "/files/";

function normalizeAssetPath(value) {
  return String(value || "").trim().replace(/\\/g, "/");
}

export function isAbsoluteUrl(value) {
  return /^(?:https?:)?\/\//i.test(String(value || ""));
}

export function resolveStaticAssetUrl(value) {
  const normalizedValue = normalizeAssetPath(value);

  if (!normalizedValue || normalizedValue.startsWith("#")) {
    return normalizedValue;
  }

  if (normalizeResourcePath(normalizedValue)) {
    return resolveResourceUrl(normalizedValue) || "";
  }

  if (normalizedValue.startsWith('/resource-assets/')) return '';
  // Failed legacy lookups must never fall back to an external resource transport.
  if (/^https?:\/\/cdn\.jsdelivr\.net\/gh\//i.test(normalizedValue)) return '';

  if (isAbsoluteUrl(normalizedValue)) {
    try {
      const url = new URL(normalizedValue);
      return url.protocol === "https:" && !url.username && !url.password ? normalizedValue : "";
    } catch { return ""; }
  }

  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(normalizedValue)) return "";
  if (normalizedValue.startsWith(IMAGE_PREFIX) || normalizedValue.startsWith(FILE_PREFIX) || normalizedValue.startsWith("/videos/")) return "";
  return normalizedValue;
}
