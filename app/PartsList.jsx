"use client";

import { useEffect, useState } from "react";
import { products } from "./bot";

const KEY = "battlebot-have";
const ids = Object.keys(products);
const groups = [...new Set(ids.map((id) => products[id].group))];


function host(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "link"; }
}

export default function PartsList() {
  const [have, setHave] = useState({});

  useEffect(() => {
    try { setHave(JSON.parse(localStorage.getItem(KEY)) || {}); } catch {}
  }, []);

  function toggle(id, checked) {
    const next = { ...have, [id]: checked };
    setHave(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }

  const got = ids.filter((id) => have[id]).length;
  const cost = ids
    .filter((id) => !products[id].alt && products[id].price)
    .reduce((sum, id) => sum + parseFloat(products[id].price.replace(/[^0-9.]/g, "")) * (products[id].buy ?? 1), 0);

  return (
    <>
      <h2>
        Parts list <span className="count">({got} of {ids.length} on hand)</span>{" "}
        <span className="count total-cost">Total ${cost.toFixed(2)}</span>
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Have</th><th>Part</th><th>Qty</th><th>Price</th><th>Buy</th></tr>
          </thead>
          <tbody>
            {groups.map((g) => [
              <tr key={g} className="group"><td colSpan={5}>{g}</td></tr>,
              ...ids.filter((id) => products[id].group === g).map((id) => {
                const p = products[id];
                return (
                  <tr key={id} className={have[id] ? "have" : undefined}>
                    <td><input type="checkbox" id={`p-${id}`} checked={!!have[id]} onChange={(e) => toggle(id, e.target.checked)} /></td>
                    <td>
                      <label htmlFor={`p-${id}`}>{p.name}</label>
                      {p.spec && <div className="muted">{p.spec}</div>}
                      {p.note && <div className="muted">{p.note}</div>}
                    </td>
                    <td className="qty">{p.qty}</td>
                    <td className="qty">{p.price}</td>
                    <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{host(p.url)} ↗</a> : <span className="muted">{p.note ? "" : "any"}</span>}</td>
                  </tr>
                );
              }),
            ])}
          </tbody>
        </table>
      </div>
    </>
  );
}
