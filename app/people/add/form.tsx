"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { addProfile } from "./actions";

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
      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6 text-center">
        <p className="font-medium text-foreground">Thank you!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your profile has been added. Share it with your network.
        </p>
        <Button asChild className="mt-4">
          <Link href={`/people/${state.slug}`}>View your profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <input type="hidden" name="college" value={college} required />
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="college">College</Label>
        <Select value={college} onValueChange={setCollege} required>
          <SelectTrigger id="college">
            <SelectValue placeholder="Select college" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required placeholder="e.g. PPE, Medicine" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="one_thing">What&apos;s your one thing you&apos;d change about Oxford?</Label>
        <Textarea
          id="one_thing"
          name="one_thing"
          required
          placeholder="One sentence or two..."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        <Input id="photo" name="photo" type="file" accept="image/*" required />
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Adding…" : "Add my voice"}
      </Button>
    </form>
  );
}
