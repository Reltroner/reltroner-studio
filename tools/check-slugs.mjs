// tools/check-slugs.mjs

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';

const BASE_URL = 'https://www.reltroner.com';
const CONTENT_PATH = path.join(process.cwd(), 'content');
const REPORT_FILE = 'slug-check-report.txt';

// Get all category folders inside /content
function getAllCategories() {
  return fs.readdirSync(CONTENT_PATH).filter((entry) => {
    const fullPath = path.join(CONTENT_PATH, entry);
    return fs.statSync(fullPath).isDirectory();
  });
}

// Get all slugs from a category folder
function getSlugsFromCategory(category) {
  const dirPath = path.join(CONTENT_PATH, category);
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

// Validate a single slug URL
async function checkSlug(category, slug) {
  const url = `${BASE_URL}/${category}/${slug}`;
  try {
    const res = await axios.get(url);
    const html = res.data;

    if (/client-side exception|application error|failed to fetch/i.test(html)) {
      logResult('⚠️', category, slug, 200, 'Client-side Exception');
      return;
    }

    logResult('✅', category, slug, 200, 'OK');
  } catch (err) {
    const code = err.response ? err.response.status : 'Network Error';
    logResult('❌', category, slug, code, 'Failed');
  }
}

// Log result to console and file
function logResult(icon, category, slug, code, message) {
  const log = `${icon} [${category}] /${slug} → ${code} ${message}`;
  console.log(log);
  fs.appendFileSync(REPORT_FILE, log + '\n');
}

// Main runner
(async () => {
  fs.writeFileSync(REPORT_FILE, `Slug Check Report - ${new Date().toISOString()}\n\n`);

  const categories = getAllCategories();
  for (const category of categories) {
    const slugs = getSlugsFromCategory(category);
    const checks = slugs.map((slug) => checkSlug(category, slug));
    await Promise.all(checks); // Run in parallel
  }

  console.log(chalk.green('\n✔️ All slugs checked! Report saved in "slug-check-report.txt"'));
})();
