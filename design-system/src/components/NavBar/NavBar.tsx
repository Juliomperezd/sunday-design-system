import { Icon } from '../../prototype-components/Icon/Icon';
import { Divider } from '../Divider/Divider';
import styles from './NavBar.module.css';

export interface NavItem {
  key: string;
  label: string;
  activeIconName: string;
  defaultIconName: string;
}

export interface NavBarProps {
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function NavBar({ items, activeKey, onSelect }: NavBarProps) {
  return (
    <nav className={styles.navbar}>
      <Divider variant="simple" />
      <div className={styles.items}>
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              className={[styles.item, active ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => onSelect(item.key)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                name={active ? item.activeIconName : item.defaultIconName}
                size={20}
                variant={active ? 'active' : 'default'}
              />
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
