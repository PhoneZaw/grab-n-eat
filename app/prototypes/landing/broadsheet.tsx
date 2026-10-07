"use client";

import { useState } from "react";
import { Newsreader, Manrope } from "next/font/google";
import { kitchens } from "./data";

const display = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] });

const featured = kitchens.slice(0, 3);

export default function Broadsheet() {
  const [index, setIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const kitchen = featured[index];

  return (
    <div className={`${sans.className} min-h-screen bg-white pb-28 text-[#111]`}>
      <header className="proto-enter flex items-end justify-between border-b border-[#111] px-5 py-4 sm:px-10">
        <p className={`${display.className} text-[22px] leading-none`}>Grab-n-Eat</p>
        <p className="text-[12px] uppercase tracking-[0.16em]">Austin · Lunch edition</p>
      </header>
      <article className="px-5 pt-8 sm:px-10">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#FF5200]">
          Story {index + 1} of {featured.length}
        </p>
        <h1
          className={`${display.className} proto-enter mt-3 max-w-4xl text-[3.4rem] leading-[0.92] tracking-tight sm:text-7xl`}
        >
          The walk is the delivery.
        </h1>
        <img
          src={kitchen.image}
          alt=""
          className="proto-enter mt-8 aspect-[16/8] w-full object-cover"
        />
        <div className="mt-6 grid gap-8 border-b border-[#111] pb-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className={`${display.className} text-4xl`}>{kitchen.name}</h2>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[#333]">{kitchen.blurb}</p>
            <p className="mt-3 text-[14px] text-[#555]">
              {kitchen.area} · {kitchen.miles} mi · {kitchen.rating} · ready in {kitchen.ready} min
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em]">Hold a window</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {kitchen.slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(slot === s ? null : s)}
                  className={`border px-3 py-2 text-[14px] ${
                    slot === s ? "border-[#111] bg-[#111] text-white" : "border-[#111] bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[14px]">
              {slot
                ? `Holding ${slot} at ${kitchen.name}. ${kitchen.plate}.`
                : `No window held at ${kitchen.name}.`}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIndex((index + featured.length - 1) % featured.length);
                  setSlot(null);
                }}
                className="border border-[#111] px-4 py-2 text-[14px]"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndex((index + 1) % featured.length);
                  setSlot(null);
                }}
                className="bg-[#FF5200] px-4 py-2 text-[14px] text-white"
              >
                Next kitchen
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-6 py-8 sm:grid-cols-3">
          {[
            ["01", "Pick the kitchen", "Three covers today. The rest of the city can wait."],
            ["02", "Name the minute", "The counter fires for that window, not for a courier."],
            ["03", "Walk in", "A code, your name, the plate. No doorstep photo."],
          ].map(([n, t, b]) => (
            <div key={n}>
              <p className="text-[12px] text-[#FF5200]">{n}</p>
              <p className={`${display.className} mt-1 text-2xl`}>{t}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#444]">{b}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
