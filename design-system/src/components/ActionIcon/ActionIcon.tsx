import styles from './ActionIcon.module.css';

export interface ActionIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  label?: string;
}

export function ActionIcon({ icon, onClick, label }: ActionIconProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={label}
    >
      <span className={styles.iconWrapper}>{icon}</span>
    </button>
  );
}
