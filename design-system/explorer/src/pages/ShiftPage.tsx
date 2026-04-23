import { Playground } from '../components/Playground/Playground';
import { Shift } from '../../../src/components/Shift/Shift';

const SHIFTS = [
  {
    day: 'Sun',
    startTime: '18:00',
    endTime: '23:00',
    barFill: 85,
    pills: [
      { variant: 'tips'    as const, value: 200 },
      { variant: 'reviews' as const, value: 12  },
    ],
  },
  {
    day: 'Sat',
    startTime: '11:00',
    endTime: '15:30',
    barFill: 50,
    pills: [
      { variant: 'tips'    as const, value: 140 },
      { variant: 'reviews' as const, value: 6   },
    ],
  },
  {
    day: 'Fri',
    startTime: '10:30',
    endTime: '14:00',
    barFill: 25,
    pills: [
      { variant: 'tips' as const, value: 30 },
    ],
  },
];

export function ShiftPage() {
  return (
    <Playground
      title="Shift"
      description="Work shift row: day label, 0–2 pills on the left, start/end times and a fill bar on the right."
      controls={[]}
    >
      <div style={{ width: 375, padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        {SHIFTS.map((s) => (
          <Shift
            key={s.day}
            day={s.day}
            startTime={s.startTime}
            endTime={s.endTime}
            barFill={s.barFill}
            pills={s.pills}
          />
        ))}
      </div>
    </Playground>
  );
}
