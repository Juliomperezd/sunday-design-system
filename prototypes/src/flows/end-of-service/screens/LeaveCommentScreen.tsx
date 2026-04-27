import { useNavigate } from 'react-router-dom';
import { Header, Button, NavBar } from '@mi-org/design-system';
import type { NavItem } from '@mi-org/design-system';
import styles from './InteriorScreen.module.css';

const NAV_ITEMS: NavItem[] = [
  { key: 'home',           label: 'Home',           activeIconName: 'home-05-1',      defaultIconName: 'home-05'        },
  { key: 'performance',    label: 'Performance',    activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01'   },
  { key: 'challenges',     label: 'Challenges',     activeIconName: 'rocket-02-1',    defaultIconName: 'rocket-02'      },
  { key: 'end-of-service', label: 'End of service', activeIconName: 'check-circle',   defaultIconName: 'check-circle'   },
];

export function LeaveCommentScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <Header variant="inner" title="Leave a comment" onBack={() => navigate(-1)} />

      <div className={styles.scroll}>
        <div className={styles.inner}>
          <p className={styles.hint}>Leave a note about tonight's service for your manager.</p>
          <textarea className={styles.textarea} placeholder="Write your comment…" rows={5} />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <Button variant="primary" size="large" className={styles.fullWidth}>
          Send comment
        </Button>
      </div>

      <NavBar items={NAV_ITEMS} activeKey="end-of-service" onSelect={() => {}} embedded />
    </div>
  );
}
