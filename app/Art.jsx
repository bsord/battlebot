// Top-down drawings of each part, fit to the node's `asm` rectangle.
// Colors here are the real part colors, so they don't follow the page theme.

function Lipo({ x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#1f2f4a" />
      <rect x={x + 12} y={y + 10} width={w - 24} height={h - 20} rx="3" fill="#2d4a78" />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" className="art-text">3S 450mAh</text>
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="art-sub">11.1V LiPo</text>
    </g>
  );
}

function Switch({ x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill="#1d1d1d" />
      <rect x={x + w / 2 - 12} y={y + h / 2 - 9} width="24" height="18" rx="3" fill="#c0392b" />
      <line x1={x + w / 2} y1={y + h / 2 - 9} x2={x + w / 2} y2={y + h / 2 + 9} stroke="#8e2a1f" strokeWidth="1.5" />
    </g>
  );
}

function Splitter({ x, y, w, h }) {
  // heat shrink where one lead becomes two
  return <rect x={x} y={y} width={w} height={h} rx="8" fill="#1a1a1a" stroke="#333" />;
}

function Adapter({ x, y, w, h }) {
  // the black band between the two ends of a rigid adapter
  return <rect x={x} y={y} width={w} height={h} rx="2" fill="#1a1a1a" />;
}

function Lead({ x, y, w, h }) {
  // a short adapter lead: red and black wire between two heat shrink ends
  return (
    <g>
      <line x1={x} y1={y + h / 2 - 2} x2={x + w} y2={y + h / 2 - 2} stroke="#d62828" strokeWidth="2.4" />
      <line x1={x} y1={y + h / 2 + 2} x2={x + w} y2={y + h / 2 + 2} stroke="#141414" strokeWidth="2.4" />
      <rect x={x} y={y + 2} width="7" height={h - 4} rx="2" fill="#1a1a1a" />
      <rect x={x + w - 7} y={y + 2} width="7" height={h - 4} rx="2" fill="#1a1a1a" />
    </g>
  );
}

function Esc({ x, y, w, h, small }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={small ? "#2c7a4b" : "#2463b8"} opacity="0.95" />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="4" fill="none" stroke="#ffffff33" />
      {!small && (
        <g fill="#ffffff22">
          <rect x={x + 14} y={y + 16} width="18" height="12" rx="1" />
          <rect x={x + 38} y={y + 16} width="18" height="12" rx="1" />
          <rect x={x + 14} y={y + 40} width="18" height="12" rx="1" />
          <rect x={x + 38} y={y + 40} width="18" height="12" rx="1" />
        </g>
      )}
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className="art-text">{small ? "ESC" : "30A ESC"}</text>
    </g>
  );
}

function Receiver({ x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#262626" />
      <text x={x + 14} y={y + 24} className="art-text">FS-iA6B</text>
      <text x={x + 14} y={y + 40} className="art-sub">2.4GHz</text>
      {/* antennas */}
      <path d={`M${x} ${y + 20} q -40 -6 -60 -40`} stroke="#111" strokeWidth="2" fill="none" />
      <path d={`M${x} ${y + 60} q -40 10 -70 -4`} stroke="#111" strokeWidth="2" fill="none" />
      {/* pin header, 3 pins per channel. Mounted turned around, so CH1 is the bottom row */}
      <rect x={x + w - 22} y={y + 8} width="16" height={h - 16} rx="2" fill="#111" />
      {Array.from({ length: 6 }, (_, i) => {
        const ry = y + 14 + i * ((h - 28) / 5);
        return (
          <g key={i}>
            <text x={x + w - 26} y={ry + 3} textAnchor="end" className="art-pin">CH{6 - i}</text>
            {[0, 1, 2].map((j) => (
              <rect key={j} x={x + w - 20 + j * 4.5} y={ry - 1.5} width="3" height="3" fill="#d4a531" />
            ))}
          </g>
        );
      })}
    </g>
  );
}

