// The whole bot in one place. All views, the parts list and the weight budget read from here.
//
// products: what you buy (one row in the parts list each). Photos live in public/parts/<id>.jpg.
//           g is weight per unit, onBot how many go in the robot, gSrc where g came from
//           (listing, spec or estimate).
//           buy is how many to order when the price is per unit; alt items are left out of the total.
//           botName names it in the weight budget when only part of it goes in the bot.
// nodes:    physical pieces on the diagram. `asm` is the footprint in the assembled view
//           (3px = 1mm, top-down). labelPos: "right", "left" or "above" moves the label.
// ports:    where a wire leaves a node. side/at place it on the node's edge (at is 0..1 along it).
//           plug is the connector on that lead: [type, "m" | "f"]. Types are drawn in Glyph.jsx.
// connections: which port connects to which. kind sets the wire drawing, t is where along
//           the wire the plug pair is drawn (0 = a end, 1 = b end).
//           dock: "a" or "b" draws the pair flush against that end, for adapters with no wire.
//           atHeader draws just the lead's plug seated on the a end's pins (receiver leads).
//           perWire draws a plug pair on each wire of the bundle (the motor's three bullets).
//           note is a small caption under the plug.

export const SCALE = 3; // px per mm in the assembled view
export const WEIGHT_LIMIT = 454; // 1lb antweight

