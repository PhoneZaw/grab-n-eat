"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { findRestaurant, MenuItem, money } from "../data";

type Line = {
  key: string;
  item: MenuItem;
  qty: number;
  extra: string;
  extraPrice: number;
};

const addons = [
  { id: "egg", label: "Soft egg", price: 2 },
  { id: "chili", label: "Chili oil", price: 1 },
  { id: "bread", label: "Extra bread", price: 3 },
];

export default function MenuExperience() {
  const params = useSearchParams();
  const restaurant = findRestaurant(params.get("slug"));
  const preset = params.get("at");
  const [slot, setSlot] = useState(
    preset && restaurant.slots.includes(preset) ? preset : restaurant.slots[1] ?? restaurant.slots[0]
  );
  const [lines, setLines] = useState<Line[]>([]);
  const [active, setActive] = useState<MenuItem | null>(null);
  const [addon, setAddon] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + (l.item.price + l.extraPrice) * l.qty, 0),
    [lines]
  );

  function openItem(item: MenuItem) {
    setActive(item);
    setAddon([]);
    setNote("");
  }

  function addActive() {
    if (!active) return;
    const chosen = addons.filter((a) => addon.includes(a.id));
    const extraPrice = chosen.reduce((s, a) => s + a.price, 0);
    const extra = [chosen.map((a) => a.label).join(", "), note.trim()]
      .filter(Boolean)
      .join(" · ");
    setLines((prev) => {
      const key = `${active.id}-${extra}`;
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { key, item: active, qty: 1, extra, extraPrice }];
    });
    setActive(null);
  }

  function changeQty(key: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }

  const checkoutHref = `/prototype/checkout?slug=${restaurant.slug}&at=${encodeURIComponent(slot)}&items=${encodeURIComponent(
    lines.map((l) => `${l.item.name} × ${l.qty}`).join(", ")
  )}&total=${total.toFixed(2)}`;

  return (
    <div className={`mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_320px] ${lines.length > 0 ? "pb-28 lg:pb-8" : ""}`}>
      <div>
        <div className="overflow-hidden rounded-[32px]">
          <img
            src={restaurant.image}
            alt=""
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#FF5200]">
              {restaurant.cuisine} · {restaurant.neighborhood}
            </p>
            <h1 className="mt-2 [font-family:var(--font-display),sans-serif] text-5xl tracking-tight">
              {restaurant.name}
            </h1>
            <p className="mt-3 max-w-xl text-[#3D465C]">{restaurant.blurb}</p>
            <p className="mt-2 text-sm text-[#5A6478]">
              {restaurant.rating} · {restaurant.reviews} notes · {restaurant.miles} mi ·{" "}
              {restaurant.hours}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7B8499]">
            Pickup window
          </p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {restaurant.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                  slot === s
                    ? "bg-[#101828] text-[#F4F6FB]"
                    : "bg-[#FFFFFF] ring-1 ring-[#E2E6F0]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-10">
          {restaurant.menu.map((section) => (
            <section key={section.name} id={section.name}>
              <h2 className="[font-family:var(--font-display),sans-serif] text-3xl tracking-tight">
                {section.name}
              </h2>
              <ul className="mt-4 divide-y divide-[#E2E6F0] border-y border-[#E2E6F0]">
                {section.items.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="text-base">
                        {item.name}
                        {item.popular ? (
                          <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-[#FF5200]">
                            Usual
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-1 max-w-md text-sm text-[#5A6478]">
                        {item.description}
                      </p>
                      <p className="mt-2 text-sm">{money(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openItem(item)}
                      className="mt-1 rounded-full border border-[#101828] px-3 py-1.5 text-sm hover:bg-[#101828] hover:text-[#F4F6FB]"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[28px] border border-[#E2E6F0] bg-[#FFFFFF] p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7B8499]">
            Your pickup · {slot}
          </p>
          {lines.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-[#5A6478]">
              The bag is empty. Add a plate and it will wait here until you
              check out.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {lines.map((l) => (
                <li key={l.key}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm">{l.item.name}</p>
                      {l.extra ? (
                        <p className="text-xs text-[#7B8499]">{l.extra}</p>
                      ) : null}
                    </div>
                    <p className="text-sm">
                      {money((l.item.price + l.extraPrice) * l.qty)}
                    </p>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-full bg-[#F4F6FB] px-2 py-1 text-sm">
                    <button type="button" onClick={() => changeQty(l.key, -1)} aria-label="Decrease">
                      −
                    </button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => changeQty(l.key, 1)} aria-label="Increase">
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex items-center justify-between border-t border-[#E2E6F0] pt-4 text-sm">
            <span>Subtotal</span>
            <span>{money(total)}</span>
          </div>
          {lines.length > 0 ? (
            <Link
              href={checkoutHref}
              className="mt-4 block rounded-full bg-[#FF5200] py-3 text-center text-sm text-white hover:bg-[#D84300]"
            >
              Checkout · {slot}
            </Link>
          ) : (
            <p className="mt-4 text-center text-xs text-[#7B8499]">
              Choose something to continue.
            </p>
          )}
        </div>
          <Link
            href="/prototype/restaurants"
            className="mt-4 block text-center text-sm text-[#5A6478] hover:text-[#101828]"
          >
            ← Other kitchens
          </Link>
        </aside>
        {lines.length > 0 ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E6F0] bg-[#FFFFFF] p-3 lg:hidden">
            <Link
              href={checkoutHref}
              className="flex items-center justify-between rounded-full bg-[#FF5200] px-5 py-3 text-sm text-white"
            >
              <span>
                {lines.reduce((n, l) => n + l.qty, 0)} in the bag · {slot}
              </span>
              <span>{money(total)}</span>
            </Link>
          </div>
        ) : null}

      {active ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#101828]/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="item-title"
            className="w-full max-w-md rounded-[28px] bg-[#FFFFFF] p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7B8499]">
              {restaurant.name}
            </p>
            <h2
              id="item-title"
              className="mt-2 [font-family:var(--font-display),sans-serif] text-3xl tracking-tight"
            >
              {active.name}
            </h2>
            <p className="mt-2 text-sm text-[#3D465C]">{active.description}</p>
            <fieldset className="mt-5">
              <legend className="text-sm">Add if you like</legend>
              <div className="mt-2 space-y-2">
                {addons.map((a) => (
                  <label key={a.id} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addon.includes(a.id)}
                        onChange={() =>
                          setAddon((prev) =>
                            prev.includes(a.id)
                              ? prev.filter((id) => id !== a.id)
                              : [...prev, a.id]
                          )
                        }
                      />
                      {a.label}
                    </span>
                    <span className="text-[#5A6478]">+{money(a.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-4 block text-sm">
              Note for the kitchen
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="No onion, extra lemon…"
                className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-transparent px-3 py-2 outline-none focus:border-[#101828]"
              />
            </label>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex-1 rounded-full border border-[#E2E6F0] py-3 text-sm"
              >
                Close
              </button>
              <button
                type="button"
                onClick={addActive}
                className="flex-1 rounded-full bg-[#101828] py-3 text-sm text-[#F4F6FB]"
              >
                Add {money(active.price + addons.filter((a) => addon.includes(a.id)).reduce((s, a) => s + a.price, 0))}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
