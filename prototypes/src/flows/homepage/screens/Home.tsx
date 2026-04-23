import { useState } from 'react';
import {
  Header, NavBar, Rings, SectionHeader, Shift,
  PerformanceWidgetHorizontal, PerformanceWidgetVertical,
  InlineWidget, InlineGraph, ValueDot, TabNav,
} from '@mi-org/design-system';
import type { NavItem, ShiftProps, LineChartDay } from '@mi-org/design-system';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { Background } from '../../../../../design-system/src/prototype-components/Background/Background';
import styles from './Home.module.css';

/* ── Shifts ── */
const SHIFTS: ShiftProps[] = [
  {
    startTime: '[Mon] 11:00 AM',
    endTime: '3:30 PM',
    pills: [
      { variant: 'tips', value: 25 },
    ],
  },
  {
    startTime: '[Tue] 6:00 PM',
    endTime: '11:00 PM',
    pills: [
      { variant: 'tips', value: 182 },
      { variant: 'reviews', value: 12 },
    ],
  },
  {
    startTime: '[Wed] 10:30 AM',
    endTime: '3:00 PM',
    pills: [],
  },
];

/* ── Line chart data ── */
const LINE_DATA: LineChartDay[] = [
  { day: 'Tue', value: 52 },
  { day: 'Wed', value: 68 },
  { day: 'Thu', value: 61 },
  { day: 'Fri', value: 84 },
  { day: 'Sat', value: 79 },
  { day: 'Sun', value: 91 },
  { day: 'Mon', value: 74 },
];

const LINE_COMPARISON: LineChartDay[] = [
  { day: 'Tue', value: 38 },
  { day: 'Wed', value: 44 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 58 },
  { day: 'Mon', value: 52 },
];

/* ── Nav ── */
const US_NAV_ITEMS: NavItem[] = [
  { key: 'home',        label: 'Home',        activeIconName: 'home-05-1',      defaultIconName: 'home-05'        },
  { key: 'performance', label: 'Performance', activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01'   },
  { key: 'challenges',  label: 'Challenges',  activeIconName: 'rocket-02-1',    defaultIconName: 'rocket-02'      },
  { key: 'rewards',     label: 'Rewards',     activeIconName: 'bank-note-01',   defaultIconName: 'bank-note-01-1' },
];

const TABS = ['Overview', 'Tips', 'Reviews', 'Sunday'] as const;
type Tab = typeof TABS[number];

export function Home() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  return (
    <div className={styles.screen}>

      <Header
        variant="main"
        leftButton={{
          label: 'The Green Olive',
          icon: <Icon name="chevron-down" size={16} />,
        }}
        sundayAction={{
          icon: <Icon name="lightning-01" size={20} />,
        }}
        initialsAction={{ initials: 'JL' }}
      />

      <Background style={{ position: 'absolute', top: '40px', left: 0, width: '100%', display: 'block', zIndex: 0, pointerEvents: 'none', margin: 0 }} />

      <div className={styles.content}>

        {/* Section 0 — Tab navigation */}
        <section className={styles.section}>
          <TabNav
            options={['Overview', 'Tips', 'Reviews', 'Sunday']}
            value={activeTab}
            onChange={(v) => setActiveTab(v as Tab)}
          />
        </section>

        {/* Section 1 — Rings */}
        <section className={styles.ringSection}>
          <Rings
            outer={{ value: 100, displayValue: 70, suffix: '%', label: 'sunday usage' }}
            middle={{ value: 65, displayValue: 572, prefix: '$', suffix: '.00', label: 'tips' }}
            inner={{ value: 40, displayValue: 25, label: '5★ reviews', icon: <Icon name="google" size={8} color="var(--color-content-info)" /> }}
          />
        </section>

        {/* Section 2 — Last shifts */}
        <section className={styles.section}>
          <SectionHeader
            level="category"
            action={{
              label: 'See all',
              variant: 'tertiary',
              trailingIcon: <Icon name="chevron-right" size={16} color="var(--color-content-primary)" />,
            }}
          >
            Your last shifts
          </SectionHeader>
          <div className={styles.shiftsBlock}>
            {SHIFTS.map((shift, i) => (
              <Shift key={i} {...shift} />
            ))}
          </div>
        </section>

        {/* Section 3 — Key insights */}
        <section className={styles.section}>
          <SectionHeader level="category">Key insights</SectionHeader>
          <div className={styles.insightsBlock}>

            <PerformanceWidgetHorizontal
              iconName="lightning-01"
              label="Sunday usage"
              value="70%"
              subValue="of your guests"
            />

            <PerformanceWidgetVertical
              iconName="bank-note-01"
              label="Tips"
              description="Your tips are trending up this week compared to last week."
              graph={
                <>
                  <ValueDot label="This week" value={74} variant="sunday" />
                  <InlineWidget>
                    <InlineGraph
                      type="line"
                      data={LINE_DATA}
                      comparisonData={LINE_COMPARISON}
                    />
                  </InlineWidget>
                </>
              }
            />

            <PerformanceWidgetHorizontal
              iconName="bank-note-01"
              label="Tips total"
              value="$282"
              subValue="this week"
            />

            <PerformanceWidgetHorizontal
              iconName="bank-note-01"
              label="Google reviews"
              value="4.9★"
              subValue="12 new this week"
            />

          </div>
        </section>

      </div>

      <NavBar items={US_NAV_ITEMS} activeKey={activeNav} onSelect={setActiveNav} />

    </div>
  );
}
