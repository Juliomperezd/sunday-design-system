import { ActionButton } from '../ActionButton/ActionButton';
import { Button } from '../Button/Button';
import { OSTopBar } from '../../prototype-components/OSTopBar/OSTopBar';
import mainBg from './header-main-bg.svg';
import styles from './Header.module.css';

/* ── Chevron Left inline (icons/active/chevron-left.svg) ── */
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0906 4.41075C13.416 4.73619 13.416 5.26382 13.0906 5.58926L8.67981 10L13.0906 14.4108C13.416 14.7362 13.416 15.2638 13.0906 15.5893C12.7651 15.9147 12.2375 15.9147 11.912 15.5893L6.91205 10.5893C6.58661 10.2638 6.58661 9.73619 6.91205 9.41075L11.912 4.41075C12.2375 4.08531 12.7651 4.08531 13.0906 4.41075Z" fill="currentColor"/>
  </svg>
);

export interface HeaderAction {
  icon: React.ReactNode; // siempre variant="icon" en el Header
  onClick?: () => void;
  label?: string;
}

/* ── Inner Pages ── */
export interface HeaderInnerProps {
  variant: 'inner';
  title: string;
  subtitle?: string;
  onBack: () => void;
  /** 1 o 2 ActionIcons a la derecha, separados 8px */
  rightActions?: HeaderAction[];
}

/* ── Main Pages ── */
export interface HeaderMainProps {
  variant: 'main';
  leftButton: {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
  };
  sundayAction: {
    icon: React.ReactNode;
    onClick?: () => void;
  };
  initialsAction: {
    initials: string;
    onClick?: () => void;
  };
}

export type HeaderProps = HeaderInnerProps | HeaderMainProps;

export function Header(props: HeaderProps) {
  if (props.variant === 'inner') {
    const { title, subtitle, onBack, rightActions } = props;
    return (
      <header className={[styles.header, styles.inner].join(' ')}>
        <OSTopBar />
        <div className={styles.innerContent}>
          <ActionButton
            variant="icon"
            icon={<ChevronLeft />}
            onClick={onBack}
            label="Go back"
          />
          <div className={styles.center}>
            <p className={styles.title}>{title}</p>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <div className={styles.rightSlot}>
            {rightActions?.map((action, i) => (
              <ActionButton
                key={i}
                variant="icon"
                icon={action.icon}
                onClick={action.onClick}
                label={action.label}
              />
            ))}
          </div>
        </div>
      </header>
    );
  }

  /* main */
  const { leftButton, sundayAction, initialsAction } = props;
  return (
    <header className={[styles.header, styles.main].join(' ')}>
      <img src={mainBg} aria-hidden="true" className={styles.mainBg} />
      <OSTopBar />
      <div className={styles.mainContent}>
        <Button
          variant="tertiary"
          size="small"
          trailingIcon={leftButton.icon}
          onClick={leftButton.onClick}
        >
          {leftButton.label}
        </Button>
        <div className={styles.rightSlot}>
          <ActionButton
            variant="sunday"
            icon={sundayAction.icon}
            onClick={sundayAction.onClick}
          />
          <ActionButton
            variant="initials"
            initials={initialsAction.initials}
            onClick={initialsAction.onClick}
          />
        </div>
      </div>
    </header>
  );
}
