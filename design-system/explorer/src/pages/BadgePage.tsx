import { useState } from 'react';
import { Badge, BadgeVariant, BadgeSize } from '../../../src/components/Badge/Badge';
import { Playground } from '../components/Playground/Playground';

export function BadgePage() {
  const [variant, setVariant] = useState<BadgeVariant>('gold');
  const [size, setSize] = useState<BadgeSize>('lg');

  return (
    <Playground
      title="Badge"
      description="Insignia de ranking. 4 variantes (default · gold · silver · bronze) y 2 tamaños. El tamaño lg muestra el número de posición."
      controls={[
        {
          type: 'select',
          label: 'variant',
          options: ['default', 'gold', 'silver', 'bronze'],
          value: variant,
          onChange: (v) => setVariant(v as BadgeVariant),
        },
        {
          type: 'select',
          label: 'size',
          options: ['lg', 'sm'],
          value: size,
          onChange: (v) => setSize(v as BadgeSize),
        },
      ]}
    >
      <Badge variant={variant} size={size} />
    </Playground>
  );
}
