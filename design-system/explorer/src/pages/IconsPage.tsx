import { useState } from 'react';
import styles from './IconsPage.module.css';

const defaultModules = import.meta.glob<string>('../../../icons/default/*.svg', {
  eager: true, query: '?raw', import: 'default',
});
const activeModules = import.meta.glob<string>('../../../icons/active/*.svg', {
  eager: true, query: '?raw', import: 'default',
});

interface IconItem { name: string; raw: string; }

function buildList(modules: Record<string, string>): IconItem[] {
  return Object.entries(modules)
    .map(([path, raw]) => ({ name: path.split('/').pop()!.replace('.svg', ''), raw }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const defaultIcons = buildList(defaultModules);
const activeIcons  = buildList(activeModules);

export function IconsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  function copy(name: string) {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  }

  function filter(list: IconItem[]) {
    return list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }

  const totalCount = defaultIcons.length + activeIcons.length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>Icons</h1>
            <p className={styles.description}>
              {totalCount} icon{totalCount !== 1 ? 's' : ''} en{' '}
              <code className={styles.code}>icons/default/</code> e{' '}
              <code className={styles.code}>icons/active/</code>.
            </p>
          </div>
          {totalCount > 0 && (
            <input
              className={styles.search}
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
      </div>

      <IconSection
        title="Active"
        subtitle="color-content-primary"
        icons={filter(activeIcons)}
        copied={copied}
        onCopy={copy}
        colorVar="var(--color-content-primary)"
      />

      <IconSection
        title="Default"
        subtitle="color-content-secondary"
        icons={filter(defaultIcons)}
        copied={copied}
        onCopy={copy}
        colorVar="var(--color-content-secondary)"
      />
    </div>
  );
}

function IconSection({
  title, subtitle, icons, copied, onCopy, colorVar,
}: {
  title: string;
  subtitle: string;
  icons: IconItem[];
  copied: string | null;
  onCopy: (name: string) => void;
  colorVar: string;
}) {
  if (icons.length === 0) return null;
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>{title}</span>
        <code className={styles.sectionSubtitle}>{subtitle}</code>
      </div>
      <div className={styles.grid}>
        {icons.map((icon) => (
          <button
            key={icon.name}
            className={[styles.card, copied === icon.name ? styles.cardCopied : ''].join(' ')}
            onClick={() => onCopy(icon.name)}
            title={`Copiar nombre: ${icon.name}`}
          >
            <span
              className={styles.preview}
              style={{ color: colorVar }}
              dangerouslySetInnerHTML={{ __html: icon.raw }}
            />
            <span className={styles.name}>
              {copied === icon.name ? '✓ copiado' : icon.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
