import { useState, useEffect, useRef } from 'react';
import styles from './BarEvolution.module.css';

const MAX_BAR_PX = 80;
const DURATION = 500;
const STAGGER = 70;
const BURST_INTERVAL = 35;
const PARTICLES_PER_BURST = 4;
const CONFETTI_COUNT = 60;

const CONFETTI_COLORS = [
  '#f0968a', '#d46ec8', '#9b5fe0',
  '#60b0f4', '#f4a060', '#f4e060',
  '#60f4a8', '#f46090',
];

interface Particle {
  id: number;
  tx: number;
  ty: number;
  size: number;
  bottom: number;
}

interface ConfettiPiece {
  id: number;
  color: string;
  vx: number;
  vy: number;
  spin: number;
  w: number;
  h: number;
  delay: number;
  dur: number;
}

export interface BarDay {
  day: string;
  date: number;
  value?: number;
  isToday?: boolean;
}

export interface BarEvolutionProps {
  data: BarDay[];
  comparisonData?: BarDay[];
  barColor?: string;
  unit?: string;
}

export function BarEvolution({
  data,
  comparisonData,
  barColor = 'var(--color-content-sunday)',
  unit = '%',
}: BarEvolutionProps) {
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [animated, setAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>(data.map(() => 0));
  const [columnParticles, setColumnParticles] = useState<Particle[][]>(data.map(() => []));
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const pidRef = useRef(0);

  const maxVal = Math.max(
    ...data.filter((d) => d.value !== undefined).map((d) => d.value!),
    1,
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimated(true));
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const lastValIdx = data.reduce((acc, item, i) => (item.value !== undefined ? i : acc), 0);
    const allDoneAt = lastValIdx * STAGGER + DURATION + 80;

    data.forEach((item, i) => {
      if (item.value === undefined) return;
      const target = item.value;
      const finalBarPx = (target / maxVal) * MAX_BAR_PX;
      const delay = i * STAGGER;

      // Number counter
      timeouts.push(setTimeout(() => {
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

      // Particles while bar grows
      timeouts.push(setTimeout(() => {
        const t0 = performance.now();
        const iv = setInterval(() => {
          const elapsed = performance.now() - t0;
          if (elapsed >= DURATION) { clearInterval(iv); return; }
          const eased = 1 - Math.pow(1 - elapsed / DURATION, 3);
          const tipY = finalBarPx * eased;

          const burst: Particle[] = Array.from({ length: PARTICLES_PER_BURST }, () => {
            const angle = (Math.random() - 0.5) * Math.PI * 1.4;
            const speed = 12 + Math.random() * 16;
            return {
              id: pidRef.current++,
              tx: Math.sin(angle) * speed,
              ty: -Math.abs(Math.cos(angle)) * speed,
              size: 1.5 + Math.random() * 2.5,
              bottom: tipY,
            };
          });

          setColumnParticles((prev) => {
            const next = [...prev];
            next[i] = [...next[i], ...burst];
            return next;
          });
        }, BURST_INTERVAL);

        intervals.push(iv);

        timeouts.push(setTimeout(() => {
          setColumnParticles((prev) => {
            const next = [...prev];
            next[i] = [];
            return next;
          });
        }, DURATION + 750));
      }, delay));
    });

    // Confetti explosion after all bars finish
    timeouts.push(setTimeout(() => {
      const pieces: ConfettiPiece[] = Array.from({ length: CONFETTI_COUNT }, (_, j) => {
        const angle = (j / CONFETTI_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 90 + Math.random() * 110;
        return {
          id: j,
          color: CONFETTI_COLORS[j % CONFETTI_COLORS.length],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 60, // strong upward bias so pieces arc up then fall
          spin: (Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 540),
          w: 4 + Math.random() * 5,
          h: 5 + Math.random() * 8,
          delay: Math.random() * 80,
          dur: 900 + Math.random() * 500,
        };
      });
      setConfetti(pieces);
      timeouts.push(setTimeout(() => setConfetti([]), 1800));
    }, allDoneAt));

    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className={styles.chart}>

      {/* Confetti explosion */}
      {confetti.map((p) => (
        <span
          key={p.id}
          className={styles.confetti}
          style={{
            width: p.w,
            height: p.h,
            background: p.color,
            animationDuration: `${p.dur}ms`,
            animationDelay: `${p.delay}ms`,
            '--vx': `${p.vx}px`,
            '--vy': `${p.vy}px`,
            '--spin': `${p.spin}deg`,
          } as React.CSSProperties}
        />
      ))}

      {data.map((item, i) => {
        const barPx = item.value !== undefined
          ? (item.value / maxVal) * MAX_BAR_PX
          : 0;
        const compItem = comparisonData?.[i];
        const compBarPx = compItem?.value !== undefined
          ? (compItem.value / maxVal) * MAX_BAR_PX
          : 0;
        const isSelected = i === selectedIdx;

        return (
          <div
            key={i}
            className={[styles.column, isSelected ? styles.selected : ''].join(' ')}
            onClick={() => setSelectedIdx(i)}
            style={{ '--stagger-delay': `${i * STAGGER}ms` } as React.CSSProperties}
          >
            <div className={styles.barWrapper}>
              {item.value !== undefined && (
                <div className={styles.barsRow}>
                  <div className={styles.barOuter} style={{ height: barPx }}>
                    <span className={styles.valueLabel}>
                      {displayValues[i]}{unit}
                    </span>
                    <div
                      className={[styles.bar, animated ? styles.barAnimated : ''].join(' ')}
                      style={{ background: barColor }}
                    />
                    {columnParticles[i].map((p) => (
                      <span
                        key={p.id}
                        className={styles.particle}
                        style={{
                          width: p.size,
                          height: p.size,
                          bottom: p.bottom,
                          '--tx': `${p.tx}px`,
                          '--ty': `${p.ty}px`,
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  {compItem?.value !== undefined && (
                    <div className={styles.barOuter} style={{ height: compBarPx }}>
                      <div className={[styles.barComp, animated ? styles.barCompAnimated : ''].join(' ')} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <span className={styles.dayLabel}>{item.day}</span>
            <span className={[styles.dateLabel, item.isToday ? styles.dateLabelToday : ''].join(' ')}>
              {item.date}
            </span>
          </div>
        );
      })}
    </div>
  );
}
