import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileShell } from '../../components/MobileShell/MobileShell';
import { PROTOTYPES } from '../../prototypes';
import { Splash } from './screens/Splash';
import { Login } from './screens/Login';
import { Home } from './screens/Home';

const proto = PROTOTYPES.find((p) => p.key === 'onboarding')!;

export function OnboardingFlow() {
  return (
    <MobileShell prototype={proto} resetPath="/onboarding">
      <Routes>
        <Route index element={<Splash />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </MobileShell>
  );
}
