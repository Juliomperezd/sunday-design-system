import styles from './LayoutPage.module.css';

function Gap({ px }: { px: number }) {
  return (
    <div className={styles.gap}>
      <span className={styles.gapLabel}>{px}px</span>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Layout system</h1>
        <p className={styles.desc}>
          Every screen is structured in three nested levels: <strong>Section › Bloc › Item</strong>.
          Spacing between levels is fixed and non-negotiable.
        </p>
      </div>

      {/* ── Diagram ── */}
      <div className={styles.diagram}>

        {/* Section */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>
            <span className={styles.badge} data-level="section">Section</span>
            <span className={styles.rule}>Full width · optional SectionHeader · gap 32px between sections</span>
          </div>

          <div className={styles.sectionHeader}>
            <span className={styles.badge} data-level="header">SectionHeader</span>
            <span className={styles.rule}>Optional · level="category" / h3 / etc.</span>
          </div>

          <Gap px={16} />

          {/* Bloc 1 */}
          <div className={styles.bloc}>
            <div className={styles.blocLabel}>
              <span className={styles.badge} data-level="bloc">Bloc</span>
              <span className={styles.rule}>gap 8px between items</span>
            </div>
            <div className={styles.item}>
              <span className={styles.badge} data-level="item">Item</span>
            </div>
            <Gap px={8} />
            <div className={styles.item}>
              <span className={styles.badge} data-level="item">Item</span>
            </div>
            <Gap px={8} />
            <div className={styles.item}>
              <span className={styles.badge} data-level="item">Item</span>
            </div>
          </div>

          <Gap px={16} />

          {/* Bloc 2 */}
          <div className={styles.bloc}>
            <div className={styles.blocLabel}>
              <span className={styles.badge} data-level="bloc">Bloc</span>
              <span className={styles.rule}>16px from previous bloc</span>
            </div>
            <div className={styles.item}>
              <span className={styles.badge} data-level="item">Item</span>
            </div>
            <Gap px={8} />
            <div className={styles.item}>
              <span className={styles.badge} data-level="item">Item</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Rules summary ── */}
      <div className={styles.rules}>
        <div className={styles.ruleRow}>
          <span className={styles.ruleColor} data-level="section" />
          <div>
            <p className={styles.ruleName}>Section → Section</p>
            <p className={styles.ruleValue}>32px · <code>var(--spacing-32)</code></p>
          </div>
        </div>
        <div className={styles.ruleRow}>
          <span className={styles.ruleColor} data-level="bloc" />
          <div>
            <p className={styles.ruleName}>SectionHeader → Bloc · Bloc → Bloc</p>
            <p className={styles.ruleValue}>16px · <code>var(--spacing-16)</code></p>
          </div>
        </div>
        <div className={styles.ruleRow}>
          <span className={styles.ruleColor} data-level="item" />
          <div>
            <p className={styles.ruleName}>Item → Item</p>
            <p className={styles.ruleValue}>8px · <code>var(--spacing-8)</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
