import { RESOURCE_REPOSITORY, RESOURCE_ROOT, RESOURCE_SOURCE_SHA, normalizeResourcePath, resolveResourceUrl } from "./resource-manifest";

const CDN_HOSTNAME = "cdn.jsdelivr.net";
const CDN_REPOSITORY = RESOURCE_REPOSITORY;
const CDN_VERSION = RESOURCE_SOURCE_SHA;
const CDN_RESOURCE_ROOT = RESOURCE_ROOT;

export const CDN_BASE_URL = `https://${CDN_HOSTNAME}/gh/${CDN_REPOSITORY}@${CDN_VERSION}/${CDN_RESOURCE_ROOT}`;
export const CDN_IMAGE_BASE_URL = `${CDN_BASE_URL}/images`;
export const CDN_FILE_BASE_URL = `${CDN_BASE_URL}/files`;
export const CDN_IMAGE_PATHNAME = `/gh/${CDN_REPOSITORY}@${CDN_VERSION}/${CDN_RESOURCE_ROOT}/images/**`;

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
