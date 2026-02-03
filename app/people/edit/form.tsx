"use client";

import { useActionState, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { updateProfile, deleteProfile } from "@/lib/features/people/actions";
import type { Profile } from "@/lib/supabase/types";

function normalizeInstagramHandle(value: string): string {
  return value.replace(/@/g, "").replace(/\s/g, "").trim();
}

function normalizeLinkedinUsername(value: string): string {
  const match = value.match(/linkedin\.com\/in\/([^/?]+)/i);
  if (match) {
    return match[1].trim();
  }
  return value.replace(/\s/g, "").trim();
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

export function EditProfileForm({ colleges, profile }: { colleges: string[]; profile: Profile }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Controlled state for all text fields
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [subject, setSubject] = useState(profile.subject);
  const [graduationYear, setGraduationYear] = useState(profile.year);
  const [oneThing, setOneThing] = useState(profile.one_thing || "");
  const [involvements, setInvolvements] = useState(profile.involvements || "");
  const [otherInfo, setOtherInfo] = useState(profile.other_info || "");
  const [instagramHandle, setInstagramHandle] = useState(profile.instagram_handle || "");
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedin_url || "");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prev: { error?: string; success?: boolean; slug?: string }, formData: FormData) => {
      const result = await updateProfile(prev, formData);
      return result;
    },
    {}
  );

  const [deleteState, deleteAction, isDeleting] = useActionState(
    async (prev: { error?: string; success?: boolean }, formData: FormData) => {
      const result = await deleteProfile(prev, formData);
      if (result?.success) {
        router.push("/people");
      }
      return result;
    },
    {}
  );

  if (state?.success) {
    return (
      <div className="border border-[#002147]/10 p-8 text-center md:p-12">
        <p className="font-serif text-3xl text-[#002147]">Updated!</p>
        <p className="mt-4 text-[#002147]/60">
          Your changes have been saved and are pending review.
        </p>
        <p className="mt-2 text-sm text-[#002147]/50">
          We&apos;ll notify you once your profile is re-approved.
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

  const currentPhotoUrl = removePhoto ? null : (selectedFile ? URL.createObjectURL(selectedFile) : profile.photo_url);

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-6">
        {state?.error && (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </p>
        )}
        <input type="hidden" name="profile_id" value={profile.id} />
        <input type="hidden" name="college" value={college} />
        <input type="hidden" name="remove_photo" value={removePhoto ? "true" : "false"} />
        
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
          <input type="hidden" name="year" value={graduationYear} />
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
            Instagram
          </Label>
          <Input
            id="instagram_handle"
            name="instagram_handle"
            placeholder="Username"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(normalizeInstagramHandle(e.target.value))}
            className={inputStyles}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-sm font-semibold uppercase tracking-wide text-[#002147]/70">
            LinkedIn
          </Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            placeholder="Username"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(normalizeLinkedinUsername(e.target.value))}
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
              setRemovePhoto(false);
              if (file && file.size > MAX_FILE_SIZE) {
                setFileError("Photo must be under 2MB. Please choose a smaller image.");
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              } else {
                setSelectedFile(file);
              }
            }}
          />
          {currentPhotoUrl ? (
            <div className="flex items-center justify-between border border-[#002147]/20 bg-white px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="relative size-12 overflow-hidden bg-[#002147]/5">
                  <Image
                    src={currentPhotoUrl}
                    alt="Current photo"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#002147]">
                    {selectedFile ? selectedFile.name : "Current photo"}
                  </p>
                  {selectedFile && (
                    <p className="text-xs text-[#002147]/50">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-medium text-[#002147]/60 transition-colors hover:text-[#002147]"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setRemovePhoto(true);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex size-8 items-center justify-center text-[#002147]/40 transition-colors hover:text-red-600"
                >
                  <X className="size-5" />
                </button>
              </div>
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
        
        <button 
          type="submit" 
          disabled={isPending} 
          className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-[#002147] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save changes"}
          {!isPending && <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />}
        </button>
      </form>

      {/* Delete Section */}
      <div className="mt-16 border border-[#002147]/10 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#002147]/50">
          Remove your voice
        </p>
        <p className="mt-2 text-[#002147]/60">
          This will permanently delete your profile from the community.
        </p>
        
        {showDeleteConfirm ? (
          <div className="mt-6 border-t border-[#002147]/10 pt-6">
            <p className="font-medium text-[#002147]">
              Are you sure? This cannot be undone.
            </p>
            {deleteState?.error && (
              <p className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {deleteState.error}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <form action={deleteAction}>
                <input type="hidden" name="profile_id" value={profile.id} />
                <button
                  type="submit"
                  disabled={isDeleting}
                  className="group inline-flex w-full items-center justify-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isDeleting ? "Deleting…" : "Yes, delete"}
                  {!isDeleting && <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />}
                </button>
              </form>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex w-full items-center justify-center gap-3 border border-[#002147]/20 bg-white px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-[#002147]/5 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="group mt-6 inline-flex items-center gap-3 border border-[#002147]/20 px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
          >
            Delete my profile
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
          </button>
        )}
      </div>
    </>
  );
}
