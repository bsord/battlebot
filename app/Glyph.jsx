// Side-view connector drawings. Each faces +x with its mating face at x=0 and its body
// extending left. They're drawn the way the real parts look:
//   XT / JST male:   a shroud with the pins recessed inside it
//   XT / JST female: socket barrels that slide into the male's shroud
//   bullet male:     a solid pin; female: a socket tube
//   servo male:      bare header pins; female: a 3-socket plug

const XT = { fill: "#f2c230", line: "#8a6d10", cavity: "#3b3000" };
const JST = { fill: "#c8352b", line: "#7a1d16", cavity: "#3a0d0a" };
const GOLD = "#d4a531";

const SIZE = {
  xt30: { L: 16, H: 11 },
  xt60: { L: 22, H: 15 },
  jst: { L: 14, H: 9 },
  bullet35: { L: 13, H: 5 },
  servo: { L: 12, H: 9 },
  pin1: { L: 7, H: 4 },
  dupont2: { L: 9, H: 6 },
  bare: { L: 12, H: 3 },
};

export function plugLength(type) {
  return SIZE[type].L;
}

function Shrouded({ L, H, c, male }) {
  if (male) {
    return (
      <g>
        <rect x={-L} y={-H / 2} width={L} height={H} rx="1.5" fill={c.fill} stroke={c.line} strokeWidth="0.7" />
        {/* open cavity facing the partner, pins inside it */}
        <rect x={-L * 0.45} y={-H * 0.36} width={L * 0.45 + 0.4} height={H * 0.72} fill={c.cavity} />
        <rect x={-L * 0.45} y={-H * 0.2 - H * 0.07} width={L * 0.4} height={H * 0.14} rx={H * 0.07} fill={GOLD} />
        <rect x={-L * 0.45} y={H * 0.2 - H * 0.07} width={L * 0.4} height={H * 0.14} rx={H * 0.07} fill={GOLD} />
      </g>
    );
  }
  const bh = H * 0.3; // barrel height; two barrels fit the male's cavity
  return (
    <g>
      <rect x={-L} y={-H / 2} width={L * 0.58} height={H} rx="1.5" fill={c.fill} stroke={c.line} strokeWidth="0.7" />
      {[-H * 0.19, H * 0.19].map((cy) => (
        <g key={cy}>
          <rect x={-L * 0.44} y={cy - bh / 2} width={L * 0.44} height={bh} rx={bh / 2} fill={c.fill} stroke={c.line} strokeWidth="0.7" />
          <rect x={-L * 0.12} y={cy - bh * 0.22} width={L * 0.12} height={bh * 0.44} fill={c.cavity} />
        </g>
      ))}
    </g>
  );
}

