import styles from './TabNav.module.css';

export interface TabNavProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function TabNav({ options, value, onChange }: TabNavProps) {
  return (
    <div className={styles.track}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={[styles.item, option === value ? styles.active : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(option)}
          aria-pressed={option === value}
        >
          <span className={styles.label}>{option}</span>
        </button>
      ))}
    </div>
  );
}
