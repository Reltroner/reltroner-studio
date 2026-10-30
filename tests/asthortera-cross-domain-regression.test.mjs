import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const data = JSON.parse(read('data/asthortera/national-cross-domain-audit-2026-10-30.json'));
const eq = (a,b) => assert.ok(Math.abs(a-b) < Math.max(1,Math.abs(b))*1e-9,`${a} != ${b}`);
function walk(dir) {
  return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>{
    const p = path.posix.join(dir,e.name);
    return e.isDirectory() ? walk(p) : e.isFile() && p.endsWith('.md') ? [p] : [];
  });
}
test('No obsolete five-part planetary ancestry narrative in any content Markdown',()=>{
  const forbidden = new RegExp([61,24,5,7,3].join('\\s*[/,]\\s*'));
  const docs=walk('content');
  assert.ok(docs.length>=427,`Expected full content tree, found only ${docs.length} Markdown files`);
  for(const p of docs)assert.doesNotMatch(read(p),forbidden,`Obsolete ancestry narrative: ${p}`);
});
test('Global Year 0 ancestry fractions and headcounts are exact',()=>{
  const c=data.planet.ancestry_ratified_pct;
  assert.deepEqual([c.depeisit,c.cistheta,c.cosmeilia_human_mixed,c.native,c.other],[58,22,10,7,3]);
  eq(Object.values(c).reduce((s,x)=>s+x,0),100);
  eq(data.planet.population_billion*c.native/100,308.84);
});
test('Fourteen national profile categories sum locally to 100% without hiding taxonomy gaps',()=>{
  assert.equal(data.countries.length,14);
  for(const c of data.countries){
    assert.ok(fs.existsSync(path.join(root,c.source)),c.source);
    const a=c.reported_ancestry_pct;
    eq(a.depeisit+a.cistheta+(a.cosmeilia_or_mixed??0)+a.native+a.other_or_unclassified,100);
  }
});
test('Lenternow GDP/population and Cosmeilia census fixed against national/planet sources',()=>{
  eq(182e15/214e9,850467.2897196262);
  assert.match(read('content/factions/lenternow.md'),/850,467/);
  const cos=read('content/statistics/sentient-population.md').split('## 🌠 **Planet Cosmeilia**')[1].split('## 🪐')[0];
  assert.match(cos,/85% Cosmeilia-Human/);
  assert.match(cos,/5% Other Cosmeilian Sentients/);
  assert.match(read('content/statistics/cosmeilia_identity.md'),/85% Cosmeilia-Human/);
});
test('Galactic demography and PAIA Depcutland SDI agree with specialized sources',()=>{
  const g=read('content/places/the-galaxy.md');
  assert.match(g,/Depeisit \| Deep \| \*\*307 years\*\* \| ~25 trillion \| 0\.852/);
  assert.match(g,/Cosmeilia \| Central \| \*\*249 years\*\*/);
  assert.match(g,/Cistheta \| Central \| \*\*215 years\*\*/);
  assert.match(read('content/places/paia-aeropolis-hub.md'),/Depcutland \(0\.981\)/);
});
test('National native overhang remains explicitly registered as an open P0, not hidden',()=>{
  const sum=data.countries.reduce((s,c)=>s+c.population_billion*c.reported_ancestry_pct.native/100,0);
  eq(sum,377.423);
  eq(sum-data.planet.population_billion*.07,68.583);
  assert.ok(data.known_gaps.some(x=>x.code==='NATIVE_AGGREGATION_EXCEEDS_PLANET'&&x.status==='OPEN'));
  // This test verifies honest detection; the strict audit CLI MUST still fail.
});
test('The country-scope ceiling is recorded; unprofiled sovereign states must not be fabricated',()=>{
  const total=data.countries.reduce((s,c)=>s+c.population_billion,0);
  eq(total,3288);
  eq(data.planet.population_billion-total,1124);
});
