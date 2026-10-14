import { renderVideoMarkup } from "@/lib/utils/videoEmbeds";
import ContentMediaFallback from "./ContentMediaFallback";

export { isDirectVideoUrl, isSafeEmbedUrl, normalizeVideoSource } from "@/lib/utils/videoEmbeds";
export interface VideoEmbedProps { src: string; title?: string; provider?: string; caption?: string }

export default function VideoEmbed({ src, title, provider, caption }: VideoEmbedProps) {
  return <ContentMediaFallback><div dangerouslySetInnerHTML={{ __html: renderVideoMarkup(src, title || caption || "External video", provider) }} /></ContentMediaFallback>;
}
