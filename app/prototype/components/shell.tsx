import Link from "next/link";

const links = [
  { href: "/prototype/restaurants", label: "Kitchens" },
  { href: "/prototype/orders", label: "Orders" },
  { href: "/prototype", label: "Studies" },
];

export function ProtoNav({
  cta = "Sign in",
  ctaHref = "/prototype/account",
}: {
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e4d9c8] bg-[#f3eee6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link href="/prototype/home" className="flex min-w-0 items-baseline gap-2">
          <span className="truncate [font-family:var(--font-display),Georgia,serif] text-[1.35rem] tracking-tight">
            Grab-n-Eat
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-[#8a8175] sm:inline">
            Austin
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[#3c3832] md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#c4542c]">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href={ctaHref}
          className="shrink-0 rounded-full border border-[#1a1714] px-3 py-1.5 text-sm hover:bg-[#1a1714] hover:text-[#f3eee6] sm:px-4"
        >
          {cta}
        </Link>
      </div>
      <nav className="flex gap-5 overflow-x-auto px-5 pb-3 text-sm text-[#3c3832] md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0 hover:text-[#c4542c]">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function ProtoFooter() {
  return (
    <footer className="border-t border-[#e4d9c8]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="[font-family:var(--font-display),Georgia,serif] text-2xl">
            Grab-n-Eat
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6f675e]">
            A design study for the customer side of the product. Nothing here
            places a real order.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#3c3832]">
          <Link href="/prototype/home">Home</Link>
          <Link href="/prototype/restaurants">Kitchens</Link>
          <Link href="/prototype/orders">Orders</Link>
          <Link href="/prototype/account">Account</Link>
          <Link href="/" className="text-[#8a8175]">
            Current site
          </Link>
        </div>
      </div>
    </footer>
  );
}
