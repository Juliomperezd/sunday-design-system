import { useState, useRef, useCallback } from 'react';
import { NavBar } from '@mi-org/design-system';
import type { NavItem } from '@mi-org/design-system';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { BetsContext } from './WeekendBetsContext';
import type { Phase, Tab } from './WeekendBetsContext';
import { INITIAL_TEAMMATES, WINNER_ID, easeOut, lerp } from './data';
import type { Teammate } from './data';
import { LockScreen } from './screens/LockScreen';
import { LiveScreen } from './screens/LiveScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import styles from './WeekendBets.module.css';

const proto = PROTOTYPES.find((p) => p.key === 'weekend-bets')!;

const NAV_ITEMS: NavItem[] = [
  { key: 'bet',     label: 'Bet',     activeIconName: 'star-01',        defaultIconName: 'star-01-1'   },
  { key: 'live',    label: 'Live',    activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01' },
  { key: 'history', label: 'History', activeIconName: 'coins-02',       defaultIconName: 'coins-02-1'  },
];

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

      // Show hot callout when Jake crosses 25%
      if (progress > 0.7 && !hotCallout) {
        const jakeVal = lerp(
          INITIAL_TEAMMATES.find(t => t.id === WINNER_ID)!.baseValue,
          INITIAL_TEAMMATES.find(t => t.id === WINNER_ID)!.finalValue,
          eased
        );
        if (jakeVal >= 24.5) {
          setHotCallout('🔥 26% tip — that\'s real, and it happened here.');
        }
      }

      if (progress >= 1) {
        clearInterval(simRef.current!);
        setIsSimulating(false);
        setHasSimulated(true);
        // Snap to exact final values
        setTeammates(INITIAL_TEAMMATES.map(t => ({ ...t, currentValue: t.finalValue })));
        setHotCallout('🔥 26% tip — that\'s real, and it happened here.');
      }
    }, SIM_INTERVAL);
  }, [isSimulating, hasSimulated, hotCallout]);

  const jumpToSunday = useCallback(() => {
    setPhase('result');
    setActiveTab('live');
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
          <div className={styles.content}>
            {activeTab === 'bet'     && <LockScreen />}
            {activeTab === 'live'    && <LiveScreen />}
            {activeTab === 'history' && <HistoryScreen />}
          </div>
          <div className={styles.nav}>
            <NavBar
              items={NAV_ITEMS}
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key as Tab)}
              embedded
            />
          </div>
        </div>
      </MobileShell>
    </BetsContext.Provider>
  );
}
