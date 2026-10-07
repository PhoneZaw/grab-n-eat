"use client";

import { useState } from "react";
import { Manrope, Newsreader } from "next/font/google";
import { dishes, kitchen, money } from "./data";

const display = Newsreader({ subsets: ["latin"], weight: ["500", "600"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Plate() {
  const [index, setIndex] = useState(2);
  const [slot, setSlot] = useState("12:30");
  const [qty, setQty] = useState<Record<string, number>>({});
  const dish = dishes[index];
  const count = Object.values(qty).reduce((n, q) => n + q, 0);
  const total = dishes.reduce((n, d) => n + d.price * (qty[d.id] ?? 0), 0);

  function step(delta: number) {
    setIndex((i) => (i + delta + dishes.length) % dishes.length);
  }

  return (
    <div className={`${sans.className} min-h-screen bg-white pb-28 text-[#111]`}>
      <header className="flex items-center justify-between px-5 py-4 sm:px-10">
        <p className={`${display.className} text-[22px]`}>{kitchen.name}</p>
        <p className="text-[13px] text-[#555]">
          {count} in the bag · {money(total)} · {slot}
        </p>
      </header>
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 md:grid-cols-2 md:px-10">
        <img
          key={dish.id}
          src={dish.image}
          alt=""
          className="proto-enter aspect-[4/5] w-full object-cover"
        />
        <div className="proto-enter" key={`${dish.id}-copy`}>
          <p className="text-[12px] uppercase tracking-[0.16em] text-[#FF5200]">
            {dish.section} · {index + 1} of {dishes.length}
          </p>
          <h1 className={`${display.className} mt-2 text-5xl leading-none`}>{dish.name}</h1>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#333]">{dish.description}</p>
          <p className="mt-4 text-[18px]">{money(dish.price)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {kitchen.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`border px-3 py-2 text-[14px] ${
                  slot === s ? "border-[#111] bg-[#111] text-white" : "border-[#ddd]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => step(-1)} className="border border-[#111] px-4 py-3 text-[14px]">
              Previous
            </button>
            <button type="button" onClick={() => step(1)} className="border border-[#111] px-4 py-3 text-[14px]">
              Next plate
            </button>
            <button
              type="button"
              onClick={() => setQty((q) => ({ ...q, [dish.id]: (q[dish.id] ?? 0) + 1 }))}
              className="bg-[#FF5200] px-4 py-3 text-[14px] font-semibold text-white"
            >
              Add{(qty[dish.id] ?? 0) > 0 ? ` · ${qty[dish.id]}` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
