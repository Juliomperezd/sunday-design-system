import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, SectionHeader, SegmentedControl, Button } from '@mi-org/design-system';
import styles from './ReviewFiguresScreen.module.css';

export function ReviewFiguresScreen() {
  const navigate = useNavigate();
  const [tender, setTender] = useState('By tender');
  const [showDrawer, setShowDrawer] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className={styles.screen}>

      <Header variant="inner" title="Revenues" onBack={() => navigate(-1)} />

      <div className={styles.scroll}>
        <div className={styles.inner}>

          <SegmentedControl
            options={['By tender', 'By server'] as [string, string]}
            value={tender}
            onChange={setTender}
          />

          {/* Hero total */}
          <div className={styles.heroBlock}>
            <SectionHeader level="hero" align="center" subtitle="Total">
              $1.000
            </SectionHeader>
          </div>

          {/* Breakdown row */}
          <div className={styles.figureRow}>
            <SectionHeader level="h2" align="center" subtitle="Sales">
              $800
            </SectionHeader>
            <div className={styles.figureRowDivider} />
            <SectionHeader level="h2" align="center" subtitle="Tips">
              $200
            </SectionHeader>
          </div>

        </div>
      </div>

      {/* Floating sticky button */}
      <div className={styles.floatingBtn}>
        <Button
          variant="primary"
          size="large"
          className={styles.fullWidth}
          onClick={() => setShowDrawer(true)}
        >
          Validate the figures
        </Button>
      </div>

      {/* ── Validate drawer ── */}
      {showDrawer && (
        <div className={styles.overlay} onClick={() => setShowDrawer(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>

            <div className={styles.drawerHandle} />

            <div className={styles.drawerHeaderBlock}>
              <p className={styles.drawerTitle}>Leave a comment for your team</p>
              <p className={styles.drawerSubtitle}>
                Let your accountant know anything they have to take in consideration
              </p>
            </div>

            <div className={styles.drawerBody}>
              <textarea
                className={styles.commentArea}
                placeholder="Write your comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.drawerFooter}>
              <Button
                variant="primary"
                size="large"
                className={styles.fullWidth}
                onClick={() => { setShowDrawer(false); navigate(-1); }}
              >
                Confirm
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
