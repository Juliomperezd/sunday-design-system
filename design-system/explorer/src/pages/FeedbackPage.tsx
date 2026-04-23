import { useState } from 'react';
import { Feedback } from '../../../src/components/Feedback/Feedback';
import { Button } from '../../../src/components/Button/Button';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';
import styles from './FeedbackPage.module.css';

export function FeedbackPage() {
  const [visible,      setVisible]      = useState(false);
  const [withSubtitle, setWithSubtitle] = useState(true);
  const [withAction,   setWithAction]   = useState(false);

  const trigger = () => {
    setVisible(false);
    requestAnimationFrame(() => setVisible(true));
  };

  return (
    <Playground
      title="Feedback"
      description="Toast temporal. Aparece 32px sobre el último elemento fijo inferior, dura 3 s y se cierra solo."
      controls={[
        { type: 'toggle', label: 'subtitle',    value: withSubtitle, onChange: setWithSubtitle },
        { type: 'toggle', label: 'with action', value: withAction,   onChange: setWithAction   },
      ]}
    >
      <div className={styles.frame}>
        <div className={styles.trigger}>
          <Button onClick={trigger}>Trigger feedback</Button>
        </div>

        <Feedback
          visible={visible}
          title="Title"
          subtitle={withSubtitle ? 'Subtitle' : undefined}
          icon={<Icon name="check-circle" size={20} variant="active" color="var(--color-content-primary-reversed)" />}
          action={withAction ? { label: 'Action', onClick: () => {} } : undefined}
          bottomOffset={32}
          onDismiss={() => setVisible(false)}
        />
      </div>
    </Playground>
  );
}
