import { products, extraWeights, WEIGHT_LIMIT } from "./bot";

// Estimated weights. Weigh parts when they arrive and update `g` in bot.js.
export default function Weight() {
  const rows = Object.entries(products)
    .filter(([, p]) => p.g && p.onBot)
    .map(([id, p]) => ({ id, name: p.botName ?? p.name, n: p.onBot, g: p.g, src: p.gSrc, note: p.gNote, total: p.g * p.onBot }))
    .concat(extraWeights.map((e) => ({ id: e.name, name: e.name, n: 1, g: e.g, src: e.gSrc, note: e.gNote, total: e.g })))
    .sort((a, b) => b.total - a.total);
  const used = rows.reduce((sum, r) => sum + r.total, 0);
  const left = WEIGHT_LIMIT - used;
  const pct = (g) => `${(g / WEIGHT_LIMIT) * 100}%`;

  return (
    <>
      <h2>
        Weight budget <span className="count">(~{used}g of {WEIGHT_LIMIT}g used, ~{left}g left for chassis and weapon)</span>
      </h2>
      <div className="budget-bar" role="img" aria-label={`${used} grams of parts, ${left} grams left for chassis and weapon`}>
        <div style={{ width: pct(used), background: "var(--phase)" }} />
        <div style={{ width: pct(left), background: "var(--ok)", opacity: 0.35 }} />
      </div>
      <div className="budget-legend">
        <span><i style={{ background: "var(--phase)" }} />Parts on this page, ~{used}g</span>
        <span><i style={{ background: "var(--ok)", opacity: 0.35 }} />Chassis, weapon, screws, ~{left}g</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Part</th><th className="wide">Source</th><th>Qty</th><th className="wide">Each</th><th>Total</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}{r.note && <div className="muted">{r.note}</div>}</td>
                <td className={`wide ${r.src === "estimate" ? "muted" : ""}`}>{r.src}</td>
                <td className="qty">{r.n}</td>
                <td className="qty wide">~{r.g}g</td>
                <td className="qty">~{r.total}g</td>
              </tr>
            ))}
            <tr className="total">
              <td>Parts total</td><td className="wide" /><td /><td className="wide" /><td className="qty">~{used}g</td>
            </tr>
            <tr className="total">
              <td>Left for chassis and weapon</td><td className="wide" /><td /><td className="wide" /><td className="qty">~{left}g</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="caption">Listing means the Amazon page states it, spec means the manufacturer publishes it, estimate is worked out from similar parts. Weigh each part when it arrives and update it in app/bot.js.</p>
    </>
  );
}
