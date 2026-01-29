import { getNewsletterItems } from "@/lib/features/newsletter";

export async function GET() {
  try {
    const items = await getNewsletterItems();
    return Response.json(items);
  } catch {
    return Response.json({ error: "RSS fetch error" }, { status: 500 });
  }
}
