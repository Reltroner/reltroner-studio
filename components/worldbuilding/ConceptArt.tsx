type ArtKind = 'hero' | 'notebook' | 'city' | 'notes' | 'network' | 'atlas' | 'conversation' | 'desk';

function City() {
  return <g stroke="var(--color-blue-300)" strokeWidth="2" fill="var(--color-blue-900)">
    <circle cx="455" cy="140" r="100" stroke="none" fill="var(--color-blue-400)" opacity=".16" />
    <path d="M0 330 150 270 240 310 350 190 450 260 520 180 640 300V430H0Z" opacity=".5" />
    {[70,190,320,455,550].map((x,i) => <g key={x}><path d={`M${x-40} 360V${230-i*17}l40-30 40 30V360`} />{[0,1,2,3].map(row => <path key={row} d={`M${x-22} ${260+row*22-i*10}h5m12 0h5m12 0h5`} opacity=".6" />)}</g>)}
    <path d="M0 375H640M0 430Q320 370 640 430" fill="none" />
    {[120,235,440,560].map((x,i)=><circle key={x} cx={x} cy={i%2 ? 407 : 394} r="3" fill="var(--color-blue-200)" />)}
  </g>;
}

function Notebook() {
  return <g transform="translate(85 110) rotate(-9 180 135)">
    <rect x="0" y="0" width="350" height="260" rx="18" fill="var(--color-blue-100)" />
    <rect x="13" y="13" width="324" height="234" rx="11" fill="var(--color-blue-200)" stroke="var(--color-blue-800)" strokeWidth="2" />
    <path d="M45 72Q85 30 130 62T215 58T305 65M45 170Q80 130 130 165T210 157T305 172" fill="none" stroke="var(--color-blue-700)" strokeWidth="5" opacity=".65" />
    <path d="M60 70 130 170 210 63 285 165 130 170M60 70 210 63" stroke="var(--color-blue-600)" strokeWidth="2" strokeDasharray="5 6" fill="none" />
    {[[60,70],[130,170],[210,63],[285,165]].map(([x,y])=><circle key={x} cx={x} cy={y} r="8" fill="var(--color-blue-800)" />)}
    <path d="M45 209H170M45 225H225" stroke="var(--color-blue-700)" strokeWidth="5" strokeLinecap="round" opacity=".45" />
  </g>;
}

export default function ConceptArt({ kind, label = 'Concept illustration · Not canonical artwork', ratio = '4 / 3', caption = true, mobilePortrait = false }: { kind: ArtKind; label?: string; ratio?: string; caption?: boolean; mobilePortrait?: boolean }) {
  return <figure className={'studio-art'+(mobilePortrait?' studio-portrait-art':'')} style={{ aspectRatio: ratio }}>
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {(kind === 'city' || kind === 'hero') && <g transform={kind === 'hero' ? 'translate(140 -30) scale(.88)' : undefined}><City /></g>}
      {(kind === 'notebook' || kind === 'hero' || kind === 'desk') && <g transform={kind === 'hero' ? 'translate(-30 150) scale(.85)' : undefined}><Notebook /></g>}
      {kind === 'desk' && <path d="m425 340 105-150 10 8-105 150-19 17Z" fill="var(--color-blue-400)" stroke="var(--color-blue-100)" strokeWidth="4" />}
      {(kind === 'notes' || kind === 'network') && <g stroke="var(--color-blue-300)" strokeWidth="2">
        {kind === 'notes' && <rect x="100" y="70" width="430" height="335" rx="26" fill="var(--rs-bg-deep)" />}
        <path d="m175 175 140 130 160-150M175 175 475 155" fill="none" strokeDasharray="6 8" />
        {[[130,140],[390,120],[270,285]].map(([x,y],i)=><g key={x}><rect x={x} y={y} width="125" height="70" rx="14" fill={`var(--color-blue-${i===1?'400':'200'})`} /><circle cx={x+25} cy={y+26} r="6" fill="var(--color-blue-50)" stroke="none" /></g>)}
      </g>}
      {kind === 'atlas' && <g fill="none" stroke="var(--color-blue-300)" strokeWidth="3"><ellipse cx="320" cy="240" rx="245" ry="135" fill="var(--color-blue-900)" /><path d="M320 110v260M100 250q170-150 380 65M120 290q160-90 400-25" />{[[180,280],[260,170],[420,310]].map(([x,y])=><circle key={x} cx={x} cy={y} r="13" fill="var(--color-blue-200)" />)}</g>}
      {kind === 'conversation' && <g stroke="var(--color-blue-300)" strokeWidth="3" fill="var(--color-blue-900)"><circle cx="330" cy="230" r="145" opacity=".22" stroke="none" /><path d="m90 240 150-80 170 100-160 90ZM90 240v90l160 90 160-90v-70M250 350v70M410 260l130-60 50 150-130 80Z" /><path d="m410 260 50 170 130-60v-20M145 245l100-50m-75 65 100-50m185 65 85-35m-70 65 80-35" fill="none" /><path d="M240 160q90-160 170 100" fill="none" strokeDasharray="8 10" />{[[240,160],[350,120],[410,260]].map(([x,y])=><circle key={x} cx={x} cy={y} r="10" fill="var(--color-blue-200)" />)}</g>}
      {kind === 'hero' && <g transform="rotate(-18 450 380)"><rect x="245" y="370" width="290" height="18" rx="9" fill="var(--rs-bg-deep)" stroke="var(--color-blue-200)" strokeWidth="2" /><path d="M535 370h32l-32 18Z" fill="var(--color-blue-200)" /></g>}
    </svg>
    {caption ? <figcaption>{label}</figcaption> : null}
  </figure>;
}
