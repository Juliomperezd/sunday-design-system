import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import { PushNotification } from '../../../../../design-system/src/prototype-components/PushNotification/PushNotification';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import styles from './PushScreen.module.css';

export function PushScreen() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.screen}>
      <OSTopBar color="rgba(255,255,255,0.9)" />

      {/* Lock screen time */}
      <div className={styles.lockInfo}>
        <p className={styles.time}>9:41</p>
        <p className={styles.date}>Sunday, April 27</p>
      </div>

      {/* Push notification */}
      <div className={`${styles.notifWrap} ${visible ? styles.notifVisible : ''}`}>
        <PushNotification
          appName="Sunday"
          appIcon={<AppIcon size={20} />}
          time="now"
          title="Your shift is over 🎉"
          body="Tap to see your end-of-service summary."
          onClick={() => navigate('summary')}
        />
      </div>
    </div>
  );
}
