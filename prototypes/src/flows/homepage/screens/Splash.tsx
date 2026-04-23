import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../../../../design-system/src/prototype-components/AppIcon/AppIcon';
import styles from './Splash.module.css';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen} onClick={() => navigate('home')}>
      <AppIcon size={120} />
    </div>
  );
}
