import { Icon } from '../../prototype-components/Icon/Icon';
import styles from './PerformanceWidgetHorizontal.module.css';

export interface PerformanceWidgetHorizontalProps {
  /** Left metric icon name (default variant) */
  iconName: string;
  /** Label shown next to the icon — rendered uppercase */
  label: string;
  /** Primary value (24px heading-xs medium) */
  value: string | number;
  /** Secondary value below the primary (12px body-xs medium, optional) */
  subValue?: string | number;
}

export function PerformanceWidgetHorizontal({
  iconName,
  label,
  value,
  subValue,
}: PerformanceWidgetHorizontalProps) {
  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <Icon name={iconName} size={20} variant="default" />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.values}>
          <span className={styles.value}>{value}</span>
          {subValue !== undefined && (
            <span className={styles.subValue}>{subValue}</span>
          )}
        </div>
        <Icon
          name="triangle-up"
          size={8}
          color="var(--color-content-success)"
        />
      </div>
    </div>
  );
}
