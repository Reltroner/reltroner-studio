'use client';

import { useState } from 'react';
import Image from 'next/image';
import { resolveResourceUrl } from '@/lib/assets/resource-manifest';

const CONTACT_ARTWORK = '/images/reltroner-contact.webp';

/**
 * The verified first-party resource follows the latest resource commit at build time.
 * Keep the existing 4:3 figure and contact-page layout unchanged.
 */
export default function ContactConversationArt() {
  const [failed, setFailed] = useState(false);
  const imageUrl = resolveResourceUrl(CONTACT_ARTWORK);

  return (
    <figure className="studio-art" style={{ aspectRatio: '4 / 3' }}>
      {imageUrl && !failed ? (
        <Image
          src={imageUrl}
          alt="Reltroner Studio contact illustration"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 46vw, 560px"
          loading="eager"
          fetchPriority="high"
          onError={() => setFailed(true)}
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      ) : (
        <div
          role="img"
          aria-label="Reltroner Studio contact illustration is unavailable"
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
        >
          <span className="studio-small">Illustration unavailable.</span>
        </div>
      )}
    </figure>
  );
}
