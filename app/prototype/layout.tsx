import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ui = Manrope({
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
      className={`${display.variable} ${ui.variable} min-h-screen bg-[#F4F6FB] text-[#101828] antialiased [font-family:var(--font-ui),ui-sans-serif,system-ui,sans-serif]`}
    >
      {children}
    </div>
  );
}
