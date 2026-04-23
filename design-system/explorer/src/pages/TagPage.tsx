import { useState } from 'react';
import { Tag, TagVariant } from '../../../src/components/Tag/Tag';
import { Playground } from '../components/Playground/Playground';

export function TagPage() {
  const [variant, setVariant] = useState<TagVariant>('default');

  return (
    <Playground
      title="Tag"
      description="Etiqueta de estado o categoría. 6 variantes. Tipografía body-s medium."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['default', 'sunday', 'success', 'error', 'warning', 'info'],
          value: variant,
          onChange: (v) => setVariant(v as TagVariant),
        },
      ]}
    >
      <Tag variant={variant}>Label</Tag>
    </Playground>
  );
}
