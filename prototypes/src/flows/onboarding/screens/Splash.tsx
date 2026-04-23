import { useNavigate } from 'react-router-dom';
import styles from './Splash.module.css';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={styles.logo}>
        {/* Placeholder logo */}
        <div className={styles.logoMark}>M</div>
        <h1 className={styles.appName}>MyApp</h1>
        <p className={styles.tagline}>Tu app favorita</p>
      </div>

      <div className={styles.footer}>
        {/* Placeholder: aquí iría Button del design-system */}
        <button className={styles.btn} onClick={() => navigate('../login')}>
          Empezar
        </button>
        <p className={styles.hint}>¿Ya tienes cuenta? <span className={styles.link}>Inicia sesión</span></p>
      </div>
    </div>
  );
}
