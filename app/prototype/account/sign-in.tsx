"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Use an email and a password of at least 4 characters.");
      return;
    }
    if (mode === "up" && name.trim().length < 2) {
      setError("Add the name kitchens should call.");
      return;
    }
    router.push("/prototype/home");
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
          alt="A table set with a shared meal"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/20 to-transparent" />
        <div className="absolute bottom-0 p-10 text-[#F4F6FB]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9DB0FF]">
            South Congress · today
          </p>
          <p className="mt-3 max-w-sm [font-family:var(--font-display),sans-serif] text-4xl leading-tight">
            The good tables are the ones a short walk away.
          </p>
        </div>
      </div>
      <div className="flex items-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="flex gap-6 text-sm">
            <button
              type="button"
              onClick={() => {
                setMode("in");
                setError("");
              }}
              className={mode === "in" ? "border-b border-[#101828] pb-1" : "text-[#7B8499]"}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("up");
                setError("");
              }}
              className={mode === "up" ? "border-b border-[#101828] pb-1" : "text-[#7B8499]"}
            >
              Create account
            </button>
          </div>
          <h1 className="mt-6 [font-family:var(--font-display),sans-serif] text-4xl tracking-tight">
            {mode === "in" ? "Welcome back." : "A name for the counter."}
          </h1>
          <p className="mt-2 text-sm text-[#5A6478]">
            This study does not create a real account. Continue to browse the
            mock kitchens.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {mode === "up" ? (
              <label className="block text-sm">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-3 outline-none focus:border-[#101828]"
                />
              </label>
            ) : null}
            <label className="block text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-3 outline-none focus:border-[#101828]"
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#E2E6F0] bg-[#FFFFFF] px-3 py-3 outline-none focus:border-[#101828]"
              />
            </label>
            {error ? <p className="text-sm text-[#FF5200]">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-full bg-[#FF5200] py-3 text-sm text-white hover:bg-[#D84300]"
            >
              {mode === "in" ? "Continue" : "Create and continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
