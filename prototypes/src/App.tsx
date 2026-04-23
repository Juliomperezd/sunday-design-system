import { Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/Index';
import { OnboardingFlow } from './flows/onboarding';
import { HomepageFlow } from './flows/homepage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/onboarding/*" element={<OnboardingFlow />} />
      <Route path="/homepage/*" element={<HomepageFlow />} />
    </Routes>
  );
}
