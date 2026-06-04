import { useState } from 'react';
import { Button } from '@mi-org/design-system';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import { useBets } from '../WeekendBetsContext';
import { POLL_QUESTION, INITIAL_TEAMMATES } from '../data';
import { LiveScreen } from './LiveScreen';
import styles from './LockScreen.module.css';

const CONFETTI_COLORS = ['#FDCB6E','#FF7675','#A29BFE','#55EFC4','#FD79A8','#74B9FF','#6C5CE7','#00CEC9'];

const AVATAR_COLORS = ['#E84393','#00CEC9','#FDCB6E','#A29BFE','#6C5CE7','#FD79A8','#00B894','#E17055','#0984E3'];
function nameToColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

interface Particle { id: number; x: number; y: number; tx: number; ty: number; color: string; rot: number; dur: number; delay: number; }
let pid = 0;

export function LockScreen() {
  const { phase, showBetDrawer, openBetDrawer, closeBetDrawer, placeBet } = useBets();
  const [selected, setSelected] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  function handlePlaceBet() {
    if (!selected || confirming) return;
    setConfirming(true);

    // burst confetti
    const ps: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: pid++,
      x: 160 + (Math.random() - 0.5) * 60,
      y: 520 + (Math.random() - 0.5) * 20,
      tx: (Math.random() - 0.5) * 220,
      ty: -60 - Math.random() * 180,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rot: Math.random() * 720,
      dur: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 0.15,
    }));
    setParticles(ps);

    setTimeout(() => {
      placeBet(selected);
      setConfirming(false);
      setSelected(null);
      setParticles([]);
    }, 900);
  }

  return (
    <div className={styles.screen}>
      {/* Wallpaper — hidden when drawer opens, revealing LiveScreen behind */}
      {!showBetDrawer && phase === 'friday' && (
        <div className={styles.wallpaper}>
          <button className={styles.appIconBtn} onClick={openBetDrawer}>
            <AppIcon size={96} badge={1} />
          </button>
        </div>
      )}

      {/* Bet Drawer — LiveScreen visible behind, drawer slides up */}
      {showBetDrawer && (
        <div className={styles.drawerOverlay}>
          <div className={styles.livePreview}><LiveScreen /></div>
          <div className={styles.drawerScrim} />
          <div className={styles.drawer}>
            <div className={styles.drawerHandle} />

            <div className={styles.drawerPoll}>
              <span className={styles.drawerCoin}>🪙</span>
              <p className={styles.drawerQuestion}>{POLL_QUESTION}</p>
              <p className={styles.drawerSub}>Results drop Sunday night 🌙</p>
            </div>

            <div className={styles.teamList}>
              {INITIAL_TEAMMATES.map(t => {
                const isSelected = selected === t.id;
                const names = t.betters.slice(0, 2).join(', ');
                const extra = t.betters.length > 2 ? t.betters.length - 2 : 0;
                return (
                  <button
                    key={t.id}
                    className={[
                      styles.teamCard,
                      isSelected ? styles.teamCardSelected : (selected !== null ? styles.teamCardDimmed : ''),
                    ].join(' ')}
                    onClick={() => setSelected(isSelected ? null : t.id)}
                    disabled={confirming}
                  >
                    <div className={styles.teamInfo}>
                      <p className={styles.teamName}>{t.name}</p>
                      <div className={styles.teamOdds}>
                        <div className={styles.bettersAvatars}>
                          {t.betters.slice(0, 3).map((name, i) => (
                            <div
                              key={i}
                              className={styles.betterAvatar}
                              style={{ background: nameToColor(name), zIndex: t.betters.slice(0, 3).length - i }}
                              title={name}
                            >
                              {name[0].toUpperCase()}
                            </div>
                          ))}
                          {extra > 0 && (
                            <div className={[styles.betterAvatar, styles.betterAvatarMore].join(' ')} style={{ zIndex: 0 }}>
                              +{extra}
                            </div>
                          )}
                        </div>
                        <span className={styles.bettersLabel}>placed their bet</span>
                      </div>
                    </div>
                    <div className={[styles.selector, isSelected ? styles.selectorActive : ''].join(' ')}>
                      {isSelected && '✓'}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.drawerCta}>
              <Button
                variant="primary"
                size="large"
                onClick={handlePlaceBet}
                disabled={!selected || confirming}
              >
                {confirming ? '🎉 Locked in!' : 'Place Bet'}
              </Button>
            </div>

            {particles.map(p => (
              <span key={p.id} className={styles.particle} style={{
                left: p.x, top: p.y,
                background: p.color,
                '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
                '--rot': `${p.rot}deg`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
              } as React.CSSProperties} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
