import Link from "next/link";
import { ProtoFooter, ProtoNav } from "../components/shell";

const orders = [
  {
    id: "4821",
    when: "Today · 12:15",
    place: "Hearth & Rye",
    slug: "hearth-and-rye",
    items: "Hearth bowl, warm rye",
    total: "$22.00",
    state: "Being prepared",
    live: true,
  },
  {
    id: "4702",
    when: "Tuesday · 12:40",
    place: "Loma",
    slug: "loma-tacos",
    items: "Al pastor ×2, horchata",
    total: "$14.00",
    state: "Picked up",
    live: false,
  },
  {
    id: "4618",
    when: "Last Friday · 1:00",
    place: "Sunday Pasta",
    slug: "sunday-pasta",
    items: "Cacio e pepe",
    total: "$18.00",
    state: "Picked up",
    live: false,
  },
  {
    id: "4504",
    when: "Oct 1 · 8:40",
    place: "Paper Plane",
    slug: "paper-plane-coffee",
    items: "Oat latte, morning bun",
    total: "$9.00",
    state: "Picked up",
    live: false,
  },
];

export default function OrdersPage() {
  return (
    <>
      <ProtoNav cta="Avery" />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4542c]">
          Avery Chen
        </p>
        <h1 className="mt-2 [font-family:var(--font-display),Georgia,serif] text-5xl tracking-tight">
          Your pickups
        </h1>
        <p className="mt-3 text-[#5c564e]">
          A short history. Reorder sends you back to the same kitchen.
        </p>
        <ul className="mt-8 divide-y divide-[#e4d9c8] border-y border-[#e4d9c8]">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a8175]">
                  #{o.id} · {o.when}
                </p>
                <p className="mt-1 [font-family:var(--font-display),Georgia,serif] text-2xl">
                  {o.place}
                </p>
                <p className="text-sm text-[#6f675e]">
                  {o.items} · {o.total}
                </p>
                <p className={`mt-1 text-sm ${o.live ? "text-[#c4542c]" : "text-[#3f5344]"}`}>
                  {o.state}
                </p>
              </div>
              <div className="flex gap-2">
                {o.live ? (
                  <Link
                    href={`/prototype/tracking?slug=${o.slug}&at=12:15&name=Avery%20Chen&total=22&items=${encodeURIComponent(o.items)}`}
                    className="rounded-full bg-[#1a1714] px-4 py-2 text-sm text-[#f3eee6]"
                  >
                    Track
                  </Link>
                ) : null}
                <Link
                  href={`/prototype/restaurant?slug=${o.slug}`}
                  className="rounded-full border border-[#e4d9c8] px-4 py-2 text-sm"
                >
                  Order again
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <ProtoFooter />
    </>
  );
}
