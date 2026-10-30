import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const model=read('data/asthortera/nccm-v6-active-cross-domain.json');
const archived=read('data/asthortera/nccm-v3-14-country-comparative-model.json');
const P=model.planet;
const eq=(a,b,t=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),String(a)+' != '+String(b));
const sum=(xs,fn=x=>x)=>xs.reduce((a,c)=>a+fn(c),0);
test('V6 Year 0 planetary baseline and historic 1010 BAC creator ratifications',()=>{
 assert.equal(model.schema_version,'NCCM-V6.4-stelpadland-debt-and-industry-active');
 assert.equal(P.population_billion,4412);
 assert.equal(P.sovereign_states,37);
 eq(P.sdi,.947);
 eq(P.year0.tfr,1.63);
 eq(P.year0.median_age_years,252);
 eq(P.year0.urbanization_rate,.895);
 eq(P.year0.annual_inflation,.0033);
 eq(P.historical_1010_BAC.median_age_years,30);
 eq(P.historical_1010_BAC.urbanization_rate,.68);
 eq(P.historical_1010_BAC.annual_inflation,.043);
});
test('Six exclusive ancestry categories validated in all 14 nations, with valid weighted global projection',()=>{
 const keys=['depeisit','cistheta','cosmeilian','native','phantomkind','other'];
 assert.equal(model.countries_14.length,14);
 const weighted={};
 for(const k of keys)weighted[k]=0;
 for(const c of model.countries_14){
   assert.equal(Object.keys(c.ancestry_primary_pct).length,6);
   eq(sum(Object.values(c.ancestry_primary_pct)),100);
   for(const k of keys)weighted[k]+=c.population_billion*c.ancestry_primary_pct[k]/100;
 }
 eq(sum(Object.values(weighted)),3213);
 eq(weighted.depeisit,1549.032);
 eq(weighted.cistheta,636.185);
 eq(weighted.cosmeilian,495.4);
 eq(weighted.native,369.163);
 eq(weighted.phantomkind,71.89);
 eq(weighted.other,91.33);
 for(const k of keys){
   const original=model.census.pre_migration_reference.original_14_ancestry_headcount_billion[k];
   const moved=model.migration_year0.ancestry_six_category_moved_billion[k];
   eq(weighted[k]+moved,original);
   eq(100*original/3288,P.ancestry_primary_pct_representative_14_country_weighted[k]);
   eq(original*4412/3288,P.ancestry_primary_headcount_billion_representative[k]);
 }
 eq(sum(Object.values(P.ancestry_primary_pct_representative_14_country_weighted)),100);
 assert.match(model.provenance.legacy_ratios_58_22_10_7_3,/superseded/);
});
test('No sovereigns or residents fabricated under creator-approved 14+5+18 partition',()=>{
 assert.equal(model.countries_5.length,5);
 assert.equal(model.aggregate_remaining_18.state_count,18);
 eq(sum(model.countries_14,c=>c.population_billion),3213);
 eq(sum(model.countries_5,c=>c.population_billion),395);
 eq(model.aggregate_remaining_18.population_billion,804);
 eq(3213+395+804,4412);
 assert.equal(model.aggregate_remaining_18.individual_country_data,'explicitly deferred by creator');
 assert.equal(model.aggregate_remaining_18.ancestry_primary_pct_by_country,null);
 assert.deepEqual(new Set(model.countries_5.map(x=>x.name)),new Set(['Scenrepolia','Krisberia','Mapether','Ethaptoria','Calespia']));
});
test('All 19 national SDIs and residual SDI reconcile the immutable planetary SDI',()=>{
 for(const c of [...model.countries_14,...model.countries_5]){
   eq(.6*c.sdi_individual_component+.4*c.sdi_institution_component,c.sdi);
 }
 eq((sum(model.countries_14,c=>c.sdi*c.population_billion)+sum(model.countries_5,c=>c.sdi*c.population_billion)+804*model.aggregate_remaining_18.sdi_population_weighted_required)/4412,.947);
 eq(model.aggregate_remaining_18.sdi_population_weighted_required,.8984017412935316);
 assert.equal(model.countries_14.find(x=>x.name==='Reltronland').median_age_years,254);
});
test('Integrated income-output upgrade increases GDP and GNI 10x without changing original national GDP shares',()=>{
 const byName=new Map(archived.countries.map(x=>[x.name,x]));
 eq(P.year0.gdp_usd_annual_V6,10*archived.calibration.planet_gdp_usd);
 eq(P.year0.gni_usd_annual_V6_zero_bridge,P.year0.gdp_usd_annual_V6);
 for(const c of model.countries_14){
   const old=byName.get(c.name);
   assert.ok(old);
   eq(c.gdp_planet_share,old.economy.planetary_gdp_share.value);
   eq(c.gdp_usd_annual_V6,10*old.economy.core_gdp_nominal_usd_reference.value);
   const departures=sum(model.migration_year0.routes.filter(r=>r.origin===c.name),r=>r.population_billion);
   eq(c.population_billion,old.census.population_billion-departures);
   eq(c.gdp_per_capita_usd_V6,c.gdp_usd_annual_V6/(c.population_billion*1e9));
 }
 const entire=[...model.countries_14,...model.countries_5,model.aggregate_remaining_18];
 eq(sum(entire,x=>x.gdp_usd_annual_V6),P.year0.gdp_usd_annual_V6);
 eq(sum(entire,x=>x.gdp_planet_share),1);
 eq(sum(model.countries_5,x=>x.gdp_planet_share)+model.aggregate_remaining_18.gdp_planet_share,archived.calibration.other_23_aggregate_gdp_share);
});
test('Eastern five sectoral value-add compositions and GNI accounting reconciled',()=>{
 const expected={Scenrepolia:[38,23,17,15,7],Krisberia:[35,27,18,14,6],Mapether:[34,25,20,15,6],Ethaptoria:[32,28,20,13,7],Calespia:[31,26,21,15,7]};
 for(const c of model.countries_5){
   assert.deepEqual(c.sectors_value_added_pct.map(x=>x.share),expected[c.name]);
   eq(sum(c.sectors_value_added_pct,x=>x.share),100);
   eq(c.gdp_per_capita_usd_V6,c.gdp_usd_annual_V6/(c.population_billion*1e9));
   eq(c.gni_per_capita_usd_proxy_V6,c.gdp_per_capita_usd_V6);
 }
});
test('Nation source files exist; recorded FX remains bounded and legacy currency conflicts acknowledged',()=>{
 for(const c of [...model.countries_14,...model.countries_5]){
   assert.ok(fs.existsSync(path.join(root,c.source)),c.source);
   assert.ok(c.fx.usd_per_local_unit>=22&&c.fx.usd_per_local_unit<=114.26);
 }
 assert.equal(model.countries_14.find(c=>c.name==='Reltronland').fx.usd_per_local_unit,114.26);
 assert.equal(model.countries_14.find(c=>c.name==='Beluftner').fx.usd_per_local_unit,22);
 assert.match(model.provenance.legacy_local_fx_ambiguities,/KRB.*KRF/);
 assert.match(model.provenance.legacy_local_fx_ambiguities,/MPT.*MWV/);
});

