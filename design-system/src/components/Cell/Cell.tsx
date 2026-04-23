import styles from './Cell.module.css';

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.91205 4.41075C7.23748 4.08531 7.76512 4.08531 8.09056 4.41075L13.0906 9.41075C13.416 9.73619 13.416 10.2638 13.0906 10.5893L8.09056 15.5893C7.76512 15.9147 7.23748 15.9147 6.91205 15.5893C6.58661 15.2638 6.58661 14.7362 6.91205 14.4108L11.3228 10L6.91205 5.58926C6.58661 5.26382 6.58661 4.73619 6.91205 4.41075Z" fill="currentColor"/>
  </svg>
);

export interface CellProps {
  title: string;
  subtitle?: string;
  /** Slot izquierdo — pasar <Thumbnail variant="icon|image" size="sm" … /> */
  thumbnail?: React.ReactNode;
  /** Texto opcional a la derecha — mismo estilo que la izquierda, right-aligned */
  trailingTitle?: string;
  trailingSubtitle?: string;
  /** Muestra un chevron → a la derecha de todo */
  chevron?: boolean;
}

export function Cell({ title, subtitle, thumbnail, trailingTitle, trailingSubtitle, chevron }: CellProps) {
  return (
    <div className={styles.cell}>
      {thumbnail && <div className={styles.thumbnailSlot}>{thumbnail}</div>}
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {trailingTitle && (
        <div className={styles.trailing}>
          <p className={styles.title}>{trailingTitle}</p>
          {trailingSubtitle && <p className={styles.subtitle}>{trailingSubtitle}</p>}
        </div>
      )}
      {chevron && (
        <span className={styles.chevron}>
          <ChevronRight />
        </span>
      )}
    </div>
  );
}
