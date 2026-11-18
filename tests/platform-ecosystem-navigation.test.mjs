import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { PLATFORM_ECOSYSTEM } from '../lib/constants/platform-ecosystem.ts';

const ROOT = process.cwd();

test('PLATFORM_ECOSYSTEM defines the exact three immutable entries in required order', () => {
  assert.equal(Object.isFrozen(PLATFORM_ECOSYSTEM), true);
  assert.equal(PLATFORM_ECOSYSTEM.length, 3);

  const [statistics, studio, academy] = PLATFORM_ECOSYSTEM;

  assert.deepEqual(
    {
      id: statistics.id,
      label: statistics.label,
      href: statistics.href,
      description: statistics.description,
      current: statistics.current,
    },
    {
      id: 'statistics',
      label: 'Reltroner Statistics',
      href: 'https://statistics.reltroner.com',
      description:
        'Source-pinned statistics, drift forensics and evidence tools for Asthortera.',
      current: false,
    },
  );

  assert.deepEqual(
    {
      id: studio.id,
      label: studio.label,
      href: studio.href,
      description: studio.description,
      current: studio.current,
    },
    {
      id: 'studio',
      label: 'Reltroner Studio',
      href: 'https://www.reltroner.com',
      description:
        'The fictional world of Asthortera and the systems behind it.',
      current: true,
    },
  );

  assert.deepEqual(
    {
      id: academy.id,
      label: academy.label,
      href: academy.href,
      description: academy.description,
      current: academy.current,
    },
    {
      id: 'academy',
      label: 'Reltroner Learning Academy',
      href: 'https://lms.reltroner.com',
      description: 'Courses and guided learning across the ecosystem.',
      current: false,
    },
  );

  const currentEntries = PLATFORM_ECOSYSTEM.filter((entry) => entry.current);
  assert.equal(currentEntries.length, 1);
  assert.equal(currentEntries[0].id, 'studio');
  assert.ok(PLATFORM_ECOSYSTEM.every((entry) => Object.isFrozen(entry)));
});

test('PlatformEcosystemMenu renders accessible disclosure controls and non-clickable current row', async () => {
  const source = await fs.readFile(
    path.join(ROOT, 'components/navigation/PlatformEcosystemMenu.tsx'),
    'utf8',
  );

  assert.match(source, /type="button"/);
  assert.match(source, /aria-expanded=\{isOpen\}/);
  assert.match(source, /aria-controls=\{MENU_ID\}/);
  assert.match(source, /role="group"/);
  assert.doesNotMatch(source, /role="menu"/);
  assert.match(source, /Platform Ecosystem/);
  assert.match(source, /You are here/);
  assert.match(source, /entry\.current \?/);
  assert.match(source, /aria-current="true"/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /pointerdown/);
});

test('Navbar and MobileNavbar both consume the shared PLATFORM_ECOSYSTEM registry and keep breakpoints synchronized', async () => {
  const [navbarSource, mobileSource, cssSource] = await Promise.all([
    fs.readFile(path.join(ROOT, 'components/Navbar.tsx'), 'utf8'),
    fs.readFile(path.join(ROOT, 'components/MobileNavbar.tsx'), 'utf8'),
    fs.readFile(path.join(ROOT, 'styles/globals/studio.css'), 'utf8'),
  ]);

  assert.match(navbarSource, /PlatformEcosystemMenu/);
  assert.match(navbarSource, /CommandPalette/);
  assert.match(navbarSource, /href="\/contact"/);

  assert.match(mobileSource, /PlatformEcosystemList/);
  assert.match(mobileSource, /href="\/#explore"/);
  assert.match(mobileSource, /ecosystemNavigation/);
  assert.match(mobileSource, /min-\[1100px\]:hidden/);

  assert.match(cssSource, /@media\(max-width:1099px\)/);
  assert.match(cssSource, /studio-ecosystem-button/);
});
