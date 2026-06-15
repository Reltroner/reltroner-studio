import React from 'react';

export interface VideoEmbedProps {
  src: string;
  title?: string;
  provider?: string;
  caption?: string;
}

export function isDirectVideoUrl(src: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src.split('?')[0]);
}

export function normalizeVideoSource(src: string, provider?: string) {
  let finalSrc = src;
  let finalProvider = provider;

  // Google Drive
  if (src.includes('drive.google.com/file/d/')) {
    finalProvider = 'google-drive';
    const idMatch = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      finalSrc = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
    }
  } else if (src.includes('drive.google.com/open?id=')) {
    finalProvider = 'google-drive';
    const idMatch = src.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      finalSrc = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
    }
  }

  // GitHub raw
  if (src.startsWith('https://github.com/') && src.includes('/blob/')) {
    finalSrc = src.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }

  return { src: finalSrc, provider: finalProvider };
}

export function isSafeEmbedUrl(src: string) {
  try {
    const url = new URL(src);
    const hostname = url.hostname;
    
    if (['drive.google.com', 'youtube.com', 'www.youtube.com', 'youtu.be', 'vimeo.com', 'player.vimeo.com', 'raw.githubusercontent.com', 'cdn.jsdelivr.net'].includes(hostname)) {
      return true;
    }
    
    // Allow user-defined direct CDN if it's a video file
    if (isDirectVideoUrl(src)) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export default function VideoEmbed({ src, title, provider, caption }: VideoEmbedProps) {
  const { src: normalizedSrc, provider: normalizedProvider } = normalizeVideoSource(src, provider);
  const safe = isSafeEmbedUrl(normalizedSrc);

  const containerClasses = "video-embed my-8 overflow-hidden rounded-xl border border-slate-700 bg-slate-900/50 shadow-lg dark:bg-slate-900/80";

  if (!safe) {
    return (
      <div className={containerClasses + " p-6 flex flex-col items-center justify-center text-center"}>
        <p className="mb-4 text-slate-300">{title || 'External Video'}</p>
        <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Open video
        </a>
      </div>
    );
  }

  const isNativeVideo = isDirectVideoUrl(normalizedSrc) || normalizedSrc.includes('raw.githubusercontent.com') || normalizedSrc.includes('cdn.jsdelivr.net');

  return (
    <figure className={containerClasses}>
      <div className="relative aspect-video w-full bg-black">
        {isNativeVideo ? (
          <video 
            src={normalizedSrc} 
            controls 
            preload="metadata" 
            playsInline 
            title={title || "Video player"}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <iframe
            src={normalizedSrc}
            title={title || "Video embed"}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
      {(title || caption || normalizedProvider) && (
        <figcaption className="border-t border-slate-700/50 bg-slate-800/50 px-4 py-3 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-200">{title || caption || 'Video'}</span>
          {normalizedProvider && (
            <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
              {normalizedProvider}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
