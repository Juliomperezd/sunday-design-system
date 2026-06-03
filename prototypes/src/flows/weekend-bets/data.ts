export interface Teammate {
  id: number;
  name: string;
  initials: string;
  emoji: string;
  color: string;
  betters: string[];
  baseValue: number;
  finalValue: number;
  currentValue: number;
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
  { id: 1, name: 'Marcus Lambert', initials: 'ML', emoji: '😎', color: '#E84393', betters: ['Hélène', 'Felix', 'Ana', 'Carlos'],              baseValue: 17.2, finalValue: 21.4, currentValue: 17.2 },
  { id: 2, name: 'Sarah Kim',      initials: 'SK', emoji: '🌟', color: '#00CEC9', betters: ['Tom', 'Nina', 'Lucas'],                           baseValue: 16.8, finalValue: 18.9, currentValue: 16.8 },
  { id: 3, name: 'Jake Turner',    initials: 'JT', emoji: '🔥', color: '#FDCB6E', betters: ['Camille', 'Felix', 'Antoine', 'Sophie', 'Romain', 'Maya'], baseValue: 18.1, finalValue: 26.3, currentValue: 18.1 },
  { id: 4, name: 'Priya Verma',    initials: 'PV', emoji: '💫', color: '#A29BFE', betters: ['Lucas', 'Iris'],                                  baseValue: 15.5, finalValue: 19.7, currentValue: 15.5 },
  { id: 5, name: 'Tom Rousseau',   initials: 'TR', emoji: '😄', color: '#6C5CE7', betters: ['Ana', 'Hélène', 'Romain', 'Zara', 'Kai'],         baseValue: 16.0, finalValue: 22.8, currentValue: 16.0 },
  { id: 6, name: 'Yuki Nakano',    initials: 'YN', emoji: '✨', color: '#FD79A8', betters: ['Sophie', 'Camille', 'Felix'],                     baseValue: 14.9, finalValue: 17.6, currentValue: 14.9 },
  { id: 7, name: 'Leo García',     initials: 'LG', emoji: '🎯', color: '#00B894', betters: ['Kai', 'Zara', 'Antoine'],                         baseValue: 15.1, finalValue: 20.5, currentValue: 15.1 },
  { id: 8, name: 'Mia Blanc',      initials: 'MB', emoji: '💪', color: '#E17055', betters: ['Nina', 'Carlos', 'Iris', 'Maya'],                  baseValue: 16.3, finalValue: 23.1, currentValue: 16.3 },
  { id: 9, name: 'Alex Renard',    initials: 'AR', emoji: '🌊', color: '#0984E3', betters: ['Hélène', 'Lucas'],                                baseValue: 14.2, finalValue: 16.9, currentValue: 14.2 },
];

export const WINNER_ID = 3;

export const POLL_QUESTION = "Who'll pull the highest tip % this weekend?";
export const POLL_EMOJI = '💰';

export const HISTORY: HistoryRound[] = [
  { id: 1, weekLabel: 'May 19 – 25', poll: 'Most 5-star Google reviews', winnerName: 'Sarah',  winnerValue: '3 reviews',  userPickName: 'Sarah', userWon: true  },
  { id: 2, weekLabel: 'May 12 – 18', poll: 'Most tables turned',          winnerName: 'Marcus', winnerValue: '47 tables', userPickName: 'Tom',   userWon: false },
];

export function formatBetters(betters: string[]): string {
  if (betters.length === 0) return 'No bets yet';
  if (betters.length === 1) return `${betters[0]} placed a bet`;
  if (betters.length === 2) return `${betters[0]} and ${betters[1]} placed their bets`;
  return `${betters[0]}, ${betters[1]} and ${betters.length - 2} more placed their bets`;
}

export function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
