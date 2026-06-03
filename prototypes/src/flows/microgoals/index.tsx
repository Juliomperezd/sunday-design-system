import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { MicrogoalsContext } from './MicrogoalsContext';
import { MicrogoalsScreen } from './screens/MicrogoalsScreen';
import { GuestCheckingScreen } from './screens/GuestCheckingScreen';
import { WeeklyQuizScreen } from './screens/WeeklyQuizScreen';

const proto = PROTOTYPES.find((p) => p.key === 'microgoals')!;

export function MicrogoalsFlow() {
  const [completed, setCompleted] = useState(new Set<number>());
  const markComplete = (id: number) => setCompleted((prev) => new Set([...prev, id]));
  const resetAll = () => setCompleted(new Set());

  return (
    <MicrogoalsContext.Provider value={{ completed, markComplete, resetAll }}>
      <MobileShell prototype={proto} resetPath="/microgoals">
        <Routes>
          <Route index element={<MicrogoalsScreen />} />
          <Route path="guest-checking" element={<GuestCheckingScreen />} />
          <Route path="weekly-quiz" element={<WeeklyQuizScreen />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </MobileShell>
    </MicrogoalsContext.Provider>
  );
}
