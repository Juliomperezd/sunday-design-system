import { useState, useCallback } from 'react';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { BetsContext } from './WeekendBetsContext';
import type { Phase, Tab } from './WeekendBetsContext';
import { INITIAL_TEAMMATES } from './data';
import type { Teammate } from './data';
import { LockScreen } from './screens/LockScreen';
import { LiveScreen } from './screens/LiveScreen';
import styles from './WeekendBets.module.css';

const proto = PROTOTYPES.find((p) => p.key === 'weekend-bets')!;

export function WeekendBetsFlow() {
  const [phase, setPhase]             = useState<Phase>('friday');
  const [activeTab, setActiveTab]     = useState<Tab>('bet');
  const [userBet, setUserBet]         = useState<number | null>(null);
  const [teammates, setTeammates]     = useState<Teammate[]>(INITIAL_TEAMMATES.map(t => ({ ...t })));
  const [showBetDrawer, setShowBetDrawer] = useState(false);

  const openBetDrawer  = useCallback(() => setShowBetDrawer(true), []);
  const closeBetDrawer = useCallback(() => setShowBetDrawer(false), []);

  const placeBet = useCallback((id: number) => {
    setUserBet(id);
    setPhase('live');
    setShowBetDrawer(false);
    setTimeout(() => setActiveTab('live'), 600);
  }, []);

  const startSimulation = useCallback(() => {
    setTeammates(INITIAL_TEAMMATES.map(t => ({ ...t, currentValue: t.finalValue })));
    setPhase('simulating');
  }, []);

  const jumpToSunday = useCallback(() => {
    setPhase('result');
  }, []);

  const reset = useCallback(() => {
    setPhase('friday');
    setActiveTab('bet');
    setUserBet(null);
    setTeammates(INITIAL_TEAMMATES.map(t => ({ ...t, currentValue: t.baseValue })));
    setShowBetDrawer(false);
  }, []);

  const ctx = {
    phase, activeTab, userBet, teammates,
    isSimulating: false, hasSimulated: false, hotCallout: null,
    showBetDrawer,
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
