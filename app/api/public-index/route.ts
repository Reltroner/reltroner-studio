import { getPublicContentIndex, PUBLIC_INDEX_VERSION } from "@/lib/content/public-index";
import type { PublicIndexPayload } from "@/lib/content/public-index-client";

// Generated once at build time from published Git Markdown; no request input is read.
export const dynamic = "force-static";

export async function GET() {
  const entries = await getPublicContentIndex();
  const payload: PublicIndexPayload = { version: PUBLIC_INDEX_VERSION, count: entries.length, entries };
  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
