// tools/check-all-slugs.mjs

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';

const BASE_URL = process.env.SLUG_CHECK_BASE_URL || 'https://www.reltroner.com';
const CONTENT_PATH = path.join(process.cwd(), 'content');
const REPORT_PATH = path.join(process.cwd(), 'tools', 'slug-check-report.txt');

function getSlugsFromFolder(category) {
  const dirPath = path.join(CONTENT_PATH, category);
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function getAllCategories() {
  return fs.readdirSync(CONTENT_PATH).filter((entry) => {
    const fullPath = path.join(CONTENT_PATH, entry);
    return fs.statSync(fullPath).isDirectory();
  });
}

async function checkSlug(category, slug) {
  const url = `${BASE_URL}/${category}/${slug}`;
  try {
    const res = await axios.get(url, { timeout: 10000 });
    const html = res.data;

    if (typeof html === 'string' && /client-side exception|application error|failed to fetch/i.test(html)) {
      logResult('⚠️', category, slug, 200, 'Client-side Exception');
      return { status: 'error', category, slug, code: 200, error: 'Client-side Exception' };
    }

    logResult('✅', category, slug, 200, 'OK');
    return { status: 'ok', category, slug, code: 200 };

  } catch (err) {
    const statusCode = err.response ? err.response.status : (err.code || 'Network Error');
    logResult('❌', category, slug, statusCode, 'Failed');
    return { status: 'fail', category, slug, code: statusCode };
  }
}

function logResult(icon, category, slug, code, message) {
  const log = `${icon} [${category}] /${slug} → ${code} ${message}`;
  console.log(log);
  fs.appendFileSync(REPORT_PATH, log + '\n');
}

(async () => {
  fs.writeFileSync(REPORT_PATH, `Slug Check Report - ${new Date().toISOString()}\n\n`);

  const categories = getAllCategories();
  const allChecks = [];
  
  for (const category of categories) {
    const slugs = getSlugsFromFolder(category);
    for (const slug of slugs) {
      allChecks.push({ category, slug });
    }
  }

  const concurrencyLimit = 10;
  let activeCount = 0;
  let index = 0;

  await new Promise((resolve) => {
    const next = () => {
      if (index >= allChecks.length && activeCount === 0) {
        resolve();
        return;
      }
      while (activeCount < concurrencyLimit && index < allChecks.length) {
        activeCount++;
        const { category, slug } = allChecks[index++];
        checkSlug(category, slug).finally(() => {
          activeCount--;
          next();
        });
      }
    };
    next();
  });

  console.log(chalk.green('\n✔️ Finished! Report saved in "tools/slug-check-report.txt"'));
})();
