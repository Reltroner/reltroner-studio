#!/usr/bin/env node
/**
 * Reltroner Studio — narrative-first, repository-wide quantitative QA.
 * Usage: node tools/audit-asthortera-canon.mjs --report
 *        node tools/audit-asthortera-canon.mjs --strict
 * This inventories all Markdown in the content directory, checks invariants, and reports
 * unresolved cross-domain gaps without pretending they are solved.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const ledger = JSON.parse(read("data/asthortera/nccm-national-audit-v1.json"));
const baseline = JSON.parse(read("data/asthortera/nccm-baseline-v2.json"));
const round = (value, places = 6) => Number(value.toFixed(places));

function enumerate(dir) {
  const absolute = path.join(root, dir);
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) return enumerate(child);
    return entry.isFile() && entry.name.endsWith(".md") ? [child] : [];
  });
}

const files = enumerate("content");
const findings = [];
function add(severity, id, evidence, detail) {
  findings.push({ severity, id, evidence, detail });
}
const retiredPatterns = [
  /\b61\s*\/\s*24\s*\/\s*5\s*\/\s*7\s*\/\s*3\b/gi,
  /\b61%\s*(?:human|depeisit|western\s*\/\s*caucasian)/gi,
  /\b24%\s*(?:human|cistheta|east\s+asian)/gi,
  /\b5%\s*cosmeilia[\s-]*human/gi,
];
for (const file of files) {
  const content = read(file);
  for (const rx of retiredPatterns) {
    for (const match of content.matchAll(rx)) {
      const line = content.slice(0, match.index).split("\n").length;
      add("P0", "RETIRED_ANCESTRY_IN_ACTIVE_CONTENT", file + ":" + line,
        "Remove obsolete planetary ancestry phrasing; only the current 58/22/10/7/3 distribution can be presented as Year 0.");
    }
  }
}
const group = baseline.year0_ancestry;
if (group.length !== 5 || group.reduce((sum, n) => sum + n, 0) !== 1) {
  add("P0", "INVALID_PLANETARY_ANCESTRY", "data/asthortera/nccm-baseline-v2.json", "Five ancestry categories must sum to exactly 100%.");
}
if (group.map(v => Math.round(v * 100)).join("/") !== "58/22/10/7/3") {
  add("P0", "PLANETARY_ANCESTRY_OUT_OF_SYNC", "data/asthortera/nccm-baseline-v2.json",
    "Planetary ancestry must match the creator-ratified five-group reporting split.");
}
const planetB = ledger.planet.population_billion;
const coveredB = ledger.country_rows.reduce((sum, c) => sum + c.population_billion, 0);
const nativeKnownB = ledger.country_rows.reduce((sum, c) =>
  sum + c.population_billion * (c.ancestry_percent_national_labels.native || 0) / 100, 0);
const cosmeiliaKnownB = ledger.country_rows.reduce((sum, c) =>
  sum + c.population_billion * (c.ancestry_percent_national_labels.cosmeilia || 0) / 100, 0);
const nativePlanetB = planetB * ledger.planet.ancestry_percent.native / 100;
const cosmeiliaPlanetB = planetB * ledger.planet.ancestry_percent.cosmeilia_human_mixed / 100;

for (const country of ledger.country_rows) {
  const content = read(country.path);
  const reported = country.ancestry_percent_national_labels;
  const pctSum = Object.values(reported).filter(v => typeof v === "number")
    .reduce((sum, value) => sum + value, 0);
  if (Math.abs(pctSum - 100) > 0.00001) {
    add("P1", "NATIONAL_ANCESTRY_SUM", country.path,
      country.name + " reported ancestry categories sum to " + pctSum + "%.");
  }
  const regexp = new RegExp(String(country.population_billion) + "\\s+billion\\b", "i");
  if (!regexp.test(content)) {
    add("P1", "NATIONAL_POPULATION_SOURCE_CHANGED", country.path,
      "Audit ledger reports " + country.population_billion + " billion, which was not found verbatim in the current profile.");
  }
}
if (coveredB > planetB) {
  add("P0", "NATIONAL_POPULATIONS_EXCEED_PLANET", "content/factions/",
    "Named country population sum " + coveredB + " billion exceeds the planet " + planetB + " billion.");
}
if (nativeKnownB > nativePlanetB + 1e-8) {
  add("P0", "NATIVE_ANCESTRY_EXCEEDS_PLANET", "content/factions/ -> content/statistics/",
    "The 14 national profiles alone report at least " + round(nativeKnownB, 3) +
    " billion native sentients versus " + round(nativePlanetB, 3) +
    " billion in the planetary denominator. Overshoot " +
    round(nativeKnownB - nativePlanetB, 3) + " billion; reconcile census scope and group mapping.");
}
if (cosmeiliaKnownB > cosmeiliaPlanetB + 1e-8) {
  add("P0", "COSMEILIA_CROSSWALK_UNDEFINED", "content/factions/ -> content/statistics/",
    "National 'Cosmeilia Cosmic Races and mixed' counts exceed the planetary 'Cosmeilia-Human mixed' category by at least " +
    round(cosmeiliaKnownB - cosmeiliaPlanetB, 3) +
    " billion if treated identically. A classification crosswalk is required before numerical comparison.");
}
if (coveredB < planetB) {
  add("P1", "UNMODELED_NATIONAL_POPULATION", "content/factions/",
    round(planetB - coveredB, 3) + " billion planetary sentients are outside the 14 audited country profiles; they are not assumed missing persons.");
}
if (1 + 30 + 45 + 18 + 5 !== 100) {
  add("P1", "KALGERED_EXPENDITURE_RESIDUAL", "content/factions/kalgered.md",
    "The five published spending classes total 99%; one percentage point is unresolved.");
}
const lenternowGDP = 182e15;
const lenternowPopulation = 214e9;
const perCapita = lenternowGDP / lenternowPopulation;
if (!read("content/factions/lenternow.md").includes("850,467")) {
  add("P0", "LENTERNOW_GDP_PER_CAPITA", "content/factions/lenternow.md",
    "182 quadrillion LNR / 214 billion = " + round(perCapita, 4) + " LNR/person/year.");
}
const h = baseline.historical_1010;
const m = baseline.year0;
const rel1010USD = h.rel_gdp_rel * h.usd_per_rel;
const rel0USD = m.rel_gdp_rel * m.usd_per_rel;
const planet0USD = rel0USD / m.rel_gdp_share_planet;
const alpha = (planet0USD / h.planet_gdp_usd) ** (1 / baseline.assumptions.years) - 1;
const rho = (rel0USD / rel1010USD) ** (1 / baseline.assumptions.years) - 1;

const output = {
  schema: "Reltroner Studio NCCM V2 quantitative QA",
  status: findings.some(f => f.severity === "P0") ? "NOT_PRODUCTION_READY" : "NO_BLOCKING_FINDINGS_IN_DEFINED_CHECKS",
  scope: { markdownFilesScanned: files.length, factionProfilesTranscribed: ledger.country_rows.length },
  canonicalPopulationBillion: planetB,
  nationalPopulationCoveredBillion: coveredB,
  nationalPopulationNotYetAllocatedBillion: round(planetB - coveredB, 3),
  nativeKnownBillion: round(nativeKnownB, 3),
  nativePlanetBillion: round(nativePlanetB, 3),
  cosmeiliaNationalLabelsBillion: round(cosmeiliaKnownB, 3),
  cosmeiliaPlanetMixedCategoryBillion: round(cosmeiliaPlanetB, 3),
  lenternowDerivedGDPPerCapitaLNR: round(perCapita, 4),
  nominalUSDCAGR: { alpha: round(alpha, 10), rho: round(rho, 10) },
  p0Count: findings.filter(f => f.severity === "P0").length,
  p1Count: findings.filter(f => f.severity === "P1").length,
  findings
};
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
if (strict && output.p0Count > 0) process.exitCode = 1;
