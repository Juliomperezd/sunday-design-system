import { useState } from 'react';
import { Button } from '@mi-org/design-system';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useBets } from '../WeekendBetsContext';
import { POLL_QUESTION, POLL_EMOJI, INITIAL_TEAMMATES, formatBetters } from '../data';
import styles from './LockScreen.module.css';

const CONFETTI_COLORS = ['#FDCB6E','#FF7675','#A29BFE','#55EFC4','#FD79A8','#74B9FF','#6C5CE7','#00CEC9'];

interface Particle { id: number; x: number; y: number; tx: number; ty: number; color: string; rot: number; dur: number; delay: number; }
let pid = 0;

export function LockScreen() {
  const { userBet, phase, showBetDrawer, openBetDrawer, closeBetDrawer, placeBet } = useBets();
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

  // Already placed a bet — show confirmation state
  if (userBet !== null && phase !== 'friday') {
    const pick = INITIAL_TEAMMATES.find(t => t.id === userBet)!;
    return (
      <div className={styles.betPlaced}>
        <OSTopBar />
        <div className={styles.betPlacedContent}>
          <div className={styles.betPlacedCheck}>✓</div>
          <p className={styles.betPlacedTitle}>Bet placed!</p>
          <p className={styles.betPlacedSub}>You picked</p>
          <div className={styles.betPlacedAvatar} style={{ background: pick.color }}>
            {pick.emoji}
          </div>
          <p className={styles.betPlacedName}>{pick.name}</p>
          <p className={styles.betPlacedNote}>Results drop Sunday night 🌙</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      {/* Lock screen wallpaper */}
      <div className={styles.wallpaper}>
        <div className={styles.timeBlock}>
          <p className={styles.time}>9:41</p>
          <p className={styles.date}>Friday, June 6</p>
        </div>

        {/* Sunday notification — tap to open drawer */}
        <button className={styles.notification} onClick={openBetDrawer}>
          <div className={styles.notifIcon}>
            <AppIcon size={32} />
          </div>
          <div className={styles.notifBody}>
            <div className={styles.notifMeta}>
              <span className={styles.notifApp}>SUNDAY</span>
              <span className={styles.notifTime}>now</span>
            </div>
            <p className={styles.notifTitle}>🎰 Weekend Bets are LIVE</p>
            <p className={styles.notifSub}>Who'll own this weekend? Place your bet →</p>
          </div>
        </button>

        <p className={styles.hint}>tap to bet</p>
      </div>

      {/* Bet Drawer — slides up */}
      {showBetDrawer && (
        <div className={styles.drawerOverlay}>
          <div className={styles.drawer}>
            <div className={styles.drawerHandle} />

            <div className={styles.drawerHeader}>
              <span className={styles.drawerEmoji}>{POLL_EMOJI}</span>
              <div>
                <p className={styles.drawerTitle}>Weekend Bets</p>
                <p className={styles.drawerSub}>Results drop Sunday night 🌙</p>
              </div>
              <button className={styles.closeBtn} onClick={closeBetDrawer}>
                <Icon name="chevron-down" size={20} color="var(--color-content-secondary)" />
              </button>
            </div>

            <p className={styles.pollQuestion}>{POLL_QUESTION}</p>

            <div className={styles.teamList}>
              {INITIAL_TEAMMATES.map(t => {
                const isSelected = selected === t.id;
                return (
                  <button
                    key={t.id}
                    className={[styles.teamCard, isSelected ? styles.teamCardSelected : ''].join(' ')}
                    onClick={() => setSelected(isSelected ? null : t.id)}
                    disabled={confirming}
                  >
                    <div className={styles.avatar} style={{ background: t.color }}>
                      {t.emoji}
                    </div>
                    <div className={styles.teamInfo}>
                      <p className={styles.teamName}>{t.name}</p>
                      <p className={styles.teamOdds}>{formatBetters(t.betters)}</p>
                    </div>
                    <div className={[styles.pick, isSelected ? styles.pickActive : ''].join(' ')}>
                      {isSelected ? '✓' : ''}
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

            {/* Confetti */}
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
