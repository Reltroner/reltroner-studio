#!/usr/bin/env node
/** NCCM V6 strict QA. V3/V4 remain historical snapshots, not the active six-way canon.
 * 18 national datasets are intentionally deferred; their bounded aggregate MUST reconcile.
 * Fail any broken numeric/semantic invariant; report incomplete nonfalsified data as warnings.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const get=p=>JSON.parse(read(p));
const eq=(a,b,t=1e-9)=>Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b));
const sum=(xs,f=x=>x)=>xs.reduce((s,x)=>s+f(x),0);
const v=get('data/asthortera/nccm-v6-active-cross-domain.json');
const old=get('data/asthortera/nccm-v3-14-country-comparative-model.json');
const historical=get('data/asthortera/national-cross-domain-audit-2026-10-30.json');
const base=get('data/asthortera/nccm-baseline-v2.json');
const P=v.planet,C=v.census;
const issues=[],info=[];
const error=(id,detail)=>issues.push({severity:'P0',id,detail});
const warning=(id,detail)=>issues.push({severity:'P1/P2',id,detail});
const inspect=(test,id,detail)=>{if(!test)error(id,detail)};
function walk(rel){return fs.readdirSync(path.join(root,rel),{withFileTypes:true}).flatMap(e=>{const x=path.posix.join(rel,e.name);return e.isDirectory()?walk(x):e.isFile()&&x.endsWith('.md')?[x]:[]})}
const docs=walk('content');
const files=new Map(docs.map(x=>[x,read(x)]));
info.push({metric:'markdown_documents_scanned',value:docs.length});
info.push({metric:'active_model',value:v.schema_version});
inspect(docs.length>=433,'MARKDOWN_TREE_LOST','Fewer than 433 source documents');
inspect(v.schema_version.startsWith('NCCM-V6'),'V6_ACTIVE_MODEL_REQUIRED','Missing active six-way statistical model');
inspect(eq(P.population_billion,4412)&&P.sovereign_states===37&&eq(P.sdi,.947),'PLANET_ANCHOR','4,412B, 37 states and SDI .947 must remain');
inspect(eq(P.year0.tfr,1.63)&&eq(P.year0.median_age_years,252)&&eq(P.year0.urbanization_rate,.895)&&eq(P.year0.annual_inflation,.0033),'YEAR0_ANCHORS','Year 0 vital and economic rates');
inspect(eq(P.historical_1010_BAC.median_age_years,30)&&eq(P.historical_1010_BAC.urbanization_rate,.68)&&eq(P.historical_1010_BAC.annual_inflation,.043),'BAC1010_ANCHORS','Historical demographic and inflation targets');
inspect(v.provenance.gdp_uplift_factor===10&&v.provenance.unchanged_national_gdp_share,'INTEGRATED_UPLIFT_B','The creator selected Model B with unchanged GDP percentage shares');
inspect(v.provenance.legacy_ratios_58_22_10_7_3.startsWith('superseded'),'LEGACY_ANCESTRY_RETIRED','Five-way planet ancestry must not be active');
inspect(v.countries_14.length===14&&v.countries_5.length===5&&v.aggregate_remaining_18.state_count===18,'NATIONAL_COUNTS','14+5+18 must equal 37');
inspect(eq(sum(v.countries_14,x=>x.population_billion),3288)&&eq(sum(v.countries_5,x=>x.population_billion),320)&&eq(v.aggregate_remaining_18.population_billion,804),'POPULATION_PARTITION','3,288B + 320B + 804B');
inspect(eq(sum([...v.countries_14,...v.countries_5,v.aggregate_remaining_18],x=>x.population_billion),P.population_billion),'PLANET_POPULATION_SUM','Every person counted once');
const oldByName=new Map(old.countries.map(x=>[x.name,x]));
const ancestryKeys=['depeisit','cistheta','cosmeilian','native','phantomkind','other'];
const ancestry=Object.fromEntries(ancestryKeys.map(k=>[k,0]));
const names=new Set();
for(const c of v.countries_14){
 inspect(!names.has(c.name),'DUPLICATED_NATIONAL_ID',c.name);names.add(c.name);
 const historic=oldByName.get(c.name);
 inspect(Boolean(historic),'SOURCE_NATION_MISSING',c.name);
 inspect(files.has(c.source),'PROFILE_FILE_MISSING',c.source);
 if(!historic)continue;
 inspect(eq(c.population_billion,historic.census.population_billion)&&eq(c.sdi,historic.census.sdi_national)&&eq(c.land_area_million_km2,historic.census.land_area_million_km2),'NATIONAL_CENSUS_ANCHORS',c.name);
 inspect(eq(c.gdp_planet_share,historic.economy.planetary_gdp_share.value),'GDP_SHARE_UNCHANGED',c.name);
 inspect(eq(c.gdp_usd_annual_V6,10*historic.economy.core_gdp_nominal_usd_reference.value),'GDP_UPLIFT_10X',c.name);
 inspect(eq(c.sdi_individual_component*.6+c.sdi_institution_component*.4,c.sdi),'NATIONAL_SDI_COMPONENTS',c.name);
 inspect(eq(c.gdp_usd_annual_V6/(c.population_billion*1e9),c.gdp_per_capita_usd_V6)&&eq(c.gni_per_capita_usd_proxy_V6,c.gdp_per_capita_usd_V6),'GNI_GDP_BRIDGE',c.name);
 inspect(c.fx&&c.fx.usd_per_local_unit>=22&&c.fx.usd_per_local_unit<=114.26,'FX_RANGE',c.name);
 const a=c.ancestry_primary_pct;
 inspect(ancestryKeys.every(k=>Number.isFinite(a[k])&&a[k]>=0&&a[k]<=100)&&eq(sum(ancestryKeys,k=>a[k]),100),'NATIONAL_SIX_WAY_TOTAL',c.name);
 for(const k of ancestryKeys)ancestry[k]+=c.population_billion*(a[k]||0)/100;
 if(c.name==='Reltronland')inspect(eq(c.median_age_years,254),'REL_MEDIAN_AGE','Year 0 Reltronland median 254');
}
const known14Population=sum(v.countries_14,x=>x.population_billion);
inspect(eq(sum(Object.values(ancestry)),known14Population),'SIX_WAY_POPULATION_CONSERVATION','Six primary classes count unique people');
for(const k of ancestryKeys){
 inspect(eq(ancestry[k],C.original_14_ancestry_headcount_billion[k]),'ANCESTRY_14_LEDGER',k);
 inspect(eq(100*ancestry[k]/known14Population,P.ancestry_primary_pct_representative_14_country_weighted[k]),'ANCESTRY_PLANET_REPRESENTATIVE',k);
 inspect(eq(P.population_billion*ancestry[k]/known14Population,P.ancestry_primary_headcount_billion_representative[k]),'ANCESTRY_PLANET_HEADCOUNT',k);
}
inspect(eq(ancestry.phantomkind,73.04)&&eq(ancestry.cosmeilian,533)&&eq(ancestry.native,373.263),'SIX_WAY_CONFIRMED_TOTALS','14-country V6 Phantomkind/Cosmeilian/Native');
inspect(eq(sum(Object.values(P.ancestry_primary_pct_representative_14_country_weighted)),100),'PLANET_ANCESTRY_100','Planetary proxy must remain six exclusive classes');
const required=new Set(['Scenrepolia','Krisberia','Mapether','Ethaptoria','Calespia']);
for(const c of v.countries_5){
 inspect(required.has(c.name),'NEW_COUNTRY_ROSTER',c.name);
 inspect(!names.has(c.name),'DUPLICATED_NATIONAL_ID',c.name);names.add(c.name);
 inspect(files.has(c.source),'PROFILE_FILE_MISSING',c.source);
 inspect(eq(c.sdi_individual_component*.6+c.sdi_institution_component*.4,c.sdi),'NATIONAL_SDI_COMPONENTS',c.name);
 inspect(Array.isArray(c.sectors_value_added_pct)&&eq(sum(c.sectors_value_added_pct,x=>x.share),100),'PRODUCTION_SECTORS_100',c.name);
 inspect(eq(c.gdp_planet_share,c.gdp_usd_annual_V6/P.year0.gdp_usd_annual_V6),'GDP_SHARE_MATCH',c.name);
 inspect(eq(c.gdp_usd_annual_V6/(c.population_billion*1e9),c.gdp_per_capita_usd_V6),'GDP_PER_CAPITA_MATCH',c.name);
 inspect(eq(c.gni_per_capita_usd_proxy_V6,c.gdp_per_capita_usd_V6),'GNI_ZERO_BRIDGE',c.name);
 inspect(c.fx.usd_per_local_unit>=22&&c.fx.usd_per_local_unit<=114.26,'FX_RANGE',c.name);
 inspect(c.country_specific_ancestry_status==='not_ratifed','DO_NOT_FABRICATE_5_NATION_ANCESTRY',c.name);
}
const sdi=(sum(v.countries_14,x=>x.sdi*x.population_billion)+sum(v.countries_5,x=>x.sdi*x.population_billion)+v.aggregate_remaining_18.sdi_population_weighted_required*804)/4412;
inspect(eq(sdi,.947),'PLANET_SDI_RECONCILIATION',String(sdi));
inspect(v.aggregate_remaining_18.individual_country_data==='explicitly deferred by creator'&&v.aggregate_remaining_18.ancestry_primary_pct_by_country===null,'DEFERRED_18_INTEGRITY','No invented national populations/SDI/ancestry');
const GDP=sum(v.countries_14,x=>x.gdp_usd_annual_V6)+sum(v.countries_5,x=>x.gdp_usd_annual_V6)+v.aggregate_remaining_18.gdp_usd_annual_V6;
inspect(eq(GDP,P.year0.gdp_usd_annual_V6)&&eq(P.year0.gdp_usd_annual_V6,10*old.calibration.planet_gdp_usd),'GDP_INTEGRATED_TOTAL','GDP must match planet and exactly 10x old macro base');
inspect(eq(P.year0.gni_usd_annual_V6_zero_bridge,P.year0.gdp_usd_annual_V6),'GNI_10X_BRIDGE','GNI=GDP only with zero net primary income assumption');
const share=sum(v.countries_14,x=>x.gdp_planet_share)+sum(v.countries_5,x=>x.gdp_planet_share)+v.aggregate_remaining_18.gdp_planet_share;
const shareNew=sum(v.countries_5,x=>x.gdp_planet_share)+v.aggregate_remaining_18.gdp_planet_share;
inspect(eq(share,1)&&eq(shareNew,old.calibration.other_23_aggregate_gdp_share),'GDP_SHARES_100','Whole nation + remaining aggregate shares must conserve old percentages');
inspect(eq(P.year0.gdp_per_capita_usd_V6,P.year0.gdp_usd_annual_V6/(P.population_billion*1e9)),'PLANET_GDP_PER_CAPITA','Divide by whole planet residents');
const allFX=[...v.countries_14,...v.countries_5].map(x=>({name:x.name,...x.fx}));
inspect(eq(Math.max(...allFX.map(x=>x.usd_per_local_unit)),114.26)&&allFX.find(x=>x.usd_per_local_unit===114.26)?.name==='Reltronland'&&eq(Math.min(...allFX.map(x=>x.usd_per_local_unit)),22),'FX_BOUNDARY_CANON','REL max, USD22 min');
inspect(eq(historical.planet.population_billion,4412)&&eq(base.year0_planet_population,4412e9),'HISTORICAL_DENOMINATOR','Historical snapshot population must not drift');
inspect(files.get('content/factions/lenternow.md')?.includes('850,467'),'LENTERNOW_SOURCE_REGRESSION','Legacy per capita GDP');
inspect(files.get('content/places/paia-aeropolis-hub.md')?.includes('Depcutland (0.981)'),'PAIA_SDI_REGRESSION','Depcutland SDI');
for(const x of ['**307 years**','**249 years**','**215 years**','0.852'])inspect(files.get('content/places/the-galaxy.md')?.includes(x),'GALACTIC_DATA_REGRESSION',x);
for(const [file,txt] of files)if(!txt.trim())warning('EMPTY_CONTENT_STUB',file);
warning('DEFERRED_18_CENSUS','18 nations retain creator-approved unsplit 804B resident aggregate; not independent observations');
warning('HISTORICAL_SOURCE_CROSSWALK','V3/V4 historical content still contains superseded ancestries and nominal GDP before integrated uplift');
warning('KALGERED_SPENDING_99','Pre-V6 spending strata sum to 99%, require separate creator decision');
warning('NCCM_FX_CODE_CROSSWALK','Mapether MPT/MWV and Krisberia KRB/KRF historical currency identifiers still open');
warning('SECTOR_CAPITAL_LABOR_MODEL','Sector shares are value-added targets, not independently calibrated input-output matrices');
info.push({metric:'original_nations',value:14},{metric:'new_eastern_nations',value:5},{metric:'deferred_nations',value:18},{metric:'population_billion',value:4412},{metric:'phantomkind_primary_14_billion',value:ancestry.phantomkind},{metric:'planet_sdi',value:sdi},{metric:'planet_gdp_usd_V6',value:GDP},{metric:'numerical_accounting_reconciles',value:eq(GDP,P.year0.gdp_usd_annual_V6)});
const output={status:issues.some(x=>x.severity==='P0')?'FAIL_UNRESOLVED_P0':'PASS_P0',scanned_markdown_count:docs.length,info,issues};
if(process.argv.includes('--json'))console.log(JSON.stringify(output,null,2));
else {
 console.log('Asthortera cross-domain audit: '+output.status);
 for(const x of info)console.log(' - '+x.metric+': '+x.value);
 for(const x of issues)console.log(' ['+x.severity+'] '+x.id+': '+x.detail);
}
if(output.status!=='PASS_P0')process.exitCode=1;