function Charger({ x, y, w, h }) {
  // small 2S/3S balance charger: AC cord, two balance ports, status LEDs
  return (
    <g>
      <path d={`M${x + 30} ${y} q 0 -24 30 -36`} stroke="#111" strokeWidth="4" fill="none" />
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#2a2d33" />
      <rect x={x + 12} y={y + 12} width={w - 24} height={h - 50} rx="6" fill="#3a3e46" />
      <text x={x + 24} y={y + 42} className="art-text">2S / 3S</text>
      <text x={x + 24} y={y + 60} className="art-sub">LiPo balance charger</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={x + w - 50 + i * 22} cy={y + 34} r="5" fill={i ? "#2fbf71" : "#e04848"} />
        </g>
      ))}
      {/* balance ports along the bottom edge */}
      <rect x={x + w * 0.45} y={y + h - 26} width="34" height="14" rx="2" fill="#f1eee4" />
      <rect x={x + w * 0.8 - 20} y={y + h - 26} width="40" height="14" rx="2" fill="#f1eee4" />
      <text x={x + w * 0.45 + 17} y={y + h - 31} textAnchor="middle" className="art-sub">2S</text>
      <text x={x + w * 0.8} y={y + h - 31} textAnchor="middle" className="art-sub">3S</text>
    </g>
  );
}

function Transmitter({ x, y, w, h }) {
  const stick = (cx) => (
    <g>
      <circle cx={cx} cy={y + h * 0.62} r="17" fill="#1a1a1a" stroke="#555" />
      <circle cx={cx} cy={y + h * 0.62} r="6" fill="#8a8f96" />
    </g>
  );
  return (
    <g>
      <rect x={x + w / 2 - 4} y={y - 34} width="8" height="36" rx="3" fill="#1a1a1a" />
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#34373c" />
      <rect x={x + 30} y={y + 16} width={w - 60} height="30" rx="3" fill="#9fb8a8" stroke="#1a1a1a" />
      <text x={x + w / 2} y={y + 36} textAnchor="middle" className="art-lcd">FS-i6</text>
      {stick(x + 30)}
      {stick(x + w - 30)}
    </g>
  );
}

function Brushless({ x, y, w, h }) {
  const cx = x + w / 2, cy = y + h / 2, r = w / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#3a3d42" />
      <circle cx={cx} cy={cy} r={r - 6} fill="#55595f" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3;
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.55} cy={cy + Math.sin(a) * r * 0.55} r="5" fill="#2a2c30" />;
      })}
      <circle cx={cx} cy={cy} r="9" fill="#9aa0a6" />
      <circle cx={cx} cy={cy} r="4" fill="#6b7076" />
    </g>
  );
}

function Wheel({ x, y, w, h }) {
  // Top-down a wheel is a rectangle: 43mm tall, 19mm wide
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#1c1c1c" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={x + 4} x2={x + w - 4} y1={y + 8 + i * ((h - 16) / 11)} y2={y + 8 + i * ((h - 16) / 11)}
          stroke="#333" strokeWidth="2" />
      ))}
    </g>
  );
}

function N20({ x, y, w, h }) {
  const mh = 36, cy = y + h / 2;
  const can = { x, w: 45 }, gear = { x: x + 45, w: 27 }, shaftX = x + 72;
  return (
    <g>
      <rect x={can.x} y={cy - mh / 2} width={can.w} height={mh} rx="5" fill="#b9bec4" />
      <rect x={can.x} y={cy - mh / 2 + 6} width="6" height={mh - 12} fill="#8d9298" />
      <rect x={gear.x} y={cy - mh / 2} width={gear.w} height={mh} fill="#c9a23a" />
      <line x1={gear.x + 9} y1={cy - mh / 2} x2={gear.x + 9} y2={cy + mh / 2} stroke="#9c7b22" />
      <line x1={gear.x + 18} y1={cy - mh / 2} x2={gear.x + 18} y2={cy + mh / 2} stroke="#9c7b22" />
      <rect x={shaftX} y={cy - 4.5} width="12" height="9" fill="#9aa0a6" />
    </g>
  );
}

export default function Art({ node }) {
  const r = node.asm;
  switch (node.art) {
    case "lipo": return <Lipo {...r} />;
    case "switch": return <Switch {...r} />;
    case "splitter": return <Splitter {...r} />;
    case "adapter": return <Adapter {...r} />;
    case "lead": return <Lead {...r} />;
    case "esc": return <Esc {...r} />;
    case "escSmall": return <Esc {...r} small />;
    case "rx": return <Receiver {...r} />;
    case "tx": return <Transmitter {...r} />;
    case "charger": return <Charger {...r} />;
    case "bldc": return <Brushless {...r} />;
    case "n20": return <N20 {...r} />;
    case "wheel": return <Wheel {...r} />;
    default: return <rect {...{ x: r.x, y: r.y, width: r.w, height: r.h }} fill="#777" rx="4" />;
  }
}
