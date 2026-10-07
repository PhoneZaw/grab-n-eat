"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Counter from "./counter";
import Plate from "./plate";
import Slip from "./slip";
import "./motion.css";
import "./picker.css";

const variants = [
  { name: "Counter", View: Counter },
  { name: "Plate", View: Plate },
  { name: "Slip", View: Slip },
];

export default function Harness() {
  const params = useSearchParams();
  const requested = Number(params.get("v") || "1");
  const initial = requested >= 1 && requested <= variants.length ? requested - 1 : 0;
  const [index, setIndex] = useState(initial);
  const [epoch, setEpoch] = useState(0);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function moveHighlight(i: number) {
    const el = itemRefs.current[i];
    const highlight = highlightRef.current;
    if (!el || !highlight) return;
    highlight.style.width = `${el.offsetWidth}px`;
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  function setActive(i: number) {
    if (i < 0 || i >= variants.length) return;
    setIndex(i);
    setEpoch((n) => n + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(i + 1));
    window.history.replaceState(null, "", url);
  }

  useLayoutEffect(() => {
    moveHighlight(index);
  }, [index]);

  useEffect(() => {
    const picker = pickerRef.current;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => picker?.setAttribute("data-ready", ""))
    );
    const onResize = () => moveHighlight(index);
    window.addEventListener("resize", onResize);
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= variants.length) setActive(num - 1);
      else if (e.key === "ArrowRight") setActive((index + 1) % variants.length);
      else if (e.key === "ArrowLeft") setActive((index - 1 + variants.length) % variants.length);
      else if (e.key === "r" || e.key === "R") setEpoch((n) => n + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, [index]);

  const View = variants[index].View;

  return (
    <>
      <div key={`${index}-${epoch}`}>
        <View />
      </div>
      <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
        {variants.map((variant, i) => (
          <button
            key={variant.name}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            type="button"
            className="proto-picker-item"
            {...(i === index ? { "data-active": true, "aria-current": "true" as const } : {})}
            onClick={() => setActive(i)}
          >
            {variant.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          type="button"
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={() => setEpoch((n) => n + 1)}
        >
          ↻
        </button>
      </nav>
    </>
  );
}
