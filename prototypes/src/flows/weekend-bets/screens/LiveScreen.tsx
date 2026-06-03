import { Header, Button, SectionHeader } from '@mi-org/design-system';
import { Background } from '../../../../../design-system/src/prototype-components/Background/Background';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useBets } from '../WeekendBetsContext';
import { POLL_QUESTION, WINNER_ID } from '../data';
import { ResultOverlay } from './ResultOverlay';
import styles from './LiveScreen.module.css';

export function LiveScreen() {
  const { phase, teammates, userBet, isSimulating, hasSimulated, hotCallout, startSimulation, jumpToSunday, reset } = useBets();

  const sorted = [...teammates].sort((a, b) => b.currentValue - a.currentValue);
  const maxVal = Math.max(...teammates.map(t => t.currentValue));
  const leader = sorted[0];

  if (phase === 'result') {
    return <ResultOverlay />;
  }

  return (
    <div className={styles.screen}>
      <Background className={styles.bg} width="100%" height={280} />

      <div className={styles.headerWrap}>
        <Header
          variant="main"
          leftButton={{ label: 'Weekend Bets', icon: <Icon name="chevron-down" size={16} /> }}
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

        {/* Hot callout */}
        {hotCallout && (
          <div className={styles.hotCallout}>
            <span>{hotCallout}</span>
          </div>
        )}

        {/* Standings */}
        <div className={styles.standings}>
          {sorted.map((t, idx) => {
            const isUserBet = t.id === userBet;
            const isLeader = idx === 0 && hasSimulated;
            const barWidth = maxVal > 0 ? (t.currentValue / maxVal) * 100 : 0;

            return (
              <div
                key={t.id}
                className={[
                  styles.row,
                  isUserBet ? styles.rowHighlight : '',
                  isLeader ? styles.rowLeader : '',
                ].join(' ')}
              >
                <span className={styles.rank}>
                  {isLeader ? '🏆' : `#${idx + 1}`}
                </span>

                <div className={styles.rowAvatar} style={{ background: t.color }}>
                  {t.initials}
                </div>

                <div className={styles.rowMain}>
                  <div className={styles.rowNameRow}>
                    <span className={styles.rowName}>{t.name}</span>
                    {isUserBet && (
                      <span className={styles.yourPick}>Your pick</span>
                    )}
                    {isLeader && (
                      <span className={styles.leadingBadge}>Leading</span>
                    )}
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${barWidth}%`,
                        background: isUserBet ? '#FDCB6E' : t.color,
                        transition: isSimulating ? 'width 0.08s linear' : 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>

                <div className={styles.rowValue}>
                  <span className={[styles.pct, isLeader ? styles.pctLeader : ''].join(' ')}>
                    {t.currentValue.toFixed(1)}%
                  </span>
                  <span className={styles.pctLabel}>tip</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value moment callout for winner */}
        {hasSimulated && (
          <div className={styles.valueMoment}>
            <div className={styles.valueMomentAvatar} style={{ background: teammates.find(t => t.id === WINNER_ID)!.color }}>
              {teammates.find(t => t.id === WINNER_ID)!.initials}
            </div>
            <div>
              <p className={styles.valueMomentTitle}>
                {teammates.find(t => t.id === WINNER_ID)!.name} hit{' '}
                <strong>{teammates.find(t => t.id === WINNER_ID)!.finalValue.toFixed(1)}% tip</strong>
              </p>
              <p className={styles.valueMomentSub}>
                That's real money happening at your table. Sunday makes it visible.
              </p>
            </div>
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>

      {/* Bottom actions */}
      <div className={styles.actions}>
        {!hasSimulated && (
          <Button
            variant={isSimulating ? 'secondary' : 'primary'}
            size="large"
            onClick={startSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? '⏳ Simulating weekend…' : '▶ Simulate weekend'}
          </Button>
        )}
        {hasSimulated && (
          <Button variant="primary" size="large" onClick={jumpToSunday}>
            Jump to Sunday 🌙
          </Button>
        )}
        <Button variant="secondary" size="small" onClick={reset}>
          Reset demo
        </Button>
      </div>
    </div>
  );
}
