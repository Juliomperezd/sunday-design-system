import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TypographyPage } from './pages/TypographyPage';
import { ColorsPage } from './pages/ColorsPage';
import { ButtonPage } from './pages/ButtonPage';
import { AlertPage } from './pages/AlertPage';
import { ActionSheetPage } from './pages/ActionSheetPage';
import { DividerPage } from './pages/DividerPage';
import { TagPage } from './pages/TagPage';
import { SegmentedControlPage } from './pages/SegmentedControlPage';
import { TabNavPage } from './pages/TabNavPage';
import { SectionHeaderPage } from './pages/SectionHeaderPage';
import { ThumbnailPage } from './pages/ThumbnailPage';
import { NavBarPage } from './pages/NavBarPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ImagePage } from './pages/ImagePage';
import { CellPage } from './pages/CellPage';
import { HeaderPage } from './pages/HeaderPage';
import { ActionButtonPage } from './pages/ActionButtonPage';
import { PerformanceWidgetHorizontalPage } from './pages/PerformanceWidgetHorizontalPage';
import { PerformanceWidgetVerticalPage } from './pages/PerformanceWidgetVerticalPage';
import { PerformanceWidgetSquarePage } from './pages/PerformanceWidgetSquarePage';
import { DonutPage } from './pages/DonutPage';
import { RingsPage } from './pages/RingsPage';
import { TipsPage } from './pages/TipsPage';
import { InlineGraphPage } from './pages/InlineGraphPage';
import { ValueDotPage } from './pages/ValueDotPage';
import { ShiftPage } from './pages/ShiftPage';
import { AdvicePage } from './pages/AdvicePage';
import { ShiftPillPage } from './pages/ShiftPillPage';
import { InputPage } from './pages/InputPage';
import { BadgePage } from './pages/BadgePage';
import { PushNotificationPage } from './pages/PushNotificationPage';
import { OSTopBarPage } from './pages/OSTopBarPage';
import { AppIconPage } from './pages/AppIconPage';
import { PoweredByPage } from './pages/PoweredByPage';
import { BackgroundPage } from './pages/BackgroundPage';
import { AssetsPage } from './pages/AssetsPage';
import { IconsPage } from './pages/IconsPage';
import { ElevationPage } from './pages/ElevationPage';
import { SpacingPage } from './pages/SpacingPage';
import { LayoutPage } from './pages/LayoutPage';
import styles from './App.module.css';

export interface NavSection {
  label: string;
  items: { key: string; label: string; component: React.ComponentType }[];
}

const NAV: NavSection[] = [
  {
    label: 'Tokens',
    items: [
      { key: 'typography', label: 'Typography', component: TypographyPage },
      { key: 'colors',     label: 'Colors',     component: ColorsPage },
      { key: 'elevation',  label: 'Elevation',  component: ElevationPage },
      { key: 'spacing',    label: 'Spacing',    component: SpacingPage   },
      { key: 'layout',     label: 'Layout',     component: LayoutPage    },
    ],
  },
  {
    label: 'Components',
    items: [
      { key: 'button', label: 'Button', component: ButtonPage },
      { key: 'action-sheet', label: 'Action Sheet', component: ActionSheetPage },
      { key: 'divider',      label: 'Divider',      component: DividerPage      },
      { key: 'tag',               label: 'Tag',               component: TagPage               },
      { key: 'segmented-control', label: 'Segmented Control', component: SegmentedControlPage  },
      { key: 'tab-nav',           label: 'Tab Nav',           component: TabNavPage            },
      { key: 'section-header',    label: 'Section Header',    component: SectionHeaderPage     },
      { key: 'thumbnail',         label: 'Thumbnail',         component: ThumbnailPage         },
      { key: 'navbar',            label: 'NavBar',            component: NavBarPage            },
      { key: 'feedback',          label: 'Feedback',          component: FeedbackPage          },
      { key: 'image',             label: 'Image',             component: ImagePage             },
      { key: 'cell',              label: 'Cell',              component: CellPage              },
      { key: 'action-button',     label: 'ActionButton',      component: ActionButtonPage      },
      { key: 'header',                        label: 'Header',                        component: HeaderPage                        },
      { key: 'performance-widget-horizontal', label: 'Performance Widget Horizontal', component: PerformanceWidgetHorizontalPage },
      { key: 'performance-widget-vertical',   label: 'Performance Widget Vertical',   component: PerformanceWidgetVerticalPage   },
      { key: 'performance-widget-square',    label: 'Performance Widget Square',    component: PerformanceWidgetSquarePage    },
      { key: 'advice', label: 'AI-Advice', component: AdvicePage },
      { key: 'shift',  label: 'Shift',  component: ShiftPage  },
      { key: 'shift-pill', label: 'Shift Pill', component: ShiftPillPage },
      { key: 'input',      label: 'Input',      component: InputPage      },
      { key: 'badge',      label: 'Badge',      component: BadgePage      },
    ],
  },
  {
    label: 'Data graphs',
    items: [
      { key: 'donut',         label: 'Donut',         component: DonutPage        },
      { key: 'rings',         label: 'Rings',         component: RingsPage        },
      { key: 'tips',          label: 'Tips',          component: TipsPage         },
      { key: 'inline-graph',  label: 'Inline Graph', component: InlineGraphPage  },
      { key: 'value-dot',     label: 'Value Dot',     component: ValueDotPage     },
    ],
  },
  {
    label: 'Prototype',
    items: [
      { key: 'push-notification', label: 'Push notification', component: PushNotificationPage },
      { key: 'os-top-bar',        label: 'OS Top Bar',        component: OSTopBarPage        },
      { key: 'app-icon',          label: 'App Icon',          component: AppIconPage         },
      { key: 'powered-by',        label: 'Powered By',        component: PoweredByPage       },
      { key: 'background',        label: 'Background',        component: BackgroundPage      },
    ],
  },
  {
    label: 'Assets',
    items: [
      { key: 'assets', label: 'Images',  component: AssetsPage },
      { key: 'icons',  label: 'Icons',   component: IconsPage  },
    ],
  },
];

const ALL_PAGES = Object.fromEntries(
  NAV.flatMap((s) => s.items.map((i) => [i.key, i.component]))
);

export function App() {
  const [activePage, setActivePage] = useState<string>('typography');
  const ActiveComponent = ALL_PAGES[activePage];

  return (
    <div className={styles.layout}>
      <Sidebar nav={NAV} activeKey={activePage} onSelect={setActivePage} />
      <main className={styles.main}>
        {ActiveComponent ? <ActiveComponent /> : null}
      </main>
    </div>
  );
}
