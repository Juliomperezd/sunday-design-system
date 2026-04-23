import { useEffect, useRef, useState } from 'react';
import styles from './Donut.module.css';

/* ── SVG geometry ── */
const R             = 100;
const STROKE        = 16;
const SIZE          = (R + STROKE) * 2;           // 232
const CX            = SIZE / 2;                    // 116
const CIRCUMFERENCE = 2 * Math.PI * R;             // ≈ 628.318
const ARC_DEG       = 300;
const ARC_LEN       = (ARC_DEG / 360) * CIRCUMFERENCE; // ≈ 523.6
const START_ROT     = 120;                         // arc starts at ~7 o'clock

const DURATION = 1200; // ms

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export interface DonutProps {
  label: string;
  /** 0–100 */
  value: number;
  unit?: string;
}

export function Donut({ label, value, unit = '%' }: DonutProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [fillLen, setFillLen]           = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let start: number | null = null;
    const targetFill = (Math.min(100, Math.max(0, value)) / 100) * ARC_LEN;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION, 1);
      const eased    = easeOut(progress);

      setDisplayValue(Math.round(eased * value));
      setFillLen(eased * targetFill);

      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  // stroke-dashoffset: ARC_LEN = fully hidden, 0 = fully shown
  const dashOffset = ARC_LEN - fillLen;
  const rotate     = `rotate(${START_ROT}, ${CX}, ${CX})`;

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={styles.svg}
        aria-hidden="true"
      >
        {/* Track — full 360° circle */}
        <circle
          cx={CX} cy={CX} r={R}
          fill="none"
          stroke="var(--color-bg-secondary)"
          strokeWidth={STROKE}
        />
        {/* Fill — animated arc */}
        <circle
          cx={CX} cy={CX} r={R}
          fill="none"
          stroke="var(--color-content-sunday)"
          strokeWidth={STROKE}
          strokeDasharray={`${ARC_LEN} ${CIRCUMFERENCE}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={rotate}
        />
      </svg>

      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <div className={styles.valueRow}>
          <span className={styles.value}>{displayValue}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
        {/* Ghost — same height as label, keeps value visually centred */}
        <span className={styles.ghost} aria-hidden="true">{label}</span>
      </div>
    </div>
  );
}
