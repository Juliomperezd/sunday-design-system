import { useState, useEffect, useRef } from 'react';
import { Button } from '@mi-org/design-system';
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

  const [particles, setParticles] = useState<P[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userWon) return;
    const t = setTimeout(() => {
      const rect = screenRef.current?.getBoundingClientRect() ?? { width: 300, height: 600 };
      const ps: P[] = Array.from({ length: 280 }, (_, i) => {
        const size = 4 + Math.random() * 10;
        const isRect = Math.random() < 0.45;
        const ox = rect.width * 0.5 + (Math.random() - 0.5) * rect.width * 0.9;
        return {
          id: pid++,
          x: ox, y: -40 + Math.random() * 60,
          tx: (Math.random() - 0.5) * 400,
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
    }, 400);
    return () => clearTimeout(t);
  }, [userWon]);

  return (
    <div className={[styles.overlay, userWon ? styles.overlayWin : styles.overlayLose].join(' ')} ref={screenRef}>

      <div className={styles.main}>
        {userWon ? (
          <>
            <div className={styles.bigEmoji}>🏆</div>
            <p className={styles.headline}>You were right!</p>
            <p className={styles.sub}>Enjoy your $5 reward</p>

            <div className={styles.winCard}>
              <p className={styles.winName}>{winner.name}</p>
              <div className={styles.winStats}>
                <p className={styles.winTip}>{winner.finalValue.toFixed(1)}% tip</p>
                <p className={styles.winSubtip}>$244 tip</p>
              </div>
            </div>

            <div className={styles.socialProof}>
              <div className={styles.socialAvatars}>
                {[{name:'Hélène',bg:'#E84393'},{name:'Brett',bg:'#00CEC9'},{name:'Camille',bg:'#A29BFE'}].map((p,i) => (
                  <div key={i} className={styles.socialAvatar} style={{ background: p.bg, zIndex: 3-i }}>
                    {p.name[0]}
                  </div>
                ))}
              </div>
              <p className={styles.socialText}>Hélène, Brett and +12 won their bet!</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.bigEmoji}>😅</div>
            <p className={styles.headline}>So close!</p>
            <p className={styles.sub}>You picked {userPick.name} · {winner.name} won it</p>

            <div className={styles.winCard}>
              <p className={styles.winName}>{winner.name}</p>
              <div className={styles.winStats}>
                <p className={styles.winTip}>{winner.finalValue.toFixed(1)}% tip</p>
                <p className={styles.winSubtip}>$244 tip</p>
              </div>
            </div>

            <div className={styles.consolation}>
              <p>New bets drop every Friday. Come back and try again 🎲</p>
            </div>
          </>
        )}
      </div>

      <div className={styles.bottomBtns}>
        <div className={styles.seeResultsBtn}>
          <Button variant="primary" size="large" onClick={reset}>
            See results
          </Button>
        </div>
        <Button variant="secondary" size="small" onClick={reset}>
          Replay demo
        </Button>
      </div>

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
