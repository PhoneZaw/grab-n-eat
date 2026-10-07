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
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF5200]">
          Avery Chen
        </p>
        <h1 className="mt-2 [font-family:var(--font-display),sans-serif] text-5xl tracking-tight">
          Your pickups
        </h1>
        <p className="mt-3 text-[#3D465C]">
          A short history. Reorder sends you back to the same kitchen.
        </p>
        <ul className="mt-8 divide-y divide-[#E2E6F0] border-y border-[#E2E6F0]">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7B8499]">
                  #{o.id} · {o.when}
                </p>
                <p className="mt-1 [font-family:var(--font-display),sans-serif] text-2xl">
                  {o.place}
                </p>
                <p className="text-sm text-[#5A6478]">
                  {o.items} · {o.total}
                </p>
                <p className={`mt-1 text-sm ${o.live ? "text-[#FF5200]" : "text-[#0B8A5B]"}`}>
                  {o.state}
                </p>
              </div>
              <div className="flex gap-2">
                {o.live ? (
                  <Link
                    href={`/prototype/tracking?slug=${o.slug}&at=12:15&name=Avery%20Chen&total=22&items=${encodeURIComponent(o.items)}`}
                    className="rounded-full bg-[#101828] px-4 py-2 text-sm text-[#F4F6FB]"
                  >
                    Track
                  </Link>
                ) : null}
                <Link
                  href={`/prototype/restaurant?slug=${o.slug}`}
                  className="rounded-full border border-[#E2E6F0] px-4 py-2 text-sm"
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
