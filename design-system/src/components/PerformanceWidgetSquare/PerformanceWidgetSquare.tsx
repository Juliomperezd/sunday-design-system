import styles from './PerformanceWidgetSquare.module.css';
import { Icon } from '../../prototype-components/Icon/Icon';
import type { IconName } from '../../prototype-components/Icon/Icon';

export interface PerformanceWidgetSquareProps {
  iconName: IconName;
  label: string;
  value: string | number;
  description?: string;
}

export function PerformanceWidgetSquare({
  iconName,
  label,
  value,
  description,
}: PerformanceWidgetSquareProps) {
  return (
    <div className={styles.widget}>
      {/* Top row: icon + label */}
      <div className={styles.header}>
        <Icon name={iconName} size={16} variant="default" />
        <span className={styles.label}>{label}</span>
      </div>

      {/* Large value */}
      <span className={styles.value}>{value}</span>

      {/* Spacer */}
      <div className={styles.spacer} />

      {/* Bottom description */}
      {description && (
        <span className={styles.description}>{description}</span>
      )}
    </div>
  );
}
