"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CollegeFilter({ colleges }: { colleges: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("college") ?? "";

  function onValueChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("college", value);
    else params.delete("college");
    params.delete("page");
    router.push(`/people?${params.toString()}`);
  }

  return (
    <Select value={current || "all"} onValueChange={(v) => onValueChange(v === "all" ? "" : v)}>
      <SelectTrigger className="w-[220px] border-[#002147]/20 bg-white text-[#002147] focus:border-[#002147] focus:ring-[#002147]/20">
        <SelectValue placeholder="All colleges" />
      </SelectTrigger>
      <SelectContent className="border-[#002147]/20 bg-white">
        <SelectItem value="all" className="text-[#002147] focus:bg-[#002147]/5 focus:text-[#002147]">All colleges</SelectItem>
        {colleges.map((c) => (
          <SelectItem key={c} value={c} className="text-[#002147] focus:bg-[#002147]/5 focus:text-[#002147]">
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
