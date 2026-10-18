export default function ContactNextSteps() {
  return <section id="next" className="studio-section studio-soft"><div className="studio-wrap">
    <div className="studio-intro"><p className="studio-eyebrow">No complicated process</p><h2>Here’s what to expect.</h2><p>Contacting a small creative studio should feel like a conversation, not a sales funnel.</p></div>
    <div className="studio-grid-three">{[
      ['Start small','Share the idea.','You don’t have to send a business proposal. One honest question with context is useful.'],
      ['Keep it clear','Choose your lane.','Creative work, fictional stories, learning and professional inquiries can be routed differently.'],
      ['Stay realistic','Continue if there’s a fit.','This studio is email-first. Replies depend on availability; no automatic calls or response-time guarantee.'],
    ].map(([tag,title,text],index)=><article className="studio-card" key={tag}><p className="studio-eyebrow">0{index+1} / {tag}</p><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>;
}
