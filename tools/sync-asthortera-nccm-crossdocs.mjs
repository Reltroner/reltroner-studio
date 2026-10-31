// NCCM V6.5 C cross-document canonical concordance. Generated exclusively from data/asthortera ledger.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
function verify(m){
 const countries=[...m.countries_14,...m.countries_5],r=m.aggregate_remaining_18,y=m.planet.year0,planet=m.planet;
 if(m.canon_ratification.status!=="C"||countries.length!==19||m.census.profiled_original_14_population_billion+m.census.new_five_population_billion+r.population_billion!==planet.population_billion||m.migration_year0.routes.reduce((a,x)=>a+x.population_billion,0)!==75)throw Error("Population/canon not reconciled");
 const T=(countries.reduce((a,x)=>a+x.population_billion*x.tfr_candidate,0)+r.population_billion*r.tfr_population_weighted_proxy_required)/planet.population_billion;
 const G=(countries.reduce((a,x)=>a+x.gdp_usd_annual_V6*x.real_gdp_growth,0)+r.gdp_usd_annual_V6*r.real_gdp_growth_gdp_weighted_required)/y.gdp_usd_annual_V6;
 if(Math.abs(T-y.tfr)>1e-9||Math.abs(G-y.real_gdp_growth)>1e-9)throw Error("TFR/GDP aggregation drift");
}
function render(m,mode){
 const p=m.planet,y=p.year0,c=m.census,r=m.aggregate_remaining_18,n=[...m.countries_14,...m.countries_5],f=(x,k=2)=>Number(x).toFixed(k);
 const ancestry=[["Depeisit","depeisit"],["Cistheta","cistheta"],["Cosmeilian","cosmeilian"],["Native Asthorteran","native"],["Phantomkind / Spiritual Hybrid","phantomkind"],["Other","other"]];
 let s=[
 "<!-- BEGIN NCCM_V65_PLANETARY_CROSSDOC -->",
 "### NCCM V6.5 Canon C — Deterministic Cross-Domain Concordance",
 "",
 `**Authority:** [NCCM V6.5 JSON ledger](../../data/asthortera/nccm-v6-active-cross-domain.json). Current Year 0 values are **CANON (C)**, ratified **${m.canon_ratification.ratified_date}**. All numerical aggregates below derive from the ledger, not this document's legacy narrative.`,
 "",
 "| Model invariant | Current canon C |","|---|---:|",
 `| Countries / unique residents | **${p.sovereign_states} / ${p.population_billion.toLocaleString("en-US")} billion** |`,
 `| Original 14 + additional 5 + residual 18 | **${c.profiled_original_14_population_billion.toLocaleString("en-US")}B + ${c.new_five_population_billion}B + ${r.population_billion}B** |`,
 `| Internal Year 0 migration / planetary net headcount | **${m.migration_year0.total_departures_billion}B / zero** |`,
 `| Planet SDI | **${f(p.sdi,3)}** |`,
 `| Planet TFR, adopted population-weighted proxy | **${f(y.tfr)}** |`,
 `| Planet real GDP growth, GDP-share-weighted | **${f(y.real_gdp_growth*100)}%** |`,
 `| Year 0 GDP, nominal Model B, USD | **${y.gdp_usd_annual_V6.toExponential(12)}** |`,
 `| GNI, zero-foreign-primary-income bridge, USD | **${y.gni_usd_annual_V6_zero_bridge.toExponential(12)}** |`,
 `| 14 / 5 / residual 18 SDI, population weighted | **${f(c.original_14_population_weighted_sdi,6)} / ${f(c.new_five_population_weighted_sdi,6)} / ${f(r.sdi_population_weighted_required,6)}** |`,
 `| Residual 18 aggregate TFR proxy / real growth | **${f(r.tfr_population_weighted_proxy_required,6)} / ${f(r.real_gdp_growth_gdp_weighted_required*100,6)}%** |`,
 "",
 "Six-class primary ancestry, representative planetary population benchmark:",
 "",
 "| Exclusive class | Share | Residents (billions) |","|---|---:|---:|",
 ...ancestry.map(([name,key])=>`| ${name} | ${f(p.ancestry_primary_pct_representative_14_country_weighted[key],6)}% | ${f(p.ancestry_primary_headcount_billion_representative[key],3)} |`),
 `| **Total** | **100%** | **${p.population_billion.toLocaleString("en-US")}** |`,
 "",
 `**Ancestry provenance:** Frozen from the original ${c.pre_migration_reference.planetary_proxy_ancestry_denominator_billion}B pre-transfer 14-country reference, not calculated from today's 3,213B donor-group population. Mixed lineage overlaps primary ancestry and must not be added twice.`,
 "",
 `**Seven ratified internal routes (total 75B):** ${m.migration_year0.routes.map(v=>`${v.origin} → ${v.destination} ${v.population_billion}B`).join("; ")}. This moves existing residents between countries, **not** 75B incoming interplanetary migrants. The ledger leaves transfer duration, consent/citizenship procedures, and external immigration headcounts open.`,
 "",
 `**Sovereign foundations (BAC):** ${m.historical_foundations.ordered_core.map(v=>`${v.name} ${v.bac}${v.name==="Krisberia"?" (unconditional)":""}`).join("; ")}. These record sovereign founding, not first settlement.`,
 "",
 "**Boundaries:** Model B 10× nominal GDP does not imply 10× inflation, personal spending or welfare. TFR 1.63 is a canon population-weighted proxy, not measured reproductive-cohort fertility. Real growth 4.00% depends on a common price base and future-deflator work. Five added countries' individual ancestry and the eighteen residual nations' national detail remain **unassigned**, even though their combined aggregate is canon C."
 ];
 if(mode==="full")s.push("","**Nineteen country-level canon C anchors**","","| Country | Residents B | SDI | TFR proxy | Year 0 real GDP growth | Nominal GDP (USD 10²¹) |","|---|---:|---:|---:|---:|---:|",...n.map(v=>`| ${v.name} | ${v.population_billion} | ${f(v.sdi,3)} | ${f(v.tfr_candidate)} | ${f(v.real_gdp_growth*100)}% | ${f(v.gdp_usd_annual_V6/1e21,4)} |`),`| **Residual 18 — one aggregate only** | **${r.population_billion}** | **${f(r.sdi_population_weighted_required,6)}** | **${f(r.tfr_population_weighted_proxy_required,6)}** | **${f(r.real_gdp_growth_gdp_weighted_required*100,6)}%** | **${f(r.gdp_usd_annual_V6/1e21,4)}** |`);
 s.push("<!-- END NCCM_V65_PLANETARY_CROSSDOC -->");
 return s.join("\n");
}
function patch(kind,s,m){
 verify(m);
 const begin="<!-- BEGIN NCCM_V65_PLANETARY_CROSSDOC -->",end="<!-- END NCCM_V65_PLANETARY_CROSSDOC -->",block=render(m,kind==="immigration"?"short":"full");
 if(s.includes(begin)){
  const a=s.indexOf(begin),b=s.indexOf(end,a);if(b<a)throw Error("Unclosed generated canon block");
  s=s.slice(0,a)+block+s.slice(b+end.length);
 }else{
  const anchor=kind==="immigration"?"### 🔹 Despite a Lower Kardashev Rating…":"## NCCM V6.5 — Year 0 canon statistics (C)";
  if(!s.includes(anchor))throw Error("Missing insertion anchor "+kind);
  s=s.replace(anchor,block+"\n\n"+anchor);
 }
 if(kind!=="immigration")return s.replace("**~1.70 at Year 0**","**1.63 at Year 0 (NCCM V6.5 canon C)**");
 const a=s.indexOf("### 🌍 Planet Asthortera"),b=s.indexOf("### 🏛️ Planet Depeisit",a);
 if(a<0||b<=a)throw Error("Missing Asthortera immigration subsection");
 const anc=[["Depeisit","depeisit"],["Cistheta","cistheta"],["Cosmeilian","cosmeilian"],["Native Asthorteran","native"],["Phantomkind / Spiritual Hybrid","phantomkind"],["Other","other"]].map(([label,key])=>`  - ${label}: **${m.planet.ancestry_primary_pct_representative_14_country_weighted[key].toFixed(6)}%**`).join("\n");
 const c=m.census,sub=[
 "### 🌍 Planet Asthortera","",
 `- **Current Year 0 sentient population:** **${m.planet.population_billion.toLocaleString("en-US")} billion** across **${m.planet.sovereign_states}** countries; SDI **${m.planet.sdi.toFixed(3)}**, TFR **${m.planet.year0.tfr.toFixed(2)}**, real GDP growth **${(m.planet.year0.real_gdp_growth*100).toFixed(2)}%**.`,
 `- **Year 0 country groups:** **${c.profiled_original_14_population_billion.toLocaleString("en-US")}B** original fourteen, **${c.new_five_population_billion}B** added five, **${c.remaining_deferred_population_billion}B** in the remaining eighteen combined.`,
 "- **Primary ancestry (six mutually exclusive classes in the canon representative planetary model):**",
 anc,
 `- **Ancestry method:** frozen ${c.pre_migration_reference.planetary_proxy_ancestry_denominator_billion}B pre-migration original-fourteen benchmark, not first-generation immigrant shares, physical appearance, or exclusive biological race. Cosmeilian mixed lineage may overlap primary ancestry.`,
 `- **Internal Year 0 transfer:** ${m.migration_year0.total_departures_billion}B moved from Astrostelia/Lenternow to four receiving nations over seven routes, with zero net change to planetary population. It is **not external interplanetary immigration**.`,
 "- **Unassigned:** five recipients' whole-population ancestry, the remaining eighteen individual country censuses, and a numerical count of external interplanetary migrants.",
 "- **Narrative significance:** A welcoming civilizational model may attract interplanetary migrants, but institutional ideals do not establish an empirical headcount or an automatic guarantee for every migrant.",
 "",""].join("\n");
 s=s.slice(0,a)+sub+s.slice(b);
 s=s.replace("This document provides a detailed overview of the sentient population structures across the three major inhabited planets within the Asthortera galaxy: **Asthortera**, **Depeisit**, and **Cosmeilia**.",
 "This is a **comparative narrative overview of four named worlds**: Asthortera, Depeisit, Cosmeilia and Cistheta. **Only Asthortera's Year 0 statistics** are ratified by the NCCM V6.5 ledger; the other worlds' quoted populations, ancestry and SDIs remain legacy narrative references, not measured comparatives established by this ledger.");
 s=s.replace("But it surpasses all of them in **SDI (Sentient Development Index)** with a score of **0.947**—the highest in the galaxy.",
 "**Asthortera's SDI is 0.947 (Canon C)**. Its comparative civilizational quality is a philosophical and narrative theme; this ledger does **not** establish an independently measured galaxy-wide SDI ranking for the other worlds.");
 s=s.replace(/^### 📊 Planetary Comparison[^\n]*$/m,"### 📊 Planetary Comparison — Asthortera Canon C / Other Worlds' Legacy Narrative Estimates");
 s=s.replace(/^## 🌌 Sentient Composition Across Planets[^\n]*$/m,"## 🌌 Sentient Composition Across Planets — Separate Data Authorities");
 s=s.replace("Beauty and universal consciousness**","Beauty and universal consciousness");
 return s;
}
export {verify,render,patch};
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),m=JSON.parse(fs.readFileSync(path.join(root,'data/asthortera/nccm-v6-active-cross-domain.json'),'utf8'));
 const paths=[['identity','content/statistics/asthortera_identity.md'],['comparison','content/statistics/asthortera-vs-earth.md'],['immigration','content/philosophies/why-immigrants-choose-asthortera.md']];
 let drift=0;const write=process.argv.includes('--write');
 for(const [kind,rel]of paths){const p=path.join(root,rel),a=fs.readFileSync(p,'utf8'),b=patch(kind,a,m);if(a!==b){drift++;if(write)fs.writeFileSync(p,b,'utf8');console.log((write?'Updated: ':'DRIFT: ')+rel);}}
 console.log('NCCM V6.5 crossdocs checked=3 drift='+drift);if(drift&&!write)process.exitCode=1;
}
