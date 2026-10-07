"use client";

import { useMemo, useState } from "react";
import { DM_Sans } from "next/font/google";
import { dishes, kitchen, money, sections } from "./data";

const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Counter() {
  const [section, setSection] = useState(sections[0]);
  const [slot, setSlot] = useState("12:15");
  const [qty, setQty] = useState<Record<string, number>>({});

  const visible = dishes.filter((d) => d.section === section);
  const lines = dishes.filter((d) => (qty[d.id] ?? 0) > 0);
  const count = lines.reduce((n, d) => n + qty[d.id], 0);
  const total = lines.reduce((n, d) => n + d.price * qty[d.id], 0);
  const summary = useMemo(
    () =>
      lines.length
        ? lines.map((d) => `${d.name} × ${qty[d.id]}`).join(", ")
        : "Bag empty",
    [lines, qty]
  );

  function add(id: string, delta: number) {
    setQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  }

  return (
    <div className={`${sans.className} min-h-screen bg-[#f6f6f6] pb-28 text-[#141414]`}>
      <header className="proto-enter border-b border-[#e6e6e6] bg-white px-5 py-4">
        <p className="text-[13px] text-[#666]">
          {kitchen.area} · {kitchen.miles} mi · ready {kitchen.ready} min
        </p>
        <h1 className="text-[22px] font-semibold tracking-tight">{kitchen.name}</h1>
      </header>
      <div className="mx-auto grid max-w-5xl gap-6 px-5 py-5 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="flex gap-2">
            {sections.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSection(name)}
                className={`rounded-lg px-3 py-2 text-[13px] font-medium ${
                  section === name ? "bg-[#141414] text-white" : "bg-white text-[#333]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <ul className="mt-4 divide-y divide-[#ececec] rounded-xl bg-white">
            {visible.map((dish) => (
              <li key={dish.id} className="flex items-center gap-3 px-3 py-3">
                <img src={dish.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold">
                    {dish.name}
                    {dish.popular ? (
                      <span className="ml-2 text-[11px] font-medium text-[#FF5200]">Usual</span>
                    ) : null}
                  </p>
                  <p className="truncate text-[13px] text-[#666]">{dish.description}</p>
                  <p className="text-[13px]">{money(dish.price)}</p>
                </div>
                {(qty[dish.id] ?? 0) > 0 ? (
                  <div className="flex items-center gap-2 text-[14px]">
                    <button type="button" onClick={() => add(dish.id, -1)} aria-label={`Less ${dish.name}`}>
                      −
                    </button>
                    <span>{qty[dish.id]}</span>
                    <button type="button" onClick={() => add(dish.id, 1)} aria-label={`More ${dish.name}`}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => add(dish.id, 1)}
                    className="rounded-lg bg-[#FF5200] px-3 py-2 text-[13px] font-semibold text-white"
                  >
                    Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-xl bg-white p-4">
          <p className="text-[12px] font-medium text-[#666]">Pickup</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {kitchen.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-md px-2 py-1 text-[13px] ${
                  slot === s ? "bg-[#FF5200] text-white" : "bg-[#f3f3f3]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#444]">
            {slot} · {count} item{count === 1 ? "" : "s"} · {money(total)}. {summary}.
          </p>
        </aside>
      </div>
    </div>
  );
}
