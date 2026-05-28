import { SITE_URL } from "@/lib/constants/site";
import { resolveStaticAssetUrl } from "@/lib/assets/cdn";

export function toAbsoluteUrl(pathname = "/") {
  return new URL(resolveStaticAssetUrl(pathname) || "/", SITE_URL).toString();
}

export function buildCanonical(pathname) {
  return {
    canonical: toAbsoluteUrl(pathname),
  };
}