import { useState, useEffect } from 'react';
import { Button } from '@mi-org/design-system';
import { PushNotification } from '../../../../../design-system/src/prototype-components/PushNotification/PushNotification';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import { useBets } from '../WeekendBetsContext';
import { INITIAL_TEAMMATES, WINNER_ID } from '../data';
import styles from './SundayNightScreen.module.css';

export function SundayNightScreen() {
  const { userBet, teammates, jumpToSunday } = useBets();
  const [notifIn, setNotifIn] = useState(false);
  const userWon = userBet === WINNER_ID;
  const winner = teammates.find(t => t.id === WINNER_ID) ?? INITIAL_TEAMMATES.find(t => t.id === WINNER_ID)!;

  useEffect(() => {
    const t = setTimeout(() => setNotifIn(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <OSTopBar color="#ffffff" />
      </div>

      <div className={styles.wallpaper}>
        <div className={styles.timeBlock}>
          <p className={styles.time}>10:47</p>
          <p className={styles.date}>Sunday, June 8</p>
        </div>

        <div className={[styles.notifWrap, notifIn ? styles.notifVisible : ''].join(' ')}>
          <PushNotification
            appName="Sunday"
            appIcon={<AppIcon size={32} />}
            time="now"
            title="🏆 You were right! Take your $5 reward"
            body={`${winner.name} got the highest tip — ${winner.finalValue.toFixed(0)}% ($52.00)`}
            onClick={jumpToSunday}
          />
        </div>
      </div>

      <div className={styles.cta}>
        <Button variant="primary" size="large" onClick={jumpToSunday}>
          Jump to Sunday 🌙
        </Button>
      </div>
    </div>
  );
}
