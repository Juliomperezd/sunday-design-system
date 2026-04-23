import { useState } from 'react';
import { NavBar, NavItem } from '../../../src/components/NavBar/NavBar';
import { Playground } from '../components/Playground/Playground';
import styles from './NavBarPage.module.css';

const HOME:        NavItem = { key: 'home',        label: 'Home',        activeIconName: 'home-05-1',      defaultIconName: 'home-05'        };
const ACTIVITY:    NavItem = { key: 'activity',    label: 'Activity',    activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01'   };
const PERFORMANCE: NavItem = { key: 'performance', label: 'Performance', activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01'   };
const CHALLENGES:  NavItem = { key: 'challenges',  label: 'Challenges',  activeIconName: 'rocket-02-1',    defaultIconName: 'rocket-02'      };
const TIPS:        NavItem = { key: 'tips',        label: 'Tips',        activeIconName: 'coins-02',       defaultIconName: 'coins-02-1'     };
const REWARDS:     NavItem = { key: 'rewards',     label: 'Rewards',     activeIconName: 'bank-note-01',   defaultIconName: 'bank-note-01-1' };

const US_ITEMS: NavItem[] = [HOME, PERFORMANCE, CHALLENGES, REWARDS];

const FR_ITEMS_WITH_TIPS:    NavItem[] = [HOME, ACTIVITY, PERFORMANCE, CHALLENGES, TIPS, REWARDS];
const FR_ITEMS_WITHOUT_TIPS: NavItem[] = [HOME, ACTIVITY, PERFORMANCE, CHALLENGES, REWARDS];

export function NavBarPage() {
  const [market,    setMarket]    = useState<'US' | 'FR'>('US');
  const [withTips,  setWithTips]  = useState(true);
  const [activeKey, setActiveKey] = useState('home');

  const items =
    market === 'US' ? US_ITEMS :
    withTips        ? FR_ITEMS_WITH_TIPS :
                      FR_ITEMS_WITHOUT_TIPS;

  const handleMarket = (v: string) => {
    setMarket(v as 'US' | 'FR');
    setActiveKey('home');
  };

  return (
    <Playground
      title="NavBar"
      description="Siempre position: fixed al fondo. Divider simple arriba. Items en flex: 1 con ellipsis."
      controls={[
        {
          type: 'select',
          label: 'market',
          options: ['US', 'FR'],
          value: market,
          onChange: handleMarket,
        },
        ...(market === 'FR' ? [{
          type: 'toggle' as const,
          label: 'with tips',
          value: withTips,
          onChange: setWithTips,
        }] : []),
      ]}
    >
      <div className={styles.phone}>
        <NavBar items={items} activeKey={activeKey} onSelect={setActiveKey} />
      </div>
    </Playground>
  );
}
