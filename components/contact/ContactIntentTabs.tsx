'use client';
import type { ContactIntent } from '@/lib/contact/types';

export const contactTopics = [
  { id:'worldbuilding', title:'Worldbuilding & ideas', description:'Creative questions, frameworks, feedback', intent:'creative' as ContactIntent, prompt:'What’s the creative question you’re exploring?', hint:'Have a character, place, or creative system you’re thinking about? Share one question and a little context.' },
  { id:'story', title:'Asthortera & stories', description:'Lore, reading, interpretation', intent:'creative' as ContactIntent, prompt:'What caught your curiosity in Asthortera?', hint:'Share the story, civilization, or worldbuilding question you’d like to explore. Avoid sharing private drafts.' },
  { id:'learning', title:'Learning & LMS', description:'Lessons, questions, suggestions', intent:'learning' as ContactIntent, prompt:'What are you trying to learn or understand?', hint:'Tell me which learning material or experience you mean, and what you’re wondering about.' },
  { id:'professional', title:'Collaboration & engineering', description:'Relevant work or technical inquiries', intent:'engineering' as ContactIntent, prompt:'What do you need, and what outcome are you hoping for?', hint:'Share the need, relevant context or constraints, and the outcome you hope for. Say whether this is exploratory, feedback, collaboration, or a commercial inquiry. Keep it non-confidential.' },
] as const;
export type ContactTopic = typeof contactTopics[number];

export default function ContactIntentTabs({ topic, onChange }: { topic: ContactTopic; onChange: (topic: ContactTopic) => void }) {
  return <fieldset><legend className="mb-3 text-sm font-semibold">What would you like to talk about?</legend>
    <div className="studio-grid-two">{contactTopics.map(item=><label key={item.id} className="studio-card studio-choice flex gap-3" style={topic.id===item.id?{borderColor:'var(--color-blue-400)',background:'var(--rs-bg-panel-strong)'}:undefined}>
      <input type="radio" name="inquiry-intent" value={item.id} checked={topic.id===item.id} onChange={()=>onChange(item)} className="mt-1 h-4 w-4 shrink-0 accent-blue-500" />
      <span><strong>{item.title}</strong><small>{item.description}</small></span>
    </label>)}</div>
  </fieldset>;
}
