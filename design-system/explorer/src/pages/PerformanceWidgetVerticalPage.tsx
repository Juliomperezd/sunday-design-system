import { useState } from 'react';
import { Playground } from '../components/Playground/Playground';
import { PerformanceWidgetVertical } from '../../../src/components/PerformanceWidgetVertical/PerformanceWidgetVertical';
import { InlineWidget } from '../../../src/components/InlineWidget/InlineWidget';
import { InlineGraph } from '../../../src/components/InlineGraph/InlineGraph';
import type { FunnelStep } from '../../../src/components/InlineGraph/InlineGraph';
import { ValueDot } from '../../../src/components/ValueDot/ValueDot';

/* ── Bar — TIPS BY DAY (values in $ summing to $572) ── */
const BAR_DATA = [
  { day: 'Tue', date: 12, value: 68 },
  { day: 'Wed', date: 13, value: 84 },
  { day: 'Thu', date: 14, value: 92 },
  { day: 'Fri', date: 15, value: 110 },
  { day: 'Sat', date: 16, value: 88 },
  { day: 'Sun', date: 17, value: 95 },
  { day: 'Mon', date: 18, value: 35, isToday: true },
];

const BAR_COMPARISON_DATA = [
  { day: 'Tue', date: 12, value: 52 },
  { day: 'Wed', date: 13, value: 60 },
  { day: 'Thu', date: 14, value: 70 },
  { day: 'Fri', date: 15, value: 85 },
  { day: 'Sat', date: 16, value: 74 },
  { day: 'Sun', date: 17, value: 78 },
  { day: 'Mon', date: 18, value: 48, isToday: true },
];

/* ── Line — AVG.TIP ── */
const LINE_DATA = [
  { day: 'Tue', date: 12, value: 74 },
  { day: 'Wed', date: 13, value: 82 },
  { day: 'Thu', date: 14, value: 76 },
  { day: 'Fri', date: 15, value: 88 },
  { day: 'Sat', date: 16, value: 80 },
  { day: 'Sun', date: 17, value: 91 },
  { day: 'Mon', date: 18, value: 78 },
];

const LINE_COMPARISON_DATA = [
  { day: 'Tue', date: 12, value: 42 },
  { day: 'Wed', date: 13, value: 50 },
  { day: 'Thu', date: 14, value: 45 },
  { day: 'Fri', date: 15, value: 54 },
  { day: 'Sat', date: 16, value: 47 },
  { day: 'Sun', date: 17, value: 52 },
  { day: 'Mon', date: 18, value: 48 },
];

/* ── Funnel ── */
const FUNNEL_STEPS: FunnelStep[] = [
  { label: 'Guests you served', value: 1000 },
  { label: 'Saw their bill with their phone', value: 500, suffix: '50%' },
  { label: 'Paid with Sunday', value: 475, suffix: '98%' },
];

const FUNNEL_DESCRIPTION = (
  <>
    That means that once your guests saw their bill with their phone,{' '}
    <span style={{ color: 'var(--color-content-sunday)' }}>95%</span>
    {' '}of them chose to pay with sunday.
  </>
);

/* ── Shared description with $750 in success ── */
const TIPS_DESCRIPTION = (
  <>
    If all your guests would have paid with sunday, you would have an extra of{' '}
    <span style={{ color: 'var(--color-content-success)' }}>$750</span>
    .00
  </>
);

const GRAPH_OPTIONS = ['None', 'Bar', 'Line', 'Funnel'];

export function PerformanceWidgetVerticalPage() {
  const [graphType, setGraphType] = useState('None');
  const [comparison, setComparison] = useState(false);
  const [showValueDot, setShowValueDot] = useState(false);

  const showComparison = graphType === 'Bar' || graphType === 'Line';
  const hasGraph = graphType !== 'None';

  const isBar    = graphType === 'Bar';
  const isLine   = graphType === 'Line';
  const isFunnel = graphType === 'Funnel';

  const label = isFunnel ? 'SUNDAY USAGE' : isBar ? 'TIPS BY DAY' : isLine ? 'AVG.TIP' : 'TIPS BY DAY';
  const iconName = isFunnel ? 'qr-code-01' : 'coins-02-1';
  const description = isFunnel ? FUNNEL_DESCRIPTION : TIPS_DESCRIPTION;

  const graph = hasGraph ? (
    <>
      {showValueDot && isLine && (
        <div style={{ display: 'flex', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)' }}>
          <ValueDot label="WITH SUNDAY" value={22.5} unit="%" variant="sunday" />
          {comparison && <ValueDot label="WITH TOAST" value={19.2} unit="%" variant="non-sunday" />}
        </div>
      )}
      {showValueDot && isBar && (
        <div style={{ display: 'flex', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)' }}>
          <ValueDot label="WITH SUNDAY" value={572} unit="$" variant="sunday" />
          {comparison && <ValueDot label="WITH TOAST" value={467} unit="$" variant="non-sunday" />}
        </div>
      )}
      <InlineWidget>
        {isBar    && <InlineGraph type="bar"    data={BAR_DATA}    comparisonData={comparison ? BAR_COMPARISON_DATA : undefined} unit="$" />}
        {isLine   && <InlineGraph type="line"   data={LINE_DATA}   comparisonData={comparison ? LINE_COMPARISON_DATA : undefined} />}
        {isFunnel && <InlineGraph type="funnel" steps={FUNNEL_STEPS} />}
      </InlineWidget>
    </>
  ) : undefined;

  return (
    <Playground
      title="Performance Widget Vertical"
      description="Metric card with icon + label row on top, chevron right, optional graph slot, and a 3-line description below."
      controls={[
        {
          label: 'Graph',
          type: 'select',
          options: GRAPH_OPTIONS,
          value: graphType,
          onChange: (v) => { setGraphType(v); setComparison(false); setShowValueDot(false); },
        },
        ...(showComparison ? [{
          label: 'Comparison',
          type: 'toggle' as const,
          value: comparison,
          onChange: setComparison,
        }] : []),
        ...(hasGraph && !isFunnel ? [{
          label: 'Value Dot',
          type: 'toggle' as const,
          value: showValueDot,
          onChange: setShowValueDot,
        }] : []),
      ]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
        <PerformanceWidgetVertical
          iconName={iconName}
          label={label}
          description={description}
          graph={graph}
        />
      </div>
    </Playground>
  );
}
