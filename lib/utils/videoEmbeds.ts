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
    
    if (isDirectVideoUrl(src)) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function processVideoDirectives(markdownOrHtml: string) {
  const regex = /::video\{([^}]+)\}/g;
  const placeholders = new Map<string, string>();
  let counter = 0;
  
  const transformedMarkdown = markdownOrHtml.replace(regex, (match, attrs) => {
    const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
    let attrMatch;
    const props: any = {};
    
    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      props[attrMatch[1]] = attrMatch[2];
    }
    
    if (!props.src) return match;

    const { src, provider } = normalizeVideoSource(props.src, props.provider);
    const safe = isSafeEmbedUrl(src);
    const title = props.title || props.caption || '';
    
    const containerClasses = "rs-video-embed my-8 w-full max-w-full clear-both overflow-hidden rounded-2xl border border-sky-300/25 bg-slate-950/80";
    
    const safeSrc = escapeHtml(src);
    const safeTitle = escapeHtml(title);
    const safeProvider = provider ? escapeHtml(provider) : '';

    let embedHtml = '';

    if (!safe) {
      embedHtml = `<div class="${containerClasses} p-6 flex flex-col items-center justify-center text-center">
        <p class="mb-4 text-slate-300">${safeTitle || 'External Video'}</p>
        <a href="${safeSrc}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Open video</a>
      </div>`;
    } else {
      const isNativeVideo = isDirectVideoUrl(src) || src.includes('raw.githubusercontent.com') || src.includes('cdn.jsdelivr.net');
      
      let mediaHtml = '';
      if (isNativeVideo) {
        mediaHtml = `<video src="${safeSrc}" controls preload="metadata" playsInline title="${safeTitle || "Video player"}" class="absolute inset-0 h-full w-full object-contain"></video>`;
      } else {
        mediaHtml = `<iframe src="${safeSrc}" title="${safeTitle || "Video embed"}" class="absolute inset-0 h-full w-full border-0" allow="autoplay; encrypted-media" allowFullScreen loading="lazy"></iframe>`;
      }

      let captionHtml = '';
      if (title || safeProvider) {
        captionHtml = `<figcaption class="border-t border-slate-700/50 bg-slate-800/50 px-4 py-3 flex items-center justify-between text-sm">
          <span class="font-medium text-slate-200">${safeTitle || 'Video'}</span>
          ${safeProvider ? `<span class="rounded-full bg-slate-700 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">${safeProvider}</span>` : ''}
        </figcaption>`;
      }

      embedHtml = `<figure class="${containerClasses}">
        <div class="rs-video-frame relative aspect-video w-full overflow-hidden bg-black">
          ${mediaHtml}
        </div>
        ${captionHtml}
      </figure>`;
    }

    const placeholderId = `___VIDEO_EMBED_PLACEHOLDER_${counter++}___`;
    placeholders.set(placeholderId, embedHtml);
    
    // Return with blank lines to force block context in markdown
    return `\n\n${placeholderId}\n\n`;
  });

  return { transformedMarkdown, placeholders };
}

export function injectVideoEmbeds(html: string, placeholders: Map<string, string>) {
  let finalHtml = html;
  for (const [id, embedHtml] of placeholders.entries()) {
    // Replace the exact paragraph wrapper if remark added it
    finalHtml = finalHtml.replace(`<p>${id}</p>`, embedHtml);
    // Fallback if not wrapped exactly
    finalHtml = finalHtml.replace(id, embedHtml);
  }
  return finalHtml;
}
