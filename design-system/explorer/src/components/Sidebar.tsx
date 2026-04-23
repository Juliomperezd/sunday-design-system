import { NavSection } from '../App';
import styles from './Sidebar.module.css';

interface SidebarProps {
  nav: NavSection[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function Sidebar({ nav, activeKey, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.logo}>DS</span>
        <span className={styles.title}>Design System</span>
      </div>
      <nav>
        {nav.map((section) => (
          <div key={section.label} className={styles.section}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item.key}>
                  <button
                    className={[styles.item, activeKey === item.key ? styles.active : ''].join(' ')}
                    onClick={() => onSelect(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
