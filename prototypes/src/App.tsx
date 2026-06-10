import { Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/Index';
import { OnboardingFlow } from './flows/onboarding';
import { HomepageFlow } from './flows/homepage';
import { EndOfServiceFlow } from './flows/end-of-service';
import { MicrogoalsFlow } from './flows/microgoals';
import { WeekendBetsFlow } from './flows/weekend-bets';
import { SurprisePackFlow } from './flows/surprise-pack';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/onboarding/*" element={<OnboardingFlow />} />
      <Route path="/homepage/*" element={<HomepageFlow />} />
      <Route path="/end-of-service/*" element={<EndOfServiceFlow />} />
      <Route path="/microgoals/*" element={<MicrogoalsFlow />} />
      <Route path="/weekend-bets/*" element={<WeekendBetsFlow />} />
      <Route path="/surprise-pack/*" element={<SurprisePackFlow />} />
    </Routes>
  );
}
