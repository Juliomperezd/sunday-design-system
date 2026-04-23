import styles from './Image.module.css';

export interface ImageProps {
  src: string;
  alt?: string;
}

export function Image({ src, alt = '' }: ImageProps) {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} className={styles.img} />
    </div>
  );
}
