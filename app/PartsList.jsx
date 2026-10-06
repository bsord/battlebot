"use client";

import { useEffect, useState } from "react";
import { products } from "./bot";

// Checked parts are what you plan to buy; the total is just those.
// Required parts start checked, optional ones (alt) start unchecked.
const KEY = "battlebot-cart";
const ids = Object.keys(products);
const groups = [...new Set(ids.map((id) => products[id].group))];
const defaults = Object.fromEntries(ids.map((id) => [id, !products[id].alt]));
const BASE = process.env.NEXT_PUBLIC_BASE_PATH;

function lineCost(p) {
  if (!p.price) return 0;
  return parseFloat(p.price.replace(/[^0-9.]/g, "")) * (p.buy ?? 1);
}

function host(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "link"; }
}

export default function PartsList() {
  const [picked, setPicked] = useState(defaults);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved) setPicked({ ...defaults, ...saved });
    } catch {}
  }, []);

  function toggle(id, checked) {
    const next = { ...picked, [id]: checked };
    setPicked(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }

  const chosen = ids.filter((id) => picked[id]);
  const total = chosen.reduce((sum, id) => sum + lineCost(products[id]), 0);

  return (
    <section className="parts-section">
      <h2>Parts list</h2>
      <div className="parts-bar" role="status">
        <span className="parts-bar-total">Total ${total.toFixed(2)}</span>
        <span className="muted">{chosen.length} of {ids.length} parts checked</span>
      </div>
      <div className="table-wrap">
        <table className="parts">
          <thead>
            <tr><th>Buy</th><th></th><th>Part</th><th>Qty</th><th>Price</th><th>Link</th></tr>
          </thead>
          <tbody>
            {groups.map((g) => [
              <tr key={g} className="group"><td colSpan={6}>{g}</td></tr>,
              ...ids.filter((id) => products[id].group === g).map((id) => {
                const p = products[id];
                const line = lineCost(p);
                return (
                  <tr key={id} className={picked[id] ? undefined : "unpicked"}>
                    <td className="pick"><input type="checkbox" id={`p-${id}`} checked={!!picked[id]} onChange={(e) => toggle(id, e.target.checked)} /></td>
                    <td className="thumb">
                      {p.photo !== false && <img src={`${BASE}/parts/${id}.jpg`} alt="" loading="lazy" />}
                    </td>
                    <td className="name">
                      <label htmlFor={`p-${id}`}>{p.name}</label>
                      {p.spec && <div className="muted">{p.spec}</div>}
                    </td>
                    <td className="qty q">{p.qty}</td>
                    <td className="qty pr">
                      {p.price || <span className="muted">not set</span>}
                      {p.buy > 1 && <div className="muted">${line.toFixed(2)} for {p.buy}</div>}
                    </td>
                    <td className="ln">{p.url && <a href={p.url} target="_blank" rel="noreferrer">{host(p.url)} ↗</a>}</td>
                  </tr>
                );
              }),
            ])}
          </tbody>
          <tfoot>
            <tr className="total">
              <td colSpan={4}>Total for {chosen.length} checked parts</td>
              <td className="qty">${total.toFixed(2)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
