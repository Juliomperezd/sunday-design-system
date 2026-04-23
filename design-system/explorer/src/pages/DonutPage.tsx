import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { Donut } from '../../../src/components/Donut/Donut';

export function DonutPage() {
  const [value, setValue] = useState(57);

  return (
    <Playground
      title="Donut"
      description="Circular progress chart. 300° arc starting at 7 o'clock. Track in bg-secondary, fill in content-sunday."
      controls={[
        {
          type: 'select',
          label: 'Value',
          value: String(value),
          options: ['0', '25', '57', '75', '100'],
          onChange: (v) => setValue(Number(v)),
        },
      ]}
    >
      <div style={{ border: '1px dashed rgba(0,0,0,0.2)', display: 'inline-block' }}>
        <Donut label="Recovery" value={value} />
      </div>
    </Playground>
  );
}
