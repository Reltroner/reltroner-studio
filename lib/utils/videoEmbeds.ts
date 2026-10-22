import { normalizeResourcePath, resolveResourceAsset } from "../assets/resource-manifest";
import { safePublicLink } from "../security/urls";
import { decodeString } from "micromark-util-decode-string";
import { remark } from "remark";
import type { Nodes } from "mdast";

export function isDirectVideoUrl(src: string) {
  if (String(src).startsWith("/resource-assets/")) return /\.(mp4|webm|ogg|mov)$/i.test(src);
  try { return /\.(mp4|webm|ogg|mov)$/i.test(new URL(src).pathname); } catch { return false; }
}

export function normalizeVideoSource(src: string, provider?: string) {
  let finalSrc = String(src || "").trim();
  let finalProvider = provider;
  const resourcePath = normalizeResourcePath(finalSrc);
  if (resourcePath?.startsWith("/videos/")) finalSrc = resolveResourceAsset(resourcePath)?.immutableUrl || finalSrc;
  try {
    const url = new URL(finalSrc);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return { src: finalSrc, provider: finalProvider };
    if (["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com", "youtu.be"].includes(url.hostname)) {
      const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.pathname.startsWith("/embed/") ? url.pathname.slice(7) : url.searchParams.get("v");
      if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) {
        finalSrc = `https://www.youtube-nocookie.com/embed/${id}`;
        finalProvider = "youtube";
      }
    } else if (url.hostname === "drive.google.com") {
      const id = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)(?:\/|$)/)?.[1] || (url.pathname === "/open" ? url.searchParams.get("id") : null);
      if (id && /^[A-Za-z0-9_-]+$/.test(id)) {
        finalSrc = `https://drive.google.com/file/d/${id}/preview`;
        finalProvider = "google-drive";
      }
    } else if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)) {
      const id = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1];
      if (id) { finalSrc = `https://player.vimeo.com/video/${id}`; finalProvider = "vimeo"; }
    } else if (url.hostname === "raw.githubusercontent.com" || url.hostname === "github.com") {
      const path = url.pathname.match(/^\/Reltroner\/reltroner-studio-(?:resource|source)\/(?:blob\/)?[^/]+\/(landing-page-resource\/videos\/.+)$/);
      if (path) finalSrc = resolveResourceAsset(`/${path[1].slice("landing-page-resource/".length)}`)?.immutableUrl || finalSrc;
    }
    const logicalPath = normalizeResourcePath(finalSrc);
    if (logicalPath?.startsWith("/videos/")) finalSrc = resolveResourceAsset(logicalPath)?.immutableUrl || finalSrc;
  } catch { /* Invalid input remains a non-embeddable source. */ }
  return { src: finalSrc, provider: finalProvider };
}

/** HTTPS, exact origins, exact player paths; no arbitrary origin merely because it ends in .mp4. */
export function isSafeEmbedUrl(src: string) {
  // Repository videos are embeddable only as verified same-origin export files.
  if (String(src).startsWith("/resource-assets/")) {
    const resource = resolveResourceAsset(src);
    return !!resource && resource.logicalPath.startsWith("/videos/") && resource.immutableUrl === src && isDirectVideoUrl(src);
  }
  try {
    const url = new URL(src);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return false;
    if (url.hostname === "www.youtube-nocookie.com") return /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname) && !url.search;
    if (url.hostname === "drive.google.com") return /^\/file\/d\/[A-Za-z0-9_-]+\/preview$/.test(url.pathname) && !url.search;
    if (url.hostname === "player.vimeo.com") return /^\/video\/\d+$/.test(url.pathname) && !url.search;
    return false;
  } catch { return false; }
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function mediaAttributes(source: string) {
  const props: Record<string, string> = {};
  for (const attr of source.matchAll(/([A-Za-z][\w-]*)\s*=\s*(?:"([^"<>]*)"|'([^'<>]*)'|([^\s"'<>`=]+))/g)) {
    const name = attr[1].toLowerCase();
    if (!(name in props)) props[name] = decodeString(attr[2] ?? attr[3] ?? attr[4] ?? "");
  }
  return props;
}

