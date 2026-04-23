import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/tokens/tokens.css';
import './global.css';
import { App } from './App';
import { PasswordGate } from './components/PasswordGate/PasswordGate';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordGate>
      <App />
    </PasswordGate>
  </StrictMode>
);
