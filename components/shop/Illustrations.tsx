import { useId, type ReactNode } from 'react'

// The NM Mast System drawing set: every illustration is an inline SVG built from these primitives, so line
// weights and colours match and the tokens follow the theme. Scenes are dusk views, so they stay dark in
// both themes by scoping the 'dark' class to the svg. Printed nodes are always the green-outlined parts.

const LINE = 2.5
const FINE = 1.5
const LABEL_SIZE = 32

const lineClass = 'stroke-nm-text-s'
const fineClass = 'stroke-nm-text-t'
const nodeClass = 'fill-nm-green-deep stroke-nm-green-text'

// Dimensions and labels disappear in small thumbnails.
function Annot({ children }: { children: ReactNode }) {
  return <g className="[.nm-bare_&]:hidden">{children}</g>
}

function Label({ x, y, children, anchor = 'start' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={LABEL_SIZE} className="fill-nm-text-s font-mono" stroke="none">
      {children}
    </text>
  )
}

function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={FINE} className={fineClass} />
      <circle cx={x1} cy={y1} r={4} className="fill-nm-text-t" />
    </g>
  )
}

function DimV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  const my = (y1 + y2) / 2
  return (
    <Annot>
      <g strokeWidth={FINE} className={fineClass}>
        <line x1={x} y1={y1} x2={x} y2={y2} />
        <line x1={x - 8} y1={y1 + 8} x2={x + 8} y2={y1 - 8} />
        <line x1={x - 8} y1={y2 + 8} x2={x + 8} y2={y2 - 8} />
        <line x1={x - 24} y1={y1} x2={x + 16} y2={y1} strokeDasharray="4 5" />
        <line x1={x - 24} y1={y2} x2={x + 16} y2={y2} strokeDasharray="4 5" />
      </g>
      <text x={x + 16} y={my} transform={`rotate(-90 ${x + 16} ${my})`} textAnchor="middle" dy="24" fontSize={LABEL_SIZE} className="fill-nm-text-s font-mono" stroke="none">
        {label}
      </text>
    </Annot>
  )
}

function DimH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <Annot>
      <g strokeWidth={FINE} className={fineClass}>
        <line x1={x1} y1={y} x2={x2} y2={y} />
        <line x1={x1 - 8} y1={y + 8} x2={x1 + 8} y2={y - 8} />
        <line x1={x2 - 8} y1={y + 8} x2={x2 + 8} y2={y - 8} />
        <line x1={x1} y1={y - 24} x2={x1} y2={y + 14} strokeDasharray="4 5" />
        <line x1={x2} y1={y - 24} x2={x2} y2={y + 14} strokeDasharray="4 5" />
      </g>
      <Label x={(x1 + x2) / 2} y={y + 42} anchor="middle">{label}</Label>
    </Annot>
  )
}

function Ground({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const ticks: ReactNode[] = []
  for (let x = x1; x < x2; x += 26) {
    ticks.push(<line key={x} x1={x + 14} y1={y} x2={x} y2={y + 14} />)
  }
  return (
    <g strokeWidth={FINE} className={fineClass}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={LINE} className={lineClass} />
      {ticks}
    </g>
  )
}

// Blueprint hatching, clipped to the rectangle by calculation so no clipPath ids are needed.
function HatchRect({ x, y, w, h, step = 14 }: { x: number; y: number; w: number; h: number; step?: number }) {
  const lines: ReactNode[] = []
  for (let c = step; c < w + h; c += step) {
    lines.push(
      <line key={c} x1={x + Math.min(c, w)} y1={y + Math.max(0, c - w)} x2={x + Math.max(0, c - h)} y2={y + Math.min(c, h)} />
    )
  }
  return <g strokeWidth={1} className={fineClass} opacity={0.7}>{lines}</g>
}

function VTube({ x, top, bottom, w }: { x: number; top: number; bottom: number; w: number }) {
  const h = bottom - top
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={h} strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <rect x={x - w / 2 + w * 0.14} y={top + 2} width={w * 0.14} height={h - 4} className="fill-nm-text-p" opacity={0.14} />
      <rect x={x + w / 2 - w * 0.24} y={top + 2} width={w * 0.2} height={h - 4} className="fill-nm-text-t" opacity={0.2} />
    </g>
  )
}

function HTube({ left, right, y, h }: { left: number; right: number; y: number; h: number }) {
  const w = right - left
  return (
    <g>
      <rect x={left} y={y - h / 2} width={w} height={h} strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <rect x={left + 2} y={y - h / 2 + h * 0.14} width={w - 4} height={h * 0.14} className="fill-nm-text-p" opacity={0.14} />
      <rect x={left + 2} y={y + h / 2 - h * 0.24} width={w - 4} height={h * 0.2} className="fill-nm-text-t" opacity={0.2} />
    </g>
  )
}

function Node({ x, y, w, h, r = 6 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x - w / 2} y={y} width={w} height={h} rx={r} strokeWidth={LINE} className={nodeClass} />
}

// Zigzag that marks a tube continuing past the edge of the drawing.
function BreakLine({ x, y, w }: { x: number; y: number; w: number }) {
  const left = x - w / 2 - 6
  const step = (w + 12) / 6
  const points = Array.from({ length: 7 }, (_, i) => `${left + i * step},${y + (i % 2 === 0 ? -5 : 5)}`).join(' ')
  return <polyline points={points} strokeWidth={LINE} className={lineClass} />
}

