import { Icon } from '../../prototype-components/Icon/Icon';
import styles from './PerformanceWidgetVertical.module.css';

export interface PerformanceWidgetVerticalProps {
  iconName: string;
  label: string;
  description: React.ReactNode;
  /** Optional inline graph slot — render between header and description */
  graph?: React.ReactNode;
}

export function PerformanceWidgetVertical({
  iconName,
  label,
  description,
  graph,
}: PerformanceWidgetVerticalProps) {
  return (
    <div className={styles.widget}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Icon name={iconName} size={20} variant="default" />
          <span className={styles.label}>{label}</span>
        </div>
        <Icon name="chevron-right" size={20} variant="active" />
      </div>
      {graph && <div className={styles.graphSlot}>{graph}</div>}
      <p className={styles.description}>{description}</p>
    </div>
  );
}
