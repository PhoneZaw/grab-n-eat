"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { findRestaurant, money } from "../data";

const methods = ["Card ending 4242", "Apple Pay", "Pay at the counter"];

export default function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const restaurant = findRestaurant(params.get("slug"));
  const items =
    params.get("items") || "Hearth bowl ×1, Warm rye & butter ×1";
  const passed = Number(params.get("total"));
  const subtotal = Number.isFinite(passed) && passed > 0 ? passed : 22;
  const initialSlot =
    params.get("at") && restaurant.slots.includes(params.get("at") as string)
      ? (params.get("at") as string)
      : restaurant.slots[2] ?? restaurant.slots[0];

  const [slot, setSlot] = useState(initialSlot);
  const [name, setName] = useState("Avery Chen");
  const [phone, setPhone] = useState("(512) 555-0148");
  const [method, setMethod] = useState(methods[0]);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [error, setError] = useState("");

  const discount = applied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  function applyCode() {
    if (code.trim().toUpperCase() === "FRESH10") {
      setApplied(true);
      setCodeError("");
    } else {
      setApplied(false);
      setCodeError("Try FRESH10 — ten percent off this study order.");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 7) {
      setError("Add the name and phone the counter should call.");
      return;
    }
    const next = new URLSearchParams({
      slug: restaurant.slug,
      at: slot,
      name: name.trim(),
      total: total.toFixed(2),
      items,
    });
    router.push(`/prototype/tracking?${next.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_340px]"
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#2F5BFF]">
          Checkout
        </p>
        <h1 className="mt-2 [font-family:var(--font-display),sans-serif] text-5xl tracking-tight">
          Confirm the window.
        </h1>
        <p className="mt-3 text-[#3D465C]">
          {restaurant.name} · {restaurant.neighborhood}. You will pick this up
          yourself.
        </p>

        <fieldset className="mt-8">
          <legend className="text-sm">Pickup time</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-full px-4 py-2 text-sm ${
                  slot === s
                    ? "bg-[#101828] text-[#F4F6FB]"
                    : "bg-[#FFFFFF] ring-1 ring-[#E2E6F0]"
                }`}
              >
                Today {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            Name on the order
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-3 outline-none focus:border-[#101828]"
            />
          </label>
          <label className="text-sm">
            Phone
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-3 outline-none focus:border-[#101828]"
            />
          </label>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm">Payment</legend>
          <div className="mt-3 grid gap-2">
            {methods.map((m) => (
              <label
                key={m}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                  method === m
                    ? "border-[#101828] bg-[#FFFFFF]"
                    : "border-[#E2E6F0]"
                }`}
              >
                <span>{m}</span>
                <input
                  type="radio"
                  name="pay"
                  checked={method === m}
                  onChange={() => setMethod(m)}
                />
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="mt-4 text-sm text-[#2F5BFF]">{error}</p> : null}
      </div>

      <aside className="h-fit rounded-[28px] border border-[#E2E6F0] bg-[#FFFFFF] p-5">
        <p className="[font-family:var(--font-display),sans-serif] text-2xl">
          {restaurant.name}
        </p>
        <p className="mt-1 text-sm text-[#5A6478]">Today · {slot}</p>
        <p className="mt-4 text-sm leading-relaxed">{items}</p>
        <div className="mt-4 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            className="w-full rounded-full border border-[#E2E6F0] px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={applyCode}
            className="rounded-full border border-[#101828] px-3 text-sm"
          >
            Apply
          </button>
        </div>
        {codeError ? <p className="mt-2 text-xs text-[#2F5BFF]">{codeError}</p> : null}
        {applied ? (
          <p className="mt-2 text-xs text-[#0B8A5B]">FRESH10 applied.</p>
        ) : null}
        <dl className="mt-5 space-y-2 border-t border-[#E2E6F0] pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Food</dt>
            <dd>{money(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-[#5A6478]">
            <dt>Pickup fee</dt>
            <dd>$0.00</dd>
          </div>
          {applied ? (
            <div className="flex justify-between text-[#0B8A5B]">
              <dt>FRESH10</dt>
              <dd>−{money(discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between pt-2 text-base">
            <dt>Due</dt>
            <dd>{money(total)}</dd>
          </div>
        </dl>
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-[#2F5BFF] py-3 text-sm text-white hover:bg-[#1D3FBF]"
        >
          Place pickup order
        </button>
        <Link
          href={`/prototype/restaurant?slug=${restaurant.slug}`}
          className="mt-3 block text-center text-sm text-[#5A6478]"
        >
          Back to the menu
        </Link>
      </aside>
    </form>
  );
}
