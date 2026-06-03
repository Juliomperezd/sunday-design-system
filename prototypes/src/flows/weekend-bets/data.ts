export interface Teammate {
  id: number;
  name: string;
  initials: string;
  color: string;
  baseValue: number;   // tip % at start of weekend
  finalValue: number;  // tip % at end of weekend
  currentValue: number;
  betCount: number;    // fake # of others who bet on them
}

export interface HistoryRound {
  id: number;
  weekLabel: string;
  poll: string;
  winnerName: string;
  winnerValue: string;
  userPickName: string;
  userWon: boolean;
}

export const INITIAL_TEAMMATES: Teammate[] = [
  { id: 1, name: 'Marcus',  initials: 'ML', color: '#E84393', baseValue: 17.2, finalValue: 21.4, currentValue: 17.2, betCount: 4 },
  { id: 2, name: 'Sarah',   initials: 'SK', color: '#00CEC9', baseValue: 16.8, finalValue: 18.9, currentValue: 16.8, betCount: 3 },
  { id: 3, name: 'Jake',    initials: 'JT', color: '#FDCB6E', baseValue: 18.1, finalValue: 26.3, currentValue: 18.1, betCount: 6 },
  { id: 4, name: 'Priya',   initials: 'PV', color: '#A29BFE', baseValue: 15.5, finalValue: 19.7, currentValue: 15.5, betCount: 2 },
  { id: 5, name: 'Tom',     initials: 'TR', color: '#6C5CE7', baseValue: 16.0, finalValue: 22.8, currentValue: 16.0, betCount: 5 },
  { id: 6, name: 'Yuki',    initials: 'YN', color: '#FD79A8', baseValue: 14.9, finalValue: 17.6, currentValue: 14.9, betCount: 3 },
];

export const WINNER_ID = 3; // Jake always wins

export const POLL_QUESTION = "Who'll pull the highest tip % this weekend?";
export const POLL_EMOJI = '💰';

export const HISTORY: HistoryRound[] = [
  {
    id: 1,
    weekLabel: 'May 19 – 25',
    poll: 'Most 5-star Google reviews',
    winnerName: 'Sarah',
    winnerValue: '3 reviews',
    userPickName: 'Sarah',
    userWon: true,
  },
  {
    id: 2,
    weekLabel: 'May 12 – 18',
    poll: 'Most tables turned',
    winnerName: 'Marcus',
    winnerValue: '47 tables',
    userPickName: 'Tom',
    userWon: false,
  },
];

export function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
