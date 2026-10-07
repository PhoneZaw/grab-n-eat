"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const windows = ["11:45", "12:00", "12:15", "12:30", "1:00"];

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [slot, setSlot] = useState("12:15");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    params.set("at", slot);
    router.push(`/prototype/restaurants?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex flex-col gap-3 rounded-[28px] border border-[#e4d9c8] bg-[#fffdf8] p-3 shadow-[0_20px_50px_-30px_rgba(26,23,20,0.45)] sm:flex-row sm:items-center"
    >
      <label className="flex-1 px-3 py-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#8a8175]">
          Craving or kitchen
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tacos, rye, South Congress…"
          className="mt-1 w-full bg-transparent text-base outline-none placeholder:text-[#b3aa9e]"
        />
      </label>
      <label className="border-t border-[#e4d9c8] px-3 py-1 sm:border-l sm:border-t-0">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#8a8175]">
          Pick up
        </span>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="mt-1 bg-transparent text-base outline-none"
        >
          {windows.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-full bg-[#1a1714] px-6 py-3 text-sm text-[#f3eee6] hover:bg-[#c4542c]"
      >
        Find kitchens
      </button>
    </form>
  );
}
