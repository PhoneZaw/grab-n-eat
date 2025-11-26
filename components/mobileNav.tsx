"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { userMenus } from "@/data/navConst";
import { AuthUser } from "@/lib/session";
import { useRouter } from "next/navigation";
import { getMenus } from "./desktopNav";
import Link from "next/link";

export default function MobileNav({ authUser }: { authUser: AuthUser }) {
  const router = useRouter();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-50 shadow-sm z-50 w-full px-4 lg:h-[60px] lg:px-6 fixed">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <img src="/gneadmin-logo.png" alt="logo" className="h-12" />
            </Link>
            <hr />
            {getMenus(authUser).map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <menu.icon className="h-5 w-5" />
                {menu.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            {userMenus.map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <menu.icon className="h-5 w-5" />
                {menu.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 md:hidden">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          GrabNEat
        </Link>
      </div>
    </header>
  );
}
