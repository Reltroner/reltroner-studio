export type PlatformEcosystemId = 'statistics' | 'studio' | 'academy';

export interface PlatformEcosystemEntry {
  readonly id: PlatformEcosystemId;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly current: boolean;
}

export const PLATFORM_ECOSYSTEM: readonly PlatformEcosystemEntry[] = Object.freeze([
  Object.freeze({
    id: 'statistics',
    label: 'Reltroner Statistics',
    href: 'https://statistics.reltroner.com',
    description: 'Source-pinned statistics, drift forensics and evidence tools for Asthortera.',
    current: false,
  }),
  Object.freeze({
    id: 'studio',
    label: 'Reltroner Studio',
    href: 'https://www.reltroner.com',
    description: 'The fictional world of Asthortera and the systems behind it.',
    current: true,
  }),
  Object.freeze({
    id: 'academy',
    label: 'Reltroner Learning Academy',
    href: 'https://lms.reltroner.com',
    description: 'Courses and guided learning across the ecosystem.',
    current: false,
  }),
]);
