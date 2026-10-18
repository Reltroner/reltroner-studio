'use client';
import { useState } from 'react';

const goals = [
  { name: 'Just for the joy of it', summary: 'Exploring ideas, drawing worlds, writing for yourself, enjoying the process.', label: 'Hobby', title: 'Follow the question that excites you.', description: 'Choose one detail you can’t stop thinking about. You don’t need a five-year plan or a perfectly consistent encyclopedia to begin.', task: 'Give that detail one consequence, then see what new question it creates.' },
  { name: 'Building a bigger project', summary: 'Preparing a story, comic, game, or world with coherent long-term structure.', label: 'Production', title: 'Give your story a memory.', description: 'When decisions have consequences, later chapters can build on them. Try recording what changes instead of adding disconnected details.', task: 'Pick one choice in your story and record its consequences for a person, institution, and future scene.' },
  { name: 'Learning through creation', summary: 'Exploring a school or university project with research and original reasoning.', label: 'Learning', title: 'Create something that makes you curious to research.', description: 'Use a fictional question to identify what you need to learn. Keep evidence and speculation separate, and make the final work your own.', task: 'Identify one assumption to investigate, list two research questions, then revise the fictional system using what you find.' },
];
export default function CreatorGoals() {
  const [goal,setGoal]=useState(0);
  const current=goals[goal];
  return <><div className="studio-grid-three" aria-label="Your creative goal">{goals.map((item,index)=><button key={item.label} type="button" aria-pressed={goal===index} className="studio-card studio-choice" onClick={()=>setGoal(index)}><strong>{item.name}</strong><small>{item.summary}</small></button>)}</div><div className="studio-card mt-5" aria-live="polite"><p className="studio-eyebrow">Your starting point / {current.label}</p><h3>{current.title}</h3><p>{current.description}</p><p><strong>Try this:</strong> {current.task}</p></div></>;
}
