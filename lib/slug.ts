export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function profileSlug(name: string, college: string): string {
  const namePart = slugify(name).slice(0, 30);
  const collegePart = slugify(college.replace(/\s*College\s*$/i, "")).slice(0, 20);
  return `${namePart}-${collegePart}`;
}
