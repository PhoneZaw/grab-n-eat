import type { Metadata } from "next";
import { LucideProps } from "lucide-react";
import DesktopNav from "@/components/desktopNav";
import MobileNav from "@/components/mobileNav";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Dashboard | Grab-N-Eat",
  description: "Dashboard page",
};

export type MenuItem = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Nav */}
      {session.user && <DesktopNav authUser={session.user} />}
      <div className="flex flex-col">
        {/* Mobile Nav */}
        {session.user && <MobileNav authUser={session.user} />}
        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}
