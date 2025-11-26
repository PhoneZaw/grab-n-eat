"use client";

import { LucideProps, Package, Package2 } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useEffect } from "react";
import { AuthUser } from "@/lib/session";
import {
  adminMenus,
  managerMenus,
  ownerMenus,
  userMenus,
} from "@/data/navConst";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function getMenus(authUser: AuthUser): {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}[] {
  var role = authUser.role;

  switch (role) {
    case "ADMIN":
      return adminMenus;
    case "OWNER":
      return ownerMenus;
    case "MANAGER":
      return managerMenus;
    default:
      return [];
  }
}

export default function DesktopNav({ authUser }: { authUser: AuthUser }) {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 fixed w-[220px]">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-primary">GrabNEat</h1>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {getMenus(authUser).map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted/50",
                  pathname === menu.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <menu.icon className="h-4 w-4" />
                {menu.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {userMenus.map((menu, index) => (
            <Link
              key={index}
              href={menu.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <menu.icon className="h-4 w-4" />

              {menu.label === "Profile" ? (
                <span>{authUser.name}</span>
              ) : (
                <span>{menu.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
