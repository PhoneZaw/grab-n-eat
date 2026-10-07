import Link from "next/link";
import { ProtoFooter, ProtoNav } from "../components/shell";
import { findRestaurant, money } from "../data";

const steps = ["Received", "On the fire", "At the counter", "Picked up"];

export default function TrackingPage({
  searchParams,
}: {
  searchParams: { slug?: string; at?: string; name?: string; total?: string; items?: string };
}) {
  const restaurant = findRestaurant(searchParams.slug);
  const slot = searchParams.at || restaurant.slots[2] || "12:30";
  const name = searchParams.name || "Avery Chen";
  const total = searchParams.total ? money(Number(searchParams.total)) : "$22.00";
  const items = searchParams.items || "Hearth bowl ×1, Warm rye & butter ×1";

  return (
    <>
      <ProtoNav cta="Avery" />
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4542c]">
            Order 4821 · today {slot}
          </p>
          <h1 className="mt-3 [font-family:var(--font-display),Georgia,serif] text-5xl leading-tight tracking-tight sm:text-6xl">
            Being prepared.
          </h1>
          <p className="mt-4 max-w-md text-lg text-[#5c564e]">
            {restaurant.name} has your window. Walk in at {slot} and give them
            this code.
          </p>
          <div className="mt-8 inline-flex flex-col rounded-[28px] bg-[#1a1714] px-8 py-6 text-[#f3eee6]">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#d7c4a8]">
              Pickup code
            </span>
            <span className="[font-family:var(--font-display),Georgia,serif] text-6xl tracking-[0.12em]">
              4821
            </span>
            <span className="text-sm text-[#d7c4a8]">For {name}</span>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step} className="border-t border-[#1a1714] pt-3">
                <p className="text-[11px] tracking-[0.16em] text-[#8a8175]">
                  0{i + 1}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    i === 1 ? "text-[#c4542c]" : "text-[#1a1714]"
                  }`}
                >
                  {step}
                  {i === 1 ? " · now" : ""}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="rounded-[32px] border border-[#e4d9c8] bg-[#fffdf8] p-6">
          <img
            src={restaurant.portrait}
            alt=""
            className="aspect-[5/3] w-full rounded-2xl object-cover"
          />
          <h2 className="mt-5 [font-family:var(--font-display),Georgia,serif] text-3xl">
            {restaurant.name}
          </h2>
          <p className="mt-1 text-sm text-[#6f675e]">
            {restaurant.neighborhood} · {restaurant.miles} mi · {restaurant.hours}
          </p>
          <p className="mt-4 text-sm leading-relaxed">{items}</p>
          <p className="mt-4 text-sm">Paid {total} · no pickup fee</p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/prototype/orders"
              className="rounded-full bg-[#1a1714] px-4 py-2 text-sm text-[#f3eee6]"
            >
              All orders
            </Link>
            <Link
              href={`/prototype/restaurant?slug=${restaurant.slug}`}
              className="rounded-full border border-[#e4d9c8] px-4 py-2 text-sm"
            >
              Menu again
            </Link>
          </div>
        </aside>
      </main>
      <ProtoFooter />
    </>
  );
}
