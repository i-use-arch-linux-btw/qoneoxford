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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="All colleges" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All colleges</SelectItem>
        {colleges.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
