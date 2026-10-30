#!/usr/bin/env node
// Review-only numeric cross-reference mining across every Markdown source.
// This produces candidate sightings for manual reconciliation, not automatic canon edits.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const ledger=JSON.parse(fs.readFileSync(path.join(root,"data/asthortera/national-cross-domain-audit-2026-10-30.json"),"utf8"));
const national={country_rows:ledger.countries.map(c=>({name:c.name,path:c.source,population_billion:c.population_billion,sdi:c.sdi}))};
function crawl(dir) {
  const full=path.join(root,dir);
  return fs.readdirSync(full,{withFileTypes:true}).flatMap(d=>{
    const rel=path.posix.join(dir,d.name);
    return d.isDirectory()?crawl(rel):(d.isFile()&&d.name.endsWith(".md")?[rel]:[]);
  });
}
const paths=crawl("content"),candidates=[];
for(const file of paths) {
  const lines=fs.readFileSync(path.join(root,file),"utf8").split("\n");
  const own=national.country_rows.find(c=>c.path===file);
  for(let i=0;i<lines.length;i++) {
    const ln=lines[i],low=ln.toLowerCase();
    if(!/\b(?:population|sentients|inhabitants|sdi|sentient development)\b/i.test(ln)) continue;
    let names=national.country_rows.filter(c=>low.includes(c.name.toLowerCase()));
    if(names.length>1)continue;
    if(/cross-domain-qa|audit-2026-10-30/i.test(file))continue;
    if(/\bCycle\s*\d+\b/i.test(ln))continue;
    if(names.length===0&&own&&i<320)names=[own];
    if(names.length!==1)continue;
    const c=names[0];
    if(/\b(?:BAC|AC|historic|historical|future|projection|scenario|proposed|hypothetical|earlier|old|before the war)\b/i.test(ln))continue;
    const pop=[...ln.matchAll(/(\d+(?:\.\d+)?)\s*(billion|trillion)\s*(?:sentients|people|inhabitants|residents|citizens)?\b/gi)];
    const sdi=/\b(?:≥|threshold|eligib|minimum|required|only citizens)\b/i.test(ln)?[]:[...ln.matchAll(/\b(?:sdi|sentient development index)\b[^\n]{0,65}?(0\.\d{3})\b/gi)];
    if(/population|inhabitants|sentients/i.test(ln) && !(file.includes("nccm-remodeling") && pop.length>1)){
      for(const m of pop){
        const countryIndex=ln.toLowerCase().indexOf(c.name.toLowerCase());
        if(countryIndex>=0 && m.index<countryIndex)continue;
        const value=Number(m[1])*(m[2].toLowerCase()==="trillion"?1000:1);
        if(Math.abs(value-c.population_billion)>1e-4)candidates.push({metric:"population_billion",country:c.name,expected:c.population_billion,sighted:value,file,line:i+1,excerpt:ln.trim().slice(0,260)});
      }
    }
    for(const m of sdi){
      const value=Number(m[1]);
      if(Math.abs(value-c.sdi)>1e-9)candidates.push({metric:"SDI",country:c.name,expected:c.sdi,sighted:value,file,line:i+1,excerpt:ln.trim().slice(0,260)});
    }
  }
}
const grouped={};
for(const c of candidates){
  const k=c.metric+":"+c.country+":"+c.sighted;
  if(!grouped[k])grouped[k]={count:0,examples:[]};
  grouped[k].count++;
  if(grouped[k].examples.length<3)grouped[k].examples.push({path:c.file,line:c.line,excerpt:c.excerpt});
}
const result={status:"REVIEW_CANDIDATES_NOT_AUTOMATIC_CONTRADICTIONS",scannedMarkdownFiles:paths.length,candidateSightings:candidates.length,candidates:Object.entries(grouped).map(([key,v])=>({key,...v})).sort((a,b)=>b.count-a.count)};
process.stdout.write(JSON.stringify(result,null,2)+"\n");
