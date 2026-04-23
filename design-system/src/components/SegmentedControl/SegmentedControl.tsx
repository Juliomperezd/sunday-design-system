import styles from './SegmentedControl.module.css';

export interface SegmentedControlProps {
  options: [string, string] | [string, string, string] | [string, string, string, string];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const items: React.ReactNode[] = [];

  options.forEach((option, i) => {
    if (i > 0) {
      const hideDivider = option === value || options[i - 1] === value;
      items.push(
        <div
          key={`divider-${i}`}
          className={[styles.divider, hideDivider ? styles.dividerHidden : ''].filter(Boolean).join(' ')}
        />
      );
    }

    items.push(
      <button
        key={`item-${i}`}
        type="button"
        className={[styles.item, option === value ? styles.active : ''].filter(Boolean).join(' ')}
        onClick={() => onChange(option)}
        aria-pressed={option === value}
      >
        {option}
      </button>
    );
  });

  return <div className={styles.track}>{items}</div>;
}
