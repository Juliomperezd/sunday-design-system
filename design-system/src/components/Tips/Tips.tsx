import { useEffect, useRef, useState } from 'react';
import styles from './Tips.module.css';

/* ── SVG geometry ── */
const R         = 130;
const STROKE    = 14;
const SVG_W     = 300;
const CX        = SVG_W / 2;          // 150
const CY        = R + STROKE / 2 + 8; // 145 — circle centre near bottom
const SVG_H     = CY + STROKE / 2 + 2; // 154 — just past stroke at endpoints
const HALF_CIRC = Math.PI * R;         // ~408.4

const DURATION = 1200;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export interface TipsProps {
  /** Label shown above the amount */
  label?: string;
  /** Integer part of the amount (animated) */
  value?: number;
  /** 0–100: how much of the arc is filled */
  percentage?: number;
  /** Currency prefix — default '$' */
  prefix?: string;
  /** Cents string — default '.00' */
  cents?: string;
}

export function Tips({
  label     = 'Your tips',
  value     = 0,
  percentage = 0,
  prefix    = '$',
  cents     = '.00',
}: TipsProps) {
  const [anim, setAnim] = useState({ progress: 0, num: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    let start: number | null = null;
    const targetP = Math.min(100, Math.max(0, percentage)) / 100;
    const targetN = value;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const raw = Math.min((ts - start) / DURATION, 1);
      const e   = easeOut(raw);
      setAnim({ progress: e * targetP, num: Math.round(e * targetN) });
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [percentage, value]);

  const fillLength  = anim.progress * HALF_CIRC;
  const totalCirc   = 2 * HALF_CIRC;
  const rot         = `rotate(180, ${CX}, ${CY})`;

  return (
    <div className={styles.wrapper}>

      {/* ── Arc ── */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className={styles.svg}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="var(--color-stroke-divider)"
          strokeWidth={STROKE}
          strokeDasharray={`${HALF_CIRC} ${HALF_CIRC}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={rot}
        />
        {/* Fill */}
        {anim.progress > 0 && (
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="var(--color-content-sunday)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${fillLength} ${totalCirc}`}
            strokeDashoffset={0}
            transform={rot}
          />
        )}
      </svg>

      {/* ── Text ── */}
      <div className={styles.textBlock}>
        <span className={styles.label}>{label}</span>
        <div className={styles.amount}>
          <span className={styles.prefix}>{prefix}</span>
          <span className={styles.number}>{anim.num}</span>
          <span className={styles.cents}>{cents}</span>
        </div>
      </div>

    </div>
  );
}
