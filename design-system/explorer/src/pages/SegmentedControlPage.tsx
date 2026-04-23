import { useState } from 'react';
import { SegmentedControl } from '../../../src/components/SegmentedControl/SegmentedControl';
import { Playground } from '../components/Playground/Playground';

const TWO:   [string, string]         = ['List', 'Map'];
const THREE: [string, string, string] = ['Day', 'Week', 'Month'];

export function SegmentedControlPage() {
  const [entries, setEntries] = useState<'2' | '3'>('2');
  const [value2, setValue2] = useState<string>('List');
  const [value3, setValue3] = useState<string>('Day');

  const handleEntries = (v: string) => setEntries(v as '2' | '3');

  return (
    <Playground
      title="Segmented Control"
      description="Selector de opción única. Máximo 3 opciones. Divider entre ítems inactivos adyacentes."
      controls={[
        {
          type: 'select',
          label: 'entries',
          options: ['2', '3'],
          value: entries,
          onChange: handleEntries,
        },
      ]}
    >
      <div style={{ width: '375px', padding: '0 16px' }}>
        {entries === '2'
          ? <SegmentedControl options={TWO}   value={value2} onChange={setValue2} />
          : <SegmentedControl options={THREE} value={value3} onChange={setValue3} />
        }
      </div>
    </Playground>
  );
}
