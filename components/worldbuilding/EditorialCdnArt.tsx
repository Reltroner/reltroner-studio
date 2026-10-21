'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

const sourceCommit = '994ce2c6b09e4f16e264a0fce4d1b5f267eca05a';
const artwork = {
  '12a': ['creators-page-12a.webp', 1374, 1145, 'An open worldbuilding notebook overlooking an imagined mountain city'],
  '12b': ['creators-page-12b.webp', 1448, 1086, 'City studies, sketches, and planning notes arranged on a creator’s desk'],
  '13': ['creators-page-13.webp', 1448, 1086, 'Connected research and industrial facilities cooperating across a futuristic city'],
  '14': ['creators-page-14.webp', 1448, 1086, 'A lamp-lit desk filled with city sketches, reference images, and an open notebook'],
  '15': ['creators-page-15.webp', 1448, 1086, 'Notebooks and a city model ready for a creative conversation overlooking a lake'],
  '16': ['readers-page-16.webp', 1374, 1145, 'A reader looking across terraces and waterways toward a futuristic mountain city'],
  '17': ['readers-page-17.webp', 1374, 1145, 'A person overlooking a lively public gathering space inside a futuristic city'],
  '18': ['readers-page-18.webp', 1672, 941, 'People walking through sunlit terraces and gardens beside a futuristic city’s waterways'],
  '19': ['readers-page-19.webp', 1672, 941, 'Representatives discussing a shared city model around a circular table'],
  '20': ['readers-page-20.webp', 1672, 941, 'Historic waterfront buildings and bridges leading toward a futuristic skyline'],
  '21': ['readers-page-21.webp', 1448, 1086, 'An open illustrated book inviting exploration of a sprawling imagined city'],
} as const;

type Props = {
  asset: keyof typeof artwork;
  label?: string;
  ratio?: string;
  caption?: boolean;
  sizes?: string;
  priority?: boolean;
};

export default function EditorialCdnArt({ asset, label = 'Concept illustration · Not canonical artwork', ratio = '4 / 3', caption = true, sizes = '(max-width: 850px) calc(100vw - 40px), (max-width: 1264px) 42vw, 480px', priority = false }: Props) {
  const frame = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState(false);
  const [filename, width, height, alt] = artwork[asset];
  const src = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${sourceCommit}/landing-page-resource/images/${filename}`;

  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const disclosure = element.querySelector('figcaption');
    function fit() {
      const style = getComputedStyle(element);
      const parentStyle = element.parentElement && getComputedStyle(element.parentElement);
      const radius = Math.max(parseFloat(style.borderRadius) || 0, parentStyle?.overflow === 'hidden' ? parseFloat(parentStyle.borderRadius) || 0 : 0);
      // Keep the complete artwork clear of existing rounded corners and captions.
      const inset = radius * (1 - Math.SQRT1_2);
      const bottom = disclosure ? element.getBoundingClientRect().bottom - disclosure.getBoundingClientRect().top : inset;
      element.style.setProperty('--editorial-image-inset', `${inset}px`);
      element.style.setProperty('--editorial-image-bottom', `${Math.max(inset, bottom)}px`);
    }
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    if (disclosure) observer.observe(disclosure);
    return () => observer.disconnect();
  }, [asset, caption]);

  return <figure ref={frame} className="studio-art" style={{ aspectRatio: ratio }} data-editorial-art={asset}>
    <div style={{ position: 'absolute', inset: 'var(--editorial-image-inset, 0px)', bottom: 'var(--editorial-image-bottom, 0px)' }}>
      {failed ? <div role="img" aria-label={`${alt} — artwork unavailable`} style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}><span className="studio-small">Artwork unavailable.</span></div> : <Image src={src} width={width} height={height} alt={alt} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} onError={() => setFailed(true)} />}
    </div>
    {caption ? <figcaption>{label}</figcaption> : null}
  </figure>;
}
