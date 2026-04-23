import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h2 className={styles.title}>Bienvenido de vuelta</h2>
        <p className={styles.subtitle}>Inicia sesión en tu cuenta</p>
      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); navigate('../home'); }}>
        {/* Placeholder: TextInput del design-system */}
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="hola@ejemplo.com"
            defaultValue="usuario@ejemplo.com"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••••"
            defaultValue="password"
          />
        </div>

        <p className={styles.forgot}>¿Olvidaste tu contraseña?</p>

        {/* Placeholder: Button del design-system */}
        <button className={styles.btn} type="submit">
          Entrar
        </button>
      </form>

      <p className={styles.register}>
        ¿No tienes cuenta?{' '}
        <span className={styles.link}>Regístrate</span>
      </p>
    </div>
  );
}
