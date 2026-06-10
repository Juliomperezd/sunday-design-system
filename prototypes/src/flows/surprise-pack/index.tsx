import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { LockScreen } from './screens/LockScreen';
import { PackSelectionScreen } from './screens/PackSelectionScreen';

const proto = PROTOTYPES.find((p) => p.key === 'surprise-pack')!;

export function SurprisePackFlow() {
  return (
    <MobileShell prototype={proto} resetPath="/surprise-pack">
      <Routes>
        <Route index element={<LockScreen />} />
        <Route path="open" element={<PackSelectionScreen />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </MobileShell>
  );
}
