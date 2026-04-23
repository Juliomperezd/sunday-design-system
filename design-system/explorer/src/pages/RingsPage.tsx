import { useState } from 'react';
import { Rings } from '../../../src/components/Rings/Rings';
import { Icon } from '../../../src/prototype-components/Icon/Icon';
import { Playground } from '../components/Playground/Playground';

const VALUE_OPTIONS = ['0', '25', '50', '75', '100'];

export function RingsPage() {
  const [outerFill,  setOuterFill]  = useState(70);
  const [middleFill, setMiddleFill] = useState(55);
  const [innerFill,  setInnerFill]  = useState(80);

  return (
    <Playground
      title="Rings"
      description="3 anillos concéntricos. Externo: content-sunday · Medio: content-success · Interno: content-info. Track en bg-secondary."
      controls={[
        {
          type: 'select',
          label: 'Outer fill',
          options: VALUE_OPTIONS,
          value: String(outerFill),
          onChange: (v) => setOuterFill(Number(v)),
        },
        {
          type: 'select',
          label: 'Middle fill',
          options: VALUE_OPTIONS,
          value: String(middleFill),
          onChange: (v) => setMiddleFill(Number(v)),
        },
        {
          type: 'select',
          label: 'Inner fill',
          options: VALUE_OPTIONS,
          value: String(innerFill),
          onChange: (v) => setInnerFill(Number(v)),
        },
      ]}
    >
      <div style={{ border: '1px dashed rgba(0,0,0,0.2)', display: 'inline-block' }}>
        <Rings
          outer={{
            value: outerFill,
            displayValue: outerFill,
            suffix: '%',
            label: 'sunday usage',
          }}
          middle={{
            value: middleFill,
            displayValue: 572,
            prefix: '$',
            suffix: '.00',
            label: 'tips',
          }}
          inner={{
            value: innerFill,
            displayValue: 25,
            label: (
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name="google" size={12} color="var(--color-content-info)" />
                  5★
                </span>
                <span>reviews</span>
              </span>
            ),
          }}
        />
      </div>
    </Playground>
  );
}
