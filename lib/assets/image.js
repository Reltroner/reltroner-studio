import { resolveStaticAssetUrl } from "@/lib/assets/cdn";

export function resolveCdnImageUrl(value) {
  return resolveStaticAssetUrl(value);
}

export function toBackgroundImageStyle(value) {
  const imageUrl = resolveCdnImageUrl(value);
  return imageUrl ? `url("${imageUrl.replace(/"/g, "%22").replace(/[\r\n]/g, "")}")` : undefined;
}
