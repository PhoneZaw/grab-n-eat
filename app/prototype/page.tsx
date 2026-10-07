import Link from "next/link";
import { prototypeScreens } from "./data";
import { ProtoNav } from "./components/shell";

export default function PrototypeIndex() {
  return (
    <>
      <ProtoNav cta="Open home" ctaHref="/prototype/home" />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#c4542c]">
          Customer redesign · mock data
        </p>
        <h1 className="mt-4 max-w-3xl [font-family:var(--font-display),Georgia,serif] text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          Order ahead.
          <span className="italic text-[#c4542c]"> Walk in warm.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5c564e]">
          A new customer face for Grab-n-Eat, drawn from the quieter end of
          food apps — Resy’s time chips, Sweetgreen’s plain type, Caviar’s
          photography. Pickup is the product, so the window you choose sits
          on the surface of every screen.
        </p>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2">
          {prototypeScreens.map((screen) => (
            <li key={screen.href}>
              <Link
                href={screen.href}
                className="group flex h-full flex-col justify-between rounded-3xl border border-[#e4d9c8] bg-[#fffdf8] p-6 transition hover:-translate-y-0.5 hover:border-[#1a1714]"
              >
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-[#8a8175]">
                    {screen.kicker}
                  </p>
                  <h2 className="mt-3 [font-family:var(--font-display),Georgia,serif] text-3xl tracking-tight group-hover:text-[#c4542c]">
                    {screen.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5c564e]">
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
