export type AppStatus = 'live' | 'planned';
export type AppType = 'core' | 'external' | 'coming-soon';

export interface EcosystemApp {
  name: string;
  url: string;
  status: AppStatus;
  type: AppType;
  description: string;
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    name: 'Reltroner Studio',
    url: '/',
    status: 'live',
    type: 'core',
    description: 'Knowledge base, brand archive, and ecosystem gateway.',
  },
  {
    name: 'Reltroner HRM',
    url: 'https://hrm.reltroner.com',
    status: 'live',
    type: 'external',
    description: 'Human resource management portal for the Reltroner ecosystem.',
  },
  {
    name: 'Reltroner LMS',
    url: 'https://lms.reltroner.com',
    status: 'live',
    type: 'external',
    description: 'Learning management system portal for Reltroner courses and structured learning.',
  },
  {
    name: 'Future Apps',
    url: '#',
    status: 'planned',
    type: 'coming-soon',
    description: 'Reserved space for future Reltroner ecosystem modules.',
  },
];
