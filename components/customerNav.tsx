import { Button } from "@/components/ui/button";
import { getClientSession } from "@/lib/getSession";
import Link from "next/link";
import UserLocation from "./currentLocation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import React from "react";
import { HeaderCart } from "./header-cart";

export default async function CustomerNav({ authHeader = false }) {
  const session = await getClientSession();
  if (authHeader) {
    session.user = null;
  }

  return (
    <header className="mx-auto p-4 bg-white w-screen">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img src="/gne-logo.png" alt="logo" className="h-12" />
        </Link>
        <div className="flex items-center space-x-4">
          <UserLocation />
          {session.user ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white text-black hover:bg-gray-100">
                      {session.user.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-fit">
                      <ul className="w-fit p-1 bg-white shadow-md rounded-md text-nowrap text-sm">
                        <ListItem href="/ui/order-history">
                          Order History
                        </ListItem>
                        <ListItem href="/api/auth/logout">Logout</ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <HeaderCart />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-[#004E64] hover:text-[#00A5CF]"
                asChild
              >
                <Link
                  className="hover:bg-first/20 hover:text-first-darker text-black font-bold"
                  href="/auth/login"
                >
                  Log in
                </Link>
              </Button>
              <Button className="bg-first hover:bg-first-darker text-white">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
