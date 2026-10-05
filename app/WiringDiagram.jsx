export default function WiringDiagram() {
  return (
    <svg viewBox="0 0 1100 640" role="img" aria-label="Wiring diagram">
      {/* Battery */}
      <rect className="box" x="20" y="190" width="150" height="100" rx="6"/>
      <text className="title" x="32" y="215">3S LiPo 450mAh</text>
      <text className="small" x="32" y="233">11.1V nom / 12.6V full</text>
      <text className="small" x="32" y="249">XT30 female</text>
      <text className="small" x="32" y="265">+ balance lead (charging)</text>
  
      {/* Power switch */}
      <rect className="box" x="220" y="200" width="120" height="55" rx="6"/>
      <text className="title" x="232" y="223">Power switch</text>
      <text className="small" x="232" y="241">XT30 in and out</text>

      {/* Battery to switch to splitter. Switch breaks the + line */}
      <path className="pos" d="M170 228 H220"/>
      <path className="pos" d="M340 228 H400"/>
      <path className="neg" d="M170 270 H420"/>
      <text className="small" x="176" y="222">+</text>
      <text className="small" x="176" y="286">−</text>

      {/* Y splitter */}
      <path className="pos" d="M400 75 V285"/>
      <path className="neg" d="M420 95 V305"/>
      <circle className="dot-pos" cx="400" cy="228" r="4"/>
      <circle className="dot-neg" cx="420" cy="270" r="4"/>
      <text className="small" x="340" y="48">NOKITA XT30 Y splitter</text>
      <text className="small" x="340" y="60">(plugs in, no solder)</text>

      {/* Weapon ESC */}
      <rect className="box" x="500" y="40" width="170" height="95" rx="6"/>
      <text className="title" x="512" y="62">Weapon ESC</text>
      <text className="small" x="512" y="80">FLYCOLOR 30A, 2-4S</text>
      <text className="small" x="512" y="96">3.5mm bullets, 3A BEC</text>
      <text className="small" x="512" y="112">XT60 in, XT30 adapter</text>
      <path className="pos" d="M400 75 H500"/><circle className="dot-pos" cx="400" cy="75" r="4"/>
      <path className="neg" d="M420 95 H500"/><circle className="dot-neg" cx="420" cy="95" r="4"/>

      {/* Dual drive ESC */}
      <rect className="box" x="500" y="250" width="170" height="290" rx="6"/>
      <text className="title" x="512" y="340">Dual drive ESC</text>
      <text className="small" x="512" y="358">Nuofany dual 5A, 2-3S</text>
      <text className="small" x="512" y="374">2 channels, onboard mix</text>
      <text className="small" x="512" y="390">JST in, XT30 adapter lead</text>
      <path className="pos" d="M400 285 H500"/><circle className="dot-pos" cx="400" cy="285" r="4"/>
      <path className="neg" d="M420 305 H500"/><circle className="dot-neg" cx="420" cy="305" r="4"/>

      {/* Weapon motor */}
      <circle className="box" cx="880" cy="88" r="46"/>
      <text className="title" x="850" y="84">Weapon</text>
      <text className="small" x="850" y="100">2200KV</text>
      <text className="small" x="940" y="60">QWinOut A2212 2200KV</text>
      <text className="small" x="940" y="76">3 wires, swap any 2</text>
      <text className="small" x="940" y="92">to reverse spin</text>
      <text className="small" x="940" y="108">~24,400rpm on 3S</text>
      <path className="phase" d="M670 70 H840"/>
      <path className="phase" d="M670 88 H834"/>
      <path className="phase" d="M670 106 H840"/>
  
      {/* Drive motor L + wheel */}
      <rect className="box" x="790" y="277" width="124" height="36" rx="4"/>
      <text className="title" x="800" y="300">N20 12V 500rpm</text>
      <rect className="box" x="914" y="287" width="14" height="16"/>
      <circle className="box" cx="975" cy="295" r="43"/>
      <circle className="box" cx="975" cy="295" r="6"/>
      <text className="small" x="955" y="355">43×19 wheel</text>
      <text className="small" x="955" y="369">3mm D bore</text>
      <path className="brushed" d="M670 285 H790"/>
      <path className="brushed" d="M670 305 H790"/>
      <text className="small" x="690" y="278">M+ / M−</text><text className="small" x="690" y="322">Dupont plug, crimp or solder</text>
  
      {/* Drive motor R + wheel */}
      <rect className="box" x="790" y="467" width="124" height="36" rx="4"/>
      <text className="title" x="800" y="490">N20 12V 500rpm</text>
      <rect className="box" x="914" y="477" width="14" height="16"/>
      <circle className="box" cx="975" cy="485" r="43"/>
      <circle className="box" cx="975" cy="485" r="6"/>
      <text className="small" x="955" y="545">43×19 wheel</text>
      <text className="small" x="955" y="559">3mm D bore</text>
      <path className="brushed" d="M670 475 H790"/>
      <path className="brushed" d="M670 495 H790"/>
      <text className="small" x="690" y="468">M+ / M−</text><text className="small" x="690" y="512">Dupont plug, crimp or solder</text>
  
      {/* Transmitter, linked by radio */}
      <rect className="box" x="16" y="410" width="126" height="100" rx="6"/>
      <text className="title" x="28" y="434">FlySky FS-i6</text>
      <text className="small" x="28" y="452">transmitter</text>
      <text className="small" x="28" y="472">right stick: drive</text>
      <text className="small" x="28" y="488">left stick: weapon</text>
      <path className="radio" d="M142 460 H190"/>
      <text className="small" x="148" y="452">2.4GHz</text>

      {/* Receiver */}
      <rect className="box" x="190" y="400" width="150" height="150" rx="6"/>
      <text className="title" x="202" y="424">FlySky FS-iA6B</text>
      <text className="small" x="202" y="442">receiver</text>
      <text className="small" x="305" y="434">CH3</text>
      <text className="small" x="305" y="459">CH2</text>
      <text className="small" x="305" y="484">CH1</text>
      <text className="small" x="202" y="500">Powered by the</text>
      <text className="small" x="202" y="514">weapon ESC BEC.</text>
      <text className="small" x="202" y="528">Lift the red pin on the</text>
      <text className="small" x="202" y="542">drive lead if it has 5V.</text>

      {/* Signal leads */}
      <path className="sig" d="M340 430 H440 V122 H500"/>
      <path className="sig" d="M340 455 H500"/>
      <path className="sig" d="M340 480 H500"/>
      <text className="small" x="444" y="150">servo lead:</text>
      <text className="small" x="444" y="163">sig + 5V + GND</text>
      <text className="small" x="348" y="449">sig + GND</text>
      <text className="small" x="348" y="497">1-pin signal</text>

      {/* Legend */}
      <g transform="translate(20 590)">
        <path className="pos" d="M0 10 H30"/><text x="38" y="14">Battery +</text>
        <path className="neg" d="M130 10 H160"/><text x="168" y="14">Battery −</text>
        <path className="sig" d="M260 10 H290"/><text x="298" y="14">Receiver signal</text>
        <path className="phase" d="M420 10 H450"/><text x="458" y="14">Brushless phase</text>
        <path className="brushed" d="M590 10 H620"/><text x="628" y="14">Brushed motor</text>
        <circle className="dot-pos" cx="740" cy="10" r="4"/><text x="750" y="14">Joined (no dot = just crossing)</text>
        <path className="radio" d="M960 10 H990"/><text x="998" y="14">Radio</text>
      </g>
    </svg>
  );
}