export const products = {
  lipo: { group: "Power", g: 41, botName: "TATTU 3S 450mAh 75C LiPo (one pack)", onBot: 1, gSrc: "listing", short: "TATTU 75C, XT30", name: "TATTU 3S 450mAh 75C LiPo, 2 pack", qty: "1 pack", spec: "XT30 female, JST-XH balance lead", url: "https://www.amazon.com/dp/B0BWRTB3T3", price: "$30.98" },
  switch: { group: "Power", g: 30, onBot: 1, gSrc: "estimate", gNote: "About 35cm of 12AWG plus the toggle and two XT30s, as shipped", short: "XT30 toggle", name: "XT30 high current toggle switch, 12AWG", qty: "1", spec: "Required by the rules. XT30 male in, XT30 female out. Listed 15A (AC rating). Recess it so a hit can't flip the lever", url: "https://www.amazon.com/dp/B0C64HSZC8", price: "$14.05" },
  splitter: { group: "Power", g: 10, onBot: 1, gSrc: "estimate", gNote: "Three XT30s and about 30cm of 18AWG", short: "NOKITA XT30 1 to 2", name: "NOKITA XT30 Y splitter, 1 male to 2 female", qty: "1", spec: "18AWG, 10cm", url: "https://www.amazon.com/dp/B0B5M58D6T", price: "$12.82" },
  adpXt60: { group: "Power", g: 5, onBot: 1, gSrc: "estimate", gNote: "One XT30 and one XT60, no wire", short: "XT30 M to XT60 F", name: "FLY RC XT30 male to XT60 female adapter", qty: "1", spec: "Rigid, no wire. Weapon ESC plugs into it", url: "https://www.amazon.com/dp/B07D1YCM7G", price: "$7.99" },
  adpJst: { group: "Power", g: 3, onBot: 1, gSrc: "estimate", gNote: "XT30, JST and 10cm of 20AWG", botName: "XT30 to JST adapter lead (one)", short: "XT30 M to JST F", name: "XT30 to JST adapter leads, 2 pairs", qty: "1 pack", spec: "Use the XT30 male to JST female lead for the drive ESC. The pack has both directions", url: "https://www.amazon.com/dp/B0B2P978SR", price: "$7.99" },
  charger: { group: "Power", name: "LiPo 2S/3S balance charger", qty: "1", spec: "Charges through the balance lead, no adapter needed. Fixed 800mA", url: "https://www.amazon.com/dp/B0H4LC2J37", price: "$14.99" },
  tx: { group: "Radio", g: 15, onBot: 1, gSrc: "spec", gNote: "FlySky spec is 14.9g", botName: "FlySky FS-iA6B receiver (from the combo)", short: "FS-i6 + FS-iA6B combo", name: "FlySky FS-i6 transmitter + FS-iA6B receiver", qty: "1", spec: "6 channels. Receiver included", url: "https://www.amazon.com/dp/B0B2D86L13", price: "$52.99" },
  escW: { group: "ESCs", g: 27, onBot: 1, gSrc: "estimate", gNote: "Typical for a 30A ESC with a switching BEC, 16AWG leads and an XT60", short: "FLYCOLOR 30A, 2-4S", name: "FLYCOLOR 30A ESC, 2-4S, 3A UBEC", qty: "1", spec: "XT60 male in (through the adapter), 3.5mm bullets to the motor", url: "https://www.amazon.com/dp/B0DG5KVGZL", price: "$16.99" },
  desc: { group: "ESCs", g: 8, onBot: 1, gSrc: "estimate", gNote: "Small board plus five short leads", short: "Nuofany dual 5A, 2-3S", name: "Dual Way Bidirectional Brushed 5A ESC, 2S-3S", qty: "1", spec: "JST in (through the adapter lead). 2 channels, onboard mix switch. Not for 4S", url: "https://www.amazon.com/dp/B0BCJSLT32", price: "$13.99" },
  bldc: { group: "Motors", g: 47, onBot: 1, gSrc: "listing", short: "QWinOut A2212 2200KV", name: "QWinOut A2212 2200KV brushless motor", qty: "1", spec: "2-3S, 3.5mm bullets pre-installed (match the ESC). Closest Amazon match to 2205KV", url: "https://www.amazon.com/dp/B07SGPVMWD", price: "$12.99" },
  n20: { group: "Motors", g: 10, onBot: 2, gSrc: "estimate", gNote: "N20 gear motor is about 9-10g, plus 150mm leads", short: "N20 12V 500rpm", name: "N20 12V 500rpm, pre-wired leads", qty: "3 (2 + spare)", buy: 3, spec: "Select \"12v 500rpm\". Price is per motor", url: "https://www.amazon.com/dp/B0B17TDL9S", price: "$16.90 ea" },
  wheel: { group: "Motors", g: 5, botName: "K346 wheel 43×19mm", onBot: 2, gSrc: "estimate", gNote: "Thin rubber tire on a plastic hub", short: "K346 43×19mm", name: "K346 wheel 43×19mm, 3mm D bore, 10 pack", qty: "1 pack", spec: "", url: "https://www.amazon.com/dp/B07YY6TN42", price: "$14.65" },
  bearings: { group: "Weapon drive", name: "Cavory ball bearing assortment, 52 pcs", qty: "1", spec: "10 sizes from MR63 (3×6mm) up to 608 (8×22mm)", url: "https://www.amazon.com/dp/B0H1MBRW5N", price: "$9.99" },
  belts: { group: "Weapon drive", name: "uxcell GT2 closed loop belts, 8 pcs", qty: "1", spec: "6mm wide, 110 to 400mm long", url: "https://www.amazon.com/dp/B0CMT2LFRJ", price: "$9.49" },
  pulley: { group: "Weapon drive", name: "GT2 16 tooth pulley", qty: "1", spec: "Select Bore 3.17mm to fit the A2212 shaft. Weapon side pulley is usually printed into the hub", url: "https://www.amazon.com/dp/B0BJZP8WPR", price: "$12.99" },
  screwsMachine: { group: "Optional (not in the total)", alt: true, name: "M2-M5 socket head screw kit with nuts and washers, 1274 pcs", qty: "1", spec: "12.9 carbon steel machine screws. M3 for most of the bot, into nuts or heat-set inserts", url: "https://www.amazon.com/dp/B0D9QNZ1JN", price: "$12.99" },
  screwsTapping: { group: "Optional (not in the total)", alt: true, name: "M1.7-M3 self tapping screws for plastic, 750 pcs", qty: "1", spec: "Thread straight into printed parts, for covers and light brackets", url: "https://www.amazon.com/dp/B0HDNS74R6", price: "$7.99" },
  shrink: { group: "Optional (not in the total)", alt: true, name: "Ginsco heat shrink tubing kit, 580 pcs", qty: "1", spec: "For wire joints", url: "https://www.amazon.com/dp/B01MFA3OFA", price: "$7.99" },
  zip: { group: "Optional (not in the total)", alt: true, g: 1, botName: "Zip ties, a few", onBot: 1, gSrc: "estimate", name: "Tantti 4 inch zip ties, 200 pack", qty: "1", spec: "", url: "https://www.amazon.com/dp/B0BC1VH4XB", price: "$3.99" },
  tape: { group: "Optional (not in the total)", alt: true, g: 2, onBot: 1, gSrc: "estimate", name: "3M 5925 double sided foam tape", qty: "1", spec: "Battery and electronics mounting", url: "https://www.amazon.com/dp/B0BQYM63N5", price: "$7.99" },
};

