#!/usr/bin/env node
/** Sync all 19 national country pages with the ratified NCCM V6.5 ledger.
 * Default --check is read-only and exits nonzero for drift. --write deterministically updates.
 * This does not populate any unknown national ancestry or 18-country individual census.
 */
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {patchNational} from './asthortera-canon-profile-renderer.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const model=JSON.parse(readFileSync(path.join(root,'data/asthortera/nccm-v6-active-cross-domain.json'),'utf8'));
if(model.canon_ratification?.status!=='C')throw Error('NCCM canon ratification C required');
const countries=[...model.countries_14,...model.countries_5];
if(countries.length!==19)throw Error('Expected exactly 19 national profiles');
const writing=process.argv.includes('--write'),different=[];
for(const c of countries){
  const full=path.join(root,c.source),old=readFileSync(full,'utf8');
  const updated=patchNational(old,c,model);
  if(updated!==old){
    different.push(c.source);
    if(writing)writeFileSync(full,updated,'utf8');
  }
}
if(different.length){
  console.log((writing?'UPDATED':'CANON_PROFILE_DRIFT')+': '+different.length+' files\n'+different.join('\n'));
  if(!writing)process.exitCode=1;
}else console.log('PASS_CANON_PROFILE_SYNC: 19/19 deterministic national pages match the ratified ledger');
