"use client";

import { useMemo, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { kitchens, windows } from "./data";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Board() {
  const [slot, setSlot] = useState("12:15");
  const [name, setName] = useState<string | null>(null);

  const open = useMemo(
    () => kitchens.filter((k) => k.slots.includes(slot)),
    [slot]
  );
  const kitchen = open.find((k) => k.name === name) ?? null;

  return (
    <div className={`${grotesk.className} min-h-screen bg-[#10131a] pb-28 text-[#f4f1ea]`}>
      <header className="proto-enter flex items-end justify-between px-5 py-5 sm:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#FF5200]">South Congress</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pickup board</h1>
        </div>
        <p className="text-[13px] text-[#b7b2a8]">Live · Wednesday</p>
      </header>
      <div className="grid grid-cols-4 gap-2 px-5 sm:grid-cols-7 sm:px-8">
        {windows.map((w, i) => (
          <button
            key={w}
            type="button"
            onClick={() => {
              setSlot(w);
              setName(null);
            }}
            className={`proto-enter border px-2 py-4 text-center text-[18px] font-semibold sm:text-[22px] ${
              slot === w
                ? "border-[#FF5200] bg-[#FF5200] text-[#10131a]"
                : "border-[#2a3142] bg-[#171c27]"
            }`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {w}
          </button>
        ))}
      </div>
      <p className="px-5 pt-5 text-[13px] text-[#b7b2a8] sm:px-8">
        {slot} · {open.length} kitchen{open.length === 1 ? "" : "s"}
        {kitchen ? ` · ticket open for ${kitchen.name}` : " · no ticket open"}
      </p>
      <div className="mt-2 grid gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-[#2a3142] border-y border-[#2a3142]">
          {open.map((k) => (
            <li key={k.name}>
              <button
                type="button"
                onClick={() => setName(name === k.name ? null : k.name)}
                className="flex w-full items-baseline justify-between gap-4 py-4 text-left"
              >
                <span>
                  <span className="block text-[18px] font-semibold">{k.name}</span>
                  <span className="text-[13px] text-[#b7b2a8]">
                    {k.cuisine} · {k.area}
                  </span>
                </span>
                <span className="text-right text-[13px]">
                  <span className="block">{k.ready} min</span>
                  <span className="text-[#b7b2a8]">{k.miles} mi</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <aside className="border border-[#2a3142] bg-[#171c27] p-4">
          {kitchen ? (
            <div className="proto-enter">
              <img src={kitchen.image} alt="" className="aspect-[16/9] w-full object-cover" />
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#FF5200]">Ticket</p>
              <p className="mt-1 text-2xl font-semibold">{kitchen.name}</p>
              <p className="mt-2 text-[14px] text-[#d9d3c8]">{kitchen.plate}</p>
              <p className="mt-1 text-[14px] text-[#b7b2a8]">
                Walk in at {slot}. Ready in {kitchen.ready} min. {kitchen.miles} mi.
              </p>
              <button
                type="button"
                onClick={() => setName(null)}
                className="mt-4 w-full bg-[#FF5200] py-3 text-[14px] font-semibold text-[#10131a]"
              >
                Close ticket
              </button>
            </div>
          ) : (
            <p className="text-[14px] leading-relaxed text-[#b7b2a8]">
              Pick a minute, then a kitchen. The ticket shows the plate and the walk.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
