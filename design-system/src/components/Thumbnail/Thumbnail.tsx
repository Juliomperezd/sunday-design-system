import styles from './Thumbnail.module.css';

export type ThumbnailVariant = 'image' | 'icon';
export type ThumbnailSize    = 'md' | 'sm';

export type ThumbnailProps =
  | { variant: 'image'; src: string; alt?: string; size?: ThumbnailSize }
  | { variant: 'icon';  icon: React.ReactNode;     size?: ThumbnailSize };

export function Thumbnail(props: ThumbnailProps) {
  const sizeClass = props.size === 'sm' ? styles.sm : styles.md;

  if (props.variant === 'image') {
    return (
      <div className={[styles.thumbnail, styles.image, sizeClass].join(' ')}>
        <img src={props.src} alt={props.alt ?? ''} className={styles.img} />
      </div>
    );
  }

  return (
    <div className={[styles.thumbnail, styles.icon, sizeClass].join(' ')}>
      <span className={styles.iconWrapper}>
        {props.icon}
      </span>
    </div>
  );
}