// Weight that isn't a single product.
export const extraWeights = [
  { name: "M3 screws and heat-set inserts, about 20", g: 12, gSrc: "estimate" },
  { name: "Weapon drive: belt, motor pulley, 2 bearings", g: 15, gSrc: "estimate", gNote: "Depends on bearing size. Two 608s alone are about 24g" },
];

export const nodes = [
  {
    id: "battery", product: "lipo", label: "Battery", art: "lipo",
    asm: { x: 30, y: 330, w: 165, h: 90 },
    ports: [{ id: "out", side: "r", at: 0.5, plug: ["xt30", "f"] }],
  },
  {
    id: "switch", product: "switch", label: "Power switch", art: "switch",
    asm: { x: 330, y: 350, w: 66, h: 50 },
    ports: [
      { id: "in", side: "l", at: 0.5, plug: ["xt30", "m"] },
      { id: "out", side: "r", at: 0.5, plug: ["xt30", "f"] },
    ],
  },
  {
    id: "splitter", product: "splitter", label: "Y splitter", art: "splitter",
    asm: { x: 500, y: 355, w: 24, h: 40 },
    ports: [
      { id: "in", side: "l", at: 0.5, plug: ["xt30", "m"] },
      { id: "o1", side: "t", at: 0.5, plug: ["xt30", "f"] },
      { id: "o2", side: "r", at: 0.8, plug: ["xt30", "f"] },
    ],
  },
  {
    id: "adpXt60", product: "adpXt60", label: "XT60 adapter", art: "adapter", labelPos: "left",
    asm: { x: 503, y: 282, w: 18, h: 14 },
    ports: [
      { id: "in", side: "b", at: 0.5, plug: ["xt30", "m"] },
      { id: "out", side: "t", at: 0.5, plug: ["xt60", "f"] },
    ],
  },
  {
    id: "adpJst", product: "adpJst", label: "JST adapter lead", art: "lead",
    asm: { x: 680, y: 379, w: 40, h: 16 },
    ports: [
      { id: "in", side: "l", at: 0.5, plug: ["xt30", "m"] },
      { id: "out", side: "r", at: 0.5, plug: ["jst", "f"] },
    ],
  },
  {
    id: "escW", product: "escW", label: "Weapon ESC", art: "esc", labelPos: "above",
    asm: { x: 492, y: 120, w: 135, h: 72 },
    ports: [
      { id: "pwr", side: "b", at: 0.148, plug: ["xt60", "m"] },
      { id: "sig", side: "b", at: 0.85, plug: ["servo", "f"] },
      { id: "mot", side: "r", at: 0.5, plug: ["bullet35", "f"] },
    ],
  },
  {
    id: "desc", product: "desc", label: "Dual drive ESC", art: "escSmall", labelPos: "above",
    asm: { x: 780, y: 374, w: 90, h: 66 },
    ports: [
      { id: "pwr", side: "l", at: 0.2, plug: ["jst", "m"] },
      { id: "ch2", side: "b", at: 0.25, plug: ["servo", "f"] },
      { id: "ch1", side: "b", at: 0.4, plug: ["pin1", "f"] },
      { id: "motL", side: "r", at: 0.3, plug: ["dupont2", "f"] },
      { id: "motR", side: "r", at: 0.7, plug: ["dupont2", "f"] },
    ],
  },
  {
    id: "tx", product: "tx", label: "Transmitter", sub: "FS-i6, in the radio combo", art: "tx",
    asm: { x: 40, y: 560, w: 120, h: 150 },
    ports: [{ id: "ant", side: "r", at: 0.3 }],
  },
  {
    id: "rx", product: "tx", label: "Receiver", sub: "FS-iA6B, in the radio combo", art: "rx",
    asm: { x: 300, y: 600, w: 141, h: 99 },
    ports: [
      { id: "ant", side: "l", at: 0.5 },
      { id: "ch1", side: "r", at: 0.859, plug: ["servo", "m"] },
      { id: "ch2", side: "r", at: 0.715, plug: ["servo", "m"] },
      { id: "ch3", side: "r", at: 0.572, plug: ["servo", "m"] },
    ],
  },
  {
    id: "motorW", product: "bldc", label: "Weapon motor", art: "bldc",
    asm: { x: 1040, y: 114, w: 84, h: 84 },
    ports: [{ id: "in", side: "l", at: 0.5, plug: ["bullet35", "m"] }],
  },
  {
    id: "motorL", product: "n20", label: "Left drive", art: "n20",
    asm: { x: 1020, y: 318, w: 84, h: 129 },
    ports: [{ id: "in", side: "l", at: 0.5, plug: ["dupont2", "m"] }],
  },
  {
    id: "wheelL", product: "wheel", label: "Left wheel", art: "wheel", labelPos: "right",
    asm: { x: 1104, y: 318, w: 57, h: 129 },
    ports: [],
  },
  {
    id: "motorR", product: "n20", label: "Right drive", art: "n20",
    asm: { x: 1020, y: 540, w: 84, h: 129 },
    ports: [{ id: "in", side: "l", at: 0.5, plug: ["dupont2", "m"] }],
  },
  {
    id: "wheelR", product: "wheel", label: "Right wheel", art: "wheel", labelPos: "right",
    asm: { x: 1104, y: 540, w: 57, h: 129 },
    ports: [],
  },
];

