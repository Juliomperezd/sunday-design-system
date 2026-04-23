import { useState } from 'react';
import { Divider, DividerVariant } from '../../../src/components/Divider/Divider';
import { Playground } from '../components/Playground/Playground';

export function DividerPage() {
  const [variant, setVariant] = useState<DividerVariant>('simple');

  return (
    <Playground
      title="Divider"
      description="Separador horizontal. Simple: 1px. Large: 8px."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['simple', 'large'],
          value: variant,
          onChange: (v) => setVariant(v as DividerVariant),
        },
      ]}
    >
      <div style={{ width: '375px' }}>
        <Divider variant={variant} />
      </div>
    </Playground>
  );
}