function DRing({ x, y, r = 22, dir = 1 }: { x: number; y: number; r?: number; dir?: 1 | -1 }) {
  return (
    <path
      d={`M${x} ${y - r} L${x} ${y + r} A${r} ${r} 0 0 ${dir === 1 ? 0 : 1} ${x} ${y - r} Z`}
      strokeWidth={LINE + 1}
      className="stroke-nm-green-text"
    />
  )
}

function Bulb({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <g stroke="none">
      <circle cx={x} cy={y} r={r * 4} className="fill-nm-bulb" opacity={0.1} />
      <circle cx={x} cy={y} r={r * 2.2} className="fill-nm-bulb" opacity={0.22} />
      <circle cx={x} cy={y} r={r} className="fill-nm-bulb" />
    </g>
  )
}

// A run of festoon lights: parabolic sag between two points, with bulbs hung along it.
function Festoon({ x1, y1, x2, y2, sag, bulbs, r = 5 }: { x1: number; y1: number; x2: number; y2: number; sag: number; bulbs: number; r?: number }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 + sag * 2
  const items: ReactNode[] = []
  for (let i = 1; i < bulbs; i++) {
    const t = i / bulbs
    const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2
    const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2
    items.push(<Bulb key={i} x={px} y={py + r * 1.6} r={r} />)
  }
  return (
    <g>
      <path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} strokeWidth={FINE} className={fineClass} />
      {items}
    </g>
  )
}

// A small mast for the scenes and the set drawing.
function MiniMast({ x, ground, height, w = 8, guyTo }: { x: number; ground: number; height: number; w?: number; guyTo?: number }) {
  const top = ground - height
  const collar = ground - height * 0.5
  return (
    <g>
      {guyTo !== undefined && (
        <line x1={x} y1={top + 4} x2={guyTo} y2={ground + 2} strokeWidth={FINE} strokeDasharray="7 6" className={fineClass} />
      )}
      <rect x={x - w / 2} y={collar} width={w} height={ground - collar} className="fill-nm-text-s" />
      <rect x={x - w * 0.32} y={top} width={w * 0.64} height={collar - top} className="fill-nm-text-s" />
      <rect x={x - w * 0.8} y={collar - w} width={w * 1.6} height={w * 2} rx={1.5} className="fill-nm-green-text" />
      <rect x={x - w * 0.7} y={top - w * 0.4} width={w * 1.4} height={w} rx={1.5} className="fill-nm-green-text" />
      <rect x={x - w * 0.9} y={ground - w} width={w * 1.8} height={w} rx={1.5} className="fill-nm-green-text" />
    </g>
  )
}

function DuskSky({ w, h, horizon }: { w: number; h: number; horizon: number }) {
  const id = `sky${useId().replace(/:/g, '')}`
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'rgb(var(--nm-bg))' }} />
          <stop offset="0.6" style={{ stopColor: 'rgb(var(--nm-s3))' }} />
          <stop offset="0.86" style={{ stopColor: 'rgb(var(--nm-border-light))' }} />
          <stop offset="1" style={{ stopColor: 'rgb(var(--nm-bulb) / 0.5)' }} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={w} height={horizon} fill={`url(#${id})`} />
      <rect x={0} y={horizon} width={w} height={h - horizon} className="fill-nm-bg" />
    </>
  )
}

// Many small crowns under a slowly changing height, so it reads as a distant forest.
function Treeline({ w, y, seed = 1 }: { w: number; y: number; seed?: number }) {
  let d = `M0 ${y}`
  let x = 0
  let i = seed * 7
  while (x < w) {
    i += 1
    const width = 10 + (i * i * 13) % 22
    const envelope = 22 + 14 * Math.sin(x * 0.011 + seed) + 8 * Math.sin(x * 0.037 + seed * 2)
    const top = y - envelope - (i * 31) % 12
    d += ` Q${x + width / 2} ${top - 8} ${x + width} ${top + 6}`
    x += width
  }
  d += ` L${x} ${y} Z`
  return <path d={d} className="fill-nm-s1" stroke="none" />
}

function TerraceGrid({ w, h, horizon, cx }: { w: number; h: number; horizon: number; cx: number }) {
  const rays: ReactNode[] = []
  for (let i = -12; i <= 12; i++) {
    rays.push(<line key={`r${i}`} x1={cx} y1={horizon} x2={cx + i * w * 0.16} y2={h} />)
  }
  const rows: ReactNode[] = []
  for (let i = 1; i <= 7; i++) {
    const y = horizon + (h - horizon) * Math.pow(i / 7, 2)
    rows.push(<line key={`h${i}`} x1={0} y1={y} x2={w} y2={y} />)
  }
  return <g strokeWidth={1} className="stroke-nm-border-mid" opacity={0.75}>{rays}{rows}</g>
}

// ─── Parts ───────────────────────────────────────────────────────────────

