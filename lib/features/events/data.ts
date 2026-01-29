import eventsData from "@/data/events.json";
import type { Event } from "./types";

export function getEvents(): Event[] {
  return eventsData as Event[];
}

export function formatEventDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
