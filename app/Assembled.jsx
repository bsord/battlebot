"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Art from "./Art";
import { Pair, Connector, plugLength, closedGap } from "./Glyph";
import { nodes, connections, products, resolve, anchor } from "./bot";

const W = 1260, H = 780;

const WIRES = {
  power: { colors: ["#d62828", "#141414"], width: 3.4, gap: 4.2 },
  signal: { colors: ["#6b3e1e", "#d62828", "#f08c00"], width: 1.6, gap: 2.2 },
  signal1: { colors: ["#f08c00"], width: 1.6, gap: 0 },
  radio: { colors: ["#bfe3ff"], width: 1.6, gap: 0, dash: "3 6" },
  phase: { colors: ["#141414", "#141414", "#141414"], width: 2.6, gap: 10 },
  motor: { colors: ["#d62828", "#141414"], width: 2, gap: 2.8 },
};

const DIR = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };

function bezier(p0, s0, p3, s3) {
  const k = Math.max(40, Math.hypot(p3.x - p0.x, p3.y - p0.y) * 0.4);
  const p1 = { x: p0.x + DIR[s0][0] * k, y: p0.y + DIR[s0][1] * k };
  const p2 = { x: p3.x + DIR[s3][0] * k, y: p3.y + DIR[s3][1] * k };
  return [p0, p1, p2, p3];
}

