"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const STORAGE_KEY = "oneoxford-add-voice-draft";

function normalizeInstagramHandle(value: string): string {
  return value.replace(/@/g, "").replace(/\s/g, "").trim();
}

const YEAR_OPTIONS = [
  "Bachelor's 1st Year",
  "Bachelor's 2nd Year",
  "Bachelor's 3rd Year",
  "Bachelor's 4th Year",
  "Master's",
  "DPhil",
  "Staff/Alumni",
  "Other",
];

interface FormDraft {
  name: string;
  college: string;
  subject: string;
  year: string;
  one_thing: string;
  involvements: string;
  other_info: string;
  instagram_handle: string;
}

export function AddProfileForm({ colleges, isSignedIn }: { colleges: string[]; isSignedIn: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Controlled state for all text fields (to support restoration)
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [subject, setSubject] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [oneThing, setOneThing] = useState("");
  const [involvements, setInvolvements] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const [state, formAction, isPending] = useActionState(
    async (prev: { error?: string; success?: boolean; slug?: string }, formData: FormData) => {
      const result = await addProfile(prev, formData);
      // Clear sessionStorage on successful submission
      if (result?.success) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      }
      return result;
    },
    {}
  );

  // Restore form data from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft: FormDraft = JSON.parse(saved);
        if (draft.name) setName(draft.name);
        if (draft.college) setCollege(draft.college);
        if (draft.subject) setSubject(draft.subject);
        if (draft.year) setGraduationYear(draft.year);
        if (draft.one_thing) setOneThing(draft.one_thing);
        if (draft.involvements) setInvolvements(draft.involvements);
        if (draft.other_info) setOtherInfo(draft.other_info);
        if (draft.instagram_handle) setInstagramHandle(normalizeInstagramHandle(draft.instagram_handle));
        // Clear after restoring so it doesn't persist forever
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save form data to sessionStorage and redirect to login
  const handleSignInToSubmit = () => {
    try {
      const draft: FormDraft = {
        name,
        college,
        subject,
        year: graduationYear,
        one_thing: oneThing,
        involvements,
        other_info: otherInfo,
        instagram_handle: instagramHandle,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore storage errors
    }
    router.push("/auth/login?next=/people/add");
  };

  if (state?.success) {
    return (
      <div className="border border-[#002147]/10 p-8 text-center md:p-12">
        <p className="font-serif text-3xl text-[#002147]">Thank you!</p>
        <p className="mt-4 text-[#002147]/60">
          Your voice has been submitted and is pending review.
        </p>
        <p className="mt-2 text-sm text-[#002147]/50">
          We&apos;ll notify you once your profile is approved.
        </p>
        <Link
          href="/people"
          className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
        >
          View all voices
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    );
  }

  const inputStyles = "!h-auto border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] placeholder:text-[#002147]/40 transition-colors focus:border-[#002147] focus:outline-none focus:ring-0";
  const textareaStyles = "border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] placeholder:text-[#002147]/40 transition-colors focus:border-[#002147] focus:outline-none focus:ring-0";
  const selectStyles = "!h-auto w-full border border-[#002147]/20 bg-white px-4 py-4 text-[#002147] transition-colors focus:border-[#002147] focus:outline-none focus:ring-0 [&_[data-placeholder]]:text-[#002147]/40";

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputStyles}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="year" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Year <span className="text-[#E2C044]">*</span>
        </Label>
        <input type="hidden" name="year" value={graduationYear} required />
        <Select value={graduationYear} onValueChange={setGraduationYear} required>
          <SelectTrigger id="year" className={selectStyles}>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="border border-[#002147]/20">
            {YEAR_OPTIONS.map((year) => (
              <SelectItem key={year} value={year} className="text-[#002147] focus:bg-[#002147]/5">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          What&apos;s your One thing you&apos;d change about Oxford?
        </Label>
        <Textarea
          id="one_thing"
          name="one_thing"
          placeholder="One sentence or two..."
          rows={3}
          value={oneThing}
          onChange={(e) => setOneThing(e.target.value)}
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
          value={involvements}
          onChange={(e) => setInvolvements(e.target.value)}
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
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
          className={textareaStyles}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instagram_handle" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
          Instagram account @
        </Label>
        <Input
          id="instagram_handle"
          name="instagram_handle"
          placeholder="username"
          value={instagramHandle}
          onChange={(e) => setInstagramHandle(normalizeInstagramHandle(e.target.value))}
          className={inputStyles}
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
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileError(null);
            if (file && file.size > MAX_FILE_SIZE) {
              setFileError("Photo must be under 2MB. Please choose a smaller image.");
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
              setSelectedFile(file);
            }
          }}
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
              <p className="mt-1 text-xs text-[#002147]/50">PNG, JPG up to 2MB</p>
            </div>
          </button>
        )}
        {fileError && (
          <p className="mt-2 text-sm text-red-600">{fileError}</p>
        )}
      </div>
      
      {isSignedIn ? (
        <button 
          type="submit" 
          disabled={isPending} 
          className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-[#002147] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Adding…" : "Add my voice"}
          {!isPending && <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />}
        </button>
      ) : (
        <button 
          type="button"
          onClick={handleSignInToSubmit}
          className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
        >
          Sign in to submit
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
        </button>
      )}
    </form>
  );
}
