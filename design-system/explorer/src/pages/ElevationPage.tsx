import styles from './ElevationPage.module.css';

const ELEVATIONS = [
  {
    name: 'Elevation 100',
    cssVar: '--elevation-100',
    value: '0 2px 8px 0 rgb(0 0 0 / 0.04)',
    layers: [
      { y: 2, blur: 8, spread: 0, opacity: '4%' },
    ],
  },
  {
    name: 'Elevation 200',
    cssVar: '--elevation-200',
    value: '0 4px 24px 0 rgb(0 0 0 / 0.08)',
    layers: [
      { y: 4, blur: 24, spread: 0, opacity: '8%' },
    ],
  },
  {
    name: 'Elevation 300',
    cssVar: '--elevation-300',
    value: '0 2px 8px 0 rgb(0 0 0 / 0.04), 0 12px 40px 0 rgb(0 0 0 / 0.12)',
    layers: [
      { y: 2,  blur: 8,  spread: 0, opacity: '4%' },
      { y: 12, blur: 40, spread: 0, opacity: '12%' },
    ],
  },
] as const;

export function ElevationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Elevation</h1>
        <p className={styles.description}>
          3 niveles de sombra. Usar siempre uno de estos — nunca valores personalizados.
        </p>
      </div>

      <div className={styles.grid}>
        {ELEVATIONS.map((el) => (
          <div key={el.name} className={styles.card}>
            {/* Preview */}
            <div className={styles.preview}>
              <div className={styles.box} style={{ boxShadow: el.value }} />
            </div>

            {/* Info */}
            <div className={styles.info}>
              <p className={styles.name}>{el.name}</p>
              <code className={styles.var}>{el.cssVar}</code>

              <div className={styles.layers}>
                {el.layers.map((layer, i) => (
                  <div key={i} className={styles.layer}>
                    <span className={styles.layerLabel}>Layer {i + 1}</span>
                    <span className={styles.layerSpec}>
                      X 0 · Y {layer.y} · Blur {layer.blur} · Spread {layer.spread} · #000 {layer.opacity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
