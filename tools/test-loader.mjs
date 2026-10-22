// Source tooling and tests only: no new dependency or change to application resolution.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = process.cwd();
export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only') return { url: 'data:text/javascript,export{}', shortCircuit: true };
  if (specifier.startsWith('@/') || specifier.startsWith('.') || specifier.startsWith('file:')) {
    const source = specifier.startsWith('@/') ? path.join(root, specifier.slice(2)) : fileURLToPath(new URL(specifier, context.parentURL || pathToFileURL(root + '/').href));
    for (const suffix of ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js']) {
      try { if ((await fs.stat(source + suffix)).isFile()) return { url: pathToFileURL(source + suffix).href, shortCircuit: true }; } catch {}
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('file:')) {
    const file = fileURLToPath(url);
    if (!file.includes('node_modules') && file.endsWith('.json')) {
      return { format: 'module', source: `export default ${await fs.readFile(file, 'utf8')}`, shortCircuit: true };
    }
    if (!file.includes('node_modules') && /\.(ts|tsx|js|jsx)$/.test(file)) {
      const source = await fs.readFile(file, 'utf8');
      return { format: 'module', source: ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }, fileName: file }).outputText, shortCircuit: true };
    }
  }
  return nextLoad(url, context);
}
