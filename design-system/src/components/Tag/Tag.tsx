import styles from './Tag.module.css';

export type TagVariant = 'default' | 'sunday' | 'success' | 'error' | 'warning' | 'info';

export interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
}

export function Tag({ variant = 'default', children }: TagProps) {
  return (
    <span className={[styles.tag, styles[variant]].join(' ')}>
      {children}
    </span>
  );
}
