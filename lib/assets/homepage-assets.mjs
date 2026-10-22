import revisions from './homepage-revisions.json' with { type: 'json' };
import manifest from './generated/first-party-manifest.json' with { type: 'json' };

export const HOMEPAGE_IMAGE_IDS = Object.freeze(/** @type {const} */ ([1, 2, 3, 4, 501, 502, 503, 504, 505, 506, 6, 7, 8, 9, 10, 11]));
/** @typedef {(typeof HOMEPAGE_IMAGE_IDS)[number]} HomepageImageId */
/** @typedef {`home-page-${HomepageImageId}.webp`} HomepageImageFilename */

/** @param {unknown} value */
function approvedCommit(value) {
  if (typeof value !== 'string' || !/^[a-f0-9]{40}$/i.test(value)) {
    throw new Error('Homepage images require a full immutable Git commit SHA');
  }
  return value.toLowerCase();
}

/** @param {unknown} value @returns {HomepageImageFilename} */
function approvedFilename(value) {
  const filename = typeof value === 'number' ? `home-page-${value}.webp` : value;
  if (!HOMEPAGE_IMAGE_IDS.some(id => filename === `home-page-${id}.webp`)) {
    throw new Error('Unknown or unsafe homepage image');
  }
  return /** @type {HomepageImageFilename} */ (filename);
}

approvedCommit(revisions.baseCommit);
for (const [filename, revision] of Object.entries(revisions.overrides)) {
  approvedFilename(filename);
  approvedCommit(revision.commit);
  if (!Number.isSafeInteger(revision.width) || revision.width <= 0 || !Number.isSafeInteger(revision.height) || revision.height <= 0) {
    throw new Error('Homepage image revisions require positive intrinsic dimensions');
  }
}

/**
 * @param {HomepageImageId | HomepageImageFilename} image
 * @returns {{ filename: HomepageImageFilename, sourceSha: string, url: string, width?: number, height?: number }}
 */
export function resolveHomepageImage(image) {
  const filename = approvedFilename(image);
  const override = Object.hasOwn(revisions.overrides, filename) ? revisions.overrides[filename] : undefined;
  const sourceSha = approvedCommit(override?.commit ?? revisions.baseCommit);
  const resource = manifest.entries.find(entry => entry.sourceSha === sourceSha && entry.logicalPath === `/images/${filename}`);
  if (!resource) throw new Error(`Homepage image is not in the verified first-party manifest: ${filename}@${sourceSha}`);
  return Object.freeze({
    filename,
    sourceSha,
    url: resource.url,
    ...(override ? { width: override.width, height: override.height } : {}),
  });
}
