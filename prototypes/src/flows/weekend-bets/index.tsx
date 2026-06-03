import { useState, useRef, useCallback } from 'react';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { BetsContext } from './WeekendBetsContext';
import type { Phase, Tab } from './WeekendBetsContext';
import { INITIAL_TEAMMATES, WINNER_ID, easeOut, lerp } from './data';
import type { Teammate } from './data';
import { LockScreen } from './screens/LockScreen';
import { LiveScreen } from './screens/LiveScreen';
import styles from './WeekendBets.module.css';

const proto = PROTOTYPES.find((p) => p.key === 'weekend-bets')!;

const SIM_DURATION = 4200;
const SIM_INTERVAL = 80;

export function WeekendBetsFlow() {
  const [phase, setPhase]               = useState<Phase>('friday');
  const [activeTab, setActiveTab]       = useState<Tab>('bet');
  const [userBet, setUserBet]           = useState<number | null>(null);
  const [teammates, setTeammates]       = useState<Teammate[]>(INITIAL_TEAMMATES.map(t => ({ ...t })));
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [showBetDrawer, setShowBetDrawer] = useState(false);
  const [hotCallout, setHotCallout]     = useState<string | null>(null);
  const simRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openBetDrawer  = useCallback(() => setShowBetDrawer(true), []);
  const closeBetDrawer = useCallback(() => setShowBetDrawer(false), []);

  const placeBet = useCallback((id: number) => {
    setUserBet(id);
    setPhase('live');
    setShowBetDrawer(false);
    setTimeout(() => setActiveTab('live'), 600);
  }, []);

  const startSimulation = useCallback(() => {
    if (isSimulating || hasSimulated) return;
    setIsSimulating(true);
    setHotCallout(null);

    const start = Date.now();
    const baseValues = INITIAL_TEAMMATES.reduce<Record<number, number>>(
      (acc, t) => { acc[t.id] = t.currentValue; return acc; }, {}
    );

    simRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / SIM_DURATION, 1);
      const eased = easeOut(progress);

      setTeammates(prev => prev.map(t => {
        const base = baseValues[t.id] ?? t.baseValue;
        const jitter = progress < 0.95 ? (Math.random() - 0.5) * 0.35 : 0;
        return { ...t, currentValue: lerp(base, t.finalValue, eased) + jitter };
      }));

      const winner = INITIAL_TEAMMATES.find(t => t.id === WINNER_ID)!;
      const jakeVal = lerp(winner.baseValue, winner.finalValue, eased);
      if (progress > 0.7 && jakeVal >= 24.5 && !hotCallout) {
        setHotCallout("🔥 26% tip — that's real, and it happened here.");
      }

      if (progress >= 1) {
        clearInterval(simRef.current!);
        setIsSimulating(false);
        setHasSimulated(true);
        setTeammates(INITIAL_TEAMMATES.map(t => ({ ...t, currentValue: t.finalValue })));
        setHotCallout("🔥 26% tip — that's real, and it happened here.");
      }
    }, SIM_INTERVAL);
  }, [isSimulating, hasSimulated, hotCallout]);

  const jumpToSunday = useCallback(() => {
    setPhase('result');
  }, []);

  const reset = useCallback(() => {
    clearInterval(simRef.current!);
    setPhase('friday');
    setActiveTab('bet');
    setUserBet(null);
    setTeammates(INITIAL_TEAMMATES.map(t => ({ ...t, currentValue: t.baseValue })));
    setIsSimulating(false);
    setHasSimulated(false);
    setShowBetDrawer(false);
    setHotCallout(null);
  }, []);

  const ctx = {
    phase, activeTab, userBet, teammates, isSimulating,
    hasSimulated, showBetDrawer, hotCallout,
    setActiveTab, openBetDrawer, closeBetDrawer,
    placeBet, startSimulation, jumpToSunday, reset,
  };

  return (
    <BetsContext.Provider value={ctx}>
      <MobileShell prototype={proto} resetPath="/weekend-bets">
        <div className={styles.shell}>
          {activeTab === 'bet'  && <LockScreen />}
          {activeTab === 'live' && <LiveScreen />}
        </div>
      </MobileShell>
    </BetsContext.Provider>
  );
}