/** Rebuild validated media; no authored HTML attributes or fallback text are injected. */
export function renderVideoMarkup(source: string, label = "Video", hint?: string) {
  const { src, provider } = normalizeVideoSource(source, hint);
  const title = escapeHtml(label.slice(0, 600));
  const safeSrc = escapeHtml(src);
  const link = safePublicLink(src);
  if (!isSafeEmbedUrl(src)) {
    return `<div class="rs-video-embed media-unavailable"><p>${title} — embedded playback unavailable.</p>${link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Open external video</a>` : "<p>Unsafe video source was blocked.</p>"}</div>`;
  }
  const native = isDirectVideoUrl(src);
  const youtube = provider === "youtube";
  const externalLink = youtube ? `https://www.youtube.com/watch?v=${new URL(src).pathname.slice(7)}` : src;
  const player = native
    ? `<video controls src="${safeSrc}" preload="metadata" playsinline title="${title}"></video><p class="native-video-status" role="status">Loading video…</p>`
    : `<iframe src="${safeSrc}" title="${title}" allow="encrypted-media; fullscreen; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`;
  return `<figure class="rs-video-embed"${native ? ' data-native-video data-media-state="loading"' : ''}><div class="rs-video-frame">${player}</div><figcaption><span>${title}</span>${native ? '<span class="native-video-unavailable" role="status">Playback unavailable. You can try opening the original video file.</span>' : `<span class="media-provider-note">${youtube ? "YouTube" : escapeHtml(provider || "External provider")} controls playback and may prevent embedding.</span>`}<a href="${escapeHtml(externalLink)}" target="_blank" rel="noopener noreferrer">${native ? "Open video file" : youtube ? "Watch on YouTube" : "Open external video"}</a></figcaption></figure>`;
}

export function processVideoDirectives(markdown: string, defaultTitle = "Video") {
  const placeholders = new Map<string, string>();
  let counter = 0;
  // Read whole media blocks before Markdown splits inline HTML into unrelated nodes.
  // AST source offsets keep examples in fenced/indented and inline code untouched.
  const protectedRanges: Array<[number, number]> = [];
  const visit = (node: Nodes) => {
    if ((node.type === "code" || node.type === "inlineCode") && node.position) protectedRanges.push([node.position.start.offset!, node.position.end.offset!]);
    if ("children" in node) node.children.forEach(visit);
  };
  visit(remark().parse(markdown));
  const transformedMarkdown = markdown.replace(/::video\{([^}]{1,4096})\}|<(video|iframe)\b([^<>]{0,4096})>([\s\S]{0,32768}?)<\/\2\s*>/gi, (match, directive: string | undefined, tag: string | undefined, attrs: string, contents: string, offset: number) => {
    if (protectedRanges.some(([start, end]) => offset < end && offset + match.length > start)) return match;
    const props = mediaAttributes(directive ?? attrs);
    if (tag?.toLowerCase() === "video" && !props.src) props.src = mediaAttributes(contents.match(/<source\b([^<>]{0,4096})\/?\s*>/i)?.[1] || "").src;
    const embedHtml = renderVideoMarkup(props.src || "", props.title || props.caption || defaultTitle, props.provider);
    const id = `RELTRONER-VIDEO-PLACEHOLDER-${counter++}`;
    placeholders.set(id, embedHtml);
    return `\n\n${id}\n\n`;
  });
  return { transformedMarkdown, placeholders };
}

export function injectVideoEmbeds(html: string, placeholders: Map<string, string>) {
  let result = html;
  for (const [id, embed] of placeholders) result = result.replace(`<p>${id}</p>`, embed).replace(id, embed);
  return result;
}