// Point and heading at t along the curve. Connectors sit here.
function pointAt([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const at = (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
  const d = (k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]);
  return { x: at("x"), y: at("y"), angle: (Math.atan2(d("y"), d("x")) * 180) / Math.PI };
}

function offset(p, side, d) {
  return side === "l" || side === "r" ? { x: p.x, y: p.y + d } : { x: p.x + d, y: p.y };
}

// The curve one wire of a bundle follows.
function wireCurve(a, sa, b, sb, kind, i) {
  const { colors, gap } = WIRES[kind];
  const d = i * gap - ((colors.length - 1) * gap) / 2;
  return bezier(offset(a, sa, d), sa, offset(b, sb, d), sb);
}

function Bundle({ a, sa, b, sb, kind }) {
  const { colors, width, gap, dash } = WIRES[kind];
  return colors.map((c, i) => {
    const d = i * gap - ((colors.length - 1) * gap) / 2;
    const [p0, p1, p2, p3] = bezier(offset(a, sa, d), sa, offset(b, sb, d), sb);
    return (
      <path key={i} d={`M${p0.x} ${p0.y} C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`}
        stroke={c} strokeWidth={width} strokeDasharray={dash} fill="none" strokeLinecap="round" />
    );
  });
}

function Mat() {
  const lines = [];
  for (let x = 0; x <= W; x += 30) {
    lines.push(<line key={`x${x}`} x1={x} y1="0" x2={x} y2={H} className={x % 150 === 0 ? "mat-major" : "mat-minor"} />);
  }
  for (let y = 0; y <= H; y += 30) {
    lines.push(<line key={`y${y}`} x1="0" y1={y} x2={W} y2={y} className={y % 150 === 0 ? "mat-major" : "mat-minor"} />);
  }
  const ticks = [];
  for (let x = 150; x < W; x += 150) {
    ticks.push(<text key={x} x={x + 4} y="16" className="mat-label">{x / 30}cm</text>);
  }
  return (
    <g>
      <rect width={W} height={H} className="mat" />
      {lines}
      {ticks}
    </g>
  );
}

// One part on the mat. Its hover area is measured from the drawing and its labels together,
// so hovering a label works too, wherever the label sits.
function Part({ node: n, active, ...handlers }) {
  const p = n.product ? products[n.product] : null;
  const inner = useRef(null);
  const [box, setBox] = useState(null);
  useLayoutEffect(() => {
    const b = inner.current.getBBox();
    setBox({ x: b.x - 6, y: b.y - 6, width: b.width + 12, height: b.height + 12 });
  }, [n]);
  const right = n.labelPos === "right", left = n.labelPos === "left", above = n.labelPos === "above";
  const lx = right ? n.asm.x + n.asm.w + 10 : left ? n.asm.x - 10 : n.asm.x;
  const ly = right || left ? n.asm.y + n.asm.h / 2 - 4 : above ? n.asm.y - 30 : n.asm.y + n.asm.h + 18;
  const anchorEnd = left ? "end" : undefined;
  return (
    <g className={`part ${active ? "part-active" : ""}`} tabIndex={0} {...handlers}>
      {box && <rect {...box} className="part-hit" />}
      <g ref={inner}>
        <Art node={n} />
        <text x={lx} y={ly} textAnchor={anchorEnd} className="art-label">{n.label}</text>
        <text x={lx} y={ly + 15} textAnchor={anchorEnd} className="art-label-sub">{n.sub ?? p?.short ?? p?.name}</text>
      </g>
    </g>
  );
}

// The card floats above the page (position: fixed) so it never stretches or scrolls the diagram box.
const CARD_W = 250, CARD_H = 330;

function PartCard({ node, x, y, pinned, onClose }) {
  const p = node.product ? products[node.product] : null;
  const left = x + 16 + CARD_W > window.innerWidth ? Math.max(8, x - CARD_W - 16) : x + 16;
  const top = Math.max(8, Math.min(y + 12, window.innerHeight - CARD_H - 8));
  return (
    <div className="part-card" style={{ left, top, width: CARD_W }} role="dialog" aria-label={node.label}>
      {pinned && <button className="part-card-close" onClick={onClose} aria-label="Close">×</button>}
      {p && p.url && <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/parts/${node.product}.jpg`} alt={p.name} />}
      <div className="part-card-body">
        <div className="part-card-label">{node.label}</div>
        <div className="part-card-name">{p ? p.name : node.sub}</div>
        {p?.price && <div className="part-card-price">{p.price}</div>}
        {p?.url ? (
          <a href={p.url} target="_blank" rel="noreferrer">View on Amazon ↗</a>
        ) : (
          <div className="muted">{p ? "No link yet" : "Made while wiring, nothing to buy"}</div>
        )}
        {!pinned && p?.url && <div className="part-card-hint">Click the part to pin this card</div>}
      </div>
    </div>
  );
}

export default function Assembled() {
  const [hover, setHover] = useState(null); // { id, x, y } in viewport pixels
  const [pinned, setPinned] = useState(null);
  const shown = pinned ?? hover;

  // A fixed card would drift from its part while the page scrolls, so close it.
  useEffect(() => {
    const close = () => { setHover(null); setPinned(null); };
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  function pos(e, id) {
    if (e.clientX !== undefined) return { id, x: e.clientX, y: e.clientY };
    const r = e.currentTarget.getBoundingClientRect(); // keyboard focus has no pointer
    return { id, x: r.right, y: r.top };
  }

  return (
    <div className="assembled">
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Every part laid out on a cutting mat and wired together, drawn to scale"
      onClick={(e) => { if (!e.target.closest(".part")) setPinned(null); }}>
      <Mat />
      {connections.map((c) => {
        const A = resolve(c.a), B = resolve(c.b);
        const pa = anchor(A.node, A.port, "asm"), pb = anchor(B.node, B.port, "asm");
        return <Bundle key={`${c.a}-${c.b}`} a={pa} sa={A.port.side} b={pb} sb={B.port.side} kind={c.kind} />;
      })}
      {nodes.map((n) => (
        <Part key={n.id} node={n} active={shown?.id === n.id}
          onMouseEnter={(e) => setHover(pos(e, n.id))}
          onMouseMove={(e) => !pinned && setHover(pos(e, n.id))}
          onMouseLeave={() => setHover(null)}
          onFocus={(e) => setHover(pos(e, n.id))}
          onBlur={() => setHover(null)}
          onClick={(e) => { e.stopPropagation(); setPinned(pinned?.id === n.id ? null : pos(e, n.id)); }} />
      ))}
      {connections.filter((c) => c.atHeader).map((c) => {
        // just the lead's plug, sitting on the receiver's pins
        const A = resolve(c.a), B = resolve(c.b);
        const pa = anchor(A.node, A.port, "asm");
        return (
          <g key={`h-${c.a}`} transform={`translate(${pa.x} ${pa.y}) scale(1.2)`}>
            <Connector type={B.port.plug[0]} g={B.port.plug[1]} flip />
          </g>
        );
      })}
      {connections.filter((c) => c.perWire).map((c) => {
        // one plug pair on every wire of the bundle (the motor's three bullet connectors)
        const A = resolve(c.a), B = resolve(c.b);
        const pa = anchor(A.node, A.port, "asm"), pb = anchor(B.node, B.port, "asm");
        return WIRES[c.kind].colors.map((_, i) => {
          const m = pointAt(wireCurve(pa, A.port.side, pb, B.port.side, c.kind, i), c.t ?? 0.5);
          return <Pair key={`w-${c.a}-${i}`} a={A.port.plug} b={B.port.plug} x={m.x} y={m.y} angle={m.angle} scale={1.7} closed letters />;
        });
      })}
      {connections.filter((c) => !c.atHeader && !c.perWire && resolve(c.a).port.plug && resolve(c.b).port.plug).map((c) => {
        const A = resolve(c.a), B = resolve(c.b);
        const pa = anchor(A.node, A.port, "asm"), pb = anchor(B.node, B.port, "asm");
        const SCALE_PLUG = 1.2, GAP = closedGap(A.port.plug, B.port.plug);
        let m = pointAt(bezier(pa, A.port.side, pb, B.port.side), c.t ?? 0.5);
        if (c.dock) {
          // sit flush against the docked port, pointing straight out of it
          const end = c.dock === "a" ? A : B, p = c.dock === "a" ? pa : pb;
          const [dx, dy] = DIR[end.port.side];
          const reach = (GAP / 2 + plugLength(end.port.plug[0])) * SCALE_PLUG;
          const sign = c.dock === "a" ? 1 : -1; // a sits left of center, b right
          m = { x: p.x + dx * reach, y: p.y + dy * reach, angle: (Math.atan2(sign * dy, sign * dx) * 180) / Math.PI };
        }
        // keep plugs upright: draw them left to right whichever way the wire runs
        const flipped = m.angle > 90 || m.angle < -90;
        const [left, right] = flipped ? [B.port.plug, A.port.plug] : [A.port.plug, B.port.plug];
        // on a rigid adapter only the plug that goes into it is labeled
        const only = c.dock && (c.dock === "a") !== flipped ? "b" : c.dock ? "a" : true;
        return (
          <g key={`p-${c.a}`}>
            <Pair a={left} b={right} x={m.x} y={m.y} angle={flipped ? m.angle + 180 : m.angle}
              scale={SCALE_PLUG} gap={GAP} closed letters={only} />
            {c.note && <text x={m.x} y={m.y + 16} textAnchor="middle" className="mat-note">{c.note}</text>}
          </g>
        );
      })}
    </svg>
    {shown && (
      <PartCard node={nodes.find((n) => n.id === shown.id)} x={shown.x} y={shown.y}
        pinned={!!pinned} onClose={() => setPinned(null)} />
    )}
    </div>
  );
}
