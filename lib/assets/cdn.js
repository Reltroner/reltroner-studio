const CDN_HOSTNAME = "cdn.jsdelivr.net";
const CDN_REPOSITORY = "Reltroner/reltroner-studio-resource";
const CDN_VERSION = "main";
const CDN_RESOURCE_ROOT = "landing-page-resource";

export const CDN_BASE_URL = `https://${CDN_HOSTNAME}/gh/${CDN_REPOSITORY}@${CDN_VERSION}/${CDN_RESOURCE_ROOT}`;
export const CDN_IMAGE_BASE_URL = `${CDN_BASE_URL}/images`;
export const CDN_FILE_BASE_URL = `${CDN_BASE_URL}/files`;
export const CDN_IMAGE_PATHNAME = "/gh/Reltroner/reltroner-studio-resource@main/landing-page-resource/images/**";

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

  if (!normalizedValue || normalizedValue.startsWith("#") || normalizedValue.startsWith("data:")) {
    return normalizedValue;
  }

  if (isAbsoluteUrl(normalizedValue)) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith(IMAGE_PREFIX)) {
    return `${CDN_IMAGE_BASE_URL}/${normalizedValue.slice(IMAGE_PREFIX.length)}`;
  }

  if (normalizedValue.startsWith(FILE_PREFIX)) {
    return `${CDN_FILE_BASE_URL}/${normalizedValue.slice(FILE_PREFIX.length)}`;
  }

  return normalizedValue;
}