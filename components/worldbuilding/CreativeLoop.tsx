'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import HomepageCdnArt from './HomepageCdnArt';

export const creativeStages = ['Seed', 'Constraint', 'Interaction', 'Consequence', 'Changed state', 'New question'] as const;
const stageHints = ['Something you want to explore', 'What makes the idea matter?', 'Whose choices come together?', 'What changes?', 'What remains different?', 'What becomes possible now?'];
const stageShortHints = ['Begin', 'Limit', 'Meet', 'Change', 'Keep', 'Grow'];
export const creativeScenarios = [
  {
    name: 'A city of creators',
    label: 'CITY',
    title: 'When art becomes a public institution',
    description: 'Creative freedom and public space',
    sentences: [
      'A city chooses to celebrate public creative expression.',
      'Only a limited number of public spaces can host exhibitions.',
      'Independent creators, neighborhoods, and institutions disagree about who gets access.',
      'Some creative voices gain visibility, while others feel excluded.',
      'Trust in the institution changes; independent spaces begin to emerge.',
      'What would fair creative participation look like after that change?',
    ],
    titles: [
      'What is the thing you want to explore?',
      'Where does your idea meet a boundary?',
      'Whose choices collide or cooperate?',
      'What happens as a result?',
      'What is different afterward?',
      'Which question can only exist now?',
    ],
    questions: [
      'What makes this idea personally interesting to me?',
      'What trade-off turns the idea into a situation?',
      'Who is affected and what do they want?',
      'Which outcome follows from the interaction?',
      'What should later scenes remember?',
      'Does this question depend on what changed?',
    ],
  },
  {
    name: 'An archive of memories',
    label: 'ARCHIVE',
    title: 'What would a city remember?',
    description: 'History, access, and responsibility',
    sentences: [
      'A city creates a public archive of everyday memories.',
      'Some accounts conflict; archives have limited resources to preserve everything.',
      'Families, historians, and civic institutions argue over which records deserve attention.',
      'A neglected neighborhood’s history becomes newly visible, while a familiar account is questioned.',
      'Local identity changes as the archive becomes a contested public resource.',
      'Who should shape the next generation’s understanding of the city’s past?',
    ],
    titles: [
      'Begin with an archive you want to visit.',
      'What makes preserving memory difficult?',
      'Who holds a different account?',
      'How does the dispute change public knowledge?',
      'What changes in the city’s self-image?',
      'What question comes next?',
    ],
    questions: [
      'What would I want to find there?',
      'Where are the competing needs?',
      'Who can decide, and who cannot?',
      'Which account becomes visible?',
      'Who now sees their home differently?',
      'Could this question exist without the archive?',
    ],
  },
  {
    name: "A character’s dilemma",
    label: 'CHARACTER',
    title: 'When personal choices reshape a community',
    description: 'Personal meaning and social change',
    sentences: [
      'A young inventor wants to make public technology accessible to everyone.',
      'Their invention needs ongoing maintenance by people who have different priorities.',
      'Users, technicians, and city officials negotiate responsibilities.',
      'Access improves, but the burden of keeping it working falls unevenly.',
      'A new community group forms to share care and decision-making.',
      'What does fair ownership look like when an invention becomes shared infrastructure?',
    ],
    titles: [
      'Start with a character who wants something.',
      'What stands between them and their goal?',
      'Whose needs become entangled?',
      'What does their decision change?',
      'What does their community become?',
      'Which dilemma follows naturally?',
    ],
    questions: [
      'Why does this goal matter to the character?',
      'Who must pay attention to what the goal requires?',
      'Who disagrees with whom?',
      'Who benefits and who bears the cost?',
      'What new relationships exist?',
      'What is the next difficult choice?',
    ],
  },
] as const;

export default function CreativeLoop({ compact = false, onScenarioChange, homepageImages = false }: { compact?: boolean; onScenarioChange?: (scenario: number) => void; homepageImages?: boolean }) {
  const [scenario, setScenario] = useState(0);
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current = creativeScenarios[scenario];
  const takeaway = stage === 5 ? 'The last question can become the next seed.' : stage === 0 ? 'A single spark is enough to start.' : 'Keep the earlier stage in mind as you continue.';
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 5 : (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + 6) % 6;
    setStage(next); tabs.current[next]?.focus();
  }
  const selectors = <div role="tablist" aria-label="Creative Compound Machine stages" aria-orientation={compact ? 'vertical' : 'horizontal'} className={compact ? 'studio-stage-list' : 'studio-stage-row'}>
    {creativeStages.map((name,index)=><button key={name} type="button" ref={el=>{tabs.current[index]=el;}} id={`${id}-stage-${index}`} role="tab" aria-selected={stage===index} aria-controls={`${id}-panel`} tabIndex={stage===index?0:-1} onKeyDown={event=>move(event,index)} onClick={()=>setStage(index)} className="studio-card studio-choice"><span className="studio-stage-number">0{index+1}</span><span><strong>{name}</strong><small>{compact ? stageHints[index] : stageShortHints[index]}</small></span></button>)}
  </div>;
  const panel = <div id={`${id}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-stage-${stage}`} className={'studio-panel studio-result'+(compact && homepageImages ? ' studio-homepage-loop-panel' : '')} aria-live="polite">
    <div><span className="studio-badge">Interactive method · Illustrative, not canon</span><p className="studio-small">Stage {stage+1} of 6 · {current.title}</p>{!compact ? <p className="studio-eyebrow mt-4">0{stage+1} / {creativeStages[stage]} — {current.titles[stage]}</p> : null}<h3>{current.sentences[stage]}</h3><p>{stageHints[stage]}</p></div>
    <div><blockquote><p className="studio-small">A question worth following</p><strong>Ask yourself: {current.questions[stage]}</strong></blockquote>{!compact ? <p className="studio-small mt-4">{takeaway}</p> : null}<div className="studio-progress" aria-hidden="true">{creativeStages.map((name,index)=><span key={name} data-current={index<=stage} />)}</div></div>
    {compact && homepageImages ? <HomepageCdnArt key={stage} asset={([501, 502, 503, 504, 505, 506] as const)[stage]} kind="network" caption={false} inLoop sizes="(max-width: 600px) 35px, (max-width: 850px) 130px, 260px" /> : null}
  </div>;
  return <div>
    {!compact ? <><div className="studio-grid-three" role="group" aria-label="Choose a fictional practice scenario">{creativeScenarios.map((item,index)=><button key={item.name} type="button" className="studio-card studio-choice" aria-pressed={scenario===index} onClick={()=>{setScenario(index);setStage(0);onScenarioChange?.(index);}}><strong>{item.name}</strong><small>{item.description}</small></button>)}</div><p className="studio-small mt-5">All demo scenarios are fictional practice examples, not published Asthortera canon.</p></> : null}
    {compact ? <div className="studio-loop-layout">{selectors}{panel}</div> : <>{selectors}{panel}<div className="studio-actions"><button type="button" className="studio-button secondary" disabled={stage===0} onClick={()=>setStage(stage-1)}>← Back</button><button type="button" className="studio-button" onClick={()=>setStage((stage+1)%6)}>{stage===5?'↻ Restart loop':'Next step →'}</button></div></>}
  </div>;
}
