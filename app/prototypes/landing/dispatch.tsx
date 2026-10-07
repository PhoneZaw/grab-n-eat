"use client";

import { useMemo, useState } from "react";
import { DM_Sans } from "next/font/google";
import { kitchens, windows } from "./data";

const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Dispatch() {
  const [query, setQuery] = useState("");
  const [slot, setSlot] = useState("12:15");
  const [held, setHeld] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return kitchens.filter((k) => {
      const text = `${k.name} ${k.cuisine} ${k.area} ${k.plate}`.toLowerCase();
      return k.slots.includes(slot) && (!q || text.includes(q));
    });
  }, [query, slot]);

  return (
    <div className={`${sans.className} min-h-screen bg-white pb-28 text-[#141414]`}>
      <header className="proto-enter flex items-center justify-between border-b border-[#ececec] px-5 py-4">
        <p className="text-[15px] font-semibold tracking-tight">Grab-n-Eat</p>
        <p className="text-[13px] text-[#666]">Austin · South Congress</p>
      </header>
      <div className="mx-auto max-w-3xl px-5 pt-6">
        <label className="proto-enter block">
          <span className="sr-only">Search kitchens</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHeld(null);
            }}
            placeholder="Tacos, rye, Hyde Park"
            className="w-full rounded-xl border border-[#e4e4e4] bg-[#fafafa] px-4 py-3 text-[16px] outline-none focus:border-[#141414]"
          />
        </label>
        <div className="proto-enter mt-3 flex gap-2 overflow-x-auto pb-1">
          {windows.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => {
                setSlot(w);
                setHeld(null);
              }}
              className={`shrink-0 rounded-lg px-3 py-2 text-[13px] font-medium ${
                slot === w ? "bg-[#FF5200] text-white" : "bg-[#f3f3f3] text-[#333]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[#666]">
          {list.length} kitchen{list.length === 1 ? "" : "s"} can hit {slot}
          {query.trim() ? ` matching “${query.trim()}”` : ""}.
          {held ? ` Holding ${held}.` : " Nothing held."}
        </p>
        <ul className="mt-3 divide-y divide-[#eee] border-y border-[#eee]">
          {list.length === 0 ? (
            <li className="py-8 text-[14px] text-[#666]">
              Nothing makes that window. Try 12:15, or clear the search.
            </li>
          ) : (
            list.map((k, i) => (
              <li
                key={k.name}
                className="proto-enter flex items-center gap-3 py-3"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <img src={k.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{k.name}</p>
                  <p className="truncate text-[13px] text-[#666]">
                    {k.cuisine} · {k.miles} mi · ready {k.ready} min · {k.plate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setHeld(held === k.name ? null : `${slot} at ${k.name}`)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-[13px] font-semibold ${
                    held === `${slot} at ${k.name}`
                      ? "bg-[#141414] text-white"
                      : "bg-[#FF5200] text-white"
                  }`}
                >
                  {held === `${slot} at ${k.name}` ? "Held" : "Hold"}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