test('75B bilateral donor routes preserve source ancestry and donor SDIs',()=>{
 const routes=model.migration_year0.routes;
 const expected={'Astrostelia->Scenrepolia':10,'Astrostelia->Calespia':10,'Astrostelia->Ethaptoria':15,'Lenternow->Scenrepolia':10,'Lenternow->Krisberia':10,'Lenternow->Ethaptoria':10,'Lenternow->Calespia':10};
 assert.equal(routes.length,7);
 eq(sum(routes,x=>x.population_billion),75);
 eq(model.migration_year0.total_arrivals_billion,75);
 eq(model.migration_year0.total_departures_billion,75);
 for(const r of routes){
  const src=model.countries_14.find(x=>x.name===r.origin);
  assert.ok(src);
  eq(r.population_billion,expected[r.origin+'->'+r.destination]);
  for(const [category,pct]of Object.entries(src.ancestry_primary_pct))
   eq(r.ancestry_primary_headcount_billion[category],r.population_billion*pct/100);
 }
 assert.equal(model.countries_14.find(c=>c.name==='Astrostelia').population_billion,185);
 assert.equal(model.countries_14.find(c=>c.name==='Lenternow').population_billion,174);
 eq(model.countries_14.find(c=>c.name==='Astrostelia').sdi,.957);
 eq(model.countries_14.find(c=>c.name==='Lenternow').sdi,.935);
});
test('Destination populations update while country GDP and global six-category projection remain constant',()=>{
 const pop={Scenrepolia:88,Calespia:91,Ethaptoria:84,Krisberia:58,Mapether:74};
 for(const c of model.countries_5){eq(c.population_billion,pop[c.name]);eq(c.gdp_per_capita_usd_V6,c.gdp_usd_annual_V6/(c.population_billion*1e9));}
 const source=model.census.pre_migration_reference.original_14_ancestry_headcount_billion;
 for(const k of Object.keys(source)){
  const now=sum(model.countries_14,c=>c.population_billion*c.ancestry_primary_pct[k]/100);
  eq(now+model.migration_year0.ancestry_six_category_moved_billion[k],source[k]);
  eq(P.ancestry_primary_pct_representative_14_country_weighted[k],source[k]*100/3288);
 }
 eq(model.census.new_five_population_billion,395);
 eq(model.census.original_23_population_billion,1199);
});

