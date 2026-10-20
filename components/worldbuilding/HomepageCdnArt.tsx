'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState, type ComponentProps } from 'react';
import ConceptArt from './ConceptArt';
import { resolveHomepageImage } from '@/lib/assets/homepage-assets.mjs';

const artwork = {
  1: [2272, 1888, 'A creative seed connecting a notebook, a city, and an imagined world'],
  2: [2912, 1440, 'A creator exploring connected ideas in a worldbuilding notebook'],
  3: [2912, 1440, 'An imagined civilization inviting readers to explore its stories'],
  4: [2400, 1792, 'Creative notes and ideas waiting to become connected'],
  501: [2400, 1792, 'Seed: the starting idea of a creative world'],
  502: [2400, 1792, 'Constraint: limits and tensions shaping a creative idea'],
  503: [2400, 1792, 'Interaction: creative elements connecting through choices'],
  504: [2400, 1792, 'Consequence: changes emerging from connected choices'],
  505: [2400, 1792, 'Changed state: a creative world transformed by consequences'],
  506: [2400, 1792, 'New question: possibilities opening the next creative cycle'],
  6: [1586, 992, 'An illustrative view of Asthortera and its interconnected civilizations'],
  7: [1024, 506, 'Stories and civilizations connected within an imagined world'],
  8: [1774, 887, 'Creative systems linking ideas, relationships, and consequences'],
  9: [2912, 1440, 'An illustrated exploration of fictional places and cultures'],
  10: [2400, 1792, 'A creative conversation about ideas and imagined worlds'],
  11: [1200, 896, 'A creator’s workbench behind Reltroner Studio'],
} as const;

type Props = Omit<ComponentProps<typeof ConceptArt>, 'mobilePortrait'> & {
  asset: keyof typeof artwork;
  sizes?: string;
  priority?: boolean;
  inLoop?: boolean;
};

export default function HomepageCdnArt({ asset, kind, ratio = '4 / 3', label = 'Concept illustration · Not canonical artwork', caption = true, sizes = '(max-width: 850px) calc(100vw - 40px), 700px', priority = false, inLoop = false }: Props) {
  const frame = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [defaultWidth, defaultHeight, alt] = artwork[asset];
  const { url: src, width = defaultWidth, height = defaultHeight } = resolveHomepageImage(asset);

  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const panel = inLoop ? element.parentElement : null;
    const narrative = panel?.firstElementChild;
    const question = panel?.querySelector('blockquote');
    const disclosure = element.querySelector('figcaption');
    function fit() {
      if (panel && narrative && question) {
        const bounds = panel.getBoundingClientRect();
        const start = narrative.getBoundingClientRect();
        const end = question.getBoundingClientRect();
        // Use only the existing empty space; the image never participates in layout.
        const availableHeight = Math.max(0, end.top - start.bottom - 4);
        const imageWidth = Math.min(start.width, availableHeight * 4 / 3);
        element.style.width = `${imageWidth}px`;
        element.style.height = `${imageWidth * 3 / 4}px`;
        element.style.left = `${start.left - bounds.left - panel.clientLeft + (start.width - imageWidth) / 2}px`;
        element.style.top = `${start.bottom - bounds.top - panel.clientTop + 2}px`;
      } else {
        const style = getComputedStyle(element);
        const parentStyle = element.parentElement && getComputedStyle(element.parentElement);
        const radius = Math.max(parseFloat(style.borderRadius) || 0, parentStyle?.overflow === 'hidden' ? parseFloat(parentStyle.borderRadius) || 0 : 0);
        // Keep the complete rectangular image inside any existing rounded clipping.
        const inset = radius * (1 - Math.SQRT1_2);
        const bottom = disclosure ? element.getBoundingClientRect().bottom - disclosure.getBoundingClientRect().top : inset;
        element.style.setProperty('--homepage-image-inset', `${inset}px`);
        element.style.setProperty('--homepage-image-bottom', `${Math.max(inset, bottom)}px`);
      }
    }
    fit();
    const observer = new ResizeObserver(fit);
    for (const target of [panel || element, narrative, question, disclosure]) if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [asset, inLoop]);

  return <figure ref={frame} className={inLoop ? 'studio-homepage-loop-art' : 'studio-art studio-homepage-art'} style={{ aspectRatio: ratio }} data-homepage-art={asset}>
    {!loaded && <div className="studio-homepage-fallback" aria-hidden="true"><ConceptArt kind={kind} ratio={ratio} caption={false} /></div>}
    {!failed && <div className="studio-homepage-image"><Image src={src} width={width} height={height} alt={alt} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', opacity: loaded ? 1 : 0 }} onLoad={() => setLoaded(true)} onError={() => { setFailed(true); console.error('Homepage artwork failed to load:', src); }} /></div>}
    {caption ? <figcaption>{label}</figcaption> : null}
  </figure>;
}
