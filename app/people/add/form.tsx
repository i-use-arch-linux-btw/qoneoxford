"use client";

import { useActionState, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Upload, X } from "lucide-react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const inputStyles = "!h-auto border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] placeholder:text-[#002147]/40 transition-colors focus:border-[#002147] focus:outline-none focus:ring-0";
  const textareaStyles = "border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] placeholder:text-[#002147]/40 transition-colors focus:border-[#002147] focus:outline-none focus:ring-0";
  const selectStyles = "!h-auto w-full border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] transition-colors focus:border-[#002147] focus:outline-none focus:ring-0 [&>span]:text-[#002147]/40";

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <input type="hidden" name="college" value={college} required />
      
      {/* Required Fields */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Name <span className="text-[#E2C044]">*</span>
        </Label>
        <Input 
          id="name" 
          name="name" 
          required 
          placeholder="Your name" 
          className={inputStyles}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="college" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          College <span className="text-[#E2C044]">*</span>
        </Label>
        <Select value={college} onValueChange={setCollege} required>
          <SelectTrigger id="college" className={selectStyles}>
            <SelectValue placeholder="Select college" />
          </SelectTrigger>
          <SelectContent className="border border-[#002147]/20">
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
          Subject <span className="text-[#E2C044]">*</span>
        </Label>
        <Input 
          id="subject" 
          name="subject" 
          required 
          placeholder="e.g. PPE, Medicine" 
          className={inputStyles}
        />
      </div>
      
      {/* Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="h-px flex-1 bg-[#002147]/10" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#002147]/40">Optional</span>
        <div className="h-px flex-1 bg-[#002147]/10" />
      </div>
      
      {/* Optional Fields */}
      <div className="space-y-2">
        <Label htmlFor="one_thing" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          What&apos;s your one thing you&apos;d change about Oxford?
        </Label>
        <Textarea
          id="one_thing"
          name="one_thing"
          placeholder="One sentence or two..."
          rows={3}
          className={textareaStyles}
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
          className={textareaStyles}
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
          className={textareaStyles}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="photo" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Photo
        </Label>
        <input
          ref={fileInputRef}
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        {selectedFile ? (
          <div className="flex items-center justify-between border border-[#002147]/20 bg-white px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#002147]/5">
                <Upload className="size-5 text-[#002147]/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#002147]">{selectedFile.name}</p>
                <p className="text-xs text-[#002147]/50">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="flex size-8 items-center justify-center text-[#002147]/40 transition-colors hover:text-[#002147]"
            >
              <X className="size-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-[#002147]/30 bg-[#002147]/2 px-6 py-8 transition-colors hover:border-[#002147]/50 hover:bg-[#002147]/5"
          >
            <div className="flex size-12 items-center justify-center bg-[#002147]/10">
              <Upload className="size-6 text-[#002147]/60" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#002147]">Click to upload a photo</p>
              <p className="mt-1 text-xs text-[#002147]/50">PNG, JPG up to 10MB</p>
            </div>
          </button>
        )}
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
