import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import styles from './Feedback.module.css';

export interface FeedbackAction {
  label: string;
  onClick: () => void;
}

export interface FeedbackProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action?: FeedbackAction;
  /** px from the bottom of the viewport. Default: 32 */
  bottomOffset?: number;
  onDismiss?: () => void;
}

type AnimState = 'hidden' | 'visible' | 'leaving';

const DISPLAY_MS  = 3000;
const EXIT_MS     = 280;

export function Feedback({
  visible,
  title,
  subtitle,
  icon,
  action,
  bottomOffset = 32,
  onDismiss,
}: FeedbackProps) {
  const [animState, setAnimState] = useState<AnimState>('hidden');

  useEffect(() => {
    if (!visible) return;
    setAnimState('visible');

    const exitTimer = setTimeout(() => setAnimState('leaving'), DISPLAY_MS);
    return () => clearTimeout(exitTimer);
  }, [visible]);

  useEffect(() => {
    if (animState !== 'leaving') return;
    const hideTimer = setTimeout(() => {
      setAnimState('hidden');
      onDismiss?.();
    }, EXIT_MS);
    return () => clearTimeout(hideTimer);
  }, [animState, onDismiss]);

  if (animState === 'hidden') return null;

  return (
    <div
      className={[styles.feedback, animState === 'leaving' ? styles.leaving : styles.entering].join(' ')}
      style={{ bottom: bottomOffset }}
      role="status"
      aria-live="polite"
    >
      <Thumbnail variant="icon" size="sm" icon={icon} />

      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {action && (
        <Button variant="secondary" size="small" className={styles.actionButton} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
