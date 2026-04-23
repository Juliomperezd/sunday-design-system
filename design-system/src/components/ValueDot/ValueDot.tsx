import { useState, useEffect, useRef } from 'react';
import styles from './ValueDot.module.css';

export type ValueDotVariant = 'sunday' | 'non-sunday';

export interface ValueDotProps {
  label: string;
  value: number;
  unit?: string;
  variant?: ValueDotVariant;
}

const DURATION = 1000;
const PARTICLES_PER_BURST = 10;

interface Particle {
  id: number;
  cx: number;
  cy: number;
  tx: number;
  ty: number;
  size: number;
}

export function ValueDot({
  label,
  value,
  unit = '%',
  variant = 'sunday',
}: ValueDotProps) {
  const [display, setDisplay] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pidRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDisplay(0);
    let raf: number;
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const raw = eased * value;
      setDisplay(value % 1 !== 0 ? parseFloat(raw.toFixed(1)) : Math.round(raw));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (variant === 'sunday' && valueRef.current && wrapperRef.current) {
        const vRect = valueRef.current.getBoundingClientRect();
        const wRect = wrapperRef.current.getBoundingClientRect();
        const cx = vRect.left - wRect.left + vRect.width / 2;
        const cy = vRect.top - wRect.top + vRect.height / 2;
        const burst: Particle[] = Array.from({ length: PARTICLES_PER_BURST }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = 12 + Math.random() * 18;
          return {
            id: pidRef.current++,
            cx,
            cy,
            tx: Math.cos(angle) * speed,
            ty: Math.sin(angle) * speed - 10,
            size: 2 + Math.random() * 3,
          };
        });
        setParticles(burst);
        setTimeout(() => setParticles([]), 650);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div ref={wrapperRef} className={[styles.wrapper, variant === 'sunday' ? styles.sunday : styles.nonSunday].join(' ')}>
      <div className={styles.header}>
        <span className={styles.dot} />
        <span className={styles.label}>{label}</span>
      </div>
      <span ref={valueRef} className={styles.value}>{value % 1 !== 0 ? display.toFixed(1) : display}{unit}</span>
      {particles.map(p => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.cx,
            top: p.cy,
            width: p.size,
            height: p.size,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
