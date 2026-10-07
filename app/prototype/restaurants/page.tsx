import { Suspense } from "react";
import { ProtoFooter, ProtoNav } from "../components/shell";
import Browse from "./browse";

export default function RestaurantsPage() {
  return (
    <>
      <ProtoNav />
      <main>
        <div className="mx-auto max-w-6xl px-5 pb-2 pt-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#FF5200]">
            Kitchens
          </p>
          <h1 className="mt-2 [font-family:var(--font-display),sans-serif] text-5xl tracking-tight">
            Near South Congress
          </h1>
        </div>
        <Suspense fallback={<p className="px-5 py-10 text-sm">Loading kitchens…</p>}>
          <Browse />
        </Suspense>
      </main>
      <ProtoFooter />
    </>
  );
}
