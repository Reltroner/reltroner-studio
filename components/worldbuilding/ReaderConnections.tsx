'use client';
import { useState } from 'react';

const civilizations = [
  { name:'Astrostelia', role:'Research & mission architecture', description:'Frames the scientific question and the mission design.', question:'What happens when a brilliant research plan needs other civilizations to make it real?' },
  { name:'Moreg', role:'Industrial engineering', description:'Provides industrial engineering and manufacturing capabilities.', question:'What constraints arise when a concept becomes equipment that people must build and operate?' },
  { name:'Depcutland', role:'Archives & knowledge continuity', description:'Preserves documentation, decisions and institutional memory.', question:'If research outlives a generation, who protects the reasoning that made it possible?' },
  { name:'Kalgered', role:'Law & institutional cooperation', description:'Clarifies responsibilities, agreements and dispute-resolution mechanisms.', question:'Who becomes accountable when a shared project creates unexpected consequences?' },
];
export default function ReaderConnections() {
  const [active,setActive]=useState(0);
  const current=civilizations[active];
  return <div className="studio-grid-two studio-reader-pair">
    <div className="studio-panel studio-orbit">
      <div className="studio-orbit-stage">
        <div className="studio-orbit-hub"><span aria-hidden="true">◇</span><strong>Orbital Observatory</strong><span>Shared fictional project</span></div>
        <div className="studio-orbit-controls" role="group" aria-label="Explore civilization contributions">
          {civilizations.map((item,index)=><button type="button" key={item.name} aria-pressed={active===index} onClick={()=>setActive(index)} className="studio-card studio-choice"><strong>{item.name}</strong></button>)}
        </div>
      </div>
      <p className="studio-small mt-6">Four roles · One interaction · Hypothetical, not a canonical mission</p>
    </div>
    <div className="studio-panel studio-result" aria-live="polite">
      <div><p className="studio-eyebrow">{current.role}</p><h3>{current.name}</h3><p>{current.description}</p><blockquote>{current.question}</blockquote></div>
      <p className="studio-small">The story possibilities emerge because they have different responsibilities and must coordinate.</p>
    </div>
  </div>;
}
