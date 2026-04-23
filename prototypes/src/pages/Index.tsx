import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PROTOTYPES,
  PrototypeStatus,
  PrototypeMarket,
  PrototypeFor,
} from '../prototypes';
import styles from './Index.module.css';

const STATUSES: PrototypeStatus[] = ['Discovery', 'Aligning', 'Ready to dev'];
const MARKETS: PrototypeMarket[] = ['Francia', 'US'];
const FORS: PrototypeFor[] = ['Managers', 'Servers'];

const STATUS_COLOR: Record<PrototypeStatus, string> = {
  'Discovery': styles.statusDiscovery,
  'Aligning': styles.statusAligning,
  'Ready to dev': styles.statusReady,
};

export function IndexPage() {
  const [activeStatus, setActiveStatus] = useState<PrototypeStatus | ''>('');
  const [activeMarket, setActiveMarket] = useState<PrototypeMarket | ''>('');
  const [activeFor, setActiveFor] = useState<PrototypeFor | ''>('');

  const filtered = useMemo(() => {
    return PROTOTYPES.filter((p) => {
      if (activeStatus && p.status !== activeStatus) return false;
      if (activeMarket && !p.market.includes(activeMarket as PrototypeMarket)) return false;
      if (activeFor && !p.for.includes(activeFor as PrototypeFor)) return false;
      return true;
    });
  }, [activeStatus, activeMarket, activeFor]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>SFS Prototypes</h1>
      </header>

      {/* Filters */}
      <div className={styles.navBar}>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value as PrototypeStatus | '')}
          >
            <option value="">Status: All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>Status: {s}</option>
            ))}
          </select>

          <select
            className={styles.select}
            value={activeMarket}
            onChange={(e) => setActiveMarket(e.target.value as PrototypeMarket | '')}
          >
            <option value="">Market: All</option>
            {MARKETS.map((m) => (
              <option key={m} value={m}>Market: {m}</option>
            ))}
          </select>

          <select
            className={styles.select}
            value={activeFor}
            onChange={(e) => setActiveFor(e.target.value as PrototypeFor | '')}
          >
            <option value="">For: All</option>
            {FORS.map((f) => (
              <option key={f} value={f}>For: {f}</option>
            ))}
          </select>
        </div>
      </div>


      {/* List */}
      <div className={styles.list}>
        {filtered.length === 0 && (
          <p className={styles.empty}>No prototypes match the selected filters.</p>
        )}
        {filtered.map((proto) => (
          <Link key={proto.key} to={proto.path} className={styles.card}>
            <div className={styles.cardInner}>
              <span className={[styles.statusBadge, STATUS_COLOR[proto.status]].join(' ')}>
                {proto.status}
              </span>
              <h2 className={styles.cardName}>{proto.name}</h2>
            </div>
            <span className={styles.cardArrow}>↗</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          This is our internal showcase tool, please don't share with anyone that works outside of sunday. Any doubt, ask{' '}
          <span className={styles.footerMention}>@Julio Perez</span>
        </p>
      </footer>
    </div>
  );
}