export const connections = [
  { a: "tx.ant", b: "rx.ant", kind: "radio" },
  { a: "battery.out", b: "switch.in", kind: "power", t: 0.5 },
  { a: "switch.out", b: "splitter.in", kind: "power", t: 0.5 },
  { a: "splitter.o1", b: "adpXt60.in", kind: "power", dock: "b" },
  { a: "adpXt60.out", b: "escW.pwr", kind: "power", dock: "a" },
  { a: "escW.mot", b: "motorW.in", kind: "phase", t: 0.5, perWire: true },
  { a: "splitter.o2", b: "adpJst.in", kind: "power", dock: "b" },
  { a: "adpJst.out", b: "desc.pwr", kind: "power", dock: "a" },
  { a: "desc.motL", b: "motorL.in", kind: "motor", t: 0.55,
    note: "crimp or solder" },
  { a: "desc.motR", b: "motorR.in", kind: "motor", t: 0.55,
    note: "crimp or solder" },
  { a: "rx.ch3", b: "escW.sig", kind: "signal", atHeader: true },
  { a: "rx.ch2", b: "desc.ch2", kind: "signal", atHeader: true },
  { a: "rx.ch1", b: "desc.ch1", kind: "signal1", atHeader: true },
];

export const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function resolve(ref) {
  const [nid, pid] = ref.split(".");
  const node = nodeById[nid];
  return { node, port: node.ports.find((p) => p.id === pid) };
}

export function anchor(node, port, key) {
  const r = node[key];
  const t = port.at ?? 0.5;
  switch (port.side) {
    case "l": return { x: r.x, y: r.y + r.h * t };
    case "r": return { x: r.x + r.w, y: r.y + r.h * t };
    case "t": return { x: r.x + r.w * t, y: r.y };
    default: return { x: r.x + r.w * t, y: r.y + r.h };
  }
}
