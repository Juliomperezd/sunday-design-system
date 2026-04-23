import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <p className={styles.greetingLabel}>Buenos días 👋</p>
          <h2 className={styles.userName}>Usuario</h2>
        </div>
        {/* Placeholder: Avatar del design-system */}
        <div className={styles.avatar}>U</div>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Destacado</h3>
        {/* Placeholder: Card del design-system */}
        <div className={styles.featuredCard}>
          <p className={styles.cardLabel}>Resumen del día</p>
          <p className={styles.cardValue}>Todo en orden</p>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Acciones rápidas</h3>
        <div className={styles.actions}>
          {['Explorar', 'Favoritos', 'Historial', 'Ajustes'].map((label) => (
            /* Placeholder: IconButton del design-system */
            <button key={label} className={styles.actionBtn}>
              <div className={styles.actionIcon} />
              <span className={styles.actionLabel}>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Reciente</h3>
        <div className={styles.list}>
          {['Elemento 1', 'Elemento 2', 'Elemento 3'].map((item) => (
            /* Placeholder: ListItem del design-system */
            <div key={item} className={styles.listItem}>
              <div className={styles.listItemIcon} />
              <div className={styles.listItemContent}>
                <p className={styles.listItemTitle}>{item}</p>
                <p className={styles.listItemSub}>Descripción de ejemplo</p>
              </div>
              <span className={styles.listItemArrow}>›</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <button className={styles.logoutBtn} onClick={() => navigate('/')}>
          ← Volver al índice
        </button>
      </footer>
    </div>
  );
}
