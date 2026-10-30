#!/usr/bin/env node
/**
 * Asthortera cross-domain statistical QA.
 * Runs on a local checkout without network access or dependencies.
 *
 * This is an integrity audit, not a canon generator. An unresolved P0 blocker
 * deliberately returns exit code 1. Never silently normalize national data.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inside = (p) => path.join(root, p);
const read = (p) => fs.readFileSync(inside(p), 'utf8');
const dir = 'content';
const issues = [];
const info = [];
const eq = (a, b, tol = 1e-8) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const fail = (id, detail) => issues.push({ severity: 'P0', id, detail });
const warn = (id, detail) => issues.push({ severity: 'P1/P2', id, detail });

function walk(rel) {
  return fs.readdirSync(inside(rel), { withFileTypes: true }).flatMap((entry) => {
    const next = path.posix.join(rel, entry.name);
    return entry.isDirectory() ? walk(next) : entry.isFile() && next.endsWith('.md') ? [next] : [];
  });
}

const files = walk(dir);
const contents = new Map(files.map((p) => [p, read(p)]));
info.push({ metric: 'content_markdown_files_scanned', value: files.length });

const country = JSON.parse(read('data/asthortera/national-cross-domain-audit-2026-10-30.json'));
const canon = JSON.parse(read('data/asthortera/nccm-baseline-v2.json'));
const knownPlanetary = country.planet.ancestry_ratified_pct;
if (!eq(Object.values(knownPlanetary).reduce((s, v) => s + v, 0), 100)) {
  fail('PLANET_ANCESTRY_SUM', 'Planet ancestry reporting shares do not total 100%.');
}
if (JSON.stringify([knownPlanetary.depeisit, knownPlanetary.cistheta, knownPlanetary.cosmeilia_human_mixed, knownPlanetary.native, knownPlanetary.other]) !== JSON.stringify([58, 22, 10, 7, 3])) {
  fail('PLANET_ANCESTRY_CANON', 'Planet ancestry diverges from ratified 58/22/10/7/3.');
}
if (!eq(canon.year0_planet_population, country.planet.population_billion * 1e9)) {
  fail('PLANET_ANCESTRY_DENOMINATOR', 'Global population denominator mismatches the calibrated baseline.');
}

// Construct the obsolete five-value signature for a QA check, without publishing
// an obsolete demographic narrative in the active content documents.
const obsoleteRatio = new RegExp([61, 24, 5, 7, 3].join('\\s*[/,]\\s*'));
for (const [file, content] of contents) {
  if (obsoleteRatio.test(content)) fail('OBSOLETE_ANCESTRY_IN_CONTENT', file);
  if (!content.trim()) warn('EMPTY_CONTENT_FILE', file);
}
const requiredGlobal = [
  'content/statistics/asthortera_identity.md',
  'content/statistics/asthortera-vs-earth.md',
  'content/places/asthortera-core-world.md',
  'content/statistics/sentient-population.md',
  'content/philosophies/why-immigrants-choose-asthortera.md',
];
for (const file of requiredGlobal) {
  const text = contents.get(file);
  if (!text) { fail('MISSING_CANONICAL_DOCUMENT', file); continue; }
  for (const pct of ['58%', '22%', '10%', '7%', '3%']) {
    if (!text.includes(pct)) fail('MISSING_CANONICAL_PERCENTAGE', file + ': ' + pct);
  }
}

const countries = country.countries;
let pop = 0, native = 0, land = 0, popSDI = 0;
for (const c of countries) {
  const text = contents.get(c.source);
  if (!text) { fail('COUNTRY_PROFILE_NOT_FOUND', c.source); continue; }
  const a = c.reported_ancestry_pct;
  const shares = a.depeisit + a.cistheta + (a.cosmeilia_or_mixed ?? 0) + a.native + a.other_or_unclassified;
  if (!eq(shares, 100)) fail('NATIONAL_ANCESTRY_SUM', c.name + ' = ' + shares + '%');
  const expectedPct = a.native === 90.3 ? '90.3%' : a.native + '%';
  if (!text.includes(expectedPct)) warn('NATIONAL_NATIVE_VALUE_NOT_LOCATABLE', c.source + ': ' + expectedPct);
  pop += c.population_billion;
  land += c.area_million_km2;
  native += c.population_billion * a.native / 100;
  popSDI += c.population_billion * c.sdi;
}
const maxNative = country.planet.population_billion * country.planet.ancestry_ratified_pct.native / 100;
const remaining = country.planet.population_billion - pop;
info.push({ metric: 'countries_profiled', value: countries.length });
info.push({ metric: 'profiled_population_billion', value: pop });
info.push({ metric: 'population_not_yet_allocated_billion', value: remaining });
info.push({ metric: 'reported_native_billion', value: Number(native.toFixed(6)) });
info.push({ metric: 'planet_native_limit_billion', value: maxNative });
info.push({ metric: 'national_land_area_million_km2', value: land });
if (native > maxNative + 1e-7) {
  fail('AST-NATIVE-001', 'Country native subtotal ' + native.toFixed(3) + 'B exceeds the ratified planet limit ' + maxNative.toFixed(3) + 'B by ' + (native - maxNative).toFixed(3) + 'B. Do not auto-reclassify people.');
}
if (remaining < 0) fail('PLANET_COUNTRY_TOTAL_OVERFLOW', 'The profiled nations exceed the full planet population.');
if (remaining > 0) warn('AST-COUNTRY-002', remaining.toFixed(3) + 'B sentients have no profile allocation in this 14-country data snapshot.');
if (land > country.planet.land_area_million_km2) fail('PLANET_LAND_OVERFLOW', 'Country land areas exceed planetary land area.');
const requiredOtherSDI = (country.planet.population_billion * country.planet.sdi - popSDI) / remaining;
info.push({ metric: 'conditional_unprofiled_population_weighted_sdi', value: requiredOtherSDI });

// Fixed-error regression checks.
const lent = contents.get('content/factions/lenternow.md') || '';
if (!lent.includes('850,467') || !lent.includes('182 quadrillion') || !lent.includes('214 billion')) {
  fail('LENTERNOW_GDP_PER_CAPITA_REGRESSION', 'GDP 182Q / 214B must derive about LNR 850,467 per capita.');
}
const census = contents.get('content/statistics/sentient-population.md') || '';
const cosSection = census.split('## 🌠 **Planet Cosmeilia**')[1]?.split('## 🪐')[0] || '';
if (!cosSection.includes('85% Cosmeilia-Human') || !cosSection.includes('5% Other Cosmeilian Sentients')) {
  fail('COSMEILIA_CENSUS_REGRESSION', 'Cross-planet summary must follow Cosmeilia identity at 85%/5%.');
}
const galaxy = contents.get('content/places/the-galaxy.md') || '';
if (!galaxy.includes('**307 years**') || !galaxy.includes('**249 years**') || !galaxy.includes('**215 years**') || !galaxy.includes('0.852')) {
  fail('GALACTIC_IDENTITY_REGRESSION', 'Planetary median ages or Depeisit SDI have drifted.');
}
const paia = contents.get('content/places/paia-aeropolis-hub.md') || '';
if (!paia.includes('Depcutland (0.981)')) fail('DEPCUTLAND_SDI_REGRESSION', 'PAIA must use 0.981.');
const kal = contents.get('content/factions/kalgered.md') || '';
if (!kal.includes('99%')) warn('KALGERED_RESIDUAL_UNDOCUMENTED', 'Kalgered 1-point expenditure residual lacks its warning.');
else warn('AST-KAL-004', 'Kalgered expense groups remain 99% pending primary-source evidence.');

const report = {
  status: issues.some(x => x.severity === 'P0') ? 'FAIL_UNRESOLVED_P0' : 'PASS_P0',
  scanned_markdown_count: files.length,
  info,
  issues
};
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log('Asthortera cross-domain audit: ' + report.status);
  for (const x of info) console.log(' - ' + x.metric + ': ' + x.value);
  for (const x of issues) console.log(' [' + x.severity + '] ' + x.id + ': ' + x.detail);
}
if (report.status !== 'PASS_P0') process.exitCode = 1;
