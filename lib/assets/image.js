import { resolveStaticAssetUrl } from "@/lib/assets/cdn";

export function resolveCdnImageUrl(value) {
  return resolveStaticAssetUrl(value);
}

export function toBackgroundImageStyle(value) {
  const imageUrl = resolveCdnImageUrl(value);
  return imageUrl ? `url("${imageUrl}")` : undefined;
}