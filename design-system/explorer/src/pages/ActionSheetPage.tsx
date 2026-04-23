import { useState } from 'react';
import { ActionSheet } from '../../../src/components/ActionSheet/ActionSheet';
import { Playground } from '../components/Playground/Playground';
import styles from './ActionSheetPage.module.css';

export function ActionSheetPage() {
  const [background,    setBackground]    = useState(true);
  const [secondButton,  setSecondButton]  = useState(false);

  return (
    <Playground
      title="Action Sheet"
      description="Siempre position: fixed al fondo del viewport, por encima de cualquier nav bar."
      controls={[
        {
          type: 'toggle',
          label: 'background',
          value: background,
          onChange: setBackground,
        },
        {
          type: 'toggle',
          label: 'segundo botón',
          value: secondButton,
          onChange: setSecondButton,
        },
      ]}
    >
      {/* transform ancla position:fixed al frame en la preview */}
      <div className={[styles.phone, !background ? styles.phoneDark : ''].filter(Boolean).join(' ')}>
        <div className={styles.screen}>
          <div className={styles.lines}>
            <div className={styles.line} style={{ width: '60%' }} />
            <div className={styles.line} style={{ width: '80%' }} />
            <div className={styles.line} style={{ width: '45%' }} />
          </div>
          <ActionSheet
            background={background}
            primaryAction={{ label: 'Acción principal', onClick: () => {} }}
            secondaryAction={secondButton ? { label: 'Cancelar', onClick: () => {} } : undefined}
          />
        </div>
      </div>
    </Playground>
  );
}
