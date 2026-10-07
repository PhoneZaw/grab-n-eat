"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cuisines, restaurants } from "../data";

const sorts = [
  { id: "nearest", label: "Nearest" },
  { id: "rating", label: "Top rated" },
  { id: "ready", label: "Ready soonest" },
] as const;

export default function Browse() {
  const params = useSearchParams();
  const initialCuisine = params.get("cuisine") ?? "All";
  const initialQuery = params.get("q") ?? "";
  const at = params.get("at");

  const [cuisine, setCuisine] = useState(
    cuisines.includes(initialCuisine) ? initialCuisine : "All"
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("nearest");
  const [openOnly, setOpenOnly] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = restaurants.filter((r) => {
      const matchesCuisine = cuisine === "All" || r.cuisine === cuisine;
      const matchesOpen = !openOnly || r.open;
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.neighborhood.toLowerCase().includes(q) ||
        r.blurb.toLowerCase().includes(q);
      return matchesCuisine && matchesOpen && matchesQuery;
    });
    rows = [...rows].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "ready") return a.readyMin - b.readyMin;
      return a.miles - b.miles;
    });
    return rows;
  }, [cuisine, query, sort, openOnly]);

  return (
    <div>
      <div className="sticky top-[6.75rem] z-30 border-b border-[#E2E6F0] bg-[#F4F6FB]/95 backdrop-blur md:top-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kitchens, dishes, neighborhoods"
              className="w-full rounded-full border border-[#E2E6F0] bg-[#FFFFFF] px-4 py-2.5 text-sm outline-none focus:border-[#101828]"
            />
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setOpenOnly((v) => !v)}
                className={`rounded-full border px-3 py-2 text-sm ${
                  openOnly
                    ? "border-[#101828] bg-[#101828] text-[#F4F6FB]"
                    : "border-[#E2E6F0] bg-[#FFFFFF]"
                }`}
              >
                Open now
              </button>
              <label className="text-sm text-[#3D465C]">
                <span className="sr-only">Sort</span>
                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value as (typeof sorts)[number]["id"])
                  }
                  className="rounded-full border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-2 outline-none"
                >
                  {sorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cuisines.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCuisine(c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${
                  cuisine === c
                    ? "bg-[#FF5200] text-white"
                    : "bg-[#FFFFFF] text-[#2A3142] ring-1 ring-[#E2E6F0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm text-[#5A6478]">
            {list.length} kitchen{list.length === 1 ? "" : "s"}
            {at ? ` · aiming for ${at}` : ""} · South Congress and nearby
          </p>
          {list.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-[#C9D0E0] bg-[#FFFFFF] p-10 text-center">
              <p className="[font-family:var(--font-display),sans-serif] text-3xl">
                Nothing in that corner.
              </p>
              <p className="mt-2 text-sm text-[#5A6478]">
                Try another cuisine, or turn off “Open now”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCuisine("All");
                  setQuery("");
                  setOpenOnly(false);
                }}
                className="mt-5 text-sm text-[#FF5200] underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">
              {list.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/prototype/restaurant?slug=${r.slug}${at ? `&at=${encodeURIComponent(at)}` : ""}`}
                    className="group block overflow-hidden rounded-[28px] border border-[#E2E6F0] bg-[#FFFFFF]"
                  >
                    <div className="relative">
                      <img
                        src={r.image}
                        alt=""
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[#FFFFFF]/95 px-2.5 py-1 text-xs">
                        {r.open ? `Ready in ${r.readyMin} min` : "Dinner only"}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="[font-family:var(--font-display),sans-serif] text-2xl tracking-tight">
                          {r.name}
                        </h2>
                        <span className="text-sm">{r.rating}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#5A6478]">
                        {r.cuisine} · {r.price} · {r.miles} mi · {r.neighborhood}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#3D465C]">
                        {r.blurb}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {r.slots.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className={`rounded-full px-2 py-1 text-xs ${
                              at === s
                                ? "bg-[#101828] text-[#F4F6FB]"
                                : "bg-[#F4F6FB] text-[#2A3142]"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-40 rounded-[28px] border border-[#E2E6F0] bg-[#12182B] p-5 text-[#F4F6FB]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#9DB0FF]">
              This afternoon
            </p>
            <p className="mt-3 [font-family:var(--font-display),sans-serif] text-3xl leading-tight">
              Six kitchens inside three miles.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#D5DCF0]">
              {restaurants.map((r) => (
                <li key={r.slug} className="flex justify-between gap-3">
                  <span>{r.neighborhood}</span>
                  <span className="text-[#9DB0FF]">{r.miles} mi</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-[#9AA6C4]">
              Distances are sample figures for the study, measured from a pin
              on South Congress.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
