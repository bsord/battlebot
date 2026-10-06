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
        <li><strong>No soldering on the power side.</strong> Battery into the switch, switch into the NOKITA Y splitter, then one branch through the XT30 to XT60 adapter to the weapon ESC and one through the XT30 to JST lead to the drive ESC. All XT30, which handles about 15A continuous and 30A burst. The 80C pack gives about 36A.</li>
        <li><strong>N20s need leads soldered on.</strong> They come with bare solder tabs. Solder about 10cm of thin silicone wire (22-26AWG) to each motor, then either crimp a Dupont plug on the end to go into the drive ESC&apos;s 2-pin sockets, or cut the ESC&apos;s plugs off and solder straight to its leads. Dupont plugs don&apos;t latch, so add a dab of hot glue once they&apos;re in.</li>
        <li><strong>Weapon drive: GT2 belt or O-ring.</strong> GT2 locks weapon speed to the motor: 16 tooth 5mm bore pulley on the motor, clamped under the shaft nut, same tooth count on the weapon side for 1:1. An O-ring slips on big hits, which protects the motor, shaft and ESC, at the cost of a slightly slower spin-up. For O-rings, print smooth grooved pulleys (groove about 70% of the cord thickness, motor pulley at least 12-15mm across) and pick a ring 5-15% smaller than the belt path. Bearings come from the assortment, 608s if the weapon runs on an 8mm shaft.</li>
        <li><strong>Power switch is required.</strong> Combat rules need a switch or removable link that cuts all power. It sits between the battery and the Y splitter and must be reachable from outside. It&apos;s a lever toggle, so recess it or guard it so a hit can&apos;t flip it off.</li>
        <li><strong>Only one BEC powers the receiver.</strong> The weapon ESC&apos;s 3A BEC does it. If the drive ESC&apos;s 3-pin lead has 5V on the red wire, lift that pin out with a needle and tape it back.</li>
        <li><strong>Mix once, not twice.</strong> The drive ESC has an onboard mix switch. Either turn that on, or use the transmitter&apos;s elevon mix on CH1/CH2. Not both.</li>
        <li><strong>Set failsafe on CH3.</strong> The FS-iA6B holds the last signal by default when it loses signal. Set failsafe in the transmitter menu so the weapon goes to zero throttle. Test it with the transmitter off and no blade mounted.</li>
        <li><strong>Charging runs a bit fast.</strong> The charger is fixed at 800mA, about 1.8C for a 450mAh pack. The usual safe rate is 1C. Check the charge rate OVONIC lists, charge on a fireproof surface, and don't leave it unattended.</li>
        <li><strong>N20s are 12V.</strong> 3S is 12.6V full, a good match. On 2S they run at about two-thirds speed, which is safe.</li>
        <li><strong>Weapon motor is a Readytosky RS2205 2300KV, belt at 1:1.</strong> About 25,500rpm unloaded on 3S, roughly 22-25k with the weapon on and the pack under load. It comes with 2mm bullets: cut them off and splice each motor wire to one of the ESC&apos;s motor leads (tin, solder, heat shrink each, then one sleeve over all three). Swap any two wires to reverse the spin. The 30A ESC has plenty of headroom, but roll the throttle up rather than slamming it.</li>
      </ul>

      <PartsList />

      <Weight />
    </main>
  );
}
