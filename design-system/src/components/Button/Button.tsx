import { IconContainer } from '../IconContainer/IconContainer';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'small';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'large',
  disabled = false,
  icon,
  trailingIcon,
  children,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        disabled ? styles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && <IconContainer>{icon}</IconContainer>}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <IconContainer>{trailingIcon}</IconContainer>}
    </button>
  );
}
