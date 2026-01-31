"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProfile } from "@/lib/features/people/actions";

export function AddProfileForm({ colleges }: { colleges: string[] }) {
  const [college, setCollege] = useState("");
  const [state, formAction, isPending] = useActionState(
    async (prev: { error?: string; success?: boolean; slug?: string }, formData: FormData) => {
      return addProfile(prev, formData);
    },
    {}
  );

  if (state?.success && state?.slug) {
    return (
      <div className="border border-[#002147]/10 p-8 text-center md:p-12">
        <p className="font-serif text-3xl text-[#002147]">Thank you!</p>
        <p className="mt-4 text-[#002147]/60">
          Your profile has been added. Share it with your network.
        </p>
        <Link
          href={`/people/${state.slug}`}
          className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
        >
          View your profile
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <input type="hidden" name="college" value={college} required />
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Name
        </Label>
        <Input 
          id="name" 
          name="name" 
          required 
          placeholder="Your name" 
          className="border-[#002147]/20 text-[#002147] placeholder:text-[#002147]/40 focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="college" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          College
        </Label>
        <Select value={college} onValueChange={setCollege} required>
          <SelectTrigger id="college" className="border-[#002147]/20 text-[#002147] focus:border-[#002147] focus:ring-[#002147]/20">
            <SelectValue placeholder="Select college" />
          </SelectTrigger>
          <SelectContent className="border-[#002147]/20">
            {colleges.map((c) => (
              <SelectItem key={c} value={c} className="text-[#002147] focus:bg-[#002147]/5">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Subject
        </Label>
        <Input 
          id="subject" 
          name="subject" 
          required 
          placeholder="e.g. PPE, Medicine" 
          className="border-[#002147]/20 text-[#002147] placeholder:text-[#002147]/40 focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="one_thing" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          What&apos;s your one thing you&apos;d change about Oxford?
        </Label>
        <Textarea
          id="one_thing"
          name="one_thing"
          required
          placeholder="One sentence or two..."
          rows={3}
          className="border-[#002147]/20 text-[#002147] placeholder:text-[#002147]/40 focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="involvements" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Involvements / community around Oxford
        </Label>
        <Textarea
          id="involvements"
          name="involvements"
          placeholder="E.g. President of Oxford Speaks, Oxford Politics Society…"
          rows={2}
          className="border-[#002147]/20 text-[#002147] placeholder:text-[#002147]/40 focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="other_info" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Any other information?
        </Label>
        <Textarea
          id="other_info"
          name="other_info"
          placeholder="Anything else you'd like to share…"
          rows={2}
          className="border-[#002147]/20 text-[#002147] placeholder:text-[#002147]/40 focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="photo" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Photo
        </Label>
        <Input 
          id="photo" 
          name="photo" 
          type="file" 
          accept="image/*" 
          required 
          className="border-[#002147]/20 text-[#002147] file:border-0 file:bg-[#002147]/5 file:text-[#002147] file:font-medium focus:border-[#002147] focus:ring-[#002147]/20"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isPending} 
        className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-[#002147] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Adding…" : "Add my voice"}
        {!isPending && <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />}
      </button>
    </form>
  );
}
