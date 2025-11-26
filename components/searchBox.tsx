"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({
  searchValue,
  large: isLarge = false,
}: {
  searchValue?: string | undefined;
  large?: boolean;
}) {
  console.log("searchValue", searchValue);
  const router = useRouter();
  const [value, setValue] = useState(searchValue || "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("value", value);
    e.preventDefault();
    router.push("/ui/restaurant?search=" + value);
    router.refresh();
  }

  return (
    <div className={cn("relative w-full max-w-xl", isLarge && "max-w-none")}>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter restaurant name"
          className="pl-10 pr-20 border-[#00A5CF] focus:ring-[#FF6B35]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00A5CF]" />
        <Button
          type="submit"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FF6B35] rounded-tl-none rounded-bl-none text-white hover:bg-[#E85A2A]"
        >
          Find Food
        </Button>
      </form>
    </div>
  );
}
