import { Header, Button, SectionHeader, Divider } from '@mi-org/design-system';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useBets } from '../WeekendBetsContext';
import { POLL_QUESTION } from '../data';
import { ResultOverlay } from './ResultOverlay';
import { SundayNightScreen } from './SundayNightScreen';
import styles from './LiveScreen.module.css';

const AVATAR_COLORS = ['#E84393','#00CEC9','#FDCB6E','#A29BFE','#6C5CE7','#FD79A8','#00B894','#E17055','#0984E3'];
function nameToColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

export function LiveScreen() {
  const { phase, teammates, userBet, startSimulation, reset } = useBets();

  const sorted = [...teammates].sort((a, b) => b.currentValue - a.currentValue);

  if (phase === 'result')     return <ResultOverlay />;
  if (phase === 'simulating') return <SundayNightScreen />;

  return (
    <div className={styles.screen}>
      <div className={styles.headerWrap}>
        <Header
          variant="main"
          leftButton={{ label: 'Reset demo', onClick: reset }}
          sundayAction={{ icon: <Icon name="lightning-01" size={20} /> }}
          initialsAction={{ initials: 'JL' }}
        />
      </div>

      <div className={styles.scroll}>

        {/* Poll header */}
        <div className={styles.pollHeader}>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            LIVE
          </div>
          <SectionHeader level="h1">{POLL_QUESTION}</SectionHeader>
          <p className={styles.pollMeta}>Saturday · 7:14 PM · 23 bets placed</p>
        </div>

        {/* Podium — top 3 */}
        {sorted.length >= 3 && (() => {
          const CARD = {
            1: { bg: 'linear-gradient(150deg, #F9EDB5 0%, #EDCC6A 100%)', numColor: 'rgba(120,80,0,0.08)',   text: '#1A1400' },
            2: { bg: 'linear-gradient(150deg, #DDE5EF 0%, #BFCEE0 100%)', numColor: 'rgba(30,60,110,0.07)',  text: '#0F1828' },
            3: { bg: 'linear-gradient(150deg, #F5DCC0 0%, #DEBB98 100%)', numColor: 'rgba(120,50,10,0.07)',  text: '#201200' },
          };
          // Visual order: 2nd left · 1st center · 3rd right
          const order = [sorted[1], sorted[0], sorted[2]];
          const ranks = [2, 1, 3] as const;
          return (
            <div className={styles.podium}>
              {order.map((t, i) => {
                const rank = ranks[i];
                const c = CARD[rank];
                const isUserBet = t.id === userBet;
                return (
                  <div
                    key={t.id}
                    className={[styles.podiumCard, rank === 1 ? styles.podiumFirst : ''].join(' ')}
                    style={{ background: c.bg }}
                  >
                    <div className={styles.podiumBgNum} style={{ color: c.numColor }}>{rank}</div>
                    {isUserBet && <div className={styles.podiumPickBadge}>Your pick</div>}
                    <p className={styles.podiumName} style={{ color: c.text }}>{t.name.split(' ')[0]}</p>
                    <p className={styles.podiumPct} style={{ color: c.text }}>{t.currentValue.toFixed(1)}%</p>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Table header */}
        <div className={styles.tableHeader}>
          <span className={styles.thRank}>Rank</span>
          <span className={styles.thServer}>Server</span>
          <span className={styles.thTip}>Tip</span>
        </div>

        {/* Standings — 4th and below */}
        <div className={styles.standings}>
          {sorted.slice(3).map((t, idx) => {
            const isUserBet = t.id === userBet;
            const visibleBetters = t.betters.slice(0, 3);
            const extraBetters = t.betters.length > 3 ? t.betters.length - 3 : 0;

            return (
              <div key={t.id}>
                {idx > 0 && <Divider variant="simple" />}
                <div className={[styles.row, isUserBet ? styles.rowHighlight : ''].join(' ')}>
                  <span className={styles.rank}>#{idx + 4}</span>

                  <div className={styles.rowMain}>
                    <div className={styles.rowNameRow}>
                      <span className={styles.rowName}>{t.name}</span>
                      {isUserBet && <span className={styles.yourPick}>Your pick</span>}
                    </div>
                  </div>

                  {/* Betters avatars */}
                  <div className={styles.bettersAvatars}>
                    {visibleBetters.map((name, i) => (
                      <div
                        key={i}
                        className={styles.betterAvatar}
                        style={{ background: nameToColor(name), zIndex: visibleBetters.length - i }}
                        title={name}
                      >
                        {name[0].toUpperCase()}
                      </div>
                    ))}
                    {extraBetters > 0 && (
                      <div className={[styles.betterAvatar, styles.betterAvatarMore].join(' ')}
                        style={{ zIndex: 0 }}>
                        +{extraBetters}
                      </div>
                    )}
                  </div>

                  <div className={styles.rowValue}>
                    <span className={styles.pct}>{t.currentValue.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 20 }} />
      </div>

      <div className={styles.actions}>
        <Button variant="primary" size="large" onClick={startSimulation}>
          ▶ Simulate weekend
        </Button>
      </div>
    </div>
  );
}
