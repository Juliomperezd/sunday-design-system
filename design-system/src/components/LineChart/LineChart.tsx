import { useRef, useState, useEffect } from 'react';
import styles from './LineChart.module.css';

const CHART_HEIGHT = 110;
const V_PAD = 14;
const DURATION = 1600;
const BURST_INTERVAL = 38;
const PARTICLES_PER_BURST = 3;

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
}

export interface LineChartDay {
  day: string;
  date?: number;
  value: number;
}

export interface LineChartProps {
  data: LineChartDay[];
  comparisonData?: LineChartDay[];
  color?: string;
}

function computePoints(data: LineChartDay[], w: number, min: number, max: number) {
  const range = max - min || 1;
  const usableH = CHART_HEIGHT - V_PAD * 2;
  const colW = w / data.length;
  return data.map((d, i) => ({
    x: (i + 0.5) * colW,
    y: V_PAD + usableH - ((d.value - min) / range) * usableH,
  }));
}

function buildLinePath(pts: { x: number; y: number }[]): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1].x - pts[i].x;
    const t = 0.4;
    d += ` C ${pts[i].x + dx * t} ${pts[i].y}, ${pts[i + 1].x - dx * t} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  return d;
}

let _uid = 0;
const uid = () => `lc${++_uid}`;

export function LineChart({ data, comparisonData, color = 'var(--color-content-sunday)' }: LineChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const compPathRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const liveDotRef = useRef<SVGCircleElement>(null);

  const [svgWidth, setSvgWidth] = useState(0);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [compPts, setCompPts] = useState<{ x: number; y: number }[]>([]);
  const [shaking, setShaking] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pidRef = useRef(0);
  const gradId = useRef(uid()).current;
  const clipId = useRef(uid()).current;

  useEffect(() => {
    if (!wrapperRef.current) return;
    const w = wrapperRef.current.offsetWidth;
    const allVals = [...data.map(d => d.value), ...(comparisonData?.map(d => d.value) ?? [])];
    const globalMin = Math.min(...allVals);
    const globalMax = Math.max(...allVals);
    setSvgWidth(w);
    setPts(computePoints(data, w, globalMin, globalMax));
    if (comparisonData?.length) setCompPts(computePoints(comparisonData, w, globalMin, globalMax));
  }, []);

  // Recompute compPts when comparisonData is toggled after mount
  useEffect(() => {
    if (!svgWidth) return;
    if (!comparisonData?.length) { setCompPts([]); return; }
    const allVals = [...data.map(d => d.value), ...comparisonData.map(d => d.value)];
    const globalMin = Math.min(...allVals);
    const globalMax = Math.max(...allVals);
    setCompPts(computePoints(comparisonData, svgWidth, globalMin, globalMax));
  }, [comparisonData, svgWidth]);

  // When compPts change post-animation, make comparison line fully visible
  useEffect(() => {
    if (!animDone || !compPathRef.current || !compPts.length) return;
    compPathRef.current.style.strokeDasharray = 'none';
    compPathRef.current.style.strokeDashoffset = '0';
  }, [compPts, animDone]);

  useEffect(() => {
    if (!svgWidth || !pathRef.current || pts.length === 0) return;

    const path = pathRef.current;
    const total = path.getTotalLength();
    path.style.strokeDasharray = `${total}`;
    path.style.strokeDashoffset = `${total}`;

    const compPath = compPathRef.current;
    let compTotal = 0;
    if (compPath) {
      compTotal = compPath.getTotalLength();
      compPath.style.strokeDasharray = `${compTotal}`;
      compPath.style.strokeDashoffset = `${compTotal}`;
    }

    if (liveDotRef.current) liveDotRef.current.style.opacity = '0';

    setShaking(true);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const startTime = performance.now();
    let lastBurst = 0;

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const drawn = total * eased;
      path.style.strokeDashoffset = `${total - drawn}`;
      if (compPath && compTotal > 0) {
        compPath.style.strokeDashoffset = `${compTotal - compTotal * eased}`;
      }

      const pt = path.getPointAtLength(drawn);
      if (clipRectRef.current) clipRectRef.current.setAttribute('width', `${pt.x}`);
      if (liveDotRef.current) {
        liveDotRef.current.setAttribute('cx', `${pt.x}`);
        liveDotRef.current.setAttribute('cy', `${pt.y}`);
        liveDotRef.current.style.opacity = '1';
      }

      if (now - lastBurst > BURST_INTERVAL) {
        lastBurst = now;
        const burst: Particle[] = Array.from({ length: PARTICLES_PER_BURST }, () => {
          const angle = (Math.random() - 0.5) * Math.PI * 1.3;
          const speed = 10 + Math.random() * 14;
          return {
            id: pidRef.current++,
            x: pt.x, y: pt.y,
            tx: Math.sin(angle) * speed,
            ty: -Math.abs(Math.cos(angle)) * speed,
            size: 1.5 + Math.random() * 2.5,
          };
        });
        setParticles(prev => [...prev, ...burst]);
        timeouts.push(setTimeout(() => {
          setParticles(prev => prev.filter(p => !burst.some(b => b.id === p.id)));
        }, 600));
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setShaking(false);
        setAnimDone(true);
        if (liveDotRef.current) liveDotRef.current.style.opacity = '0';
        timeouts.push(setTimeout(() => setParticles([]), 700));
      }
    }

    requestAnimationFrame(frame);
    return () => timeouts.forEach(clearTimeout);
  }, [svgWidth, pts]);

  if (data.length < 2) return null;

  const linePath = pts.length ? buildLinePath(pts) : '';
  const compLinePath = compPts.length ? buildLinePath(compPts) : '';
  const fillPath = pts.length && svgWidth
    ? `${linePath} L ${svgWidth} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`
    : '';

  const colW = svgWidth / data.length;
  const selPt = animDone && pts[selectedIdx] ? pts[selectedIdx] : null;
  const dotPt = animDone ? (selPt ?? pts[pts.length - 1]) : null;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {svgWidth > 0 && (
        <svg width={svgWidth} height={CHART_HEIGHT} className={styles.svg}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect ref={clipRectRef} x="0" y="0" width="0" height={CHART_HEIGHT} />
            </clipPath>
          </defs>

          {/* Selected column background */}
          {animDone && selectedIdx >= 0 && (
            <rect
              x={selectedIdx * colW} y={0}
              width={colW} height={CHART_HEIGHT}
              fill="var(--color-bg-button-secondary)"
            />
          )}

          {/* Gradient fill */}
          <path d={fillPath} fill={`url(#${gradId})`} stroke="none" clipPath={`url(#${clipId})`} />

          {/* Vertical day dividers — outside shaking group */}
          {Array.from({ length: data.length - 1 }, (_, i) => (
            <line
              key={i}
              x1={(i + 1) * colW} y1={0}
              x2={(i + 1) * colW} y2={CHART_HEIGHT}
              stroke="var(--color-stroke-divider)"
              strokeWidth="1"
            />
          ))}

          {/* Comparison line — animates in sync, no shake/particles */}
          {compLinePath && (
            <path
              ref={compPathRef}
              d={compLinePath}
              fill="none"
              stroke="var(--color-content-disabled)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Animating group — only line + live dot shake */}
          <g className={shaking ? styles.shaking : ''}>
            <path
              ref={pathRef}
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle ref={liveDotRef} cx="0" cy="0" r="4" fill={color} style={{ opacity: 0 }} />
          </g>

          {/* Dot + rings (always visible after animation) */}
          {dotPt && (
            <>
              <circle cx={dotPt.x} cy={dotPt.y} r={5} fill={color} />
              <circle
                cx={dotPt.x} cy={dotPt.y} r={5}
                fill="none"
                stroke="var(--color-content-primary-reversed)"
                strokeWidth="4"
              />
              <circle
                cx={dotPt.x} cy={dotPt.y} r={5}
                fill="none"
                stroke={color}
                strokeWidth="1"
                className={styles.pulse}
              />
            </>
          )}

          {/* Clickable hit areas per day */}
          {animDone && data.map((_, i) => (
            <rect
              key={i}
              x={i * colW} y={0}
              width={colW} height={CHART_HEIGHT}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </svg>
      )}

      {/* Tooltip — only when a day is explicitly selected */}
      {animDone && selPt && (
        <div
          className={styles.tooltip}
          style={{ left: selPt.x, top: selPt.y }}
        >
          {data[selectedIdx].day} · {data[selectedIdx].value}
        </div>
      )}

      {/* Day labels */}
      {svgWidth > 0 && (
        <div className={styles.dayLabels}>
          {data.map((d, i) => (
            <span
              key={i}
              className={[styles.dayLabel, i === selectedIdx && animDone ? styles.dayLabelSelected : ''].join(' ')}
              onClick={() => animDone && setSelectedIdx(i)}
            >
              {d.day}
              {d.date != null && <span className={styles.dayDate}>{d.date}</span>}
            </span>
          ))}
        </div>
      )}

      {/* Particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
