import styles from './AssetsPage.module.css';

// Auto-discovers all images under design-system/assets/**
// Add PNGs/JPGs/SVGs to assets/{prototype-name}/ and they appear here automatically
const modules = import.meta.glob<string>(
  '../../../assets/**/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, query: '?url', import: 'default' }
);

interface AssetItem {
  name: string;
  url: string;
}

function buildGroups(): Record<string, AssetItem[]> {
  const groups: Record<string, AssetItem[]> = {};
  for (const [path, url] of Object.entries(modules)) {
    // path: '../../assets/onboarding/splash.png'
    const parts = path.replace('../../assets/', '').split('/');
    const group = parts.length > 1 ? parts[0] : 'General';
    const name = parts[parts.length - 1];
    if (!groups[group]) groups[group] = [];
    groups[group].push({ name, url });
  }
  return groups;
}

const groups = buildGroups();
const hasAssets = Object.keys(groups).length > 0;

export function AssetsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Assets</h1>
        <p className={styles.description}>
          Imágenes y recursos por prototipo. Añade archivos en{' '}
          <code className={styles.code}>design-system/assets/{'{prototype}/'}</code> y aparecen aquí automáticamente.
        </p>
      </div>

      {!hasAssets && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No hay assets todavía</p>
          <p className={styles.emptyHint}>
            Añade imágenes en <code className={styles.code}>design-system/assets/onboarding/</code>
          </p>
        </div>
      )}

      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className={styles.group}>
          <h2 className={styles.groupTitle}>{group}/</h2>
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.name} className={styles.card}>
                <div className={styles.preview}>
                  <img src={item.url} alt={item.name} className={styles.img} />
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.filename}>{item.name}</span>
                  <a
                    href={item.url}
                    download={item.name}
                    className={styles.downloadBtn}
                  >
                    ↓
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
