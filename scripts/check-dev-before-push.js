#!/usr/bin/env node
/**
 * Run before pushing to confirm local env is set for development.
 * Fails if .env.local has NEXT_PUBLIC_APP_ENV=production (avoids using prod Supabase locally).
 * Usage: node scripts/check-dev-before-push.js
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env.local");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  const out = {};
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) out[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = parseEnvFile(envPath);
const appEnv = env.NEXT_PUBLIC_APP_ENV ?? "development";

if (appEnv === "production") {
  console.error(
    "check-dev-before-push: NEXT_PUBLIC_APP_ENV=production in .env.local. Use development for local dev."
  );
  process.exit(1);
}

console.log("check-dev-before-push: OK (NEXT_PUBLIC_APP_ENV=%s)", appEnv);
