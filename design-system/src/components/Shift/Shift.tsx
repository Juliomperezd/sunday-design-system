import { ShiftPill, ShiftPillProps } from '../ShiftPill/ShiftPill';
import styles from './Shift.module.css';

export interface ShiftProps {
  /** 0, 1 or 2 pills on the left */
  pills?: ShiftPillProps[];
  /** Day shown inline before startTime in brackets, e.g. 'Mon' → '[Mon]' */
  day?: string;
  /** Top-right time label, e.g. "11:00" */
  startTime: string;
  /** Bottom-right time label, e.g. "15:00" */
  endTime: string;
  /** 0–100: how full the sunday bar is. Default 100 */
  barFill?: number;
}

export function Shift({ pills = [], day, startTime, endTime, barFill = 100 }: ShiftProps) {
  const fill = Math.min(100, Math.max(0, barFill));

  return (
    <div className={styles.shift}>

      {/* Leftmost: sunday fill bar */}
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ height: `${fill}%` }} />
      </div>

      {/* Pills */}
      <div className={styles.pills}>
        {pills.map((p, i) => (
          <ShiftPill key={i} {...p} />
        ))}
      </div>

      {/* Times — pushed to the right */}
      <div className={styles.times}>
        <span className={styles.time}>{day ? `[${day}] ` : ''}{startTime}</span>
        <span className={styles.time}>{endTime}</span>
      </div>

    </div>
  );
}
