import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ui = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grab-n-Eat · Design studies",
  description:
    "Customer-facing redesign studies for Grab-n-Eat. Mock data only.",
};

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${ui.variable} min-h-screen bg-[#f3eee6] text-[#1a1714] antialiased [font-family:var(--font-ui),ui-sans-serif,system-ui,sans-serif]`}
    >
      {children}
    </div>
  );
}
