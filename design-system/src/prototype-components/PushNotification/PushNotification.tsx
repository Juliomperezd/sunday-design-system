import { ReactNode } from 'react';
import styles from './PushNotification.module.css';

export interface PushNotificationProps {
  appName?: string;
  appIcon?: ReactNode;
  time?: string;
  title: string;
  body?: string;
  onClick?: () => void;
}

export function PushNotification({
  appName = 'App',
  appIcon,
  time = 'ahora',
  title,
  body,
  onClick,
}: PushNotificationProps) {
  return (
    <div
      className={[styles.notification, onClick ? styles.clickable : ''].join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Top row: icon + meta */}
      <div className={styles.meta}>
        <div className={styles.iconWrap}>
          {appIcon ?? <span className={styles.iconFallback} />}
        </div>
        <span className={styles.appName}>{appName}</span>
        <span className={styles.dot}>·</span>
        <span className={styles.time}>{time}</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {body && <p className={styles.body}>{body}</p>}
      </div>
    </div>
  );
}
