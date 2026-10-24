"use client";
import { useRef, useState } from "react";
import Garment from "./Garment";
import { products } from "../data/products";

const DEFAULT_CAPTION = "Crafted in heavyweight fleece. Cut oversized. Made to last.";

function Toolbar() {
  return (
    <div className="toolbar" onClick={(e) => e.stopPropagation()}>
      <span className="toolbar-ask"><i className="dot" />Ask for changes</span>
      <span className="toolbar-sep" />
      <button aria-label="Duplicate"><svg viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8" rx="1.5" /><path d="M3 10V4a1 1 0 011-1h6" /></svg></button>
      <button aria-label="Hide"><svg viewBox="0 0 16 16"><path d="M2 8s2.3-4 6-4 6 4 6 4-2.3 4-6 4-6-4-6-4zM3 13L13 3" /></svg></button>
      <button aria-label="Delete" className="danger"><svg viewBox="0 0 16 16"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.5 8h5l.5-8" /></svg></button>
    </div>
  );
}

function Detail({ index, onBack, onNav }) {
  const p = products[index];
  const [side, setSide] = useState("front");
  return (
    <section className="detail" key={p.id}>
      <button className="back" onClick={onBack}>← Collection</button>
      <div className="stage">
        <button className="arrow left" onClick={() => onNav(-1)} aria-label="Previous">‹</button>
        <div className="hanger-line" />
        <div className="detail-garment">
          <div key={side} className="flip"><Garment product={p} side={side} /></div>
          <div className="selected-box"><Toolbar /></div>
        </div>
        <button className="arrow right" onClick={() => onNav(1)} aria-label="Next">›</button>
      </div>
      <div className="meta">
        <div className="counter">{String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</div>
        <h2>{p.name}</h2>
        <p className="sub">{p.sub}</p>
        <div className="tabs">
          {["front", "back"].map((s) => (
            <button key={s} className={side === s ? "on" : ""} onClick={() => setSide(s)}>{s[0].toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
        <hr />
        <p className="desc">{p.desc}</p>
      </div>
    </section>
  );
}

export default function Store() {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const rail = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const onDown = (e) => { drag.current = { down: true, x: e.pageX, left: rail.current.scrollLeft, moved: false }; };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.pageX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    rail.current.scrollLeft = d.left - dx;
  };
  const onUp = () => { drag.current.down = false; };
  const nudge = (dir) => rail.current.scrollBy({ left: dir * 260, behavior: "smooth" });

  const hovered = hover !== null ? products[hover] : null;

  return (
    <div className="shell">
      <header className="chrome">
        <nav className="nav">
          <a onClick={() => setOpen(null)}>Home</a><a>Catalog</a><a>Contact</a>
        </nav>
        <div className="search">Find a product</div>
      </header>

      {open === null ? (
        <main className="collection">
          <p className="eyebrow">NEW COLLECTION <span>|</span> PREMIUM STREETWEAR</p>
          <div className="rail-wrap">
            <div className="bar" />
            <div
              ref={rail}
              className="rail"
              onMouseDown={onDown}
              onMouseMove={onMove}
              onMouseUp={onUp}
              onMouseLeave={() => { onUp(); setHover(null); }}
            >
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={"slot" + (hover === i ? " hot" : "") + (hover !== null && hover !== i ? " dim" : "")}
                  onMouseEnter={() => setHover(i)}
                  onClick={() => !drag.current.moved && setOpen(i)}
                >
                  <span className="peg" />
                  <div className="hang">
                    {p.badge && <span className={"tagbadge" + (p.badge === "NEW" ? " new" : "")}>{p.badge}</span>}
                    <Garment product={p} />
                  </div>
                  <div className="sel">
                    <span className="sel-label"><b />Product</span>
                    <span className="handle tl" /><span className="handle tr" /><span className="handle bl" /><span className="handle br" />
                  </div>
                  <Toolbar />
                </div>
              ))}
            </div>
            <button className="rail-btn l" onClick={() => nudge(-1)} aria-label="Scroll left">‹</button>
            <button className="rail-btn r" onClick={() => nudge(1)} aria-label="Scroll right">›</button>
          </div>
          <p className="caption" key={hovered ? hovered.id : "default"}>{hovered ? hovered.name : DEFAULT_CAPTION}</p>
          <button className="cta">Shop the Collection</button>
        </main>
      ) : (
        <Detail
          index={open}
          onBack={() => setOpen(null)}
          onNav={(d) => setOpen((open + d + products.length) % products.length)}
        />
      )}
    </div>
  );
}
