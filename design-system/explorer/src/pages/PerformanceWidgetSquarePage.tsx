import { Playground } from '../components/Playground/Playground';
import { PerformanceWidgetSquare } from '../../../src/components/PerformanceWidgetSquare/PerformanceWidgetSquare';

const EXAMPLES = [
  { iconName: 'rocket-02' as const,    label: 'Recovery',   value: '87%',   description: 'Better than yesterday. Keep it up.' },
  { iconName: 'lightning-01' as const, label: 'Energy',     value: '2 340', description: 'Active calories burned today.' },
  { iconName: 'info-circle-1' as const, label: 'Heart Rate', value: '62',   description: 'Resting. Optimal range.' },
  { iconName: 'home-05' as const,      label: 'Sleep',      value: '7h 42', description: 'You hit your sleep goal last night.' },
];

export function PerformanceWidgetSquarePage() {
  return (
    <Playground
      title="Performance Widget Square"
      description="Compact 160px metric card. Always displayed 2-per-row with 8px gap."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}>
          {EXAMPLES.map((ex) => (
            <PerformanceWidgetSquare
              key={ex.label}
              iconName={ex.iconName}
              label={ex.label}
              value={ex.value}
              description={ex.description}
            />
          ))}
        </div>
      </div>
    </Playground>
  );
}
