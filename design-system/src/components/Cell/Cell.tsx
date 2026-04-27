import { useState, useRef } from 'react';
import styles from './Cell.module.css';

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.91205 4.41075C7.23748 4.08531 7.76512 4.08531 8.09056 4.41075L13.0906 9.41075C13.416 9.73619 13.416 10.2638 13.0906 10.5893L8.09056 15.5893C7.76512 15.9147 7.23748 15.9147 6.91205 15.5893C6.58661 15.2638 6.58661 14.7362 6.91205 14.4108L11.3228 10L6.91205 5.58926C6.58661 5.26382 6.58661 4.73619 6.91205 4.41075Z" fill="currentColor"/>
  </svg>
);

const CheckMark = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CONFETTI_COLORS = [
  '#FF17E9', '#FF6B6B', '#FFD93D', '#4D96FF', '#6BCB77',
  '#FF9F43', '#A78BFA', '#00D2D3', '#FF4757', '#FFA502',
  '#2ED573', '#1E90FF', '#FF6348', '#ECCC68', '#7BED9F',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
  rot: number;
  shape: 'square' | 'circle' | 'rect';
  duration: number;
}

export interface CellProps {
  title: string;
  subtitle?: string;
  thumbnail?: React.ReactNode;
  trailingTitle?: string;
  trailingSubtitle?: string;
  chevron?: boolean;
  /** Checkbox interactivo a la izquierda — al marcar: strikethrough + confetti */
  checkable?: boolean;
  onClick?: () => void;
  /** Llamado una vez cuando el checkbox pasa de desmarcado a marcado */
  onCheck?: () => void;
}

let pid = 0;

export function Cell({ title, subtitle, thumbnail, trailingTitle, trailingSubtitle, chevron, checkable, onClick, onCheck }: CellProps) {
  const [checked, setChecked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  function handleCheck(e: React.MouseEvent) {
    e.stopPropagation();
    if (checked) return;
    setChecked(true);
    onCheck?.();

    if (checkboxRef.current && cellRef.current) {
      const cbRect = checkboxRef.current.getBoundingClientRect();
      const cellRect = cellRef.current.getBoundingClientRect();
      const cbCx = cbRect.left - cellRect.left + cbRect.width / 2;
      const cbCy = cbRect.top - cellRect.top + cbRect.height / 2;
      const cellW = cellRect.width;
      const cellH = cellRect.height;

      const shapes: Particle['shape'][] = ['square', 'square', 'square', 'circle', 'rect'];
      const COUNT = 160;

      const burst: Particle[] = Array.from({ length: COUNT }, (_, i) => {
        // 40% from checkbox (fast burst), 60% scattered across cell (splatter)
        const fromCheckbox = i < COUNT * 0.4;
        const ox = fromCheckbox
          ? cbCx + (Math.random() - 0.5) * 12
          : Math.random() * cellW;
        const oy = fromCheckbox
          ? cbCy + (Math.random() - 0.5) * 12
          : cbCy + (Math.random() - 0.5) * cellH;

        const angle = Math.random() * Math.PI * 2;
        const speed = fromCheckbox
          ? 50 + Math.random() * 150
          : 25 + Math.random() * 100;

        return {
          id: pid++,
          x: ox,
          y: oy,
          tx: Math.cos(angle) * speed,
          ty: Math.sin(angle) * speed - Math.random() * 50,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          size: 4 + Math.random() * 9,
          rot: Math.random() * 1080,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          duration: 0.6 + Math.random() * 0.8,
        };
      });
      setParticles(burst);
      setTimeout(() => setParticles([]), 1600);
    }
  }

  return (
    <div
      ref={cellRef}
      className={[styles.cell, onClick ? styles.clickable : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {checkable && (
        <button
          ref={checkboxRef}
          className={[styles.checkbox, checked ? styles.checkboxDone : ''].join(' ')}
          onClick={handleCheck}
          aria-label={checked ? 'Done' : 'Mark as done'}
        >
          {checked && <CheckMark />}
        </button>
      )}

      {!checkable && thumbnail && (
        <div className={styles.thumbnailSlot}>{thumbnail}</div>
      )}

      <div className={styles.text}>
        <p className={[styles.title, checked ? styles.titleDone : ''].join(' ')}>
          <span className={styles.titleInner}>{title}</span>
        </p>
        {!checked && subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {trailingTitle && (
        <div className={styles.trailing}>
          <p className={styles.title}>{trailingTitle}</p>
          {trailingSubtitle && <p className={styles.subtitle}>{trailingSubtitle}</p>}
        </div>
      )}

      {chevron && (
        <span className={styles.chevron}>
          <ChevronRight />
        </span>
      )}

      {particles.map(p => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.x,
            top: p.y,
            width: p.shape === 'rect' ? p.size * 0.5 : p.size,
            height: p.shape === 'rect' ? p.size * 2 : p.size,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '1px',
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
            animationDuration: `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
