import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { ShiftPill, ShiftPillVariant } from '../../../src/components/ShiftPill/ShiftPill';

export function ShiftPillPage() {
  const [variant, setVariant] = useState<ShiftPillVariant>('tips');

  return (
    <Playground
      title="Shift Pill"
      description="Pill de turno con dos variantes semánticas: tips y reviews. Fondo degradado desde el color de feedback hacia transparente."
      controls={[
        {
          type: 'select',
          label: 'Variant',
          options: ['tips', 'reviews'],
          value: variant,
          onChange: (v) => setVariant(v as ShiftPillVariant),
        },
      ]}
    >
      <ShiftPill variant={variant} value={variant === 'tips' ? 12 : 47} />
    </Playground>
  );
}
