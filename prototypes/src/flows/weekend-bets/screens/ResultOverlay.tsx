import { useState, useEffect, useRef } from 'react';
import { Button } from '@mi-org/design-system';
import { PushNotification } from '../../../../../design-system/src/prototype-components/PushNotification/PushNotification';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import { useBets } from '../WeekendBetsContext';
import { INITIAL_TEAMMATES, WINNER_ID } from '../data';
import styles from './ResultOverlay.module.css';

const COLORS = ['#FDCB6E','#FF7675','#A29BFE','#55EFC4','#FD79A8','#74B9FF','#6C5CE7','#00CEC9','#E84393','#F9CA24'];
interface P { id: number; x: number; y: number; tx: number; ty: number; color: string; rot: number; dur: number; delay: number; w: number; h: number; }
let pid = 0;

export function ResultOverlay() {
  const { userBet, teammates, reset } = useBets();
  const winner = teammates.find(t => t.id === WINNER_ID)!;
  const userPick = INITIAL_TEAMMATES.find(t => t.id === userBet) ?? INITIAL_TEAMMATES[0];
  const userWon = userBet === WINNER_ID;

  const [notifVisible, setNotifVisible] = useState(false);
  const [particles, setParticles] = useState<P[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show notification after 600ms
    const t1 = setTimeout(() => setNotifVisible(true), 600);

    if (userWon) {
      const t2 = setTimeout(() => {
        const rect = screenRef.current?.getBoundingClientRect() ?? { width: 300, height: 600 };
        const ps: P[] = Array.from({ length: 320 }, (_, i) => {
          const size = 4 + Math.random() * 10;
          const isRect = Math.random() < 0.45;
          const zone = i % 3;
          const ox = zone === 0
            ? rect.width * 0.5 + (Math.random() - 0.5) * rect.width * 0.8
            : zone === 1 ? Math.random() * rect.width * 0.4
            : rect.width * 0.6 + Math.random() * rect.width * 0.4;
          return {
            id: pid++,
            x: ox, y: -40 + Math.random() * 60,
            tx: (Math.random() - 0.5) * 420,
            ty: 200 + Math.random() * 600,
            color: COLORS[i % COLORS.length],
            rot: Math.random() * 1400,
            dur: 0.7 + Math.random() * 1.1,
            delay: Math.random() * 0.4,
            w: isRect ? size * 0.4 : size,
            h: isRect ? size * 2.4 : size,
          };
        });
        setParticles(ps);
        setShowConfetti(true);
        setTimeout(() => { setShowConfetti(false); setParticles([]); }, 4000);
      }, 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    return () => clearTimeout(t1);
  }, [userWon]);

  return (
    <div className={styles.overlay} ref={screenRef}>
      <OSTopBar color={userWon ? '#1a1a2e' : '#ffffff'} />

      {/* Notification sliding in */}
      <div className={[styles.notifWrap, notifVisible ? styles.notifIn : ''].join(' ')}>
        <PushNotification
          appName="Sunday"
          appIcon={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}><AppIcon size={24} /></span>}
          time="now"
          title={userWon ? `🎉 You called it! +$5 incoming` : `😅 ${winner.name} took it this weekend`}
          body={userWon
            ? `Your bet on ${winner.name} came in — ${winner.finalValue.toFixed(1)}% tip. Cash is on its way.`
            : `${winner.name} pulled ${winner.finalValue.toFixed(1)}% tip. You picked ${userPick.name} — better luck next weekend!`
          }
        />
      </div>

      {/* Main result */}
      <div className={[styles.main, userWon ? styles.mainWin : styles.mainLose].join(' ')}>
        {userWon ? (
          <>
            <div className={styles.bigEmoji}>🏆</div>
            <p className={styles.headline}>You called it!</p>
            <p className={styles.sub}>Your bet on {winner.name} paid off</p>

            <div className={styles.winCard}>
              <div className={styles.winAvatar} style={{ background: winner.color }}>{winner.initials}</div>
              <div>
                <p className={styles.winName}>{winner.name}</p>
                <p className={styles.winStat}>{winner.finalValue.toFixed(1)}% tip · Weekend winner 🏆</p>
              </div>
              <div className={styles.winAmount}>+$5</div>
            </div>

            <div className={styles.valueMoment}>
              <p>💡 That {winner.finalValue.toFixed(1)}% tip was real — Sunday made it visible, and you spotted the talent.</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.bigEmoji}>😅</div>
            <p className={styles.headline}>So close!</p>
            <p className={styles.sub}>You picked {userPick.name} · {winner.name} won it</p>

            <div className={styles.winCard}>
              <div className={styles.winAvatar} style={{ background: winner.color }}>{winner.initials}</div>
              <div>
                <p className={styles.winName}>{winner.name}</p>
                <p className={styles.winStat}>{winner.finalValue.toFixed(1)}% tip — took the crown 👑</p>
              </div>
            </div>

            <div className={styles.consolation}>
              <p>New bets drop every Friday. Come back and try again 🎲</p>
            </div>
          </>
        )}

        <div className={styles.resetBtn}>
          <Button variant="secondary" size="small" onClick={reset}>
            Replay demo
          </Button>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && particles.map(p => (
        <span key={p.id} className={styles.particle} style={{
          left: p.x, top: p.y,
          width: p.w, height: p.h,
          background: p.color,
          '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
          '--rot': `${p.rot}deg`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
