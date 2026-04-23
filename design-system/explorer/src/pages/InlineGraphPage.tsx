import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { InlineWidget } from '../../../src/components/InlineWidget/InlineWidget';
import { InlineGraph } from '../../../src/components/InlineGraph/InlineGraph';
import type { InlineGraphType, FunnelStep } from '../../../src/components/InlineGraph/InlineGraph';

const BAR_DATA = [
  { day: 'Tue', date: 12, value: undefined },
  { day: 'Wed', date: 13, value: undefined },
  { day: 'Thu', date: 14, value: 89 },
  { day: 'Fri', date: 15, value: 68 },
  { day: 'Sat', date: 16, value: 79 },
  { day: 'Sun', date: 17, value: 73 },
  { day: 'Mon', date: 18, value: 66, isToday: true },
];

const BAR_COMPARISON_DATA = [
  { day: 'Tue', date: 12, value: undefined },
  { day: 'Wed', date: 13, value: undefined },
  { day: 'Thu', date: 14, value: 70 },
  { day: 'Fri', date: 15, value: 52 },
  { day: 'Sat', date: 16, value: 61 },
  { day: 'Sun', date: 17, value: 55 },
  { day: 'Mon', date: 18, value: 48, isToday: true },
];

const LINE_DATA = [
  { day: 'Tue', date: 18, value: 62 },
  { day: 'Wed', date: 19, value: 58 },
  { day: 'Thu', date: 20, value: 71 },
  { day: 'Fri', date: 21, value: 65 },
  { day: 'Sat', date: 22, value: 80 },
  { day: 'Sun', date: 23, value: 74 },
  { day: 'Mon', date: 24, value: 88 },
];

const LINE_COMPARISON_DATA = [
  { day: 'Tue', date: 18, value: 38 },
  { day: 'Wed', date: 19, value: 55 },
  { day: 'Thu', date: 20, value: 30 },
  { day: 'Fri', date: 21, value: 48 },
  { day: 'Sat', date: 22, value: 25 },
  { day: 'Sun', date: 23, value: 52 },
  { day: 'Mon', date: 24, value: 35 },
];

const FUNNEL_STEPS: FunnelStep[] = [
  { label: 'Guests you served', value: 1000 },
  { label: 'Saw their bill with their phone', value: 500 },
  { label: 'Paid with Sunday', value: 475 },
];

const TYPES: InlineGraphType[] = ['bar', 'line', 'funnel'];

export function InlineGraphPage() {
  const [type, setType] = useState<InlineGraphType>('bar');
  const [comparison, setComparison] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const isFunnel = type === 'funnel';

  return (
    <Playground
      title="Inline Graph"
      description="Animated data graph designed to live inside InlineWidget or PerformanceWidgetVertical. Three variants: bar (7-day), line (continuous), and funnel."
      controls={[
        {
          label: 'Type',
          type: 'select',
          options: TYPES,
          value: type,
          onChange: (v) => { setType(v as InlineGraphType); setComparison(false); },
        },
        ...(!isFunnel ? [{
          label: 'Comparison',
          type: 'toggle' as const,
          value: comparison,
          onChange: setComparison,
        }] : []),
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
          <InlineWidget>
            {type === 'bar' && (
              <InlineGraph key={animKey} type="bar" data={BAR_DATA} comparisonData={comparison ? BAR_COMPARISON_DATA : undefined} />
            )}
            {type === 'line' && (
              <InlineGraph key={animKey} type="line" data={LINE_DATA} comparisonData={comparison ? LINE_COMPARISON_DATA : undefined} />
            )}
            {type === 'funnel' && (
              <InlineGraph key={animKey} type="funnel" steps={FUNNEL_STEPS} />
            )}
          </InlineWidget>
        </div>
        <button
          onClick={() => setAnimKey(k => k + 1)}
          style={{
            padding: '6px 14px',
            fontSize: 12,
            fontFamily: 'inherit',
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: 6,
            cursor: 'pointer',
            color: 'rgba(0,0,0,0.58)',
          }}
        >
          ↺ Reset animation
        </button>
      </div>
    </Playground>
  );
}
