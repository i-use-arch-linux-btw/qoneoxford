import Link from "next/link";
import { AddProfileForm } from "./form";
import collegesData from "@/data/colleges.json";

const colleges = collegesData as string[];

export default function AddYourselfPage() {
  return (
    <div className="container max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Add your voice</h1>
      <p className="mt-2 text-muted-foreground">
        Join the #OneOxford community. Share your one thing you&apos;d change about Oxford.
      </p>
      <AddProfileForm colleges={colleges} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/people" className="underline hover:no-underline">
          Back to community
        </Link>
      </p>
    </div>
  );
}
