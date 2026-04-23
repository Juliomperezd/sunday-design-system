import styles from './ActionButton.module.css';

export type ActionButtonProps = (
  | { variant: 'icon';     icon: React.ReactNode }
  | { variant: 'image';    src: string; alt?: string }
  | { variant: 'initials'; initials: string }
  | { variant: 'sunday';   icon: React.ReactNode }
) & {
  onClick?: () => void;
  label?: string;
};

export function ActionButton(props: ActionButtonProps) {
  const { onClick, label } = props;

  return (
    <button
      type="button"
      className={[styles.button, styles[props.variant]].join(' ')}
      onClick={onClick}
      aria-label={label}
    >
      {(props.variant === 'icon' || props.variant === 'sunday') && (
        <span className={styles.iconWrapper}>{props.icon}</span>
      )}
      {props.variant === 'image' && (
        <img src={props.src} alt={props.alt ?? ''} className={styles.img} />
      )}
      {props.variant === 'initials' && (
        <span className={styles.initialsText}>{props.initials}</span>
      )}
    </button>
  );
}
