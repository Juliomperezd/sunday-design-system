import styles from './Divider.module.css';

export type DividerVariant = 'simple' | 'large';

export interface DividerProps {
  variant?: DividerVariant;
}

export function Divider({ variant = 'simple' }: DividerProps) {
  return <div className={[styles.divider, styles[variant]].join(' ')} />;
}
