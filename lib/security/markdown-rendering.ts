import { defaultSchema } from "hast-util-sanitize";
import type { Element, ElementContent, Properties } from "hast";
import type { Nodes, Root as MarkdownRoot } from "mdast";
import type { Transformer } from "unified";
import type { Options } from "remark-html";
import { decodeString } from "micromark-util-decode-string";
import { safePublicLink } from "./urls";
import { isSafeEmbedUrl, normalizeVideoSource } from "../utils/videoEmbeds";
import { normalizeResourcePath, resolveResourceUrl, RESOURCE_FALLBACK_IMAGE } from "../assets/resource-manifest";

// Installed remark-html performs final HAST sanitation. Raw source is never serialized.
// This bounded reader retains the observed authored HTML subset (media, links, tables,
// details and formatting). Attributes are rebuilt, rather than trusting author HTML.
const BLOCKED = new Set(["script", "style", "object", "embed", "svg", "math", "template", "form", "input", "button", "textarea", "select", "link", "meta", "base"]);
const TAGS = new Set([...defaultSchema.tagNames.filter((tag) => !BLOCKED.has(tag)), "iframe", "video", "audio", "figure", "figcaption"]);
const VOID = new Set(["br", "hr", "img", "source"]);

function attributes(source: string): Record<string, string> {
  const values: Record<string, string> = {};
  for (const match of source.matchAll(/([A-Za-z][\w-]*)\s*(?:=\s*(?:"([^"<>]*)"|'([^'<>]*)'|([^\s"'<>`=]+)))?/g)) {
    const name = match[1].toLowerCase();
    if (!(name in values)) values[name] = decodeString(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return values;
}

function properties(tag: string, attrs: Record<string, string>): Properties {
  const props: Properties = {};
  for (const name of ["alt", "title", "colspan", "rowspan", "scope", "datetime"]) {
    if (attrs[name]) props[{ colspan: "colSpan", rowspan: "rowSpan", datetime: "dateTime" }[name] || name] = attrs[name].slice(0, 600);
  }
  if (tag === "a") {
    const href = safePublicLink(attrs.href);
    if (href) props.href = normalizeResourcePath(href) ? resolveResourceUrl(href) || undefined : href;
    if (attrs.target === "_blank") { props.target = "_blank"; props.rel = ["noopener", "noreferrer"]; }
  }
  if (tag === "img") {
    const src = safePublicLink(attrs.src);
    if (src) props.src = resolveResourceUrl(src) || src;
    props.alt = attrs.alt || "Archive illustration";
  }
  if (tag === "iframe" || tag === "video" || tag === "audio" || tag === "source") {
    const { src } = normalizeVideoSource(attrs.src || "");
    if (attrs.src && isSafeEmbedUrl(src)) props.src = src;
    if (tag === "iframe") {
      props.title = attrs.title || "External video player";
      props.loading = "lazy";
      props.allow = "encrypted-media; fullscreen; picture-in-picture";
      props.allowFullScreen = true;
      props.sandbox = "allow-scripts allow-same-origin allow-presentation";
      props.referrerPolicy = "strict-origin-when-cross-origin";
    } else if (tag !== "source") {
      props.controls = true;
      props.preload = "metadata";
      props.playsInline = true;
    } else if (/^(video|audio)\/(mp4|webm|ogg|mpeg)$/.test(attrs.type || "")) props.type = attrs.type;
  }
  if (tag === "details" && "open" in attrs) props.open = true;
  return props;
}

export function boundedHtmlNodes(source: string): ElementContent[] {
  if (source.length > 32768) return [{ type: "text", value: "[HTML fragment omitted: size limit]" }];
  const root: { children: ElementContent[]; tagName?: string } = { children: [] };
  const stack: Array<{ children: ElementContent[]; tagName?: string }> = [root];
  const blocked: string[] = [];
  let position = 0;
  let count = 0;
  const tokens = /<!--[\s\S]*?-->|<\/?[A-Za-z][^<>]*>/g;
  const appendText = (value: string) => { if (value && !blocked.length) stack[stack.length - 1].children.push({ type: "text", value: decodeString(value) }); };
  for (const match of source.matchAll(tokens)) {
    if (++count > 600) break;
    appendText(source.slice(position, match.index));
    position = match.index + match[0].length;
    if (match[0].startsWith("<!--")) continue;
    const parsed = match[0].match(/^<(\/)?([A-Za-z][\w-]*)([\s\S]*?)>$/);
    if (!parsed) continue;
    const [, closing, rawTag, attrSource] = parsed;
    const tag = rawTag.toLowerCase();
    if (blocked.length) {
      if (!closing && BLOCKED.has(tag) && !/\/$/.test(attrSource)) blocked.push(tag);
      else if (closing && blocked[blocked.length - 1] === tag) blocked.pop();
      continue;
    }
    if (BLOCKED.has(tag)) { if (!closing && !/\/$/.test(attrSource)) blocked.push(tag); continue; }
    if (!TAGS.has(tag)) continue;
    if (closing) {
      const index = stack.findLastIndex((node) => node.tagName === tag);
      if (index > 0) stack.length = index;
      continue;
    }
    const props = properties(tag, attributes(attrSource));
    if ((tag === "iframe" || tag === "source" || tag === "img") && !props.src) continue;
    const element: Element = { type: "element", tagName: tag, properties: props, children: [] };
    stack[stack.length - 1].children.push(element);
    if (!VOID.has(tag) && !/\/\s*$/.test(attrSource) && stack.length < 32) stack.push(element);
  }
  appendText(source.slice(position));
  return root.children;
}

export const markdownHtmlOptions: Options = {
  handlers: { html: (_state, node) => node.type === "html" ? boundedHtmlNodes(node.value) : [] },
  sanitize: {
    ...defaultSchema,
    tagNames: [...TAGS, "input"],
    attributes: {
      ...defaultSchema.attributes,
      a: [...defaultSchema.attributes.a, "target", "rel"],
      iframe: ["src", "title", "loading", "allow", "allowFullScreen", "sandbox", "referrerPolicy"],
      video: ["src", "controls", "preload", "playsInline", "title"],
      audio: ["src", "controls", "preload", "title"],
      source: ["src", "type"],
    },
    protocols: { ...defaultSchema.protocols, href: ["https", "mailto"], src: ["https"] },
    strip: [...BLOCKED],
  },
};

/** Also validates Markdown-native links, not only authored HTML attributes. */
export function enforcePublicUrls(): Transformer<MarkdownRoot> {
  return (tree) => {
    const visit = (node: Nodes): void => {
      if (node.type === "link" || node.type === "definition") {
        const safe = safePublicLink(node.url);
        node.url = safe ? (normalizeResourcePath(safe) ? resolveResourceUrl(safe) || "#unavailable-resource" : safe) : "#blocked-link";
      }
      if (node.type === "image") {
        const safe = safePublicLink(node.url);
        node.url = safe ? resolveResourceUrl(safe) || safe : RESOURCE_FALLBACK_IMAGE;
      }
      if ("children" in node && Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}
