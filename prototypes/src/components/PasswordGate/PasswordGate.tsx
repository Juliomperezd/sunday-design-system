import { useState } from 'react';
import styles from './PasswordGate.module.css';

const PASSWORD = 'sunday2026';
const STORAGE_KEY = 'sunday_auth';

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  );
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1200);
    }
  }

  return (
    <div className={styles.screen}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.label}>Password</p>
        <input
          className={[styles.input, error ? styles.inputError : ''].join(' ')}
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="···········"
          autoFocus
        />
        <button className={styles.btn} type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}
