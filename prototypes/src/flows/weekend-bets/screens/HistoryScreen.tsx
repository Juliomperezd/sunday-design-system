import { Header, SectionHeader } from '@mi-org/design-system';
import { Background } from '../../../../../design-system/src/prototype-components/Background/Background';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useBets } from '../WeekendBetsContext';
import { HISTORY } from '../data';
import styles from './HistoryScreen.module.css';

export function HistoryScreen() {
  const { reset } = useBets();

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
        <div className={styles.section}>
          <SectionHeader level="h2">Past rounds</SectionHeader>

          <div className={styles.list}>
            {HISTORY.map(r => (
              <div key={r.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={[styles.resultBadge, r.userWon ? styles.won : styles.lost].join(' ')}>
                    {r.userWon ? '🏆 Won +$5' : '😅 Lost'}
                  </div>
                  <span className={styles.week}>Week of {r.weekLabel}</span>
                </div>

                <p className={styles.poll}>{r.poll}</p>

                <div className={styles.cardBottom}>
                  <div className={styles.cardDetail}>
                    <span className={styles.detailLabel}>Winner</span>
                    <span className={styles.detailValue}>{r.winnerName} · {r.winnerValue}</span>
                  </div>
                  <div className={styles.cardDetail}>
                    <span className={styles.detailLabel}>Your pick</span>
                    <span className={[styles.detailValue, r.userWon ? styles.pickRight : styles.pickWrong].join(' ')}>
                      {r.userPickName}
                      {r.userWon ? ' ✓' : ' ✗'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.upcomingCard}>
            <span className={styles.upcomingEmoji}>🎰</span>
            <div>
              <p className={styles.upcomingTitle}>Next bet drops Friday</p>
              <p className={styles.upcomingNote}>New poll every Friday — check back then!</p>
            </div>
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
