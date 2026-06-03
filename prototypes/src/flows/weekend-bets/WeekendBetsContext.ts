import { createContext, useContext } from 'react';
import type { Teammate } from './data';

export type Phase = 'friday' | 'live' | 'result';
export type Tab = 'bet' | 'live' | 'history';

export interface BetsContextType {
  phase: Phase;
  activeTab: Tab;
  userBet: number | null;
  teammates: Teammate[];
  isSimulating: boolean;
  hasSimulated: boolean;
  showBetDrawer: boolean;
  hotCallout: string | null;
  setActiveTab: (tab: Tab) => void;
  openBetDrawer: () => void;
  closeBetDrawer: () => void;
  placeBet: (id: number) => void;
  startSimulation: () => void;
  jumpToSunday: () => void;
  reset: () => void;
}

export const BetsContext = createContext<BetsContextType>({
  phase: 'friday',
  activeTab: 'bet',
  userBet: null,
  teammates: [],
  isSimulating: false,
  hasSimulated: false,
  showBetDrawer: false,
  hotCallout: null,
  setActiveTab: () => {},
  openBetDrawer: () => {},
  closeBetDrawer: () => {},
  placeBet: () => {},
  startSimulation: () => {},
  jumpToSunday: () => {},
  reset: () => {},
});

export const useBets = () => useContext(BetsContext);
