import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { Splash } from './screens/Splash';
import { Home } from './screens/Home';

const proto = PROTOTYPES.find((p) => p.key === 'homepage')!;

export function HomepageFlow() {
  return (
    <MobileShell prototype={proto} resetPath="/homepage">
      <Routes>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </MobileShell>
  );
}
