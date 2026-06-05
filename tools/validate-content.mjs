import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;
const CONTENT_FILE_PATTERN = /\.(md|mdx)$/i;

function getErrorLocation(error) {
  if (!error?.mark) {
    return "";
  }

  const line = Number.isInteger(error.mark.line) ? error.mark.line + 1 : null;
  const column = Number.isInteger(error.mark.column) ? error.mark.column + 1 : null;

  if (line && column) {
    return `:${line}:${column}`;
  }

  if (line) {
    return `:${line}`;
  }

  return "";
}

function getFrontmatterBlock(source) {
  const match = source.match(FRONTMATTER_PATTERN);
  return match ? match[1] : "";
}

function getFieldLine(frontmatter, fieldName) {
  if (!frontmatter) {
    return "";
  }

  const lines = frontmatter.split(/\r?\n/);
  const target = `${fieldName}:`;

  for (const [index, line] of lines.entries()) {
    if (line.trimStart().startsWith(target)) {
      return `:${index + 2}`;
    }
  }

  return "";
}

function reportIssue(bucket, severity, filePath, message, location = "") {
  bucket.push({ severity, filePath, message, location });
}

async function listContentFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolvedPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listContentFiles(resolvedPath);
      }

      if (!CONTENT_FILE_PATTERN.test(entry.name)) {
        return [];
      }

      return [resolvedPath];
    }),
  );

  return files.flat();
}

function normalizeSlug(fileName, data) {
  const fileSlug = fileName.replace(/\.(md|mdx)$/i, "");
  return String(data.slug || fileSlug).trim();
}

function validateTags(tags) {
  if (typeof tags === "undefined") {
    return null;
  }

  if (!Array.isArray(tags)) {
    return {
      severity: "WARN",
      message: "tags use a scalar string; convert to a YAML array such as `tags: [One, Two]` or an indented list",
    };
  }

  if (tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    return {
      severity: "ERROR",
      message: "must contain only non-empty string items",
    };
  }

  return null;
}

async function main() {
  const files = await listContentFiles(CONTENT_ROOT);
  const issues = [];
  const slugRegistry = new Map();
  const routeRegistry = new Map();

  for (const filePath of files) {
    const source = await fs.readFile(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
    const frontmatter = getFrontmatterBlock(source);
    const relativeFromContent = path.relative(CONTENT_ROOT, filePath);
    const pathParts = relativeFromContent.split(path.sep);
    const collection = pathParts[0];
    const fileName = path.basename(filePath);

    let parsed;

    try {
      parsed = matter(source);
    } catch (error) {
      reportIssue(
        issues,
        "ERROR",
        relativePath,
        `invalid frontmatter YAML: ${error.reason || error.message}`,
        getErrorLocation(error),
      );
      continue;
    }

    const { data } = parsed;
    const slug = normalizeSlug(fileName, data);
    const route = `/${collection}/${slug}`;
    const tagsError = validateTags(data.tags);

    if (!data.title) {
      reportIssue(issues, "WARN", relativePath, "missing title", getFieldLine(frontmatter, "title"));
    }

    if (!data.description) {
      reportIssue(
        issues,
        "WARN",
        relativePath,
        "missing description",
        getFieldLine(frontmatter, "description"),
      );
    }

    if (!data.category) {
      reportIssue(
        issues,
        "WARN",
        relativePath,
        "missing category",
        getFieldLine(frontmatter, "category"),
      );
    }

    if (tagsError) {
      reportIssue(
        issues,
        tagsError.severity,
        relativePath,
        `invalid tags: ${tagsError.message}`,
        getFieldLine(frontmatter, "tags"),
      );
    }

    const slugKey = `${collection}:${slug}`;
    if (slugRegistry.has(slugKey)) {
      reportIssue(
        issues,
        "ERROR",
        relativePath,
        `duplicate slug with ${slugRegistry.get(slugKey)}`,
      );
    } else {
      slugRegistry.set(slugKey, relativePath);
    }

    if (routeRegistry.has(route)) {
      reportIssue(
        issues,
        "ERROR",
        relativePath,
        `duplicate route with ${routeRegistry.get(route)}`,
      );
    } else {
      routeRegistry.set(route, relativePath);
    }
  }

  if (issues.length === 0) {
    console.log(`[content:validate] OK - validated ${files.length} files with no issues.`);
    return;
  }

  for (const issue of issues) {
    console.log(`[${issue.severity}] ${issue.filePath}${issue.location} ${issue.message}`);
  }

  const errorCount = issues.filter((issue) => issue.severity === "ERROR").length;
  const warningCount = issues.filter((issue) => issue.severity === "WARN").length;

  console.log(
    `[content:validate] Completed with ${errorCount} error(s) and ${warningCount} warning(s) across ${files.length} files.`,
  );

  if (errorCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[content:validate] Fatal error: ${error.message}`);
  process.exitCode = 1;
});