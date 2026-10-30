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
 assert.equal(model.schema_version,'NCCM-V6.1-active-comparative-ledger');
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
 eq(sum(Object.values(weighted)),3288);
 eq(weighted.depeisit,1562.182);
 eq(weighted.cistheta,652.985);
 eq(weighted.cosmeilian,533);
 eq(weighted.native,373.263);
 eq(weighted.phantomkind,73.04);
 eq(weighted.other,93.53);
 for(const k of keys){
   eq(100*weighted[k]/3288,P.ancestry_primary_pct_representative_14_country_weighted[k]);
   eq(weighted[k]*4412/3288,P.ancestry_primary_headcount_billion_representative[k]);
 }
 eq(sum(Object.values(P.ancestry_primary_pct_representative_14_country_weighted)),100);
 assert.match(model.provenance.legacy_ratios_58_22_10_7_3,/superseded/);
});
test('No sovereigns or residents fabricated under creator-approved 14+5+18 partition',()=>{
 assert.equal(model.countries_5.length,5);
 assert.equal(model.aggregate_remaining_18.state_count,18);
 eq(sum(model.countries_14,c=>c.population_billion),3288);
 eq(sum(model.countries_5,c=>c.population_billion),320);
 eq(model.aggregate_remaining_18.population_billion,804);
 eq(3288+320+804,4412);
 assert.equal(model.aggregate_remaining_18.individual_country_data,'explicitly deferred by creator');
 assert.equal(model.aggregate_remaining_18.ancestry_primary_pct_by_country,null);
 assert.deepEqual(new Set(model.countries_5.map(x=>x.name)),new Set(['Scenrepolia','Krisberia','Mapether','Ethaptoria','Calespia']));
});
test('All 19 national SDIs and residual SDI reconcile the immutable planetary SDI',()=>{
 for(const c of [...model.countries_14,...model.countries_5]){
   eq(.6*c.sdi_individual_component+.4*c.sdi_institution_component,c.sdi);
 }
 eq((sum(model.countries_14,c=>c.sdi*c.population_billion)+sum(model.countries_5,c=>c.sdi*c.population_billion)+804*model.aggregate_remaining_18.sdi_population_weighted_required)/4412,.947);
 eq(model.aggregate_remaining_18.sdi_population_weighted_required,.8989552238805961);
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
