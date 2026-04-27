import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, SectionHeader, Cell, Button, NavBar } from '@mi-org/design-system';
import type { NavItem } from '@mi-org/design-system';
import { DatePickerStrip } from '../../../../../design-system/src/components/DatePickerStrip/DatePickerStrip';
import type { DayItem } from '../../../../../design-system/src/components/DatePickerStrip/DatePickerStrip';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import styles from './SummaryScreen.module.css';

const DAYS: DayItem[] = [
  { label: 'Mon', number: 21, completed: true },
  { label: 'Tue', number: 22, completed: true },
  { label: 'Wed', number: 23, completed: true },
  { label: 'Thu', number: 24, completed: true },
  { label: 'Fri', number: 25, completed: true },
  { label: 'Sat', number: 26, completed: true },
  { label: 'Mon', number: 27, completed: false },
];

const NAV_ITEMS: NavItem[] = [
  { key: 'home',           label: 'Home',           activeIconName: 'home-05-1',      defaultIconName: 'home-05'        },
  { key: 'performance',    label: 'Performance',    activeIconName: 'lightning-01-1', defaultIconName: 'lightning-01'   },
  { key: 'challenges',     label: 'Challenges',     activeIconName: 'rocket-02-1',    defaultIconName: 'rocket-02'      },
  { key: 'end-of-service', label: 'End of service', activeIconName: 'check-circle',   defaultIconName: 'check-circle'   },
];

const COMMENTS = [
  { id: 1, name: 'Sarah M.',  initials: 'SM', color: '#FF9F43', text: 'Great job on the floor tonight, everyone was on fire! 🔥' },
  { id: 2, name: 'Marcus L.', initials: 'ML', color: '#4D96FF', text: 'Tables 8 and 12 tipped really well. Keep it up!' },
  { id: 3, name: 'Emma B.',   initials: 'EB', color: '#6BCB77', text: 'Tough rush at 8pm but we pulled through together 💪' },
];

const CELEB_COLORS = [
  '#22C55E', '#16A34A', '#4ADE80', '#86EFAC', '#FFD700',
  '#FFA500', '#FF69B4', '#00CED1', '#9370DB', '#FF6347',
  '#FFD93D', '#FF17E9', '#4D96FF', '#FF6B6B', '#A78BFA',
];

interface CelebParticle {
  id: number;
  x: number; y: number;
  tx: number; ty: number;
  color: string;
  w: number; h: number;
  rot: number;
  duration: number;
  delay: number;
  circle: boolean;
}

let cpid = 0;

