import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import { PushNotification } from '../../../../../design-system/src/prototype-components/PushNotification/PushNotification';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import styles from './LockScreen.module.css';

export function LockScreen() {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.screen}>
      <OSTopBar color="#ffffff" />
      <div className={styles.timeBlock}>
        <p className={styles.time}>9:41</p>
        <p className={styles.date}>Wednesday, June 10</p>
      </div>
      <div className={[styles.notifWrap, showNotif ? styles.notifIn : ''].join(' ')}>
        <PushNotification
          appName="Sunday"
          appIcon={<AppIcon size={28} />}
          time="now"
          title="You've got a new surprise pack!"
          body="Open it to discover your reward"
          onClick={() => navigate('/surprise-pack/open')}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.lockIcon}>🔒</div>
        <p className={styles.swipeHint}>Swipe up to unlock</p>
      </div>
    </div>
  );
}
