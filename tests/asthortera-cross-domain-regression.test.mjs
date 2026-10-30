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
test('The immutable planet holds 37 sovereign nations and 4.412 trillion unique sentients',()=>{
  assert.equal(data.planet.sovereign_country_count,37);
  assert.equal(data.coverage.sovereign_countries_without_profiled_demographics,23);
  const total=data.countries.reduce((s,c)=>s+c.population_billion,0);
  eq(total,3288);
  eq(data.planet.population_billion-total,1124);
  assert.ok(data.known_gaps.some(x=>x.code==='INCOMPLETE_37_COUNTRY_LINEAGE_CENSUS'&&x.status==='OPEN'));
});
test('Inclusive native/Cosmeilian lineage counts are not capped by primary ancestry classes',()=>{
  const n=data.countries.reduce((s,c)=>s+c.population_billion*c.reported_ancestry_pct.native/100,0);
  const cos=data.countries.reduce((s,c)=>s+c.population_billion*(c.reported_ancestry_pct.cosmeilia_or_mixed||0)/100,0);
  eq(n,378.753);
  eq(cos,539.75);
  const model=JSON.parse(read('data/asthortera/nccm-baseline-v2.json'));
  const scopes=model.ancestry_measurement_scopes.inclusive_lineage_presence;
  eq(scopes.cosmeilian_lineage.observed_14_country_lower_bound/1e9,cos);
  eq(scopes.native_asthorteran_lineage.observed_14_country_lower_bound/1e9,n);
  assert.ok(scopes.cosmeilian_lineage.candidate_planet_headcount > cos*1e9);
  assert.ok(scopes.native_asthorteran_lineage.candidate_planet_headcount > n*1e9);
  assert.equal(model.year0_planet_population,4.412e12);
});
test('Kalgered private expenditure candidate is explicitly noncanonical and sums to 100%',()=>{
  const k=JSON.parse(read('data/asthortera/kalgered-remodeling-candidate-v1.json'));
  assert.match(k.status,/not ratified/);
  eq(k.remodel_scenario.bands.reduce((s,b)=>s+b.share,0),1);
  const avg=k.remodel_scenario.bands.reduce((s,b)=>s+b.share*b.representative,0);
  eq(avg,23050);
  eq(k.year0.population,108e9);
  eq(k.year0.gni_per_capita_kal_year,17956408);
  eq(k.year0.sdi,.979);
});


test('Creator-ratified ancestry of four countries sums to 100% and matches national profiles',()=>{
 const expected={
  Taramistry:[54,25,12,5,4],Pencilfania:[56,23,14,3,4],
  Beluftner:[.2,.5,7,90.3,2],Hargenbor:[44,40,6,8,2]
 };
 for(const [name,values] of Object.entries(expected)){
  const c=data.countries.find(x=>x.name===name);
  assert.ok(c,"Missing "+name);
  const a=c.reported_ancestry_pct;
  assert.deepEqual([a.depeisit,a.cistheta,a.cosmeilia_or_mixed,a.native,a.other_or_unclassified],values);
  eq(values.reduce((x,y)=>x+y,0),100);
  assert.match(read(c.source),/Ratified Year 0/);
 }
});
test('Planet Year 0 composite SDI 0.947 is population-weighted and national anchors stay fixed',()=>{
 const b=JSON.parse(read('data/asthortera/nccm-baseline-v2.json'));
 const v=JSON.parse(read('data/asthortera/nccm-v3-14-country-comparative-model.json'));
 eq(data.planet.sdi,.947);
 eq(b.year0.planet_sdi,.947);
 eq(v.reporting.planet_sdi,.947);
 eq(data.planet.population_billion,4412);
 const known=data.countries.reduce((s,c)=>s+c.population_billion*c.sdi,0);
 eq(known,3152.002);
 eq((known+1124*v.reporting.other_23_sdi_required)/4412,.947);
 assert.equal(v.countries.length,14);
 for(const country of v.countries){
  const source=data.countries.find(x=>x.name===country.name);
  eq(country.census.sdi_national,source.sdi);
  const s=country.sdi_decomposition_candidate;
  eq(.6*s.individual_mean+.4*s.institutional_quality,source.sdi);
 }
});
test('Fourteen state GDP simulation sums to fixed world GDP but does not impersonate official currency',()=>{
 const b=JSON.parse(read('data/asthortera/nccm-baseline-v2.json'));
 const v=JSON.parse(read('data/asthortera/nccm-v3-14-country-comparative-model.json'));
 const planet=b.year0.rel_gdp_rel*b.year0.usd_per_rel/b.year0.rel_gdp_share_planet;
 const nat=v.countries.reduce((s,x)=>s+x.economy.core_gdp_nominal_usd_reference.value,0);
 eq(nat+v.remaining_23_aggregate.gdp_usd_scenario,planet);
 eq(v.countries.find(x=>x.name==='Reltronland').economy.planetary_gdp_share.value,.42);
 eq(v.countries.reduce((s,x)=>s+x.census.population_billion,0),3288);
 for(const c of v.countries){
  assert.match(read(c.source),/NCCM V3 — Cross-Domain Benchmark/);
  if(c.name!=='Reltronland')assert.match(c.economy.core_gdp_nominal_usd_reference.status,/scenario/);
 }
});
test('Historic Kalgered and Taramistry century-growth perpetual claims were remodeled',()=>{
 const k=read('content/factions/kalgered.md');
 const t=read('content/factions/taramistry.md');
 assert.match(k,/3\.0% real CAGR/);
 assert.match(t,/3\.5%/);
 assert.doesNotMatch(k,/Annual Economic Growth:\*\* 7% \(last 100 years average\)/);
 assert.doesNotMatch(t,/8% average over the past 100 years/);
});
