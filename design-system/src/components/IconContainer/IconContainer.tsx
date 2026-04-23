import styles from './IconContainer.module.css';

export interface IconContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function IconContainer({ children, className }: IconContainerProps) {
  return (
    <span className={[styles.container, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
