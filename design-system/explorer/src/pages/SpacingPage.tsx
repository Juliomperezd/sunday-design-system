import styles from './SpacingPage.module.css';

const SPACING = [
  { token: '--spacing-4',   value: 4   },
  { token: '--spacing-8',   value: 8   },
  { token: '--spacing-12',  value: 12  },
  { token: '--spacing-16',  value: 16  },
  { token: '--spacing-20',  value: 20  },
  { token: '--spacing-24',  value: 24  },
  { token: '--spacing-32',  value: 32  },
  { token: '--spacing-40',  value: 40  },
  { token: '--spacing-48',  value: 48  },
  { token: '--spacing-56',  value: 56  },
  { token: '--spacing-64',  value: 64  },
  { token: '--spacing-72',  value: 72  },
  { token: '--spacing-80',  value: 80  },
  { token: '--spacing-88',  value: 88  },
  { token: '--spacing-96',  value: 96  },
  { token: '--spacing-104', value: 104 },
  { token: '--spacing-120', value: 120 },
] as const;

export function SpacingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Spacing</h1>
        <p className={styles.description}>
          Escala fija de espaciado. Usar siempre uno de estos tokens — nunca valores arbitrarios.
        </p>
      </div>

      <div className={styles.rows}>
        {SPACING.map(({ token, value }) => (
          <div key={token} className={styles.row}>
            <div className={styles.meta}>
              <code className={styles.tokenName}>{token}</code>
              <span className={styles.px}>{value}px</span>
            </div>
            <div className={styles.barTrack}>
              <div className={styles.bar} style={{ width: value }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
