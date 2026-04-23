import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { ValueDot } from '../../../src/components/ValueDot/ValueDot';

type Display = 'single' | 'comparison';

export function ValueDotPage() {
  const [display, setDisplay] = useState<Display>('single');

  return (
    <Playground
      title="Value Dot"
      description="Compact metric with a colored dot indicator, label, and large value. Single (sunday) or comparison (sunday + non-sunday) layout."
      controls={[
        {
          label: 'Display',
          type: 'select',
          options: ['single', 'comparison'],
          value: display,
          onChange: (v) => setDisplay(v as Display),
        },
      ]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
        {display === 'single' ? (
          <ValueDot label="Last 7 Days" value={87} variant="sunday" />
        ) : (
          <div style={{ display: 'flex', gap: 0, width: '100%' }}>
            <ValueDot label="Last 7 Days" value={87} variant="sunday" />
            <ValueDot label="Previous" value={74} variant="non-sunday" />
          </div>
        )}
      </div>
    </Playground>
  );
}
