import { Icon } from '../../prototype-components/Icon/Icon';
import styles from './ShiftPill.module.css';

export type ShiftPillVariant = 'tips' | 'reviews';

export interface ShiftPillProps {
  variant: ShiftPillVariant;
  value: number;
}

const VARIANT_CONFIG: Record<ShiftPillVariant, { iconName: string; color: string; className: string }> = {
  tips: {
    iconName: 'coins-02',
    color: 'var(--color-content-success)',
    className: styles.tips,
  },
  reviews: {
    iconName: 'google',
    color: 'var(--color-content-info)',
    className: styles.reviews,
  },
};

function formatValue(variant: ShiftPillVariant, value: number): string {
  if (variant === 'tips') return `$${value}.00`;
  return `${value}`;
}

export function ShiftPill({ variant, value }: ShiftPillProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div className={`${styles.pill} ${config.className}`}>
      <Icon name={config.iconName} size={20} color={config.color} />
      <span className={styles.duration} style={{ color: config.color }}>{formatValue(variant, value)}</span>
    </div>
  );
}
