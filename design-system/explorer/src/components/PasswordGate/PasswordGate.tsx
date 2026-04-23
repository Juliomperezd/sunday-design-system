import { useState } from 'react';
import styles from './PasswordGate.module.css';

const SESSION_KEY = 'sunday_auth';
const PASSWORD = 'sunday26';

interface Props {
  children: React.ReactNode;
}

export function PasswordGate({ children }: Props) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (authed) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <p className={styles.logo}>Sunday</p>
        <p className={styles.subtitle}>Design System</p>
        <input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type="password"
          placeholder="Password"
          value={input}
          autoFocus
          onChange={(e) => { setInput(e.target.value); setError(false); }}
        />
        {error && <p className={styles.errorMsg}>Incorrect password</p>}
        <button className={styles.button} type="submit">Enter</button>
      </form>
    </div>
  );
}
