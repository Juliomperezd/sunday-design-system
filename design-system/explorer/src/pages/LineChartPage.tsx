import { Playground } from '../components/Playground/Playground';
import { InlineWidget } from '../../../src/components/InlineWidget/InlineWidget';
import { LineChart } from '../../../src/components/LineChart/LineChart';

const DEMO_DATA = [42, 58, 51, 67, 74, 63, 80, 72, 85, 79, 88, 91];

export function LineChartPage() {
  return (
    <Playground
      title="Line Chart"
      description="Animated SVG line chart. Draws left-to-right with particles bursting from the tip and a shake effect. Designed to live inside InlineWidget."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <InlineWidget>
          <LineChart data={DEMO_DATA} />
        </InlineWidget>
      </div>
    </Playground>
  );
}
