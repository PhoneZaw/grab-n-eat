"use client";

import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { dishes, kitchen, money } from "./data";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Line = { id: string; qty: number };

export default function Slip() {
  const [slot, setSlot] = useState("12:15");
  const [lines, setLines] = useState<Line[]>([]);
  const [sent, setSent] = useState(false);

  const detailed = lines
    .map((line) => ({ ...line, dish: dishes.find((d) => d.id === line.id)! }))
    .filter((line) => line.dish);
  const total = detailed.reduce((n, line) => n + line.dish.price * line.qty, 0);

  function add(id: string) {
    setSent(false);
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
  }

  function remove(id: string) {
    setSent(false);
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className={`${grotesk.className} min-h-screen bg-[#f3f1ec] pb-28 text-[#1a1a1a]`}>
      <div className="mx-auto grid max-w-5xl gap-6 px-5 py-6 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-[#FF5200]">{kitchen.name}</p>
          <h1 className="proto-enter mt-1 text-3xl font-semibold">Add to the slip</h1>
          <p className="mt-2 text-[14px] text-[#555]">
            Window {slot}. {detailed.length === 0 ? "Slip is blank." : `${detailed.length} lines, ${money(total)}.`}
            {sent ? " Sent to the counter." : " Not sent."}
          </p>
          <ul className="mt-4">
            {dishes.map((dish) => (
              <li key={dish.id} className="flex items-center justify-between gap-3 border-b border-[#ddd] py-3">
                <span>
                  <span className="block text-[16px] font-medium">{dish.name}</span>
                  <span className="text-[13px] text-[#666]">
                    {dish.section} · {money(dish.price)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => add(dish.id)}
                  className="rounded-md bg-[#1a1a1a] px-3 py-2 text-[13px] text-white"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        <aside className="proto-enter h-fit bg-white p-5 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.8)]">
          <p className="text-center text-[12px] uppercase tracking-[0.18em]">Guest check</p>
          <p className="mt-1 text-center text-[13px] text-[#666]">{kitchen.area}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {kitchen.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSlot(s);
                  setSent(false);
                }}
                className={`px-2 py-1 text-[13px] ${slot === s ? "bg-[#FF5200] text-white" : "bg-[#f3f1ec]"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-3 border-t border-dashed border-[#ccc] pt-4">
            {detailed.length === 0 ? (
              <li className="text-[14px] text-[#777]">No lines yet.</li>
            ) : (
              detailed.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-3 text-[14px]">
                  <span>
                    {line.dish.name} × {line.qty}
                    <button type="button" onClick={() => remove(line.id)} className="mt-1 block text-[12px] text-[#FF5200]">
                      Remove
                    </button>
                  </span>
                  <span>{money(line.dish.price * line.qty)}</span>
                </li>
              ))
            )}
          </ul>
          <p className="mt-4 flex justify-between border-t border-[#111] pt-3 text-[16px] font-semibold">
            <span>Due</span>
            <span>{money(total)}</span>
          </p>
          <button
            type="button"
            disabled={detailed.length === 0 || sent}
            onClick={() => setSent(true)}
            className="mt-4 w-full bg-[#FF5200] py-3 text-[14px] font-semibold text-white disabled:bg-[#ccc]"
          >
            {sent ? `Sent for ${slot}` : "Send to the counter"}
          </button>
        </aside>
      </div>
    </div>
  );
}
