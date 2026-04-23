import { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'warning' | 'error' | 'info' | 'success';

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: AlertAction;
  onClose?: () => void;
}

const VARIANT_CLASS: Record<AlertVariant, string> = {
  warning: styles.warning,
  error:   styles.error,
  info:    styles.info,
  success: styles.success,
};

export function Alert({
  variant = 'info',
  title,
  subtitle,
  icon,
  action,
  onClose,
}: AlertProps) {
  return (
    <div className={[styles.alert, VARIANT_CLASS[variant]].join(' ')} role="alert">
      {/* Close */}
      {onClose && (
        <button className={styles.close} onClick={onClose} aria-label="Dismiss">
          ×
        </button>
      )}

      {/* Header row: icon + title */}
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.title}>{title}</span>
      </div>

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {/* Action button */}
      {action && (
        <button className={styles.action} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
