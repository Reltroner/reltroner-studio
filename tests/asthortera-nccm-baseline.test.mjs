import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(p)=>readFileSync(path.join(root,p),"utf8");
const v=JSON.parse(read("data/asthortera/nccm-baseline-v2.json"));
function close(a,b){assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)), `Expected ${a} ≈ ${b}`);}
test("Archived V2 five-way ancestry snapshot sums to 100%; superseded by active V6 six-category data",()=>{
  assert.deepEqual(v.year0_ancestry.map(x=>Math.round(100*x)),[58,22,10,7,3]);
  close(v.year0_ancestry.reduce((a,b)=>a+b,0),1);
  close(v.year0_ancestry.reduce((a,b)=>a+b*v.year0_planet_population,0),4.412e12);
});
test("Canonical V6.5 planet pages supersede historical five-way ancestry without erasing V2 archives",()=>{
  const current=JSON.parse(read("data/asthortera/nccm-v6-active-cross-domain.json"));
  assert.equal(current.canon_ratification.status,"C");
  assert.deepEqual(Object.keys(current.planet.ancestry_primary_pct_representative_14_country_weighted),["depeisit","cistheta","cosmeilian","native","phantomkind","other"]);
  const summed=Object.values(current.planet.ancestry_primary_pct_representative_14_country_weighted).reduce((a,b)=>a+b,0);
  close(summed,100);
  for(const p of ["content/statistics/asthortera_identity.md","content/statistics/asthortera-vs-earth.md"]){
    const txt=read(p);
    assert.ok(txt.includes("NCCM V6.5 — Year 0 canon statistics (C)"),p);
    assert.ok(txt.includes("Phantomkind / Spiritual Hybrid"),p);
    assert.ok(txt.includes("3,213B (14) + 395B (5) + 804B (18)"),p);
    assert.ok(!txt.includes("Year 0 ancestry correction (2026-10-30):"),p);
  }
  // The historic V2 raw five-way distribution remains preserved in its dated ledger only.
  assert.deepEqual(v.year0_ancestry.map(x=>Math.round(100*x)),[58,22,10,7,3]);
});
test("Archived V2 REL/USD and pre-uplift GDP/AUC bridge remains reproducible",()=>{
  const h=v.historical_1010,m=v.year0,a=v.assumptions;
  const r1010=h.rel_gdp_rel*h.usd_per_rel,r0=m.rel_gdp_rel*m.usd_per_rel;
  close(r1010,6.84e12);close(r1010/h.planet_gdp_usd,6.84/195.67);
  close(r0,4.7448998686935e21);
  const p0=r0/m.rel_gdp_share_planet;
  close(p0,1.1297380639746428e22);
  close(p0/a.usd_per_auc_reporting,4.138234666573783e21);
});
test("GDP CAGRs and the candidate 250-year period close the endpoints",()=>{
  const h=v.historical_1010,m=v.year0,a=v.assumptions;
  const r1010=h.rel_gdp_rel*h.usd_per_rel,r0=m.rel_gdp_rel*m.usd_per_rel,p0=r0/m.rel_gdp_share_planet;
  const alpha=(p0/h.planet_gdp_usd)**(1/a.years)-1,rho=(r0/r1010)**(1/a.years)-1;
  close(alpha,.017851936981463146);close(rho,.020360492166282107);
  const rhoREL=(m.rel_gdp_rel/h.rel_gdp_rel)**(1/a.years)-1,fx=(m.usd_per_rel/h.usd_per_rel)**(1/a.years)-1;
  close((1+rhoREL)*(1+fx),1+rho);
  const y=a.miracle_250_candidate,p250=p0/(1+y.nominal_usd_cagr_planet)**250,r250=r0/(1+y.nominal_usd_cagr_rel)**250;
  close(r250/p250,.12442551931862635);
  const pe=(p250/h.planet_gdp_usd)**(1/760)-1,re=(r250/r1010)**(1/760)-1;
  close(h.planet_gdp_usd*(1+pe)**760*(1+y.nominal_usd_cagr_planet)**250,p0);
  close(r1010*(1+re)**760*(1+y.nominal_usd_cagr_rel)**250,r0);
});
test("Archived V2 GDP/GNI zero-net-income bridge assumption is explicit",()=>{
  close(v.year0.rel_population*v.year0.rel_gni_per_capita_rel,v.year0.rel_gdp_rel);
  assert.match(read("content/factions/reltronland.md"),/provisional zero-net-primary-income balancing convention/);
});
test("12-percent compounding is corrected and Kalgered residual is not hidden",()=>{
  close(1e9*1.12**250,2.0160702802211032e21);
  assert.match(read("content/factions/reltronland.md"),/not a claim of 12% GDP growth every year for 250 years/);
  assert.equal(1+30+45+18+5,99);
  assert.match(read("content/factions/kalgered.md"),/unreconciled 1 percentage point/);
});
