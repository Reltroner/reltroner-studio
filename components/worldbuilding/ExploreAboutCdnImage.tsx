import type { CSSProperties } from 'react';

const sourceCommit = 'a79754137f1c4db46c869e0b7184e1567a1a402d';
const artwork = {
  22: ['explore-page-22.webp', 1374, 1145, 'A glowing planet linked to floating cities above a mountain observatory'],
  23: ['explore-page-23.webp', 1944, 809, 'A traveler overlooking a lake and a distant futuristic mountain city'],
  24: ['explore-page-24.webp', 1730, 909, 'Island civilizations connected by bridges around a mountainous bay'],
  25: ['explore-page-25.webp', 2120, 742, 'Floating city platforms connected by glowing paths through successive creative stages'],
  26: ['about-page-26.webp', 1254, 1254, 'An open notebook beneath a luminous globe and interconnected imagined cities'],
  27: ['about-rei-27.webp', 400, 400, 'Portrait of Rei Reltroner, founder of Reltroner Studio, wearing glasses indoors'],
  28: ['about-page-28.webp', 1619, 971, 'Cities, bridges, and glowing pathways connected across an imagined mountain landscape'],
  29: ['about-page-29.webp', 1881, 836, 'A creator’s illustrated notebook opening onto a lake and an imagined city'],
  30: ['about-page-30.webp', 1881, 836, 'People exploring a sunlit waterfront with gardens and futuristic architecture'],
} as const;

type Asset = keyof typeof artwork;

// Retain the former SVGs' flow dimensions; the image itself fills the existing frame.
const footprints: Partial<Record<Asset, CSSProperties>> = {
  22: { position: 'static', aspectRatio: '720 / 620' },
  26: { position: 'static', aspectRatio: '690 / 640' },
  27: { position: 'static', width: '84%', maxWidth: 300, aspectRatio: '370 / 340' },
};

export default function ExploreAboutCdnImage({ asset, className, priority = false }: { asset: Asset; className?: string; priority?: boolean }) {
  const [filename, width, height, alt] = artwork[asset];
  const sizes = asset === 22 || asset === 26
    ? '(max-width: 850px) calc(100vw - 40px), (max-width: 1264px) 59vw, 672px'
    : asset === 27
      ? '(max-width: 850px) calc(100vw - 42px), (max-width: 1264px) 39vw, 460px'
      : asset >= 23 && asset <= 25
        ? '(max-width: 600px) calc(100vw - 42px), (max-width: 850px) calc(50vw - 32px), (max-width: 1264px) 32vw, 384px'
        : '(max-width: 600px) calc(100vw - 42px), (max-width: 1264px) 49vw, 588px';

  return <span className={className} data-studio-media={asset} style={{ display: 'block', position: 'absolute', inset: 0, ...footprints[asset] }}>
    <img
      src={`https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${sourceCommit}/landing-page-resource/images/${filename}`}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ display: 'block', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
    />
  </span>;
}
