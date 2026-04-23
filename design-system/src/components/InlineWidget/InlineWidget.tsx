import styles from './InlineWidget.module.css';

export interface InlineWidgetProps {
  children: React.ReactNode;
}

export function InlineWidget({ children }: InlineWidgetProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
