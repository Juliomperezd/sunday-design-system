import { Button, ButtonVariant } from '../Button/Button';
import { Thumbnail, ThumbnailProps } from '../Thumbnail/Thumbnail';
import styles from './SectionHeader.module.css';

export type SectionHeaderLevel = 'hero' | 'h1' | 'h2' | 'h3' | 'p1' | 'category';
export type SectionHeaderAlign = 'left' | 'center' | 'right';

export interface SectionHeaderAction {
  label: string;
  variant?: ButtonVariant;
  trailingIcon?: React.ReactNode;
  onClick?: () => void;
}

export interface SectionHeaderProps {
  level: SectionHeaderLevel;
  align?: SectionHeaderAlign;
  subtitle?: string;
  action?: SectionHeaderAction;
  thumbnail?: ThumbnailProps;
  children: React.ReactNode;
}

const TAG: Record<SectionHeaderLevel, keyof JSX.IntrinsicElements> = {
  hero:     'h1',
  h1:       'h1',
  h2:       'h2',
  h3:       'h3',
  p1:       'p',
  category: 'p',
};

export function SectionHeader({
  level,
  align = 'left',
  subtitle,
  action,
  thumbnail,
  children,
}: SectionHeaderProps) {
  const Tag = TAG[level];
  return (
    <div className={[styles.wrapper, styles[level], styles[align], action ? styles.withAction : ''].filter(Boolean).join(' ')}>

      {/* Thumbnail — opcional, encima del texto */}
      {thumbnail && <Thumbnail {...thumbnail} />}

      {/* Text block — título + subtítulo */}
      <div className={styles.textBlock}>
        <Tag className={styles.base}>{children}</Tag>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* Action — botón small del DS */}
      {action && (
        <Button
          size="small"
          variant={action.variant ?? 'primary'}
          trailingIcon={action.trailingIcon}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}

    </div>
  );
}
