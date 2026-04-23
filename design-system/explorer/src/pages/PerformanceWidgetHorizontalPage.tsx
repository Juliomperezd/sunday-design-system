import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { PerformanceWidgetHorizontal } from '../../../src/components/PerformanceWidgetHorizontal/PerformanceWidgetHorizontal';

const EXAMPLES = [
  { label: 'HRV',        iconName: 'lightning-01',  value: '40',  subValue: '35' },
  { label: 'Rewards',    iconName: 'coins-02-1',    value: '320', subValue: '280' },
  { label: 'Challenges', iconName: 'rocket-02',     value: '4',   subValue: '6' },
];

export function PerformanceWidgetHorizontalPage() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const ex = EXAMPLES[exampleIdx];

  return (
    <Playground
      title="Performance Widget Horizontal"
      description="Compact metric row: icon + label on the left, primary value + secondary value + trend icon on the right. Background secondary."
      controls={[
        {
          type: 'select',
          label: 'Example',
          value: ex.label,
          options: EXAMPLES.map((e) => e.label),
          onChange: (v) => setExampleIdx(EXAMPLES.findIndex((e) => e.label === v)),
        },
      ]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
        <PerformanceWidgetHorizontal
          iconName={ex.iconName}
          label={ex.label}
          value={ex.value}
          subValue={ex.subValue}
        />
      </div>
    </Playground>
  );
}
