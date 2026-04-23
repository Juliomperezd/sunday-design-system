import { useState, useEffect } from 'react';
import styles from './FunnelChart.module.css';

const MAX_BAR_PX = 80;
const DURATION = 540;
const STAGGER = 100;

export interface FunnelStep {
  label: string;
  value: number;
  suffix?: string;
}

export interface FunnelChartProps {
  steps: FunnelStep[];
}

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export function FunnelChart({ steps }: FunnelChartProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [displayValues, setDisplayValues] = useState<number[]>(steps.map(() => 0));
  const [barHeights, setBarHeights] = useState<number[]>(steps.map(() => 0));

  const maxVal = steps[0]?.value ?? 1;

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, i) => {
      const target = step.value;
      const targetPx = (step.value / maxVal) * MAX_BAR_PX;
      const delay = i * STAGGER;

      timeouts.push(setTimeout(() => {
        // Animate bar height
        setBarHeights((prev) => { const next = [...prev]; next[i] = targetPx; return next; });

        // Animate counter
        const t0 = performance.now();
        function tick(now: number) {
          const p = Math.min((now - t0) / DURATION, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setDisplayValues((prev) => {
            const next = [...prev];
            next[i] = Math.round(e * target);
            return next;
          });
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, delay));
    });

    return () => { timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className={styles.chart}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const barPx = (step.value / maxVal) * MAX_BAR_PX;
        const isSelected = selectedIdx === i;
        const convPct = i === 0
          ? null
          : Math.round((step.value / steps[i - 1].value) * 100);

        const barColor = isLast
          ? 'var(--color-content-sunday)'
          : 'var(--color-content-secondary)';
        const labelColor = isLast
          ? 'var(--color-content-sunday)'
          : 'var(--color-content-secondary)';

        return (
          <div
            key={i}
            className={[styles.column, isSelected ? styles.selected : ''].join(' ')}
            style={{ '--stagger-delay': `${i * STAGGER}ms` } as React.CSSProperties}
            onClick={() => setSelectedIdx(isSelected ? null : i)}
          >
            <div className={styles.barWrapper}>
              <div className={styles.barOuter} style={{ height: barHeights[i] }}>
                <span className={styles.valueLabel} style={{ color: labelColor }}>
                  {formatValue(displayValues[i])}{step.suffix ? ` (${step.suffix})` : ''}
                </span>
                <div
                  className={styles.bar}
                  style={{ background: barColor, opacity: isLast ? 1 : 0.4 }}
                />

                {isSelected && (
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipValue}>{formatValue(step.value)}</span>
                    {convPct !== null && (
                      <span className={styles.tooltipConv}>{convPct}% from prev</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <span
              className={styles.stepLabel}
              style={isLast ? { color: 'var(--color-content-sunday)' } : undefined}
            >{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
