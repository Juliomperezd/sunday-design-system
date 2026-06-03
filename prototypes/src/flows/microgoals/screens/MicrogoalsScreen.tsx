import { useState, useEffect, useRef } from 'react';
import { Header, Button } from '@mi-org/design-system';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { Background } from '../../../../../design-system/src/prototype-components/Background/Background';
import { PushNotification } from '../../../../../design-system/src/prototype-components/PushNotification/PushNotification';
import { useMicrogoals } from '../MicrogoalsContext';
import { useNavigate } from 'react-router-dom';
import styles from './MicrogoalsScreen.module.css';

const TOTAL = 5;
const REWARD = 5;
const ARC_LENGTH = 837.8; // 240° arc at r=200

const CONFETTI_COLORS = [
  '#5B67E8', '#9333EA', '#F472B6', '#FBBF24', '#34D399',
  '#60A5FA', '#FB923C', '#A78BFA', '#F87171', '#4ADE80',
  '#E879F9', '#FCD34D', '#6EE7B7',
];

interface Particle {
  id: number;
  x: number; y: number;
  tx: number; ty: number;
  color: string;
  w: number; h: number;
  rot: number;
  dur: number;
  delay: number;
  circle: boolean;
}

let pid = 0;

interface QuestDef {
  id: number;
  title: string;
  iconName: string;
  iconVariant: 'active' | 'default';
  tappable?: boolean;
  path?: string;
}

const QUESTS: QuestDef[] = [
  {
    id: 1,
    title: 'Get your first guest checking their bill with their phone',
    iconName: 'qr-code-01',
    iconVariant: 'default',
    tappable: true,
    path: '/microgoals/guest-checking',
  },
  {
    id: 2,
    title: 'Get your first guest paying with Sunday',
    iconName: 'bank-note-01',
    iconVariant: 'active',
  },
  {
    id: 3,
    title: 'Check your shift performance',
    iconName: 'lightning-01-1',
    iconVariant: 'active',
  },
  {
    id: 4,
    title: 'Weekly quiz',
    iconName: 'star-01',
    iconVariant: 'active',
    tappable: true,
    path: '/microgoals/weekly-quiz',
  },
  {
    id: 5,
    title: 'Bring a server to the app',
    iconName: 'user-02',
    iconVariant: 'active',
  },
];

