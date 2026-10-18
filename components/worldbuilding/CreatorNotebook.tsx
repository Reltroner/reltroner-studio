'use client';
import { useState } from 'react';
import CreativeLoop, { creativeStages, creativeScenarios } from './CreativeLoop';
import ConceptArt from './ConceptArt';

const notePlaceholders = [
  'A place, character, system, or idea I would love to explore...',
  'What limit, tension, or trade-off makes it meaningful?',
  'Whose choices or values interact?',
  'What changes because they interact?',
  'What remains different afterward?',
  'What question is now possible because of that change?',
] as const;

export default function CreatorNotebook() {
  const [scenario,setScenario]=useState(0);
  const [notes,setNotes]=useState<string[]>(Array(6).fill(''));
  const [status,setStatus]=useState('Nothing is transmitted or automatically saved.');
  function markdown() { return '# My Creative Compound Loop\n\n'+creativeStages.map((name,index)=>`## 0${index+1} — ${name}\n\n${notes[index].trim()||'_(not filled)_'}`).join('\n\n')+'\n\n---\nPrivate local worksheet · Reltroner Studio\n'; }
  async function copy() {
    const text = markdown();
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      try {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.append(temp);
        temp.select();
        copied = document.execCommand('copy');
        temp.remove();
      } catch {
        copied = false;
      }
    }
    setStatus(copied ? 'Copied Markdown to clipboard. Nothing was submitted.' : 'Clipboard unavailable here. Use “Save .md file” instead.');
  }
  function download() {
    const url=URL.createObjectURL(new Blob([markdown()],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;
    link.download='my-creative-compound-loop.md';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setStatus('Download requested in your browser. Nothing was submitted.');
  }
  return <>
    <section id="creator-loop" className="studio-section studio-soft"><div className="studio-wrap"><div className="studio-intro"><p className="studio-eyebrow">Interactive / a six-step creative experiment</p><h2>The Creative Compound Machine</h2><p>Follow how one seed becomes connected decisions. The important part isn’t generating six random ideas; it’s noticing how each decision changes what can happen next.</p></div><CreativeLoop onScenarioChange={setScenario} /></div></section>
    <section id="notebook" className="studio-section"><div className="studio-wrap"><div className="studio-intro"><p className="studio-eyebrow">Your turn / private creative notebook</p><h2>Try one loop with your own idea.</h2><p>Use this mini worksheet to practice. It works entirely in your browser: no account, no AI model, no server submission. Copy the result or save it as Markdown to keep it for yourself.</p></div><div className="studio-split studio-reverse"><div className="studio-card studio-notebook"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="studio-eyebrow">Six sentences / your experiment</p><h3>Your creative notes</h3></div><span className="studio-badge">Local only</span></div><p>There’s no grading or perfect answer. A useful loop is one where your final question genuinely depends on something that changed.</p><div className="studio-grid-two">{creativeStages.map((name,index)=><div key={name}><label htmlFor={`creative-note-${index}`}>0{index+1} — {name}</label><textarea id={`creative-note-${index}`} className="rs-form-input" rows={3} maxLength={4000} placeholder={notePlaceholders[index]} value={notes[index]} onChange={event=>setNotes(current=>current.map((note,i)=>i===index?event.target.value:note))} /></div>)}</div><div className="studio-actions"><button type="button" className="studio-button" onClick={copy}>Copy as Markdown</button><button type="button" className="studio-button secondary" onClick={download}>Save .md file</button><button type="button" className="studio-text-link" onClick={()=>{setNotes([...creativeScenarios[scenario].sentences]);setStatus('Loaded the selected fictional demo. You can edit any sentence; no data leaves the page.');}}>Load demo example</button><button type="button" className="studio-text-link" onClick={()=>{setNotes(Array(6).fill(''));setStatus('Worksheet cleared locally. No data was sent or stored.');}}>Clear</button></div><p role="status" aria-live="polite" className="studio-status">{status}</p></div><aside><ConceptArt kind="network" label="Concept diagram · From curiosity to connection" /><h3 className="mt-6">From curiosity to connection</h3><p className="mt-4">Your ideas don’t need to become a complete civilization overnight. The useful question is: what did this decision make possible?</p><blockquote className="mt-6 border-l-2 border-blue-400 pl-5">“What you made yesterday can become the reason you create again tomorrow.”</blockquote><p className="studio-small mt-3">Proposed method statement, not a quotation from an external author.</p></aside></div></div></section>
  </>;
}