test('Creator-ratified sovereign foundations satisfy exact BAC dates and relative order',()=>{
 const history=model.historical_foundations;
 const index=new Map(history.ordered_core.map(x=>[x.name,x]));
 const required={Mapether:2164,Lenternow:2072,Hargenbor:1984,Moreg:1713,Pasgerflit:1545,Scenrepolia:1234,Taramistry:1210};
 for(const [name,bac]of Object.entries(required)){assert.equal(index.get(name)?.bac,bac,name);assert.ok(index.get(name)?.status==='creator_ratified'||index.get(name)?.status==='existing');}
 const order=Object.keys(required);
 for(let i=0;i<order.length-1;i++)assert.ok(index.get(order[i]).bac>index.get(order[i+1]).bac,'Incorrect BAC age order '+order[i]);
 assert.equal(index.get('Krisberia').status,'conditional');
 assert.equal(history.related_events.cistheta_emissaries_bac,1256);
 assert.deepEqual(history.related_events.scenrepolia_taramistry_patent_dispute_bac,[1153,1138]);
 assert.deepEqual(history.related_events.calespia_taramistry_botanical_dispute_bac,[1149,1137]);
});

test('Active Stelpadland 52% public debt and finished-furniture industry supersede V3 42% scenario',()=>{
 const country=model.countries_14.find(x=>x.name==='Stelpadland');
 const legacy=archived.countries.find(x=>x.name==='Stelpadland');
 assert.ok(country&&legacy);
 eq(country.government_debt_to_gdp,.52);
 assert.equal(country.debt_ratio_status,'creator_ratified_2026-10-31_52pct_GDP');
 eq(legacy.economy.public_debt_to_gdp.value,.42);
 assert.match(country.industry_canon.primary_industry,/finished furniture/i);
 assert.equal(country.industry_canon.quantitative_furniture_output_share_pct,null);
 assert.match(country.specialization,/finished furniture/i);
 const activeText=fs.readFileSync(path.join(root,'content/factions/stelpadland.md'),'utf8');
 const report=fs.readFileSync(path.join(root,'content/statistics/asthortera-nccm-v6-active-cross-domain.md'),'utf8');
 assert.match(activeText,/\*\*52% of GDP\*\*/);
 assert.match(activeText,/42\.0%.*superseded/i);
 assert.match(report,/Stelpadland \| 2\.8757 \| 20\.395 \| 0\.240 \| \*\*52\.00% \(canon\)\*\*/);
 assert.doesNotMatch(report,/Stelpadland \| 2\.8757 \| 20\.395 \| 0\.240 \| 42\.00%/);
});