export function SummaryScreen() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay]       = useState(6);
  const [showVersionPicker, setShowVersionPicker] = useState(false);
  const [showComments, setShowComments]     = useState(false);
  const [draft, setDraft]                   = useState('');
  const [matchChecked, setMatchChecked]     = useState(false);
  const [commentChecked, setCommentChecked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDayValidated, setIsDayValidated] = useState(false);
  const [celebParticles, setCelebParticles] = useState<CelebParticle[]>([]);

  const isCurrentDay  = selectedDay === DAYS.length - 1;
  const isValidatedDay = !isCurrentDay || isDayValidated;

  // Trigger celebration when both tasks are checked on the current day
  useEffect(() => {
    if (matchChecked && commentChecked && isCurrentDay && !isDayValidated && !showCelebration) {
      setShowCelebration(true);
      const particles: CelebParticle[] = Array.from({ length: 110 }, (_, i) => {
        const size = 4 + Math.random() * 9;
        const isRect = Math.random() < 0.35;
        const isCircle = !isRect && Math.random() < 0.3;
        return {
          id: cpid++,
          x: 20 + Math.random() * 335,
          y: 60 + Math.random() * 500,
          tx: (Math.random() - 0.5) * 320,
          ty: (Math.random() - 0.5) * 320 - 40,
          color: CELEB_COLORS[i % CELEB_COLORS.length],
          w: isRect ? size * 0.45 : size,
          h: isRect ? size * 2.2 : size,
          rot: Math.random() * 1080,
          duration: 0.9 + Math.random() * 1.2,
          delay: Math.random() * 0.55,
          circle: isCircle,
        };
      });
      setCelebParticles(particles);
      const t = setTimeout(() => {
        setShowCelebration(false);
        setIsDayValidated(true);
        setCelebParticles([]);
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [matchChecked, commentChecked, isCurrentDay, isDayValidated, showCelebration]);

  return (
    <div className={styles.screen}>

      {/* Header */}
      <div className={styles.headerWrap}>
        <Header
          variant="main"
          leftButton={{
            label: 'The Green Olive',
            icon: <Icon name="chevron-down" size={16} />,
            onClick: () => setShowVersionPicker(true),
          }}
          sundayAction={{ icon: <Icon name="lightning-01" size={20} /> }}
          initialsAction={{ initials: 'JL' }}
        />
      </div>

      {/* Scrollable content */}
      <div className={styles.scroll}>
        <div className={styles.content}>

          <DatePickerStrip
            days={DAYS}
            selectedIndex={selectedDay}
            onSelect={setSelectedDay}
            theme="light"
          />

          <div className={styles.inner}>

            {isValidatedDay ? (
              /* ── Validated day view ── */
              <div className={styles.validatedWrap}>
                <SectionHeader
                  level="h2"
                  align="center"
                  thumbnail={{ variant: 'icon', icon: <Icon name="check-circle" size={28} color="var(--color-content-success)" /> }}
                  subtitle="It has 4 comments"
                >
                  This day was validated
                </SectionHeader>
                <Button variant="secondary" size="small">
                  See details
                </Button>
              </div>
            ) : (
              /* ── Current day tasks ── */
              <>
                <SectionHeader level="h1" align="left">
                  Let's get over this monday, Bernard.
                </SectionHeader>

                <section className={styles.section}>
                  <Cell
                    title="Match figures with Toast"
                    checkable
                    chevron
                    onClick={() => navigate('/end-of-service/review-figures')}
                    onCheck={() => setMatchChecked(true)}
                  />
                  <Cell
                    title="Leave a comment for your team"
                    checkable
                    chevron
                    onClick={() => setShowComments(true)}
                    onCheck={() => setCommentChecked(true)}
                  />
                </section>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Bottom pinned */}
      <div className={styles.bottom}>
        {!isValidatedDay && (
          <div className={styles.validateWrap}>
            <Button variant="primary" size="large" className={styles.fullWidth}>
              Validate the day
            </Button>
          </div>
        )}
        <NavBar items={NAV_ITEMS} activeKey="end-of-service" onSelect={() => {}} embedded />
      </div>

      {/* ── Celebration overlay ── */}
      {showCelebration && (
        <div className={styles.celebration}>
          {/* Particles */}
          {celebParticles.map(p => (
            <span
              key={p.id}
              className={styles.celebParticle}
              style={{
                left: p.x,
                top: p.y,
                width: p.w,
                height: p.h,
                background: p.color,
                borderRadius: p.circle ? '50%' : '2px',
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--rot': `${p.rot}deg`,
                '--pdur': `${p.duration}s`,
                '--pdelay': `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}
          {/* Check + text */}
          <div className={styles.celebContent}>
            <svg viewBox="0 0 100 100" fill="none" className={styles.celebSvg}>
              <circle
                cx="50" cy="50" r="44"
                stroke="var(--color-content-success)"
                strokeWidth="4"
                className={styles.celebCircle}
              />
              <path
                d="M28,52 L43,67 L72,33"
                stroke="var(--color-content-success)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.celebCheckPath}
              />
            </svg>
            <p className={styles.celebTitle}>Day closed!</p>
          </div>
        </div>
      )}

      {/* ── Version picker drawer ── */}
      {showVersionPicker && (
        <div className={styles.overlay} onClick={() => setShowVersionPicker(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHandle} />
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Prototype version</span>
              <button className={styles.closeBtn} onClick={() => setShowVersionPicker(false)}>×</button>
            </div>
            <div className={styles.versionList}>
              {[
                { label: 'V0', sub: 'The Green Olive', active: true },
                { label: 'V1', sub: 'Coming soon',     active: false },
                { label: 'V2', sub: 'Coming soon',     active: false },
              ].map(v => (
                <div key={v.label} className={[styles.versionRow, v.active ? styles.versionRowActive : styles.versionRowDisabled].join(' ')}>
                  <div>
                    <p className={styles.versionLabel}>{v.label}</p>
                    <p className={styles.versionSub}>{v.sub}</p>
                  </div>
                  {v.active && <Icon name="check-circle" size={20} color="var(--color-content-success)" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Comments drawer ── */}
      {showComments && (
        <div className={styles.overlay} onClick={() => setShowComments(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHandle} />
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Comments</span>
              <button className={styles.closeBtn} onClick={() => setShowComments(false)}>×</button>
            </div>
            <div className={styles.commentList}>
              {COMMENTS.map(c => (
                <div key={c.id} className={styles.comment}>
                  <div className={styles.avatar} style={{ background: c.color }}>{c.initials}</div>
                  <div className={styles.commentBody}>
                    <span className={styles.commentName}>{c.name}</span>
                    <p className={styles.commentText}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.inputRow}>
              <input
                className={styles.commentInput}
                placeholder="Add a comment for your team..."
                value={draft}
                onChange={e => setDraft(e.target.value)}
              />
              <button
                className={styles.sendBtn}
                disabled={!draft.trim()}
                onClick={() => setDraft('')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 15V5M10 5L6 9M10 5L14 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
