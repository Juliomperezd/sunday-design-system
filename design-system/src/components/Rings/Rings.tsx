import React, { useEffect, useRef, useState } from 'react';
import styles from './Rings.module.css';

/* ── SVG geometry ── */
const STROKE   = 7;
const GAP      = 4;
const R_OUTER  = 85;
const R_MIDDLE = R_OUTER  - STROKE - GAP;   // 74
const R_INNER  = R_MIDDLE - STROKE - GAP;   // 63
const SIZE     = (R_OUTER + STROKE) * 2;    // 184
const CX       = SIZE / 2;                  // 92

const circ = (r: number) => 2 * Math.PI * r;
const C_OUTER  = circ(R_OUTER);
const C_MIDDLE = circ(R_MIDDLE);
const C_INNER  = circ(R_INNER);

const DURATION = 1200;
const ROT      = `rotate(-90, ${CX}, ${CX})`;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export interface RingMetric {
  /** 0–100, controls how much of the ring is filled */
  value?: number;
  /** Number to display and animate (e.g. 70, 240, 5) */
  displayValue?: number;
  /** Shown before displayValue, e.g. '$' */
  prefix?: string;
  /** Shown after displayValue, e.g. '%', '★' */
  suffix?: string;
  /** Small uppercase label below the number */
  label?: React.ReactNode;
  /** Optional icon shown to the left of the label */
  icon?: React.ReactNode;
}

export interface RingsProps {
  /** Outer ring — color-content-sunday — shown on LEFT */
  outer?: RingMetric;
  /** Middle ring — color-content-success — shown on RIGHT top */
  middle?: RingMetric;
  /** Inner ring — color-content-info — shown on RIGHT bottom */
  inner?: RingMetric;
}

export function Rings({ outer, middle, inner }: RingsProps) {
  const [anim, setAnim] = useState({ p1: 0, p2: 0, p3: 0, n1: 0, n2: 0, n3: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    let start: number | null = null;
    const t1 = Math.min(100, Math.max(0, outer?.value  ?? 0)) / 100;
    const t2 = Math.min(100, Math.max(0, middle?.value ?? 0)) / 100;
    const t3 = Math.min(100, Math.max(0, inner?.value  ?? 0)) / 100;
    const n1 = outer?.displayValue  ?? 0;
    const n2 = middle?.displayValue ?? 0;
    const n3 = inner?.displayValue  ?? 0;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const raw = Math.min((ts - start) / DURATION, 1);
      const e   = easeOut(raw);

      setAnim({
        p1: e * t1, p2: e * t2, p3: e * t3,
        n1: Math.round(e * n1),
        n2: Math.round(e * n2),
        n3: Math.round(e * n3),
      });

      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [
    outer?.value,  outer?.displayValue,
    middle?.value, middle?.displayValue,
    inner?.value,  inner?.displayValue,
  ]);

  const offset = (c: number, p: number) => c * (1 - p);

  return (
    <div className={styles.wrapper}>

      {/* ── Left stat: outer ring (sunday) ── */}
      <div className={styles.statLeft}>
        {outer && (
          <>
            <span className={styles.displayOuter}>
              {outer.prefix ?? ''}{anim.n1}{outer.suffix ?? ''}
            </span>
            {outer.label && (
              <span className={`${styles.label} ${styles.labelOuter}`}>
                {outer.label}
              </span>
            )}
          </>
        )}
      </div>

      {/* ── Rings SVG ── */}
      <div className={styles.svgWrap}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.svg} aria-hidden="true">
          {/* Outer — sunday */}
          <circle cx={CX} cy={CX} r={R_OUTER} fill="none"
            stroke="var(--color-bg-secondary)" strokeWidth={STROKE} />
          <circle cx={CX} cy={CX} r={R_OUTER} fill="none"
            stroke="var(--color-content-sunday)" strokeWidth={STROKE}
            strokeDasharray={C_OUTER} strokeDashoffset={offset(C_OUTER, anim.p1)}
            strokeLinecap="round" transform={ROT} />

          {/* Middle — success */}
          <circle cx={CX} cy={CX} r={R_MIDDLE} fill="none"
            stroke="var(--color-bg-secondary)" strokeWidth={STROKE} />
          <circle cx={CX} cy={CX} r={R_MIDDLE} fill="none"
            stroke="var(--color-content-success)" strokeWidth={STROKE}
            strokeDasharray={C_MIDDLE} strokeDashoffset={offset(C_MIDDLE, anim.p2)}
            strokeLinecap="round" transform={ROT} />

          {/* Inner — info */}
          <circle cx={CX} cy={CX} r={R_INNER} fill="none"
            stroke="var(--color-bg-secondary)" strokeWidth={STROKE} />
          <circle cx={CX} cy={CX} r={R_INNER} fill="none"
            stroke="var(--color-content-info)" strokeWidth={STROKE}
            strokeDasharray={C_INNER} strokeDashoffset={offset(C_INNER, anim.p3)}
            strokeLinecap="round" transform={ROT} />
        </svg>
      </div>

      {/* ── Right stats: middle (success) + inner (info) ── */}
      <div className={styles.statRight}>
        {middle && (
          <div className={styles.statGroup}>
            <span className={styles.displayMiddle}>
              {middle.prefix ?? ''}{anim.n2}{middle.suffix ?? ''}
            </span>
            {middle.label && (
              <span className={`${styles.label} ${styles.labelMiddle}`}>
                {middle.icon && <span className={styles.labelIcon}>{middle.icon}</span>}
                {middle.label}
              </span>
            )}
          </div>
        )}
        {inner && (
          <div className={styles.statGroup}>
            <span className={styles.displayInner}>
              {inner.prefix ?? ''}{anim.n3}{inner.suffix ?? ''}
            </span>
            {inner.label && (
              <span className={`${styles.label} ${styles.labelInner}`}>
                {inner.icon && <span className={styles.labelIcon}>{inner.icon}</span>}
                {inner.label}
              </span>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
