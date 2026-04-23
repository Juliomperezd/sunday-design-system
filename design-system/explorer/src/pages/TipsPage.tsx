import { useState } from 'react';
import { Tips } from '../../../src/components/Tips/Tips';
import { Playground } from '../components/Playground/Playground';

export function TipsPage() {
  const [percentage, setPercentage] = useState(75);

  return (
    <Playground
      title="Tips"
      description="Semicircle arc gauge showing total tips. Arc fills in color-content-sunday on mount. Amount animates with easeOut."
      controls={[
        {
          type: 'select',
          label: 'Fill %',
          options: ['25', '50', '75', '100'],
          value: String(percentage),
          onChange: (v) => setPercentage(Number(v)),
        },
      ]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box', background: 'var(--color-bg-primary)' }}>
        <Tips
          label="Your tips"
          value={572}
          percentage={percentage}
        />
      </div>
    </Playground>
  );
}
