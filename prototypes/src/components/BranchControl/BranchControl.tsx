import styles from './BranchControl.module.css';

interface BranchControlProps {
  branches: string[];
  active: string;
  onChange: (branch: string) => void;
}

export function BranchControl({ branches, active, onChange }: BranchControlProps) {
  return (
    <div className={styles.track}>
      {branches.map((branch) => (
        <button
          key={branch}
          className={[styles.item, branch === active ? styles.itemActive : ''].join(' ')}
          onClick={() => onChange(branch)}
        >
          {branch}
        </button>
      ))}
    </div>
  );
}
