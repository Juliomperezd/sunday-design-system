import { useNavigate } from 'react-router-dom';
import { Button, SectionHeader } from '@mi-org/design-system';
import { OSTopBar } from '../../../../../design-system/src/prototype-components/OSTopBar/OSTopBar';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useMicrogoals } from '../MicrogoalsContext';
import styles from './GuestCheckingScreen.module.css';

export function GuestCheckingScreen() {
  const navigate = useNavigate();
  const { completed, markComplete } = useMicrogoals();
  const isDone = completed.has(1);

  function handleCTA() {
    if (!isDone) markComplete(1);
    navigate('/microgoals');
  }

  return (
    <div className={styles.screen}>
      {/* Full-bleed hero image with overlaid back button */}
      <div className={styles.heroImage}>
        <img
          src="/assets/microgoals/quest1.png"
          alt=""
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}>
          <OSTopBar color="#ffffff" />
          <button className={styles.backBtn} onClick={() => navigate('/microgoals')}>
            <Icon name="chevron-left" size={20} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className={styles.scroll}>
        <div className={styles.content}>
          <div className={styles.rewardPill}>
            <span className={styles.rewardLabel}>You'll win</span>
            <span className={styles.rewardAmount}>$5</span>
          </div>

          <SectionHeader
            level="h1"
            subtitle="Guests love Sunday, but they need to know it's an option. Introduce it in your next interaction and earn your reward."
          >
            Get your first guest checking their bill with their phone
          </SectionHeader>
        </div>

        <div style={{ height: 80 }} />
      </div>

      <div className={styles.bottom}>
        <Button variant="primary" size="large">
          How to present the QR to Guests
        </Button>
      </div>
    </div>
  );
}
