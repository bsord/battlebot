import Views from "./Views";
import PartsList from "./PartsList";
import Weight from "./Weight";

export default function Home() {
  return (
    <main>
      <h1>Battlebot Wiring and Parts</h1>
      <p className="sub">
        1lb (454g) plastic antweight. 3S 450mAh, FlySky FS-i6 radio, brushless spinner, two N20 drive motors.
      </p>

      <Views />

      <h2>Things to get right</h2>
      <ul className="notes">
        <li><strong>Everything is from Amazon and in stock</strong> as of Sep 27, 2026. Prices can change.</li>
        <li><strong>No soldering on the power side.</strong> Battery into the switch, switch into the NOKITA Y splitter, then one branch through the XT30 to XT60 adapter to the weapon ESC and one through the XT30 to JST lead to the drive ESC. All XT30, which handles about 15A continuous and 30A burst. The 75C pack gives about 34A.</li>
        <li><strong>N20 leads still need a decision.</strong> The motors come with bare wire and the drive ESC has 2-pin sockets. Options: crimp 2.54mm Dupont pins onto the motor leads (crimp tool, no solder), lever nuts (bulky), or solder.</li>
        <li><strong>Power switch is required.</strong> Combat rules need a switch or removable link that cuts all power. It sits between the battery and the Y splitter and must be reachable from outside. It&apos;s a lever toggle, so recess it or guard it so a hit can&apos;t flip it off.</li>
        <li><strong>Only one BEC powers the receiver.</strong> The weapon ESC&apos;s 3A BEC does it. If the drive ESC&apos;s 3-pin lead has 5V on the red wire, lift that pin out with a needle and tape it back.</li>
        <li><strong>Mix once, not twice.</strong> The drive ESC has an onboard mix switch. Either turn that on, or use the transmitter&apos;s elevon mix on CH1/CH2. Not both.</li>
        <li><strong>Set failsafe on CH3.</strong> The FS-iA6B holds the last signal by default when it loses signal. Set failsafe in the transmitter menu so the weapon goes to zero throttle. Test it with the transmitter off and no blade mounted.</li>
        <li><strong>Charging runs a bit fast.</strong> The charger is fixed at 800mA, about 1.8C for a 450mAh pack. The usual safe rate is 1C. Check the charge rate TATTU lists, charge on a fireproof surface, and don't leave it unattended.</li>
        <li><strong>N20s are 12V.</strong> 3S is 12.6V full, a good match. On 2S they run at about two-thirds speed, which is safe.</li>
        <li><strong>Weapon motor is 2200KV.</strong> The QWinOut A2212 is the closest Amazon match to 2205KV. On 3S that is about 24,400rpm unloaded at 11.1V, and about 27,700rpm on a full 12.6V charge. It&apos;s an airplane-style motor and weighs 47g, more than the battery. A 2205-size drone motor is about 30g.</li>
      </ul>

      <PartsList />

      <Weight />
    </main>
  );
}
