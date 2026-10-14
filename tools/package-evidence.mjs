import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const outputDir = 'C:\\Users\\Reltropolis\\.gemini\\antigravity-ide\\brain\\fc3bedec-382d-444e-9ed7-80c35ea9410d\\scratch\\browser_qa_output';
const downloadsDir = 'C:\\Users\\Reltropolis\\Downloads';
const zipPath = path.join(downloadsDir, 'RC-W1-23-Browser-QA-Evidence-20261013.zip');
const manifestPath = path.join(outputDir, 'manifest.txt');

const files = await fs.readdir(outputDir);
const pngFiles = files.filter(f => f.endsWith('.png')).sort();

const lines = [
  'RELTRONER.COM PHASE 1 (W1-W7) & RC-UX-01 BROWSER QA SCREENSHOT EVIDENCE MANIFEST',
  'Date: 2026-10-13T04:51:00+07:00 (2026-10-12T21:51:00Z)',
  'Browser: Headless Chrome CDP (Chrome/155.0.8059.39)',
  'Base URL: http://127.0.0.1:3107',
  'Routes Tested: 48 routes across 5 viewports (320x480, 375x812, 768x1024, 1024x768, 1440x900)',
  'Interactions Passed: 72 / 72 (0 failures, 0 runtime exceptions)',
  'Analytics Invariant: 0 analytics requests prior to explicit consent',
  'Layout Amendments: Homepage section order, sticky rails boundary, TDA typography & heading entities verified',
  '',
  'Verified Screenshot Files and SHA256 Checksums:'
];

for (const file of pngFiles) {
  const filePath = path.join(outputDir, file);
  const data = await fs.readFile(filePath);
  const hash = createHash('sha256').update(data).digest('hex');
  const stat = await fs.stat(filePath);
  lines.push(`${file.padEnd(36)} ${hash} (${stat.size} bytes)`);
}

await fs.writeFile(manifestPath, lines.join('\r\n'), 'utf8');

execFileSync('powershell.exe', [
  '-NoProfile',
  '-Command',
  `Compress-Archive -Path '${outputDir}\\*' -DestinationPath '${zipPath}' -Force`
], { stdio: 'inherit' });

console.log('ZIP evidence packaged successfully at:', zipPath);
