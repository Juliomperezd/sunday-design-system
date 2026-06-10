import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, SectionHeader } from '@mi-org/design-system';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import styles from './PackSelectionScreen.module.css';

const PACK_COUNT = 5;

const CONFETTI_COLORS = [
  '#FF3D8B', '#FF6BA9', '#FFB3D1', '#FF80B4', '#FF2B7E',
  '#E040FB', '#CE93D8', '#BA68C8', '#F48FB1', '#FF80AB',
  '#FF4081', '#F06292', '#EA80FC', '#B39DDB', '#ffffff',
  '#FFD6E7', '#FF94C2', '#C2185B', '#FF1744', '#F8BBD9',
];

interface Particle {
  id: number;
  x: number; y: number;
  tx: number; ty: number;
  color: string;
  w: number; h: number;
  rot: number;
  dur: number;
  delay: number;
  circle: boolean;
}

let pid = 0;

export function PackSelectionScreen() {
  const navigate = useNavigate();
  const [openingId, setOpeningId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const screenRef = useRef<HTMLDivElement>(null);
  const packRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  function handlePackTap(id: number) {
    if (openingId !== null) return;
    setOpeningId(id);

    const packEl = packRefs.current.get(id);
    const screenEl = screenRef.current;

    if (packEl && screenEl) {
      const packRect = packEl.getBoundingClientRect();
      const screenRect = screenEl.getBoundingClientRect();
      const cx = packRect.left - screenRect.left + packRect.width / 2;
      const cy = packRect.top - screenRect.top + packRect.height / 2;

      setTimeout(() => {
        const ps: Particle[] = Array.from({ length: 520 }, (_, i) => {
          const angle = Math.random() * 2 * Math.PI;
          const speed = 25 + Math.random() * 280;
          return {
            id: pid++,
            x: cx,
            y: cy,
            tx: Math.cos(angle) * speed,
            ty: Math.sin(angle) * speed - 120,
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            w: 5 + Math.random() * 9,
            h: 2 + Math.random() * 5,
            rot: Math.random() * 720 - 360,
            dur: 0.8 + Math.random() * 0.9,
            delay: Math.random() * 0.32,
            circle: Math.random() > 0.55,
          };
        });
        setParticles(ps);
        setTimeout(() => setParticles([]), 2200);
        setTimeout(() => setShowDialog(true), 320);
      }, 520);
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const angle = Math.atan2(py - 0.5, px - 0.5) * (180 / Math.PI);
    el.style.setProperty('--px', String(px));
    el.style.setProperty('--py', String(py));
    el.style.setProperty('--angle', String(angle));
    el.style.setProperty('--shine-opacity', '0.9');
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLButtonElement>) {
    e.currentTarget.style.setProperty('--shine-opacity', '0.18');
  }

  function closeDialog() {
    setShowDialog(false);
    setOpeningId(null);
  }

  return (
    <div className={styles.screen} ref={screenRef}>
      <OSTopBar color="#ffffff" />
      <div className={styles.navRow}>
        <button className={styles.backBtn} onClick={() => navigate('/surprise-pack')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className={styles.navTitle}>Choose a pack</p>
        <div className={styles.navSpacer} />
      </div>

      <div className={styles.packArea}>
        <div className={styles.spotlight} />
        <div className={styles.packsScroll}>
          {Array.from({ length: PACK_COUNT }, (_, i) => {
            const id = i + 1;
            const isOpening = openingId === id;
            const isDimmed = openingId !== null && openingId !== id;
            return (
              <button
                key={id}
                ref={(el) => { if (el) packRefs.current.set(id, el); }}
                className={[
                  styles.pack,
                  isOpening ? styles.packOpening : '',
                  isDimmed ? styles.packDimmed : '',
                ].join(' ')}
                onClick={() => handlePackTap(id)}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                disabled={openingId !== null}
              >
                {/* Top crimp seal */}
                <div className={styles.crimpTop} />

                {/* Main body with art window */}
                <div className={styles.packBody}>
                  <div className={styles.artWindow}>
                    {/* Inner radial glow */}
                    <div className={styles.artGlow} />
                    {/* Diamond / gem motif */}
                    <svg className={styles.gemSvg} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="40,6 74,36 40,94 6,36" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                      <polygon points="40,18 62,38 40,80 18,38" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                      <line x1="6" y1="36" x2="74" y2="36" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                      <line x1="40" y1="6" x2="6" y2="36" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
                      <line x1="40" y1="6" x2="74" y2="36" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
                      <circle cx="40" cy="36" r="3.5" fill="rgba(255,255,255,0.55)" />
                      <circle cx="40" cy="36" r="1.5" fill="rgba(255,255,255,0.9)" />
                    </svg>
                  </div>
                </div>

                {/* Bottom crimp seal */}
                <div className={styles.crimpBottom} />

                {/* Chrome metallic sheen (static) */}
                <div className={styles.packChrome} />

                {/* Holographic rainbow overlay (interactive) */}
                <div className={styles.packHolo} />

                {/* Left edge bright reflection */}
                <div className={styles.edgeLeft} />
                {/* Right edge shadow */}
                <div className={styles.edgeRight} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Confetti */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={[styles.particle, p.circle ? styles.particleCircle : ''].join(' ')}
          style={{
            left: p.x,
            top: p.y,
            width: p.w,
            height: p.circle ? p.w : p.h,
            background: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Challenge dialog — centered */}
      {showDialog && (
        <div className={styles.overlay} onClick={closeDialog}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogEmoji}>🎁</div>
            <SectionHeader level="h1" align="center">
              A new challenge for you
            </SectionHeader>
            <p className={styles.challengeDesc}>
              Everytime that a guest pays with sunday for the next 7 days, you get $3
            </p>
            <Divider variant="simple" />
            <div className={styles.dialogActions}>
              <Button variant="primary" size="large" onClick={closeDialog}>
                Join challenge
              </Button>
              <Button variant="ghost" size="large" onClick={closeDialog}>
                See challenge details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
