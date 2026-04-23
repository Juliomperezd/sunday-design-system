import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { PoweredBy } from '../../../src/prototype-components/PoweredBy/PoweredBy';

export function PoweredByPage() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  return (
    <Playground
      title="Powered By"
      description="Sunday wordmark/attribution logo. Two variants: dark (for light backgrounds) and light (for dark backgrounds)."
      controls={[
        {
          label: 'Mode',
          type: 'select',
          options: ['dark', 'light'],
          value: mode,
          onChange: (v) => setMode(v as 'dark' | 'light'),
        },
      ]}
    >
      <div style={{
        padding: 32,
        borderRadius: 12,
        background: mode === 'light' ? '#1a1a1a' : '#ffffff',
        transition: 'background 200ms ease',
      }}>
        <PoweredBy mode={mode} />
      </div>
    </Playground>
  );
}
