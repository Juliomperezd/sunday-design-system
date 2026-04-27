import styles from './DatePickerStrip.module.css';

export interface DayItem {
  label: string;    // 'Mon', 'Tue', etc.
  number: number;   // day of month
  completed?: boolean;
}

export interface DatePickerStripProps {
  days: DayItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  theme?: 'dark' | 'light';
}

const Checkmark = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function DatePickerStrip({ days, selectedIndex, onSelect, theme = 'dark' }: DatePickerStripProps) {
  return (
    <div className={[styles.strip, theme === 'light' ? styles.light : ''].join(' ')}>
      {days.map((day, i) => {
        const isSelected = i === selectedIndex;
        return (
          <button
            key={i}
            className={[styles.day, isSelected ? styles.selected : ''].join(' ')}
            onClick={() => onSelect?.(i)}
          >
            <span className={styles.label}>{day.label}</span>
            <span className={styles.number}>{day.number}</span>
            <span className={[styles.indicator, day.completed ? styles.completed : ''].join(' ')}>
              {day.completed && <Checkmark />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
