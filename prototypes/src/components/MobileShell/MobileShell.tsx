import { useNavigate } from 'react-router-dom';
import { PrototypeEntry } from '../../prototypes';
import { BranchControl } from '../BranchControl/BranchControl';
import styles from './MobileShell.module.css';

interface MobileShellProps {
  children: React.ReactNode;
  prototype: PrototypeEntry;
  resetPath: string;
  branches?: string[];
  activeBranch?: string;
  onBranchChange?: (branch: string) => void;
}

export function MobileShell({
  children,
  prototype,
  resetPath,
  branches,
  activeBranch,
  onBranchChange,
}: MobileShellProps) {
  const navigate = useNavigate();

  const statusClass =
    prototype.status === 'Discovery'
      ? styles.statusDiscovery
      : prototype.status === 'Aligning'
      ? styles.statusAligning
      : styles.statusReady;

  const hasBranches = branches && branches.length > 0;

  return (
    <div className={[styles.wrapper, hasBranches ? styles.wrapperWithBranches : ''].join(' ')}>
      {/* Left col: back + branch control */}
      <div className={styles.leftCol}>
        <button className={styles.back} onClick={() => navigate('/')}>
          <span className={styles.backArrow}>←</span>
        </button>

        {hasBranches && (
          <div className={styles.branchWrap}>
            <p className={styles.branchLabel}>Branch</p>
            <BranchControl
              branches={branches}
              active={activeBranch ?? branches[0]}
              onChange={onBranchChange ?? (() => {})}
            />
          </div>
        )}
      </div>

      {/* Phone */}
      <div className={styles.phoneArea}>
        <div className={styles.phone}>
          <div className={styles.notch}>
            <div className={styles.notchCamera} />
            <div className={styles.notchSpeaker} />
          </div>
          <div className={styles.screen}>{children}</div>
        </div>
      </div>

      {/* Info panel */}
      <aside className={styles.panel}>
        <p className={styles.panelLabel}>Project info</p>

        <div className={styles.panelSection}>
          <p className={styles.panelProjectName}>{prototype.name}</p>

          <span className={[styles.statusBadge, statusClass].join(' ')}>
            {prototype.status}
          </span>

          {prototype.notionUrl && (
            <a
              href={prototype.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.notionLink}
            >
              ↗ Notion page
            </a>
          )}

          <a
            href={prototype.prdUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={[styles.prdLink, !prototype.prdUrl ? styles.prdLinkEmpty : ''].join(' ')}
            onClick={!prototype.prdUrl ? (e) => e.preventDefault() : undefined}
          >
            ↗ Link to PRD
          </a>

          {prototype.info && (
            <p className={styles.panelInfo}>{prototype.info}</p>
          )}
        </div>

        <div className={styles.panelFooter}>
          <p className={styles.doubt}>
            Any doubt? Ask{' '}
            <span className={styles.mention}>@JulioPerez</span> (Design){' '}
            <span className={styles.mention}>@EricBloomquist</span> &amp;{' '}
            <span className={styles.mention}>@Mathieu Bayonne</span> (Product)
          </p>

          <button
            className={styles.resetBtn}
            onClick={() => navigate(resetPath, { replace: true })}
          >
            Reset Prototype
          </button>
        </div>
      </aside>
    </div>
  );
}
