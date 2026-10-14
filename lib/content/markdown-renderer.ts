import { toHast } from "mdast-util-to-hast";
import { sanitize } from "hast-util-sanitize";
import { toHtml } from "hast-util-to-html";
import type { Nodes as HtmlNodes } from "hast";
import type { Root as MarkdownRoot } from "mdast";
import type { Processor } from "unified";
import type { ContentHeading } from "@/types/content";
import { markdownHtmlOptions } from "@/lib/security/markdown-rendering";
import { annotateEditorialLead, composeArticleIntroduction } from "@/lib/content/editorial-typography";

function headingText(node: HtmlNodes): string {
  if (node.type === "text") return node.value;
  return "children" in node ? node.children.map(headingText).join(" ") : "";
}

/** The existing remark-html pipeline, with heading decoration on the safe HAST
 * tree instead of rewriting serialized heading tags. Parser depth is preserved.
 * Only generated IDs/classes are added after the unchanged security sanitizer.
 */
export function articleMarkdownHtml(
  this: Processor<undefined, undefined, undefined, MarkdownRoot, string>,
  { slugify, title, mediaPlaceholders = [] }: { slugify: (text: string) => string; title?: string; mediaPlaceholders?: string[] },
) {
  this.compiler = (tree, file) => {
    const schema = markdownHtmlOptions.sanitize;
    if (!schema || typeof schema !== "object") throw new Error("Article Markdown requires the public HTML sanitizer");
    const safeTree = sanitize(toHast(tree, { handlers: markdownHtmlOptions.handlers }), schema);
    if (safeTree.type !== "root") throw new Error("Article Markdown must compile to a document root");
    const counts = new Map<string, number>();
    const used = new Set<string>();
    const headings: ContentHeading[] = [];

    const visit = (node: HtmlNodes): void => {
      if (node.type === "element" && ["h1", "h2", "h3", "h4"].includes(node.tagName)) {
        const text = headingText(node).replace(/\s+/g, " ").trim();
        if (text) {
          const base = slugify(text);
          let count = counts.get(base) || 0;
          let id = count === 0 ? base : `${base}-${count + 1}`;
          while (used.has(id)) id = `${base}-${++count + 1}`;
          counts.set(base, count + 1);
          used.add(id);
          node.properties.id = id;
          node.properties.className = ["archive-heading"];
          headings.push({ id, text, level: Number(node.tagName.slice(1)) });
        }
      }
      if ("children" in node) node.children.forEach(visit);
    };
    visit(safeTree);
    file.data.articleHeadings = headings;
    // Introduction boundaries belong to the sanitized document tree, not a
    // regex over serialized HTML that can backtrack through later sections.
    if (title !== undefined) {
      const media = new Set(mediaPlaceholders);
      annotateEditorialLead(safeTree, media);
      file.data.articleIntroduction = composeArticleIntroduction(safeTree, title, headings[0], media);
    }
    const html = toHtml(safeTree);
    return html ? `${html}\n` : "";
  };
}
