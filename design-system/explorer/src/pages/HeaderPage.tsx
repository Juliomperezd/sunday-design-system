import { useState } from 'react';
import { Header } from '../../../src/components/Header/Header';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';
import styles from './HeaderPage.module.css';

export function HeaderPage() {
  const [variant,      setVariant]      = useState<'inner' | 'main'>('inner');
  const [withSubtitle, setWithSubtitle] = useState(false);
  const [rightCount,   setRightCount]   = useState<'0' | '1' | '2'>('1');

  const innerRightActions = rightCount === '0' ? [] : rightCount === '1'
    ? [{ icon: <Icon name="bell-02"     size={20} variant="active" />, onClick: () => {} }]
    : [
        { icon: <Icon name="bell-02"     size={20} variant="active" />, onClick: () => {} },
        { icon: <Icon name="settings-01" size={20} variant="active" />, onClick: () => {} },
      ];

  return (
    <Playground
      title="Header"
      description="64px de alto. Inner: chevron + título centrado. Main: button tertiary izq + 2 ActionIcons der."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['inner', 'main'],
          value: variant,
          onChange: (v) => setVariant(v as 'inner' | 'main'),
        },
        ...(variant === 'inner' ? [
          { type: 'toggle' as const, label: 'subtitle', value: withSubtitle, onChange: setWithSubtitle },
          {
            type: 'select' as const,
            label: 'right icons',
            options: ['0', '1', '2'],
            value: rightCount,
            onChange: (v: string) => setRightCount(v as '0' | '1' | '2'),
          },
        ] : []),
      ]}
    >
      <div className={styles.frame}>
        {variant === 'inner' ? (
          <Header
            variant="inner"
            title="Page title"
            subtitle={withSubtitle ? 'Subtitle' : undefined}
            onBack={() => {}}
            rightActions={innerRightActions}
          />
        ) : (
          <Header
            variant="main"
            leftButton={{
              label: 'Q2 · 2026',
              icon: <Icon name="chevron-down" size={20} variant="active" />,
              onClick: () => {},
            }}
            sundayAction={{
              icon: <Icon name="check-circle" size={20} color="var(--color-content-primary-reversed)" />,
              onClick: () => {},
            }}
            initialsAction={{
              initials: 'JD',
              onClick: () => {},
            }}
          />
        )}
      </div>
    </Playground>
  );
}
