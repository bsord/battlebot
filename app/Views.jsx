"use client";

import { useEffect, useState } from "react";
import WiringDiagram from "./WiringDiagram";
import Assembled from "./Assembled";

const TABS = [
  { id: "wiring", label: "Wiring" },
  { id: "assembled", label: "Assembled" },
];
const KEY = "battlebot-view";

export default function Views() {
  const [view, setView] = useState("wiring");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (TABS.some((t) => t.id === saved)) setView(saved);
    } catch {}
  }, []);

  function pick(id) {
    setView(id);
    try { localStorage.setItem(KEY, id); } catch {}
  }

  return (
    <section>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={view === t.id} className="tab" onClick={() => pick(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <p className="scroll-hint">Scroll sideways to see the whole diagram. Tap a part for its photo.</p>
      <div className={`panel ${view === "assembled" ? "panel-mat" : ""}`}>
        {view === "wiring" && <WiringDiagram />}
        {view === "assembled" && <Assembled />}
      </div>
      {view === "assembled" && (
        <p className="caption">
          Top-down, to scale on a 10mm grid. Hover a part for its product photo, click to pin it. Plugs show M for male (pins) and F for female (sockets).
        </p>
      )}
    </section>
  );
}
