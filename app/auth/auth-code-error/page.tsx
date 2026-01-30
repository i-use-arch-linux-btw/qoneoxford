import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sign-in problem | #OneOxford",
  description: "Something went wrong signing you in.",
};

export default function AuthCodeErrorPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">Sign-in didn’t complete</h1>
      <p className="mt-2 text-muted-foreground">
        The sign-in link may have expired or something went wrong. Please try again.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/auth/login">Try again</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
