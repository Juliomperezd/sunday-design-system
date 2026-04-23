import { Playground } from '../components/Playground/Playground';
import { InlineWidget } from '../../../src/components/InlineWidget/InlineWidget';
import { BarEvolution } from '../../../src/components/BarEvolution/BarEvolution';
import { PerformanceWidgetVertical } from '../../../src/components/PerformanceWidgetVertical/PerformanceWidgetVertical';

const DEMO_DATA = [
  { day: 'Tue', date: 12, value: undefined },
  { day: 'Wed', date: 13, value: undefined },
  { day: 'Thu', date: 14, value: 89 },
  { day: 'Fri', date: 15, value: 68 },
  { day: 'Sat', date: 16, value: 79 },
  { day: 'Sun', date: 17, value: 73 },
  { day: 'Mon', date: 18, value: 66, isToday: true },
];

export function BarEvolutionPage() {
  return (
    <Playground
      title="Bar Evolution"
      description="7-day bar chart for use inside InlineWidget. Bars grow from the bottom; today's column is highlighted."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Standalone */}
        <InlineWidget>
          <BarEvolution data={DEMO_DATA} />
        </InlineWidget>

        {/* Inside PerformanceWidgetVertical */}
        <PerformanceWidgetVertical
          iconName="lightning-01"
          label="Recovery"
          description="Your recovery has been below average this week. Focus on sleep quality and reduce intense training sessions."
          graph={
            <InlineWidget>
              <BarEvolution data={DEMO_DATA} />
            </InlineWidget>
          }
        />
      </div>
    </Playground>
  );
}
