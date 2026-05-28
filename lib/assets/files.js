import { resolveStaticAssetUrl } from "@/lib/assets/cdn";

export function resolveCdnFileUrl(value) {
  return resolveStaticAssetUrl(value);
}