export function MicrogoalsScreen() {
  const navigate = useNavigate();
  const { completed, markComplete, resetAll } = useMicrogoals();

  const [showLock, setShowLock] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotJumping, setMascotJumping] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  const count = completed.size;
  const earned = count * REWARD;
  const progressArc = (count / TOTAL) * ARC_LENGTH;

  // Trigger lock screen "Emulate a win"
  function handleEmulateWin() {
    if (completed.has(1)) return; // already done
    setShowLock(true);
    setNotifVisible(false);
    setTimeout(() => setNotifVisible(true), 800);
  }

  // Notification tapped → complete quest + confetti + mascot jump
  function handleNotifTap() {
    setShowLock(false);
    setNotifVisible(false);
    markComplete(1);

    // Mascot jump
    setMascotJumping(true);
    setTimeout(() => setMascotJumping(false), 900);

    // Spawn confetti — 3 waves for a big burst
    const rect = screenRef.current?.getBoundingClientRect() ?? { width: 300, height: 600 };
    const cx = rect.width / 2;

    const newParticles: Particle[] = Array.from({ length: 420 }, (_, i) => {
      const size = 3 + Math.random() * 13;
      const isRect = Math.random() < 0.45;
      const isCircle = !isRect && Math.random() < 0.2;
      const isBurst = i < 120; // first 120: fast outward burst from center

      if (isBurst) {
        const angle = (i / 120) * Math.PI * 2;
        const speed = 120 + Math.random() * 260;
        return {
          id: pid++,
          x: cx + (Math.random() - 0.5) * 40,
          y: rect.height * 0.35 + (Math.random() - 0.5) * 40,
          tx: Math.cos(angle) * speed,
          ty: Math.sin(angle) * speed - 60,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          w: isRect ? size * 0.4 : size,
          h: isRect ? size * 2.6 : size,
          rot: Math.random() * 1440,
          dur: 0.45 + Math.random() * 0.5,
          delay: Math.random() * 0.08,
          circle: isCircle,
        };
      }

      // Remaining 300: fall from top in 3 zones
      const zone = (i - 120) % 3;
      const ox = zone === 0
        ? cx + (Math.random() - 0.5) * rect.width * 0.7
        : zone === 1 ? Math.random() * rect.width * 0.35
        : rect.width * 0.65 + Math.random() * rect.width * 0.35;
      return {
        id: pid++,
        x: ox,
        y: -40 + Math.random() * 60,
        tx: (Math.random() - 0.5) * 480,
        ty: 220 + Math.random() * 620,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: isRect ? size * 0.38 : size,
        h: isRect ? size * 2.5 : size,
        rot: Math.random() * 1600,
        dur: 0.7 + Math.random() * 0.9,
        delay: Math.random() * 0.35,
        circle: isCircle,
      };
    });

    setParticles(newParticles);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setParticles([]);
    }, 4000);
  }

  // Dismiss lock screen on background tap
  function handleLockBgTap() {
    setShowLock(false);
    setNotifVisible(false);
  }

  return (
    <div className={styles.screen} ref={screenRef}>
      {/* Background decoration */}
      <Background className={styles.bg} width="100%" height={302} />

      {/* Header */}
      <div className={styles.headerWrap}>
        <Header
          variant="main"
          leftButton={{
            label: 'Reset prototype',
            icon: <Icon name="chevron-down" size={16} />,
            onClick: resetAll,
          }}
          sundayAction={{ icon: <Icon name="lightning-01" size={20} /> }}
          initialsAction={{ initials: 'JL' }}
        />
      </div>

      <div className={styles.scroll}>

        {/* ── Hero ── */}
        <div className={styles.hero}>
          <div className={styles.arcWrap}>
            {/* Mascot behind the arc */}
            <div className={styles.mascotWrap}>
              <img
                src="/assets/microgoals/mascot.png"
                alt="Sunday mascot"
                className={[styles.mascotImg, mascotJumping ? styles.mascotJump : ''].join(' ')}
              />
            </div>

            {/* Arc SVG in front of mascot */}
            <svg viewBox="0 0 350 330" className={styles.arcSvg} aria-hidden="true">
              <defs>
                <linearGradient id="mgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B67E8" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              {/* Track */}
              <path
                d="M 2 315 A 200 200 0 1 1 348 315"
                fill="none"
                stroke="#E9EBF8"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Progress — animated via stroke-dashoffset */}
              <path
                d="M 2 315 A 200 200 0 1 1 348 315"
                fill="none"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={ARC_LENGTH - progressArc}
                style={{ stroke: 'var(--color-content-sunday)', transition: 'stroke-dashoffset 1s ease' }}
              />
              {/* Quest dot markers */}
              {QUESTS.map((q, i) => {
                const angle = (-120 + (i / (TOTAL - 1)) * 240) * (Math.PI / 180);
                const x = 175 + 200 * Math.sin(angle);
                const y = 215 - 200 * Math.cos(angle);
                const done = completed.has(q.id);
                return (
                  <circle
                    key={q.id}
                    cx={x}
                    cy={y}
                    r="7"
                    fill={done ? 'var(--color-content-sunday)' : '#E9EBF8'}
                    stroke="white"
                    strokeWidth="2.5"
                    style={{ transition: 'fill 0.5s ease' }}
                  />
                );
              })}
            </svg>
          </div>

          <p className={styles.progressText}>
            <span className={styles.progressBold}>{count} of {TOTAL} quests</span>
            {' · '}
            <span className={styles.progressEarned}>${earned} earned</span>
          </p>
        </div>

        {/* ── Quest list ── */}
        <div className={styles.listSection}>
          <p className={styles.listLabel}>YOUR QUESTS</p>
          <div className={styles.questList}>
            {QUESTS.map((q) => {
              const done = completed.has(q.id);
              return (
                <button
                  key={q.id}
                  className={[styles.questCard, q.tappable && !done ? styles.questCardTappable : ''].join(' ')}
                  onClick={() => q.tappable && !done && q.path && navigate(q.path)}
                  disabled={!q.tappable || done}
                >
                  <div className={styles.questIconWrap}>
                    {done ? (
                      <Icon name="check-circle" size={20} color="#22C55E" />
                    ) : (
                      <Icon name={q.iconName} variant={q.iconVariant} size={20} color="var(--color-content-primary)" />
                    )}
                  </div>

                  <div className={styles.questBody}>
                    <p className={[styles.questTitle, done ? styles.questTitleDone : ''].join(' ')}>
                      {q.title}
                    </p>
                  </div>

                  <div className={styles.questTrail}>
                    <span className={[styles.rewardBadge, done ? styles.rewardBadgeDone : ''].join(' ')}>${REWARD}</span>
                    <Icon name="chevron-right" size={16} color="var(--color-content-secondary)" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CTA block ── */}
        <div className={styles.ctaBlock}>
          <p className={styles.ctaTitle}>Do you want more?</p>
          <p className={styles.ctaBody}>
            Invite other servers to the app and win 3 more quests
          </p>
          <Button variant="secondary" size="small">Invite</Button>
        </div>

        <div style={{ height: 80 }} />
      </div>

      {/* ── Floating "Emulate a win" button ── */}
      {!completed.has(1) && (
        <button className={styles.floatingBtn} onClick={handleEmulateWin}>
          🏆 Emulate a win
        </button>
      )}

      {/* ── Confetti ── */}
      {showConfetti && particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
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
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Lock screen overlay ── */}
      {showLock && (
        <div className={styles.lockScreen} onClick={handleLockBgTap}>
          {/* Fake lock screen time */}
          <div className={styles.lockTime}>
            <p className={styles.lockHour}>9:41</p>
            <p className={styles.lockDate}>Tuesday, June 3</p>
          </div>

          {/* Push notification slides in */}
          <div
            className={[styles.notifWrap, notifVisible ? styles.notifIn : ''].join(' ')}
            onClick={(e) => { e.stopPropagation(); handleNotifTap(); }}
          >
            <PushNotification
              appName="Sunday"
              appIcon={
                <span style={{ fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  ☀️
                </span>
              }
              time="now"
              title="You've earned $5! 🎉"
              body="You got your first guest checking their bill with their phone."
              onClick={handleNotifTap}
            />
          </div>
        </div>
      )}
    </div>
  );
}
