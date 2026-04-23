import { ReactNode, useState } from 'react';
import styles from './Playground.module.css';

export type ControlDef =
  | { type: 'select'; label: string; options: string[]; value: string; onChange: (v: string) => void }
  | { type: 'toggle'; label: string; value: boolean; onChange: (v: boolean) => void };

interface PlaygroundProps {
  title: string;
  description?: string;
  controls: ControlDef[];
  children: ReactNode;
}

export function Playground({ title, description, controls, children }: PlaygroundProps) {
  const [iteration, setIteration] = useState(0);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {/* Controls bar */}
      <div className={styles.controls}>
        {controls.map((ctrl) =>
          ctrl.type === 'select' ? (
            <label key={ctrl.label} className={styles.control}>
              <span className={styles.controlLabel}>{ctrl.label}</span>
              <select
                className={styles.select}
                value={ctrl.value}
                onChange={(e) => ctrl.onChange(e.target.value)}
              >
                {ctrl.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>
          ) : (
            <label key={ctrl.label} className={styles.control}>
              <span className={styles.controlLabel}>{ctrl.label}</span>
              <button
                className={[styles.toggle, ctrl.value ? styles.toggleOn : ''].join(' ')}
                onClick={() => ctrl.onChange(!ctrl.value)}
                aria-pressed={ctrl.value}
              >
                <span className={styles.toggleThumb} />
              </button>
            </label>
          )
        )}

        <button className={styles.reloadBtn} onClick={() => setIteration(i => i + 1)} title="Replay animations">
          ↺
        </button>
      </div>

      {/* Canvas */}
      <div className={styles.canvas}>
        <div key={iteration} className={styles.canvasInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
