export type PrototypeStatus = 'Discovery' | 'Aligning' | 'Ready to dev';
export type PrototypeMarket = 'Francia' | 'US';
export type PrototypeFor = 'Managers' | 'Servers';
export type PrototypeQuarter = 'Q2·2026' | 'Q3·2026';

export interface PrototypeEntry {
  key: string;
  name: string;
  description: string;
  path: string;
  screens: number;
  quarter: PrototypeQuarter;
  status: PrototypeStatus;
  market: PrototypeMarket[];
  for: PrototypeFor[];
  notionUrl?: string;
  prdUrl?: string;
  info?: string;
}

// Añade aquí cada nuevo prototipo para que aparezca en el índice
export const PROTOTYPES: PrototypeEntry[] = [
  {
    key: 'surprise-pack',
    name: 'Surprise Pack',
    description: 'Servers receive a mystery pack notification and choose one of 5 sealed packs to reveal a new work challenge and reward.',
    path: '/surprise-pack',
    screens: 2,
    quarter: 'Q3·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'weekend-bets',
    name: 'Weekend Bets',
    description: "Light social betting game: servers bet on who'll win a fun category each weekend and collect $5 if they called it right.",
    path: '/weekend-bets',
    screens: 4,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'microgoals',
    name: 'Microgoals',
    description: 'Quests y micro-objetivos para incentivar el aprendizaje y adopción de Sunday por parte de los camareros.',
    path: '/microgoals',
    screens: 3,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'email-invitation',
    name: 'Email invitation',
    description: 'Flujo de invitación por email para nuevos usuarios.',
    path: '/email-invitation',
    screens: 0,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Managers', 'Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'managers-challenges',
    name: "Manager's challenges",
    description: 'Gestión y seguimiento de retos para managers.',
    path: '/managers-challenges',
    screens: 0,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Managers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'servers-challenges',
    name: "Server's challenges",
    description: 'Retos y objetivos para el equipo de sala.',
    path: '/servers-challenges',
    screens: 0,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'homepage',
    name: 'Homepage',
    description: 'Pantalla principal de la aplicación.',
    path: '/homepage',
    screens: 0,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Managers', 'Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'send-rewards',
    name: 'Send rewards to your bank',
    description: 'Flujo de transferencia de recompensas a cuenta bancaria.',
    path: '/send-rewards',
    screens: 0,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Managers', 'Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
  {
    key: 'end-of-service',
    name: 'End of service',
    description: 'Resumen de turno al final del servicio: tips, sunday usage y métricas clave.',
    path: '/end-of-service',
    screens: 2,
    quarter: 'Q2·2026',
    status: 'Discovery',
    market: ['Francia', 'US'],
    for: ['Servers'],
    notionUrl: '',
    prdUrl: '',
    info: '',
  },
];
