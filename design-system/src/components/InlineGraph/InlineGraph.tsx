import { BarEvolution } from '../BarEvolution/BarEvolution';
import type { BarDay } from '../BarEvolution/BarEvolution';
import { LineChart } from '../LineChart/LineChart';
import type { LineChartDay } from '../LineChart/LineChart';
import { FunnelChart } from '../FunnelChart/FunnelChart';
import type { FunnelStep } from '../FunnelChart/FunnelChart';
export type { LineChartDay, BarDay, FunnelStep };

export type InlineGraphType = 'bar' | 'line' | 'funnel';

interface InlineGraphBarProps {
  type: 'bar';
  data: BarDay[];
  comparisonData?: BarDay[];
  color?: string;
  unit?: string;
}

interface InlineGraphLineProps {
  type: 'line';
  data: LineChartDay[];
  comparisonData?: LineChartDay[];
  color?: string;
}

interface InlineGraphFunnelProps {
  type: 'funnel';
  steps: FunnelStep[];
}

export type InlineGraphProps =
  | InlineGraphBarProps
  | InlineGraphLineProps
  | InlineGraphFunnelProps;

export function InlineGraph(props: InlineGraphProps) {
  if (props.type === 'bar') {
    return (
      <BarEvolution
        data={props.data}
        comparisonData={props.comparisonData}
        barColor={props.color}
        unit={props.unit}
      />
    );
  }

  if (props.type === 'funnel') {
    return <FunnelChart steps={props.steps} />;
  }

  return (
    <LineChart
      data={props.data}
      comparisonData={props.comparisonData}
      color={props.color}
    />
  );
}
