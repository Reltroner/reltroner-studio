import type { Element, Nodes, Root } from "hast";
import { toHtml } from "hast-util-to-html";
import type { ContentHeading } from "@/types/content";

export interface ArticleIntroduction {
  bodyHtml: string;
  leadHtml?: string;
  titleId?: string;
  titleText?: string;
  titleHtml?: string;
}

// Only phrasing content from the existing sanitized HAST may enter a title or
// lead. Media, blocks and raw HTML cannot become a nested heading/paragraph.
const INLINE_TAGS = new Set(["a", "strong", "em", "code", "del", "s", "span", "br", "kbd", "sub", "sup", "b", "i"]);
function isInline(node: Nodes): boolean {
  return node.type === "text" || (node.type === "element" && INLINE_TAGS.has(node.tagName) && node.children.every(isInline));
}
function textContent(node: Nodes): string {
  return node.type === "text" ? node.value : "children" in node ? node.children.map(textContent).join("") : "";
}
function significant(tree: Root) {
  return tree.children.map((node, index) => ({ node, index }))
    .filter(({ node }) => node.type !== "text" || node.value.trim());
}
function isElement(node: Nodes | undefined, tagName: string): node is Element {
  return node?.type === "element" && node.tagName === tagName;
}
function serialize(tree: Root): string {
  const html = toHtml(tree);
  return html ? html + "\n" : "";
}
function isLead(node: Nodes | undefined, mediaPlaceholders: ReadonlySet<string>): node is Element {
  return isElement(node, "p") && node.children.every(isInline) && !!textContent(node).trim()
    && !mediaPlaceholders.has(textContent(node).trim());
}

/** Mark only the first adjacent introductory paragraph on the safe tree.
 * A section, list, callout, second title or media block ends the introduction.
 */
export function annotateEditorialLead(tree: Root, mediaPlaceholders: ReadonlySet<string> = new Set()): void {
  const nodes = significant(tree);
  let cursor = 0;
  while (isElement(nodes[cursor]?.node, "hr")) cursor++;
  if (isElement(nodes[cursor]?.node, "h1")) cursor++;
  const paragraph = nodes[cursor]?.node;
  if (!isLead(paragraph, mediaPlaceholders)) return;
  const classes = Array.isArray(paragraph.properties.className) ? paragraph.properties.className : [];
  paragraph.properties.className = [...new Set([...classes, "editorial-lead"])];
}

/** Extract adjacent root nodes, never serialized HTML tag boundaries.
 * A matching opening H1 is reused even without a lead; later headings remain
 * in the body with their original levels and IDs. The caller supplies only
 * the already sanitized tree, using the same algorithm on server and client.
 */
export function composeArticleIntroduction(
  tree: Root,
  title: string,
  firstHeading?: ContentHeading,
  mediaPlaceholders: ReadonlySet<string> = new Set(),
): ArticleIntroduction {
  const unchanged = { bodyHtml: serialize(tree) };
  const nodes = significant(tree);
  let cursor = 0;
  while (isElement(nodes[cursor]?.node, "hr")) cursor++;
  const heading = nodes[cursor]?.node;
  if (!isElement(heading, "h1") || firstHeading?.level !== 1 || firstHeading.text !== title
    || heading.properties.id !== firstHeading.id || !heading.children.every(isInline)) return unchanged;

  const consumed = new Set([nodes[cursor].index]);
  const result: ArticleIntroduction = { bodyHtml: "", titleId: firstHeading.id };
  if (heading.children.every(node => node.type === "text")) result.titleText = textContent(heading);
  else result.titleHtml = toHtml({ type: "root", children: heading.children });

  const paragraph = nodes[cursor + 1]?.node;
  if (isLead(paragraph, mediaPlaceholders)) {
    result.leadHtml = toHtml(paragraph);
    consumed.add(nodes[cursor + 1].index);
  }
  // Whitespace and authored dividers stay in the remaining document.
  result.bodyHtml = serialize({ ...tree, children: tree.children.filter((_, index) => !consumed.has(index)) });
  return result;
}