function Body({ type, g }) {
  const { L, H } = SIZE[type];
  switch (type) {
    case "xt30":
    case "xt60":
      return <Shrouded L={L} H={H} c={XT} male={g === "m"} />;
    case "jst":
      return <Shrouded L={L} H={H} c={JST} male={g === "m"} />;
    case "bullet35":
      // male: heat shrink, then a grooved gold pin. female: heat shrink, then a gold socket tube.
      return g === "m" ? (
        <g>
          <rect x={-L} y={-H * 0.42} width={L * 0.45} height={H * 0.84} rx="1" fill="#2b6cb0" />
          <rect x={-L * 0.55} y={-H * 0.3} width={L * 0.55} height={H * 0.6} rx={H * 0.3} fill={GOLD} stroke="#9c7b22" strokeWidth="0.3" />
          {[0.2, 0.32].map((f) => (
            <line key={f} x1={-L * f} y1={-H * 0.3} x2={-L * f} y2={H * 0.3} stroke="#9c7b22" strokeWidth="0.35" />
          ))}
        </g>
      ) : (
        <g>
          <rect x={-L} y={-H * 0.42} width={L * 0.4} height={H * 0.84} rx="1" fill="#2b6cb0" />
          <rect x={-L * 0.62} y={-H / 2} width={L * 0.62} height={H} rx="0.8" fill={GOLD} stroke="#9c7b22" strokeWidth="0.3" />
          <line x1={-L * 0.12} y1={-H / 2} x2={-L * 0.12} y2={H / 2} stroke="#9c7b22" strokeWidth="0.35" />
          <rect x={-0.6} y={-H * 0.3} width="0.6" height={H * 0.6} fill="#5a4608" />
        </g>
      );
    case "servo":
      return g === "m" ? (
        <g>
          <rect x={-L} y={-H / 2} width={L * 0.45} height={H} fill="#1b1b1b" />
          {[-H / 3, 0, H / 3].map((y) => (
            <rect key={y} x={-L * 0.55} y={y - 0.6} width={L * 0.55} height="1.2" fill={GOLD} />
          ))}
        </g>
      ) : (
        <g>
          <rect x={-L} y={-H / 2} width={L} height={H} rx="1" fill="#1b1b1b" />
          {[-H / 3, 0, H / 3].map((y, i) => (
            <g key={y}>
              <rect x={-L - 4} y={y - 0.6} width="4" height="1.2" fill={["#8b5a2b", "#d33", "#f08c00"][i]} />
              <rect x={-1.6} y={y - 0.7} width="1.6" height="1.4" fill="#555" />
            </g>
          ))}
        </g>
      );
    case "dupont2":
      if (g === "m") {
        // crimped male pins in a 2-pin housing, pins sticking out
        return (
          <g>
            <rect x={-L} y={-H / 2} width={L * 0.6} height={H} rx="0.8" fill="#1b1b1b" />
            {[-H / 4, H / 4].map((y) => <rect key={y} x={-L * 0.4} y={y - 0.5} width={L * 0.4} height="1" fill={GOLD} />)}
          </g>
        );
      }
    // falls through: the female is a plain socket housing
    case "pin1": {
      const holes = type === "pin1" ? [0] : [-H / 4, H / 4];
      return (
        <g>
          <rect x={-L} y={-H / 2} width={L} height={H} rx="0.8" fill="#1b1b1b" />
          {holes.map((y) => <rect key={y} x={-1.6} y={y - 0.7} width="1.6" height="1.4" fill="#555" />)}
        </g>
      );
    }
    default: // bare wire: insulation, then stripped copper
      return (
        <g>
          <rect x={-L} y={-H / 2} width={L * 0.5} height={H} rx="0.8" fill="#141414" />
          <rect x={-L * 0.5} y={-H * 0.33} width={L * 0.5} height={H * 0.66} rx="0.5" fill="#d08a45" />
        </g>
      );
  }
}

// How far the halves slide together when plugged in, as a negative gap.
// Shrouded plugs: the female's barrels go into the male's shroud.
// Bullets and header pins: the male pin goes into the female.
export function closedGap(a, b) {
  const male = a[1] === "m" ? a : b[1] === "m" ? b : null;
  const female = a[1] === "f" ? a : b[1] === "f" ? b : null;
  if (!male || !female) return 6; // nothing to plug together
  if (["xt30", "xt60", "jst"].includes(male[0])) return -SIZE[female[0]].L * 0.42;
  if (male[0] === "bullet35") return 1.5; // pin just at the tube opening, so it reads as the motor's
  return -SIZE[male[0]].L * 0.5;
}

const LETTER_FILL = { xt30: "#5a4608", xt60: "#5a4608", jst: "#fff", bullet35: "#fff", servo: "#fff", pin1: "#fff", dupont2: "#fff" };

export function Connector({ type, g, flip, letter }) {
  const { L, H } = SIZE[type];
  return (
    <g>
      <g transform={flip ? "scale(-1,1)" : undefined}>
        <Body type={type} g={g} />
      </g>
      {letter && g && (
        <text x={(flip ? 1 : -1) * L * 0.78} y={H * 0.2} textAnchor="middle" className="plug-letter"
          style={{ fontSize: Math.max(type === "bullet35" ? 4 : 3, H * 0.55), fill: LETTER_FILL[type] }}>
          {g.toUpperCase()}
        </text>
      )}
    </g>
  );
}

// A mating pair centered at (x, y): `a` on the left, `b` on the right.
// closed draws them plugged together; otherwise `gap` pulls them apart.
export function Pair({ a, b, x = 0, y = 0, angle = 0, scale = 1, gap = 3, closed = false, letters = false }) {
  const g = closed ? closedGap(a, b) : gap;
  // whichever half sits inside the other gets drawn first
  const shrouded = ["xt30", "xt60", "jst"].includes(a[0]);
  const insideFirst = closed && g < 0 && ((shrouded && a[1] === "m") || (!shrouded && a[1] === "f"));
  // letters: true for both halves, or "a" / "b" for just one
  const A = <g key="a" transform={`translate(${-g / 2} 0)`}><Connector type={a[0]} g={a[1]} letter={letters === true || letters === "a"} /></g>;
  const B = <g key="b" transform={`translate(${g / 2} 0)`}><Connector type={b[0]} g={b[1]} flip letter={letters === true || letters === "b"} /></g>;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      {insideFirst ? [B, A] : [A, B]}
    </g>
  );
}
