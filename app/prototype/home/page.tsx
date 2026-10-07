import Link from "next/link";
import { restaurants } from "../data";
import { ProtoFooter, ProtoNav } from "../components/shell";
import SearchForm from "./search-form";

const cuisines = [
  { name: "Mexican", slug: "Mexican" },
  { name: "Japanese", slug: "Japanese" },
  { name: "Italian", slug: "Italian" },
  { name: "Seasonal", slug: "Seasonal" },
  { name: "Cafe", slug: "Cafe" },
  { name: "Burgers", slug: "Burgers" },
];

const steps = [
  {
    n: "01",
    title: "Pick a kitchen",
    body: "A short list near you, with the next ready times already on the card.",
  },
  {
    n: "02",
    title: "Choose a window",
    body: "Fifteen minutes is a promise, not a guess. The kitchen sees it too.",
  },
  {
    n: "03",
    title: "Walk in",
    body: "Your name and a four-digit code. No driver, no doorstep photo.",
  },
];

export default function PrototypeHome() {
  const featured = restaurants.filter((r) => r.open).slice(0, 3);

  return (
    <>
      <ProtoNav />
      <main>
        <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-8 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#2F5BFF]">
              Pickup, on purpose
            </p>
            <h1 className="mt-4 [font-family:var(--font-display),sans-serif] text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl">
              Lunch,
              <br />
              ready when
              <br />
              <span className="text-[#2F5BFF]">you are.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3D465C]">
              Order from neighborhood kitchens and collect it in a window you
              choose. No delivery fee. No one waiting on your porch.
            </p>
            <SearchForm />
            <p className="mt-4 text-sm text-[#7B8499]">
              Around South Congress · most plates ready in under 20 minutes
            </p>
          </div>
          <div className="relative">
            <img
              src={featured[0].image}
              alt="A seasonal bowl from Hearth & Rye"
              className="aspect-[4/5] w-full rounded-[32px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#FFFFFF]/95 p-4 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7B8499]">
                Nearby · {featured[0].readyMin} min
              </p>
              <p className="mt-1 [font-family:var(--font-display),sans-serif] text-2xl">
                {featured[0].name}
              </p>
              <p className="text-sm text-[#3D465C]">{featured[0].blurb}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {cuisines.map((c) => (
              <Link
                key={c.slug}
                href={`/prototype/restaurants?cuisine=${encodeURIComponent(c.slug)}`}
                className="shrink-0 rounded-full border border-[#E2E6F0] bg-[#FFFFFF] px-4 py-2 text-sm hover:border-[#101828]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="[font-family:var(--font-display),sans-serif] text-4xl tracking-tight">
              Open near you
            </h2>
            <Link
              href="/prototype/restaurants"
              className="text-sm text-[#2F5BFF] hover:underline"
            >
              All kitchens
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((r) => (
              <Link
                key={r.slug}
                href={`/prototype/restaurant?slug=${r.slug}`}
                className="group"
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={r.image}
                    alt=""
                    className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="[font-family:var(--font-display),sans-serif] text-2xl tracking-tight">
                    {r.name}
                  </h3>
                  <span className="text-sm text-[#3D465C]">{r.rating}</span>
                </div>
                <p className="mt-1 text-sm text-[#5A6478]">
                  {r.cuisine} · {r.neighborhood} · {r.miles} mi
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.slots.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#E2E6F0] px-2.5 py-1 text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[#E2E6F0] bg-[#FFFFFF]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="text-[11px] tracking-[0.18em] text-[#2F5BFF]">
                  {s.n}
                </p>
                <h3 className="mt-3 [font-family:var(--font-display),sans-serif] text-3xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3D465C]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2">
          <img
            src={restaurants[1].portrait}
            alt="A dining room with warm light"
            className="aspect-[5/4] w-full rounded-[32px] object-cover"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7B8499]">
              For the counter, too
            </p>
            <h2 className="mt-3 [font-family:var(--font-display),sans-serif] text-4xl leading-tight tracking-tight sm:text-5xl">
              Kitchens see the window before they fire the plate.
            </h2>
            <p className="mt-4 max-w-md text-[#3D465C] leading-relaxed">
              Grab-n-Eat is built around pickup slots, not a courier map. This
              study keeps that idea visible: every order is a time, a name,
              and a code.
            </p>
            <Link
              href="/prototype/restaurant?slug=loma-tacos"
              className="mt-6 inline-block rounded-full bg-[#2F5BFF] px-5 py-3 text-sm text-white hover:bg-[#1D3FBF]"
            >
              See a menu
            </Link>
          </div>
        </section>
      </main>
      <ProtoFooter />
    </>
  );
}
