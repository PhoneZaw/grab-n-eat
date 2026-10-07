import Link from "next/link";
import { prototypeScreens } from "./data";
import { ProtoNav } from "./components/shell";

export default function PrototypeIndex() {
  return (
    <>
      <ProtoNav cta="Open home" ctaHref="/prototype/home" />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#FF5200]">
          Customer redesign · mock data
        </p>
        <h1 className="mt-4 max-w-3xl [font-family:var(--font-display),sans-serif] text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          Order ahead.
          <span className="text-[#FF5200]"> Walk in warm.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3D465C]">
          A new customer face for Grab-n-Eat: cool daylight, a geometric
          headline, and a food-app orange for the actions. Pickup windows stay on the
          surface of every screen.
        </p>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2">
          {prototypeScreens.map((screen) => (
            <li key={screen.href}>
              <Link
                href={screen.href}
                className="group flex h-full flex-col justify-between rounded-3xl border border-[#E2E6F0] bg-[#FFFFFF] p-6 transition hover:-translate-y-0.5 hover:border-[#101828]"
              >
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-[#7B8499]">
                    {screen.kicker}
                  </p>
                  <h2 className="mt-3 [font-family:var(--font-display),sans-serif] text-3xl tracking-tight group-hover:text-[#FF5200]">
                    {screen.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#3D465C]">
                    {screen.note}
                  </p>
                </div>
                <p className="mt-8 text-sm">View screen →</p>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