function FestoonCap({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y - 44} x2={x} y2={y + 4} strokeWidth={8} className="stroke-nm-green-text" />
      <circle cx={x} cy={y - 58} r={16} strokeWidth={LINE + 1} className="stroke-nm-green-text" />
      <Node x={x} y={y} w={120} h={106} r={10} />
      <rect x={x - 76} y={y + 44} width={18} height={26} rx={3} strokeWidth={LINE} className={nodeClass} />
      <rect x={x + 58} y={y + 44} width={18} height={26} rx={3} strokeWidth={LINE} className={nodeClass} />
      <DRing x={x - 82} y={y + 57} dir={-1} />
      <DRing x={x + 82} y={y + 57} />
      <path d={`M${x - 20} ${y + 34} H${x + 20} A20 20 0 0 1 ${x - 20} ${y + 34} Z`} strokeWidth={LINE + 1} className="stroke-nm-green-text" />
    </g>
  )
}

const parts = {
  mast: () => (
    <>
      <Ground x1={70} x2={670} y={540} />
      <line x1={392} y1={50} x2={110} y2={538} strokeWidth={FINE} strokeDasharray="9 7" className={fineClass} />
      <polygon points="104,540 118,540 111,566" className="fill-nm-text-s" />
      <Festoon x1={408} y1={52} x2={660} y2={120} sag={24} bulbs={5} r={4.5} />
      <polygon points="392,540 408,540 400,588" strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <VTube x={400} top={290} bottom={510} w={24} />
      <VTube x={400} top={58} bottom={290} w={15} />
      <Node x={400} y={500} w={46} h={40} />
      <Node x={400} y={270} w={40} h={44} />
      <circle cx={428} cy={292} r={8} strokeWidth={LINE} className={nodeClass} />
      <Node x={400} y={34} w={30} h={26} />
      <Annot>
        <Leader x1={406} y1={170} x2={460} y2={170} />
        <Label x={468} y={181}>Ø38 × 3</Label>
        <Leader x1={438} y1={292} x2={460} y2={292} />
        <Label x={468} y={303}>Collar</Label>
        <Leader x1={410} y1={410} x2={460} y2={410} />
        <Label x={468} y={421}>Ø60 × 4</Label>
        <Label x={70} y={250}>Guy line</Label>
      </Annot>
      <DimV x={716} y1={36} y2={540} label="3.2 m" />
    </>
  ),
  collar: () => (
    <>
      <VTube x={290} top={330} bottom={570} w={150} />
      <BreakLine x={290} y={570} w={150} />
      <VTube x={290} top={36} bottom={240} w={96} />
      <BreakLine x={290} y={36} w={96} />
      {[80, 130, 180].map((y) => (
        <circle key={y} cx={290} cy={y} r={10} strokeWidth={LINE} className={`fill-nm-bg ${lineClass}`} />
      ))}
      <Node x={290} y={226} w={196} h={140} r={12} />
      <line x1={290} y1={226} x2={290} y2={366} strokeWidth={LINE} className="stroke-nm-green-text" strokeDasharray="10 6" />
      <HatchRect x={196} y={236} w={40} h={120} />
      <HatchRect x={344} y={236} w={40} h={120} />
      <rect x={388} y={282} width={40} height={24} strokeWidth={LINE} className={nodeClass} />
      <circle cx={452} cy={294} r={30} strokeWidth={LINE} className={nodeClass} />
      <circle cx={452} cy={294} r={10} strokeWidth={LINE} className="stroke-nm-green-text" />
      <rect x={120} y={252} width={76} height={14} strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <circle cx={108} cy={259} r={14} strokeWidth={LINE} className={lineClass} />
      <Annot>
        <Leader x1={330} y1={110} x2={510} y2={110} />
        <Label x={520} y={121}>Ø38 × 3</Label>
        <Leader x1={486} y1={294} x2={510} y2={294} />
        <Label x={520} y={305}>Knob</Label>
        <Leader x1={360} y1={350} x2={510} y2={380} />
        <Label x={520} y={391}>Split collar</Label>
        <Leader x1={345} y1={480} x2={510} y2={480} />
        <Label x={520} y={491}>Ø60 × 4</Label>
        <Label x={40} y={216}>Cross-pin</Label>
        <Label x={40} y={130}>3 heights</Label>
      </Annot>
    </>
  ),
  baseSpike: () => (
    <>
      <VTube x={320} top={40} bottom={230} w={110} />
      <BreakLine x={320} y={40} w={110} />
      <Node x={320} y={200} w={150} h={100} r={10} />
      <rect x={160} y={296} width={320} height={26} rx={5} strokeWidth={LINE} className={nodeClass} />
      <Ground x1={60} x2={580} y={322} />
      <polygon points="288,322 352,322 320,572" strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <Annot>
        <Leader x1={360} y1={120} x2={500} y2={120} />
        <Label x={510} y={131}>Ø60 lower tube</Label>
        <Leader x1={390} y1={250} x2={500} y2={250} />
        <Label x={510} y={261}>Socket</Label>
        <Leader x1={336} y1={470} x2={500} y2={470} />
        <Label x={510} y={481}>Ground spike</Label>
      </Annot>
    </>
  ),
  baseTripod: () => (
    <>
      <VTube x={400} top={40} bottom={290} w={84} />
      <BreakLine x={400} y={40} w={84} />
      <Ground x1={70} x2={730} y={544} />
      <g strokeWidth={22} strokeLinecap="round" className="stroke-nm-steel">
        <line x1={400} y1={340} x2={400} y2={528} />
      </g>
      <g strokeWidth={24} strokeLinecap="round" className="stroke-nm-steel-l">
        <line x1={370} y1={340} x2={150} y2={530} />
        <line x1={430} y1={340} x2={650} y2={530} />
      </g>
      <Node x={400} y={270} w={130} h={94} r={10} />
      <rect x={118} y={524} width={64} height={20} rx={5} strokeWidth={LINE} className={nodeClass} />
      <rect x={618} y={524} width={64} height={20} rx={5} strokeWidth={LINE} className={nodeClass} />
      <rect x={368} y={524} width={64} height={20} rx={5} strokeWidth={LINE} className={nodeClass} />
      <Annot>
        <Leader x1={438} y1={140} x2={500} y2={140} />
        <Label x={510} y={151}>Ø60 tube</Label>
        <Leader x1={462} y1={310} x2={530} y2={280} />
        <Label x={540} y={280}>Hub</Label>
      </Annot>
    </>
  ),
  topFestoon: () => (
    <>
      <Festoon x1={232} y1={280} x2={20} y2={350} sag={20} bulbs={3} r={6} />
      <Festoon x1={568} y1={280} x2={780} y2={350} sag={20} bulbs={3} r={6} />
      <VTube x={400} top={320} bottom={570} w={72} />
      <BreakLine x={400} y={570} w={72} />
      <g transform="translate(0 0) scale(1)">
        <FestoonCap x={400} y={222} />
      </g>
      <Annot>
        <Leader x1={408} y1={164} x2={500} y2={110} />
        <Label x={510} y={108}>Guy eye</Label>
        <Label x={500} y={450}>3 D-rings</Label>
        <Leader x1={486} y1={298} x2={520} y2={420} />
      </Annot>
    </>
  ),
  topBanner: () => (
    <>
      <VTube x={220} top={260} bottom={570} w={72} />
      <BreakLine x={220} y={570} w={72} />
      <HTube left={280} right={740} y={156} h={24} />
      <Node x={220} y={110} w={120} h={160} r={10} />
      <circle cx={728} cy={156} r={8} className="fill-nm-green-text" />
      <path
        d="M330 170 C420 186 520 156 690 174 L690 468 C560 448 440 486 330 468 Z"
        strokeWidth={LINE}
        className="fill-nm-green-deep stroke-nm-green-text"
      />
      {[350, 430, 510, 590, 670].map((x) => (
        <line key={x} x1={x} y1={160} x2={x} y2={172} strokeWidth={LINE} className={lineClass} />
      ))}
      <Annot>
        <Label x={480} y={120}>Side arm</Label>
        <Leader x1={150} y1={190} x2={70} y2={190} />
        <Label x={40} y={90}>Top</Label>
        <Leader x1={70} y1={190} x2={70} y2={104} />
      </Annot>
    </>
  ),
  topCamera: () => (
    <>
      <VTube x={400} top={320} bottom={570} w={72} />
      <BreakLine x={400} y={570} w={72} />
      <Node x={400} y={210} w={120} h={120} r={10} />
      <rect x={230} y={170} width={340} height={40} rx={6} strokeWidth={LINE} className={nodeClass} />
      <g strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`}>
        <rect x={304} y={132} width={20} height={38} />
        <rect x={470} y={120} width={28} height={50} />
      </g>
      {[140, 148, 156].map((y) => (
        <line key={y} x1={304} y1={y} x2={324} y2={y} strokeWidth={FINE} className={lineClass} />
      ))}
      {[128, 138, 148, 158].map((y) => (
        <line key={y} x1={470} y1={y} x2={498} y2={y} strokeWidth={FINE} className={lineClass} />
      ))}
      <Annot>
        <Leader x1={314} y1={132} x2={260} y2={84} />
        <Label x={250} y={74} anchor="end">1/4&quot;</Label>
        <Leader x1={484} y1={120} x2={540} y2={74} />
        <Label x={550} y={74}>3/8&quot;</Label>
      </Annot>
    </>
  ),
  topSail: () => (
    <>
      <polygon points="570,262 790,120 790,480" className="fill-nm-green-deep" />
      <polyline points="790,120 570,262 790,480" strokeWidth={LINE} className="stroke-nm-green-text" />
      <VTube x={280} top={36} bottom={570} w={72} />
      <BreakLine x={280} y={36} w={72} />
      <BreakLine x={280} y={570} w={72} />
      <Node x={280} y={190} w={136} h={150} r={10} />
      <path d="M348 230 H450 V300 H348" strokeWidth={LINE} className={nodeClass} />
      <rect x={450} y={250} width={30} height={30} rx={4} strokeWidth={LINE} className={nodeClass} />
      <path d="M484 228 L484 302 A37 37 0 0 0 484 228 Z" strokeWidth={LINE + 2} className="stroke-nm-green-text" />
      <line x1={520} y1={265} x2={570} y2={262} strokeWidth={LINE + 1} className={lineClass} />
      <circle cx={196} cy={265} r={18} strokeWidth={LINE} className={nodeClass} />
      <rect x={196} y={258} width={16} height={14} strokeWidth={LINE} className={nodeClass} />
      <Annot>
        <Leader x1={500} y1={232} x2={500} y2={120} />
        <Label x={490} y={108} anchor="end">D-ring</Label>
        <Label x={40} y={420}>Clamp</Label>
        <Leader x1={250} y1={330} x2={130} y2={392} />
      </Annot>
    </>
  ),
  extension: () => (
    <>
      <VTube x={300} top={330} bottom={570} w={96} />
      <BreakLine x={300} y={570} w={96} />
      <VTube x={300} top={36} bottom={250} w={74} />
      <BreakLine x={300} y={36} w={74} />
      <Node x={300} y={236} w={140} h={114} r={10} />
      <rect x={370} y={282} width={26} height={22} strokeWidth={LINE} className={nodeClass} />
      <circle cx={416} cy={293} r={22} strokeWidth={LINE} className={nodeClass} />
      <Annot>
        <Leader x1={330} y1={130} x2={480} y2={130} />
        <Label x={490} y={141}>Ø31 × 3</Label>
        <Leader x1={440} y1={293} x2={480} y2={293} />
        <Label x={490} y={304}>38→31 collar</Label>
        <Leader x1={340} y1={470} x2={480} y2={470} />
        <Label x={490} y={481}>Ø38 × 3</Label>
        <Label x={490} y={400}>4.5 m, guyed</Label>
      </Annot>
    </>
  ),
  crossClamp: () => (
    <>
      <VTube x={280} top={36} bottom={570} w={84} />
      <BreakLine x={280} y={36} w={84} />
      <BreakLine x={280} y={570} w={84} />
      <HTube left={330} right={780} y={300} h={54} />
      <Node x={280} y={214} w={140} h={172} r={10} />
      <rect x={340} y={250} width={80} height={100} rx={8} strokeWidth={LINE} className={nodeClass} />
      <circle cx={380} cy={230} r={18} strokeWidth={LINE} className={nodeClass} />
      <rect x={374} y={230} width={12} height={22} strokeWidth={LINE} className={nodeClass} />
      <Annot>
        <Label x={480} y={230}>Cross clamp</Label>
        <Label x={520} y={400}>Your crossbar</Label>
        <Leader x1={640} y1={320} x2={640} y2={366} />
      </Annot>
    </>
  ),
  packed: () => (
    <>
      <HTube left={70} right={730} y={196} h={46} />
      <HTube left={120} right={690} y={252} h={34} />
      {[210, 590].map((x) => (
        <rect key={x} x={x} y={162} width={24} height={118} rx={3} strokeWidth={LINE} className={nodeClass} />
      ))}
      <Node x={150} y={350} w={120} h={90} r={8} />
      <Node x={300} y={350} w={100} h={90} r={8} />
      <Node x={420} y={350} w={80} h={90} r={8} />
      <circle cx={530} cy={395} r={36} strokeWidth={LINE} strokeDasharray="6 5" className={lineClass} />
      <DimH x1={70} x2={730} y={500} label="~1.8 m" />
      <Annot>
        <Label x={70} y={120}>Ø60 + Ø38 nested</Label>
        <Label x={590} y={410}>~4.5 kg</Label>
      </Annot>
    </>
  ),
  antennaTop: () => (
    <>
      <Ground x1={70} x2={670} y={540} />
      <line x1={392} y1={112} x2={110} y2={538} strokeWidth={FINE} strokeDasharray="9 7" className={fineClass} />
      <line x1={408} y1={112} x2={660} y2={538} strokeWidth={FINE} strokeDasharray="9 7" className={fineClass} />
      <VTube x={400} top={320} bottom={510} w={24} />
      <VTube x={400} top={112} bottom={320} w={15} />
      <Node x={400} y={500} w={46} h={40} />
      <Node x={400} y={300} w={40} h={44} />
      <Node x={400} y={92} w={30} h={26} />
      <line x1={262} y1={66} x2={538} y2={66} strokeWidth={5} className="stroke-nm-text-s" />
      {[282, 340, 400, 460, 518].map((x, i) => (
        <line key={x} x1={x} y1={[30, 36, 22, 40, 44][i]} x2={x} y2={[102, 96, 110, 92, 88][i]} strokeWidth={4} className="stroke-nm-text-s" />
      ))}
      <line x1={400} y1={66} x2={400} y2={92} strokeWidth={5} className="stroke-nm-text-s" />
      <Annot>
        <Label x={468} y={200}>Non-metal tube</Label>
        <Leader x1={410} y1={190} x2={460} y2={190} />
        <Label x={468} y={320}>Nylon fasteners</Label>
        <Leader x1={420} y1={312} x2={460} y2={312} />
      </Annot>
    </>
  ),
}

// ─── Exploded view as a drawing sheet, numbered to match MAST_PAGE.howItWorks.callouts ──────
// 1 px lines at any size. Grey only; the accent is reserved for the numbered callouts.

const sheetLine = { strokeWidth: 1, vectorEffect: 'non-scaling-stroke' as const, className: fineClass }

function SheetText({ x, y, children, anchor = 'start' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={28} className="fill-nm-text-s font-mono" stroke="none">
      {children}
    </text>
  )
}

function Callout({ n, x, y, toX, toY }: { n: number; x: number; y: number; toX: number; toY: number }) {
  return (
    <g>
      <line x1={toX} y1={toY} x2={x + (toX < x ? -22 : 22)} y2={y} {...sheetLine} />
      <circle cx={x} cy={y} r={22} strokeWidth={1} vectorEffect="non-scaling-stroke" className="stroke-nm-green-text" />
      <text x={x} y={y + 10} textAnchor="middle" fontSize={28} className="fill-nm-green-text font-mono" stroke="none">{n}</text>
    </g>
  )
}

function TubeOutline({ x, top, bottom, w, wall }: { x: number; top: number; bottom: number; w: number; wall: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} {...sheetLine} />
      <line x1={x - w / 2 + wall} y1={top} x2={x - w / 2 + wall} y2={bottom} strokeDasharray="6 5" {...sheetLine} />
      <line x1={x + w / 2 - wall} y1={top} x2={x + w / 2 - wall} y2={bottom} strokeDasharray="6 5" {...sheetLine} />
    </g>
  )
}

function Exploded() {
  const cx = 210
  return (
    <>
      <rect x={12} y={12} width={676} height={976} {...sheetLine} />

      {/* Centre line and guy line */}
      <line x1={cx} y1={24} x2={cx} y2={976} strokeDasharray="22 6 4 6" {...sheetLine} />
      <line x1={cx - 30} y1={66} x2={52} y2={960} strokeDasharray="8 6" {...sheetLine} />
      <line x1={36} y1={960} x2={68} y2={960} {...sheetLine} />

      {/* Top adapter */}
      <rect x={cx - 30} y={40} width={60} height={56} rx={3} {...sheetLine} />
      <circle cx={cx + 44} cy={68} r={13} {...sheetLine} />
      <line x1={cx + 30} y1={68} x2={cx + 31} y2={68} {...sheetLine} />

      <TubeOutline x={cx} top={130} bottom={420} w={26} wall={5} />

      {/* Collar, knob and cross-pin */}
      <rect x={cx - 30} y={460} width={60} height={72} rx={3} {...sheetLine} />
      <line x1={cx - 30} y1={496} x2={cx + 30} y2={496} {...sheetLine} />
      <rect x={cx + 30} y={486} width={14} height={20} {...sheetLine} />
      <circle cx={cx + 56} cy={496} r={12} {...sheetLine} />
      <rect x={cx - 92} y={491} width={46} height={10} {...sheetLine} />

      <TubeOutline x={cx} top={568} bottom={812} w={42} wall={6} />

      {/* Base and spike */}
      <rect x={cx - 34} y={850} width={68} height={46} rx={3} {...sheetLine} />
      <polygon points={`${cx - 14},896 ${cx + 14},896 ${cx},976`} {...sheetLine} />

      <Callout n={1} x={342} y={872} toX={cx + 34} toY={872} />
      <Callout n={2} x={342} y={690} toX={cx + 21} toY={690} />
      <Callout n={3} x={342} y={496} toX={cx + 68} toY={496} />
      <Callout n={4} x={342} y={275} toX={cx + 13} toY={275} />
      <Callout n={5} x={342} y={68} toX={cx + 57} toY={68} />
      <Callout n={6} x={62} y={520} toX={138} toY={520} />

      <SheetText x={376} y={700}>Ø60 × 4</SheetText>
      <SheetText x={376} y={285}>Ø38 × 3</SheetText>
      <SheetText x={376} y={506}>Collar</SheetText>

      {/* Title block */}
      <rect x={384} y={836} width={304} height={152} {...sheetLine} />
      <line x1={384} y1={888} x2={688} y2={888} {...sheetLine} />
      <line x1={384} y1={938} x2={688} y2={938} {...sheetLine} />
      <SheetText x={398} y={873}>NM-MAST-EVENT</SheetText>
      <SheetText x={398} y={923}>REV A</SheetText>
      <SheetText x={398} y={973}>DIMENSIONS IN MM</SheetText>
    </>
  )
}

// ─── Scenes ──────────────────────────────────────────────────────────────

function SceneFestoonHero() {
  return (
    <>
      <DuskSky w={1600} h={900} horizon={640} />
      <Treeline w={1600} y={640} seed={2} />
      <TerraceGrid w={1600} h={900} horizon={640} cx={760} />
      <ellipse cx={1000} cy={760} rx={520} ry={70} className="fill-nm-bulb" opacity={0.05} />

      <MiniMast x={620} ground={670} height={190} w={7} guyTo={540} />
      <MiniMast x={850} ground={720} height={320} w={10} guyTo={700} />
      <MiniMast x={1210} ground={830} height={640} w={18} guyTo={1000} />

      <Festoon x1={470} y1={520} x2={620} y2={482} sag={8} bulbs={5} r={3} />
      <Festoon x1={620} y1={482} x2={850} y2={402} sag={16} bulbs={8} r={3.5} />
      <Festoon x1={850} y1={402} x2={1210} y2={192} sag={30} bulbs={10} r={5} />
      <Festoon x1={1210} y1={192} x2={1620} y2={330} sag={34} bulbs={9} r={6.5} />

      <Annot>
        <g strokeWidth={FINE} className={fineClass}>
          <line x1={1290} y1={190} x2={1290} y2={830} />
          <line x1={1280} y1={200} x2={1300} y2={180} />
          <line x1={1280} y1={840} x2={1300} y2={820} />
        </g>
        <text x={1306} y={540} fontSize={24} className="fill-nm-text-s font-mono" stroke="none">3.2 m</text>
      </Annot>
    </>
  )
}

function SceneFestoon() {
  return (
    <>
      <DuskSky w={800} h={600} horizon={430} />
      <Treeline w={800} y={430} seed={3} />
      <TerraceGrid w={800} h={600} horizon={430} cx={360} />
      <MiniMast x={190} ground={456} height={150} w={7} guyTo={120} />
      <MiniMast x={560} ground={540} height={420} w={14} guyTo={410} />
      <Festoon x1={30} y1={320} x2={190} y2={306} sag={10} bulbs={5} r={3.5} />
      <Festoon x1={190} y1={306} x2={560} y2={120} sag={24} bulbs={9} r={5} />
      <Festoon x1={560} y1={120} x2={820} y2={210} sag={24} bulbs={6} r={6} />
    </>
  )
}

function SceneBanner() {
  return (
    <>
      <DuskSky w={800} h={600} horizon={450} />
      <Treeline w={800} y={450} seed={5} />
      <TerraceGrid w={800} h={600} horizon={450} cx={400} />
      <MiniMast x={180} ground={510} height={380} w={12} guyTo={40} />
      <MiniMast x={620} ground={510} height={380} w={12} guyTo={760} />
      <rect x={180} y={160} width={440} height={9} className="fill-nm-text-s" />
      <rect x={168} y={150} width={24} height={30} rx={3} className="fill-nm-green-text" />
      <rect x={608} y={150} width={24} height={30} rx={3} className="fill-nm-green-text" />
      <rect x={204} y={176} width={392} height={140} strokeWidth={LINE} className="fill-nm-green-deep stroke-nm-green-text" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={232 + i * 56} y1={168} x2={232 + i * 56} y2={176} strokeWidth={FINE} className={lineClass} />
      ))}
    </>
  )
}

function SceneSail() {
  return (
    <>
      <DuskSky w={800} h={600} horizon={440} />
      <Treeline w={800} y={440} seed={7} />
      <TerraceGrid w={800} h={600} horizon={440} cx={420} />
      <MiniMast x={130} ground={520} height={400} w={12} guyTo={30} />
      <MiniMast x={700} ground={500} height={330} w={11} guyTo={785} />
      <MiniMast x={420} ground={456} height={150} w={7} />
      <path
        d="M130 128 Q 400 215 700 176 Q 540 240 420 310 Q 280 200 130 128 Z"
        strokeWidth={LINE}
        className="fill-nm-green-deep stroke-nm-green-text"
      />
    </>
  )
}

function SceneCamera() {
  return (
    <>
      <DuskSky w={800} h={600} horizon={460} />
      <Treeline w={800} y={460} seed={9} />
      <TerraceGrid w={800} h={600} horizon={460} cx={400} />
      <polygon points="470,132 800,100 800,330" className="fill-nm-bulb" opacity={0.1} />
      <MiniMast x={400} ground={530} height={380} w={13} guyTo={190} />
      <rect x={348} y={108} width={104} height={46} rx={6} strokeWidth={LINE} className={`fill-nm-s3 ${lineClass}`} />
      <rect x={452} y={116} width={22} height={30} strokeWidth={LINE} className={`fill-nm-border-mid ${lineClass}`} />
      <rect x={364} y={96} width={36} height={12} rx={2} className="fill-nm-text-s" />
    </>
  )
}

function SceneAntenna() {
  return (
    <>
      <DuskSky w={800} h={600} horizon={470} />
      <Treeline w={800} y={470} seed={11} />
      <TerraceGrid w={800} h={600} horizon={470} cx={400} />
      <MiniMast x={400} ground={540} height={400} w={13} guyTo={210} />
      <line x1={400} y1={540} x2={590} y2={140} strokeWidth={0} />
      <line x1={300} y1={120} x2={500} y2={120} strokeWidth={5} className="stroke-nm-text-s" />
      {[320, 365, 410, 455, 490].map((x, i) => (
        <line key={x} x1={x} y1={120 - [40, 36, 30, 26, 22][i]} x2={x} y2={120 + [40, 36, 30, 26, 22][i]} strokeWidth={4} className="stroke-nm-text-s" />
      ))}
      {[46, 82, 118].map((r) => (
        <path key={r} d={`M${510 + r * 0.5} ${120 - r * 0.86} A${r} ${r} 0 0 1 ${510 + r * 0.5} ${120 + r * 0.86}`} strokeWidth={LINE} className="stroke-nm-green-text" opacity={0.9 - r / 240} />
      ))}
    </>
  )
}

// ─── Registry ────────────────────────────────────────────────────────────

interface Drawing {
  title: string
  viewBox?: string
  dark?: boolean
  content: () => ReactNode
}

const drawings: Record<string, Drawing> = {
  mast: { title: 'Assembled NM Mast, 3.2 m tall, with festoon top, lock collar, ground spike and guy line', content: parts.mast },
  collar: { title: 'Close-up of the split lock collar with knob and cross-pin between the Ø60 and Ø38 tubes', content: parts.collar },
  'base-spike': { title: 'Ground-spike base with a socket for the Ø60 tube', content: parts.baseSpike },
  'base-tripod': { title: 'Three-legged hard-ground base for the Ø60 tube', content: parts.baseTripod },
  'top-festoon': { title: 'Festoon top with three D-rings and a guy eye', content: parts.topFestoon },
  'top-banner': { title: 'Flag and banner arm holding a banner out from the mast', content: parts.topBanner },
  'top-camera': { title: 'Camera and light top with 1/4 inch and 3/8 inch mounts', content: parts.topCamera },
  'top-sail': { title: 'Shade-sail clamp with a D-ring holding the corner of a sail', content: parts.topSail },
  extension: { title: 'Ø31 extension section fitted to the Ø38 tube with a 38 to 31 collar', content: parts.extension },
  'cross-clamp': { title: 'Cross clamp holding a horizontal crossbar on the mast', content: parts.crossClamp },
  packed: { title: 'Mast kit packed for transport: nested tubes about 1.8 m long, plus printed parts', content: parts.packed },
  'metal-free': { title: 'Metal-free mast with guy lines carrying an antenna', content: parts.antennaTop },
  'tops-sheet': {
    title: 'The four top adapters: festoon, banner, camera and shade sail',
    content: () => (
      <>
        {[
          { label: 'Festoon', draw: parts.topFestoon, x: 0, y: 0 },
          { label: 'Banner', draw: parts.topBanner, x: 400, y: 0 },
          { label: 'Camera', draw: parts.topCamera, x: 0, y: 300 },
          { label: 'Shade sail', draw: parts.topSail, x: 400, y: 300 },
        ].map((t) => (
          <g key={t.label} transform={`translate(${t.x} ${t.y})`}>
            <g transform="scale(0.5)" className="nm-bare">{t.draw()}</g>
            <rect x={0} y={0} width={t.label.length * 22 + 20} height={44} className="fill-nm-s1" />
            <Label x={10} y={32}>{t.label}</Label>
          </g>
        ))}
        <g strokeWidth={FINE} className="stroke-nm-border-light">
          <line x1={400} y1={0} x2={400} y2={600} />
          <line x1={0} y1={300} x2={800} y2={300} />
        </g>
      </>
    ),
  },
  'festoon-set': {
    title: 'Four NM Masts in a row, carrying festoon lights between them',
    content: () => (
      <>
        <Ground x1={30} x2={770} y={500} />
        {[110, 300, 490, 680].map((x) => (
          <g key={x}>
            <VTube x={x} top={140} bottom={320} w={10} />
            <VTube x={x} top={320} bottom={490} w={16} />
            <Node x={x} y={306} w={26} h={30} r={4} />
            <Node x={x} y={124} w={22} h={20} r={4} />
            <Node x={x} y={470} w={30} h={30} r={4} />
          </g>
        ))}
        <Festoon x1={110} y1={140} x2={300} y2={140} sag={22} bulbs={6} />
        <Festoon x1={300} y1={140} x2={490} y2={140} sag={22} bulbs={6} />
        <Festoon x1={490} y1={140} x2={680} y2={140} sag={22} bulbs={6} />
        <line x1={110} y1={144} x2={36} y2={500} strokeWidth={FINE} strokeDasharray="9 7" className={fineClass} />
        <line x1={680} y1={144} x2={764} y2={500} strokeWidth={FINE} strokeDasharray="9 7" className={fineClass} />
        <Annot>
          <Label x={400} y={70} anchor="middle">4 × 3.2 m</Label>
        </Annot>
      </>
    ),
  },
  exploded: { title: 'Engineering drawing: exploded view of the NM Event Mast, numbered from the base to the guy line, with tube sizes Ø60 × 4 and Ø38 × 3', viewBox: '0 0 700 1000', content: () => <Exploded /> },
  'scene-hero': { title: 'NM Masts carrying festoon lights across a terrace at dusk', viewBox: '0 0 1600 900', dark: true, content: () => <SceneFestoonHero /> },
  'scene-festoon': { title: 'Masts carrying festoon lights at dusk', dark: true, content: () => <SceneFestoon /> },
  'scene-banner': { title: 'A banner gate on a crossbar between two guyed masts', dark: true, content: () => <SceneBanner /> },
  'scene-sail': { title: 'A shade sail held by three masts', dark: true, content: () => <SceneSail /> },
  'scene-camera': { title: 'A camera rig on a guyed mast', dark: true, content: () => <SceneCamera /> },
  'scene-antenna': { title: 'A directional antenna on a metal-free guyed mast', dark: true, content: () => <SceneAntenna /> },
}

export function isIllustration(key: string): boolean {
  return key in drawings
}

export function illustrationIsScene(key: string): boolean {
  return !!drawings[key]?.dark
}

export default function Illustration({
  name,
  bare = false,
  slice = false,
  decorative = false,
  className = '',
}: {
  name: string
  bare?: boolean
  slice?: boolean
  decorative?: boolean
  className?: string
}) {
  const drawing = drawings[name]
  if (!drawing) return null
  return (
    <svg
      viewBox={drawing.viewBox ?? '0 0 800 600'}
      preserveAspectRatio={slice ? 'xMaxYMid slice' : 'xMidYMid meet'}
      fill="none"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': drawing.title })}
      className={`block w-full h-full ${drawing.dark ? 'dark' : ''} ${bare ? 'nm-bare' : ''} ${className}`}
    >
      {drawing.content()}
    </svg>
  )
}
